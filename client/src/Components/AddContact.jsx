import React, { useState } from 'react'
import axios from 'axios';
import { useUserInfo } from '../Contexts/user.jsx'
import { socket } from '../Pages/Home/Home.jsx';
const server = import.meta.env.VITE_SERVER;

function AddContact() {
    const { user, setUser } = useUserInfo();
    const [email, setEmail] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.post(`${server}/addcontact`, {
            user_1: user.email,
            username_1: user.username,
            user_2: email
        })
        console.log(response);
        setUser(response.data.user);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    socket.on("from-user", (user) => {
        setUser(user)
      })

    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder='enter a email'
                value={email}
                name='email'
                onChange={handleEmailChange}
            />
            <button type='submit'>Add</button>
        </form>
    )
}

export default AddContact