import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext.jsx';
import Header from './Header.jsx';
import Home from './pages/Home.jsx';
import Profile from './pages/Profile.jsx';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';

const Routes = () => {
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

export default Routes;
