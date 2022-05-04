import {THeadProps} from "./interfaces";
import {Center, Group, Text} from "@mantine/core";
import {ChevronDown, ChevronUp, Selector} from "tabler-icons-react";
import {Search} from "../../pages/Tasks/Tasks";
import {FunctionComponent} from "react";

export const THead: FunctionComponent<THeadProps> = ({headerGroups,
														 visibleColumnsLength, preGlobalFilteredRows, globalFilter, setGlobalFilter}) => {

	return (
		<thead>
		<tr>
			<th
				colSpan={visibleColumnsLength}
			>
				<Search
					preGlobalFilteredRows={preGlobalFilteredRows}
					globalFilter={globalFilter}
					setGlobalFilter={setGlobalFilter}
				/>
			</th>
		</tr>
		{headerGroups.map(
			// @ts-ignore
			(headerGroup) =>
				<tr {...headerGroup.getHeaderGroupProps()}>
					<th style={{width: 40}}/>
					{headerGroup.headers.map((col) =>
						<th {...col.getHeaderProps(col
							// @ts-ignore
							.getSortByToggleProps())}
							style={{padding: 0}}
						>
							<Group position="apart" p={"0.6rem"} sx={(theme) => ({
								padding: `1rem`,
								borderRadius: 3,
								// @ts-ignore
								cursor: col.canSort ? 'pointer' : '',
								// @ts-ignore
								'&:hover': col.canSort ? {
									backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
								} : {},
							})}>
								<Text weight={500} size={'sm'}>
							{col.render('Header')}
								</Text>
								<Center style={{
									borderRadius: 21,
									width: 21,
									height: 21,
								}}>
              {col
				  // @ts-ignore
				  .canSort ? col
				// @ts-ignore
				.isSorted
					? col
						// @ts-ignore
						.isSortedDesc
						? <ChevronDown size={16}/>
						: <ChevronUp size={16}/>
					: <Selector size={16}/> : null}
          </Center>
							</Group>
						</th>
					)}
				</tr>
		)}
		</thead>
	);
}

