import React, { useEffect, useRef, useState } from "react";
import Room from './vidGrid'
const axios = require('axios');


const MainWindow = (props) => {
    const dispName = sessionStorage.getItem('dispName')
    const roomID = props.match.params.roomID

    return (
        <div className='main-pane row'>
            <div className='left-pane col'>
            <Room roomID={roomID} dispName/>
            <div className='row controls'> controls</div>
            </div>
            <div className='right-pane col'>
                <h2>chat</h2>
            </div>
        </div>
    )
}

export default MainWindow;