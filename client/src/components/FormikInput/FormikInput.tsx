import { useField } from 'formik';
import { DetailedHTMLProps, FunctionComponent, InputHTMLAttributes } from 'react';

export type HTMLInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

interface FormikInputProps extends HTMLInputProps{
	label: string;
	isRequired?: boolean;
	name: string;
}

export const FormikInput: FunctionComponent<FormikInputProps> = ({ label, isRequired, ...props }) => {
	const [field, meta] = useField(props);

	return (
		<section>
			<label
				className={isRequired ? 'form-label required' : 'form-label'}
				htmlFor={props.id || props.name}
			>
				{label}
			</label>
			<input className="primary-input" {...field} {...props} />
			{meta.touched && meta.error ? (
				<div className="error">{meta.error}</div>
			) : null}
		</section>
	);
};