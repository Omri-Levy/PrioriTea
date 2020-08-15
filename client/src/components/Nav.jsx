import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';

const Nav = () => {
    const [isLogged, setIsLogged] = useState(true);

    useEffect(() => {
        localStorage.setItem('isLogged', JSON.stringify(isLogged));
    }, [isLogged]);

    useEffect(() => {
        const isLogged = JSON.parse(
            localStorage.getItem('isLogged'));
        setIsLogged(isLogged);
    }, []);

    return (
        <nav className='main-nav'>
            <h1 className='m-1'>PRIORITEA</h1>
            <ul>
                {isLogged &&
                <li>
                    <NavLink
                        activeClassName='current-link'
                        to='/home'>
                        HOME
                    </NavLink>
                </li>}
                {isLogged &&
                <li>
                    <NavLink
                        activeClassName='current-link'
                        to='/profile'>
                        PROFILE
                    </NavLink>
                </li>}
                {!isLogged &&
                <li>
                    <NavLink
                        activeClassName='current-link'
                        onClick={() => {
                            setIsLogged(true);
                        }}
                        to='/signin'>
                        SIGNIN
                    </NavLink>
                </li>}
                {isLogged &&
                <li>
                    <NavLink
                        activeClassName='current-link'
                        onClick={() => setIsLogged(false)}
                        to='/signout'>
                        SIGNOUT
                    </NavLink>
                </li>}
                {!isLogged &&
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
