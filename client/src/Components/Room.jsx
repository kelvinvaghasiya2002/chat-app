import React, { useEffect, useState } from 'react'
import RoomProvider, { useRoomInfo } from '../Contexts/room';
import { useUserInfo } from '../Contexts/user';
import "../Styles/Room.css"
import MessageList from './MessageList';
import WriteMessage from './WriteMessage';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { socket } from '../Pages/Home/Home.jsx';
import RoomHeader from './RoomHeader.jsx';

const server = import.meta.env.VITE_SERVER;

function Room() {
    const { room, setRoom } = useRoomInfo();

    const { id } = useParams();
    useEffect(() => {
        const getRoom = async () => {
            try {
                const response = await axios.get(`${server}/getroom?id=${id}`);
                setRoom(response.data.room)
                socket.emit("join-room", response.data.room._id);
            } catch (error) {
                console.log(error);
            }
        }
        getRoom();
    }, [])

    socket.on("update-room", (room) => {
        setRoom(room);
    })

    return (
        <div>
            <RoomHeader room={room} />


            <MessageList messages={room?.messages} />

            <WriteMessage />


        </div>
    )
}

export default Room