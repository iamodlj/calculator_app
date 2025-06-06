import React, { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';

const App = () => {
  const [input, setInput] = useState('');

  const handleClick = (value) => {
    // Convert display symbols to actual operators for calculation
    const actualValue = value === '×' ? '*' : value === '÷' ? '/' : value;
    setInput(prev => prev + actualValue);
  };
  
  const handleClear = () => setInput('');
  const handleBackspace = () => setInput(prev => prev.slice(0, -1));
  const handleCalculate = () => {
    try {
      const result = eval(input);
      setInput(String(result));
    } catch (err) {
      setInput('Error');
    }
  };

  // Display symbols with × and ÷
  const buttons = ['7','8','9','÷','4','5','6','×','1','2','3','-','0','.','=','+'];
  
  // Function to display input with proper symbols
  const displayInput = () => {
    return input.replace(/\*/g, '×').replace(/\//g, '÷');
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white border border-gray-300 p-6 rounded-2xl shadow-lg w-80">
        <div className="text-center mb-4">
          <h1 className="text-lg font-semibold text-gray-700 mb-2">Calculator</h1>
          <p className="text-xs text-gray-500">Developed by ASOG.Dev</p>
        </div>        <div className="mb-4">
          <input
            type="text"
            className="w-full p-4 text-right text-2xl bg-gray-50 border border-gray-300 rounded focus:outline-none"
            value={displayInput()}
            readOnly
          />
        </div>        <div className="grid grid-cols-4 gap-3">
          {buttons.map((btn) => (
            <button
              key={btn}
              onClick={() => btn === '=' ? handleCalculate() : handleClick(btn)}
              className={`p-4 text-lg font-medium rounded transition-colors ${
                btn === '=' 
                  ? 'bg-green-500 text-white hover:bg-green-600' 
                  : 'bg-gray-200 hover:bg-blue-300'
              }`}
            >
              {btn}
            </button>
          ))}
          <button
            onClick={handleClear}
            className="col-span-2 p-4 text-lg font-medium bg-red-400 text-white rounded hover:bg-red-500"
          >
            Clear
          </button>
          <button
            onClick={handleBackspace}
            className="col-span-2 p-4 text-lg font-medium bg-yellow-300 text-black rounded hover:bg-yellow-400"
          >
            ←
          </button>
        </div>
      </div>
      <Analytics />
    </div>
  );
};

export default App;
