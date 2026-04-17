// frontend/src/components/Header.jsx
import React, { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContext';
import { checkout } from '../services/api';

const Header = () => {
    const { cart, cartTotal } = useContext(CartContext);
    const [loading, setLoading] = useState(false);

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

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
        <header style={styles.header}>
            <div style={styles.logoContainer}>
                <span style={styles.logoIcon}>🎾</span>
                <h2 style={styles.logoText}>TennisMarket</h2>
            </div>

            <div style={styles.cartContainer}>
                <div style={styles.cartInfo}>
                    <span style={styles.itemCount}>{totalItems} itens</span>
                    <span style={styles.totalValue}>
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cartTotal)}
                    </span>
                </div>

                <button
                    style={{
                        ...styles.checkoutBtn,
                        backgroundColor: cart.length === 0 ? '#cccccc' : '#28a745',
                        cursor: cart.length === 0 ? 'not-allowed' : 'pointer',
                        transform: loading ? 'scale(0.98)' : 'scale(1)'
                    }}
                    onClick={handleCheckout}
                    disabled={loading || cart.length === 0}
                >
                    {loading ? 'Processando...' : 'Finalizar Compra'}
                </button>
            </div>
        </header>
    );
};

const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 40px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e0e0e0',
        boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    },
    logoIcon: {
        fontSize: '24px'
    },
    logoText: {
        margin: 0,
        color: '#2c3e50',
        fontSize: '1.4rem',
        fontWeight: '800',
        letterSpacing: '-0.5px'
    },
    cartContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
    },
    cartInfo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end'
    },
    itemCount: {
        fontSize: '0.8rem',
        color: '#7f8c8d',
        fontWeight: '600'
    },
    totalValue: {
        fontSize: '1.1rem',
        color: '#2c3e50',
        fontWeight: 'bold'
    },
    checkoutBtn: {
        color: 'white',
        border: 'none',
        padding: '10px 24px',
        borderRadius: '8px',
        fontWeight: 'bold',
        fontSize: '0.95rem',
        transition: 'all 0.2s ease',
        boxShadow: '0 4px 6px rgba(40, 167, 69, 0.2)'
    }
};

export default Header;