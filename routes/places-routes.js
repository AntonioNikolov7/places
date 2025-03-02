const express = require('express');

const router = express.Router();

const MockPlaces = [
    {
        id: 'p1',
        title: 'Mock Place',
        description: 'Mock Place Description',
        location: {
            lat: '42.35588',
            long: '40.35588'
        },
        address: 'Mock address',
        creator: 'u1'
    }
]
router.get('/:pid', (req, res) => {
    res.json(MockPlaces.find(p => p.id === req.params.pid))
})

router.get('/user/:uid', (req, res) => {
    res.json(MockPlaces.filter(p => p.creator === req.params.uid))
})

module.exports = router;