const express = require('express');
const router = express.Router();
const query = require('../dbconnect')

router.get('/', async (req, res) => {
    var passwords = await query.GetAllData('*', 'wpa_keys')
    res.json(passwords)
})

router.post('/', async (req, res) => {
    console.log(req.body)
})

module.exports = router;