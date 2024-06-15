import { useState } from 'react'
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { useUserInfo } from '../../Contexts/user';
import GoogleSI from '../SignIn/GoogleSI';

function SignUp() {
  const { user, setUser, isLogged, setLogged } = useUserInfo();
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
    username: "",
    confirmPassword: ""
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(loginDetails);
    const url = import.meta.env.VITE_SERVER;
    try {
      const response = await axios.post(`${url}/adduser`, {
        email: loginDetails.email,
        password: loginDetails.password,
        socketId: "",
        username: loginDetails.username
      })
      console.log(response.data.user);
      setUser(response.data.user);
      setLogged(true)
      localStorage.setItem("token", response.data.token)
    } catch (error) {
      console.log(error.response.data.error);
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
      <div className="sign-in-container" style={{maxHeight:"80vh" ,padding : "5vh 8vh"}}>
        <div style={{ width: "90%" }}>
          <form onSubmit={handleSubmit}>
            <div>
              <h3>
                Create Account
              </h3>
              <span>Use valid email to sign up.</span>
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
                name="username"
                value={loginDetails.username}
                placeholder="kelvin_vaghasiya"
                type="text"
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

            <div className="input-div">
              <input
                name="confirmPassword"
                value={loginDetails.confirmPassword}
                placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
                type="password"
                onChange={handleChange} />
            </div>

            <button className="signin-button"><p>Sign up</p></button>
            <br /><br />

          </form>

          <GoogleSI />

          <div className="dont-have-account">
            <span>Already have an account ?</span> <Link to="/signin" >Sign In</Link>
          </div>

          {
            isLogged && <Navigate to="/" replace={true} />
          }

        </div>
      </div>
    </div>

  )

}

export default SignUp