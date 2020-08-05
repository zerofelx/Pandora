const fs = require('fs');
const { json } = require('express');

function ReadFile(filename) {
    return new Promise((resolve, reject) => {
        fs.readFile(__dirname + '/' + filename, 'utf-8', (err, data) => {
            if(err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

function ReadJsonFile(filename) {
    return new Promise((resolve, reject) => {
        ReadFile(filename + '.json')
            .then(res => {
                var data = JSON.parse(res)
                resolve(data)
            })
            .catch(err => {
                reject(err)
        })
    })
}

// ReadJsonFile('wifi_data.json')
//     .then(res => {
//         console.log(res)
//     })
//     .catch(err => {
//         console.log(err)
//     })


module.exports.ReadFile = ReadFile;
module.exports.ReadJsonFile = ReadJsonFile;