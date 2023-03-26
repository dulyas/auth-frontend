import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import Store from './store/store'

const store = new Store()

interface State {
  store: Store
}

export const Context = createContext<State>({
  store
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <Context.Provider value={{
      store
    }}>
        <App />
    </Context.Provider>
  // </React.StrictMode>,
)
