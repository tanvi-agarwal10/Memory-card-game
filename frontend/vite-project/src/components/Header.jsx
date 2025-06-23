import React from 'react';
import './Header.css';

export default function Header({ moves, timer, onReset }) {
  return (
    <div className="header">
      <div>Moves: <span className="header-bold">{moves}</span></div>
      <div>Time: <span className="header-bold">{timer}s</span></div>
      <button className="header-reset" onClick={onReset}>Reset</button>
    </div>
  );
} 