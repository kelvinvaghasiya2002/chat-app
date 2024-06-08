import React from 'react'
import "../Styles/Header.css"
import plus from "../assets/plus.png"

function Header({changeState}) {
  return (
    <section className='header-container'>
        <h2 className='header-chat'>Chat</h2>
        <div className='AddContactButton-container'>
            <img onClick={changeState} className='AddContactButton' src={plus} />
        </div>
    </section>
  )
}

export default Header