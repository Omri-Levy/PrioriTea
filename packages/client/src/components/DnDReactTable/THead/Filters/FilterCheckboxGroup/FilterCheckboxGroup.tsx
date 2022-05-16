import { FunctionComponent, useMemo } from "react";
import { Checkbox, CheckboxGroup } from "@mantine/core";
import { noNullish, uniqueArray } from "@prioritea/utils";
import "./FilterCheckboxGroup.css";
import { FilterCheckboxGroupProps } from "./interfaces";

// FIXME: one checkbox group changes length, one does not. They should either both change length or both not.
export const FilterCheckboxGroup: FunctionComponent<
	FilterCheckboxGroupProps
> = ({ column: { filterValue, setFilter, preFilteredRows, id }, ...rest }) => {
	const options = useMemo(
		() =>
			// @ts-ignore
			uniqueArray(
				preFilteredRows.map(
					(row: any) =>
						// Ensures that the filter value is a string
						noNullish`${row.values[id]}`
				)
			),
		[id, preFilteredRows]
	);

	return (
		<CheckboxGroup
			className="checkbox-group"
			label={id}
			value={filterValue}
			onChange={setFilter}
			size="xs"
		>
			{options?.map((option: any) => (
				<Checkbox
					key={`${id}-${option}`}
					value={option?.toString()}
					// @ts-ignore
					label={
						rest?.transformer ? rest?.transformer(option) : option
					}
				/>
			))}
		</CheckboxGroup>
	);
};
