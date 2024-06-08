import React, { useEffect, useState } from 'react'
import { useUserInfo } from '../Contexts/user';
import axios from "axios"
import accountImg from "../assets/account.png"
import { useRoomInfo } from '../Contexts/room';
import { useNavigate } from 'react-router-dom';
import { socket } from '../Pages/Home/Home';
import "../Styles/ContactList.css"
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
            setRoom(response.data.room);
            socket.emit("join-room", response.data.room._id);
            navigate(`/${response.data.room._id}`)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <section className='contactlist-container-section'>
            <div className='contactlist-container'>
                {
                    contacts.map((item) =>
                        <div key={item._id}>
                            <div onClick={() => { handleContact(item) }} className='contactlict-member'>
                                <div>
                                    <img className='profile-icon' src={accountImg} />
                                </div>
                                <div>
                                    <p className='contact-name'>{item.username}</p>
                                    <p className='last-message'>last message</p>
                                </div>

                            </div>
                            <hr style={{ opacity: "0.3" }} />
                        </div>
                    )
                }
            </div>

        </section>
    )
}

export default ContactList