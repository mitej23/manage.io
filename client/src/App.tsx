import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

//components
import Landing from './pages/Landing';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </div>
    </Router>
  );
}

export default App;
