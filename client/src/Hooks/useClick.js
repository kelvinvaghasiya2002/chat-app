import { useState } from "react"

const useClick = ()=>{
    const [contactAppear , setContactAppear ] = useState(true);
    const onContactClick = ()=>{
        setContactAppear(!contactAppear);
    }
    return {onContactClick , setContactAppear , contactAppear}
}

export default useClick;