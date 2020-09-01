import React, {useContext, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext.jsx';
import setSignedInPost from '../static/js/requests/setSignedInPost.js';
import Header from './Header.jsx';
import Home from './pages/Home.jsx';
import Profile from './pages/Profile.jsx';
import Signin from './pages/Signin.jsx';
import Signup from './pages/Signup.jsx';

const Routes = () => {
    const {isSignedIn, signin, signout} = useContext(AuthContext);

    useEffect(() => {
        const persistLogin = async () => {
            const res = await setSignedInPost();
            res.data ? signin() : signout();
        };
        persistLogin().catch(err => console.error(err));
    }, [signin, signout]);

    return (
        <Router>
            <Header/>
            <Switch>
                {isSignedIn &&
                <Route exact path='/'
                       component={Home}/>
                }
                {isSignedIn &&
                <Route exact path='/profile'
                       component={Profile}/>
                }
                {!isSignedIn &&
                < Route exact path='/signin'
                        component={Signin}/>
                }
                {!isSignedIn &&
                < Route exact path='/signup'
                        component={Signup}/>
                }
            </Switch>
        </Router>
    );
};

export default Routes;
