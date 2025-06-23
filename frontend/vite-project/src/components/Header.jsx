import React from 'react';
import './Header.css';

export default function Header({ moves, timer, onReset }) {
  return (
    <header className="header">
      <div className="header-left">
        <img src="/vite.svg" alt="Logo" className="logo" />
        <h1>Memory Card Game</h1>
      </div>
      <div className="header-right">
        <div>Moves: <span className="header-bold">{moves}</span></div>
        <div>Time: <span className="header-bold">{timer}s</span></div>
        <button className="header-reset" onClick={onReset}>Reset</button>
      </div>
    </header>
  );
} 