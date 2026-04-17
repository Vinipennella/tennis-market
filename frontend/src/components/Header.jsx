// frontend/src/components/Header.jsx
import React, { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContext';
import CartModal from './CartModal';

const Header = () => {
    const { cart } = useContext(CartContext);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <>
            <header style={styles.header}>
                <div style={styles.logoContainer}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f8fafc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 2a14.5 14.5 0 0 0 0 20"></path>
                        <path d="M2 12h20"></path>
                    </svg>
                    <h2 style={styles.logoText}>TennisMarket</h2>
                </div>

                <div style={styles.actions}>
                    <button style={styles.cartBtn} onClick={() => setIsCartOpen(true)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f8fafc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <path d="M16 10a4 4 0 0 1-8 0"></path>
                        </svg>
                        {totalItems > 0 && <span style={styles.badge}>{totalItems}</span>}
                    </button>
                </div>
            </header>

            <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
};

const styles = {
    header: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '16px 40px',
        backgroundColor: '#1e293b', // Grafite escuro elegante
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        position: 'sticky', top: 0, zIndex: 100,
    },
    logoContainer: { display: 'flex', alignItems: 'center', gap: '10px' },
    logoText: { margin: 0, color: '#f8fafc', fontSize: '1.3rem', fontWeight: '800', letterSpacing: '-0.5px' },
    actions: { display: 'flex', alignItems: 'center' },
    cartBtn: {
        background: 'rgba(255, 255, 255, 0.1)', // Fundo sutil para o botão do carrinho
        border: '1px solid rgba(255, 255, 255, 0.2)',
        cursor: 'pointer', color: '#f8fafc',
        position: 'relative', display: 'flex', alignItems: 'center',
        padding: '10px', borderRadius: '8px', transition: 'background 0.2s'
    },
    badge: {
        position: 'absolute', top: '-6px', right: '-6px',
        backgroundColor: '#10b981', // Verde esmeralda para dar um ponto de cor
        color: 'white', fontSize: '0.75rem',
        fontWeight: 'bold', width: '20px', height: '20px',
        borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center',
        border: '2px solid #1e293b' // Borda da mesma cor do header para não "vazar"
    }
};

export default Header;