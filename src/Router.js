import React, { useState, useEffect } from 'react';

const RouterContext = React.createContext();


function Router({ children, location, log }) {
  console.log(location)

  const [hash, setHash] = useState(location ? location.join() : window.location.hash.replace(/^#\/?|\/$/g, ""))

  useEffect(() => {
    console.log('router')
    hashChange(setHash)
    window.addEventListener("hashchange", () => hashChange(setHash))
    return () => {
      window.removeEventListener("hashchange", () => hashChange(setHash))
    }
  }, [])

  function hashChange() {
    let hash = window.location.hash.replace(/^#\/?|\/$/g, "")
    let newHash = hash.split("/")
    log && console.log(hash)
    setHash(location ? location.join() : newHash[0])
  }


  let defaultElement = React.Children.toArray(children).find(ele => {
    return ele.props.default === true
  })

  let route = React.Children.toArray(children).find((ele) => {
    return hash === ele.props.path.replace(/(^\/+|\/+$)/g, "")
  })

  let render = route ? route : defaultElement


  const goto = (hash) => {
    window.location.hash = hash
  }

  log && console.log(hash, location)

  let newHash = hash.split("/")
  console.log(newHash)
  let childHash = newHash.splice(1, newHash.length)

  console.log(childHash)

  return (
    <React.Fragment>
      <RouterContext.Provider value={{ goto }}>

        {render ? React.cloneElement(render, { ...render.props, goto }, render.props.children ? <Router log={true} location={childHash.join()}>{render.props.children}</Router  > : render.props.children) : null}
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