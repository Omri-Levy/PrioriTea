import editListSchema from '../../static/js/validation/editListSchema.js';
import {Form, Formik} from 'formik';
import React from 'react';
import {Input} from '../Input';
import editListPatch from '../../static/js/requests/editListPatch.js';
import {hideEditListModal} from '../../static/js/handlers.js';

export const EditListForm = ({editListId, getLists}) => {
    return (
        <Formik
            initialValues={{
                title: '',
                owner: '',
            }}
            validationSchema={editListSchema}
            onSubmit={
                (data) => editListPatch(data, getLists,
                    editListId)
            }
        >
            {() => (
                <Form className='edit-list-form'>
                    <Input
                        autoFocus={true}
                        label='Title'
                        name='title'
                        type='text'
                        autoComplete='on'
                        placeholder='Title'
                    />
                    <Input
                        label='Owner'
                        name='owner'
                        type='text'
                        autoComplete='on'
                        placeholder='Owner'
                    />
                    <button
                        type='submit'
                        className='primary-btn'>
                        Edit
                    </button>
                    <button
                        type='button'
                        onClick={hideEditListModal}
                        className='primary-btn'>
                        Cancel
                    </button>
                </Form>
            )}
        </Formik>
    );
}
