// frontend/src/components/ProductCard.jsx
import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useContext(CartContext);

    return (
        <div style={styles.card}>
            <div style={styles.imageContainer}>
                <img src={product.image} alt={product.name} style={styles.image} />
                <span style={styles.categoryBadge}>{product.category}</span>
            </div>

            <div style={styles.info}>
                <h3 style={styles.title}>{product.name}</h3>
                <p style={styles.description}>{product.description}</p>

                <div style={styles.footer}>
                    <div style={styles.priceContainer}>
                        <span style={styles.currency}>R$</span>
                        <span style={styles.priceValue}>{product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <button
                        style={styles.button}
                        onClick={() => addToCart(product)}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#1e7e34'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
                    >
                        Comprar
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    card: {
        backgroundColor: '#fff',
        borderRadius: '12px',
        width: '280px',
        overflow: 'hidden',
        boxShadow: '0 8px 24px rgba(149, 157, 165, 0.15)',
        transition: 'transform 0.2s ease',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #f0f0f0'
    },
    imageContainer: {
        position: 'relative',
        height: '180px',
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },
    categoryBadge: {
        position: 'absolute',
        top: '10px',
        left: '10px',
        backgroundColor: 'rgba(44, 62, 80, 0.8)',
        color: 'white',
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '0.7rem',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    info: {
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1
    },
    title: {
        fontSize: '1rem',
        fontWeight: '700',
        color: '#333',
        margin: '0 0 8px 0',
        minHeight: '40px'
    },
    description: {
        fontSize: '0.85rem',
        color: '#777',
        lineHeight: '1.4',
        marginBottom: '16px',
        flexGrow: 1
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1px solid #f0f0f0',
        paddingTop: '12px'
    },
    priceContainer: {
        display: 'flex',
        flexDirection: 'column'
    },
    currency: {
        fontSize: '0.7rem',
        color: '#888',
        fontWeight: 'bold'
    },
    priceValue: {
        fontSize: '1.2rem',
        fontWeight: '800',
        color: '#2c3e50'
    },
    button: {
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        padding: '10px 16px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'background-color 0.2s ease'
    }
};

export default ProductCard;