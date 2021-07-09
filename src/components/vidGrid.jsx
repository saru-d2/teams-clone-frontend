import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import socket from '../helpers/socketConfig'
import { Mic, MicOff, VideocamOff, Videocam } from '@material-ui/icons'
import SERVER from '../config'

const Video = (props) => {
    const ref = useRef();
    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, []);

    return (
        <video className='h-50 col-md-5 col-sm-12 p-1' playsInline autoPlay ref={ref} />
    );
}

const Room = (props) => {
    const [micStatus, setMic] = useState(true)
    const [camStatus, setCam] = useState(true)
    const [peers, setPeers] = useState([]);
    const userVideo = useRef();
    const userMediaRef = useRef();
    const peersRef = useRef([]);
    const roomID = props.roomID;

    useEffect(() => {
        //initial connection
        socket.on('connection', () => {
            console.log('connected to client')
        })

        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
            userVideo.current.srcObject = stream;
            userMediaRef.current = stream;
            
            socket.emit("join room", roomID);

            socket.on("all users", users => {
                // creates peers for ALL other users
                const tempPeers = [];
                console.log(users)
                users.forEach(userID => {
                    const peer = createPeer(userID, socket.id, stream);
                    peersRef.current.push({
                        peerID: userID,
                        peer,
                    })
                    tempPeers.push({
                        peerID: userID,
                        peer,
                    })
                })
                setPeers(tempPeers);
            })

            socket.on("user joined", payload => {
                //creates new peers for ONLY the new user
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                })
                setPeers([...peers, { peer, peerID: payload.callerID }]);
                
            });

            socket.on("user-left", data => {
                //user left..
                const id = data.userID;
                const peerObj = peersRef.current.find(p => p.peerID == id)
                if (peerObj) peerObj.peer.destroy();
                const peersRefCur = peersRef.current.filter(p => p.peerID !== id)
                peersRef.current = peersRefCur
                setPeers(peersRefCur)
            })

            socket.on("receiving returned signal", payload => {
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
            });
        })
    }, []);

    function createPeer(userToSignal, callerID, stream) {
        // creates the initiator of the room
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on("signal", signal => {
            socket.emit("sending signal", { userToSignal, callerID, signal })
        })

        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {
        // creates the others
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })

        peer.on("signal", signal => {
            socket.emit("returning signal", { signal, callerID })
        })

        peer.signal(incomingSignal);

        return peer;
    }

    function toggleMute() {
        //toggle mute
        if (userMediaRef.current)
            userMediaRef.current.getAudioTracks()[0].enabled = !userMediaRef.current.getAudioTracks()[0].enabled
        setMic(!micStatus);
        console.log('mute')
    }
    function toggleCam() {
        //toggles video
        if (userMediaRef.current)
            userMediaRef.current.getVideoTracks()[0].enabled = !userMediaRef.current.getVideoTracks()[0].enabled
        setCam(userMediaRef.current.getVideoTracks()[0].enabled);
        console.log('cam')
    }

    function MicIcon() {
        //component for mic button
        // if mic on
        const enabled = micStatus
        if (enabled)
            return (
                <Mic onClick={toggleMute} />
            )
        else return (
            <MicOff onClick={toggleMute} />
        )
    }

    function VidIcon() {
        //component for video button
        // if video on
        const enabled = camStatus
        if (enabled)
            return (
                <Videocam onClick={toggleCam} />
            )
        else return (
            <VideocamOff onClick={toggleCam} />
        )
    }
    return (
        <div className='sea-green h-100 container m-0 p-0 '>
            <div className='row h-95 align-middle justify-content-center vidGrid'>
                <video className='h-50 col-md-5 col-sm-12 p-1' muted ref={userVideo} autoPlay playsInline />
                {peers.map((peer) => {
                    return (
                        <Video key={peer.peerID} peer={peer.peer} />
                    );
                })}
            </div>
            <div className='controls row-md-5 h-5 w-100 muave text-center align-center '>
                <MicIcon />
                <VidIcon />
            </div>
        </div>
    );
};

export default Room;
