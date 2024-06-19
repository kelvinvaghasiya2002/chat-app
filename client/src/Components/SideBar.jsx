import React from 'react'
import "../Styles/SideBar.css"
import logo from "../assets/diamond.png"

function SideBar() {
  return (
    <section id='SideBar'>
      <img className='logo' src={logo} />
    </section>
  )
}

export default SideBar