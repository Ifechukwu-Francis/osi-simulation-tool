import React, { useState } from 'react';
import { devices } from '../data/osiEducationalData';

const DeviceSelector = ({ onSelect, title, selected }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const styles = {
    container: {
      position: 'relative'
    },
    button: {
      background: 'rgba(0, 0, 0, 0.8)',
      border: `1px solid ${selected ? '#00ffb4' : '#333'}`,
      color: selected ? '#00ffb4' : '#fff',
      padding: '10px 20px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      transition: 'all 0.3s ease',
      width: '100%'
    },
    dropdown: {
      position: 'absolute',
      top: '100%',
      left: 0,
      marginTop: '10px',
      background: 'rgba(0, 0, 0, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: '8px',
      padding: '10px',
      zIndex: 1000,
      minWidth: '220px',
      border: '1px solid #333',
      boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
    },
    option: {
      width: '100%',
      padding: '10px',
      margin: '5px 0',
      background: 'transparent',
      border: 'none',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      transition: 'all 0.2s ease',
      cursor: 'pointer'
    }
  };
  
  return (
    <div style={styles.container}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={styles.button}
        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0, 255, 180, 0.1)'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0, 0, 0, 0.8)'}
      >
        {selected ? devices[selected].icon : '❓'} 
        {selected ? devices[selected].name : title}
      </button>
      
      {isOpen && (
        <div style={styles.dropdown}>
          {Object.entries(devices).map(([key, device]) => (
            <button
              key={key}
              onClick={() => {
                onSelect(key);
                setIsOpen(false);
              }}
              style={{
                ...styles.option,
                background: selected === key ? 'rgba(0, 255, 180, 0.2)' : 'transparent',
                color: selected === key ? '#00ffb4' : '#fff'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.background = selected === key ? 'rgba(0, 255, 180, 0.2)' : 'transparent'}
            >
              {device.icon} {device.name}
              <span style={{ marginLeft: 'auto', fontSize: '10px', color: '#666' }}>
                {device.specs}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeviceSelector;