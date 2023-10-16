const connection = require('../database/database');

function createTodo(todo, callback) {
    connection.query('INSERT INTO todos SET ?', todo, (error, results, fields) => {
        if (error) throw error;
        console.log('Record inserted');
        callback(results);
    });
}

module.exports = createTodo;