import { useState } from 'react';
import { S } from './HomePage/components/light'; // Standardizing to the 'S' object

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const EMPTY_FORM = {
  question: '',
  options: ['', '', '', ''],
  answer: ''
};

const Admin = () => {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(null);

    // --- Validation ---
    if (!formData.question.trim()) {
      setStatus({ type: 'error', message: 'Question cannot be empty.' });
      return;
    }
    if (formData.options.some(opt => !opt.trim())) {
      setStatus({ type: 'error', message: 'All four options must be filled in.' });
      return;
    }
    if (!formData.answer.trim()) {
      setStatus({ type: 'error', message: 'Correct answer cannot be empty.' });
      return;
    }
    if (!formData.options.includes(formData.answer)) {
      setStatus({ type: 'error', message: 'Answer must match one of the options exactly.' });
      return;
    }

    setLoading(true);

    fetch(`${API_URL}/api/questions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => {
        if (!res.ok) throw new Error('Server responded with an error');
        return res.json();
      })
      .then(() => {
        setStatus({ type: 'success', message: 'Question saved successfully!' });
        setFormData(EMPTY_FORM);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setStatus({ type: 'error', message: 'Failed to save question. Please try again.' });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div style={S.adminContainer}>
      <h2 style={{ marginBottom: '20px', color: '#00ffb4' }}>Question Management Panel</h2>

      <form onSubmit={handleSubmit} style={S.adminForm}>
        <input
          placeholder="Enter Question Text"
          style={S.adminInput}
          value={formData.question}
          onChange={e => setFormData({ ...formData, question: e.target.value })}
        />

        {formData.options.map((opt, i) => (
          <input
            key={`option-${i}`}
            placeholder={`Option ${i + 1}`}
            style={S.adminInput}
            value={opt}
            onChange={e => {
              const newOpts = [...formData.options];
              newOpts[i] = e.target.value;
              setFormData({ ...formData, options: newOpts });
            }}
          />
        ))}

        <input
          placeholder="Correct Answer (must match an option exactly)"
          style={S.adminInput}
          value={formData.answer}
          onChange={e => setFormData({ ...formData, answer: e.target.value })}
        />

        {status && (
          <p style={{ color: status.type === 'success' ? '#00ffb4' : '#ff4d6d', margin: '10px 0', fontSize: '14px' }}>
            {status.message}
          </p>
        )}

        <button type="submit" style={S.adminButton(loading)} disabled={loading}>
          {loading ? 'Processing...' : 'Upload to Database'}
        </button>
      </form>
    </div>
  );
};

export default Admin;