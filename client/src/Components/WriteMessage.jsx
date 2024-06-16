import React, { useState } from 'react'
import { useUserInfo } from '../Contexts/user';
import { useRoomInfo } from '../Contexts/room';
import axios from "axios"
const server = import.meta.env.VITE_SERVER;
import sendIcon from "../assets/send.png"
import { useContactList } from '../Contexts/Contacts';

function WriteMessage() {
    // console.log("writeMessage");
    const { user } = useUserInfo();
    const { setContacts } = useContactList();
    const { room, setRoom } = useRoomInfo();
    const [message, setMessage] = useState("");
    const handleChange = (event) => {
        setMessage(event.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const time = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;

        var currentDate = new Date();

        var day = currentDate.getDate();
        var month = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month (0-11)
        var year = currentDate.getFullYear();

        var formattedDay = day < 10 ? '0' + day : day;
        var formattedMonth = month < 10 ? '0' + month : month;

        var date = formattedDay + ' ' + formattedMonth + ' ' + year;
        console.log(date);

        console.log(time);
        try {
            const response = await axios.post(`${server}/savemessage?id=${room._id}`,
                {
                    auther: user.username,
                    content: message,
                    user: user.email,
                    time: time,
                    date : date
                }
            );
            setMessage("")
            console.log(response);
            setRoom(response.data.room);
            setContacts(response.data.contactList)
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