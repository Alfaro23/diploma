const connection = require('../db') // Получение подключения к базе-денных

function getCommentsByUserID(user_id, callback) { 
    connection.query(
        `SELECT * FROM comments WHERE user_id = ?;`, [user_id],
        (error, result) => callback(error, result)
    )
}

function getCommentsByReleaseID(release_id, callback) {
    connection.query(
        `SELECT * FROM comments WHERE release_id = ?;`, [release_id],
        (error, result) => callback(error, result)
    )
}

function addComment(comment, callback) {
    const { id, user_id, release_id, content } = comment
    connection.query(
        `INSERT INTO comments
         VALUE( ?, ?, ?, ? );`,
        [id, user_id, release_id, content],
        (error, result) => callback(error)
    )
}

function deleteCommentByID(id, callback) {
    connection.query(
        `DELETE FROM comments WHERE id = ?`, [id],
        (error, result) => callback(error, result)
    )
}

// Экспортируемые операции для работы с комментариями
module.exports = { getCommentsByReleaseID, getCommentsByUserID, deleteCommentByID, addComment }