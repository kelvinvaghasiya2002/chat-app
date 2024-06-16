import { useState } from "react"

const useClick = ()=>{
    const [contactAppear , setContactAppear ] = useState(true);
    const onContactClick = ()=>{
        console.log("fuck it" + " " + contactAppear);
        setContactAppear(!contactAppear);
    }
    return {onContactClick , setContactAppear , contactAppear}
}

export default useClick;