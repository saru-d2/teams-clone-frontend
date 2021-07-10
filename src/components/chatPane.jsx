import React, { useEffect, useRef, useState } from "react";
import axios from 'axios'
import socket from '../helpers/socketConfig'

function scrollToBottom() {
    //scrolls to the bottom
    console.log('scroll')
    const msg_list = document.getElementById('msg-list')
    console.log(msg_list)
    msg_list.scrollTo(0, msg_list.scrollHeight - msg_list.clientHeight)
}

const PrevChats = (props) => {
    // component to assemble the messages as a ul
    const messages = props.messages;
    return (
        <ul className='message-list w-100' >
            {messages.map(msg => {
                return <li><div className='msg '><b>{msg.from}:</b><br /> {msg.msg}<br /></div><br /></li>
            })}
        </ul>
    )
}

const Chat = (props) => {
    const [messages, setMesssages] = useState([])
    const [msg_input, setMsg] = useState('')
    const dispName = props.dispName
    const roomID = props.roomID

    useEffect(() => {
        scrollToBottom()
        getMsgs()
        socket.on('msg-sent', (Data) => {
            console.log('new-messages');
            console.log(Data)
            setMesssages(Data)
            scrollToBottom()
        })
    }, [])

    const getMsgs = () => {
        const reqData = { roomID: roomID }
        console.log('getmsgs')
        axios.post('/getMsg', reqData).then(res => {
            setMesssages(res.data.msg_list)
            scrollToBottom()
        })
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            if (msg_input.length > 0) {
                const reqData = {
                    msg: msg_input,
                    from: dispName,
                    roomID: roomID,
                }
                console.log({ reqData })
                socket.emit('new-msg', (reqData));
                setMsg('')
                var chat_input = document.getElementById('chat-input');
                // clearing the input field
                chat_input.value = ''
            }
        }
    }

    const onChanegMsg = (e) => {
        setMsg(e.target.value);
    }

    return (
        <div className="container m-0 p-0">
            <div className='h-90 prev-chats row m-0 p-0 ' id='msg-list'>
                <PrevChats messages={messages} />
            </div>
            <div className='h-5 chat-input row m-1' >
                <input type="text" className="form-control chat-input" name="chat-input" id="chat-input" onKeyPress={handleKeyPress} onChange={onChanegMsg} id='chat-input' />
            </div>
        </div>
    )
}

export default Chat