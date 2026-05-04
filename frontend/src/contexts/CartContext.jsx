// frontend/src/contexts/CartContext.jsx
import React, { createContext, useState, useMemo, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // 1. Inicializa o estado lendo do LocalStorage (se existir)
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('@TennisMarket:cart');
        if (savedCart) {
            return JSON.parse(savedCart);
        }
        return [];
    });

    // 2. Sempre que o carrinho mudar, salva a nova versão no LocalStorage
    useEffect(() => {
        localStorage.setItem('@TennisMarket:cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product, quantity = 1) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                const maxQty = product.stock ?? Infinity;
                const newQty = Math.min(existingItem.quantity + quantity, maxQty);
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: newQty }
                        : item
                );
            }
            const cappedQty = product.stock != null ? Math.min(quantity, product.stock) : quantity;
            return [...prevCart, { ...product, quantity: cappedQty }];
        });
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, delta) => {
        setCart(prevCart => prevCart.map(item => {
            if (item.id === productId) {
                const newQty = item.quantity + delta;
                const maxQty = item.stock ?? Infinity;
                return { ...item, quantity: Math.min(Math.max(newQty, 1), maxQty) };
            }
            return item;
        }));
    };

    // 3. Nova função para limpar o carrinho após a compra
    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('@TennisMarket:cart');
    };

    const cartTotal = useMemo(() => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal }}>
            {children}
        </CartContext.Provider>
    );
};