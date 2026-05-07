import { S } from '../HomePage/components/light';

const SimulatorPage = () => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8fafc',
      fontFamily: 'Inter, system-ui, sans-serif',
      padding: '40px 20px',
      textAlign: 'center',
    }}>
      <div style={{ fontSize: '6rem', marginBottom: '24px' }}>🚧</div>
      <h1 style={{ 
        fontSize: '2.5rem', 
        fontWeight: '800', 
        color: '#1e293b',
        marginBottom: '16px',
      }}>
        Coming Soon
      </h1>
      <p style={{ 
        color: '#64748b', 
        fontSize: '1.1rem', 
        maxWidth: '500px',
        lineHeight: '1.7',
      }}>
        The interactive OSI Model Simulator is currently under development. 
        You'll be able to visualize data encapsulation and transmission 
        across all 7 layers in real-time.
      </p>
    </div>
  );
};

export default SimulatorPage;

// import  { Suspense, useRef, useState, useEffect } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';
// import gsap from 'gsap';

// // Import components from osiComponents folder
// import OSILayer from '../osiComponents/OSILayer';
// import EducationalDisplay from '../osiComponents/EducationalDisplay';
// import DeviceSelector from '../osiComponents/DeviceSelector';
// import Packet from '../osiComponents/Packet';

// // Import styles and keyframes from your existing light.js
// import { S, keyframes } from '../HomePage/components/light';

// // Import data
// import { devices, layers } from '../data/osiEducationalData';

// const SimulatorPage = () => {
//   const packetRef = useRef();
//   const [currentLayer, setCurrentLayer] = useState("Idle");
//   const [currentSide, setCurrentSide] = useState("sender");
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [senderDevice, setSenderDevice] = useState(null);
//   const [receiverDevice, setReceiverDevice] = useState(null);
//   const [userMessage, setUserMessage] = useState("");
//   const [showSetup, setShowSetup] = useState(true);
//   const [hoveredLayer, setHoveredLayer] = useState(null);

//   // Inject keyframe animations
//   useEffect(() => {
//     const style = document.createElement('style');
//     style.textContent = keyframes;
//     document.head.appendChild(style);
//     return () => document.head.removeChild(style);
//   }, []);

//   const runFullSimulation = () => {
//     if (isAnimating || !senderDevice || !receiverDevice || !userMessage) {
//       alert("Please select both devices and enter a message!");
//       return;
//     }
    
//     setIsAnimating(true);
//     setShowSetup(false);
    
//     const tl = gsap.timeline({
//       onComplete: () => {
//         setIsAnimating(false);
//         setCurrentLayer("Transmission Complete");
//       }
//     });
    
//     // Reset packet position to sender side
//     tl.set(packetRef.current.position, { x: -4, y: 5, z: 0 });
//     tl.set(packetRef.current.scale, { x: 1, y: 1, z: 1 });

//     // ENCAPSULATION (Sender side - moving down through layers)
//     layers.forEach((layer, index) => {
//       tl.to(packetRef.current.position, {
//         y: layer.y,
//         duration: 0.7,
//         ease: "power2.inOut",
//         onStart: () => {
//           setCurrentLayer(layer.name);
//           setCurrentSide("sender");
//         }
//       });
      
//       // Grow packet as it adds headers (encapsulation)
//       if (index < layers.length - 1) {
//         tl.to(packetRef.current.scale, {
//           x: 1 + (index * 0.12),
//           y: 1 + (index * 0.12),
//           z: 1 + (index * 0.12),
//           duration: 0.3,
//           ease: "backOut"
//         }, "-=0.4");
//       }
//     });

//     // TRANSMISSION across network (move from left to right)
//     tl.to(packetRef.current.position, { 
//       x: 4, 
//       duration: 1.5, 
//       ease: "power1.inOut",
//       onStart: () => {
//         setCurrentLayer("Physical");
//         setCurrentSide("sender");
//       }
//     });

//     // DECAPSULATION (Receiver side - moving up through layers)
//     const reverseLayers = [...layers].reverse();
//     reverseLayers.forEach((layer, index) => {
//       tl.to(packetRef.current.position, {
//         y: layer.y,
//         duration: 0.7,
//         ease: "power2.inOut",
//         onStart: () => {
//           setCurrentLayer(layer.name);
//           setCurrentSide("receiver");
//         }
//       });

