const connection = require('../db') // Получение подключения к базе-денных

function getGenres(callback) {
    connection.query(`SELECT * FROM genres;`, (error, result, fields) => {
        if (error) callback(error, null)
        else callback(null, result)
    })
}

function addGenre(genre, callback) {
    const { id, name } = genre
    connection.query(
        `INSERT INTO genres
         VALUE( ?, ? );`, [id, name],
        (error, result) => callback(error)
    )
}

function deleteGenreByID(id, callback) {
    connection.query(
        `DELETE FROM genres WHERE id = ?;`, [id],
        (error, result) => callback(error, result)
    )
}

function addGenreToRelease(release_id, genre_id, callback) {
    connection.query(
        `INSERT INTO release_genres
         VALUE (?, ?);`, [release_id, genre_id],
        (error, result) => callback(error)
    )
}

function getGenresByReleaseID(release_id, callback) {
    connection.query(
        `SELECT id, name FROM genres
         INNER JOIN release_genres
         ON genres.id = release_genres.genre_id
         WHERE release_genres.release_id = ?;`,
        [release_id], (error, result) => callback(error, result)
    )
}

function deleteGenreFromRelease(release_id, genre_id, callback) {
    connection.query(
        `DELETE FROM release_genres
         WHERE release_id = ? AND genre_id = ?`,
        [release_id, genre_id],
        (error, result) => callback(error, result)
    )
}

// Экспортируемые операции для работы с жанрами
module.exports = {
    getGenres,
    addGenre,
    deleteGenreByID,
    addGenreToRelease,
    getGenresByReleaseID,
    deleteGenreFromRelease
}