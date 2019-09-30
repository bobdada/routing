import React, { useState, useEffect } from 'react';

const RouterContext = React.createContext();


function Router({ children }) {


  const [hash, setHash] = useState(window.location.hash.replace(/^#\/?|\/$/g, ""))

  useEffect(() => {
    console.log('router')
    hashChange(setHash)
    window.addEventListener("hashchange", () => {
      hashChange(setHash)
    })
    return () => {
      window.removeEventListener("hashchange", () => hashChange(setHash))
    }
  }, [])

  function hashChange(setHash) {
    console.log(hash)
    setHash(window.location.hash.replace(/^#\/?|\/$/g, ""))
  }


  let defaultElement = React.Children.toArray(children).find(ele => {
    return ele.props.default === true
  })

  let route = React.Children.toArray(children).find((ele) => {
    return hash === ele.props.path.replace(/(^\/+|\/+$)/g, "")
  })

  let render = route ? route : defaultElement
  console.log(render)


  const goto = (hash) => {
    window.location.hash = hash

  }



  return (
    <React.Fragment>
      <RouterContext.Provider value={{ goto }}>
        {React.cloneElement(render, { ...render.props, goto }, render.props.children)}
      </RouterContext.Provider>
    </React.Fragment >
  );
}

export default Router;

export function useNavigation() {
  const context = React.useContext(RouterContext)
  return { goto: context.goto }
}

export const withNavigation = (Child) => {
  return class extends React.Component {
    render() {
      return (
        <RouterContext.Consumer>
          {
            ({ goto }) => (
              <Child goto={goto} />
            )
          }
        </RouterContext.Consumer>
      )
    }
  }
}