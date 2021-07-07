import React, { useEffect, useRef, useState } from "react";
import Room from './vidGrid'
import Chat from './chatPane'
import socketClient from "socket.io-client";
// const SERVER = 'http://localhost:4000'
const SERVER = 'https://teams-clone-backend-server.herokuapp.com/'
const axios = require('axios');


const MainWindow = (props) => {
    const dispName = sessionStorage.getItem('dispName')
    const roomID = props.match.params.roomID


    return (
        <div className='main-pane row'>
            <Room roomID={roomID} dispName={dispName} />
            <div className='right-pane col'>
                <Chat dispName={dispName} roomID={roomID}/>
            </div>
        </div>
    )
  
}

export default MainWindow;
