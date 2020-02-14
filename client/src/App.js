import React, {useReducer, useState, useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Welcome from './components/Welcome.js';
import Header from './components/Header.js';
import Users from './components/Users.js';
import Register from './components/Register.js';
import Login from './components/Login.js';
import { UserContext } from './components/contexts/UserContext';
import { initialState, reducer } from './components/reducers';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <div className="App">
      <Router>
        <UserContext.Provider value={{ state, dispatch }}>
          <Route path = "/" component={Header} />
          <Route exact path = "/" component={Welcome} />
          <Route path = "/users" render={(props) => (<Users {...props}state={state}dispatch={dispatch}/>)} />
          <Route exact path = "/register" component={Register} />
          <Route path = "/login" render={(props) => (<Login {...props} state={state}dispatch={dispatch}/>)} />
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
