import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from './Header.jsx';
import Nav from './Nav.jsx';
import Home from './pages/Home.jsx';
import Profile from './pages/Profile.jsx';
import Signin from './pages/Signin.jsx';
import Signout from './pages/Signout.jsx';
import Signup from './pages/Signup.jsx';

const Routes = () => {
    return (
        <Router>
            <Header/>
            <Nav/>
            <Switch>
                <Route exact path='/'
                       component={Home}/>
                <Route exact path='/home'
                       component={Home}/>
                <Route exact path='/profile'
                       component={Profile}/>
                <Route exact path='/signin'
                       component={Signin}/>
                <Route exact path='/signout'
                       component={Signout}/>
                <Route exact path='/signup'
                       component={Signup}/>
            </Switch>
        </Router>
    );
}

export default Routes;
