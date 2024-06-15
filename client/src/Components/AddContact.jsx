import React, { useState } from 'react'
import axios from 'axios';
import { useUserInfo } from '../Contexts/user.jsx'
import { socket } from '../Pages/Home/Home.jsx';
import { useContactList } from '../Contexts/Contacts.jsx';
const server = import.meta.env.VITE_SERVER;

function AddContact({ state }) {
    const { user, setUser } = useUserInfo();
    const {setContacts} = useContactList();
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
        setContacts(response.data.user.contacts)
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    socket.on("from-user", (user) => {
        console.log(user);
        setUser(user)
        setContacts(user.contacts);
    })

    return (
        <div style={{display : state ? "block" : "none"}}>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder='enter a email'
                    value={email}
                    name='email'
                    onChange={handleEmailChange}
                />
                <button type='submit'>Add</button>
            </form>
        </div>
    )
}

export default AddContact