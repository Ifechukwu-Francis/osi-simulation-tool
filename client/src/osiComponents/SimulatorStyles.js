export const SimulatorStyles = {
  // Main container
  container: {
    width: '100vw',
    height: '100vh',
    background: '#050505',
    position: 'relative',
    overflow: 'hidden'
  },

  // Setup Modal
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.95)',
    backdropFilter: 'blur(20px)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    animation: 'fadeIn 0.5s ease'
  },

  modalContent: {
    background: 'rgba(10, 10, 10, 0.95)',
    padding: '40px',
    borderRadius: '20px',
    maxWidth: '500px',
    width: '90%',
    border: '1px solid rgba(0, 255, 180, 0.3)',
    boxShadow: '0 0 50px rgba(0, 255, 180, 0.1)'
  },

  modalTitle: {
    color: '#00ffb4',
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '28px',
    fontWeight: 'bold'
  },

  inputLabel: {
    color: '#fff',
    display: 'block',
    marginBottom: '10px',
    fontSize: '14px',
    fontWeight: '500'
  },

  inputField: {
    width: '100%',
    padding: '12px',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid #333',
    color: '#fff',
    borderRadius: '8px',
    fontSize: '16px',
    transition: 'all 0.3s ease'
  },

  primaryButton: {
    width: '100%',
    padding: '15px',
    background: 'linear-gradient(135deg, #00ffb4 0%, #00b4ff 100%)',
    border: 'none',
    color: '#000',
    fontWeight: 'bold',
    fontSize: '16px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'transform 0.2s ease'
  },

  // UI Panels
  panelLeft: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    width: '320px',
    zIndex: 10,
    pointerEvents: 'auto'
  },

  panelRight: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    width: '320px',
    zIndex: 10,
    pointerEvents: 'auto',
    textAlign: 'right'
  },

  deviceCard: {
    background: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    padding: '15px',
    marginBottom: '20px',
    transition: 'all 0.3s ease'
  },

  deviceCardSender: {
    borderLeft: '3px solid #00ffb4'
  },

  deviceCardReceiver: {
    borderRight: '3px solid #ff6b6b'
  },

  deviceIcon: {
    fontSize: '32px'
  },

  deviceLabel: {
    color: '#888',
    margin: 0,
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },

  deviceName: {
    margin: 0,
    fontWeight: 'bold',
    fontSize: '16px'
  },

  senderDeviceName: {
    color: '#00ffb4'
  },

  receiverDeviceName: {
    color: '#ff6b6b'
  },

  // Control Buttons
  controlButtons: {
    position: 'absolute',
    bottom: '100px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 10,
    pointerEvents: 'auto',
    display: 'flex',
    gap: '20px'
  },

  resetButton: {
    padding: '12px 24px',
    background: 'rgba(0, 0, 0, 0.8)',
    border: '1px solid #00ffb4',
    color: '#00ffb4',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.3s ease'
  },

  startButton: {
    padding: '12px 24px',
    background: '#00ffb4',
    border: 'none',
    color: '#000',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px',
    transition: 'transform 0.2s ease'
  },

  // Tooltip
  tooltip: {
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(0, 0, 0, 0.9)',
    backdropFilter: 'blur(10px)',
    padding: '8px 16px',
    borderRadius: '8px',
    border: '1px solid #00ffb4',
    zIndex: 100,
    fontSize: '12px',
    color: '#00ffb4',
    pointerEvents: 'none',
    whiteSpace: 'nowrap'
  }
};

// Keyframes for animations
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
      box-shadow: 0 0 5px rgba(0, 255, 180, 0.3);
    }
    50% {
      box-shadow: 0 0 20px rgba(0, 255, 180, 0.6);
    }
  }
`;