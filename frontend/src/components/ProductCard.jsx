// frontend/src/components/ProductCard.jsx
import React, { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useContext(CartContext);
    const [quantity, setQuantity] = useState(1);

    const adjustQty = (val) => {
        if (quantity + val >= 1) setQuantity(prev => prev + val);
    };

    return (
        <div style={styles.card}>
            <div style={styles.imageContainer}>
                <div style={styles.imageBackground}>
                    <img src={product.image} alt={product.name} style={styles.image} />
                </div>
                <span style={styles.categoryBadge}>{product.category}</span>
            </div>

            <div style={styles.info}>
                <h3 style={styles.title}>{product.name}</h3>
                <p style={styles.description}>{product.description}</p>

                <div style={styles.footer}>
                    <div style={styles.qtyContainer}>
                        <button onClick={() => adjustQty(-1)} style={styles.qtyBtn}>-</button>
                        <span style={styles.qtyValue}>{quantity}</span>
                        <button onClick={() => adjustQty(1)} style={styles.qtyBtn}>+</button>
                    </div>

                    <div style={styles.buyArea}>
                        <div style={styles.priceContainer}>
                            <span style={styles.priceValue}>
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price * quantity)}
                            </span>
                        </div>
                        <button
                            style={styles.button}
                            onClick={() => {
                                addToCart(product, quantity);
                                setQuantity(1); // Reseta para 1 após adicionar
                            }}
                        >
                            Adicionar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    card: {
        backgroundColor: '#fff',
        borderRadius: '12px',
        height: '100%', // <-- O segredo do alinhamento vertical
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #f1f5f9'
    },    imageContainer: { position: 'relative', height: '180px', overflow: 'hidden' },
    imageBackground: { width: '100%', height: '100%', backgroundColor: '#f8fafc', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px' },
    image: { maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' },
    categoryBadge: { position: 'absolute', top: '10px', left: '10px', backgroundColor: '#1e293b', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 'bold' },
    info: { padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' },
    title: { fontSize: '0.9rem', fontWeight: '700', color: '#0f172a', margin: 0, minHeight: '38px' },
    description: { fontSize: '0.75rem', color: '#64748b', margin: 0, minHeight: '32px' },
    footer: { display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid #f1f5f9', paddingTop: '12px' },
    qtyContainer: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', backgroundColor: '#f8fafc', borderRadius: '6px', padding: '4px' },
    qtyBtn: { background: 'none', border: 'none', fontSize: '1.2rem', color: '#64748b', cursor: 'pointer', padding: '0 10px' },
    qtyValue: { fontSize: '0.9rem', fontWeight: '600', color: '#0f172a', minWidth: '20px', textAlign: 'center' },
    buyArea: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    priceValue: { fontSize: '1rem', fontWeight: '700', color: '#0f172a' },
    button: { backgroundColor: '#0f172a', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '0.8rem' }
};

export default ProductCard;