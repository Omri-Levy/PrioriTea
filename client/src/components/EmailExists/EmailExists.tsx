import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext/useAuthContext';


export const EmailExists = () => {
	const { toggleEmailExistsMsg } = useAuthContext();
	const [msgFits, setMsgFits] = useState(true);

	const ifMsgFits = () => {
		if (window.innerWidth < 399) {
			setMsgFits(false);
		}
	};
	const closeEmailExistsMsg = useCallback(function() {
		toggleEmailExistsMsg(false);
	}, [toggleEmailExistsMsg])

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
						onClick={closeEmailExistsMsg}
					>
						<em>Signin</em>
					</Link>
				)}
			</div>
		</div>
	);
};
