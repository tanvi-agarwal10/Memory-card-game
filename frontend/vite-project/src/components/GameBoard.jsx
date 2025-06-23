import React from 'react';
import './GameBoard.css';
import Card from './Card';

export default function GameBoard({ cards, onCardClick }) {
  return (
    <div className="game-board">
      {cards.map((card, idx) => (
        <Card key={idx} card={card} onClick={() => onCardClick(idx)} />
      ))}
    </div>
  );
} 