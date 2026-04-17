// backend/src/controllers/orderController.js
const supabase = require('../services/supabaseService');

const getOrders = async (req, res) => {
    try {
        // Busca os pedidos e ordena pela data de criação (decrescente)
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            throw error;
        }

        res.status(200).json(data);
    } catch (error) {
        console.error('Erro ao buscar pedidos:', error.message);
        res.status(500).json({ error: 'Erro ao buscar relatório de compras' });
    }
};

module.exports = { getOrders };