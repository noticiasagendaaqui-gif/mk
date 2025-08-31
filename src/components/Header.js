import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthModal from './AuthModal';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setUserMenuOpen(false);
    localStorage.removeItem('user');
  };

  // Carregar usuário do localStorage ao inicializar
  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <header className="bg-white shadow-lg fixed w-full top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img src="/assets/images/logo.svg" alt="LimpaBrasil" className="h-10 w-10" />
            <h1 className="text-2xl font-bold text-primary-600">LimpaBrasil</h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`font-medium transition-colors ${
                isActive('/') ? 'text-primary-600' : 'text-secondary-700 hover:text-primary-600'
              }`}
            >
              Início
            </Link>
            <Link
              to="/sobre"
              className={`font-medium transition-colors ${
                isActive('/sobre') ? 'text-primary-600' : 'text-secondary-700 hover:text-primary-600'
              }`}
            >
              Sobre
            </Link>
            <Link
              to="/servicos"
              className={`font-medium transition-colors ${
                isActive('/servicos') ? 'text-primary-600' : 'text-secondary-700 hover:text-primary-600'
              }`}
            >
              Serviços
            </Link>
            <Link
              to="/agendamento"
              className={`font-medium transition-colors ${
                isActive('/agendamento') ? 'text-primary-600' : 'text-secondary-700 hover:text-primary-600'
              }`}
            >
              Agendamento
            </Link>
            <Link
              to="/contato"
              className={`font-medium transition-colors ${
                isActive('/contato') ? 'text-primary-600' : 'text-secondary-700 hover:text-primary-600'
              }`}
            >
              Contato
            </Link>
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 text-secondary-700 hover:text-primary-600 transition-colors"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="font-medium">{user.name}</span>
                  <i data-feather="chevron-down" className="w-4 h-4"></i>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <Link
                      to="/agendamento"
                      className="block px-4 py-2 text-secondary-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <i data-feather="calendar" className="w-4 h-4 inline-block mr-2"></i>
                      Meus Agendamentos
                    </Link>
                    <Link
                      to="/perfil"
                      className="block px-4 py-2 text-secondary-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <i data-feather="user" className="w-4 h-4 inline-block mr-2"></i>
                      Meu Perfil
                    </Link>
                    <hr className="my-2" />
                    {user.role === 'admin' && (
                      <a
                        href="/admin"
                        className="block px-4 py-2 text-secondary-700 hover:bg-gray-50 transition-colors"
                      >
                        <i data-feather="settings" className="w-4 h-4 inline-block mr-2"></i>
                        Painel Admin
                      </a>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50 transition-colors"
                    >
                      <i data-feather="log-out" className="w-4 h-4 inline-block mr-2"></i>
                      Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="text-secondary-700 hover:text-primary-600 font-medium transition-colors"
                >
                  Entrar
                </button>
                <Link
                  to="/agendamento"
                  className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Agendar Serviço
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2"
          >
            <i data-feather={mobileMenuOpen ? 'x' : 'menu'} className="w-6 h-6"></i>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden mt-4 pb-4`}>
          <Link to="/" className="block py-2 text-secondary-700 hover:text-primary-600">Início</Link>
          <Link to="/sobre" className="block py-2 text-secondary-700 hover:text-primary-600">Sobre</Link>
          <Link to="/servicos" className="block py-2 text-secondary-700 hover:text-primary-600">Serviços</Link>
          <Link to="/agendamento" className="block py-2 text-secondary-700 hover:text-primary-600">Agendamento</Link>
          <Link to="/contato" className="block py-2 text-secondary-700 hover:text-primary-600">Contato</Link>

          {user ? (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-3 mb-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-medium text-secondary-700">{user.name}</span>
              </div>
              <Link to="/perfil" className="block py-2 text-secondary-700 hover:text-primary-600">Meu Perfil</Link>
              {user.role === 'admin' && (
                <a
                  href="/admin"
                  className="block py-2 text-secondary-700 hover:text-primary-600"
                >
                  <i data-feather="settings" className="w-4 h-4 inline-block mr-2"></i>
                  Painel Admin
                </a>
              )}
              <button
                onClick={handleLogout}
                className="block py-2 text-red-600 hover:text-red-700 w-full text-left"
              >
                Sair
              </button>
            </div>
          ) : (
            <div className="mt-4 space-y-2">
              <button
                onClick={() => {
                  setAuthModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-center border border-primary-600 text-primary-600 hover:bg-primary-50 px-6 py-3 rounded-lg font-medium"
              >
                Entrar
              </button>
            </div>
          )}

          <Link
            to="/agendamento"
            className="block mt-4 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium text-center"
          >
            Agendar Serviço
          </Link>
        </div>
      </nav>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLogin={handleLogin}
      />
    </header>
  );
};

export default Header;