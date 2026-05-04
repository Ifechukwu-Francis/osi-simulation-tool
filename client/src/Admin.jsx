import React, { useState } from 'react';

function Admin() {
  const [formData, setFormData] = useState({
    question: '',
    options: ['', '', '', ''],
    answer: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(() => alert('Question added successfully!'))
    .catch(err => console.error(err));
  };

  return (
    <div style={{ padding: '20px', color: 'white', background: '#222', minHeight: '100vh' }}>
      <h2>Question Management Panel</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
        <input 
          placeholder="Question" 
          onChange={e => setFormData({...formData, question: e.target.value})} 
          style={{ padding: '8px' }}
        />
        {formData.options.map((opt, i) => (
          <input 
            key={i} 
            placeholder={`Option ${i + 1}`} 
            onChange={e => {
              const newOpts = [...formData.options];
              newOpts[i] = e.target.value;
              setFormData({...formData, options: newOpts});
            }} 
            style={{ padding: '8px' }}
          />
        ))}
        <input 
          placeholder="Correct Answer" 
          onChange={e => setFormData({...formData, answer: e.target.value})} 
          style={{ padding: '8px' }}
        />
        <button type="submit" style={{ padding: '10px', background: '#3498db', color: 'white', border: 'none', cursor: 'pointer' }}>
          Save Question
        </button>
      </form>
    </div>
  );
}

export default Admin;