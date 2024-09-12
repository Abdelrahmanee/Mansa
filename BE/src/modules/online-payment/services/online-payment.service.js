// stripePaymentService.js
import Stripe from 'stripe'
import onlinePaymentRepository from '../repository/online-payment.repository.js';


class StripePaymentService {
    constructor(apiKey) {
        this.stripe = new Stripe(apiKey, { apiVersion: '2022-11-15' });
    }

    async createPaymentIntent(lecture_id, studentId) {
        let lecture = await onlinePaymentRepository.getLectureInfo(lecture_id)
        let user = await onlinePaymentRepository.getUserInfo(studentId)
        // Check if lecture and user are found
        if (!lecture) {
            throw new Error('Lecture not found');
        }
        if (!user) {
            throw new Error('User not found');
        }

        try {
            return await this.stripe.checkout.sessions.create({
                line_items: [
                    {
                        price_data: {
                            currency: 'EGP',
                            unit_amount: lecture.price * 100, // Stripe expects amount in cents
                            product_data: {
                                name: lecture.title, // Lecture title instead of user's name
                            },
                        },
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: 'https://kareememad52.github.io/ecommerce/',
                cancel_url: 'https://ecommerce-five-beryl.vercel.app/',
                client_reference_id: user._id.toString(), // Ensure user._id is a string
                customer_email: user.email,
            });
        } catch (error) {
            throw new Error(`Stripe error: ${error.message}`);
        }
    }

    handleWebhookEvent(event) {
        console.log('Stripe event received:', event);
        // Add logic to handle the webhook event
    }
}

export default StripePaymentService;
