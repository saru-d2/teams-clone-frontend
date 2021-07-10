import React, { useEffect, useRef, useState} from "react";
import Switch from '@material-ui/core/Switch' 
import { Mic, Videocam } from '@material-ui/icons'
const axios = require('axios');


const Landing = (props) => {
    const [formData, setForm] = useState({})
    
    function onChange(e) {
        var temp = formData;
        temp[e.target.id] = e.target.value;
        setForm(temp);
    }


    function onJoinRoom() {
        console.log(formData)
        if (formData['display-name'] == null ||
            formData['roomID'] == null) {
            alert('fill in the roomID and display name')
            return
        }
        var reqData = {
            dispName: formData['display-name'],
            roomID: formData['roomID'],
        }
        console.log({ req: reqData });

        axios.post('/joinRoom', reqData).then(res => {
            console.log(res)
            //TODO redirect to room
            if (res.data.room_exists == false) {
                alert('room does not exist');
                return
            }
            else {
                props.history.push(`/${reqData.roomID}`);
            }
        })
        //store in browser stortage// might need to change
        sessionStorage.setItem('dispName', reqData.dispName)

    }

    function onCreateRoom() {
        console.log('create room');
        if (formData['display-name'] == null ||
            formData['roomID'] == null) {
            alert('fill in the roomID and display name')
            return
        }
        var reqData = {
            dispName: formData['display-name'],
            roomID: formData['roomID'],
        }
        console.log({ req: reqData });

        axios.post('/createRoom', reqData).then(res => {
            console.log(res)
            //TODO redirect to room
            if (res.data.room_exists == true) {
                alert('room already exists');
                return
            } else {
                props.history.push(`/${reqData.roomID}`);
            }
        })
        //store in browser stortage// might need to change
        sessionStorage.setItem('dispName', reqData.dispName)
    }

    return (
        <div className='container  mt-5 '>
            <h1 className="big-text text-center logo-color mb-0"><b>TeamsLite</b></h1>
            <div className='rounded-corners'>
                <input type="text" required id='display-name' onChange={onChange} placeholder='displayName' className="form-control" />
            </div>
            <br />
            <div className='column text-center'>
                <input type="text" id='roomID' onChange={onChange} placeholder='roomID' className="form-control"/> <br/>
                <button className="blue shadow-move btn mx-md-2 my-2 my-md-0" onClick={onCreateRoom}>create new room</button>
                <button className="red shadow-move btn  mx-md-2 my-2 my-md-0" onClick={onJoinRoom}>join room</button>
            </div>
            
        </div>
    )
}
export default Landing