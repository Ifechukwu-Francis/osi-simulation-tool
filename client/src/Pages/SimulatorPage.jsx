import { useState, useRef, useCallback, useEffect } from 'react';
import gsap from 'gsap';

const OSI_LAYERS = [
  {
    number: 7, name: "Application", pdu: "Data", color: "#ef4444", icon: "📱",
    senderExplanation: "Your message \"{message}\" starts here. The Application layer provides network services to apps. Protocols like HTTP, SMTP, and FTP operate at this layer. Your message is raw data right now — no headers added yet.",
    receiverExplanation: "The original message \"{message}\" is delivered to the receiving application. The receiver can now read exactly what you sent.",
    protocols: "HTTP, HTTPS, SMTP, FTP, DNS, SNMP"
  },
  {
    number: 6, name: "Presentation", pdu: "Data", color: "#f97316", icon: "🔐",
    senderExplanation: "\"{message}\" gets translated into a standard format. If encryption is needed, SSL/TLS encrypts it here. Data may also be compressed to save space.",
    receiverExplanation: "Data is decrypted (if it was encrypted) and decompressed (if it was compressed). The message \"{message}\" is converted back to a readable format.",
    protocols: "SSL/TLS, JPEG, MPEG, ASCII, GIF"
  },
  {
    number: 5, name: "Session", pdu: "Data", color: "#eab308", icon: "🤝",
    senderExplanation: "A session is opened to send \"{message}\". Think of it like starting a phone call — both sides sync up. Checkpoints are added so if something breaks, you don't restart from zero.",
    receiverExplanation: "The session stays active until all data arrives. Once \"{message}\" is fully received, the session is properly closed.",
    protocols: "NetBIOS, RPC, SMB, SOCKS"
  },
  {
    number: 4, name: "Transport", pdu: "Segment", color: "#22c55e", icon: "🚪",
    senderExplanation: "\"{message}\" is chopped into segments. Each segment gets a port number (like Port 80 for web) so the receiver knows which app should get it. TCP adds sequence numbers for reliable delivery.",
    receiverExplanation: "Segments containing \"{message}\" are reassembled in order. TCP checks for missing pieces. The port number routes data to the correct application.",
    protocols: "TCP (reliable), UDP (fast/streaming)"
  },
  {
    number: 3, name: "Network", pdu: "Packet", color: "#06b6d4", icon: "🌐",
    senderExplanation: "Segments with \"{message}\" become packets. Source IP (192.168.1.101) and destination IP (203.0.113.10) are added. Routers use these to find the best path across the internet.",
    receiverExplanation: "The packet arrives. Destination IP is checked — if it matches this device, the IP header is removed and the segment moves up.",
    protocols: "IPv4, IPv6, ICMP, ARP, IPsec"
  },
  {
    number: 2, name: "Data Link", pdu: "Frame", color: "#3b82f6", icon: "🔗",
    senderExplanation: "Packets carrying \"{message}\" are wrapped into frames. MAC addresses (AA:BB:CC:DD:EE:01 → AA:BB:CC:DD:EE:FF) are added. A CRC error-check is appended to the end.",
    receiverExplanation: "The frame arrives. MAC address is verified. CRC confirms no errors during transmission. Frame header and trailer are stripped off.",
    protocols: "Ethernet, Wi-Fi (802.11), PPP, MAC"
  },
  {
    number: 1, name: "Physical", pdu: "Bits", color: "#8b5cf6", icon: "⚡",
    senderExplanation: "\"{message}\" becomes raw bits: 01001000... These travel as electrical signals through cables, light through fiber, or radio waves through air. This is actual physical transmission.",
    receiverExplanation: "Raw bits are received and converted back into a frame. The frame moves up to Data Link layer to begin decapsulation.",
    protocols: "RJ45, Fiber Optics, Radio Waves, Bluetooth, Hubs"
  },
];

