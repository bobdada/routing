import React, { useState, useEffect } from 'react';
import './App.css';

function Router({ children }) {
  const [hash, setHash] = useState(null)

  const hashChange = () => {
    setHash(window.location.hash.replace(/^#\/?|\/$/g, ""))
  }

  useEffect(() => {
    window.addEventListener("hashchange", hashChange)
    return () => {
      window.removeEventListener("hashchange", hashChange)
    }
  }, [])

  let defaultElement = React.Children.toArray(children).find(ele => {
    return ele.props.default === true
  })

  let route = React.Children.toArray(children).find((ele) => {
    return hash === ele.props.path.replace(/(^\/+|\/+$)/g, "")
  })

  return (
    <React.Fragment>
      {route ? route : defaultElement}
    </React.Fragment>
  );
}

export default Router;
