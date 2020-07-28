var mysql = require('mysql');

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

function InsertData(pass1, pass2) {
    var query = connection.query(`
    INSERT INTO wpa_keys VALUES ('${pass1}', '${pass2}')
    `, function(err) {
        if(err) {
            return false
        } else {
            return true
        }
    })
}

function GetSelectData(data, table, where) {
    return new Promise((solve, reject) => {
        var query = connection.query(`SELECT ${data} FROM ${table} WHERE ${where}`, (err, result) => {
            if(err) {
                reject('Error en la consulta || ', + data + table + where)
            } else {
                var resultado = result;
                if(resultado.length > 0) {
                    solve(resultado)
                } else {
                    reject('Error en la consulta')
                }
            }
        })
    })
}

// GetSelectData('*', 'wpa_keys', `password1='test1'`)
//     .then(data => console.log(data))
//     .catch(err => console.log(err))

function GetAllData(data, table) {
    var query = connection.query(`SELECT ${data} FROM ${table}`, (err, result) => {
        if(err) {
            throw err;
        } else {
            var resultado = result;
            if(resultado.length > 0) {
                // console.log(resultado)
                return resultado
            } else {
                console.log('Error en la consulta')
                return false
            }
        }
    })
}

function DeleteData(table, where) {
    var query = connection.query(`DELETE FROM ${table} WHERE ${where}`, (err) => {
        if(err) {
            throw err;
        } else {
            console.log('Datos eliminados correctamente')
            return true
        }
    })
}

connection.end()

module.exports.InsertData = InsertData;
module.exports.GetSelectData = GetSelectData;
module.exports.GetAllData = GetAllData;
module.exports.DeleteData = DeleteData;