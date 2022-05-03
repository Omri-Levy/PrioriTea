import {FunctionComponent} from "react";
import {THeadProps} from "./interfaces";
import {Center, Group, Text} from "@mantine/core";
import {ChevronDown, ChevronUp, Selector} from "tabler-icons-react";

export const THead: FunctionComponent<THeadProps> = ({headerGroups}) => {

	return (
		<thead>
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
							<Group position="apart" sx={(theme) => ({
								padding: `1rem`,
								borderRadius: 3,
								cursor: 'pointer',
								'&:hover': {
									backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
								},
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
				.isSorted
					? col
						// @ts-ignore
						.isSortedDesc
						? <ChevronDown size={14}/>
						: <ChevronUp size={14}/>
					: <Selector/>}
          </Center>
							</Group>
						</th>
					)}
				</tr>
		)}
		</thead>
	);
}
