import { useState, useEffect } from 'react';
import { S } from './components/light';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
//const API_URL = 'http://localhost:5000';

// Only display info — no correct answers stored here
const PART1_LAYERS = [
  { layer: 7, name: "Application Layer", protocols: ["HTTP", "FTP", "SMTP", "DNS", "SNMP"], color: "#3b82f6" },
  { layer: 6, name: "Presentation Layer", protocols: ["SSL/TLS", "JPEG", "ASCII", "MPEG", "GIF"], color: "#8b5cf6" },
  { layer: 5, name: "Session Layer", protocols: ["NetBIOS", "RPC", "SMB", "SOCKS"], color: "#06b6d4" },
  { layer: 4, name: "Transport Layer", protocols: ["TCP", "UDP", "SCTP"], color: "#10b981" },
];

const PART2_LAYERS = [
  { layer: 3, name: "Network Layer", protocols: ["IPv4", "IPv6", "ICMP", "ARP", "IPsec"], color: "#f59e0b" },
  { layer: 2, name: "Data Link Layer", protocols: ["Ethernet", "Wi-Fi (802.11)", "PPP", "MAC"], color: "#ef4444" },
  { layer: 1, name: "Physical Layer", protocols: ["RJ45", "Fiber Optics", "Radio Waves", "Bluetooth"], color: "#6366f1" },
];

