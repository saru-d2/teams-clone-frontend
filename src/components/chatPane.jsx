import React, { useEffect, useRef, useState } from "react";
import axios from 'axios'

import { VariableSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

const Chat = (props) => {
    const [error, setError] = useState([])
    const messagesRef = useRef()
    const msg_input = useRef()
    const dispName = props.dispName
    const roomID = props.roomID
    const socketRed = props.socketRef 

    useEffect(() => {
        getMsgs()
    })

    const getMsgs = () => {
        const reqData = { roomID: roomID }
        axios.post('/getMsg', reqData).then(res => {
            console.log(res.data)
        })
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            //TODO send msg through axios
            const reqData = {
                msg: msg_input.current,
                from: dispName,
                roomID: roomID,
            }
            console.log({ reqData })
            axios.post('/sendMsg', reqData).then(res => {
                console.log(res);
            })
        }
    }

    const onChanegMsg = (e) => {
        console.log(e.target.value)
        // this.setState({msg_input: e.target.value});
        msg_input.current = e.target.value;
    }

    return (
        <div className="chat-pane col">
            <div className='prev-chats'>
                
            </div>
            <div className='chat-input'>
                <input type="text" name="chat-input" id="chat-input" onKeyPress={handleKeyPress} onChange={onChanegMsg} />
            </div>
        </div>
    )
}

export default Chat