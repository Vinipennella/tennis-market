// frontend/src/components/CartModal.jsx
import React, { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContext';
import { checkout } from '../services/api';

const CartModal = ({ isOpen, onClose }) => {
    const { cart, cartTotal } = useContext(CartContext);
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleCheckout = async () => {
        if (cart.length === 0) return;
        setLoading(true);
        try {
            const response = await checkout(cart);
            if (response.url) window.location.href = response.url;
        } catch (error) {
            console.error("Erro no checkout:", error);
            alert("Erro ao conectar com o gateway de pagamento.");
            setLoading(false);
        }
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <h2 style={styles.title}>Seu Carrinho</h2>
                    <button style={styles.closeBtn} onClick={onClose}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                <div style={styles.content}>
                    {cart.length === 0 ? (
                        <p style={styles.emptyText}>Seu carrinho está vazio.</p>
                    ) : (
                        <ul style={styles.list}>
                            {cart.map((item, index) => (
                                <li key={index} style={styles.listItem}>
                                    <div style={styles.itemInfo}>
                                        <span style={styles.itemName}>{item.name}</span>
                                        <span style={styles.itemQty}>Qtd: {item.quantity}</span>
                                    </div>
                                    <span style={styles.itemPrice}>
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price * item.quantity)}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div style={styles.footer}>
                    <div style={styles.totalContainer}>
                        <span style={styles.totalLabel}>Total:</span>
                        <span style={styles.totalValue}>
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cartTotal)}
                        </span>
                    </div>
                    <button
                        style={{
                            ...styles.checkoutBtn,
                            backgroundColor: cart.length === 0 ? '#cccccc' : '#0f172a',
                            cursor: cart.length === 0 ? 'not-allowed' : 'pointer'
                        }}
                        onClick={handleCheckout}
                        disabled={loading || cart.length === 0}
                    >
                        {loading ? 'Processando...' : 'Finalizar Compra'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(3px)',
        display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
    },
    modal: {
        backgroundColor: '#fff', borderRadius: '12px', width: '90%', maxWidth: '450px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', overflow: 'hidden', display: 'flex', flexDirection: 'column'
    },
    header: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '20px 24px', borderBottom: '1px solid #f1f5f9'
    },
    title: { margin: 0, fontSize: '1.25rem', color: '#0f172a', fontWeight: '600' },
    closeBtn: { background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: '4px', display: 'flex' },
    content: { padding: '24px', maxHeight: '400px', overflowY: 'auto' },
    emptyText: { textAlign: 'center', color: '#64748b', margin: 0 },
    list: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' },
    listItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    itemInfo: { display: 'flex', flexDirection: 'column' },
    itemName: { fontSize: '0.95rem', color: '#334155', fontWeight: '500' },
    itemQty: { fontSize: '0.8rem', color: '#94a3b8' },
    itemPrice: { fontSize: '0.95rem', color: '#0f172a', fontWeight: '600' },
    footer: { padding: '20px 24px', backgroundColor: '#f8fafc', borderTop: '1px solid #f1f5f9' },
    totalContainer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' },
    totalLabel: { fontSize: '1rem', color: '#475569' },
    totalValue: { fontSize: '1.25rem', color: '#0f172a', fontWeight: '700' },
    checkoutBtn: {
        width: '100%', color: 'white', border: 'none', padding: '12px',
        borderRadius: '8px', fontWeight: '600', fontSize: '1rem', transition: 'background-color 0.2s'
    }
};

export default CartModal;