const express = require('express');
const router = express.Router();
const query = require('../dbconnect')

router.get('/', async (req, res) => {
    await query.GetAllData('*', 'wpa_keys').then(data => {
        res.json(data)
    })
})



module.exports = router;