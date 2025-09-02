


'use client';
import React, { useState } from 'react';

export default function FeedbackForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', rating: 5 });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('https://peojectwithcslive-prod-backend.onrender.com/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setStatus(data.message || data.error);
      setFormData({ name: '', email: '', message: '', rating: 5 });
    } catch (err) {
      setStatus('Error submitting feedback');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#000', // pure black background
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '400px',
          backgroundColor: '#1c1c1c', // dark gray box
          padding: '30px',
          border: '2px solid #333',
          color: 'white',
          boxShadow: '0 0 15px rgba(0,0,0,0.8)',
        }}
      >
        <h2
          style={{
            fontSize: '24px',
            textAlign: 'center',
            marginBottom: '20px',
            textTransform: 'uppercase',
            letterSpacing: '2px',
          }}
        >
          Feedback Form
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input
            style={{
              padding: '12px',
              backgroundColor: '#000',
              border: '1px solid #444',
              color: 'white',
              fontSize: '14px',
            }}
            placeholder="Name"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="email"
            style={{
              padding: '12px',
              backgroundColor: '#000',
              border: '1px solid #444',
              color: 'white',
              fontSize: '14px',
            }}
            placeholder="Email"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <textarea
            style={{
              padding: '12px',
              backgroundColor: '#000',
              border: '1px solid #444',
              color: 'white',
              fontSize: '14px',
              minHeight: '100px',
            }}
            placeholder="Message"
            value={formData.message}
            onChange={e => setFormData({ ...formData, message: e.target.value })}
            required
          />
          <select
            style={{
              padding: '12px',
              backgroundColor: '#000',
              border: '1px solid #444',
              color: 'white',
              fontSize: '14px',
            }}
            value={formData.rating}
            onChange={e => setFormData({ ...formData, rating: Number(e.target.value) })}
          >
            {[1, 2, 3, 4, 5].map(n => (
              <option key={n} value={n}>
                {n} ⭐
              </option>
            ))}
          </select>
          <button
            type="submit"
            style={{
              padding: '12px',
              backgroundColor: '#6a0dad', // sharp purple
              border: 'none',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'background 0.3s ease',
            }}
            onMouseOver={e => (e.currentTarget.style.backgroundColor = '#4b0082')}
            onMouseOut={e => (e.currentTarget.style.backgroundColor = '#6a0dad')}
          >
            Submit
          </button>
        </form>

        {status && (
          <p
            style={{
              marginTop: '20px',
              textAlign: 'center',
              fontSize: '14px',
              backgroundColor: '#000',
              padding: '10px',
              border: '1px solid #333',
            }}
          >
            {status}
          </p>
        )}
      </div>
    </div>
  );
}
