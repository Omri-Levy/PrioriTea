import * as Yup from 'yup';

const createTaskSchema = Yup.object({
    priority: Yup.string()
        .min(1,
            'Priority must include a minimum of 1 characters.')
        .max(
            80,
            'Priority must include of a maximum of 80 characters.')
        .required('Priority is  a required field.'),
    task: Yup.string()
        .min(1,
            'Task must include a minimum of 1 characters.')
        .max(80,
            'Task must include a maximum of 80 characters.')
        .required('Task is a required field.')
});

export default createTaskSchema;
