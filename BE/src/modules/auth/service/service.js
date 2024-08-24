// services/authService.js
import cloudinary from 'cloudinary';
import { v4 as uuid4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { sendEmailVerfication } from '../../../utilies/email.js';
import { AppError } from '../../../utilies/error.js';
import { userModel } from '../../user/models/user.model.js';
class AuthService {
    async checkIfEmailOrMobileExists(email, mobileNumber) {
        const isEmailExist = await userModel.findOne({
            $or: [{ email }, { mobileNumber }]
        });
        if (isEmailExist) {
            throw new AppError('Please Try Another Email or Mobile number', 409);
        }
    }

    async uploadProfilePicture(file) {
        if (!file) return { profilePictureUrl: '', publicId: '' };

        const uploadResponse = await new Promise((resolve, reject) => {
            const stream = cloudinary.v2.uploader.upload_stream(
                { folder: 'Mansa', public_id: uuid4() },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            stream.end(file.buffer);
        });
       

        return {
            profilePictureUrl: uploadResponse.secure_url,
            publicId: uploadResponse.public_id
        };
    }

    async generateEmailVerificationToken(email) {
        const emailToken = jwt.sign({ email }, process.env.EMAIL_SECRET_KEY, { expiresIn: '1h' });
        const link = `${process.env.BASE_URL}api/v1/auth/confirmEmail/${emailToken}`;
        await sendEmailVerfication(email, { link });
    }

    async createUser(data) {
        return await userModel.create(data);
    }

    normalizeData(data) {
        for (const key in data) {
            if (typeof data[key] === 'string') {
                data[key] = data[key].toLowerCase();
            }
        }
    }
}

export default new AuthService();
