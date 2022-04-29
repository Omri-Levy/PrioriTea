import { zodResolver } from "@hookform/resolvers/zod";
import { ActionIcon, Button, createStyles, Group, Modal, ScrollArea, Table, TextInput } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { createTaskSchema } from "@prioritea/validation";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { SubmitHandler, useForm } from "react-hook-form";
import { GripVertical, Plus } from "tabler-icons-react";
import { TasksApi } from "../../../api/tasks-api";
import { ITask } from "../../../interfaces";
import { FieldError } from "../../FieldError/FieldError";

export const Home = () => {
  const [opened, setOpened] = useState(false);
 const {register, handleSubmit, formState: {errors}} = useForm<{priority: string, description: string}>({
   defaultValues: {
      priority: '',
      description: '',
   },
   resolver: zodResolver(createTaskSchema)
 });
     const useStyles = createStyles((theme) => ({
  item: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  dragHandle: {
    ...theme.fn.focusStyles(),
    width: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
  },
}));
    const { classes } = useStyles();
    const [state, handlers] = useListState<ITask>([]);
    const items = state.map(function(item, index) {

    return (
    <Draggable key={item.description} index={index} draggableId={item.description}>
      {(provided) => (
        <tr className={classes.item} ref={provided.innerRef} {...provided.draggableProps}>
          <td>
            <div className={classes.dragHandle} {...provided.dragHandleProps}>
              <GripVertical size={18} />
            </div>
          </td>
          <td style={{ width: 80 }}>{item.priority}</td>
          <td style={{ width: 120 }}>{item.description}</td>
          <td style={{ width: 80 }}>{item.status}</td>
        </tr>
      )}
    </Draggable>
  )
      }
  );
 const onSubmit: SubmitHandler<{priority: string, description: string}> = async function({priority, description}) {

   const {data} = await TasksApi.create(priority, description);

   handlers.setState(data.tasks);

   setOpened(false);
 };

   useEffect(() => {
    TasksApi.getAll().then(({data}) => {
      handlers.setState(data.tasks)
    });
  }, [])

  return (
    <>
          <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Create a task"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Group direction="column" grow>
          <TextInput
            required
            label="Priority"
            placeholder="Type here.."
           {...register("priority")}
           />
          <FieldError field={errors.priority}/>
                    <TextInput
            required
            label="Description"
            placeholder="Type here.."
           {...register("description")}
           />
                     </Group>
                     <Group position="apart" mt="xl">
              <Button type="submit" style={{ textTransform: "capitalize" }}>
            Create
          </Button>
          </Group>
        </form>
      </Modal>

      <Group position="center">
            <ActionIcon ml="auto" mr="1rem" mb="1rem" size={38} color="primary" radius="xl" variant="filled"
             onClick={() => setOpened(true)}>
      <Plus size={38} />
    </ActionIcon>
      </Group>
   <ScrollArea>
      <DragDropContext
        onDragEnd={({ destination, source }) => {
          return handlers.reorder({ from: source.index, to: destination!.index })
        }}
      >
        <Table sx={{ minWidth: 420, '& tbody tr td': { borderBottom: 0 } }}>
          <thead>
            <tr>
              <th style={{ width: 40 }}/>
              <th style={{ width: 80 }}>Priority</th>
              <th style={{ width: 120 }}>Description</th>
              <th style={{ width: 40 }}>Status</th>
            </tr>
          </thead>
          <Droppable droppableId="dnd-list" direction="vertical">
            {(provided) => (
              <tbody {...provided.droppableProps} ref={provided.innerRef}>
                {items}
                {provided.placeholder}
              </tbody>
            )}
          </Droppable>
        </Table>
      </DragDropContext>
    </ScrollArea>
    </>
  );
};
