import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext.jsx';

const Nav = () => {
    const {isLoggedIn} = useContext(AuthContext);

    return (
        <nav className='main-nav'>
            <h1 className='m-1'>PRIORITEA</h1>
            <ul>
                {isLoggedIn &&
                <li>
                    <NavLink
                        activeClassName='current-link'
                        exact to='/'>
                        HOME
                    </NavLink>
                </li>}
                {isLoggedIn &&
                <li>
                    <NavLink
                        activeClassName='current-link'
                        to='/profile'>
                        PROFILE
                    </NavLink>
                </li>}
                {!isLoggedIn &&
                <li>
                    <NavLink
                        activeClassName='current-link'
                        to='/signin'>
                        SIGNIN
                    </NavLink>
                </li>}
                {isLoggedIn &&
                <li>
                    <NavLink
                        activeClassName='current-link'
                        to='/signout'>
                        SIGNOUT
                    </NavLink>
                </li>}
                {!isLoggedIn &&
                <li>
                    <NavLink
                        activeClassName='current-link'
                        to='/signup'>
                        SIGNUP
                    </NavLink>
                </li>}
            </ul>
        </nav>
    );
}

export default Nav;
