import React, { useState, useEffect, useRef } from 'react';
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
  const [sessionEnded, setSessionEnded] = useState(false);
  const [allInputsFilled, setAllInputsFilled] = useState(false);

  const getRandomSymbol = () => {
    return symbols[Math.floor(Math.random() * symbols.length)];
  };

  const easy = false;

  const generateSymbols = () => {
    const newSymbols = [];
    for (let i = 0; i < 20; i++) {
      newSymbols.push({
        symbol: getRandomSymbol(),
        left: easy ? '0px' : Math.random() * 300 + 'px',
        top: easy ? '0px' : Math.random() * 300 + 'px',
        // left: '0',
        // top: '0',
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

    // Ustawienie sesji jako zakończonej po wyświetleniu wszystkich symboli
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
    setUserCounts({
      ...userCounts,
      [symbol]: e.target.value
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
                  {symbol}:
                  <input
                    className='number'
                    type="number"
                    value={userCounts[symbol]}
                    onChange={handleInputChange(symbol)}
                    min="0"
                  />
                  {allInputsFilled && (
                    <span> {symbolCounts[symbol]}</span>
                  )}
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
