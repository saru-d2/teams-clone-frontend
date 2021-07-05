import React, { Component } from "react";
const axios = require('axios');


export default class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            formData: {}
        }
        this.onChange = this.onChange.bind(this)
        this.onJoinRoom = this.onJoinRoom.bind(this)
        this.onCreateRoom = this.onCreateRoom.bind(this)
    }

    onChange(e) {
        var temp = this.state.formData;
        temp[e.target.id] = e.target.value;
        this.setState({ formData: temp });
    }

    onJoinRoom() {
        if (this.state.formData['display-name'] == null ||
            this.state.formData['roomID'] == null) {
            alert('fill in the roomID and display name')
            return
        }
        var reqData = {
            dispName: this.state.formData['display-name'],
            roomID: this.state.formData['roomID'],
        }
        console.log({ req: reqData });

        axios.post('/joinRoom', reqData).then(res => {
            console.log(res)
            //TODO redirect to room
            if (res.data.room_exists == false) {
                alert('room does not exist');
                return
            }
        })
        sessionStorage.setItem('dispName', reqData.dispName)
        props.history.push(`/${reqData.roomID}`);

    }

    onCreateRoom() {
        console.log('create room');
        if (this.state.formData['display-name'] == null ||
            this.state.formData['roomID'] == null) {
            alert('fill in the roomID and display name')
            return
        }
        var reqData = {
            dispName: this.state.formData['display-name'],
            roomID: this.state.formData['roomID'],
        }
        console.log({ req: reqData });

        axios.post('/createRoom', reqData).then(res => {
            console.log(res)
            //TODO redirect to room
            if (res.data.room_exists == true) {
                alert('room already exists');
                return
            }
        })
        sessionStorage.setItem('dispName', reqData.dispName)
        props.history.push(`/${reqData.roomID}`);
    }

    render() {
        return (
            <div className='main-pane col centered'>
                <h1>welcome</h1>
                <div className='centered rounded-corners'>
                    <input type="text" required id='display-name' onChange={this.onChange} placeholder='displayName' />
                </div>
                <br />
                <div className='col'>
                    <input type="text" id='roomID' onChange={this.onChange} placeholder='roomID' />
                    <div className='row'>
                        <button className='red btn' onClick={this.onCreateRoom}>create new room</button>
                        <div className='col'>
                            <button className='btn red' onClick={this.onJoinRoom}>join room</button>
                        </div>
                    </div>
                    </div>
                </div>
                )
    }
}