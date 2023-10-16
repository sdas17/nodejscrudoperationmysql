const connection = require('../database/database')

function getTodos(callback) {
    connection.query('SELECT * FROM todos', (error, results, fields) => {
        if (error) throw error;
        callback(results);
    });
}

module.exports = getTodos;