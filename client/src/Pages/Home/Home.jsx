import React, { useEffect, useMemo, useState } from 'react'
import { io } from "socket.io-client"
import { useUserInfo } from '../../Contexts/user';
import ContactList from '../../Components/ContactList.jsx';
import AddContact from '../../Components/AddContact.jsx';
import { Outlet } from 'react-router-dom';
import RoomProvider from '../../Contexts/room.jsx';
import "./Home.css"
import Header from '../../Components/Header.jsx';
import useClick from '../../Hooks/useClick.js';

const server = import.meta.env.VITE_SERVER;
var socket;


function Home() {
  const { user } = useUserInfo();
  // const {onContactClick , setContactAppear , contactAppear} = useClick();
  const [contactAppear , setContactAppear] = useState(true)
  const onContactClick = ()=>{
    console.log("fuck it" + " " + contactAppear);
    setContactAppear(!contactAppear);
}
  socket = useMemo(() => io(server), [])
  console.log("Home.jsx");
  const [addContactState, setAddContactState] = useState(false)

  useEffect(() => {
    socket.on("connect", () => {
      console.log(`${socket.id} connected`);
      socket.emit("send-email", user.email);
    })

    return () => {
      socket.disconnect();
    }
  }, [])


  const changeAddContactState = () => {
    setAddContactState(!addContactState);
  }


  return (
    <RoomProvider>

      <div className='container'>
        <div id='Contact-List' className={contactAppear ? 'contact-list' : ' contact-list Contact-List-none'}>

          <Header changeState={changeAddContactState} />
          <AddContact state={addContactState} />

          <ContactList onContactClick={onContactClick} userEmail={user.email} username_1={user.username} />
        </div>

        <div className='chat-window'>
          <Outlet context={[onContactClick]} />
        </div>


      </div>

      {/* <h1>Heldscsv</h1>
      <h1>Heldscsv</h1>
      <h1>Heldscsv</h1>
      <h1>Heldscsv</h1>
      <h1>Heldscsv</h1> */}

    </RoomProvider>
  )
}

export { socket }
export default Home