import React from 'react';

export const OnePager = () => {
	return (
		<nav>
			<ul>
				<li>
					<button
						id={'page-1'}
						className="current-page pagination-btn"
					>
						1
					</button>
				</li>
			</ul>
		</nav>
	);
};
