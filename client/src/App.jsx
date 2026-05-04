import React, { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, MeshDistortMaterial } from '@react-three/drei'

function App() {
  const [questions, setQuestions] = useState([]);

  // Fetching data from your Node.js server
  useEffect(() => {
    fetch('http://localhost:5000/api/questions/random')
      .then(res => res.json())
      .then(data => {
        setQuestions(data);
        console.log("Data received from backend:", data);
      })
      .catch(err => console.error("Server not reached:", err));
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#111', position: 'relative' }}>
      
      {/* 3D ENGINE SECTION */}
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        <mesh>
          <boxGeometry args={[2, 2, 2]} />
          <MeshDistortMaterial color="#3498db" speed={2} distort={0.3} />
        </mesh>

        <OrbitControls />
      </Canvas>

      {/* OVERLAY UI SECTION */}
      <div style={{ position: 'absolute', top: '20px', left: '20px', color: 'white', pointerEvents: 'none' }}>
        <h1 style={{ margin: 0 }}>OSI Simulation Project</h1>
        <p style={{ color: '#aaa' }}>3D Engine: <span style={{ color: '#2ecc71' }}>Active</span></p>
        <p style={{ color: '#aaa' }}>Backend API: <span style={{ color: questions.length > 0 ? '#2ecc71' : '#e74c3c' }}>
          {questions.length > 0 ? 'Connected' : 'Connecting...'}
        </span></p>
      </div>

      {/* SHOWING DATA FROM BACKEND */}
      <div style={{ position: 'absolute', bottom: '20px', left: '20px', background: 'rgba(0,0,0,0.7)', padding: '15px', borderRadius: '8px', color: 'white', maxWidth: '300px' }}>
        <h3>Sample Question from DB:</h3>
        {questions.length > 0 ? (
          <p>{questions[0].question}</p>
        ) : (
          <p>Waiting for server...</p>
        )}
      </div>

    </div>
  )
}

export default App