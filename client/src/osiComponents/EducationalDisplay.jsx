import React from 'react';
import { educationalContent } from '../data/osiEducationalData';

const EducationalDisplay = ({ currentLayer, side, userMessage, selectedMessage }) => {
  const content = educationalContent[side]?.[currentLayer];
  
  const styles = {
    container: {
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(20px)',
      borderRadius: '12px',
      padding: '20px',
      border: `2px solid ${side === 'sender' ? '#00ffb4' : '#ff6b6b'}`,
      animation: 'slideIn 0.5s ease',
      boxShadow: `0 0 20px ${side === 'sender' ? 'rgba(0, 255, 180, 0.3)' : 'rgba(255, 107, 107, 0.3)'}`,
      minHeight: '400px',
      transition: 'all 0.3s ease'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '15px',
      paddingBottom: '10px',
      borderBottom: `1px solid ${side === 'sender' ? '#00ffb4' : '#ff6b6b'}`
    },
    title: {
      color: side === 'sender' ? '#00ffb4' : '#ff6b6b',
      margin: 0,
      fontSize: '24px',
      fontWeight: 'bold'
    },
    badge: {
      background: side === 'sender' ? 'rgba(0, 255, 180, 0.2)' : 'rgba(255, 107, 107, 0.2)',
      padding: '4px 12px',
      borderRadius: '20px',
      color: side === 'sender' ? '#00ffb4' : '#ff6b6b',
      fontSize: '12px',
      fontWeight: 'bold'
    },
    layerTitle: {
      color: '#fff',
      marginBottom: '15px',
      fontSize: '20px'
    },
    description: {
      color: '#00ffb4',
      marginBottom: '10px',
      fontSize: '14px',
      fontWeight: 'bold'
    },
    details: {
      color: '#ccc',
      marginBottom: '15px',
      lineHeight: '1.6',
      fontSize: '14px'
    },
    transformationBox: {
      background: 'rgba(0, 255, 180, 0.05)',
      padding: '12px',
      borderRadius: '8px',
      marginBottom: '10px',
      borderLeft: `3px solid ${side === 'sender' ? '#00ffb4' : '#ff6b6b'}`
    },
    transformationText: {
      color: '#fff',
      margin: 0,
      fontSize: '13px'
    },
    technicalBox: {
      background: 'rgba(255, 255, 255, 0.03)',
      padding: '8px 12px',
      borderRadius: '6px',
      marginTop: '10px'
    },
    technicalText: {
      color: '#888',
      margin: 0,
      fontSize: '11px',
      fontFamily: 'monospace'
    },
    idleContainer: {
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(20px)',
      borderRadius: '12px',
      padding: '20px',
      border: '1px solid rgba(0, 255, 180, 0.3)',
      textAlign: 'center',
      minHeight: '400px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    completeContainer: {
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(20px)',
      borderRadius: '12px',
      padding: '20px',
      border: '1px solid rgba(0, 255, 180, 0.6)',
      textAlign: 'center',
      animation: 'pulse 2s infinite',
      minHeight: '400px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  };
  
  if (!content && currentLayer !== "Idle" && currentLayer !== "Transmission Complete") {
    return (
      <div style={styles.idleContainer}>
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>⚙️</div>
        <h3 style={{ color: '#00ffb4', marginBottom: '10px' }}>Processing {currentLayer} layer...</h3>
        <p style={{ color: '#aaa' }}>Data is being transformed at this layer</p>
      </div>
    );
  }
  
  if (currentLayer === "Idle") {
    return (
      <div style={styles.idleContainer}>
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>📡</div>
        <h3 style={{ color: '#00ffb4', marginBottom: '10px' }}>Ready to Simulate</h3>
        <p style={{ color: '#aaa', fontSize: '14px' }}>
          {side === 'sender' 
            ? "Select a sender device, receiver device, and enter a message to begin the OSI model journey!"
            : "Data will be received here after transmission"}
        </p>
      </div>
    );
  }
  
  if (currentLayer === "Transmission Complete") {
    return (
      <div style={styles.completeContainer}>
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>✅</div>
        <h3 style={{ color: '#00ffb4', marginBottom: '10px' }}>Transmission Complete!</h3>
        <p style={{ color: '#fff', fontSize: '16px', marginBottom: '15px', fontWeight: 'bold' }}>
          "{selectedMessage || userMessage}"
        </p>
        <p style={{ color: '#aaa', fontSize: '13px' }}>
          Successfully transmitted through all 7 layers of the OSI model!
        </p>
      </div>
    );
  }
  
  const transformationText = typeof content.transformation === 'function' 
    ? content.transformation(selectedMessage || userMessage)
    : content.transformation;
  
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>
          {side === 'sender' ? '📤 SENDER' : '📥 RECEIVER'}
        </h2>
        <span style={styles.badge}>
          Layer {side === 'sender' ? 8 - (Object.keys(educationalContent.sender).indexOf(currentLayer) + 1) : Object.keys(educationalContent.receiver).indexOf(currentLayer) + 1}/7
        </span>
      </div>
      
      <h3 style={styles.layerTitle}>
        {content.title}
      </h3>
      
      <p style={styles.description}>
        🔄 {content.description}
      </p>
      
      <p style={styles.details}>
        {content.details}
      </p>
      
      <div style={styles.transformationBox}>
        <p style={styles.transformationText}>
          <strong>📦 Data Transformation:</strong> {transformationText}
        </p>
      </div>
      
      <div style={styles.technicalBox}>
        <p style={styles.technicalText}>
          <strong>🔧 Protocols & Technologies:</strong> {content.technical}
        </p>
      </div>
    </div>
  );
};

export default EducationalDisplay;