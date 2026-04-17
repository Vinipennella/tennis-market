// frontend/src/services/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
});

// Olha o "export" aqui! É ele que o Home.jsx está procurando
export const fetchProducts = async () => {
    try {
        const response = await api.get('/products');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
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

// Adicione esta função no seu api.js
export const fetchOrders = async () => {
    try {
        const response = await api.get('/orders');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar relatório:', error);
        throw error;
    }
};

export default api;