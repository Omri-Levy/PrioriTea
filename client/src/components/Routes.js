import React from 'react';
import Header from './Header';
import Nav from './Nav';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Signin from './pages/Signin';
import Signout from './pages/Signout';
import Signup from './pages/Signup';

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
