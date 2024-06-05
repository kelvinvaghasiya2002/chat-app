import React from 'react'

function MessageList({messages}) {
    return (
        <div>
            {
                messages?.map((message, index) => {
                    return <p key={message._id}>{message.auther} : {message.content}</p>
                })
            }
        </div>
    )
}

export default MessageList