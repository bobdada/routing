import React, { useState, useEffect } from 'react';

const RouterContext = React.createContext();

function useRouter() {
  const [hash, setHash] = useState(window.location.hash.replace(/^#\/?|\/$/g, ""))

  useEffect(() => {
    hashChange(setHash)
    window.addEventListener("hashchange", () => hashChange(setHash))
    return () => {
      window.removeEventListener("hashchange", () => hashChange(setHash))
    }
  }, [])

  return hash
}

function hashChange(setHash) {
  let hash = window.location.hash.replace(/^#\/?|\/$/g, "")
  let newHash = hash.split("/")
  setHash(newHash[0])
}

function Router({ children }) {

  const hash = useRouter(hashChange)

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

  return (
    <React.Fragment>
      <RouterContext.Provider value={{ goto }}>
        {React.cloneElement(render, { ...render.props, goto })}
      </RouterContext.Provider>
    </React.Fragment>
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