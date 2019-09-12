import React from 'react';
import { useNavigation } from "../Router"
import '../App.css';

function Login() {
  const goto = useNavigation()
  return (
    <div className="Appa">
      <h1>This is Loginn</h1>
      <button onClick={() => goto.goto("/dashboard")} > Goto Dashboard </button>
    </div>
  );
}

export default Login;
