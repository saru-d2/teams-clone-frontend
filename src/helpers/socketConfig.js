import openSocket from 'socket.io-client';

const SERVER = 'http://localhost:4000'

const socket = openSocket(SERVER);

export default socket;