import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import socket from '../helpers/socketConfig'
import { Mic, MicOff, VideocamOff, Videocam } from '@material-ui/icons'
import SERVER from '../config'
// const SERVER = 'https://teams-clone-backend-server.herokuapp.com/'

const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, []);

    return (
        <video className='video' playsInline autoPlay ref={ref} />
    );
}




const Room = (props) => {
    const [micStatus, setMic] = useState(true)
    const [camStatus, setCam] = useState(true)
    const [peers, setPeers] = useState([]);
    const userVideo = useRef();
    const userMediaRef = useRef();
    const peersRef = useRef([]);
    const dispName = props.dispName
    const roomID = props.roomID;

    useEffect(() => {
        socket.on('connection', () => {
            console.log('connected to client')
        })
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
            userVideo.current.srcObject = stream;
            userMediaRef.current = stream;
            socket.emit("join room", roomID);

            socket.on("all users", users => {
                const tempPeers = [];
                console.log(users)
                users.forEach(userID => {
                    const peer = createPeer(userID, socket.id, stream);
                    peersRef.current.push({
                        peerID: userID,
                        peer,
                    })
                    // tempPeers.push(({peer}));
                    tempPeers.push({
                        peerID: userID,
                        peer,
                    })
                })
                setPeers(tempPeers);
            })

            socket.on("user joined", payload => {
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                })

                setPeers([...peers, { peer, peerID: payload.callerID }]);
            });

            socket.on("user-left", data => {
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

    function stuff(e) {
        console.log(peers)
    }

    function toggleMute() {
        if (userMediaRef.current)
            userMediaRef.current.getAudioTracks()[0].enabled = !userMediaRef.current.getAudioTracks()[0].enabled
        setMic(!micStatus);
        console.log('mute')
    }
    function toggleCam() {
        if (userMediaRef.current)
            userMediaRef.current.getVideoTracks()[0].enabled = !userMediaRef.current.getVideoTracks()[0].enabled
        setCam(userMediaRef.current.getVideoTracks()[0].enabled);
        console.log('cam')
    }

    function MicIcon() {
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
        // if mic on
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
            <div className='row h-95 align-middle justify-content-center'>
                <video className='video h-50' muted ref={userVideo} autoPlay playsInline />
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
