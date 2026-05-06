import React, { useState } from 'react';
import { Html } from '@react-three/drei';

const OSILayer = ({ name, y, position, isActive, layerIndex, onHover }) => {
  const [isHovered, setIsHovered] = useState(false);
  const glowIntensity = isActive ? 1 : (isHovered ? 0.5 : 0.1);
  const isLeft = position === 'left';
  
  return (
    <group position={[isLeft ? -4 : 4, y, 0]}>
      {/* Connecting pillar */}
      <mesh position={[0, -0.75, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 1.5, 8]} />
        <meshStandardMaterial 
          color={isActive ? "#00ffb4" : "#333"} 
          emissive={isActive ? "#00ffb4" : "#000"} 
          emissiveIntensity={glowIntensity}
          metalness={0.8}
        />
      </mesh>

      {/* Layer disc - main visual */}
      <mesh
        onPointerEnter={() => {
          setIsHovered(true);
          onHover({ layer: name, side: position, y });
        }}
        onPointerLeave={() => {
          setIsHovered(false);
          onHover(null);
        }}
      >
        <cylinderGeometry args={[1.8, 1.8, 0.15, 48]} />
        <meshStandardMaterial 
          color={isActive ? "#00ffb4" : (isHovered ? "#2a2a2a" : "#111")} 
          emissive={isActive ? "#00ffb4" : (isHovered ? "#00ffb4" : "#000")}
          emissiveIntensity={glowIntensity}
          transparent 
          opacity={isActive ? 0.9 : 0.7}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
      
      {/* Decorative ring */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[1.9, 1.9, 0.05, 48]} />
        <meshStandardMaterial 
          color={isActive ? "#00ffb4" : "#222"} 
          transparent 
          opacity={0.4}
          metalness={0.9}
        />
      </mesh>
      
      {/* Layer label with HTML overlay */}
      <Html distanceFactor={12} position={[isLeft ? -2.8 : 2.8, 0, 0]}>
        <div style={{ 
          color: isActive ? '#00ffb4' : (isHovered ? '#888' : '#555'), 
          fontSize: '12px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          transition: 'all 0.3s ease',
          fontFamily: 'monospace',
          background: isActive ? 'rgba(0, 255, 180, 0.15)' : 'transparent',
          padding: '4px 10px',
          borderRadius: '4px',
          borderLeft: isActive ? `3px solid #00ffb4` : (isLeft ? `3px solid transparent` : 'none'),
          borderRight: !isLeft && isActive ? `3px solid #00ffb4` : 'none',
          cursor: 'pointer',
          letterSpacing: '1px',
          textAlign: isLeft ? 'left' : 'right'
        }}>
          Layer {7 - layerIndex}: {name}
        </div>
      </Html>
      
      {/* Particle effects for active layer */}
      {isActive && (
        <mesh position={[0, 0.2, 0]}>
          <torusGeometry args={[1.9, 0.03, 16, 100]} />
          <meshStandardMaterial color="#00ffb4" emissive="#00ffb4" emissiveIntensity={0.5} />
        </mesh>
      )}
    </group>
  );
};

export default OSILayer;