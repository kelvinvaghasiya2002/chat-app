import React from 'react'
// import { useUserInfo } from '../Contexts/user';
import "../Styles/ContactList.css"
import Contact from './Contact';
import { useContactList } from '../Contexts/Contacts';

function ContactList({ userEmail , username_1 , onContactClick}) {
    const { contacts } = useContactList();
    // console.log("contactList");
    return (
        <section className='contactlist-container-section'>
            <div className='contactlist-container'>
                {
                    contacts?.map((item) =>
                        <div key={item._id}>
                            <Contact onContactClick={onContactClick} item={item} userEmail={userEmail} username_1={username_1} />
                            <hr style={{ opacity: "0.3" }} />
                        </div>
                    )
                }
            </div>

        </section>
    )
}

export default ContactList