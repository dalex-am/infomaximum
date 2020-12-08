import React from 'react';
import './App.css';
import {HashRouter, Route} from "react-router-dom";
import Login from "./components/Login/Login";
import Registration from './components/Registration/Registration';
import Main from './components/Main/Main';
import User from './components/User/User';

const App = (props) => {
    return (
        <HashRouter>
            <div className="app-wrapper">
                <Route exact path="/" render={() => <Login />} />
                <Route path="/login" render={() => <Login />} />
                <Route path="/registration" render={() => <Registration />} />
                <Route path="/main" render={() => <Main />} />
                <Route path="/main/process/:id?" render={() => <Main />} />
                <Route path="/user" render={() => <User />} />
            </div>
        </HashRouter>
    );
}

export default App;
