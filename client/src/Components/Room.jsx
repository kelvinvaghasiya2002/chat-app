import React, { useEffect } from 'react'
import  { useRoomInfo } from '../Contexts/room';
import "../Styles/Room.css"
import MessageList from './MessageList';
import WriteMessage from './WriteMessage';
import { useOutletContext, useParams } from 'react-router-dom';
import axios from 'axios';
import { socket } from '../Pages/Home/Home.jsx';
import RoomHeader from './RoomHeader.jsx';
import useClick from '../Hooks/useClick.js';

const server = import.meta.env.VITE_SERVER;

function Room() {
    const { room, setRoom } = useRoomInfo();
    // const {onContactClick} = useClick();
    // console.log("room");
    const [onContactClick] = useOutletContext();
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

        return ()=>{
            onContactClick();
        }
    }, [])
    

    socket.on("update-room", (Room) => {
        console.log(room.members  , Room.members);
        setRoom(Room);
    })

    return (
        <div className='slide-in-right'>
            <RoomHeader room={room} />


            <MessageList messages={room?.messages} />

            <WriteMessage />


        </div>
    )
}

export default Room