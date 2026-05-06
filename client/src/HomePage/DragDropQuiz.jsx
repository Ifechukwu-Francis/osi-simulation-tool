import { useState, useEffect } from 'react';
import { S } from './components/light'; 

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const DragDropQuiz = () => {
  const [layers, setLayers] = useState([]);
  const [correctOrder, setCorrectOrder] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/questions/layers`)
      .then(res => res.json())
      .then(data => {
        setLayers(data.shuffled);
        setCorrectOrder(data.correctOrder);
      })
      .catch(err => console.error("Failed to load OSI layers:", err));
  }, []);

  const moveLayer = (index, direction) => {
    const newLayers = [...layers];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex < 0 || targetIndex >= layers.length) return;

    [newLayers[index], newLayers[targetIndex]] = [newLayers[targetIndex], newLayers[index]];
    setLayers(newLayers);
    setIsCorrect(null);
  };

  const checkResult = () => {
    const win = JSON.stringify(layers) === JSON.stringify(correctOrder);
    setIsCorrect(win);
  };

  return (
    <div style={S.card}>
      <div style={S.accent} />
      <div style={S.label}>
        <span>OSI Layer Challenge</span>
        <span style={{ color: '#64748b' }}>Arrange: Top (7) to Bottom (1)</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', margin: '24px 0' }}>
        {layers.map((layer, i) => (
          <div key={layer} style={S.dragItem}>
            <div style={S.layerNumber}>{7 - i}</div>
            <div style={{ flex: 1, fontWeight: '600', color: '#1e293b' }}>{layer} Layer</div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                onClick={() => moveLayer(i, 'up')} 
                style={S.moveBtn}
                disabled={i === 0}
              >
                ▲
              </button>
              <button 
                onClick={() => moveLayer(i, 'down')} 
                style={S.moveBtn}
                disabled={i === layers.length - 1}
              >
                ▼
              </button>
            </div>
          </div>
        ))}
      </div>

      {isCorrect !== null && (
        <div style={S.feedbackContainer}>
          {isCorrect ? (
            <p style={S.feedbackCorrect}>✓ Protocol Stack Verified!</p>
          ) : (
            <>
              <p style={S.feedbackIncorrect}>✗ Layer Misalignment Detected</p>
              <p style={S.feedbackExplanation}>Try reordering the layers from top (Application, Layer 7) to bottom (Physical, Layer 1).</p>
            </>
          )}
        </div>
      )}

      <button style={S.nextBtn(false)} onClick={checkResult}>
        Verify Sequence
      </button>
    </div>
  );
};

export default DragDropQuiz;