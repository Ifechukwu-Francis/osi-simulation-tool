import { useState } from 'react';
import { S } from './HomePage/components/light';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const EMPTY_FORM = {
  question: '',
  options: ['', '', '', ''],
  answer: ''
};

const Admin = () => {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleLogout = () => {
    sessionStorage.removeItem('admin_token');
    window.location.href = '/admin-login';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(null);

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
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8fafc', 
      padding: '40px 20px',
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {/* Header with logout */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h2 style={{ color: '#1e293b', fontSize: '1.5rem', fontWeight: '700' }}>
            Question Management Panel
          </h2>
          <button 
            onClick={handleLogout}
            style={{
              padding: '8px 16px',
              backgroundColor: '#ef4444',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.85rem',
            }}
          >
            Logout
          </button>
        </div>

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
            <p style={{ 
              color: status.type === 'success' ? '#16a34a' : '#dc2626', 
              margin: '10px 0', 
              fontSize: '14px',
              fontWeight: '500',
            }}>
              {status.message}
            </p>
          )}

          <button type="submit" style={S.adminButton} disabled={loading}>
            {loading ? 'Processing...' : 'Upload to Database'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admin;