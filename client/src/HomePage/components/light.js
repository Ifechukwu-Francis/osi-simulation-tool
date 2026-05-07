// Keyframes animations
export const keyframes = `
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  @keyframes glow {
    0%, 100% {
      box-shadow: 0 0 5px rgba(59, 130, 246, 0.3);
    }
    50% {
      box-shadow: 0 0 20px rgba(147, 51, 234, 0.5);
    }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }
  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`

export const S = {
  // Global Layout
  page: {
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    color: '#1e293b',
    fontFamily: 'Inter, system-ui, sans-serif',
  },

  pageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#ffffff',
  },

  // Navbar Styles
  nav: (isScrolled) => ({
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 100,
    transition: 'all 0.3s ease',
    backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : '#ffffff',
    backdropFilter: isScrolled ? 'blur(12px)' : 'none',
    boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.08)' : '0 1px 3px rgba(0, 0, 0, 0.04)',
  }),

  navBase: (isScrolled) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    transition: 'all 0.3s ease',
    backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : '#ffffff',
    backdropFilter: isScrolled ? 'blur(12px)' : 'none',
    boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.08)' : '0 1px 3px rgba(0, 0, 0, 0.04)',
    padding: isScrolled ? '8px 0' : '16px 0',
  }),

  navContainer: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 24px',
    height: '70px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  navFlex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },

  navLogo: {
    background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontSize: '1.5rem',
    fontWeight: '800',
    textDecoration: 'none',
    letterSpacing: '-0.5px',
  },

  logo: {
    background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontSize: '1.5rem',
    fontWeight: '800',
    textDecoration: 'none',
    letterSpacing: '-1px',
  },

  navDesktopLinks: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  },

  navLinks: {
    display: 'flex',
    gap: '8px',
  },

  navLink: {
    color: '#64748b',
    textDecoration: 'none',
    fontSize: '0.875rem',
    fontWeight: '500',
    padding: '8px 16px',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
    ':hover': {
      color: '#2563eb',
      backgroundColor: '#eff6ff',
    },
  },

  link: {
    color: '#64748b',
    textDecoration: 'none',
    fontSize: '0.875rem',
    fontWeight: '500',
    padding: '8px 16px',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
    ':hover': {
      color: '#2563eb',
      backgroundColor: '#eff6ff',
    },
  },

  navMobileMenu: (isOpen) => ({
    display: isOpen ? 'flex' : 'none',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: '12px 20px',
    borderTop: '1px solid #f1f5f9',
    boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.04)',
  }),

  navMobileBtnArea: {
    display: 'none',
  },

  navMobileBtn: {
    background: 'none',
    border: 'none',
    color: '#64748b',
    cursor: 'pointer',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '8px',
    transition: 'color 0.2s ease',
    ':hover': {
      color: '#2563eb',
    },
  },

  navMobileLink: {
    color: '#475569',
    textDecoration: 'none',
    padding: '12px 16px',
    fontSize: '0.95rem',
    fontWeight: '500',
    borderRadius: '8px',
    display: 'block',
    transition: 'all 0.2s ease',
    ':hover': {
      color: '#2563eb',
      backgroundColor: '#eff6ff',
    },
  },

  // Hero Styles
  heroSection: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    background: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 50%, #4338ca 100%)',
    paddingTop: '80px',
  },

  headline: {
    fontSize: 'clamp(3rem, 10vw, 6rem)',
    fontWeight: '900',
    lineHeight: '1.1',
    margin: '0',
    color: '#ffffff',
    marginBottom: '24px',
  },

  gradientText: {
    background: 'linear-gradient(135deg, #fde047 0%, #f472b6 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },

  subheadline: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '1.5rem',
    marginTop: '20px',
    marginBottom: '40px',
    maxWidth: '700px',
    marginLeft: 'auto',
    marginRight: 'auto',
    lineHeight: '1.6',
  },

  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: '16px',
    flexWrap: 'wrap',
  },

  // Buttons
  btnPrimary: {
    padding: '16px 36px',
    backgroundColor: '#ffffff',
    color: '#5b21b6',
    border: 'none',
    fontWeight: '700',
    cursor: 'pointer',
    borderRadius: '12px',
    fontSize: '1.1rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
    ':hover': {
      backgroundColor: '#f1f5f9',
      transform: 'scale(1.03) translateY(-2px)',
    },
    ':active': {
      transform: 'scale(0.98)',
    },
  },

  btnSecondary: {
    padding: '16px 36px',
    backgroundColor: 'rgba(124, 58, 237, 0.25)',
    backdropFilter: 'blur(8px)',
    color: '#ffffff',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    fontWeight: '700',
    cursor: 'pointer',
    borderRadius: '12px',
    fontSize: '1.1rem',
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: 'rgba(124, 58, 237, 0.45)',
      transform: 'scale(1.03) translateY(-2px)',
    },
    ':active': {
      transform: 'scale(0.98)',
    },
  },

  ctaBtn: {
    padding: '10px 24px',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: 'none',
    fontWeight: '600',
    cursor: 'pointer',
    borderRadius: '10px',
    fontSize: '0.95rem',
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: '#1d4ed8',
    },
  },

  // Admin Styles
  adminForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '320px',
    margin: '0 auto',
    padding: '40px',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.06)',
  },

  adminInput: {
    padding: '12px 16px',
    borderRadius: '10px',
    border: '1px solid #cbd5e1',
    background: '#f8fafc',
    color: '#1e293b',
    outline: 'none',
    fontSize: '0.95rem',
    transition: 'border-color 0.2s ease',
    ':focus': {
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
    },
  },

  adminButton: {
    padding: '12px 24px',
    borderRadius: '10px',
    background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
    color: '#ffffff',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '0.95rem',
    transition: 'all 0.2s ease',
    ':hover': {
      opacity: 0.9,
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 15px rgba(37, 99, 235, 0.3)',
    },
  },

  // Quiz Card Styles

  // Quiz Section Wrapper (for the QuizSection component)
  
  quizSection: {
    padding: '80px 0',
    backgroundColor: '#1e293b',
  },

  quizContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
  },

  quizHeader: {
    textAlign: 'center',
    marginBottom: '40px',
  },

  quizTitle: {
    color: '#ffffff',
    fontSize: 'clamp(2rem, 5vw, 2.5rem)',
    fontWeight: '800',
    marginBottom: '20px',
  },

  quizTitleGradient: {
    background: 'linear-gradient(135deg, #fde047 0%, #f97316 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },

  quizToggleWrapper: {
    display: 'inline-flex',
    backgroundColor: 'transparent',
    padding: '6px',
    borderRadius: '12px',
    gap: '12px',
  },

  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '200px',
    color: '#64748b',
  },

  dot: {
    display: 'inline-block',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#3b82f6',
    margin: '0 4px',
  },

  statusText: {
    color: '#94a3b8',
    fontSize: '0.85rem',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },

  errorText: {
    color: '#ef4444',
    fontWeight: '700',
    fontSize: '1.1rem',
    marginBottom: '8px',
  },

  subText: {
    color: '#94a3b8',
    fontSize: '0.9rem',
    marginBottom: '20px',
  },

  retryBtn: {
    padding: '12px 28px',
    background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '700',
    marginTop: '12px',
    transition: 'all 0.2s ease',
    ':hover': {
      opacity: 0.9,
      boxShadow: '0 4px 15px rgba(37, 99, 235, 0.3)',
    },
  },

  card: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    padding: '40px',
    borderRadius: '16px',
    width: '100%',
    maxWidth: '540px',
    position: 'relative',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
    margin: '0 auto',
  },

  accent: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '4px',
    background: 'linear-gradient(90deg, #2563eb 0%, #7c3aed 100%)',
    borderRadius: '16px 16px 0 0',
  },

  label: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.8rem',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: '#94a3b8',
    marginBottom: '20px',
    fontWeight: '500',
  },

  progress: {
    height: '6px',
    background: '#e2e8f0',
    borderRadius: '10px',
    marginBottom: '28px',
    overflow: 'hidden',
  },

  progressFill: (percent) => ({
    height: '100%',
    width: `${percent}%`,
    background: 'linear-gradient(90deg, #fde047 0%, #f97316 100%)',
    borderRadius: '10px',
    transition: 'width 0.5s ease',
  }),

  question: {
    color: '#1e293b',
    fontSize: '1.2rem',
    lineHeight: '1.6',
    marginBottom: '28px',
    fontWeight: '600',
  },

  optionBtn: (isSelected) => ({
    display: 'block',
    width: '100%',
    padding: '16px 20px',
    marginBottom: '12px',
    background: isSelected ? 'rgba(59, 130, 246, 0.06)' : '#f8fafc',
    border: `2px solid ${isSelected ? '#3b82f6' : '#e2e8f0'}`,
    borderRadius: '12px',
    color: isSelected ? '#1e40af' : '#475569',
    cursor: 'pointer',
    textAlign: 'left',
    fontSize: '0.95rem',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    ':hover': {
      borderColor: '#3b82f6',
      backgroundColor: '#eff6ff',
    },
  }),

  optionCorrect: {
    backgroundColor: 'rgba(34, 197, 94, 0.08)',
    borderColor: '#22c55e',
    color: '#166534',
  },

  optionIncorrect: {
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    borderColor: '#ef4444',
    color: '#991b1b',
  },

  nextBtn: (isDisabled) => ({
    marginTop: '24px',
    padding: '14px 28px',
    background: isDisabled ? '#e2e8f0' : 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
    color: isDisabled ? '#94a3b8' : '#ffffff',
    border: 'none',
    borderRadius: '12px',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    fontWeight: '700',
    width: '100%',
    fontSize: '1rem',
    transition: 'all 0.2s ease',
    ':hover': isDisabled ? {} : {
      opacity: 0.9,
      boxShadow: '0 6px 20px rgba(37, 99, 235, 0.3)',
    },
  }),

  scoreWrap: {
    textAlign: 'center',
    padding: '30px 0',
    borderBottom: '1px solid #e2e8f0',
    marginBottom: '24px',
  },

  scoreBig: {
    fontSize: '4rem',
    fontWeight: '900',
    background: 'linear-gradient(135deg, #fde047 0%, #f97316 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },

  scoreLabel: {
    color: '#94a3b8',
    fontSize: '0.85rem',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    marginTop: '8px',
    fontWeight: '500',
  },

  reviewItem: (isCorrect) => ({
    padding: '16px',
    marginBottom: '10px',
    borderRadius: '12px',
    border: `1px solid ${isCorrect ? '#bbf7d0' : '#fecaca'}`,
    background: isCorrect ? '#f0fdf4' : '#fef2f2',
  }),

  reviewQ: {
    color: '#334155',
    fontSize: '0.9rem',
    marginBottom: '6px',
    lineHeight: '1.5',
    fontWeight: '500',
  },

  reviewAnswer: (isCorrect) => ({
    color: isCorrect ? '#16a34a' : '#dc2626',
    fontSize: '0.85rem',
    fontWeight: '700',
  }),

  reviewCorrect: {
    color: '#16a34a',
    fontSize: '0.85rem',
    marginTop: '4px',
  },

  // About Section
  aboutSection: {
    padding: '100px 0',
    backgroundColor: '#f8fafc',
    overflow: 'hidden',
  },

  aboutContainer: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 24px',
  },

  aboutHeader: {
    textAlign: 'center',
    marginBottom: '60px',
  },

  aboutTitle: {
    fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: '16px',
    background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    display: 'inline-block',
  },

  aboutSubtitle: {
    color: '#64748b',
    fontSize: '1.2rem',
    maxWidth: '700px',
    margin: '0 auto',
    lineHeight: '1.6',
  },


  problemGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
    marginBottom: '48px',
  },

  problemCard: {
    backgroundColor: '#ffffff',
    padding: '32px',
    borderRadius: '16px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
    transition: 'all 0.3s ease',
    ':hover': {
      transform: 'translateY(-6px)',
      boxShadow: '0 12px 30px rgba(0, 0, 0, 0.08)',
      borderColor: '#93c5fd',
    },
  },

  problemIcon: {
    fontSize: '2.5rem',
    marginBottom: '16px',
  },

  problemTitle: {
    color: '#1e293b',
    fontSize: '1.25rem',
    fontWeight: '700',
    marginBottom: '10px',
  },

  problemText: {
    color: '#64748b',
    fontSize: '0.95rem',
    lineHeight: '1.7',
  },

  solutionCard: {
    background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
    borderRadius: '20px',
    padding: '48px 40px',
    textAlign: 'center',
    marginBottom: '60px',
    boxShadow: '0 12px 40px rgba(37, 99, 235, 0.25)',
    color: '#ffffff',
  },

  solutionTitle: {
    fontSize: '2rem',
    fontWeight: '800',
    marginBottom: '16px',
  },

  solutionDesc: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '1.2rem',
    maxWidth: '800px',
    margin: '0 auto',
    lineHeight: '1.7',
  },

  badgeContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '12px',
    marginTop: '24px',
  },

  badge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(8px)',
    padding: '8px 18px',
    borderRadius: '24px',
    color: '#ffffff',
    fontSize: '0.875rem',
    fontWeight: '500',
  },

  audienceGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    textAlign: 'center',
    marginBottom: '48px',
  },

  audienceItem: {
    padding: '24px 16px',
    backgroundColor: '#ffffff',
    borderRadius: '14px',
    border: '1px solid #e2e8f0',
    transition: 'all 0.3s ease',
    ':hover': {
      borderColor: '#93c5fd',
      transform: 'translateY(-4px)',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
    },
  },

  goalBox: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '16px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
  },

  goalGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '16px',
  },

  goalItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    color: '#475569',
    fontSize: '0.95rem',
  },

  goalCheck: {
    color: '#22c55e',
    fontWeight: '700',
    fontSize: '1.25rem',
    flexShrink: 0,
  },

  // Footer
  footer: {
    backgroundColor: '#1e293b',
    color: '#f1f5f9',
    marginTop: 'auto',
  },

  footerContainer: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '32px 24px',
  },

  footerContentBox: {
    textAlign: 'center',
  },

  footerText: {
    color: '#94a3b8',
    fontSize: '0.95rem',
    margin: 0,
  },

  footerSubtext: {
    color: '#64748b',
    fontSize: '0.85rem',
    marginTop: '8px',
  },

  // Toggle Buttons
  toggleContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '32px',
    padding: '20px',
  },

  toggleBtn: (isActive) => ({
    padding: '12px 28px',
    backgroundColor: isActive ? '#ffffff' : 'transparent',
    color: isActive ? '#5b21b6' : '#64748b',
    border: `2px solid ${isActive ? '#7c3aed' : '#e2e8f0'}`,
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '0.95rem',
    transition: 'all 0.3s ease',
    boxShadow: isActive ? '0 4px 15px rgba(124, 58, 237, 0.2)' : 'none',
    ':hover': {
      borderColor: '#7c3aed',
      color: '#5b21b6',
    },
  }),

  activeToggle: {
    padding: '12px 28px',
    backgroundColor: '#ffffff',
    color: '#5b21b6',
    border: '2px solid #7c3aed',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '0.95rem',
    transition: '0.3s',
    boxShadow: '0 4px 15px rgba(124, 58, 237, 0.2)',
  },

  inactiveToggle: {
    padding: '12px 28px',
    backgroundColor: 'transparent',
    color: '#94a3b8',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.95rem',
    transition: '0.3s',
    ':hover': {
      borderColor: '#7c3aed',
      color: '#5b21b6',
    },
  },

  // Drag and Drop
  dragItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '14px 20px',
    backgroundColor: '#ffffff',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    color: '#334155',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    cursor: 'grab',
    ':hover': {
      borderColor: '#7c3aed',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.06)',
    },
    ':active': {
      cursor: 'grabbing',
    },
  },

  dragItemDragging: {
    opacity: 0.5,
    transform: 'scale(0.97)',
  },

  layerNumber: {
    backgroundColor: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
    color: '#ffffff',
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.8rem',
    fontWeight: '700',
    marginRight: '15px',
    flexShrink: 0,
  },

  moveBtn: {
    background: '#f1f5f9',
    border: '1px solid #e2e8f0',
    color: '#475569',
    padding: '6px 14px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '600',
    transition: 'all 0.2s ease',
    ':hover': {
      borderColor: '#7c3aed',
      color: '#5b21b6',
      backgroundColor: '#faf5ff',
    },
  },

  // Drop Target
  dropZone: {
    minHeight: '60px',
    borderRadius: '12px',
    border: '2px dashed #cbd5e1',
    padding: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    backgroundColor: '#f8fafc',
    color: '#94a3b8',
    fontSize: '0.875rem',
  },

  dropZoneOver: {
    borderColor: '#7c3aed',
    backgroundColor: '#faf5ff',
  },

  dropZoneMatched: {
    backgroundColor: '#f0fdf4',
    borderColor: '#22c55e',
    borderStyle: 'solid',
  },

  matchedItem: {
    backgroundColor: '#f0fdf4',
    color: '#166534',
    borderRadius: '8px',
    padding: '10px 14px',
    fontSize: '0.875rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },

  removeBtn: {
    color: '#94a3b8',
    cursor: 'pointer',
    fontSize: '0.75rem',
    fontWeight: '700',
    padding: '2px 6px',
    borderRadius: '4px',
    transition: 'all 0.2s ease',
    ':hover': {
      color: '#ef4444',
      backgroundColor: '#fef2f2',
    },
  },

  // How To Modal
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(6px)',
    zIndex: 999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },

  modalContainer: {
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    maxWidth: '480px',
    width: '100%',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
    border: '1px solid #e2e8f0',
  },

  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px',
    borderBottom: '1px solid #e2e8f0',
  },

  modalTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#1e293b',
  },

  modalCloseBtn: {
    color: '#94a3b8',
    cursor: 'pointer',
    fontSize: '1.5rem',
    lineHeight: '1',
    background: 'none',
    border: 'none',
    padding: '4px',
    transition: 'color 0.2s ease',
    ':hover': {
      color: '#1e293b',
    },
  },

  modalBody: {
    padding: '24px',
  },

  modalFooter: {
    padding: '20px 24px',
    borderTop: '1px solid #e2e8f0',
  },

  modalGotItBtn: {
    width: '100%',
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '0.95rem',
    transition: 'all 0.2s ease',
    ':hover': {
      opacity: 0.9,
    },
  },

  // Simulator Specific
  simulatorPage: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    paddingTop: '100px',
    paddingBottom: '48px',
  },

  simulatorContainer: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 24px',
  },

  simulatorHeader: {
    textAlign: 'center',
    marginBottom: '48px',
  },

  simulatorTitle: {
    fontSize: 'clamp(2.5rem, 6vw, 4rem)',
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: '16px',
  },

  simulatorTitleGradient: {
    background: 'linear-gradient(135deg, #60a5fa 0%, #c084fc 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },

  simulatorSubtitle: {
    color: '#94a3b8',
    fontSize: '1.1rem',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: '1.6',
  },

  controlBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
    flexWrap: 'wrap',
    gap: '12px',
  },

  controlBtnGroup: {
    display: 'flex',
    gap: '12px',
  },

  howToBtn: {
    padding: '10px 22px',
    backgroundColor: 'rgba(59, 130, 246, 0.6)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.875rem',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: '#2563eb',
    },
  },

  resetBtn: {
    padding: '10px 22px',
    backgroundColor: 'rgba(71, 85, 105, 0.6)',
    color: '#e2e8f0',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.875rem',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: '#475569',
      color: '#ffffff',
    },
  },

  selectionInfo: {
    color: '#94a3b8',
    fontSize: '0.875rem',
  },

  // Device Grid
  deviceGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: '20px',
    marginBottom: '48px',
  },

  deviceCard: (isSelected, isSource) => ({
    padding: '24px',
    borderRadius: '16px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backgroundColor: isSelected
      ? isSource
        ? '#2563eb'
        : '#16a34a'
      : 'rgba(30, 41, 59, 0.6)',
    backdropFilter: 'blur(8px)',
    border: isSelected
      ? `3px solid ${isSource ? '#93c5fd' : '#86efac'}`
      : '1px solid #334155',
    boxShadow: isSelected
      ? `0 0 30px ${isSource ? 'rgba(37, 99, 235, 0.4)' : 'rgba(22, 163, 74, 0.4)'}`
      : 'none',
    transform: isSelected ? 'scale(1.03)' : 'scale(1)',
    ':hover': {
      transform: 'translateY(-4px)',
      backgroundColor: isSelected
        ? isSource
          ? '#2563eb'
          : '#16a34a'
        : 'rgba(30, 41, 59, 0.8)',
    },
  }),

  deviceIcon: {
    fontSize: '2.5rem',
    marginBottom: '12px',
  },

  deviceName: (isSelected, color) => ({
    fontWeight: '700',
    fontSize: '1.1rem',
    color: isSelected ? '#ffffff' : `#${color}`,
  }),

  deviceLabel: (isSelected) => ({
    display: 'inline-block',
    marginTop: '8px',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: '500',
    backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.2)' : 'rgba(71, 85, 105, 0.4)',
    color: isSelected ? '#ffffff' : '#94a3b8',
  }),

  // Encapsulation Detail
  encapContainer: {
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    backdropFilter: 'blur(12px)',
    borderRadius: '20px',
    padding: '24px',
    marginBottom: '32px',
    border: '1px solid #334155',
  },

  encapStepCard: (color) => ({
    position: 'relative',
    borderRadius: '12px',
    padding: '16px',
    transition: 'all 0.4s ease',
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderLeft: `4px solid #${color}`,
    ':hover': {
      transform: 'scale(1.01)',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
    },
  }),

  encapLayerName: {
    fontWeight: '700',
    color: '#ffffff',
    fontSize: '1.1rem',
  },

  encapPduName: {
    fontSize: '0.875rem',
    color: '#94a3b8',
    marginBottom: '8px',
  },

  encapMessagePreview: {
    backgroundColor: '#0f172a',
    borderRadius: '8px',
    padding: '10px',
    fontFamily: 'monospace',
    fontSize: '0.85rem',
    color: '#4ade80',
    marginBottom: '8px',
    wordBreak: 'break-all',
  },

  encapHeaderInfo: {
    fontSize: '0.75rem',
    color: '#60a5fa',
    marginTop: '4px',
  },

  encapBinaryView: {
    fontSize: '0.75rem',
    color: '#facc15',
    fontFamily: 'monospace',
    wordBreak: 'break-all',
  },

  arrowDown: {
    textAlign: 'center',
    fontSize: '1.5rem',
    color: '#64748b',
    padding: '8px 0',
  },

  arrowUp: {
    textAlign: 'center',
    fontSize: '1.5rem',
    color: '#64748b',
    padding: '8px 0',
  },

  // Sender / Receiver Columns
  senderReceiverContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 80px 1fr',
    gap: '24px',
    marginBottom: '32px',
    alignItems: 'center',
  },

  senderColumn: {
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderRadius: '16px',
    padding: '20px',
    border: '1px solid #334155',
  },

  receiverColumn: {
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderRadius: '16px',
    padding: '20px',
    border: '1px solid #334155',
  },

  columnTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: '20px',
    paddingBottom: '12px',
    borderBottom: '1px solid #334155',
  },

  senderTitle: {
    color: '#60a5fa',
  },

  receiverTitle: {
    color: '#4ade80',
  },

  layerRow: (isActive, isCompleted) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px',
    borderRadius: '10px',
    marginBottom: '8px',
    transition: 'all 0.3s ease',
    backgroundColor: isActive
      ? 'rgba(37, 99, 235, 0.25)'
      : isCompleted
        ? 'rgba(22, 163, 74, 0.15)'
        : 'rgba(51, 65, 85, 0.3)',
    border: isActive ? '2px solid #3b82f6' : '2px solid transparent',
    transform: isActive ? 'scale(1.02)' : 'scale(1)',
  }),

  layerContent: {
    flex: 1,
    marginLeft: '12px',
    marginRight: '12px',
  },

  layerRowName: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: '0.875rem',
  },

  layerRowPdu: {
    fontSize: '0.75rem',
    color: '#94a3b8',
  },

  layerRowData: {
    fontSize: '0.75rem',
    color: '#facc15',
    fontFamily: 'monospace',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: '140px',
  },

  layerIcon: {
    fontSize: '1.25rem',
  },

  transmittingArrow: {
    color: '#60a5fa',
    fontSize: '2.5rem',
    textAlign: 'center',
  },

  // Educational Panel
  eduPanel: {
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: '16px',
    padding: '24px',
    border: '1px solid #334155',
  },

  eduPanelTitle: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#60a5fa',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },

  eduPanelNote: {
    color: '#cbd5e1',
    lineHeight: '1.7',
    marginBottom: '16px',
  },

  eduDataPreview: {
    backgroundColor: '#0f172a',
    borderRadius: '10px',
    padding: '12px',
    marginTop: '12px',
  },

  eduPreviewLabel: {
    color: '#64748b',
    fontSize: '0.75rem',
    marginBottom: '4px',
  },

  eduPreviewContent: {
    color: '#facc15',
    fontSize: '0.85rem',
    fontFamily: 'monospace',
    wordBreak: 'break-all',
  },

  eduLayerBadge: {
    display: 'inline-block',
    backgroundColor: '#334155',
    borderRadius: '20px',
    padding: '4px 12px',
    fontSize: '0.75rem',
    color: '#cbd5e1',
    marginBottom: '12px',
  },

  // Message Overlay
  messageOverlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(8px)',
    zIndex: 999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },

  messageContainer: {
    backgroundColor: '#1e293b',
    borderRadius: '20px',
    maxWidth: '480px',
    width: '100%',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
    border: '1px solid #334155',
  },

  messageHeader: {
    padding: '24px',
    borderBottom: '1px solid #334155',
  },

  messageTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#ffffff',
  },

  messageBody: {
    padding: '24px',
  },

  messageLabel: {
    display: 'block',
    color: '#cbd5e1',
    marginBottom: '8px',
    fontWeight: '500',
  },

  messageInput: {
    width: '100%',
    backgroundColor: '#0f172a',
    border: '1px solid #475569',
    borderRadius: '12px',
    padding: '12px 16px',
    color: '#ffffff',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    ':focus': {
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.15)',
    },
  },

  messageCharCount: {
    textAlign: 'right',
    color: '#64748b',
    fontSize: '0.75rem',
    marginTop: '4px',
  },

  messageBtnGroup: {
    display: 'flex',
    gap: '12px',
    marginTop: '24px',
  },

  cancelBtn: {
    flex: 1,
    backgroundColor: '#475569',
    color: '#ffffff',
    fontWeight: '700',
    padding: '12px 20px',
    borderRadius: '12px',
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: '#64748b',
    },
  },

  sendBtn: {
    flex: 1,
    background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
    color: '#ffffff',
    fontWeight: '700',
    padding: '12px 20px',
    borderRadius: '12px',
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.2s ease',
    ':hover': {
      opacity: 0.9,
    },
  },

  // Speed Control
  speedControl: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderRadius: '12px',
    padding: '6px 12px',
  },

  speedBtn: (isActive) => ({
    padding: '6px 12px',
    borderRadius: '8px',
    fontSize: '0.75rem',
    fontWeight: '600',
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.2s ease',
    backgroundColor: isActive ? '#2563eb' : 'transparent',
    color: isActive ? '#ffffff' : '#94a3b8',
    ':hover': {
      color: '#ffffff',
    },
  }),

  // Progress Bar
  progressBar: {
    width: '100%',
    height: '6px',
    backgroundColor: '#334155',
    borderRadius: '10px',
    marginBottom: '24px',
    overflow: 'hidden',
  },

  progressFillBar: (percent) => ({
    height: '100%',
    width: `${percent}%`,
    background: 'linear-gradient(90deg, #3b82f6 0%, #a855f7 100%)',
    borderRadius: '10px',
    transition: 'width 0.5s ease',
  }),

  // Step List (How To)
  stepList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },

  stepItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
  },

  stepNumber: {
    backgroundColor: '#2563eb',
    color: '#ffffff',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.75rem',
    fontWeight: '700',
    flexShrink: 0,
    marginTop: '2px',
  },

  stepText: {
    color: '#cbd5e1',
    fontSize: '0.9rem',
    lineHeight: '1.5',
  },

  // Layer Info Panel
  layerInfoPanel: {
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '24px',
    border: '1px solid #334155',
  },

  layerInfoTitle: {
    fontSize: '0.8rem',
    color: '#94a3b8',
    marginBottom: '4px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },

  layerInfoContent: {
    color: '#ffffff',
    fontFamily: 'monospace',
    fontSize: '0.85rem',
  },

  replayBtn: {
    padding: '10px 18px',
    backgroundColor: 'rgba(124, 58, 237, 0.7)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.875rem',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: '#7c3aed',
    },
  },

  // Instruction Text
  instruction: {
    textAlign: 'center',
    color: '#94a3b8',
    marginBottom: '24px',
    fontSize: '0.875rem',
  },

  // Encapsulation Status
  encapStatus: {
    textAlign: 'center',
    color: '#94a3b8',
    marginBottom: '16px',
    fontSize: '0.875rem',
  },

  // Result Modal (Drag & Drop)
  resultOverlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(8px)',
    zIndex: 999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },

  resultModal: {
    backgroundColor: '#1e293b',
    borderRadius: '20px',
    maxWidth: '480px',
    width: '100%',
    padding: '32px',
    border: '1px solid #334155',
    textAlign: 'center',
  },

  resultTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '16px',
  },

  resultScore: {
    fontSize: '4rem',
    fontWeight: '900',
    background: 'linear-gradient(135deg, #fde047 0%, #f97316 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '16px',
  },

  resultMessage: {
    color: '#cbd5e1',
    fontSize: '0.95rem',
    marginBottom: '20px',
    lineHeight: '1.6',
  },

  resultPerfect: {
    color: '#4ade80',
    fontSize: '1rem',
    fontWeight: '600',
    marginBottom: '16px',
  },

  closeBtn: {
    width: '100%',
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '0.95rem',
    transition: 'all 0.2s ease',
    ':hover': {
      opacity: 0.9,
    },
  },

  // Quiz Feedback
    feedbackContainer: {
    backgroundColor: '#f8fafc',
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '16px',
    border: '1px solid #e2e8f0',
  },

  feedbackCorrect: {
    color: '#4ade80',
    fontWeight: '600',
    marginBottom: '4px',
    fontSize: '0.9rem',
  },

  feedbackIncorrect: {
    color: '#f87171',
    fontWeight: '600',
    marginBottom: '4px',
    fontSize: '0.9rem',
  },

  feedbackExplanation: {
    color: '#cbd5e1',
    fontSize: '0.85rem',
    lineHeight: '1.5',
  },

  quizCheckBtn: {
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '0.95rem',
    transition: 'all 0.2s ease',
    ':hover': {
      opacity: 0.9,
      boxShadow: '0 6px 20px rgba(37, 99, 235, 0.3)',
    },
  },

  quizNextBtn: {
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '0.95rem',
    transition: 'all 0.2s ease',
    ':hover': {
      opacity: 0.9,
      boxShadow: '0 6px 20px rgba(22, 163, 74, 0.3)',
    },
  },

  quizResetBtn: {
    padding: '12px 24px',
    backgroundColor: '#64748b',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '0.95rem',
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: '#475569',
    },
  },

  quizButtonGroup: {
    display: 'flex',
    gap: '12px',
    marginBottom: '20px',
    flexWrap: 'wrap',
  },

  // Drag & Drop Quiz Specific
  dragQuizSection: {
    padding: '80px 0',
    background: '#f8fafc',
  },

  dragQuizContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
  },

  dragQuizHeader: {
    textAlign: 'center',
    marginBottom: '48px',
  },

  dragQuizTitle: {
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: '12px',
  },

  dragQuizTitleGradient: {
    background: 'linear-gradient(135deg, #fde047 0%, #f97316 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },

  dragQuizSubtitle: {
    color: '#94a3b8',
    fontSize: '1.1rem',
  },

  twoColumnLayout: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '32px',
  },

  sourcePanel: {
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: '16px',
    padding: '24px',
    border: '1px solid #334155',
  },

  sourcePanelTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },

  draggableGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
  },

  draggableItem: (isDragging) => ({
    backgroundColor: '#334155',
    borderRadius: '10px',
    padding: '14px',
    textAlign: 'center',
    cursor: isDragging ? 'grabbing' : 'grab',
    transition: 'all 0.2s ease',
    border: '2px solid #475569',
    opacity: isDragging ? 0.5 : 1,
    ':hover': {
      borderColor: '#fde047',
      transform: 'scale(1.04)',
      backgroundColor: '#3b4252',
    },
  }),

  draggableText: {
    color: '#ffffff',
    fontSize: '0.875rem',
    fontWeight: '500',
  },

  draggableIcon: {
    fontSize: '1.25rem',
    marginBottom: '6px',
  },

  targetPanel: {
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: '16px',
    padding: '24px',
    border: '1px solid #334155',
  },

  targetPanelTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },

  targetList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },

  targetRow: (isCorrect, isMatched) => ({
    borderRadius: '12px',
    padding: '16px',
    transition: 'all 0.2s ease',
    backgroundColor: isMatched
      ? 'rgba(22, 163, 74, 0.2)'
      : 'rgba(51, 65, 85, 0.4)',
    border: isMatched
      ? '2px solid #22c55e'
      : '2px dashed #475569',
    ':hover': !isMatched ? { borderColor: '#fde047' } : {},
  }),

  targetHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },

  targetLayerName: {
    fontWeight: '700',
    color: '#ffffff',
  },

  targetLayerNumber: {
    fontSize: '0.75rem',
    color: '#94a3b8',
  },

  targetDropZone: {
    minHeight: '48px',
    borderRadius: '10px',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
  },

  matchedItemDrag: {
    backgroundColor: '#16a34a',
    color: '#ffffff',
    borderRadius: '8px',
    padding: '10px 14px',
    fontSize: '0.85rem',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },

  matchedText: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },

  matchedIcon: {
    fontSize: '1.1rem',
  },

  emptyDropZone: {
    color: '#64748b',
    fontSize: '0.85rem',
    textAlign: 'center',
    padding: '8px 0',
    width: '100%',
  },

  scorePanel: {
    marginTop: '24px',
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: '16px',
    padding: '20px',
    border: '1px solid #334155',
  },

  scoreHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },

  scoreTitle: {
    color: '#ffffff',
    fontWeight: '700',
  },

  scoreValue: {
    color: '#fde047',
    fontSize: '1.5rem',
    fontWeight: '800',
  },

  scoreProgressBar: {
    width: '100%',
    height: '6px',
    backgroundColor: '#334155',
    borderRadius: '10px',
    marginBottom: '12px',
    overflow: 'hidden',
  },

  scoreProgressFill: (percentage) => ({
    height: '100%',
    width: `${percentage}%`,
    background: 'linear-gradient(90deg, #22c55e 0%, #fde047 100%)',
    borderRadius: '10px',
    transition: 'width 0.4s ease',
  }),

  dragBtnGroup: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    marginTop: '24px',
  },

  dragResetBtn: {
    padding: '10px 24px',
    backgroundColor: '#475569',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '0.9rem',
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: '#64748b',
    },
  },

  dragCheckBtn: {
    padding: '10px 24px',
    backgroundColor: '#16a34a',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '0.9rem',
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: '#15803d',
    },
  },

  dragNextBtn: {
    padding: '10px 24px',
    background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '0.9rem',
    transition: 'all 0.2s ease',
    ':hover': {
      opacity: 0.9,
    },
  },

  // Quiz Result / Restart
  resultContainer: {
    textAlign: 'center',
    padding: '32px 0',
  },

  restartBtn: {
    padding: '14px 32px',
    background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '1rem',
    transition: 'all 0.2s ease',
    ':hover': {
      opacity: 0.9,
      boxShadow: '0 6px 20px rgba(124, 58, 237, 0.35)',
    },
  },

  quizResultScore: {
    fontSize: '3.5rem',
    fontWeight: '900',
    background: 'linear-gradient(135deg, #fde047 0%, #f97316 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '16px',
  },

  quizResultMessage: {
    color: '#cbd5e1',
    fontSize: '1.1rem',
    marginBottom: '24px',
    lineHeight: '1.6',
  },

  quizResultPerfect: {
    color: '#4ade80',
    fontSize: '1.2rem',
    fontWeight: '600',
    marginBottom: '16px',
  },

  // Selection Info
  selectionInfoText: {
    color: '#94a3b8',
    fontSize: '0.875rem',
  },

  // Option Radio (quiz)
  optionRadio: {
    width: '20px',
    height: '20px',
    accentColor: '#2563eb',
    cursor: 'pointer',
    marginRight: '12px',
    flexShrink: 0,
  },

  optionLabel: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    cursor: 'pointer',
  },

  optionText: {
    color: 'inherit',
    fontWeight: '500',
    fontSize: '0.95rem',
  },
}

export default { S, keyframes }