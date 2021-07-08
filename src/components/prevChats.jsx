import React, { useEffect, useRef, useState } from "react";


const PrevChats = (props) => {
    const messages = props.messages;

    return (
        <ul className='message-list w-100' >
            {messages.map(msg => {
                return <li><div className='msg '>{msg.from}:<br /> {msg.msg}<br /></div><br /></li>
            })}

        </ul>
    )
}

export default PrevChats;