import {Group, Text} from "@mantine/core";
import {FunctionComponent} from "react";
import {Filters} from "./Filters/Filters";
import {SortToggle} from "./SortToggle/SortToggle";
import {Search} from "./Search/Search";
import {THeadProps} from "./interfaces";
import "./THead.css";

export const THead: FunctionComponent<THeadProps> = ({
														 headerGroups,
														 visibleColumnsLength,
														 preGlobalFilteredRows,
														 globalFilter,
														 setGlobalFilter,
													 }) =>
	(
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
			(headerGroup) => (
				<tr {...headerGroup.getHeaderGroupProps()}>
					<th className={`thead__fill-th`} aria-hidden="true"/>
					{headerGroup.headers.map((col) => (
						<th
							{...col.getHeaderProps(
								col
									// @ts-ignore
									.getSortByToggleProps()
							)}
							className={`thead__th${
								col.id === "selection" ? `--selection` : ""
							}`}
						>
							{col.id === "selection" && col.render("Header")}
							{col.id !== "selection" && (
								<Group
									position="apart"
									className={`thead__col${
										col.canSort
											? `--can-sort cursor-pointer`
											: ``
									}`}
								>
									<Text
										className={`thead__col__text`}
										size={"sm"}
									>
										{col.render("Header")}
									</Text>
									<SortToggle
										canSort={col.canSort}
										isSorted={col.isSorted}
										isSortedDesc={col.isSortedDesc}
									/>
								</Group>
							)}
						</th>
					))}
				</tr>
			)
		)}
		</thead>
	);
