const connection = require('../db') // Получение подключения к базе-денных

function getUsers(callback) {
    connection.query(`SELECT * FROM users`, (error, result, fields) => {
        if (error) callback(error, null)
        else callback(null, result)
    })
}

function getUserByID(id, callback) {
    connection.query(
        `SELECT * FROM users WHERE id = ?`, [id],
        (error, result) => callback(error, result)
    )
}

function getUserByNickName(nickname, callback) {
    connection.query(
        `SELECT * FROM users WHERE nickname = ?`, [nickname],
        (error, result) => callback(error, result)
    )
}

function addUser(user, callback) {
    const { id, nickname, pass_hash, image_url } = user
    connection.query(
        `INSERT INTO users
         VALUE( ?, ?, ?, ? )`,
        [id, nickname, pass_hash, image_url],
        (error, result) => callback(error)
    )
}

function deleteUserByID(id, callback) {
    connection.query(
        `DELETE FROM users WHERE id = ?`, [id],
        (error, result) => callback(error, result)
    )
}

// Экспортируемые операции для работы с пользователями
module.exports = { getUsers, addUser, getUserByID, deleteUserByID, getUserByNickName }