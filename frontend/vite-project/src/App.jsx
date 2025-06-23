import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import GameBoard from './components/GameBoard';
import { shuffleCards } from './utils/shuffle';
import './App.css';

const CARD_VALUES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

function generateDeck() {
  // Each value appears twice
  return shuffleCards(
    CARD_VALUES.concat(CARD_VALUES).map((value, idx) => ({
      id: idx,
      value,
      flipped: false,
      matched: false,
    }))
  );
}

function App() {
  const [cards, setCards] = useState(generateDeck());
  const [flippedCards, setFlippedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [gameActive, setGameActive] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!gameActive) return;
    const interval = setInterval(() => setTimer((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [gameActive]);

  useEffect(() => {
    if (cards.every((card) => card.matched)) {
      setGameActive(false);
      setTimeout(() => setShowModal(true), 500);
    }
  }, [cards]);

  const handleCardClick = (index) => {
    if (!gameActive) return;
    if (flippedCards.length === 2 || cards[index].flipped || cards[index].matched) return;
    const newCards = [...cards];
    newCards[index].flipped = true;
    const newFlipped = [...flippedCards, index];
    setCards(newCards);
    setFlippedCards(newFlipped);
    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [i1, i2] = newFlipped;
      if (newCards[i1].value === newCards[i2].value) {
        setTimeout(() => {
          const matchedCards = newCards.map((card, idx) =>
            idx === i1 || idx === i2 ? { ...card, matched: true } : card
          );
          setCards(matchedCards);
          setFlippedCards([]);
        }, 500);
      } else {
        setTimeout(() => {
          const resetCards = newCards.map((card, idx) =>
            idx === i1 || idx === i2 ? { ...card, flipped: false } : card
          );
          setCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const handleReset = () => {
    setCards(generateDeck());
    setFlippedCards([]);
    setMoves(0);
    setTimer(0);
    setGameActive(true);
    setShowModal(false);
  };

  return (
    <div className="app-container">
      <Header moves={moves} timer={timer} onReset={handleReset} />
      <GameBoard cards={cards} onCardClick={handleCardClick} />
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>🎉 Congratulations! 🎉</h2>
            <p>You matched all cards!</p>
            <p>Moves: <b>{moves}</b></p>
            <p>Time: <b>{timer} seconds</b></p>
            <button className="modal-reset" onClick={handleReset}>Play Again</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
