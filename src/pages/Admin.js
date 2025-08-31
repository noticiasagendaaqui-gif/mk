import React, { useState, useEffect } from 'react';
import AdminDashboard from '../components/admin/AdminDashboard';
import UserManagement from '../components/admin/UserManagement';
import BookingManagement from '../components/admin/BookingManagement';
import ServiceManagement from '../components/admin/ServiceManagement';
import Reports from '../components/admin/Reports';
import Settings from '../components/admin/Settings';
import ChatManagement from '../components/admin/ChatManagement';
import ReviewsManagement from '../components/admin/ReviewsManagement';
import BlogManagement from '../components/admin/BlogManagement';
import LoyaltyManagement from '../components/admin/LoyaltyManagement';
import QuoteManagement from '../components/admin/QuoteManagement';
import EmailManagement from '../components/admin/EmailManagement'; // Importe o EmailManagement
import StaffManagement from '../components/admin/StaffManagement'; // Import StaffManagement
import ProviderApplications from '../components/admin/ProviderApplications'; // Import ProviderApplications

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Verificar se usuário está logado e é admin
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.role !== 'admin') {
        // Redirecionar se não for admin
        window.location.href = '/';
        return;
      }
      setUser(parsedUser);
    } else {
      // Redirecionar se não estiver logado
      window.location.href = '/';
    }
  }, []);

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      component: <AdminDashboard />
    },
    {
      id: 'users',
      label: 'Usuários',
      icon: '👥',
      component: <UserManagement />
    },
    {
      id: 'bookings',
      label: 'Agendamentos',
      icon: '📅',
      component: <BookingManagement />
    },
    {
      id: 'services',
      label: 'Serviços',
      icon: '🧹',
      component: <ServiceManagement />
    },
    {
      id: 'quotes',
      label: 'Orçamentos',
      icon: '💰',
      component: <QuoteManagement />
    },
    { id: 'emails', label: 'Gestão de Emails', icon: '📧', component: EmailManagement },
    {
      id: 'chat',
      label: 'Chat ao Vivo',
      icon: '💬',
      component: <ChatManagement />
    },
    {
      id: 'reviews',
      label: 'Avaliações',
      icon: '⭐',
      component: <ReviewsManagement />
    },
    {
      id: 'blog',
      label: 'Blog',
      icon: '📝',
      component: <BlogManagement />
    },
    { id: 'loyalty', label: 'Programa Fidelidade', icon: '🎁', component: <LoyaltyManagement /> },
    { id: 'provider-applications', label: 'Solicitações Prestadores', icon: '🙋‍♂️', component: <ProviderApplications /> },
    {
      id: 'reports',
      label: 'Relatórios',
      icon: '📈',
      component: <Reports />
    },
    {
      id: 'settings',
      label: 'Configurações',
      icon: '⚙️',
      component: <Settings />
    },
    {
      id: 'staff',
      label: 'Funcionários',
      icon: '👷',
      component: <StaffManagement />
    }
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">Painel Administrativo</h1>
            <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
              Admin
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Olá, {user.name}</span>
            <button
              onClick={() => {
                localStorage.removeItem('user');
                window.location.href = '/';
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === item.id
                        ? 'bg-primary-100 text-primary-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {menuItems.find(item => item.id === activeTab)?.component}
        </main>
      </div>
    </div>
  );
};

export default Admin;