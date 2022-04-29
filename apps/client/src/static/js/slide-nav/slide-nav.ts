export const slideNav = () => {
	const nav = document.querySelector('header ul') as HTMLUListElement;
	const burger = document.querySelector('.burger') as HTMLDivElement;

	nav.classList.toggle('burger-active');
	burger.classList.toggle('toggle');
};
