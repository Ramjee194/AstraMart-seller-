import Stripe from 'stripe'

const stripe =new Stripe(process.env.STRIPE_SECRET_KEY);

async function createPaymentIntent(amount,currency='inr',metadata={}){
    const intent =await stripe.pamentIntents.create({
        amount:Math.round(amount*100),
        currency,metadata,
    });
    return intent;
}

export  {createPaymentIntent,stripe};