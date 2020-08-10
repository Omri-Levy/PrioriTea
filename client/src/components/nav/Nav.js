import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';

const Nav = () => {
    const [isLogged, setIsLogged] = useState(false);
    useEffect(() => {
        localStorage.setItem('isLogged', JSON.stringify(isLogged))
    }, [isLogged])
    useEffect(() => {
        setIsLogged(JSON.parse(localStorage.getItem('isLogged')));
    }, [])
    return (
        <nav className='main-nav'>
            <ul>
                {isLogged &&
                <li>
                    <NavLink
                        activeClassName='current-link'
                        to='/home'>
                        Home
                    </NavLink>
                </li>}
                {isLogged &&
                <li>
                    <NavLink
                        activeClassName='current-link'
                        to='/profile'>
                        Profile
                    </NavLink>
                </li>}
                {!isLogged &&
                <li>
                    <NavLink
                        activeClassName='current-link'
                        onClick={() => setIsLogged(true)}
                        to='/signin'>
                        Signin
                    </NavLink>
                </li>}
                {isLogged &&
                <li>
                    <NavLink
                        activeClassName='current-link'
                        onClick={() => setIsLogged(false)}
                        to='/signout'>
                        Signout
                    </NavLink>
                </li>}
                {!isLogged &&
                <li>
                    <NavLink
                        activeClassName='current-link'
                        to='/signup'>
                        Signup
                    </NavLink>
                </li>}
            </ul>
        </nav>
    );
}

export default Nav;
