import React, { useState, useEffect } from 'react';
import './App.css';

const symbols = ['♦', '♥', '♠', '♣', '★', '●'];

const App = () => {
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

  const getRandomSymbol = () => {
    return symbols[Math.floor(Math.random() * symbols.length)];
  };

  const easy = true;

  const generateSymbols = () => {
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


    const newSymbols = [];
    for (let i = 0; i < 20; i++) {
      newSymbols.push({
        symbol: getRandomSymbol(),
        left: easy ? '0px' : Math.random() * 300 + 'px',
        top: easy ? '0px' : Math.random() * 300 + 'px',
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
        }, 1000);
      }, index * 1500);
    });

    setTimeout(() => {
      setSessionEnded(true);
    }, newSymbols.length * 1500 + 1000);
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

  return (
    <div className="App">
      <button onClick={generateSymbols}>Start</button>
      {sessionEnded && (
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
      )}
      <div className='wrapper'>
        <div className="symbols">
          {showSymbols.map(({ symbol, left, top, key }) => (
            <div key={key} className={`symbol show`} style={{ left, top }}>
              {symbol}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
