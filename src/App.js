import React, { useEffect } from 'react';
import "./symbolCounting.scss";
import { useState } from 'react';

const symbols = ['♦', '♥', '♠', '♣', '★', '●'];

const SymbolCounting = () => {
  const [showSymbols, setShowSymbols] = useState([]); // Tablica symboli do wyświetlenia
  const [symbolCounts, setSymbolCounts] = useState(
    symbols.reduce((acc, symbol) => {
      acc[symbol] = 0;
      return acc;
    }, {})
  );
  const [userCounts, setUserCounts] = useState(
    symbols.reduce((acc, symbol) => {
      acc[symbol] = '';
      return acc;
    }, {})
  );
  const [inputColors, setInputColors] = useState(
    symbols.reduce((acc, symbol) => {
      acc[symbol] = 'white';
      return acc;
    }, {})
  );
  const [mode, setMode] = useState(null);

  // Funkcja do losowania symbolu
  const getRandomSymbol = () => {
    return symbols[Math.floor(Math.random() * symbols.length)];
  };

  // Funkcja do generowania nowych symboli
  const generateSymbols = () => {
    if (mode === null) return;


    setShowSymbols([]);
    setSymbolCounts(
      symbols.reduce((acc, symbol) => {
        acc[symbol] = 0;
        return acc;
      }, {})
    );

    const numberOfSymbols = mode === "light" ? 10 : 20; // Liczba symboli do wyświetlenia

    const newSymbols = [];
    for (let i = 0; i < numberOfSymbols; i++) {
      newSymbols.push({
        symbol: getRandomSymbol(),
        left: Math.random() * 300 + 'px', // Losowa pozycja w poziomie
        top: Math.random() * 300 + 'px',  // Losowa pozycja w pionie
        key: i
      });
    }

    newSymbols.forEach((symbolObj, index) => {
      setTimeout(() => {
        setShowSymbols([symbolObj]);

        // Dodajemy logowanie przed aktualizacją stanu
        setSymbolCounts(prevCounts => {
          const updatedCounts = {
            ...prevCounts,
            [symbolObj.symbol]: prevCounts[symbolObj.symbol] + 1
          };

          // Konsolujemy poprzedni i nowy stan liczników
          console.log("Previous Counts:", prevCounts);
          console.log("Current Symbol:", symbolObj.symbol);
          console.log("Updated Counts:", updatedCounts);

          return updatedCounts;
        });

        setTimeout(() => {
          setShowSymbols([]);
        }, 2000);
      }, index * 3000);
    });
  };

  const handleInputChange = (symbol) => (e) => {
    const value = e.target.value;
    setUserCounts({
      ...userCounts,
      [symbol]: value
    });

    setInputColors({
      ...inputColors,
      [symbol]: parseInt(value) === symbolCounts[symbol] ? 'white' : 'red'
    });
  };

  useEffect(() => {
    if (mode !== null) {
      generateSymbols();
    }
  }, [mode]);

  const handleModeChange = (selectedMode) => {
    setMode(selectedMode);

  };

  return (
    <div>
      <div className='symbolCounting'>
        {!mode && (
          <div className="mode-buttons">
            <button
              className="mode-button light-button"
              onClick={() => handleModeChange('light')}
            >
              Light
            </button>
            <button
              className="mode-button dark-button"
              onClick={() => handleModeChange('dark')}
            >
              Dark
            </button>
          </div>
        )}
        {mode && (
          <div className='wrapper'>
            <div className="symbols">
              {showSymbols.map(({ symbol, left, top, key }) => (
                <div key={key} className="symbol animate" style={{ left, top }}>
                  {symbol}
                </div>
              ))}
            </div>
            <div className="input-section">
              <h2>Enter the counts for each symbol:</h2>
              <ul>
                {symbols.map(symbol => (
                  <li key={symbol}>
                    <span className="symbol-class">{symbol}</span>
                    <input
                      className='number'
                      type="number"
                      value={userCounts[symbol]}
                      onChange={handleInputChange(symbol)}
                      min="0"
                      style={{ backgroundColor: inputColors[symbol] }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SymbolCounting;
