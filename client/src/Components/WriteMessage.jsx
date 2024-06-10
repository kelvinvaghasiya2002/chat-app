import React, { useState } from 'react'
import { useUserInfo } from '../Contexts/user';
import { useRoomInfo } from '../Contexts/room';
import axios from "axios"
const server = import.meta.env.VITE_SERVER;
import sendIcon from "../assets/send.png"

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
            const response = await axios.post(`${server}/savemessage?id=${room._id}`,
                {
                    auther: user.username,
                    content: message
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
        <section id='writeMessage' className='message-container'>
            <form className='writeMessageForm' onSubmit={handleSubmit}>
                <div className='writeMessageInput'>
                    <input
                        type='text'
                        value={message}
                        onChange={handleChange}
                        name='message'
                        placeholder='write a message...'
                        required
                        autoComplete='off'
                    />
                </div>
                <div className='send-icon-div'>
                    <button type='submit'><img className='send-icon' src={sendIcon} /></button>
                </div>
            </form>
        </section>
    )
}

export default WriteMessage