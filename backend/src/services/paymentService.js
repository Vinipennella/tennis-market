// backend/src/services/paymentService.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (items) => {
    // Transformamos os produtos do carrinho no formato que a Stripe entende
    const lineItems = items.map(item => ({
        price_data: {
            currency: 'brl',
            product_data: {
                name: item.name, // Ex: "Raquete de Tênis Wilson"
                images: [item.image],
            },
            unit_amount: Math.round(item.price * 100), // Stripe usa centavos (R$ 10,00 = 1000)
        },
        quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'], // Você pode adicionar 'pix' aqui depois
        line_items: lineItems,
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/success`,
        cancel_url: `${process.env.CLIENT_URL}/cart`,
    });

    return session;
};

module.exports = { createCheckoutSession };