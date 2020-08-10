import * as Yup from 'yup';

const createListSchema = Yup.object({
    title: Yup.string()
        .min(1,
            'Title must include a minimum of 1 characters.')
        .max(
            320,
            'Title must include of a maximum of 70 characters.')
        .required('Title is  a required field.'),
    owner: Yup.string()
        .min(2,
            'Owner must include a minimum of 2 characters.')
        .max(70,
            'Owner must include a maximum of 70 characters.')
        .required('Owner is a required field.')
});

export default createListSchema;