//       // Shrink packet as it removes headers (de-encapsulation)
//       tl.to(packetRef.current.scale, {
//         x: 1 + ((6 - index) * 0.12),
//         y: 1 + ((6 - index) * 0.12),
//         z: 1 + ((6 - index) * 0.12),
//         duration: 0.3,
//         ease: "backIn"
//       }, "-=0.4");
//     });
//   };

//   const resetSimulation = () => {
//     setShowSetup(true);
//     setCurrentLayer("Idle");
//     setCurrentSide("sender");
//     setSenderDevice(null);
//     setReceiverDevice(null);
//     setUserMessage("");
//     setIsAnimating(false);
//     if (packetRef.current) {
//       gsap.set(packetRef.current.position, { x: -4, y: 5, z: 0 });
//       gsap.set(packetRef.current.scale, { x: 1, y: 1, z: 1 });
//     }
//   };

//   return (
//     <div style={S.container}>
      
//       {/* Setup Modal */}
//       {showSetup && (
//         <div style={S.modalOverlay}>
//           <div style={S.modalContent}>
//             <h1 style={S.modalTitle}>
//               🌐 OSI Model Simulator
//             </h1>
            
//             <div style={{ marginBottom: '30px' }}>
//               <label style={S.inputLabel}>
//                 📤 Select Sender Device:
//               </label>
//               <DeviceSelector onSelect={setSenderDevice} title="Choose sender" selected={senderDevice} />
//             </div>
            
//             <div style={{ marginBottom: '30px' }}>
//               <label style={S.inputLabel}>
//                 📥 Select Receiver Device:
//               </label>
//               <DeviceSelector onSelect={setReceiverDevice} title="Choose receiver" selected={receiverDevice} />
//             </div>
            
//             <div style={{ marginBottom: '30px' }}>
//               <label style={S.inputLabel}>
//                 💬 Enter your message:
//               </label>
//               <input
//                 type="text"
//                 value={userMessage}
//                 onChange={(e) => setUserMessage(e.target.value)}
//                 placeholder="Type your message here..."
//                 style={S.inputField}
//                 onFocus={(e) => e.target.style.borderColor = '#00ffb4'}
//                 onBlur={(e) => e.target.style.borderColor = '#333'}
//               />
//             </div>
            
//             <button
//               onClick={runFullSimulation}
//               style={S.primaryButton}
//               onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
//               onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
//             >
//               🚀 Start Simulation
//             </button>
//           </div>
//         </div>
//       )}
      
//       {/* UI Overlay */}
//       <div style={S.panelLeft}>
//         <div style={{ ...S.deviceCard, ...S.deviceCardSender }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//             <span style={S.deviceIcon}>{senderDevice ? devices[senderDevice]?.icon : '❓'}</span>
//             <div>
//               <p style={S.deviceLabel}>SENDER</p>
//               <p style={{ ...S.deviceName, ...S.senderDeviceName }}>
//                 {senderDevice ? devices[senderDevice]?.name : 'Not selected'}
//               </p>
//             </div>
//           </div>
//         </div>
        
//         <EducationalDisplay 
//           currentLayer={currentLayer}
//           side={currentSide}
//           userMessage={userMessage}
//           selectedMessage={userMessage}
//         />
//       </div>
      
//       <div style={S.panelRight}>
//         <div style={{ ...S.deviceCard, ...S.deviceCardReceiver }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'flex-end' }}>
//             <div>
//               <p style={S.deviceLabel}>RECEIVER</p>
//               <p style={{ ...S.deviceName, ...S.receiverDeviceName }}>
//                 {receiverDevice ? devices[receiverDevice]?.name : 'Not selected'}
//               </p>
//             </div>
//             <span style={S.deviceIcon}>{receiverDevice ? devices[receiverDevice]?.icon : '❓'}</span>
//           </div>
//         </div>
        
//         <EducationalDisplay 
//           currentLayer={currentLayer}
//           side={currentSide === 'sender' ? 'sender' : 'receiver'}
//           userMessage={userMessage}
//           selectedMessage={userMessage}
//         />
//       </div>
      
