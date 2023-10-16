const connection = require('../database/database')


function deleteTodo(id, callback) {
    connection.query('DELETE FROM todos WHERE id = ?', [id], (error, results, fields) => {
        if (error) throw error;
        console.log('Record deleted!');
        callback(results);
    });
}

module.exports = deleteTodo;