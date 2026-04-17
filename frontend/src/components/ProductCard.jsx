// frontend/src/components/ProductCard.jsx
import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useContext(CartContext);

    return (
        <div style={styles.card}>
            <div style={styles.imageContainer}>
                {/* Adicionamos um fundo leve para preencher o espaço vazio ao redor da raquete */}
                <div style={styles.imageBackground}>
                    <img src={product.image} alt={product.name} style={styles.image} />
                </div>
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
        boxShadow: '0 8px 24px rgba(149, 157, 165, 0.1)', // Sombra mais suave
        transition: 'transform 0.2s ease',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #f0f0f0'
    },
    imageContainer: {
        position: 'relative',
        height: '200px', // Aumentamos um pouco a altura para acomodar melhor a raquete inteira
        overflow: 'hidden',
        borderBottom: '1px solid #f0f0f0'
    },
    imageBackground: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fbfbfb', // Um cinza quase branco para preencher as laterais
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px' // Um pequeno respiro para a raquete não encostar nas bordas
    },
    image: {
        maxWidth: '100%',
        maxHeight: '100%',
        // A MÁGICA ESTÁ AQUI: 'contain' garante que a imagem inteira apareça, sem cortes.
        objectFit: 'contain'
    },
    categoryBadge: {
        position: 'absolute',
        top: '10px',
        left: '10px',
        backgroundColor: 'rgba(44, 62, 80, 0.9)', // Mais opaco para leitura
        color: 'white',
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '0.65rem',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
    },
    info: {
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1
    },
    title: {
        fontSize: '0.95rem',
        fontWeight: '700',
        color: '#333',
        margin: '0 0 8px 0',
        minHeight: '40px', // Garante alinhamento mesmo com títulos curtos
        lineHeight: '1.3'
    },
    description: {
        fontSize: '0.8rem',
        color: '#777',
        lineHeight: '1.4',
        marginBottom: '16px',
        flexGrow: 1,
        minHeight: '45px' // Mantém o botão de comprar alinhado
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1px solid #f0f0f0',
        paddingTop: '12px',
        marginTop: 'auto' // Empurra o rodapé para o final do card
    },
    priceContainer: {
        display: 'flex',
        flexDirection: 'column'
    },
    currency: {
        fontSize: '0.65rem',
        color: '#888',
        fontWeight: 'bold',
        marginBottom: '-2px'
    },
    priceValue: {
        fontSize: '1.15rem',
        fontWeight: '800',
        color: '#2c3e50'
    },
    button: {
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        padding: '10px 18px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '0.85rem',
        transition: 'all 0.2s ease',
        boxShadow: '0 2px 4px rgba(40, 167, 69, 0.2)'
    }
};

export default ProductCard;