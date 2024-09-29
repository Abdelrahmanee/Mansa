import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();

export class WebhookController {
  constructor(stripePaymentService) {
    this.stripePaymentService = stripePaymentService;
    this.stripe = new Stripe(process.env.STRIPE_API_KEY); 
  }

  handleWebhook(request, response) {
    const sig = request.headers['stripe-signature'];
    let event;

    try {
     
      event = this.stripe.webhooks.constructEvent(
        request.body,
        sig,
        process.env.WEBHOOK_SECRET
      );
    } catch (err) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return response.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        console.log(event.type);
        this.stripePaymentService.handleWebhookEvent(event);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    response.json({ received: true });
  }
}
