import React, { Component } from "react";
const axios = require('axios');

export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: {}, 
            messages: null,
            msg_input: 'as',
            dispName: props.dispName,
            roomID: props.roomID,
        }
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.onChanegMsg = this.onChanegMsg.bind(this);
    }

    handleKeyPress (e) {
        if (e.key === 'Enter'){
            //TODO send msg through axios
            const reqData = {
                msg: this.state['msg_input'], 
                from: this.state['dispName'], 
                roomID: this.state.roomID,
            }
            console.log({reqData})
            axios.post('/sendMsg', reqData).then(res => {
                console.log(res);
            })
        }
    }

    onChanegMsg (e) {
        console.log(e.target.value)
        this.setState({msg_input: e.target.value});
    }

    render() {
        return (
            <div className="chat-pane col">
                <div className='prev-chats'>

                </div>
                <div className='chat-input'>
                    <input type="text" name="chat-input" id="chat-input" onKeyPress={this.handleKeyPress} onChange={this.onChanegMsg}/>
                </div>
            </div>
        )
    }
}

