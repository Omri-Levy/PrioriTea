import {Column} from "react-table";
import {useMemo} from "react";
import {
	FilterCheckboxGroup
} from "../../../../DnDReactTable/THead/Filters/FilterCheckboxGroup/FilterCheckboxGroup";
import {
	formatTaskStatus
} from "../../utils/format-task-status/format-task-status";

export const useTasksColumns = (): Array<Column> => useMemo(() => [
	{
		Header: 'Priority',
		accessor: 'priority',
		filter: 'multiSelect',
		Filter: FilterCheckboxGroup,
	},
	{
		Header: 'Description',
		accessor: 'description',
		disableFilters: true,
	},
	{
		Header: 'Status',
		accessor: 'status',
		filter: 'multiSelect',
		Filter: (props) => (
			<FilterCheckboxGroup
				{...props}
				transformer={formatTaskStatus}
			/>
		),
		// @ts-ignore
		Cell({value}) {
			return formatTaskStatus(value);
		}
	},
], []);
