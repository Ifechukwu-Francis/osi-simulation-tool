import { Link, useNavigate, useLocation } from 'react-router-dom';
import { S } from './components/light'; 
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAboutClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const aboutSection = document.querySelector('.about-section');
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const aboutSection = document.querySelector('.about-section');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  return (
    <nav style={S.navBase(isScrolled)}>
      <div style={S.navContainer}>
        <div style={S.navFlex}>
          {/* Logo */}
          <div style={{ flexShrink: 0 }}>
            <Link to="/" style={S.navLogo}>OSI Simulator</Link>
          </div>

          {/* Desktop Links */}
          <div style={S.navDesktopLinks}>
            <Link to="/" style={S.navLink}>Home</Link>
            <button
              onClick={handleAboutClick}
              style={{ ...S.navLink, background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem', fontFamily: 'inherit' }}
            >
              About
            </button>
            <Link to="/simulator" style={S.navLink}>Simulator</Link>
          </div>

          {/* Mobile Toggle Button */}
          <div style={S.navMobileBtnArea}>
            <button onClick={() => setIsOpen(!isOpen)} style={S.navMobileBtn}>
              <svg style={{ height: '24px', width: '24px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen 
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div style={S.navMobileMenu(isOpen)}>
        <Link to="/" onClick={() => setIsOpen(false)} style={S.navMobileLink}>
          Home
        </Link>
        <button
          onClick={handleAboutClick}
          style={{ ...S.navMobileLink, background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.95rem', fontFamily: 'inherit', width: '100%', textAlign: 'left' }}
        >
          About
        </button>
        <Link to="/simulator" onClick={() => setIsOpen(false)} style={S.navMobileLink}>
          Simulator
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;