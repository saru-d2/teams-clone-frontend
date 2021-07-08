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
            else {
                this.props.history.push(`/${reqData.roomID}`);
            }
        })
        sessionStorage.setItem('dispName', reqData.dispName)

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
            } else {
                this.props.history.push(`/${reqData.roomID}`);
            }
        })
        sessionStorage.setItem('dispName', reqData.dispName)
    }

    render() {
        return (
            <div className='container  mt-5 '>
                <h1 className="big-text text-center mb-0"><b>TeamsLite</b></h1>
                <div className='rounded-corners'>
                    <input type="text" required id='display-name' onChange={this.onChange} placeholder='displayName' className="form-control" />
                </div>
                <br />
                <div className='column text-center'>
                    <input type="text" id='roomID' onChange={this.onChange} placeholder='roomID' className="form-control"/> <br/>
                    <button className=" muave shadow-move btn mx-md-2 my-2 my-md-0" onClick={this.onCreateRoom}>create new room</button>
                    <button className="red shadow-move btn  mx-md-2 my-2 my-md-0" onClick={this.onJoinRoom}>join room</button>
                </div>
            </div>
        )
    }
}