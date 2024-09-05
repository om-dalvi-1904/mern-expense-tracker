import React from 'react'
import ReactDOM from 'react-dom/client'
import {Provider} from 'react-redux'
import App from './App.jsx'
import './index.css'
import { store } from './redux/store/store.js'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'

let client = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>  {/* for react redux */}
      <QueryClientProvider client={client}> {/* for react query */}
        <App/>
        <ReactQueryDevtools initialIsOpen={false}/>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
)
