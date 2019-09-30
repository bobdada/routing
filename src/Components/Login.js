import React from 'react';
import { useNavigation } from "../Router"
import '../App.css';
import { Nav } from "../App"


function Login() {
  const goto = useNavigation()
  return (
    <div className="Appa">
      <div className="div_wrapper">
        <div className="nav">
          <Nav />
        </div>
        <div className="content">
          <h1>This is Login</h1>
        </div>
      </div>
    </div>
  );
}

export default Login;
