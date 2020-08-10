import express from 'express';
import List from '../models/List.js';
import listValidation from '../validation/listValidation.js';


const list = express.Router();

list.get('/get_lists',
    async (req,
           res) => {
        const lists = await List.find().sort([['createdAt', -1]]);
        res.json(lists)
    })

list.post('/create_list',
    async (req,
           res) => {
        const {error} = await listValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const newList = new List({
            title: req.body.title,
            owner: req.body.owner
        });

        try {
            const savedList = await newList.save();
            res.json({list: savedList._id});
        } catch (err) {
            res.json({message: err});
        }

    });

list.patch('/edit_list',
    async (req,
           res) => {
        try {
            const oldList = await List.findById(req.body._id);
            const updatedList = await List.updateOne(
                {_id: req.body._id},
                {
                    $set: {
                        title: req.body.title ? req.body.title : oldList.title,
                        owner: req.body.owner ? req.body.owner : oldList.owner,
                    }
                });
            res.json(updatedList);
        } catch (err) {
            res.json({message: err});
        }
    });

list.delete('/delete_list',
    async (req,
           res) => {
        try {
            const deletedList = await List.deleteOne(
                {_id: req.body._id});
            res.json(deletedList);
        } catch (err) {
            res.json({message: err});
        }
    });

export default list;

