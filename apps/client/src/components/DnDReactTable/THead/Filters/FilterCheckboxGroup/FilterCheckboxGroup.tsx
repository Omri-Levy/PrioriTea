import {useMemo} from "react";
import {Checkbox, CheckboxGroup} from "@mantine/core";
import {noNullish} from "@prioritea/utils";

// FIXME: one checkbox group changes length, one does not. They should either both change length or both not.
export const FilterCheckboxGroup = (
	// @ts-ignore
	{
		column:
			// @ts-ignore
			{filterValue, setFilter, preFilteredRows, id},
		...rest
	}) => {
	const options = useMemo(() => {
		// @ts-ignore
		return uniqueArray(preFilteredRows.map((row) => {
			// Ensures that the filter value is a string
			return noNullish`${row.values[id]}`;
		}));
	}, [id, preFilteredRows]);

	return (
		<CheckboxGroup
			styles={{label: {textTransform: "capitalize"}}}
			label={id}
			value={filterValue}
			onChange={setFilter}
			size={"xs"}
		>
			{options?.map(
				(option: any) => (
					<Checkbox
						key={`${id}-${option}`}
						value={option?.toString()}
						// @ts-ignore
						label={rest?.transformer ? rest?.transformer(option) : option}
						styles={{
							label: {
								textTransform: "capitalize",
							},
						}}
					/>
				))}
		</CheckboxGroup>
	);
}
