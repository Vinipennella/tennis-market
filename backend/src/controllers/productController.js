// backend/src/controllers/productController.js
const supabase = require('../services/supabaseService');

const getProducts = async (req, res) => {
    try {
        // Busca todos os registros da tabela 'products'
        const { data, error } = await supabase.from('products').select('*');

        if (error) {
            throw error; // Joga o erro para o bloco catch
        }

        res.status(200).json(data);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error.message);
        res.status(500).json({ error: 'Erro ao buscar produtos no banco de dados' });
    }
};

module.exports = { getProducts };