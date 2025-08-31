import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LiveChat from './components/LiveChat';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Booking from './pages/Booking';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import ClientDashboard from './pages/ClientDashboard';
import AuthModal from './components/AuthModal';

function App() {
  useEffect(() => {
    // Initialize feather icons
    if (window.feather) {
      window.feather.replace();
    }
  }, []);

  return (
    <Router>
      <div className="bg-white">
        <Routes>
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/cliente/*" element={<ClientDashboard />} />
          <Route path="/*" element={
            <>
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/sobre" element={<About />} />
                  <Route path="/servicos" element={<Services />} />
                  <Route path="/agendamento" element={<Booking />} />
                  <Route path="/contato" element={<Contact />} />
                </Routes>
              </main>
              <Footer />
              <LiveChat />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;