import React, { Component, useState } from 'react';
const axios = require('axios');

class vidChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomID: this.props.match.params.roomID,
            dispName: sessionStorage.getItem('dispName')
        }
    }

    render() {
        return (
            <div className='main-pane'>
            <h1>main chat</h1>
            <h2>{this.state.dispName}</h2>
            </div>
        )
    }
}

export default vidChat;
