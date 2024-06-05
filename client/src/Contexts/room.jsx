import { createContext, useContext, useState } from "react";


const roomContext = createContext({});

export const useRoomInfo = ()=>{
    const roomInfo = useContext(roomContext);
    return roomInfo;
}



export default function RoomProvider({ children }) {
    const [room, setRoom] = useState(null);
    return (
        <roomContext.Provider value={{ room, setRoom }}>
            {children}
        </roomContext.Provider>
    )
}