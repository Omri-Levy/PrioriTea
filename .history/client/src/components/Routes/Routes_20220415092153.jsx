import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthContext } from '../../context';
import { Header, Home, Profile, SignIn, SignUp } from '../../components';

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
