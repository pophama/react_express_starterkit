import express from 'express';
import auth from '../../middleware/auth';
import { CreateCategory, findAllCategory, DeleteCategory, UpdateCategory } from '../../models/Categorie';

const router = express.Router();

// @route   GET api/categorie
// @desc    GET all Categorie
// @access  Public
router.get('/', (req, res) => {
    const data = { id: req._id };
    findAllCategory(data).then((_res) => {
        res.send(_res);
    }).catch((err) => {
        res.status(500).send(err);
    })
});


// @route   POST api/categorie/:id
// @desc    Delete A Categorie
// @access  Private
router.post('/', (req, res) => {
    const data = req.body;
    CreateCategory(data).then((_res) => {
        res.send(_res);
    }).catch((err) => {
        res.status(500).send(err);
    })
});

// @route   PUT api/categorie/:id
// @desc    Update A Categorie
// @access  Private
router.put('/', (req, res) => {
    const data = req.body;
    UpdateCategory(data).then((_res) => {
        res.send(_res);
    }).catch((err) => {
        res.status(500).send(err);
    })
});

// @route   GET api/categorie/:id
// @desc    GET A Categorie by Id
// @access  Private
router.get('/:id', auth, (req, res) => {
    const data = { id: req.params.id, society: req.society };
    findById(data).then((_res) => {
        res.send(_res);
    }).catch((err) => {
        res.status(500).send(err);
    })
});

// @route   DELETE api/categorie/:id
// @desc    Delete A Categorie
// @access  Private
router.delete('/:id', auth, (req, res) => {
    const data = { id: req.params.id, society: req.society };
    findByIdCategory(req.params.id).then((_res) => {
        if (_res.length === 0) {
            DeleteCategory(data).then((_res2) => {
                res.send(_res2);
            }).catch((err) => {
                res.status(500).send(err);
            })
        }
    }).catch((err) => {
        res.status(500).send(err);
    })
});

export default router;