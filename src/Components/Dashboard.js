import React from 'react';
import '../App.css';
import { Nav } from "../App"


function Dashboard({ goto }) {
  console.log(goto)
  return (
    <div className="Appa">
      <h1>This is Dashboard</h1>
      <Nav />
      <button onClick={() => goto("/login")}> Goto Login </button>
    </div>
  );
}

export default Dashboard;
