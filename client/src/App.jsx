// import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom"
import Home from "./Pages/Home/Home.jsx"
import SignIn from "./Pages/SignIn/SignIn.jsx"
import { useEffect } from "react"
import axios from "axios"
import { useUserInfo } from "./Contexts/user.jsx"
import SignUp from "./Pages/SignUp/SignUp.jsx"
import Room from "./Components/Room.jsx"
import { useContactList } from "./Contexts/Contacts.jsx"
const server = import.meta.env.VITE_SERVER;

function App() {
  const { setUser, isLogged, setLogged } = useUserInfo();
  const { setContacts} = useContactList();
  const token = localStorage.getItem("token")

  useEffect(() => {

    const login = async () => {
      try {
        const response = await axios.get(`${server}/getuser`, {
          headers: {
            token: token
          }
        });
        console.log(response);
        setLogged(response.data.login)
        setUser(response.data.user)
        setContacts(response.data.user.contacts)
      } catch (error) {
        console.log(error.response.data.error);
      }
    }
    if (token) login();
  }, [])

  return (
    <Routes>
      <Route path="/" element={isLogged ? <Home /> : <Navigate to="/signin" replace={true} />} >
        <Route path=":id" element={<Room />} />
      </Route>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  )
}

export default App