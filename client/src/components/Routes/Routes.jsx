import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext/AuthContext.jsx';
import Header from './Header.jsx.js.js';
import Home from './pages/Home.jsx.js.js';
import Profile from './pages/Profile.jsx.js.js';
import SignIn from './pages/SignIn.jsx.js.js';
import SignUp from './pages/SignUp.jsx.js.js';

export const Routes = () => {
	const { isSignedIn } = useContext(AuthContext);

	return (
		<Router>
			<Header />
			<Switch>
				{isSignedIn && <Route exact path="/" component={Home} />}
				{isSignedIn && (
					<Route exact path="/profile" component={Profile} />
				)}
				{!isSignedIn && (
					<Route exact path="/sign_in" component={SignIn} />
				)}
				{!isSignedIn && (
					<Route exact path="/sign_up" component={SignUp} />
				)}
			</Switch>
		</Router>
	);
};
