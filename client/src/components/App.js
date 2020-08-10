import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import Header from './Header.js';
import Home from './nav/nav-links/Home';
import Profile from './nav/nav-links/Profile';
import Signin from './nav/nav-links/Signin';
import Signout from './nav/nav-links/Signout';
import Signup from './nav/nav-links/Signup';
import Nav from './nav/Nav.js';

const App = () => {
    return (
        <Router>
            <Header/>
            <Nav/>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/home' component={Home}/>
                <Route exact path='/profile' component={Profile}/>
                <Route exact path='/signin' component={Signin}/>
                <Route exact path='/signout' component={Signout}/>
                <Route exact path='/signup' component={Signup}/>
            </Switch>
        </Router>
    );
}

export default App;
