import React from 'react'
import { useUserInfo } from '../Contexts/user';
import accountImg from "../assets/account.png"

function RoomHeader({ room }) {
    // console.log("RoomHeader");
    const { user } = useUserInfo();
    return (
        <section className='room-header-container'>
            <div className='profile-and-contact'>
                <div>
                    <img className='profile' src={accountImg} />
                </div>
                <div>
                    {
                        room?.members[0].email === user.email ? <p className='contact-name'>{room?.members[1].username}</p> : <p className='contact-name'>{room?.members[0].username}</p>
                    }
                    <p className='status'>status</p>
                </div>
            </div>
            <div className='profile-button-container'>
                <button className='profile-button'>Profile</button>
            </div>
        </section>
    )
}

export default RoomHeader