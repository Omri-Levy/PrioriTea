import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {GripVertical} from "tabler-icons-react";
import {TBodyProps} from "./interfaces";
import './TBody.css';
import {Row} from "react-table";
import {useDnD} from "../hooks/useDnD/useDnD";

export const TBody = <TData extends Array<Row<{ [p: string]: any }>>, >({
																			getTableBodyProps,
																			rows,
																			prepareRow,

																		}: TBodyProps<TData>) => {
	const [page, onDragEnd] = useDnD(rows);

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId="dnd-list" direction="vertical">
				{(provided) => (
					<tbody
						{...getTableBodyProps()}
						{...provided.droppableProps}
						ref={provided.innerRef}
					>
					{page.map((row, index) => {
						prepareRow(row);

						return (
							<Draggable
								key={row.id}
								index={index}
								draggableId={row.id}
							>
								{(provided) => (
									<tr
										{...row.getRowProps()}
										{...provided.draggableProps}
										className={'draggable__item'}
										ref={provided.innerRef}
									>
										<td>
											<div
												className={'draggable__handle'} {...provided.dragHandleProps}>
												<GripVertical size={20}/>
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
				)}
			</Droppable>
		</DragDropContext>
	);
}
