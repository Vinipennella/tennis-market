// frontend/src/App.jsx
import React, { useEffect, useState } from 'react';
import Home from './pages/Home';
import Header from './components/Header';
import Report from './pages/Report';

function App() {
  const [statusMessage, setStatusMessage] = useState(null);
  const [currentView, setCurrentView] = useState('loja');

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) setStatusMessage({ type: 'success', text: "Pagamento aprovado! Seu pedido já está sendo separado." });
    if (query.get("canceled")) setStatusMessage({ type: 'warning', text: "Compra cancelada. O carrinho foi mantido." });

    // Limpa a URL para o visual ficar mais limpo
    if (query.get("success") || query.get("canceled")) {
      window.history.replaceState({}, document.title, "/");
    }
  }, []);

  return (
    <div style={{ fontFamily: '"Inter", "Segoe UI", sans-serif', backgroundColor: '#f5f7f9', minHeight: '100vh', paddingBottom: '40px' }}>
      <Header />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>

        {/* Navegação em Tabs Modernas */}
        <div style={styles.navContainer}>
          <div style={styles.tabsWrapper}>
            <button
              onClick={() => setCurrentView('loja')}
              style={{ ...styles.tab, ...(currentView === 'loja' ? styles.activeTab : styles.inactiveTab) }}
            >
              Vitrine de Produtos
            </button>
            <button
              onClick={() => setCurrentView('relatorio')}
              style={{ ...styles.tab, ...(currentView === 'relatorio' ? styles.activeTab : styles.inactiveTab) }}
            >
              Painel Gerencial
            </button>
          </div>
        </div>

        {/* Alerta de Status Flutuante */}
        {statusMessage && (
          <div style={{
            ...styles.alertBanner,
            backgroundColor: statusMessage.type === 'success' ? '#edf7ed' : '#fff4e5',
            color: statusMessage.type === 'success' ? '#1e4620' : '#663c00',
            borderLeft: `4px solid ${statusMessage.type === 'success' ? '#4caf50' : '#ff9800'}`
          }}>
            <strong>{statusMessage.type === 'success' ? '✅ Sucesso:' : '⚠️ Atenção:'}</strong> {statusMessage.text}
          </div>
        )}

        <main style={{ marginTop: '20px' }}>
          {currentView === 'loja' ? <Home /> : <Report />}
        </main>

      </div>
    </div>
  );
}

const styles = {
  navContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '30px 0 20px 0'
  },
  tabsWrapper: {
    backgroundColor: '#e9ecef',
    padding: '4px',
    borderRadius: '12px',
    display: 'inline-flex',
    gap: '4px'
  },
  tab: {
    padding: '10px 24px',
    borderRadius: '8px',
    border: 'none',
    fontWeight: '600',
    fontSize: '0.9rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  activeTab: {
    backgroundColor: '#ffffff',
    color: '#2c3e50',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  },
  inactiveTab: {
    backgroundColor: 'transparent',
    color: '#6c757d'
  },
  alertBanner: {
    padding: '16px 20px',
    borderRadius: '8px',
    marginBottom: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    fontSize: '0.95rem'
  }
};

export default App;