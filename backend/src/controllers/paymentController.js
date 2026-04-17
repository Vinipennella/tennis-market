// backend/src/controllers/paymentController.js
const paymentService = require('../services/paymentService');
const supabase = require('../services/supabaseService');

// Função 1: Gera a sessão de checkout na Stripe
const checkout = async (req, res) => {
    try {
        const { items } = req.body;
        const session = await paymentService.createCheckoutSession(items);
        res.json({ id: session.id, url: session.url });
    } catch (error) {
        console.error('Erro na criação do checkout:', error.message);
        res.status(500).json({ error: error.message });
    }
};

// Função 2: Escuta a aprovação e salva no Banco de Dados
const webhook = async (req, res) => {
    const event = req.body;

    try {
        // Verifica se o aviso da Stripe é realmente sobre um pagamento concluído
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;

            console.log('Recebendo confirmação de pagamento da Stripe...');

            // Inserindo o pedido aprovado na tabela 'orders' do Supabase
            const { error } = await supabase.from('orders').insert([{
                customer_name: session.customer_details?.name || 'Cliente sem nome',
                customer_email: session.customer_details?.email || 'Sem email',
                total: session.amount_total / 100, // Converte de centavos para reais
                status: 'Pago',
                items: 'Compra via Stripe Checkout',
                created_at: new Date()
            }]);

            if (error) {
                console.error('Erro grave ao salvar no Supabase:', error);
                throw error; // Força a cair no catch
            }

            console.log('✅ Pedido salvo no Supabase com sucesso e pronto para o Relatório!');
        }

        // Retorna 200 para a Stripe saber que recebemos o aviso
        res.status(200).send('Webhook processado com sucesso');
    } catch (error) {
        console.error('Erro no webhook:', error.message);
        // Retorna erro 500 para a Stripe tentar enviar o aviso novamente mais tarde
        res.status(500).send(`Erro interno no Webhook: ${error.message}`);
    }
};

module.exports = { checkout, webhook };