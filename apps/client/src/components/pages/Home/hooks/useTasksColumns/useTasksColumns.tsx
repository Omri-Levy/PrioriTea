import {useMemo} from "react";

export const useTasksColumns = () => useMemo(() => [
	{
		Header: 'Priority',
		accessor: 'priority',
	},
	{
		Header: 'Description',
		accessor: 'description',
	},
	{
		Header: 'Status',
		accessor: 'status',
	},
], [])
