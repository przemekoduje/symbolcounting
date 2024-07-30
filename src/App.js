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
<<<<<<< HEAD
  const [inputColors, setInputColors] = useState(symbols.reduce((acc, symbol) => {
    acc[symbol] = 'white';
    return acc;
  }, {}));
=======
>>>>>>> 808adc6df4a9fcca64f4f1b5f8adab8d9680cb38
  const [sessionEnded, setSessionEnded] = useState(false);
  const [allInputsFilled, setAllInputsFilled] = useState(false);

  const getRandomSymbol = () => {
    return symbols[Math.floor(Math.random() * symbols.length)];
  };

<<<<<<< HEAD
  const easy = true;
=======
  const easy = false;
>>>>>>> 808adc6df4a9fcca64f4f1b5f8adab8d9680cb38

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
<<<<<<< HEAD
=======
        // left: '0',
        // top: '0',
>>>>>>> 808adc6df4a9fcca64f4f1b5f8adab8d9680cb38
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

<<<<<<< HEAD
=======
    // Ustawienie sesji jako zakończonej po wyświetleniu wszystkich symboli
>>>>>>> 808adc6df4a9fcca64f4f1b5f8adab8d9680cb38
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
<<<<<<< HEAD
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
=======
    setUserCounts({
      ...userCounts,
      [symbol]: e.target.value
    });
  };



>>>>>>> 808adc6df4a9fcca64f4f1b5f8adab8d9680cb38

  return (
    <div className="App">
      <button onClick={generateSymbols}>Start</button>
      {sessionEnded && (
<<<<<<< HEAD
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
=======
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


>>>>>>> 808adc6df4a9fcca64f4f1b5f8adab8d9680cb38
    </div>
  );
};

export default App;
