const connection = require('../database/database')

function updateTodo(id, updatedTodo, callback) {
    connection.query(
        'UPDATE todos SET ? WHERE id = ?',
        [updatedTodo, id],
        (error, results, fields) => {
            if (error) throw error;
            console.log('Record updated!');
            callback(results);
        }
    );
}

module.exports = updateTodo