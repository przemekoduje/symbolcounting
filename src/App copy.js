import React, { useState, useEffect } from 'react';
import "./symbolCounting.scss";
import { Drawer } from '@mui/material'; // Importowanie Drawer z Material-UI

const symbols = ['♦', '♥', '♠', '♣', '★', '●'];

const SymbolCounting = () => {
  const [showSymbols, setShowSymbols] = useState([]);
  const [currentSymbol, setCurrentSymbol] = useState(null);
  const [symbolCounts, setSymbolCounts] = useState(symbols.reduce((acc, symbol) => {
    acc[symbol] = 0;
    return acc;
  }, {}));
  const [userCounts, setUserCounts] = useState(symbols.reduce((acc, symbol) => {
    acc[symbol] = '';
    return acc;
  }, {}));
  const [inputColors, setInputColors] = useState(symbols.reduce((acc, symbol) => {
    acc[symbol] = 'white';
    return acc;
  }, {}));
  const [sessionEnded, setSessionEnded] = useState(false);
  const [allInputsFilled, setAllInputsFilled] = useState(false);
  const [mode, setMode] = useState(null); // Stan dla trybu gry
  const [drawerOpen, setDrawerOpen] = useState(false); // Stan dla Drawer

  const getRandomSymbol = () => {
    return symbols[Math.floor(Math.random() * symbols.length)];
  };

  const generateSymbols = () => {
    if (mode === null) return;

    // Resetowanie wszystkich ustawień
    setShowSymbols([]);
    setCurrentSymbol(null);
    setSymbolCounts(symbols.reduce((acc, symbol) => {
      acc[symbol] = 0;
      return acc;
    }, {}));
    setUserCounts(symbols.reduce((acc, symbol) => {
      acc[symbol] = '';
      return acc;
    }, {}));
    setInputColors(symbols.reduce((acc, symbol) => {
      acc[symbol] = 'white';
      return acc;
    }, {}));
    setSessionEnded(false);
    setAllInputsFilled(false);

    const numberOfSymbols = mode === 'light' ? 10 : 20;

    const newSymbols = [];
    for (let i = 0; i < numberOfSymbols; i++) {
      newSymbols.push({
        symbol: getRandomSymbol(),
        left: Math.random() * 300 + 'px',
        top: Math.random() * 300 + 'px',
        key: i
      });
    }

    newSymbols.forEach((symbolObj, index) => {
      setTimeout(() => {
        setCurrentSymbol(symbolObj);
        setShowSymbols([symbolObj]);
        setSymbolCounts(prevCounts => ({
          ...prevCounts,
          [symbolObj.symbol]: prevCounts[symbolObj.symbol] + 1
        }));

        setTimeout(() => {
          setShowSymbols([]);
        }, 2000);
      }, index * 3000);
    });

    setTimeout(() => {
      setSessionEnded(true);
      setDrawerOpen(true); // Otwieranie Drawer po zakończeniu wyświetlania symboli
    }, newSymbols.length * 3000 + 1000);
  };

  useEffect(() => {
    if (sessionEnded) {
      const allFilled = symbols.every(symbol => userCounts[symbol] !== '');
      setAllInputsFilled(allFilled);
    }
  }, [userCounts, sessionEnded]);

  const handleInputChange = (symbol) => (e) => {
    const value = e.target.value;
    setUserCounts({
      ...userCounts,
      [symbol]: value
    });

    setInputColors({
      ...inputColors,
      [symbol]: parseInt(value) === symbolCounts[symbol] ? 'white' : 'black'
    });
  };

  const handleModeChange = (selectedMode) => {
    setMode(selectedMode);
    generateSymbols();
  };

  const handleStartGame = () => {
    setDrawerOpen(false); // Zamknięcie Drawer
    setMode(null); // Powrót do ekranu początkowego
  };

  return (
    <div className="symbolCounting">
      {!mode && !drawerOpen && (
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
              <div key={key} className="symbol show" style={{ left, top }}>
                {symbol}
              </div>
            ))}
          </div>
        </div>
      )}

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <div className="drawer-content">
          <div className="summary">
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
          <button className="start-button" onClick={handleStartGame}>Start</button>
        </div>
      </Drawer>
    </div>
  );
};

export default SymbolCounting;