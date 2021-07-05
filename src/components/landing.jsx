import React, { Component } from "react";

export default class Landing extends Component {
    constructor(props){
        super(props);
        this.state = {
            errors: {}, 
            formDetails: {}
        }
    }

    render () {
        return (
            <div className='main-pane'>
                <h1>welcome</h1>
            </div>
        )
    }
}