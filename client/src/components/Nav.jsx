import React, {useContext, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext.jsx';
import fetchFn from '../static/js/requests/fetchFn.js';
import slideNav from '../static/js/slideNav.js';

const Nav = () => {
    const {isSignedIn, signout, signin} = useContext(AuthContext);
    const getCurrentUserUrl = `${process.env.REACT_APP_API}/get_current_user`;
    const signoutUrl = `${process.env.REACT_APP_API_USER}/signout`;

    useEffect(() => {
        const getCurrentUserOptions = {
            method: 'POST',
            credentials: 'include'
        };

        const fetchCurrentUser = async () => {
            const {data} = await fetchFn(getCurrentUserUrl,
                getCurrentUserOptions);
            const currentPageIsSignin = window.location.pathname === '/signin';
            const currentPageIsRoot = window.location.pathname === '/';

            if (data && data.email) return signin();

            if (!currentPageIsSignin && currentPageIsRoot) {
                window.location.href = '/signin';
            }

        }

        fetchCurrentUser().catch(err => console.error(err));
    }, [signin]);

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

                            const signoutOptions = {
                                method: 'POST',
                                credentials: 'include'
                            };
                            try {
                                await fetchFn(signoutUrl, signoutOptions);
                            } catch (err) {
                                console.error(err);
                            }

                            signout();

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