const DragDropQuiz = () => {
  const [part, setPart] = useState(1);
  const [availableProtocols, setAvailableProtocols] = useState([]);
  const [matchedProtocols, setMatchedProtocols] = useState({});
  const [draggedItem, setDraggedItem] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [partScores, setPartScores] = useState({ part1: null, part2: null });
  const [checking, setChecking] = useState(false);

  const currentLayers = part === 1 ? PART1_LAYERS : PART2_LAYERS;

  // Initialize the current part
  useEffect(() => {
    initializePart();
  }, [part]);

  const initializePart = () => {
    const layers = part === 1 ? PART1_LAYERS : PART2_LAYERS;
    const allProtocols = [];
    layers.forEach(layer => {
      layer.protocols.forEach(protocol => {
        allProtocols.push({ protocol, layerNumber: layer.layer });
      });
    });
    const shuffled = allProtocols.sort(() => Math.random() - 0.5);
    setAvailableProtocols(shuffled);
    
    const emptyMatched = {};
    layers.forEach(layer => {
      emptyMatched[layer.layer] = [];
    });
    setMatchedProtocols(emptyMatched);
    setShowResults(false);
    setScore(0);
  };

  const handleDragStart = (item) => {
    setDraggedItem(item);
  };

  const handleDrop = (layerNumber) => {
    if (!draggedItem) return;

    setAvailableProtocols(prev => prev.filter(p => p.protocol !== draggedItem.protocol));
    setMatchedProtocols(prev => ({
      ...prev,
      [layerNumber]: [...prev[layerNumber], draggedItem]
    }));
    setDraggedItem(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRemove = (layerNumber, protocolItem) => {
    setMatchedProtocols(prev => ({
      ...prev,
      [layerNumber]: prev[layerNumber].filter(p => p.protocol !== protocolItem.protocol)
    }));
    setAvailableProtocols(prev => [...prev, { protocol: protocolItem.protocol, layerNumber: protocolItem.layerNumber }]);
  };

  const handleCheck = async () => {
    setChecking(true);
    
    // Build the user's answers: { protocol: layerNumber }
    const userAnswers = {};
    Object.keys(matchedProtocols).forEach(layer => {
      matchedProtocols[layer].forEach(item => {
        userAnswers[item.protocol] = parseInt(layer);
      });
    });

    try {
      const res = await fetch(`${API_URL}/api/questions/check-protocols`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: userAnswers, part })
      });

      const data = await res.json();

      if (data.error) {
        alert(data.error);
        setChecking(false);
        return;
      }

      const percentage = Math.round((data.correct / data.total) * 100);
      setScore(percentage);
      setPartScores(prev => ({ ...prev, [`part${part}`]: percentage }));
      setShowResults(true);
    } catch (err) {
      console.error('Check error:', err);
      alert('Failed to check answers. Please try again.');
    }
    setChecking(false);
  };

  const handleNextPart = () => {
    setPart(2);
  };

  const handleResetCurrent = () => {
    initializePart();
  };

  const handleResetAll = () => {
    setPart(1);
    setPartScores({ part1: null, part2: null });
    // initializePart will be called by the useEffect when part changes to 1
  };

  const totalProtocols = currentLayers.reduce((sum, layer) => sum + layer.protocols.length, 0);
  const totalMatched = Object.values(matchedProtocols).flat().length;
  const allPlaced = totalMatched === totalProtocols;

  // Final combined results
  if (partScores.part1 !== null && partScores.part2 !== null) {
    const combinedScore = Math.round((partScores.part1 + partScores.part2) / 2);
    return (
      <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          padding: '40px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '12px' }}>
            {combinedScore >= 80 ? '🎉' : combinedScore >= 50 ? '📚' : '💪'}
          </div>
          <h3 style={{ color: '#1e293b', fontSize: '1.5rem', marginBottom: '20px' }}>
            Quiz Complete!
          </h3>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginBottom: '20px' }}>
            <div>
              <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Part 1 (L7-L4)</p>
              <p style={{ fontSize: '2rem', fontWeight: '800', color: '#3b82f6' }}>{partScores.part1}%</p>
            </div>
            <div>
              <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Part 2 (L3-L1)</p>
              <p style={{ fontSize: '2rem', fontWeight: '800', color: '#f59e0b' }}>{partScores.part2}%</p>
            </div>
          </div>
          
          <div style={{ 
            fontSize: '3.5rem', 
            fontWeight: '900', 
            background: 'linear-gradient(135deg, #fde047, #f97316)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '8px',
          }}>
            {combinedScore}%
          </div>
          <p style={{ color: '#64748b', marginBottom: '24px' }}>
            {combinedScore === 100 ? 'Perfect! You\'re an OSI expert!' :
             combinedScore >= 80 ? 'Great job! You know your protocols well!' :
             combinedScore >= 50 ? 'Good effort! Keep studying the layers.' :
             'Keep practicing! Review each layer\'s protocols.'}
          </p>
          
          <button
            onClick={handleResetAll}
            style={{
              width: '100%',
              padding: '14px 28px',
              background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              fontWeight: '700',
              fontSize: '1rem',
            }}
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '4px' }}>
          Part {part}/2: Match protocols to their correct OSI layers
        </p>
        <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
          {part === 1 ? 'Layer 7-4 (Application-Transport)' : 'Layer 3-1 (Network-Physical)'}
        </p>
        {partScores.part1 !== null && part === 2 && (
          <p style={{ color: '#3b82f6', fontSize: '0.85rem', marginTop: '4px' }}>
            Part 1 score: {partScores.part1}%
          </p>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '24px', alignItems: 'start' }}>
        
        {/* LEFT PANEL - Draggable Protocols */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
        }}>
          <h3 style={{ 
            fontSize: '1rem', 
            fontWeight: '700', 
            color: '#1e293b', 
            marginBottom: '16px',
            textAlign: 'center',
          }}>
            Drag These Protocols
          </h3>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {availableProtocols.map((item, index) => (
              <div
                key={`${item.protocol}-${index}`}
                draggable
                onDragStart={() => handleDragStart(item)}
                style={{
                  padding: '10px 18px',
                  backgroundColor: '#f1f5f9',
                  border: '2px solid #e2e8f0',
                  borderRadius: '10px',
                  cursor: 'grab',
                  fontWeight: '600',
                  color: '#334155',
                  fontSize: '0.9rem',
                  transition: 'all 0.2s ease',
                  userSelect: 'none',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#e2e8f0';
                  e.target.style.borderColor = '#3b82f6';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#f1f5f9';
                  e.target.style.borderColor = '#e2e8f0';
                }}
              >
                {item.protocol}
              </div>
            ))}
            {availableProtocols.length === 0 && (
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', textAlign: 'center', width: '100%', padding: '20px' }}>
                All protocols placed! ✓
              </p>
            )}
          </div>
        </div>

        {/* RIGHT PANEL - Drop Zones */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {currentLayers.map((layer) => {
            const matched = matchedProtocols[layer.layer] || [];
            return (
              <div
                key={layer.layer}
                onDrop={() => handleDrop(layer.layer)}
                onDragOver={handleDragOver}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '14px',
                  padding: '16px 20px',
                  border: '2px dashed #cbd5e1',
                  transition: 'all 0.2s ease',
                  minHeight: '70px',
                }}
                onDragEnter={(e) => {
                  e.currentTarget.style.borderColor = layer.color;
                  e.currentTarget.style.backgroundColor = `${layer.color}08`;
                }}
                onDragLeave={(e) => {
                  e.currentTarget.style.borderColor = '#cbd5e1';
                  e.currentTarget.style.backgroundColor = '#ffffff';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div>
                    <span style={{ fontWeight: '700', color: '#1e293b', fontSize: '0.95rem' }}>
                      {layer.name}
                    </span>
                    <span style={{ color: '#94a3b8', fontSize: '0.8rem', marginLeft: '8px' }}>
                      Layer {layer.layer}
                    </span>
                  </div>
                  <span style={{ 
                    color: layer.color, 
                    fontWeight: '700', 
                    fontSize: '0.85rem',
                  }}>
                    {matched.length}/{layer.protocols.length} matched
                  </span>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', minHeight: '28px' }}>
                  {matched.length === 0 && (
                    <p style={{ color: '#cbd5e1', fontSize: '0.8rem', fontStyle: 'italic' }}>
                      Drop protocols here
                    </p>
                  )}
                  {matched.map((item, index) => (
                    <span
                      key={`${item.protocol}-${index}`}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: `${layer.color}15`,
                        border: `1px solid ${layer.color}40`,
                        borderRadius: '8px',
                        color: layer.color,
                        fontWeight: '600',
                        fontSize: '0.8rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      ✓ {item.protocol}
                      <button
                        onClick={() => handleRemove(layer.layer, item)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#94a3b8',
                          cursor: 'pointer',
                          fontSize: '0.9rem',
                          padding: '0 2px',
                          lineHeight: '1',
                        }}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Results Modal */}
      {showResults && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999,
          padding: '20px',
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            padding: '40px',
            maxWidth: '440px',
            width: '100%',
            textAlign: 'center',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '12px' }}>
              {score >= 80 ? '🎉' : score >= 50 ? '📚' : '💪'}
            </div>
            <div style={{ 
              fontSize: '3.5rem', 
              fontWeight: '900', 
              background: 'linear-gradient(135deg, #fde047, #f97316)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '8px',
            }}>
              {score}%
            </div>
            <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '24px' }}>
              {score === 100 ? 'Perfect! All protocols matched correctly!' :
               score >= 80 ? 'Great job! Almost perfect!' :
               score >= 50 ? 'Good effort! Review the OSI layers and try again.' :
               'Keep studying! Understanding protocol layers takes practice.'}
            </p>
            
            {part === 1 ? (
              <button
                onClick={handleNextPart}
                style={{
                  width: '100%',
                  padding: '14px 28px',
                  background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontWeight: '700',
                  fontSize: '1rem',
                }}
              >
                Continue to Part 2 (Layers 3-1) →
              </button>
            ) : (
              <button
                onClick={() => setShowResults(false)}
                style={{
                  width: '100%',
                  padding: '14px 28px',
                  background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontWeight: '700',
                  fontSize: '1rem',
                }}
              >
                See Final Results
              </button>
            )}
          </div>
        </div>
      )}

      {/* Buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '32px' }}>
        <button
          onClick={handleResetCurrent}
          style={{
            padding: '12px 28px',
            backgroundColor: '#f1f5f9',
            color: '#475569',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.9rem',
          }}
        >
          Reset Part {part}
        </button>
        <button
          onClick={handleCheck}
          disabled={!allPlaced || checking}
          style={{
            padding: '12px 32px',
            backgroundColor: allPlaced ? '#16a34a' : '#cbd5e1',
            color: '#ffffff',
            border: 'none',
            borderRadius: '12px',
            cursor: allPlaced ? 'pointer' : 'not-allowed',
            fontWeight: '700',
            fontSize: '0.95rem',
          }}
        >
          {checking ? 'Checking...' : 'Check Answers'}
        </button>
      </div>
    </div>
  );
};

export default DragDropQuiz;