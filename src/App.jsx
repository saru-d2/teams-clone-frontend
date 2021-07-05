import './App.css';
import axios from 'axios';
import { Redirect, BrowserRouter as Router, Route } from 'react-router-dom';

import Landing from './components/landing'

function App() {
  return (
    <Router>
      <Route exact path = '/' component={Landing} />
    </Router>
  );
}

export default App;
