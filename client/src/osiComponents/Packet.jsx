import React from 'react';

const Packet = ({ packetRef, currentLayer, side }) => {
  const intensity = currentLayer !== "Idle" ? 0.8 : 0.2;
  
  return (
    <mesh ref={packetRef} position={[-4, 5, 0]}>
      {/* Main packet cube */}
      <boxGeometry args={[0.6, 0.6, 0.6]} />
      <meshStandardMaterial 
        color="#00ffb4" 
        emissive="#00ffb4" 
        emissiveIntensity={intensity}
        metalness={0.7}
        roughness={0.3}
      />
      
      {/* Wireframe overlay for tech look */}
      <mesh>
        <boxGeometry args={[0.62, 0.62, 0.62]} />
        <meshBasicMaterial 
          color="#ffffff" 
          wireframe 
          transparent 
          opacity={0.3} 
        />
      </mesh>
      
      {/* Inner glow effect */}
      <mesh scale={[0.4, 0.4, 0.4]}>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial 
          color="#00ffb4" 
          emissive="#00ffb4" 
          emissiveIntensity={intensity * 1.5}
          transparent
          opacity={0.5}
        />
      </mesh>
    </mesh>
  );
};

export default Packet;