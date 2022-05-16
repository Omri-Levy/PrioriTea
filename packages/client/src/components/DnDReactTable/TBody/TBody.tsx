import {Row} from "react-table";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {GripVertical} from "tabler-icons-react";
import {TBodyProps} from "./interfaces";
import "./TBody.css";
import {useDnD} from "../hooks/useDnD/useDnD";

export const TBody = <TData extends Array<Row<{ [p: string]: any }>>>({
																		  getTableBodyProps,
																		  rows,
																		  prepareRow,
																	  }: TBodyProps<TData>) => {
	const [page, onDragEnd] = useDnD(rows);

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId="dnd-list" direction="vertical">
				{(droppable) => (
					<tbody
						{...getTableBodyProps()}
						{...droppable.droppableProps}
						ref={droppable.innerRef}
					>
					{page.map((row, index) => {
						prepareRow(row);

						return (
							<Draggable
								key={row.id}
								index={index}
								draggableId={row.id}
							>
								{(draggable) => (
									<tr
										{...row.getRowProps()}
										{...draggable.draggableProps}
										className={"draggable__item"}
										ref={draggable.innerRef}
									>
										<td>
											<div
												className={
													"draggable__handle"
												}
												{...draggable.dragHandleProps}
											>
												<GripVertical
													size={20}
													className={`draggable__handle__icon`}
												/>
											</div>
										</td>
										{row.cells.map((cell) => (
											<td {...cell.getCellProps()}>
												{cell.render("Cell")}
											</td>
										))}
									</tr>
								)}
							</Draggable>
						);
					})}
					{droppable.placeholder}
					</tbody>
				)}
			</Droppable>
		</DragDropContext>
	);
};
