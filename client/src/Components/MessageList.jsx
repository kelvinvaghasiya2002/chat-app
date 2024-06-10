import React, { useRef , useEffect } from 'react'
import { useUserInfo } from '../Contexts/user'

function MessageList({ messages }) {
    const { user } = useUserInfo();
    const messageListRef = useRef(null)
    
    useEffect(() => {
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <section id='messageContainer' ref={messageListRef} className='message-container'>

            {
                messages?.map((message, index) => {
                    return (
                        (user.username === message.auther) ?
                            <div
                                key={message._id}
                                className='message sent'
                                style=
                                {
                                    {
                                        borderRadius: (messages[index].auther === messages[index + 1]?.auther) ? "3vh"
                                            :
                                            "3vh 3vh 0 3vh"
                                    }
                                }>

                                <p style={{display : "inline"}}>
                                {message.content}   
                                </p>
                                <span className='message-time'> 15:42</span>
                            </div>
                            :
                            <div
                                key={message._id}
                                className='message recieved'
                                style=
                                {
                                    {
                                        borderRadius: (messages[index].auther === messages[index + 1]?.auther) ? "3vh"
                                            :
                                            "3vh 3vh 3vh 0"
                                    }
                                }>

                                <p> {message.content}</p>
                                <span className='message-time'> 15:42</span>
                            </div>
                    )
                })
            }

        </section>
    )
}

export default MessageList