// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import UserProvider from './Contexts/user.jsx';
import SocketProvider from './Contexts/socket.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
    <SocketProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SocketProvider>
  </UserProvider>
)
