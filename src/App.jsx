import React, { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';


const App = () => {
  // Calculator's current input/display value
  const [calculatorInput, setCalculatorInput] = useState('');

  /**
   * Handles number and operator button clicks
   * Converts display symbols (× ÷) to calculation symbols (* /)
   */
  const handleButtonClick = (buttonValue) => {
    // Convert user-friendly symbols to JavaScript operators
    const calculationValue = buttonValue === '×' ? '*' : buttonValue === '÷' ? '/' : buttonValue;
    setCalculatorInput(previousInput => previousInput + calculationValue);
  };
  
  // Clear the entire calculator display
  const clearCalculator = () => setCalculatorInput('');
  
  // Remove the last entered character (backspace functionality)
  const removeLastCharacter = () => setCalculatorInput(previousInput => previousInput.slice(0, -1));
  
  /**
   * Performs the calculation and displays result
   * Uses eval() for simplicity - handles basic arithmetic expressions
   */
  const performCalculation = () => {
    try {
      const calculationResult = eval(calculatorInput);
      setCalculatorInput(String(calculationResult));
    } catch (error) {
      // Show user-friendly error message for invalid calculations
      setCalculatorInput('Error');
    }
  };

  // Calculator button layout 
  const calculatorButtons = [
    '7','8','9','÷',  
    '4','5','6','×',  
    '1','2','3','-',  
    '0','.','=','+'   
  ];  
  /**
   * Converts internal calculation symbols back to user-friendly display symbols
   * Shows × and ÷ instead of * and / in the calculator display
   */
  const getDisplayValue = () => {
    return calculatorInput.replace(/\*/g, '×').replace(/\//g, '÷');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Main calculator container with modern styling */}
      <div className="bg-white border border-gray-300 p-6 rounded-2xl shadow-lg w-80">
        
        {/* Calculator header with title and developer credit */}
        <div className="text-center mb-4">
          <h1 className="text-lg font-semibold text-gray-700 mb-2">Calculator</h1>
          <p className="text-xs text-gray-500">Developed by ASOG.Dev</p>
        </div>
        
        {/* Calculator display screen */}
        <div className="mb-4">
          <input
            type="text"
            className="w-full p-4 text-right text-2xl bg-gray-50 border border-gray-300 rounded focus:outline-none"
            value={getDisplayValue()}
            readOnly
            placeholder="0"
            aria-label="Calculator display"
          />
        </div>
        
        {/* Number and operator buttons grid */}
        <div className="grid grid-cols-4 gap-3">
          {calculatorButtons.map((buttonText) => (
            <button
              key={buttonText}
              onClick={() => buttonText === '=' ? performCalculation() : handleButtonClick(buttonText)}
              className={`p-4 text-lg font-medium rounded transition-colors ${
                buttonText === '=' 
                  ? 'bg-green-500 text-white hover:bg-green-600 font-bold' 
                  : 'bg-gray-200 hover:bg-blue-300'
              }`}
              aria-label={`${buttonText === '=' ? 'Calculate result' : `Input ${buttonText}`}`}
            >
              {buttonText}
            </button>
          ))}
          
          {/* Clear button s */}
          <button
            onClick={clearCalculator}
            className="col-span-2 p-4 text-lg font-medium bg-red-400 text-white rounded hover:bg-red-500 font-bold"
            aria-label="Clear calculator"
          >
            Clear
          </button>
          
          {/* Backspace button  */}
          <button
            onClick={removeLastCharacter}
            className="col-span-2 p-4 text-lg font-medium bg-yellow-300 text-black rounded hover:bg-yellow-400 font-bold"
            aria-label="Delete last character"
          >
            ← 
          </button>
        </div>
      </div>
      
      {/* Vercel Analytics for visitor tracking */}
      <Analytics />
    </div>
  );
};

export default App;
