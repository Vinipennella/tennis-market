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
                    {/* Ícone vetorial limpo substituindo o emoji */}
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 2a14.5 14.5 0 0 0 0 20"></path>
                        <path d="M2 12h20"></path>
                    </svg>
                    <h2 style={styles.logoText}>TennisMarket</h2>
                </div>

                <div style={styles.actions}>
                    <button style={styles.cartBtn} onClick={() => setIsCartOpen(true)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        padding: '16px 40px', backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 100,
    },
    logoContainer: { display: 'flex', alignItems: 'center', gap: '10px' },
    logoText: { margin: 0, color: '#0f172a', fontSize: '1.3rem', fontWeight: '800', letterSpacing: '-0.5px' },
    actions: { display: 'flex', alignItems: 'center' },
    cartBtn: {
        background: 'none', border: 'none', cursor: 'pointer', color: '#334155',
        position: 'relative', display: 'flex', alignItems: 'center', padding: '8px'
    },
    badge: {
        position: 'absolute', top: '0', right: '0',
        backgroundColor: '#dc2626', color: 'white', fontSize: '0.7rem',
        fontWeight: 'bold', width: '18px', height: '18px',
        borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center'
    }
};

export default Header;