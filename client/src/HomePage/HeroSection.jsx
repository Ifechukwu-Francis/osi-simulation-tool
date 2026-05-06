import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';
import { S } from './components/light';

const HeroSection = () => {
  const navigate = useNavigate();

  useGSAP(() => {
    gsap.from('.hero-content > *', {
      opacity: 0,
      y: 30,
      stagger: 0.2,
      duration: 1,
      ease: 'power4.out'
    });
  }, []);

  const handleLearnMore = () => {
    const aboutSection = document.querySelector('.about-section');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section style={S.heroSection}>
      <div className="hero-content">
        <div style={{ color: '#93c5fd', fontSize: '12px', letterSpacing: '4px', fontWeight: '600' }}>
          INTERACTIVE LEARNING TOOL
        </div>
        
        <h1 style={S.headline}>
          Master the <span style={S.gradientText}>OSI Model</span>
        </h1>
        
        <p style={S.subheadline}>Visualise data transmission in real-time.</p>
        
        <div style={S.buttonContainer}>
          <button style={S.btnPrimary} onClick={() => navigate('/simulator')}>
            🚀 Try the Simulator →
          </button>
          <button style={S.btnSecondary} onClick={handleLearnMore}>
            📖 Learn More ↓
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;