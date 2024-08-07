import jwt from "jsonwebtoken";
import { v4 as uuid4 } from 'uuid';
import cloudinary from 'cloudinary';
import { userModel } from "../../user/models/user.model.js";
import { sendEmailVerfication } from "../../../utilies/email.js";
import { AppError, catchAsyncError } from "../../../utilies/error.js";





export const login = catchAsyncError(async (req, res, next) => {

    const { email, userName, role, sex, status, age, mobileNumber, _id } = req.user

    if (req.user.status === 'blocked') return next(new AppError("you have been blocked , contact us", 403))
    const token = jwt.sign({ email, sex, userName, role, status, age, mobileNumber, _id }, process.env.SECRET_KEY)
    req.user.status = 'online'
    req.user.isLoggedOut = false
    await req.user.save();

    res.status(200).json({
        status: 'success',
        message: "Signed in success", token, user: {
            email,
            userName,
            role,
            status,
            sex,
            age,
            mobileNumber,
            _id
        }
    })
})



export const signup = catchAsyncError(async (req, res, next) => {
    let profilePictureUrl = '';
    let publicId = '';


    // Check if email or mobile number already exists
    const isEmailExist = await userModel.findOne({
        $or: [{ email: req.body.email }, { mobileNumber: req.body.mobileNumber }]
    });

    if (isEmailExist) {
        return next(new AppError('Please Try Another Email or Mobile number', 409));
    }

    // Check if file is uploaded
    if (req.file) {
        // Upload the image to Cloudinary
        const uploadResponse = await new Promise((resolve, reject) => {
            const stream = cloudinary.v2.uploader.upload_stream(
                { folder: 'Mansa', public_id: uuid4() },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );
            stream.end(req.file.buffer);
        });

        profilePictureUrl = uploadResponse.secure_url;
        publicId = uploadResponse.public_id;
    }

    // Attach profile picture URL to the request body
    req.body.profilePicture = profilePictureUrl;



    // Generate email verification token and send verification email
    const { email } = req.body;
    const emailToken = jwt.sign({ email }, process.env.EMAIL_SECRET_KEY, { expiresIn: '1h' });
    const link = `${process.env.BASE_URL}api/v1/auth/confirmEmail/${emailToken}`;
    await sendEmailVerfication(email, { link });

    // Create a new user
    const user = await userModel.create(req.body);

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
