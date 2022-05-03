import {FunctionComponent} from "react";
import {createStyles} from "@mantine/core";
import {Draggable} from "react-beautiful-dnd";
import {GripVertical} from "tabler-icons-react";
import {TBodyProps} from "./interfaces";

export const TBody: FunctionComponent<TBodyProps> = ({
														 provided,
														 getTableBodyProps,
														 rows,
														 prepareRow
													 }) => {
	const useStyles = createStyles((theme) => ({
		item: {
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
		},

		dragHandle: {
			...theme.fn.focusStyles(),
			display: 'flex',
			color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
		},
	}));
	const {classes} = useStyles();

	return (
		<tbody  {...provided.droppableProps}
				ref={provided.innerRef} {...getTableBodyProps()}>
		{rows.map((row, index) => {
			prepareRow(row);

			return (
				<Draggable
					key={row.id}
					index={index} draggableId={row.id}
				>
					{(provided) => (
						<tr
							{...row.getRowProps()}
							{...provided.draggableProps}
							className={classes.item}
							ref={provided.innerRef}
						>
							<td>
								<div
									className={classes.dragHandle} {...provided.dragHandleProps}>
									<GripVertical size={20} />
								</div>
							</td>
							{row.cells.map((cell) =>
								<td {...cell.getCellProps()}>
									{cell.render('Cell')}
								</td>
							)}
						</tr>
					)}
				</Draggable>
			);
		})}
		{provided.placeholder}
		</tbody>
	);
}
