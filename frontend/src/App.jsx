// frontend/src/App.jsx
import React, { useEffect, useState, useContext } from 'react'; // Adicione o useContext aqui
import Home from './pages/Home';
import Header from './components/Header';
import Report from './pages/Report';
import { CartContext } from './contexts/CartContext'; // Importe o contexto

function App() {
  const [statusMessage, setStatusMessage] = useState(null);
  const [currentView, setCurrentView] = useState('loja');

  // Puxa a função de limpar do contexto
  const { clearCart } = useContext(CartContext);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setStatusMessage({ type: 'success', text: "Pagamento aprovado! Seu pedido já está sendo separado." });
      clearCart(); // Limpa a sacola porque a compra deu certo
    }

    if (query.get("canceled")) {
      setStatusMessage({ type: 'warning', text: "Compra cancelada. O carrinho foi mantido." });
      // Não chamamos o clearCart aqui, pois a pessoa pode querer tentar pagar de novo
    }

    if (query.get("success") || query.get("canceled")) {
      window.history.replaceState({}, document.title, "/");
    }
  }, []); // Mantemos o array vazio para rodar apenas quando a página carregar

  return (

    // Fundo cinza bem moderno (#e2e8f0) em vez do branco absoluto
    <div style={{ fontFamily: '"Inter", "Segoe UI", sans-serif', backgroundColor: '#e2e8f0', minHeight: '100vh', paddingBottom: '60px' }}>
      <Header />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>

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

        {statusMessage && (
          <div style={{
            ...styles.alertBanner,
            backgroundColor: statusMessage.type === 'success' ? '#f0fdf4' : '#fffbeb',
            color: statusMessage.type === 'success' ? '#166534' : '#92400e',
            border: `1px solid ${statusMessage.type === 'success' ? '#bbf7d0' : '#fef3c7'}`
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {statusMessage.type === 'success' ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              )}
              <span><strong style={{ fontWeight: 600 }}>{statusMessage.type === 'success' ? 'Sucesso: ' : 'Atenção: '}</strong> {statusMessage.text}</span>
            </div>
          </div>
        )}

        <main style={{ marginTop: '30px' }}>
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
    margin: '40px 0 30px 0'
  },
  tabsWrapper: {
    backgroundColor: '#cbd5e1', // Cinza médio para o contêiner das abas
    padding: '6px',
    borderRadius: '12px',
    display: 'inline-flex',
    gap: '6px',
    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)' // Sombra interna para dar profundidade
  },
  tab: {
    padding: '10px 28px',
    borderRadius: '8px',
    border: 'none',
    fontWeight: '600',
    fontSize: '0.95rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  activeTab: {
    backgroundColor: '#ffffff',
    color: '#0f172a',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' // Sombra para parecer que o botão está levantado
  },
  inactiveTab: {
    backgroundColor: 'transparent',
    color: '#475569' // Cinza escuro para abas não selecionadas
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