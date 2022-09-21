import React from 'react';
import './App.css';
import { CartesianPlan }  from './components/CartesianPlan';
import { StraightLines } from './components/StraightLines';
import { Vectors } from './components/Vectors';
import { CartesianProvider } from './contexts/CartesianContext'

function App() {
  return (
    <div className="App">
      <CartesianProvider>
        <div className="Inputs">
          <StraightLines />
          <Vectors />
        </div>
        <div>
          <CartesianPlan />
        </div>
      </CartesianProvider>
    </div>
  );
}

export default App;
