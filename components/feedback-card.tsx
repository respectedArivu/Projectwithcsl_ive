// components/feedback-card.tsx
'use client';
import React from 'react';
import { Feedback } from "../typescript/feedback";

export default function FeedbackCard({ fb }: { fb: Feedback }) {
  return (
    <div className="feedback-card">
      <h4>{fb.name}</h4>
      <p>{fb.message}</p>
      {fb.rating && <p>⭐ {fb.rating}/5</p>}
      <small>{fb.email}</small>
    </div>
  );
}
