var mysql = require('mysql');
var reader = require('./important_data/reader');
const { json } = require('express');

// Declarar información de la red
let essid = ""
let bssid = ""
let model = ""

reader.ReadJsonFile('wireless_data')
    .then(res => {
        essid = res.ESSID 
        bssid = res.BSSID
        model = res.Model
    })

function ConectarDB() {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'usuario',
        password: 'contraseña',
        database: 'pandora',
        port: 3306 
    })
    
    connection.connect(function(err){
        if(err) {
            throw err;
        } else {
            console.log('Conexión Correcta')
        }
    }) 
    return connection
}

function InsertData(table, pass1, pass2) {
    var connection = ConectarDB();
    return new Promise((resolve, reject) => {
        var query = connection.query(`
        INSERT INTO ${table} 
        (ESSID, BSSID, psw1, psw2, model) 
        VALUES ('${essid}', '${bssid}', '${pass1}', '${pass2}', '${model}')
        `, function(err) {
            if(err) {
                reject('Error en la consulta')
            } else {
                resolve('Datos ingresados correctamente')
            }
        })
        connection.end()
    })
}

function GetSelectData(data, table, where) {
    var connection = ConectarDB();
    return new Promise((solve, reject) => {
        var query = connection.query(`SELECT ${data} FROM ${table} WHERE ${where}`, (err, result) => {
            if(err) {
                reject('Error en la consulta || ', + data + table + where)
            } else {
                var resultado = result;
                if(resultado.length > 0) {
                    solve(resultado)
                } else {
                    reject('No existen datos con estas condiciones')
                }
            }
        })
        connection.end()
    })
}

function GetAllData(data, table) {
    var connection = ConectarDB();
    return new Promise((resolve, reject) => {
        var query = connection.query(`SELECT ${data} FROM ${table}`, (err, result) => {
            if(err) {
                reject('Error en la consulta')
            } else {
                var resultado = result;
                if(resultado.length > 0) {
                    resolve(resultado)
                } else {
                    reject('No hay resultados para mostrar')
                }
            }
        })
        connection.end()
    })
}

function DeleteData(table, where) {
    var connection = ConectarDB();
    return new Promise((resolve, reject) => {
        var query = connection.query(`DELETE FROM ${table} WHERE ${where}`, (err) => {
            if(err) {
                reject('Error al eliminar los datos')
            } else {
                resolve('Datos eliminados correctamente')
            }
        })
        connection.end()
    })
}

function UpdateData(table, data, where) {
    var connection = ConectarDB();
    return new Promise((resolve, reject) => {
        var query = connection.query(`UPDATE ${table} SET ${data} WHERE ${where}`, (err) => {
            if(err) {
                reject('Error al actualizar los datos')
            } else {
                resolve('Datos actualizados correctamente')
            }
        })
        connection.end()
    })
}

module.exports.InsertData = InsertData;
module.exports.GetSelectData = GetSelectData;
module.exports.GetAllData = GetAllData;
module.exports.DeleteData = DeleteData;
module.exports.UpdateData = UpdateData;
