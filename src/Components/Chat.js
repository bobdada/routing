import React from 'react';
import '../App.css';
import { Nav } from "../App"


function Chat({ path }) {

  return (
    <div className="Appa">
      <div className="div_wrapper">
        <div className="nav">
          <Nav />
        </div>
        <div className="content">
          <h1>This is Chat</h1>
        </div>
      </div>
    </div>
  );
}

export default Chat;
