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

export default PaymentController;
