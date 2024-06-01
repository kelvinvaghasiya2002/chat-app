import React, { useEffect, useState } from 'react'
import { useUserInfo } from '../Contexts/user';

function ContactList({contacts}) {
    return (
        <div>
            {
                contacts.map((item, index) =>
                    <p key={item._id} style={{cursor : "pointer"}}>{item.username}</p>
                )
            }
        </div>
    )
}

export default ContactList