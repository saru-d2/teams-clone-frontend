import './App.css';
import axios from 'axios';
import { Redirect, HashRouter as Router, Route } from 'react-router-dom';
import Landing from './components/landing'
import vidChat from './components/mainWindow'
 
// axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.baseURL = 'https://teams-clone-backend-server.herokuapp.com/';


function App() {
  return (
    <Router>
      <Route exact path = '/' component={Landing} />
      <Route exact path = '/:roomID' component={vidChat} />
    </Router>
  );
}

export default App;
