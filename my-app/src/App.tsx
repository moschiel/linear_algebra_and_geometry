import React from 'react';
import './App.css';
import CartesianPlan from './components/CartesianPlan';
import StraightLines from './components/StraightLines';
import { CartesianProvider } from './contexts/CartesianContext'

function App() {
  return (
    <div className="App">
      <CartesianProvider>
        <div className="Inputs">
          <StraightLines />
        </div>
        <div>
          <CartesianPlan />
        </div>
      </CartesianProvider>
    </div>
  );
}

export default App;
