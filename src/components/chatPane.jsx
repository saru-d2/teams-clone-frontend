import React, { useEffect, useRef, useState } from "react";
import axios from 'axios'
import socket from '../helpers/socketConfig'
import { VariableSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import PrevChats from "./prevChats";
import { animateScroll } from "react-scroll";

function scrollToBottom() {
    console.log('scroll')
    const msg_list = document.getElementById('msg-list')
    console.log(msg_list)
    msg_list.scrollTo(0, msg_list.scrollHeight - msg_list.clientHeight)
}

const Chat = (props) => {
    const [error, setError] = useState([])
    const [messages, setMesssages] = useState([])
    const [msg_input, setMsg] = useState('')
    const dispName = props.dispName
    const roomID = props.roomID



    useEffect(() => {
        scrollToBottom()
        getMsgs()
        socket.on('msg-sent', () => {
            console.log('new-messages');
            getMsgs();
        })
        scrollToBottom()

    }, [])

    const getMsgs = () => {
        const reqData = { roomID: roomID }
        console.log('getmsgs')
        axios.post('/getMsg', reqData).then(res => {
            setMesssages(res.data.msg_list)
        })
        scrollToBottom()
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            //TODO send msg through axios
            getMsgs()
            socket.emit('new-msg', (roomID));

            if (msg_input.length > 0) {
                const reqData = {
                    msg: msg_input,
                    from: dispName,
                    roomID: roomID,
                }
                console.log({ reqData })
                axios.post('/sendMsg', reqData).then(res => {
                    // console.log(res);
                })
                socket.emit('new-msg', (roomID));
                setMsg('')
                var chat_input = document.getElementById('chat-input');
                chat_input.value = ''
            }
        }
        if (e.key == '1') {
            getMsgs()
            socket.emit('new-msg', (roomID));

        }
    }

    const onChanegMsg = (e) => {
        setMsg(e.target.value);
    }

    return (
        <div className="chat-pane col">
            <div className='prev-chats' id='msg-list'>
                <PrevChats messages={messages} />
            </div>
            <div className='chat-input' >
                <input type="text" name="chat-input" id="chat-input" onKeyPress={handleKeyPress} onChange={onChanegMsg} id='chat-input' />
            </div>
        </div>
    )
}

export default Chat