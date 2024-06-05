import React, { useState } from 'react'
import { useUserInfo } from '../Contexts/user';
import { useRoomInfo } from '../Contexts/room';
import axios from "axios"
const server = import.meta.env.VITE_SERVER;

function WriteMessage() {
    const { user } = useUserInfo();
    const { room, setRoom } = useRoomInfo();
    const [message, setMessage] = useState("");
    const handleChange = (event) => {
        setMessage(event.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response =  await axios.post(`${server}/savemessage?id=${room._id}`,
                {
                    auther : user.username, 
                    content : message
                }
            );
            setMessage("")
            console.log(response);
            setRoom(response.data.room)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={message}
                    onChange={handleChange}
                    name='message'
                    required
                  />
                <button type='submit'>send</button>
            </form>
        </div>
    )
}

export default WriteMessage