export const slideNav = () => {
	const nav = document.querySelector('header ul');
	const burger = document.querySelector('.burger');

	nav.classList.toggle('burger-active');
	burger.classList.toggle('toggle');
};
