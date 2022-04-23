import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext/useAuthContext';
import { Header } from '../Header/Header';
import { Home } from '../pages/Home/Home';
import { Profile } from '../pages/Profile/Profile';
import { SignIn } from '../pages/SignIn/SignIn';
import { SignUp } from '../pages/SignUp/SignUp';

export const Routes = () => {
	const { isSignedIn } = useAuthContext();

	return (
		<Router>
			<Header />
			<Switch>
				{isSignedIn && <Route exact path="/" component={Home} />}
				{isSignedIn && (
					<Route exact path="/profile" component={Profile} />
				)}
				{!isSignedIn && (
					<Route exact path="/sign-in" component={SignIn} />
				)}
				{!isSignedIn && (
					<Route exact path="/sign-up" component={SignUp} />
				)}
			</Switch>
		</Router>
	);
};
