import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { PetsContextProvider } from './contexts/PetsContext.jsx'
import { AppointmentsContextProvider } from './contexts/AppointmentsContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <BrowserRouter>
    <PetsContextProvider>
      <AppointmentsContextProvider>
        <App />
      </AppointmentsContextProvider>
    </PetsContextProvider>
  </BrowserRouter>
  // </React.StrictMode>,
)
