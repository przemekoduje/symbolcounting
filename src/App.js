import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const symbols = ['♦', '♥', '♠', '♣', '★', '●'];

const App = () => {
  const [objectCounts, setObjectCounts] = useState(symbols.reduce((acc, symbol) => {
    acc[symbol] = 0;
    return acc;
  }, {}));
  const [userCounts, setUserCounts] = useState(symbols.reduce((acc, symbol) => {
    acc[symbol] = '';
    return acc;
  }, {}));
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [showSymbols, setShowSymbols] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  
  const intervalRef = useRef(null);

  const getRandomSymbol = () => {
    return symbols[Math.floor(Math.random() * symbols.length)];
  };

  const generateSymbols = () => {
    const newSymbols = [];
    for (let i = 0; i < 20; i++) {
      newSymbols.push({
        symbol: getRandomSymbol(),
        left: Math.random() * 100 + 'vw',
        top: Math.random() * 100 + 'vh',
        key: i
      });
    }
    setShowSymbols(newSymbols);
  };

  useEffect(() => {
    if (gameStarted) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev === 1) {
            clearInterval(intervalRef.current);
            setIsTimeUp(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      generateSymbols();

      return () => clearInterval(intervalRef.current);
    }
  }, [gameStarted]);

  const handleInputChange = (symbol) => (e) => {
    setUserCounts(prevCounts => ({
      ...prevCounts,
      [symbol]: e.target.value
    }));
  };

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const handleSubmit = () => {
    alert(
      symbols.map(symbol => `${symbol}: ${userCounts[symbol]} (prawidłowo: ${objectCounts[symbol]})`).join('\n')
    );
  };

  return (
    <div className="App">
      <h1>Proste Liczenie Obiektów</h1>
      {!gameStarted ? (
        <button onClick={handleStartGame}>Rozpocznij Grę</button>
      ) : (
        <div>
          <p>Czas pozostały: {timeLeft}s</p>
          {isTimeUp ? (
            <div>
              <h2>Czas minął!</h2>
              <div className="results">
                {symbols.map(symbol => (
                  <div key={symbol}>
                    <p>{symbol}: {userCounts[symbol] || 0} (prawidłowo: {objectCounts[symbol]})</p>
                  </div>
                ))}
              </div>
              <button onClick={handleSubmit}>Zatwierdź Wyniki</button>
            </div>
          ) : (
            <div>
              <div className="symbols">
                {showSymbols.map(({ symbol, left, top, key }) => (
                  <div key={key} className="symbol" style={{ left, top }}>
                    {symbol}
                  </div>
                ))}
              </div>
              <div className="inputs">
                {symbols.map(symbol => (
                  <div key={symbol}>
                    <label>{symbol}:
                      <input
                        type="number"
                        value={userCounts[symbol] || ''}
                        onChange={handleInputChange(symbol)}
                        min="0"
                      />
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
