import jwt from "jsonwebtoken";
import { v4 as uuid4 } from 'uuid';
import cloudinary from 'cloudinary';
import { userModel } from "../../user/models/user.model.js";
import { sendEmailVerfication } from "../../../utilies/email.js";
import { AppError, catchAsyncError } from "../../../utilies/error.js";
import AuthService from'../service/service.js'




export const login = catchAsyncError(async (req, res, next) => {

    const { email, userName, role, sex, status, age, mobileNumber, _id } = req.user

    if (req.user.status === 'blocked') return next(new AppError("you have been blocked , contact us", 403))
    const token = jwt.sign({ email, sex, userName, role, status, age, mobileNumber, _id }, process.env.SECRET_KEY)
    req.user.status = 'online'
    req.user.isLoggedOut = false
    await req.user.save();

    res.cookie('authToken', token, {
        httpOnly: true,  // Prevents client-side JavaScript from accessing the cookie
        secure: process.env.NODE_ENV === 'production',  // Sends cookie over HTTPS only
        sameSite: 'strict',  // Prevents CSRF
        maxAge: 24 * 60 * 60 * 1000  // Cookie expiration in milliseconds (e.g., 1 day)
    });

    res.status(200).json({
        status: 'success',
        message: "Signed in success", user: {
            email: email.toLowerCase(),
            userName : userName.toLowerCase(),
            role: role.toLowerCase(),
            status: status.toLowerCase(),
            sex: sex.toLowerCase(),
            age,
            mobileNumber,
            _id
        }
    })
})



export const signup = catchAsyncError(async (req, res, next) => {
    const { email, mobileNumber } = req.body;

    // Check if email or mobile number already exists
    await AuthService.checkIfEmailOrMobileExists(email, mobileNumber);

    // Upload profile picture if provided
    const { profilePictureUrl, publicId } = await AuthService.uploadProfilePicture(req.file);
    
    console.log({ profilePictureUrl, publicId });
    // Attach profile picture URL to the request body
    req.body.profilePicture = profilePictureUrl;

    // Generate email verification token and send verification email
    await AuthService.generateEmailVerificationToken(email);

    // Normalize request data
    AuthService.normalizeData(req.body);

    // Create a new user
    const user = await AuthService.createUser(req.body);

    res.status(201).json({
        status: 'success',
        message: 'User added successfully',
        data: user
    });
});


export const confirm_email = catchAsyncError(async (req, res, next) => {
    try {
        const { token } = req.params;
        const { email } = jwt.verify(token, process.env.EMAIL_SECRET_KEY)


        await userModel.findOneAndUpdate({ email }, { isEmailVerified: true })
        res.status(200).send("Email is confirmed")
    } catch (error) {
        throw new AppError(error.message, 498)
    }
})
