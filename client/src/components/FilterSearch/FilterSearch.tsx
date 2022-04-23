
export const FilterSearch = ({ label, ...props }) => {
	return (
		<section className={'responsive-section'}>
			<label className="form-label" htmlFor={props.id || props.name}>
				{label}
			</label>
			<input {...props} />
		</section>
	);
};
