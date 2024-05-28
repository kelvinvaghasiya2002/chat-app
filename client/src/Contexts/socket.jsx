import { createContext, useContext, useState } from "react";


const SocketContext = createContext({});

export const useSocketInfo = () => {
    const socket = useContext(SocketContext);
    return socket;
}


export default function SocketProvider(props) {
    const [socketContext, setSocketContext] = useState({})
    return (
        <SocketContext.Provider value={{ socketContext, setSocketContext }}>
            {props.children}
        </SocketContext.Provider>
    )
}


