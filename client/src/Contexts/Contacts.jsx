import { createContext, useContext, useState } from "react";


const contactListContext = createContext(null);

export const useContactList = ()=>{
    const contactList = useContext(contactListContext);
    return contactList;
}


const ContactListProvider = (props)=>{
    const [contacts , setContacts] = useState();
    return (
        <contactListContext.Provider value={{contacts , setContacts}}>
            {props.children}
        </contactListContext.Provider>
    )
}


export default ContactListProvider;