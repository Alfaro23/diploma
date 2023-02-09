const connection = require('../db') // Получение подключения к базе-денных

function getReleases(callback) {
    connection.query(`SELECT * FROM releases`, (error, result, fields) => {
        if (error) callback(error, null)
        else callback(null, result)
    })
}

function getAllID(callback) {
    connection.query(`SELECT id FROM releases`, (error, result, fields) => {
        if (error) callback(error, null)
        else callback(null, result)
    })
}

function getReleaseByID(id, callback) {
    connection.query(
        `SELECT * FROM releases WHERE id = ?;`, [id],
        (error, result) => callback(error, result)
    )
}

function addRelease(release, callback) {
    const {
        id, translated_name, original_name, release_year,
        ongoing, description, image_url, episodes
    } = release
    connection.query(
        `INSERT INTO releases
         VALUE( ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            id, translated_name, original_name, release_year,
            ongoing, description, image_url, episodes
        ], (error, result) => callback(error)
    )
}

function deleteReleaseByID(id, callback) {
    connection.query(
        `DELETE FROM releases WHERE id = ?;`, [id],
        (error, result) => callback(error, result)
    )
}

// Экспортируемые операции для работы с релизами
module.exports = { getReleases, addRelease, getReleaseByID, deleteReleaseByID, getAllID }