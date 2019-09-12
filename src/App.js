import React from 'react';

import './App.css';
import Router, { useNavigation, withNavigation } from './Router'
import Home from './Components/Home'
import Dashboard from './Components/Dashboard'
import Login from './Components/Login'
import Chat from './Components/Chat'
import NotFound from './Components/NotFound'


/**
 * useNavigation hook
 */

export function Nav() {
  let { goto } = useNavigation()
  return (
    <div className="nav">
      <button className="nav_button" onClick={() => goto("/dashboard/home")}>Home</button>
      <button className="nav_button" onClick={() => goto("/dashboard/chat")}>Chat</button>
    </div>
  )
}

/**
 * withNavigation HOC with functional Component
 */

// function NoNav(props) {
//   return (
//     <div>
//       <button onClick={() => props.goto("/apple")}>Apple</button>
//       <button onClick={() => props.goto("/ball")}>Ball</button>
//       <button onClick={() => props.goto("/cat")}>Cat</button>
//       <button onClick={() => props.goto("/dog")}>Dog</button>
//       <button onClick={() => props.goto("/default")}>Default</button>
//     </div>
//   )
// }

// export const Nav = withNavigation(NoNav)

/**
 * withNavigation HOC with class component
 */

// class NoNav extends React.Component {
//   render() {
//     return (
//       <div>
//         <button onClick={() => this.props.goto("/apple")}>Apple</button>
//         <button onClick={() => this.props.goto("/ball")}>Ball</button>
//         <button onClick={() => this.props.goto("/cat")}>Cat</button>
//         <button onClick={() => this.props.goto("/dog")}>Dog</button>
//         <button onClick={() => this.props.goto("/default")}>Default</button>
//       </div>
//     )
//   }
// }

// export const Nav = withNavigation(NoNav)

function App() {
  return (
    <div className="App">
      <Router>
        <Dashboard path="/dashboard" >
          <Chat path="/chat" />
          <Home path="/home" />
        </Dashboard>
        <Login path="/login" />
        <NotFound path="/404" default> </NotFound>
      </Router>
    </div>
  );
}

export default App;
