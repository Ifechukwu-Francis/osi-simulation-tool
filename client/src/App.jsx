import { Routes, Route, Navigate } from 'react-router-dom';
import HeroSection from './HomePage/HeroSection.jsx';
import AboutSection from './HomePage/AboutSection.jsx';
import Navbar from './HomePage/Navbar.jsx'; 
import Footer from './HomePage/Footer.jsx';
import QuizSection from './HomePage/QuizSection.jsx';
import Admin from './Admin';
import { S } from './HomePage/components/light.js';
import SimulatorPage from './Pages/SimulatorPage.jsx';

// --- AUTHENTICATION LOGIC ---
const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem('admin_token');
  return token === import.meta.env.VITE_ADMIN_TOKEN
    ? children
    : <Navigate to="/admin-login" replace />;
};

const AdminLogin = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    const input = e.target.elements.token.value.trim();
    if (input === import.meta.env.VITE_ADMIN_TOKEN) {
      sessionStorage.setItem('admin_token', input);
      window.location.href = '/admin';
    } else {
      alert('Invalid token');
    }
  };

  return (
    <div style={{ ...S.page, justifyContent: 'center', minHeight: '80vh' }}>
      <form onSubmit={handleLogin} style={S.adminForm}>
        <h2 style={{ color: 'white', marginBottom: '15px' }}>Admin Access</h2>
        <input
          name="token"
          type="password"
          placeholder="Enter admin token"
          style={S.adminInput}
        />
        <button type="submit" style={S.adminButton(false)}>
          Login
        </button>
      </form>
    </div>
  );
};

// --- MAIN APPLICATION ---
const App = () => {
  return (
    <div style={S.pageWrapper}>
      {/* Navbar stays at the top for all pages */}
      <Navbar /> 
      
      <main style={{ flexGrow: 1 }}>
        <Routes>
          {/* Main Landing Page */}
          <Route path="/" element={
            <>
              <HeroSection />
              <AboutSection />
              <QuizSection /> 
            </>
          } />

          {/* OSI Simulation Page */}
          <Route path="/simulator" element={<SimulatorPage />} />

          {/* Admin & Security Routes */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } />

          {/* 404 Fallback */}
          <Route path="*" element={
            <div style={{ color: 'white', textAlign: 'center', marginTop: '100px', minHeight: '60vh' }}>
              <h1>404 — Page Not Found</h1>
              <p>The packet you are looking for has been dropped.</p>
            </div>
          } />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;