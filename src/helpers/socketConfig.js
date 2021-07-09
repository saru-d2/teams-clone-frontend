//socketio initiator
import openSocket from 'socket.io-client';
import SERVER from '../config';

const socket = openSocket(SERVER);

export default socket;