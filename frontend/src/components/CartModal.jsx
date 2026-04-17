// frontend/src/components/CartModal.jsx
import React, { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContext';
import { checkout } from '../services/api';

const CartModal = ({ isOpen, onClose }) => {
    const { cart, cartTotal, updateQuantity, removeFromCart } = useContext(CartContext);
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleCheckout = async () => {
        setLoading(true);
        try {
            const response = await checkout(cart);
            if (response.url) window.location.href = response.url;
        } catch (error) {
            alert("Erro ao conectar com o gateway.");
            setLoading(false);
        }
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <h2 style={styles.title}>Carrinho de Compras</h2>
                    <button style={styles.closeBtn} onClick={onClose}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                <div style={styles.content}>
                    {cart.length === 0 ? (
                        <p style={styles.emptyText}>Nenhum item adicionado.</p>
                    ) : (
                        cart.map((item) => (
                            <div key={item.id} style={styles.cartItem}>
                                <div style={styles.itemMain}>
                                    <span style={styles.itemName}>{item.name}</span>
                                    <span style={styles.itemPrice}>
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price)}
                                    </span>
                                </div>

                                <div style={styles.itemActions}>
                                    <div style={styles.qtyControls}>
                                        <button onClick={() => updateQuantity(item.id, -1)} style={styles.actionBtn}>-</button>
                                        <span style={styles.qtyLabel}>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, 1)} style={styles.actionBtn}>+</button>
                                    </div>

                                    <button onClick={() => removeFromCart(item.id)} style={styles.removeBtn}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div style={styles.footer}>
                    <div style={styles.totalRow}>
                        <span>Subtotal</span>
                        <span style={styles.finalPrice}>
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cartTotal)}
                        </span>
                    </div>
                    <button
                        style={{ ...styles.checkoutBtn, backgroundColor: cart.length === 0 ? '#94a3b8' : '#0f172a' }}
                        onClick={handleCheckout}
                        disabled={loading || cart.length === 0}
                    >
                        {loading ? 'Processando...' : 'Ir para Pagamento'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
    modal: { backgroundColor: '#fff', borderRadius: '12px', width: '400px', display: 'flex', flexDirection: 'column' },
    header: { padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    title: { margin: 0, fontSize: '1.1rem', color: '#0f172a' },
    closeBtn: { background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' },
    content: { padding: '20px', maxHeight: '350px', overflowY: 'auto' },
    cartItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #f8fafc', paddingBottom: '12px' },
    itemMain: { display: 'flex', flexDirection: 'column', gap: '4px' },
    itemName: { fontSize: '0.9rem', fontWeight: '600', color: '#1e293b' },
    itemPrice: { fontSize: '0.8rem', color: '#64748b' },
    itemActions: { display: 'flex', alignItems: 'center', gap: '16px' },
    qtyControls: { display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '2px 8px' },
    actionBtn: { background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', fontWeight: 'bold' },
    qtyLabel: { fontSize: '0.85rem', fontWeight: '600', minWidth: '15px', textAlign: 'center' },
    removeBtn: { background: 'none', border: 'none', cursor: 'pointer', display: 'flex' },
    footer: { padding: '20px', backgroundColor: '#f8fafc', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px' },
    totalRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' },
    finalPrice: { fontSize: '1.2rem', fontWeight: '800', color: '#0f172a' },
    checkoutBtn: { width: '100%', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }
};

export default CartModal;