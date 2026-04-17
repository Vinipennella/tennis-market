// backend/src/routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Rota 1: O frontend chama essa para gerar o pagamento
router.post('/create-checkout-session', paymentController.checkout);

// Rota 2: A Stripe chama essa por trás dos panos quando o pagamento é aprovado
router.post('/webhook', paymentController.webhook);

module.exports = router;