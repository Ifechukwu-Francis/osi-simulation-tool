import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
    const username = e.target.elements.username.value.trim();
    const password = e.target.elements.password.value.trim();
    
    if (
      username === import.meta.env.VITE_ADMIN_USERNAME &&
      password === import.meta.env.VITE_ADMIN_PASSWORD
    ) {
      sessionStorage.setItem('admin_token', import.meta.env.VITE_ADMIN_TOKEN);
      window.location.href = '/admin';
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>
      <form onSubmit={handleLogin} style={S.adminForm}>
        <h2 style={{ color: '#1e293b', marginBottom: '24px', textAlign: 'center', fontSize: '1.5rem', fontWeight: '700' }}>
          Admin Login
        </h2>
        <input
          name="username"
          type="text"
          placeholder="Username"
          style={S.adminInput}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          style={S.adminInput}
        />
        <button type="submit" style={S.adminButton}>
          Login
        </button>
      </form>
    </div>
  );
};

// --- MAIN APPLICATION ---
const App = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div style={S.pageWrapper}>
      {/* Hide navbar on admin pages */}
      {!isAdminPage && <Navbar />}
      
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
            <div style={{ color: '#1e293b', textAlign: 'center', marginTop: '100px', minHeight: '60vh' }}>
              <h1>404 — Page Not Found</h1>
              <p>The packet you are looking for has been dropped.</p>
            </div>
          } />
        </Routes>
      </main>

      {/* Hide footer on admin pages */}
      {!isAdminPage && <Footer />}
    </div>
  );
};

export default App;