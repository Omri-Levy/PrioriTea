import {FunctionComponent, useState} from "react";
import {SearchProps} from "./interfaces";
import {useAsyncDebounce} from "react-table";
import {ActionIcon, TextInput, useMantineTheme} from "@mantine/core";
import {ArrowLeft, ArrowRight, Search as SearchIcon} from "tabler-icons-react";

export const Search: FunctionComponent<SearchProps> = (props) => {
	const {
		visibleColumnsLength,
		preGlobalFilteredRows,
		globalFilter,
		setGlobalFilter
	} = props;
	const count = preGlobalFilteredRows.length
	const [value, setValue] = useState(globalFilter)
	const onChange = useAsyncDebounce(value => {
		setGlobalFilter(value || undefined)
	}, 1000)
	const theme = useMantineTheme();

	return (
		<tr>
			<th
				colSpan={visibleColumnsLength}
			>
				<div>
					<TextInput
						icon={<SearchIcon size={18}/>}
						radius="xl"
						size="md"
						rightSection={
							<ActionIcon size={32} radius="xl"
										color={theme.primaryColor}
										variant="filled">
								{theme.dir === 'ltr' ? <ArrowRight size={18}/> :
									<ArrowLeft size={18}/>}
							</ActionIcon>
						}
						styles={{root: {maxWidth: '35%', minWidth: "280px"}}}
						rightSectionWidth={42}
						value={value || ""}
						onChange={e => {
							setValue(e.target.value);
							onChange(e.target.value);
						}}
						placeholder={`Searching in ${count} records...`}
					/>
				</div>
			</th>
		</tr>
	);
}
