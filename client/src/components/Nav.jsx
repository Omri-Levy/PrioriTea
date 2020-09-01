import React, {useContext, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext.jsx';
import setSignedInPost from '../static/js/requests/setSignedInPost.js';
import signoutPost from '../static/js/requests/signoutPost.js';
import slideNav from '../static/js/slideNav.js';

const Nav = () => {
    const {isSignedIn, signin, signout} = useContext(AuthContext);

    useEffect(() => {
        const persistLogin = async () => {
            const res = await setSignedInPost();
            res.data ? signin() : signout();
        };

        persistLogin().catch(err => console.error(err));
    }, [signin, signout]);

    return (
        <nav>
            <ul>
                {isSignedIn &&
                <li className='nav-link'>
                    <NavLink
                        activeClassName='current-link'
                        exact to='/'>
                        HOME
                    </NavLink>
                </li>}
                {isSignedIn &&
                <li className='nav-link'>
                    <NavLink
                        activeClassName='current-link'
                        to='/profile'>
                        PROFILE
                    </NavLink>
                </li>}
                {!isSignedIn &&
                <li className='nav-link'>
                    <NavLink
                        activeClassName='current-link'
                        to='/signin'>
                        SIGNIN
                    </NavLink>
                </li>}
                {isSignedIn &&
                <li className='nav-link'>
                    <NavLink
                        activeClassName='current-link'
                        onClick={async () => {
                            await signoutPost();
                            const res = await setSignedInPost();
                            res && res.data ? signin() : signout();
                        }}
                        to='/signin'>
                        SIGNOUT
                    </NavLink>
                </li>}
                {!isSignedIn &&
                <li className='nav-link'>
                    <NavLink
                        activeClassName='current-link'
                        to='/signup'>
                        SIGNUP
                    </NavLink>
                </li>}
            </ul>
            <div onClick={slideNav} className='burger'>
                <div className='line1'/>
                <div className='line2'/>
                <div className='line3'/>
            </div>
        </nav>
    );
};

export default Nav;
