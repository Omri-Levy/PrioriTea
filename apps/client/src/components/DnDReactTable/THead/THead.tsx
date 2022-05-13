import {THeadProps} from "./interfaces";
import {Group, Text} from "@mantine/core";
import {FunctionComponent} from "react";
import {Filters} from "./Filters/Filters";
import {SortToggle} from "./SortToggle/SortToggle";
import {Search} from "./Search/Search";

export const THead: FunctionComponent<THeadProps> = ({
														 headerGroups,
														 visibleColumnsLength,
														 preGlobalFilteredRows,
														 globalFilter,
														 setGlobalFilter,

													 }) => {


	return (
		<thead>
		<Filters
			headerGroups={headerGroups}
			visibleColumnsLength={visibleColumnsLength}
		/>
		<Search
			visibleColumnsLength={visibleColumnsLength}
			preGlobalFilteredRows={preGlobalFilteredRows}
			globalFilter={globalFilter}
			setGlobalFilter={setGlobalFilter}
		/>
		{headerGroups.map(
			// @ts-ignore
			(headerGroup) =>
				<tr {...headerGroup.getHeaderGroupProps()}>
					<th style={{width: 40}}/>
					{headerGroup.headers.map((col) => (
							<th {...col.getHeaderProps(col
								// @ts-ignore
								.getSortByToggleProps())}
								style={{
									...(col.id === "selection" ? {
										padding: "0.6rem",
										width: 0,
									} : {
										padding: 0,
									}),
								}}
							>
								{col.id === "selection" && col.render('Header')}
								{col.id !== "selection" && (
									<Group
										position="apart"
										p={"0.6rem"}
										className={`thead__col`}
									>
										<Text weight={500} size={'sm'}>
											{col.render('Header')}
										</Text>
										<SortToggle
											canSort={col.canSort}
											isSorted={col.isSorted}
											isSortedDesc={col.isSortedDesc}
										/>
									</Group>
								)}
							</th>
						)
					)}
				</tr>
		)}
		</thead>
	);
}

