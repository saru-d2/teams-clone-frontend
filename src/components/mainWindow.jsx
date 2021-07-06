import React, { useEffect, useRef, useState } from "react";
import Room from './vidGrid'
import Chat from './chatPane'
import socketClient from "socket.io-client";
const axios = require('axios');

const SERVER = 'http://localhost:4000'

const MainWindow = (props) => {
    const dispName = sessionStorage.getItem('dispName')
    const roomID = props.match.params.roomID
    const socketRef = useRef(null);

    useEffect(()=>{
        socketRef.current = socketClient(SERVER);
    })
    
    return (
        <div className='main-pane row'>
            <div className='left-pane col'>
            <Room roomID={roomID} dispName={dispName} socketRef={socketRef}/>
            <div className='row controls'> controls </div>
            </div>
            <div className='right-pane col'>
                <h2>chat</h2>
                <Chat dispName={dispName} roomID={roomID}/>
            </div>
        </div>
    )
}

export default MainWindow;
