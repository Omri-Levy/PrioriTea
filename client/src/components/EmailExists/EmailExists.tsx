import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext/useAuthContext';


export const EmailExists = () => {
	const { setDisplayEmailExistsMsg } = useAuthContext();
	const [msgFits, setMsgFits] = useState(true);

	const ifMsgFits = () => {
		if (window.innerWidth < 399) {
			setMsgFits(false);
		}
	};

	useEffect(() => {
		window.addEventListener('resize', ifMsgFits);
	}, []);

	return (
		<div className="email-exists">
			<div className="email-exists-content">
				{msgFits ? (
					<>Email already exists - navigate to</>
				) : (
					<>Email already exists</>
				)}
				{msgFits && (
					<Link
						to="/sign-in"
						className="sign-in-link"
						onClick={() => setDisplayEmailExistsMsg(false)}
					>
						<em>Signin</em>
					</Link>
				)}
			</div>
		</div>
	);
};
