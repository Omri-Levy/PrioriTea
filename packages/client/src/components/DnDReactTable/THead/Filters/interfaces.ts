import { HeaderGroup } from "react-table";

export interface FiltersProps {
	headerGroups: HeaderGroup<{ [p: string]: any }>[];
	visibleColumnsLength: number;
}
