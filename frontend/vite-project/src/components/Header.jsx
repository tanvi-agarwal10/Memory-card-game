import React from 'react';
import './Header.css';

export default function Header({ moves, timer, onReset }) {
  return (
    <header className="header">
      <img src="/vite.svg" alt="Logo" className="logo" />
      <h1>Memory Card Game</h1>
      <div>Moves: <span className="header-bold">{moves}</span></div>
      <div>Time: <span className="header-bold">{timer}s</span></div>
      <button className="header-reset" onClick={onReset}>Reset</button>
    </header>
  );
} 