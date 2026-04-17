// frontend/src/contexts/CartContext.jsx
import React, { createContext, useState } from 'react';

// Criamos o contexto
export const CartContext = createContext();

// Criamos o provedor que vai englobar nossa aplicação
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            // Verifica se o produto já está no carrinho
            const existingProduct = prevCart.find((item) => item.id === product.id);

            if (existingProduct) {
                // Se já existe, só aumenta a quantidade
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            // Se não existe, adiciona o produto com quantidade 1
            return [...prevCart, { ...product, quantity: 1 }];
        });
        alert(`${product.name} adicionado ao carrinho!`);
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    // Calcula o valor total do carrinho
    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, cartTotal }}>
            {children}
        </CartContext.Provider>
    );
};