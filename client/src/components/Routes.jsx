import React, {useContext, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext.jsx';
import setLoginPost from '../static/js/requests/setLoginPost.js';
import Header from './Header.jsx';
import Home from './pages/Home.jsx';
import Profile from './pages/Profile.jsx';
import Signin from './pages/Signin.jsx';
import Signup from './pages/Signup.jsx';

const Routes = () => {
    const {isLoggedIn, signin, signout} = useContext(AuthContext);

    const persistLogin = async () => {
        const res = await setLoginPost();
        res.data ? signin() : signout();
    };

    useEffect(() => {
        persistLogin().catch(err => console.error(err));
    }, []);

    return (
        <Router>
            <Header/>
            <Switch>
                {isLoggedIn &&
                <Route exact path='/'
                       component={Home}/>
                }
                {isLoggedIn &&
                <Route exact path='/profile'
                       component={Profile}/>
                }
                {!isLoggedIn &&
                < Route exact path='/signin'
                        component={Signin}/>
                }
                {!isLoggedIn &&
                < Route exact path='/signup'
                        component={Signup}/>
                }
            </Switch>
        </Router>
    );
};

export default Routes;
