// frontend/src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Novos estados para busca e filtro
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todas');

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data);
            } catch (error) {
                console.error("Erro ao carregar produtos", error);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    // Extrai as categorias únicas automaticamente dos produtos que vierem do banco
    const categories = ['Todas', ...new Set(products.map(p => p.category))];

    // Lógica de filtragem
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'Todas' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    if (loading) return <div style={styles.loading}>Carregando catálogo...</div>;

    return (
        <div style={styles.container}>

            {/* Seção de Busca e Filtros */}
            <div style={styles.filterSection}>
                <div style={styles.searchWrapper}>
                    <svg style={styles.searchIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <input
                        type="text"
                        placeholder="Buscar raquetes, tênis, cordas..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={styles.searchInput}
                    />
                </div>

                <div style={styles.categoriesWrapper}>
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            style={{
                                ...styles.categoryBtn,
                                ...(selectedCategory === category ? styles.categoryBtnActive : {})
                            }}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grade de Produtos Corrigida */}
            {filteredProducts.length === 0 ? (
                <div style={styles.emptyState}>Nenhum produto encontrado para sua busca.</div>
            ) : (
                <div style={styles.grid}>
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

const styles = {
    container: { paddingBottom: '40px' },
    loading: { textAlign: 'center', marginTop: '50px', color: '#64748b', fontSize: '1.2rem' },

    // Estilos da Barra de Busca e Filtros
    filterSection: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        marginBottom: '32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        border: '1px solid #f1f5f9'
    },
    searchWrapper: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
    },
    searchIcon: {
        position: 'absolute',
        left: '16px'
    },
    searchInput: {
        width: '100%',
        padding: '14px 14px 14px 44px',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        fontSize: '1rem',
        color: '#0f172a',
        backgroundColor: '#f8fafc',
        outline: 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s'
    },
    categoriesWrapper: {
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap'
    },
    categoryBtn: {
        padding: '8px 16px',
        borderRadius: '20px',
        border: '1px solid #e2e8f0',
        backgroundColor: '#fff',
        color: '#475569',
        fontSize: '0.85rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
    },
    categoryBtnActive: {
        backgroundColor: '#0f172a',
        color: '#fff',
        borderColor: '#0f172a'
    },
    emptyState: {
        textAlign: 'center',
        padding: '40px',
        color: '#64748b',
        backgroundColor: '#fff',
        borderRadius: '12px',
        border: '1px dashed #cbd5e1'
    },

    // A MÁGICA DO ALINHAMENTO ESTÁ AQUI NA GRADE
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '24px',
        alignItems: 'stretch' // Garante que todos os cards na mesma linha tenham a mesma altura
    }
};

export default Home;