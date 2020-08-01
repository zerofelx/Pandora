var mysql = require('mysql');

function ConectarDB() {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'usuario',
        password: 'password',
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


function InsertData(pass1, pass2) {
    var connection = ConectarDB();
    return new Promise((resolve, reject) => {
        var query = connection.query(`
        INSERT INTO wpa_keys VALUES ('${pass1}', '${pass2}')
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
                    reject('Error en la consulta')
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

module.exports.InsertData = InsertData;
module.exports.GetSelectData = GetSelectData;
module.exports.GetAllData = GetAllData;
module.exports.DeleteData = DeleteData;
