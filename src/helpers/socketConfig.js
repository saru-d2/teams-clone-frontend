import openSocket from 'socket.io-client';

// const SERVER = 'http://localhost:4000'
const SERVER = 'https://teams-clone-backend-server.herokuapp.com/'

const socket = openSocket(SERVER);

export default socket;