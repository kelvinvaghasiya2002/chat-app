// import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from "./Pages/Home/Home.jsx"
import SignIn from "./Pages/SignIn/SignIn.jsx"
import { useEffect } from "react"
import axios from "axios"
import { useUserInfo } from "./Contexts/user.jsx"
import SignUp from "./Pages/SignUp/SignUp.jsx"
import {io} from "socket.io-client"

function App() {
  const { user, setUser, isLogged, setLogged } = useUserInfo();
  const token = localStorage.getItem("token")

  useEffect(() => {
    const login = async () => {
      try {
        const response = await axios.get('http://localhost:3000/getuser', {
          headers: {
            token: token
          }
        });
        // console.log(response);
        setLogged(response.data.login)
        setUser(response.data.user)
      } catch (error) {
        console.log(error.response.data.error);
      }
    }
    if (token) login();
  },[])

  // useEffect(()=>{
  //   const server = import.meta.env.VITE_SERVER;
  //   const socket = io(server)
  //   socket.on("connect",()=>{
  //     console.log(`${socket.id} connected`);
  //   })
  //   socket.on("welcome",(m)=>{
  //     console.log(m);
  //   })

  //   socket.on("joined-msg",(m)=>{
  //     console.log(m);
  //   })

  //   return ()=>{
  //     socket.disconnect();
  //   }
  // })

  return (
    <Routes>
      <Route path="/" element={isLogged ? <Home /> : <SignIn />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  )
}

export default App