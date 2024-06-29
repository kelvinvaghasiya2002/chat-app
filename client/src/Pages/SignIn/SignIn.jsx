// import React from 'react'
import "./SignIn.css"
import axios from "axios";
import { useState } from "react"
import { Link, Navigate } from "react-router-dom";
import { useUserInfo } from "../../Contexts/user.jsx";
import { useContactList } from "../../Contexts/Contacts.jsx";
import GoogleSI from "./GoogleSI.jsx";

function SignIn() {
  const { setUser, isLogged, setLogged } = useUserInfo();
  const { setContacts } = useContactList();
  const [loading, setLoading] = useState(false)
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: ""
  })


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(loginDetails);
    const url = import.meta.env.VITE_SERVER;
    setLoading(true);
    try {
      const response = await axios.post(`${url}/loginuser`, {
        email: loginDetails.email,
        password: loginDetails.password
      })
      console.log(response.data.user);
      alert(response.data.success)
      setUser(response.data.user);
      setLogged(true)
      setContacts(response.data.user.contacts)
      setLoading(false)
      localStorage.setItem("token", response.data.token)
    } catch (error) {
      console.log(error);
      alert(error.response.data.error)
      setLoading(false)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginDetails((prevValue) => {
      return ({
        ...prevValue,
        [name]: value
      })
    })
  }

  return (
    <div id="sign-in">
      <div className="sign-in-container">
        <div style={{ width: "90%" }}>
          <form onSubmit={handleSubmit}>
            <div>
              <h3>
                Welcome Back!
              </h3>
              <span>Use your credencials to log in.</span>
            </div>
            <div className="input-div">
              <input
                name="email"
                value={loginDetails.email}
                placeholder="example@gmail.com"
                type="email"
                onChange={handleChange} />
            </div>

            <div className="input-div">
              <input
                name="password"
                value={loginDetails.password}
                placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
                type="password"
                onChange={handleChange} />
            </div>



            <button className="signin-button">
              {
                loading ? <p>Loading . . .</p> : <p>Sign In</p>
              }

            </button>

            <br /><br />
          </form>

          <GoogleSI />

          <div className="dont-have-account">
            <span>Don't have an account ?</span> <Link to="/signup" >Sign Up</Link>
          </div>

        </div>
        {
          isLogged && <Navigate to="/" replace={true} />
        }
      </div>
    </div>
  )
}

export default SignIn