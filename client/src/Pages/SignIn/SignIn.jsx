// import React from 'react'

import axios from "axios";
import { useState } from "react"
import { Link, Navigate } from "react-router-dom";
import { useUserInfo } from "../../Contexts/user.jsx";

function SignIn() {
  const { setUser , isLogged , setLogged} = useUserInfo();
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: ""
  })


  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(loginDetails);
    const url = import.meta.env.VITE_SERVER;
    try {
      const response = await axios.post(`${url}/loginuser` , {
        email : loginDetails.email,
        password : loginDetails.password
      })
      console.log(response.data.user);
      setUser(response.data.user);
      setLogged(true)
      localStorage.setItem("token",response.data.token)
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (event)=>{
    const {name , value} = event.target;
    setLoginDetails((prevValue)=>{
      return ({
        ...prevValue,
        [name] : value
      })
    })
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        value={loginDetails.email}
        placeholder="email"
        type="email"
        onChange={handleChange} />

      <br /><br />

      <input
        name="password"
        value={loginDetails.password}
        placeholder="password"
        type="password"
        onChange={handleChange} />

      <br /><br />


      <button>Sign In</button>

      <br /><br />


      <Link to="/signup" >Sign Up</Link>
      {
        isLogged && <Navigate to="/" replace={true}/>
      }
    </form>
  )
}

export default SignIn