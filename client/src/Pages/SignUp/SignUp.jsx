import { useState } from 'react'
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { useUserInfo } from '../../Contexts/user';

function SignUp() {
  const {user , setUser , isLogged , setLogged} = useUserInfo();
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
    username : ""
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(loginDetails);
    const url = import.meta.env.VITE_SERVER;
    try {
      const response = await axios.post(`${url}/adduser`, {
        email: loginDetails.email,
        password: loginDetails.password,
        socketId : "",
        username:loginDetails.username
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
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        value={loginDetails.email}
        placeholder="email"
        type="email"
        onChange={handleChange} />

      <br /><br />

      <input
        name="username"
        value={loginDetails.username}
        placeholder="username"
        type="text"
        onChange={handleChange} />

      <br /><br />

      <input
        name="password"
        value={loginDetails.password}
        placeholder="password"
        type="password"
        onChange={handleChange} />

      <br /><br />


      <button>Sign up</button>

      <br /><br />
      <Link to="/signin" >Sign In</Link>
      {
        isLogged && <Navigate to="/" replace={true}/>
      }
    </form>
  )

}

export default SignUp