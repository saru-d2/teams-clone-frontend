import './App.css';
import axios from 'axios';
import { Redirect, HashRouter as Router, Route } from 'react-router-dom';
import Landing from './components/landing'
import vidChat from './components/mainWindow'
 
import SERVER from './config'
axios.defaults.baseURL = SERVER;



function App() {
  return (
    <Router>
      <Route exact path = '/' component={Landing} />
      <Route exact path = '/:roomID' component={vidChat} />
    </Router>
  );
}

export default App;
