// frontend/src/pages/Report.jsx
import React, { useEffect, useState } from 'react';
import { fetchOrders } from '../services/api';

const Report = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const data = await fetchOrders();
                setOrders(data);
            } catch (error) {
                console.error("Erro ao carregar relatório");
            } finally {
                setLoading(false);
            }
        };
        loadOrders();
    }, []);

    if (loading) return <h3 style={{ textAlign: 'center' }}>Carregando relatório...</h3>;

    return (
        <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ color: '#2c3e50', borderBottom: '2px solid #eaeaea', paddingBottom: '10px' }}>
                📊 Relatório Gerencial de Vendas
            </h2>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f4f6f8', textAlign: 'left', borderBottom: '2px solid #ddd' }}>
                        <th style={styles.th}>ID Pedido</th>
                        <th style={styles.th}>Data</th>
                        <th style={styles.th}>Cliente</th>
                        <th style={styles.th}>Itens</th>
                        <th style={styles.th}>Status</th>
                        <th style={styles.th}>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id} style={{ borderBottom: '1px solid #eee' }}>
                            <td style={styles.td}><strong>{order.id}</strong></td>
                            <td style={styles.td}>
                                {/* Convertendo a data do Supabase (created_at) para o formato brasileiro */}
                                {new Date(order.created_at).toLocaleDateString('pt-BR')}
                            </td>
                            <td style={styles.td}>
                                {/* Puxando os nomes exatos das colunas que criamos no banco */}
                                {order.customer_name} <br />
                                <span style={{ fontSize: '0.8em', color: '#888' }}>{order.customer_email}</span>
                            </td>
                            <td style={styles.td}>{order.items}</td>
                            <td style={styles.td}>
                                <span style={{
                                    padding: '5px 10px',
                                    borderRadius: '15px',
                                    fontSize: '0.85em',
                                    fontWeight: 'bold',
                                    backgroundColor: order.status === 'Pago' ? '#d4edda' : order.status === 'Cancelado' ? '#f8d7da' : '#fff3cd',
                                    color: order.status === 'Pago' ? '#155724' : order.status === 'Cancelado' ? '#721c24' : '#856404'
                                }}>
                                    {order.status}
                                </span>
                            </td>
                            <td style={styles.td}>
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(order.total)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const styles = {
    th: { padding: '12px 15px', color: '#333' },
    td: { padding: '12px 15px', color: '#555' }
};

export default Report;