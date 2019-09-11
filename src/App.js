import React from 'react';

import './App.css';
import Router from './Router'
import Bob from './Bob'
import Dada from './Dada'

function App() {
  return (
    <div className="App">
      <Router>
        <Bob path="/bob">
        </Bob>
        <Dada path="/dada" default></Dada>
      </Router>
    </div>
  );
}

export default App;
