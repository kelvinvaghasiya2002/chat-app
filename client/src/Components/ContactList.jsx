import React from 'react'
// import { useUserInfo } from '../Contexts/user';
import "../Styles/ContactList.css"
import Contact from './Contact';

function ContactList({ contacts, userEmail , username_1 }) {
    
    return (
        <section className='contactlist-container-section'>
            <div className='contactlist-container'>
                {
                    contacts.map((item) =>
                        <div key={item._id}>
                            <Contact item={item} userEmail={userEmail} username_1={username_1} />
                            <hr style={{ opacity: "0.3" }} />
                        </div>
                    )
                }
            </div>

        </section>
    )
}

export default ContactList