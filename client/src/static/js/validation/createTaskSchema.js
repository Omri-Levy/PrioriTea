import * as Yup from 'yup';

const priorityMinCharsMsg = 'Priority must include a minimum of 1 characters.';
const priorityMaxCharsMsg = (
    'Priority must include of a maximum of 80 characters.');
const priorityRequiredMsg = 'Priority is  a required field.';

const taskMinCharsMsg = 'Task must include a minimum of 1 characters.';
const taskMaxCharsMsg = 'Task must include a maximum of 80 characters.';
const taskRequiredMsg = 'Task is a required field.';

const createTaskSchema = Yup.object({
    priority: Yup.string().min(1, priorityMinCharsMsg).max(80,
        priorityMaxCharsMsg).required(priorityRequiredMsg),

    task: Yup.string().min(1, taskMinCharsMsg).max(80, taskMaxCharsMsg)
        .required(taskRequiredMsg)
});

export default createTaskSchema;
