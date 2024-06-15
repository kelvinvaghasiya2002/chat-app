import React, { useEffect, useState } from 'react'
import { useRoomInfo } from '../Contexts/room';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import accountImg from "../assets/account.png"
const server = import.meta.env.VITE_SERVER;
import { socket } from '../Pages/Home/Home';
import { useContactList } from '../Contexts/Contacts';

function Contact({ item, userEmail, username_1 }) {
    const navigate = useNavigate();
    const {setContacts} = useContactList();
    const { setRoom } = useRoomInfo();
    const handleContact = async (item) => {
        console.log(item);
        try {
            const response = await axios.post(`${server}/getroom`, {
                user_1: userEmail,
                user_2: item.email,
                username_2: item.username,
                username_1: username_1
            })
            console.log(response);
            setRoom(response.data.room);
            socket.emit("join-room", response.data.room._id);
            navigate(`/${response.data.room._id}`)
        } catch (error) {
            console.log(error);
        }
    }

    socket.on("update-contactList",(data)=>{
        console.log(data);
        setContacts(data)
    })
    return (
        <div onClick={() => { handleContact(item) }} className='contactlict-member'>
            <div>
                <img className='profile-icon' src={accountImg} />
            </div>
            <div style={{ width: "100%" }}>
                <div className='contact-name-div'>

                    <p className='contact-name'>{item.username}</p>

                    <span className='message-time-contactList'>{item.lastMessage?.time}</span>

                </div>

                <div className='contact-name-div'>

                    <p className='last-message'>{item.lastMessage?.content}</p>

                    {/* <span className='message-time-contactList pending-msg'>2</span> */}

                </div>
            </div>

        </div>
    )
}

export default Contact