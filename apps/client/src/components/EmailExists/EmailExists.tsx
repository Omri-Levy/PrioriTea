import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext/useAuthContext';
import { useToggle } from '../../hooks/useToggle/useToggle';


export const EmailExists = () => {
	const { toggleOffDisplayEmailExistsMsg } = useAuthContext();
	const {
    isToggled: msgFits,
    toggleOff: toggleOffMsgFits,
    toggleOn: toggleOnMsgFits,
  } = useToggle(true);

	const ifMsgFits = () => {
		if (window.innerWidth < 399) {
			toggleOffMsgFits();
		} else {
			toggleOnMsgFits();
		}
	};

	useEffect(() => {
		window.addEventListener('resize', ifMsgFits);
	}, []);

	return (
		<div className="email-exists">
			<div className="email-exists-content">
				{msgFits ? (
					"Email already exists - navigate to"
				) : (
					"Email already exists"
				)}
				{msgFits && (
					<Link
						to="/sign-in"
						className="sign-in-link"
						onClick={toggleOffDisplayEmailExistsMsg}
					>
						<em>Signin</em>
					</Link>
				)}
			</div>
		</div>
	);
};
