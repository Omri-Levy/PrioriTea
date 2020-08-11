import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import Header from './Header.js';
import Home from './nav/nav-links/Home.js';
import Profile from './nav/nav-links/Profile.js';
import Signin from './nav/nav-links/Signin.js';
import Signout from './nav/nav-links/Signout.js';
import Signup from './nav/nav-links/Signup.js';
import Nav from './nav/Nav.js';
import {AppProvider} from './context/AppContext';

const App = () => {
    return (
        <AppProvider>
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
        </AppProvider>
    );
}

export default App;
