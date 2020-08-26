import React, {useContext, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext.jsx';
import setLoginPost from '../static/js/requests/setLoginPost.js';
import signoutPost from '../static/js/requests/signoutPost.js';
import slideNav from '../static/js/slideNav.js';

const Nav = () => {
    const {isLoggedIn, signin, signout} = useContext(AuthContext);
    const persistLogin = async () => {
        const res = await setLoginPost();
        res.data ? signin() : signout();
    }
    useEffect(() => {
        persistLogin().catch(err => console.error(err));
    }, []);
    return (
        <nav>
            <ul>
                {isLoggedIn &&
                <li className='nav-link'>
                    <NavLink
                        activeClassName='current-link'
                        exact to='/'>
                        HOME
                    </NavLink>
                </li>}
                {isLoggedIn &&
                <li className='nav-link'>
                    <NavLink
                        activeClassName='current-link'
                        to='/profile'>
                        PROFILE
                    </NavLink>
                </li>}
                {!isLoggedIn &&
                <li className='nav-link'>
                    <NavLink
                        activeClassName='current-link'
                        to='/signin'>
                        SIGNIN
                    </NavLink>
                </li>}
                {isLoggedIn &&
                <li className='nav-link'>
                    <NavLink
                        activeClassName='current-link'
                        onClick={async () => {
                            await signoutPost();
                            const res = await setLoginPost();
                            res && res.data ? signin() : signout();
                        }}
                        to='/signin'>
                        SIGNOUT
                    </NavLink>
                </li>}
                {!isLoggedIn &&
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
}

export default Nav;
