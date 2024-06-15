// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import UserProvider from './Contexts/user.jsx';
import ContactListProvider from './Contexts/Contacts.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
    <ContactListProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ContactListProvider>
  </UserProvider>
)
