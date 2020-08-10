import * as Yup from 'yup';

const editTaskSchema = Yup.object({
    title: Yup.string()
        .min(1,
            'Title must include a minimum of 1 characters.')
        .max(
            80,
            'Title must include of a maximum of 80 characters.'),
    owner: Yup.string()
        .min(2,
            'Owner must include a minimum of 2 characters.')
        .max(80,
            'Owner must include a maximum of 70 characters.')
});

export default editTaskSchema;
