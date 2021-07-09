import React, { useEffect, useRef, useState } from "react";
import Room from './vidGrid'
import Chat from './chatPane'
import socketClient from "socket.io-client";
import SERVER from '../config'

const axios = require('axios');


const MainWindow = (props) => {
    const dispName = sessionStorage.getItem('dispName')
    const roomID = props.match.params.roomID


    return (
        <div className='container w-100 h-100 mw-100 mh-100 m-0 p-0  main-window'>
            <div className="row m-0 p-0 h-100 vh-100 ">
                <div className='col-md-9 col-sm-7 col-xs-6 m-0 p-0 h-100'>
                    <Room roomID={roomID} dispName={dispName} />
                </div>
                <div className='col-md-3 col-sm-5 col-xs-6 m-0 p-0'>
                    <Chat dispName={dispName} roomID={roomID} />
                </div>
            </div>
        </div>
    )

}

export default MainWindow;
