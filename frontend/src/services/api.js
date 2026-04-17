// frontend/src/services/api.js
import axios from 'axios';

// O Vite injeta o 'PROD' automaticamente quando fazemos o deploy na Vercel.
// Se for produção, ele usa a rota interna '/api'. Se for no seu PC, usa o localhost.
const baseURL = import.meta.env.PROD ? '/api' : 'http://localhost:3000/api';

const api = axios.create({
    baseURL: baseURL,
});

export const fetchProducts = async () => {
    try {
        const response = await api.get('/products');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        throw error;
    }
};

export const fetchOrders = async () => {
    try {
        const response = await api.get('/orders');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar relatório:', error);
        throw error;
    }
};

export const checkout = async (cartItems) => {
    try {
        const response = await api.post('/payment/create-checkout-session', { items: cartItems });
        return response.data;
    } catch (error) {
        console.error('Erro ao processar pagamento:', error);
        throw error;
    }
};

export default api;