//       {/* Control Buttons */}
//       {!showSetup && !isAnimating && currentLayer === "Transmission Complete" && (
//         <div style={S.controlButtons}>
//           <button
//             onClick={resetSimulation}
//             style={S.resetButton}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.background = 'rgba(0, 255, 180, 0.2)';
//               e.currentTarget.style.transform = 'scale(1.05)';
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.background = 'rgba(0, 0, 0, 0.8)';
//               e.currentTarget.style.transform = 'scale(1)';
//             }}
//           >
//             🔄 New Simulation
//           </button>
//         </div>
//       )}
      
//       {!showSetup && !isAnimating && currentLayer === "Idle" && (
//         <div style={S.controlButtons}>
//           <button
//             onClick={runFullSimulation}
//             style={S.startButton}
//             onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
//             onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
//           >
//             🚀 Start Transmission
//           </button>
//         </div>
//       )}
      
//       {/* 3D Environment */}
//       <Canvas shadows camera={{ position: [0, 2, 15], fov: 50 }}>
//         <Suspense fallback={null}>
//           <PerspectiveCamera makeDefault position={[0, 2, 15]} />
//           <OrbitControls 
//             enableZoom={true} 
//             maxDistance={25} 
//             minDistance={8}
//             enablePan={true}
//             target={[0, 0, 0]}
//           />
//           <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
//           <ambientLight intensity={0.3} />
//           <pointLight position={[0, 10, 0]} intensity={1.5} />
//           <pointLight position={[5, 5, 5]} intensity={1} color="#00ffb4" />
//           <pointLight position={[-5, 5, 5]} intensity={1} color="#ff6b6b" />

//           {/* Render Sender Layers (Left) */}
//           {layers.map((layer, idx) => (
//             <OSILayer
//               key={`sender-${layer.name}`}
//               name={layer.name}
//               y={layer.y}
//               position="left"
//               isActive={currentLayer === layer.name && currentSide === "sender"}
//               layerIndex={idx}
//               onHover={(info) => setHoveredLayer(info)}
//             />
//           ))}
          
//           {/* Render Receiver Layers (Right) */}
//           {layers.map((layer, idx) => (
//             <OSILayer
//               key={`receiver-${layer.name}`}
//               name={layer.name}
//               y={layer.y}
//               position="right"
//               isActive={currentLayer === layer.name && currentSide === "receiver"}
//               layerIndex={idx}
//               onHover={(info) => setHoveredLayer(info)}
//             />
//           ))}
          
//           {/* Network Cloud/Pathway between sender and receiver */}
//           <mesh position={[0, -2, 0]}>
//             <sphereGeometry args={[1.5, 32, 32]} />
//             <meshStandardMaterial color="#00ffb4" wireframe transparent opacity={0.15} />
//           </mesh>
          
//           <Packet packetRef={packetRef} currentLayer={currentLayer} side={currentSide} />
          
//           {/* Visual connection lines between sender and receiver */}
//           <lineSegments>
//             <bufferGeometry>
//               <bufferAttribute 
//                 attach="attributes-position"
//                 count={2}
//                 array={new Float32Array([-3, -4, 0, 3, -4, 0])}
//                 itemSize={3}
//               />
//             </bufferGeometry>
//             <lineBasicMaterial color="#00ffb4" transparent opacity={0.3} />
//           </lineSegments>
          
//           {/* Additional decorative network lines */}
//           <lineSegments>
//             <bufferGeometry>
//               <bufferAttribute 
//                 attach="attributes-position"
//                 count={2}
//                 array={new Float32Array([-2, -2, 0, 2, -2, 0])}
//                 itemSize={3}
//               />
//             </bufferGeometry>
//             <lineBasicMaterial color="#ff6b6b" transparent opacity={0.2} />
//           </lineSegments>
//         </Suspense>
//       </Canvas>
      
//       {/* Hover Tooltip */}
//       {hoveredLayer && (
//         <div style={S.tooltip}>
//           {hoveredLayer.layer} Layer ({hoveredLayer.side === 'left' ? 'Sender' : 'Receiver'} Side)
//         </div>
//       )}
//     </div>
//   );
// };

// export default SimulatorPage;