// frontend/src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todas');

    // Novo estado para ordenação
    const [sortOrder, setSortOrder] = useState('featured');

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

    const categories = ['Todas', ...new Set(products.map(p => p.category))];

    // 1. Filtragem (Busca + Categoria)
    const filtered = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'Todas' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // 2. Ordenação (Aplicada sobre o resultado filtrado)
    const sortedProducts = [...filtered].sort((a, b) => {
        if (sortOrder === 'price-low') return a.price - b.price;
        if (sortOrder === 'price-high') return b.price - a.price;
        if (sortOrder === 'name') return a.name.localeCompare(b.name);
        return 0; // 'featured' ou padrão
    });

    if (loading) return <div style={styles.loading}>A carregar catálogo...</div>;

    return (
        <div style={styles.container}>

            <div style={styles.filterSection}>
                <div style={styles.topFilters}>
                    <div style={styles.searchWrapper}>
                        <svg style={styles.searchIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        <input
                            type="text"
                            placeholder="O que procura hoje?"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={styles.searchInput}
                        />
                    </div>

                    <div style={styles.sortWrapper}>
                        <label style={styles.sortLabel}>Ordenar por:</label>
                        <select
                            style={styles.select}
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="featured">Destaques</option>
                            <option value="price-low">Menor Preço</option>
                            <option value="price-high">Maior Preço</option>
                            <option value="name">Nome (A-Z)</option>
                        </select>
                    </div>
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

            {sortedProducts.length === 0 ? (
                <div style={styles.emptyState}>Nenhum produto encontrado.</div>
            ) : (
                <div style={styles.grid}>
                    {sortedProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

const styles = {
    container: { paddingBottom: '40px' },
    loading: { textAlign: 'center', marginTop: '50px', color: '#64748b' },
    filterSection: {
        backgroundColor: '#fff',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        marginBottom: '32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        border: '1px solid #e2e8f0'
    },
    topFilters: {
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    searchWrapper: { position: 'relative', flex: 1, minWidth: '300px' },
    searchIcon: { position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' },
    searchInput: {
        width: '100%',
        padding: '12px 12px 12px 42px',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        backgroundColor: '#f8fafc',
        fontSize: '0.95rem',
        outline: 'none'
    },
    sortWrapper: { display: 'flex', alignItems: 'center', gap: '10px' },
    sortLabel: { fontSize: '0.85rem', color: '#64748b', fontWeight: '500' },
    select: {
        padding: '10px',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        backgroundColor: '#fff',
        fontSize: '0.9rem',
        color: '#0f172a',
        cursor: 'pointer',
        outline: 'none'
    },
    categoriesWrapper: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
    categoryBtn: {
        padding: '8px 16px',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        backgroundColor: '#fff',
        color: '#64748b',
        fontSize: '0.85rem',
        fontWeight: '600',
        cursor: 'pointer'
    },
    categoryBtnActive: { backgroundColor: '#1e293b', color: '#fff', borderColor: '#1e293b' },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '24px',
        alignItems: 'stretch'
    },
    emptyState: { textAlign: 'center', padding: '60px', color: '#94a3b8', backgroundColor: '#fff', borderRadius: '12px' }
};

export default Home;