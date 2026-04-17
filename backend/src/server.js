// backend/src/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Importação das rotas
const paymentRoutes = require('./routes/paymentRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// Middlewares essenciais
// O CORS permite que o seu Frontend em React (geralmente na porta 5173) 
// consiga fazer requisições para este Backend (na porta 3000) sem ser bloqueado.
app.use(cors());

// Permite que o Node.js entenda requisições enviadas no formato JSON (como o carrinho de compras)
app.use(express.json());

// Cadastro das Rotas na API
// Tudo que vier para /api/payment vai ser tratado pelo paymentRoutes
app.use('/api/payment', paymentRoutes);

// Tudo que vier para /api/products vai ser tratado pelo productRoutes
app.use('/api/products', productRoutes);

app.use('/api/orders', orderRoutes);
// Inicialização do servidor
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Servidor rodando localmente na porta ${PORT}`));
}

module.exports = app;