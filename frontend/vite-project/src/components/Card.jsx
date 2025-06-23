import React from 'react';
import './Card.css';

export default function Card({ card, onClick }) {
  return (
    <div
      className={`card ${card.flipped || card.matched ? 'flipped' : ''}`}
      onClick={onClick}
    >
      {card.flipped || card.matched ? card.value : '❓'}
    </div>
  );
} 