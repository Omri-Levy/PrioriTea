import { FunctionComponent } from "react";
import { HTMLInputProps } from "../FormikInput/FormikInput";

interface FilterSearchProps extends HTMLInputProps {
  label: string;
  id?: string;
  name?: string;
}

export const FilterSearch: FunctionComponent<FilterSearchProps> = ({
  label,
  ...props
}) => {
  return (
    <section className={"responsive-section"}>
      <label className="form-label" htmlFor={props.id || props.name}>
        {label}
      </label>
      <input {...props} />
    </section>
  );
};