const DEVICES = [
  { id: 'pc', name: 'Desktop PC', icon: '🖥️' },
  { id: 'laptop', name: 'Laptop', icon: '💻' },
  { id: 'mobile', name: 'Mobile Phone', icon: '📱' },
  { id: 'server', name: 'Server', icon: '🗄️' },
];

const stringToBinary = (str) => {
  if (!str) return '';
  return str.split('').map(char =>
    char.charCodeAt(0).toString(2).padStart(8, '0')
  ).join(' ').slice(0, 40) + '...';
};

const SimulatorPage = () => {
  const [phase, setPhase] = useState('setup');
  const [senderDevice, setSenderDevice] = useState(null);
  const [receiverDevice, setReceiverDevice] = useState(null);
  const [userMessage, setUserMessage] = useState('');
  const [currentLayerIndex, setCurrentLayerIndex] = useState(-1);
  const [currentSide, setCurrentSide] = useState('sender');
  const [activeExplanation, setActiveExplanation] = useState('');
  const [activeProtocols, setActiveProtocols] = useState('');
  const [activeLayerName, setActiveLayerName] = useState('');
  const [activeLayerColor, setActiveLayerColor] = useState('');
  const [activeLayerIcon, setActiveLayerIcon] = useState('');
  const [activeLayerPdu, setActiveLayerPdu] = useState('');
  const [speed, setSpeed] = useState(1);
  const [error, setError] = useState('');
  const [isPaused, setIsPaused] = useState(false);

  const timelineRef = useRef(null);
  const senderLayersRef = useRef([]);
  const receiverLayersRef = useRef([]);

  const getExplanation = (layer, side) => {
    let text = side === 'sender' ? layer.senderExplanation : layer.receiverExplanation;
    text = text.replace(/\{message\}/g, `"${userMessage}"`);
    if (layer.number === 1 && side === 'sender') {
      text = text.replace('01001000...', stringToBinary(userMessage));
    }
    return text;
  };

  // Show layer info WITHOUT affecting the simulation
  const showLayerInfo = (index, side) => {
    const layer = OSI_LAYERS[index];
    setActiveLayerName(layer.name);
    setActiveLayerColor(layer.color);
    setActiveLayerIcon(layer.icon);
    setActiveLayerPdu(layer.pdu);
    setActiveExplanation(getExplanation(layer, side));
    setActiveProtocols(layer.protocols);
    setCurrentLayerIndex(index);
    setCurrentSide(side);
  };

  // Highlight a layer (called by the timeline)
  const highlightLayer = (index, side) => {
    const layer = OSI_LAYERS[index];
    showLayerInfo(index, side);

    if (side === 'sender') {
      senderLayersRef.current.forEach((ref, i) => {
        if (ref) {
          gsap.to(ref, {
            backgroundColor: i === index ? `${layer.color}25` : '#ffffff',
            borderColor: i === index ? layer.color : '#e2e8f0',
            boxShadow: i === index ? `0 0 15px ${layer.color}30` : 'none',
            duration: 0.4,
          });
        }
      });
      receiverLayersRef.current.forEach(ref => {
        if (ref) gsap.to(ref, { backgroundColor: '#ffffff', borderColor: '#e2e8f0', boxShadow: 'none', duration: 0.4 });
      });
    } else {
      receiverLayersRef.current.forEach((ref, i) => {
        if (ref) {
          gsap.to(ref, {
            backgroundColor: i === index ? `${layer.color}25` : '#ffffff',
            borderColor: i === index ? layer.color : '#e2e8f0',
            boxShadow: i === index ? `0 0 15px ${layer.color}30` : 'none',
            duration: 0.4,
          });
        }
      });
      senderLayersRef.current.forEach(ref => {
        if (ref) gsap.to(ref, { backgroundColor: '#ffffff', borderColor: '#e2e8f0', boxShadow: 'none', duration: 0.4 });
      });
    }
  };

  const buildTimeline = useCallback(() => {
    const tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        setPhase('complete');
        setActiveExplanation(`✅ Transmission complete! The message "${userMessage}" has been successfully delivered to the receiver.`);
        setActiveProtocols('');
        setIsPaused(false);
      }
    });

    senderLayersRef.current.forEach(ref => {
      if (ref) gsap.set(ref, { backgroundColor: '#ffffff', borderColor: '#e2e8f0', boxShadow: 'none' });
    });
    receiverLayersRef.current.forEach(ref => {
      if (ref) gsap.set(ref, { backgroundColor: '#ffffff', borderColor: '#e2e8f0', boxShadow: 'none' });
    });

    // ENCAPSULATION
    OSI_LAYERS.forEach((layer, index) => {
      const layerDuration = 4 / speed;

      tl.call(() => {
        highlightLayer(index, 'sender');
        if (senderLayersRef.current[index]) {
          senderLayersRef.current[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, null, `>-0.3`);

      tl.to({}, { duration: layerDuration, ease: 'none' });
    });

    // TRANSMISSION
    tl.call(() => {
      setActiveExplanation(`⚡ Bits of "${userMessage}" are now traveling across the physical medium — through cables, fiber optics, or radio waves to the receiver.`);
      setActiveProtocols('');
      setActiveLayerName('');
      setActiveLayerPdu('');
      setCurrentLayerIndex(-1);
    });
    tl.to({}, { duration: 2 / speed, ease: 'none' });

    // DECAPSULATION
    const reversedLayers = [...OSI_LAYERS].reverse();
    reversedLayers.forEach((layer, index) => {
      const reverseIndex = 6 - index;
      const layerDuration = 4 / speed;

      tl.call(() => {
        highlightLayer(reverseIndex, 'receiver');
        if (receiverLayersRef.current[reverseIndex]) {
          receiverLayersRef.current[reverseIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, null, `>-0.3`);

      tl.to({}, { duration: layerDuration, ease: 'none' });
    });

    return tl;
  }, [speed, userMessage]);

  const handleStart = () => {
    if (!senderDevice || !receiverDevice || !userMessage.trim()) {
      setError('Please select both devices and enter a message.');
      return;
    }
    setError('');
    setPhase('running');
    setIsPaused(false);

    senderLayersRef.current.forEach(ref => {
      if (ref) gsap.set(ref, { backgroundColor: '#ffffff', borderColor: '#e2e8f0', boxShadow: 'none' });
    });
    receiverLayersRef.current.forEach(ref => {
      if (ref) gsap.set(ref, { backgroundColor: '#ffffff', borderColor: '#e2e8f0', boxShadow: 'none' });
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });

    const tl = buildTimeline();
    timelineRef.current = tl;
    setTimeout(() => tl.play(), 300);
  };

  const handlePauseResume = () => {
    if (!timelineRef.current) return;
    if (isPaused) {
      timelineRef.current.play();
      setIsPaused(false);
    } else {
      timelineRef.current.pause();
      setIsPaused(true);
    }
  };

  const handleReset = () => {
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }
    setPhase('setup');
    setCurrentLayerIndex(-1);
    setCurrentSide('sender');
    setActiveExplanation('');
    setActiveProtocols('');
    setActiveLayerName('');
    setActiveLayerColor('');
    setActiveLayerIcon('');
    setActiveLayerPdu('');
    setSenderDevice(null);
    setReceiverDevice(null);
    setUserMessage('');
    setError('');
    setIsPaused(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    return () => {
      if (timelineRef.current) timelineRef.current.kill();
    };
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>

      {/* FIXED TOP BAR */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999,
        backgroundColor: '#ffffff', borderBottom: '2px solid #e2e8f0',
        padding: '10px 20px', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.2rem', fontWeight: '800',
            background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>OSI Simulator</span>
          
          {phase !== 'setup' && (
            <span style={{
              padding: '4px 10px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: '600',
              backgroundColor: isPaused ? '#fef9c3' : phase === 'complete' ? '#fce7f3' : '#dcfce7',
              color: isPaused ? '#ca8a04' : phase === 'complete' ? '#db2777' : '#16a34a',
            }}>
              {isPaused ? '⏸ PAUSED' : phase === 'complete' ? '✓ COMPLETE' : '▶ RUNNING'}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          {phase === 'setup' && (
            <button onClick={handleStart} style={btn('#2563eb')}>
              ▶ Start Simulation
            </button>
          )}

          {(phase === 'running' || isPaused) && (
            <>
              <div style={{ display: 'flex', backgroundColor: '#f1f5f9', borderRadius: '8px', padding: '3px' }}>
                {[0.5, 1, 2].map(s => (
                  <button key={s} onClick={() => setSpeed(s)} style={{
                    padding: '5px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer',
                    fontWeight: '600', fontSize: '0.75rem',
                    backgroundColor: speed === s ? '#2563eb' : 'transparent',
                    color: speed === s ? '#ffffff' : '#64748b',
                  }}>{s}x</button>
                ))}
              </div>
              
              <button onClick={handlePauseResume} style={btn(isPaused ? '#22c55e' : '#f59e0b')}>
                {isPaused ? '▶ Resume' : '⏸ Pause'}
              </button>
              
              <button onClick={handleReset} style={btn('#ef4444')}>
                🔄 Restart
              </button>
            </>
          )}

          {phase === 'complete' && (
            <button onClick={handleReset} style={btn('#2563eb')}>
              🔄 New Simulation
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ paddingTop: '65px' }}>

        {/* SETUP */}
        {phase === 'setup' && (
          <div style={{ maxWidth: '550px', margin: '60px auto', padding: '0 20px' }}>
            <div style={{
              backgroundColor: '#ffffff', borderRadius: '20px', padding: '40px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0',
            }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1e293b', textAlign: 'center', marginBottom: '4px' }}>
                🌐 OSI Model Simulator
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.9rem', textAlign: 'center', marginBottom: '28px' }}>
                Watch your data travel through all 7 OSI layers
              </p>

              <label style={labelStyle}>📤 Sender Device</label>
              <div style={deviceGridStyle}>
                {DEVICES.map(d => (
                  <button key={d.id} onClick={() => setSenderDevice(d.id)} style={{
                    ...deviceBtnStyle, backgroundColor: senderDevice === d.id ? '#eff6ff' : '#f8fafc',
                    borderColor: senderDevice === d.id ? '#3b82f6' : '#e2e8f0',
                  }}><span style={{ fontSize: '1.5rem' }}>{d.icon}</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#334155' }}>{d.name}</span></button>
                ))}
              </div>

              <label style={labelStyle}>📥 Receiver Device</label>
              <div style={deviceGridStyle}>
                {DEVICES.map(d => (
                  <button key={d.id} onClick={() => setReceiverDevice(d.id)} style={{
                    ...deviceBtnStyle, backgroundColor: receiverDevice === d.id ? '#f0fdf4' : '#f8fafc',
                    borderColor: receiverDevice === d.id ? '#22c55e' : '#e2e8f0',
                  }}><span style={{ fontSize: '1.5rem' }}>{d.icon}</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#334155' }}>{d.name}</span></button>
                ))}
              </div>

              <label style={labelStyle}>💬 Your Message</label>
              <input type="text" value={userMessage} onChange={e => setUserMessage(e.target.value)}
                placeholder="Type a message to send through the OSI model..."
                style={inputStyle}
              />

              {error && <p style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '12px' }}>{error}</p>}

              <button onClick={handleStart} style={startBtnStyle}>
                🚀 Start Simulation
              </button>
            </div>
          </div>
        )}

        {/* SIMULATION / COMPLETE */}
        {phase !== 'setup' && (
          <div style={{
            display: 'grid', gridTemplateColumns: '260px 1fr 260px',
            gap: '16px', maxWidth: '1100px', margin: '0 auto', padding: '20px 16px',
            alignItems: 'start',
          }}>

            {/* SENDER LAYERS */}
            <div>
              <div style={{
                textAlign: 'center', padding: '10px', backgroundColor: '#eff6ff',
                borderRadius: '10px', marginBottom: '8px', border: '1px solid #bfdbfe',
                position: 'sticky', top: '75px', zIndex: 10,
              }}>
                <div style={{ fontSize: '1.5rem' }}>{DEVICES.find(d => d.id === senderDevice)?.icon}</div>
                <p style={{ fontWeight: '700', color: '#1e40af', fontSize: '0.75rem' }}>
                  {DEVICES.find(d => d.id === senderDevice)?.name}
                </p>
                <p style={{ fontSize: '0.6rem', color: '#64748b' }}>Sender ↓</p>
              </div>

              {OSI_LAYERS.map((layer, index) => {
                const isActive = currentLayerIndex === index && currentSide === 'sender';
                return (
                  <div key={`s-${layer.number}`} 
                    ref={el => senderLayersRef.current[index] = el}
                    onClick={() => showLayerInfo(index, 'sender')}
                    style={{
                      padding: '10px 12px', borderRadius: '8px',
                      border: `2px solid ${isActive ? layer.color : '#e2e8f0'}`,
                      backgroundColor: isActive ? `${layer.color}25` : '#ffffff',
                      marginBottom: '6px', transition: 'all 0.3s ease',
                      display: 'flex', alignItems: 'center', gap: '8px',
                      cursor: 'pointer',
                      boxShadow: isActive ? `0 0 15px ${layer.color}30` : 'none',
                    }}
                  >
                    <div style={{
                      width: '26px', height: '26px', borderRadius: '50%', backgroundColor: layer.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', fontWeight: '700', fontSize: '0.65rem', flexShrink: 0,
                    }}>{layer.number}</div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: '700', color: '#1e293b', fontSize: '0.75rem' }}>{layer.name}</p>
                      <p style={{ fontSize: '0.6rem', color: '#94a3b8' }}>{layer.pdu} ↓</p>
                    </div>
                    <span style={{ fontSize: '1rem' }}>{layer.icon}</span>
                  </div>
                );
              })}
            </div>

            {/* CENTER EXPLANATION */}
            <div style={{ position: 'sticky', top: '75px' }}>
              <div style={{
                backgroundColor: '#ffffff', borderRadius: '14px', padding: '24px',
                border: '2px solid #e2e8f0', minHeight: '300px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
              }}>
                {activeLayerName ? (
                  <>
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap',
                      backgroundColor: `${activeLayerColor}15`, padding: '6px 14px',
                      borderRadius: '20px', marginBottom: '16px',
                    }}>
                      <span style={{ fontSize: '1.1rem' }}>{activeLayerIcon}</span>
                      <span style={{ fontWeight: '700', color: activeLayerColor, fontSize: '0.85rem' }}>
                        Layer {currentLayerIndex + 1}: {activeLayerName}
                      </span>
                      <span style={{ color: '#94a3b8', fontSize: '0.7rem' }}>({activeLayerPdu})</span>
                      <span style={{ fontSize: '0.75rem', color: currentSide === 'sender' ? '#3b82f6' : '#22c55e' }}>
                        {currentSide === 'sender' ? '⬇ Sending' : '⬆ Receiving'}
                      </span>
                    </div>
                    <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: '1.7' }}>
                      {activeExplanation}
                    </p>
                    {activeProtocols && (
                      <div style={{ marginTop: '14px', padding: '10px 14px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                        <p style={{ fontSize: '0.65rem', color: '#94a3b8', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          Protocols at this layer
                        </p>
                        <p style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '500' }}>{activeProtocols}</p>
                      </div>
                    )}
                  </>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '260px', color: '#94a3b8' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '12px' }}>📡</div>
                    <p style={{ fontSize: '0.9rem', textAlign: 'center' }}>{activeExplanation || 'Click any layer on the left or right to see what happens there.'}</p>
                  </div>
                )}
              </div>

              {/* Progress */}
              <div style={{ marginTop: '12px' }}>
                <div style={{ height: '4px', backgroundColor: '#e2e8f0', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', background: 'linear-gradient(90deg, #3b82f6, #22c55e)',
                    borderRadius: '2px', transition: 'width 0.5s',
                    width: phase === 'complete' ? '100%' :
                      currentLayerIndex >= 0
                        ? currentSide === 'sender' ? `${((7 - currentLayerIndex) / 15) * 100}%`
                        : `${((8 + (6 - currentLayerIndex)) / 15) * 100}%`
                        : '0%',
                  }} />
                </div>
                <p style={{ textAlign: 'center', fontSize: '0.65rem', color: '#94a3b8', marginTop: '4px' }}>
                  💡 Click any layer anytime to inspect — simulation keeps running
                </p>
              </div>
            </div>

            {/* RECEIVER LAYERS */}
            <div>
              <div style={{
                textAlign: 'center', padding: '10px', backgroundColor: '#f0fdf4',
                borderRadius: '10px', marginBottom: '8px', border: '1px solid #bbf7d0',
                position: 'sticky', top: '75px', zIndex: 10,
              }}>
                <div style={{ fontSize: '1.5rem' }}>{DEVICES.find(d => d.id === receiverDevice)?.icon}</div>
                <p style={{ fontWeight: '700', color: '#166534', fontSize: '0.75rem' }}>
                  {DEVICES.find(d => d.id === receiverDevice)?.name}
                </p>
                <p style={{ fontSize: '0.6rem', color: '#64748b' }}>Receiver ↑</p>
              </div>

              {OSI_LAYERS.map((layer, index) => {
                const isActive = currentLayerIndex === index && currentSide === 'receiver';
                return (
                  <div key={`r-${layer.number}`}
                    ref={el => receiverLayersRef.current[index] = el}
                    onClick={() => showLayerInfo(index, 'receiver')}
                    style={{
                      padding: '10px 12px', borderRadius: '8px',
                      border: `2px solid ${isActive ? layer.color : '#e2e8f0'}`,
                      backgroundColor: isActive ? `${layer.color}25` : '#ffffff',
                      marginBottom: '6px', transition: 'all 0.3s ease',
                      display: 'flex', alignItems: 'center', gap: '8px',
                      cursor: 'pointer',
                      boxShadow: isActive ? `0 0 15px ${layer.color}30` : 'none',
                    }}
                  >
                    <span style={{ fontSize: '1rem' }}>{layer.icon}</span>
                    <div style={{ flex: 1, textAlign: 'right' }}>
                      <p style={{ fontWeight: '700', color: '#1e293b', fontSize: '0.75rem' }}>{layer.name}</p>
                      <p style={{ fontSize: '0.6rem', color: '#94a3b8' }}>↑ {layer.pdu}</p>
                    </div>
                    <div style={{
                      width: '26px', height: '26px', borderRadius: '50%', backgroundColor: layer.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', fontWeight: '700', fontSize: '0.65rem', flexShrink: 0,
                    }}>{layer.number}</div>
                  </div>
                );
              })}
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

const btn = (bg) => ({
  padding: '8px 16px', backgroundColor: bg, color: '#ffffff',
  border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '0.8rem',
  cursor: 'pointer', whiteSpace: 'nowrap',
});

const labelStyle = {
  display: 'block', fontWeight: '600', color: '#475569',
  fontSize: '0.85rem', marginBottom: '8px', marginTop: '4px',
};

const deviceGridStyle = {
  display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '20px',
};

const deviceBtnStyle = {
  padding: '12px', borderRadius: '10px', border: '2px solid #e2e8f0',
  cursor: 'pointer', display: 'flex', flexDirection: 'column',
  alignItems: 'center', gap: '6px',
};

const inputStyle = {
  width: '100%', padding: '12px 16px', borderRadius: '10px',
  border: '1px solid #e2e8f0', fontSize: '0.95rem',
  marginBottom: '20px', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box',
};

const startBtnStyle = {
  width: '100%', padding: '14px',
  background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
  color: '#ffffff', border: 'none', borderRadius: '12px',
  fontWeight: '700', fontSize: '1rem', cursor: 'pointer',
};

export default SimulatorPage;