import { createContext, useContext, useState } from "react";

const userContext  = createContext({});

export const useUserInfo = ()=>{
    const userInfo = useContext(userContext);
    return userInfo;
}


export default function UserProvider(props) {
    const [user , setUser] = useState({}) ; 
    const [isLogged , setLogged] = useState(false);
    return (
        <userContext.Provider value ={{user , setUser , isLogged , setLogged}}>
            {props.children}
        </userContext.Provider>
    )
}  