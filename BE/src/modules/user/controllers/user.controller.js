import dotenv from 'dotenv'
import { AppError, catchAsyncError } from "../../../utilies/error.js";
import { userService } from '../services/user.service.js';
import { blockService } from '../services/block.service.js';
dotenv.config()

// get account.
export const userInfo = catchAsyncError(async (req, res, next) => {
    const { userId } = req.params;

    // Ensure userId exists in request
    if (!userId) {
        return next(new AppError('User ID is required', 400));
    }

    // Fetch user information from the service layer
    const user = await userService.getUserById(userId);

    if (!user) {
        return next(new AppError('User not found', 404));
    }

    // Respond with user data
    res.status(200).json({
        status: 'success',
        data: user
    });
});


// Update account
export const updateAccount = catchAsyncError(async (req, res, next) => {
    const { _id, firstName, lastName } = req.user;
    const user = await userService.updateAccount(_id, firstName, lastName, req.body);
    res.status(200).json({ status: "success", message: 'User updated successfully', data: user });
});

// Update profile picture
export const updateProfilePicture = catchAsyncError(async (req, res, next) => {
    const user = await userService.updateProfilePicture(req.user._id, req.file.buffer);
    res.status(200).json({ message: 'Profile picture updated successfully', user });
});



// Update account email
export const updateAccountEmail = catchAsyncError(async (req, res, next) => {
    const { _id: userId, email: currentEmail } = req.user;
    const { email: newEmail } = req.body;
    const user = await userService.updateAccountEmail(userId, currentEmail, newEmail);
    res.status(200).json({ status: "success", message: "Email updated, please login again", data: user });
});


// Delete account
export const deleteAccount = catchAsyncError(async (req, res, next) => {
    await userService.deleteAccount(req.user._id);
    res.status(200).json({ status: 'success', message: 'User deleted successfully' });
});

// Forget password 

export const sendOTP = catchAsyncError(async (req, res, next) => {
    const { identifier } = req.body;
    const response = await userService.sendOTP(identifier);
    res.status(200).json(response);
});
// Get user account data 
// Get lectures for the current logged-in user
export const getMyLectures = catchAsyncError(async (req, res, next) => {
    const { _id: studentId } = req.user;
    const { lectureCount, lectures } = await userService.getMyLectures(studentId);
    res.status(200).json({ lectureCount, lectures });
});

// Get profile data for another user
export const anotherUserInfo = catchAsyncError(async (req, res, next) => {
    const { id: friendId } = req.params;
    const user = await userService.getAnotherUserInfo(friendId);
    res.status(200).json({ user });
});


// get all students
export const getAllStudents = catchAsyncError(async (req, res, next) => {
    const students = await userService.getAllStudents();
    if (!students) return next(new AppError('No students found', 404));
    const resData = await Promise.all(students.map(student => userService.formatUserResponse(student)));
    res.status(200).json({ status: "success", message: 'Get all students successfully', data: resData });
});


//  Update password 
export const updatePassword = catchAsyncError(async (req, res, next) => {
    const { _id } = req.user;
    const { current_password, new_password } = req.body;

    if (!_id) {
        return next(new AppError('Not allowed', 401));
    }

    // Call the service method to update the password
    await userService.updatePassword(_id, current_password, new_password);

    res.status(200).json({
        status: 'success',
        message: 'Account password updated successfully',
    });
});

// reset password
export const resetPassword = catchAsyncError(async (req, res, next) => {
    const { new_password } = req.body;

    // Call the service method to reset the password
    const updatedUser = await userService.resetPassword(req.user, new_password);

    // Respond with success message and user data
    res.status(200).json({
        status: "success",
        message: 'Password reset successfully',
        user: updatedUser,
    });
});

// Get all accounts associated to a specific recovery Email 
export const getAllAccountsAssociated = catchAsyncError(async (req, res, next) => {
    const { recoveryEmail } = req.body;

    try {
        // Call the service method to get all associated accounts
        const accounts = await userService.getAllAssociatedAccounts(recoveryEmail);

        res.status(200).json({ status: "success", accounts });
    } catch (error) {
        next(error);
    }
});

// 
export const kickUserOut = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;

    try {
        // Call the service method to block the user
        await userService.blockUser(id);

        res.status(200).json({
            status: 'success',
            message: 'Account is blocked',
        });
    } catch (error) {
        next(error);
    }
});

// 
export const softDeleteUser = catchAsyncError(async (req, res, next) => {
    const { _id } = req.user;

    try {
        // Call the service method to soft-delete the user
        const user = await userService.softDeleteUser(_id);

        res.status(200).json({
            status: 'success',
            message: 'Account deleted successfully',
            data: { user },
        });
    } catch (error) {
        next(error);
    }
});
// 

export const userLoggedOut = catchAsyncError(async (req, res, next) => {
    const { _id } = req.user;
    const user = await userService.logoutUser(_id);
    const formattedUser = await userService.formatUserResponse(user)
    res.status(200).json({
        status: 'success',
        message: 'User logged out successfully',
        data: formattedUser,
    });
});

export const blockUser = catchAsyncError(async (req, res, next) => {
    const { _id } = req.user; // ID of the user who is blocking
    const { id: userIdToBlock } = req.params; // ID of the user to be blocked


    const blockedUser = await blockService.blockUser(req.user, userIdToBlock);

    res.status(200).json({
        status: "success",
        message: `${blockedUser.firstName} ${blockedUser.lastName} has been blocked successfully.`,
        user: blockedUser
    });
});

export const userBlockedList = catchAsyncError(async (req, res, next) => {
    const { _id } = req.user;

    const blockedUsers = await blockService.getBlockedList(_id);

    res.status(200).json({
        status: "success",
        data: blockedUsers
    });
});


export const removeFromBlockList = catchAsyncError(async (req, res, next) => {
    const { id: removedUser } = req.body;

    await blockService.removeUserFromBlockList(req.user, removedUser);

    res.status(200).json({
        status: "success",
        message: "User removed from your block list"
    });
});




