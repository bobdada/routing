import React from 'react';
import '../App.css';
import { Nav } from "../App"
import { useRouter } from '../Router'


function Dashboard({ goto, children }) {
  // console.log(children)
  return (
    <div className="Appa">
      <div className="div_wrapper">
        <div className="nav">
          <Nav />
        </div>
        <div className="content">
          <h1>This is Dashboard</h1>
          {/* <button onClick={() => goto("/login")}> Goto Login </button> */}
        </div>
      </div>
      {children}
    </div>
  );
}

export default Dashboard;
