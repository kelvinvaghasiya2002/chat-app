import React from 'react'
import "../Styles/Header.css"
import plus from "../assets/plus.png"
import MenuIcon from '@mui/icons-material/Menu';

function Header({ changeState }) {
  return (
    <section className='header-container'>
      <div style={{ display: "flex", gap: "5vw" }}>
        <div className='hamburger'>
          <MenuIcon />
        </div>
        <h2 className='header-chat'>Chat</h2>
      </div>
      <div className='AddContactButton-container'>
        <img onClick={changeState} className='AddContactButton' src={plus} />
      </div>
    </section>
  )
}

export default Header