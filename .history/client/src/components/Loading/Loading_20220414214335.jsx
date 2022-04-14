import React from 'react';
import spinner from './loading.svg';

export const Loading = () => {
	return (
		<main className="body-container">
			<div className="spinner-container">
				<img src={spinner} className="spinner" alt="spinner" />
			</div>
		</main>
	);
};
