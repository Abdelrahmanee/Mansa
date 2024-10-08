import { sendEmail } from "../../../utilies/email.js";
import { AppError, catchAsyncError } from "../../../utilies/error.js";
import { generateUniqueCode } from "../../../utilies/generateUniqueCode.js";
import { LECTURE_CODE_TEMPLATE } from "../../../utilies/htmlTemplate.js";
import { lectureModel } from "../../lecture/models/lecture.model.js";
import lectureService from "../../lecture/service/lecture.service.js";
import { userModel } from "../../user/models/user.model.js";

// paymentController.js
class PaymentController {
  constructor(paymentService) {
    this.paymentService = paymentService;
  }

  async createPayment(req, res) {
    const { lectureId } = req.body;
    const { _id: studentId } = req.user

    try {
      const session = await this.paymentService.createPaymentIntent(lectureId, studentId);
      res.status(201).json(session);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
export const makeOnlineOrder = async (data) => {
  const { client_reference_id: userId, metadata: { lecture_id }, customer_email } = data;

  try {
    // Fetch user and lecture details concurrently
    const [user, lecture] = await Promise.all([
      userModel.findById(userId),
      lectureModel.findById(lecture_id),
    ]);

    // Check if user and lecture exist
    if (!user) throw new AppError("User not found", 404);
    if (!lecture) throw new AppError("Lecture not found", 404);

    // Generate unique code
    const code = generateUniqueCode();
    if (!code) throw new AppError("Code is required", 400);

    // Generate the lecture code and store it
    const generatedCode = await lectureService.generateLectureCode({
      lectureId: lecture._id,
      code,
      isUsed: false
    });

    // Logging for debugging
    console.log('User email:', user.email);
    console.log('Lecture details:', lecture);

    // Send email to the user with the lecture code
    await sendEmail(
      user.email,
      "Lecture Code",
      LECTURE_CODE_TEMPLATE,
      generatedCode.code
    );

    // Optional: Return some result if needed
    return {
      success: true,
      message: 'Order processed and email sent successfully.',
      generatedCode: generatedCode.code
    };
  } catch (error) {
    console.error('Error in makeOnlineOrder:', error); // Log the error for debugging
    throw error; // Rethrow the error to handle it further up the call stack
  }
};

export default PaymentController;
