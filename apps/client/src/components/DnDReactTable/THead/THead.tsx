import {FunctionComponent} from "react";
import {THeadProps} from "./interfaces";

export const THead: FunctionComponent<THeadProps> = ({headerGroups}) => {
	return (
		<thead>
		{headerGroups.map(
			// @ts-ignore
			(headerGroup) =>
				<tr {...headerGroup.getHeaderGroupProps()}>
					<th style={{width: 40}}/>
					{headerGroup.headers.map((col) =>
						<th {...col.getHeaderProps()}>
							{col.render('Header')}
						</th>
					)}
				</tr>
		)}
		</thead>
	);
}

