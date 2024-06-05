import React, { useEffect, useState } from 'react'
import { useUserInfo } from '../Contexts/user';
import axios from "axios"
import { useRoomInfo } from '../Contexts/room';
import { useNavigate } from 'react-router-dom';
import { socket } from '../Pages/Home/Home';
const server = import.meta.env.VITE_SERVER;

function ContactList({ contacts }) {
    const { user } = useUserInfo();
    const navigate = useNavigate();
    const { room, setRoom } = useRoomInfo();
    console.log(room);

    const handleContact = async (item) => {
        console.log(item);
        try {
            const response = await axios.post(`${server}/getroom`, {
                user_1: user.email,
                user_2: item.email
            })
            // console.log(response);
            setRoom(response.data.room);
            socket.emit("join-room",response.data.room._id);
            navigate(`/${response.data.room._id}`)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            {
                contacts.map((item) =>
                    <p onClick={() => {
                        handleContact(item)
                    }} key={item._id} style={{ cursor: "pointer" }}>{item.username}</p>
                )
            }
        </div>
    )
}

export default ContactList