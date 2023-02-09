const connection = require('../db') // Получение подключения к базе-денных

function getVoicers(callback) {
    connection.query(`SELECT * FROM voicers`, (error, result, fields) => {
        if (error) callback(error, null)
        else callback(null, result)
    })
}

function addVoicer(voicer, callback) {
    const {id, nickname } = voicer
    connection.query(
        `INSERT INTO voicers
         VALUE (?, ?);`,
        [id, nickname],  (error, result) => callback(error)
    )
}

function deleteVoicerByID(id, callback) {
    connection.query(
        `DELETE FROM voicers WHERE id = ?`, [id],
        (error, result) => callback(error, result)
    )
}

function addVoicerToRelease(release_id, voicer_id, callback) {
    connection.query(
        `INSERT INTO release_voicers
         VALUE (?, ?)`, [release_id, voicer_id],
        (error, result) => callback(error)
    )
}

function getVoicersByReleaseID(release_id, callback) {
    connection.query(
        `SELECT id, nickname FROM voicers
         INNER JOIN release_voicers
         ON voicers.id = release_voicers.voicer_id
         WHERE release_voicers.release_id = ?`, [release_id],
        (error, result) => callback(error, result)
    )
}

function deleteVoicerFromRelease(release_id, voicer_id, callback) {
    connection.query(
        `DELETE FROM release_voicers
         WHERE release_id = ?
            AND voicer_id = ?`,
        [release_id, voicer_id],
        (error, result) => callback(error, result)
    )
}

// Экспортируемые операции для работы с актерами озвучки
module.exports = {
    getVoicers,
    addVoicer,
    deleteVoicerByID,
    addVoicerToRelease,
    getVoicersByReleaseID,
    deleteVoicerFromRelease
}