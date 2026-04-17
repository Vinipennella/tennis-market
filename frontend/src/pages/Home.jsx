// frontend/src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';

const Home = () => {
    // Estado para guardar a lista de produtos que virá do backend
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // O useEffect roda automaticamente quando a tela abre
    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data);
            } catch (error) {
                console.error("Erro ao carregar os produtos. O backend está rodando?");
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    if (loading) {
        return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Carregando a loja...</h2>;
    }

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', color: '#333' }}>Catálogo de Tênis</h1>

            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '20px',
                marginTop: '30px'
            }}>
                {/* Aqui fazemos um 'map' (loop) para criar um card para cada produto */}
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Home;