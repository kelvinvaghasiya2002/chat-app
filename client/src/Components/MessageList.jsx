import React, { useRef, useEffect } from 'react'
import { useUserInfo } from '../Contexts/user'

function MessageList({ messages }) {
    console.log(messages);
    console.log("messageList");
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
                    const isFirstMessage = index === 0 || message.date !== messages[index - 1]?.date;
                    const isCurrentUser = (user.username === message.auther)?true:false;
                    const isLastMessage = messages[index].auther === messages[index + 1]?.auther;
                    const borderRadiusStyle = {
                        borderRadius: isCurrentUser
                            ? isLastMessage ? "3vh" : "3vh 3vh 0 3vh"
                            : isLastMessage ? "3vh" : "3vh 3vh 3vh 0"
                    };

                    return (
                        <React.Fragment key={message._id}>
                            {
                                (isFirstMessage) && <div className="date" ><p>{message.date}</p></div>
                            }
                            <div style={borderRadiusStyle} className={(isCurrentUser) ? "sent message" : "recieved message"} key={message._id}>
                                <div>

                                    <p>
                                        {message.content}
                                    </p>

                                    <span className='message-time'>{message.time}</span>

                                </div>
                            </div>
                        </React.Fragment>
                    )
                })
            }

        </section>
    )
}

export default MessageList