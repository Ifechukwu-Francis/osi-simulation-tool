import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { S } from './components/light';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const container = useRef();

  useGSAP(() => {
    // Header Animation
    gsap.from('.about-header > *', {
      scrollTrigger: { trigger: '.about-header', start: 'top 85%' },
      opacity: 0, y: 30, stagger: 0.2, duration: 0.8
    });

    // Problem Cards Stagger
    // gsap.from('.problem-card', {
    //   scrollTrigger: { trigger: '.problem-grid', start: 'top 80%' },
    //   opacity: 0, y: 40, stagger: 0.15, duration: 0.8, ease: 'back.out(1.2)'
    // });

    // Solution Card Pop
    gsap.from('.solution-card', {
      scrollTrigger: { trigger: '.solution-card', start: 'top 85%' },
      opacity: 0, scale: 0.9, duration: 1, ease: 'power2.out'
    });

    // Bottom Content Fade
    gsap.from('.bottom-content', {
      scrollTrigger: { trigger: '.bottom-content', start: 'top 90%' },
      opacity: 0, y: 20, duration: 1
    });
  }, { scope: container });

  return (
    <section ref={container} style={S.aboutSection} className="about-section">
      <div style={S.aboutContainer}>
        
        {/* Header */}
        <div className="about-header" style={S.aboutHeader}>
          <h2 style={S.aboutTitle}>
            About This <span style={S.gradientText}>Project</span>
          </h2>
          <p style={S.aboutSubtitle}>
            Bridging the gap between theoretical networking and visual understanding.
          </p>
        </div>

        {/* Problem Grid */}
        <div className="problem-grid" style={S.problemGrid}>
          {[
            { icon: "📚", title: "Abstract Concepts", text: "OSI models are often taught through static diagrams that fail to show the dynamic movement of data." },
            { icon: "📦", title: "Encapsulation", text: "Students struggle to visualize how headers and trailers are wrapped around data at each layer." },
            { icon: "🎓", title: "Learning Gap", text: "Traditional methods lack the interactivity required to retain complex networking foundations." }
          ].map((p, i) => (
            <div key={i} className="problem-card" style={S.problemCard}>
              <div style={S.problemIcon}>{p.icon}</div>
              <h4 style={S.problemTitle}>{p.title}</h4>
              <p style={S.problemText}>{p.text}</p>
            </div>
          ))}
        </div>

        {/* Solution Card */}
        <div className="solution-card" style={S.solutionCard}>
          <h3 style={S.solutionTitle}>🎯 The Solution</h3>
          <p style={S.solutionDesc}>
            An interactive web tool that visualizes data encapsulation and transmission across all 7 OSI layers in real-time.
          </p>
          <div style={S.badgeContainer}>
            {["🖱️ Click. Watch. Learn.", "📦 See encapsulation", "🔄 Real-time animation"].map((b, i) => (
            <span key={i} style={S.badge}>{b}</span>
            ))}
          </div>
        </div>

        {/* Goals & Audience */}
        <div className="bottom-content">
          <h3 style={{ ...S.aboutTitle, fontSize: '2rem', textAlign: 'center' }}>Project Goals</h3>
          <div style={S.goalBox}>
            <div style={S.goalGrid}>
              {[
                "Demonstrate the 7-layer OSI model",
                "Show real-time data encapsulation",
                "Interactive packet-flow simulation",
                "Simplify complex network theory"
              ].map((goal, idx) => (
                <div key={idx} style={S.goalItem}>
                  <span style={S.goalCheck}>✓</span>
                  <span>{goal}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default AboutSection;