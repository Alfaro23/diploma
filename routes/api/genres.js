const express = require('express')
const uuid = require('uuid')
const dao = require('../../dao/genres')

const router = express.Router()

// Получть все жанры
router.get('/', (req, resp) => {
    console.log(`[${req.method}]: Получаем все жанры :3`)
    dao.getGenres((error, genres) => {
        if (error) {
            console.log(`\tОшибка получения всех жанров... ${error.message}`)
            resp.status(500).json(`Не получилось(( ${error.message}`)
        }
        else resp.json(genres)
    })
})

// Добавить новый жанр
router.post('/', (req, resp) => {
    const genre = { ...req.body, id: uuid.v4() }
    console.log(`[${req.method}]: Добавление жанра: ${genre.name}!`)

    dao.addGenre(genre, error => {
        console.log(error
            ? `\tОшибка при добавлении жанра :( ${error.message}`
            : `\tЖанр добавлен!`
        )
        if (error) resp.status(500).json(error)
        else resp.status(201).json({success: `Жанр ${genre.name} создан!`})
    })
})

// Удалить жанр по ID
router.delete('/:id', (req, resp) => {
    const target = req.params.id
    console.log(`[${req.method}]: Удаляем жанр с id: ${target}`)

    dao.deleteGenreByID(target, (error, result) => {
        if (error) {
            console.log(`\tОшибка при удалении жанра с id: ${target}... ${error.message}`)
            resp.status(500).json(`Не получилось(( ${error.message}`)
        }
        else {
            if (result.affectedRows > 0)
                resp.json({message: `Жанра с id: ${target} больше не существует, он удален`})
            else resp.status(404).json({message: `Прости, братик, жанра с id: ${target} не существует...`})
        }
    })
})

// Добавить жанр релизу
router.post('/release', (req, resp) => {
    const {release_id, genre_id} = req.body
    console.log(`[${req.method}]: Добавляем жанр к релизу с id: ${release_id}`)

    dao.addGenreToRelease(release_id, genre_id, error => {
        console.log(error
            ? `\tОшибка при добавлении жанра релизу :( ${error.message}`
            : `\tЖанр добавлен релизу с id: ${release_id}!`
        )
        if (error) resp.status(500).json(error)
        else resp.status(202).json({success: `Жанр с id: ${genre_id} добавлен релизу с id: ${release_id}!`})
    })
})

// Получить жанры по id релиза
router.get('/release/:id', (req, resp) => {
    const target = req.params.id
    console.log(`[${req.method}]: Получаем жанры релиза с id: ${target} :3`)

    dao.getGenresByReleaseID(target, (error, genres) => {
        if (error) {
            console.log(`\tОшибка получения жанров релиза с id: ${target} ... ${error.message}`)
            resp.status(500).json(`Не получилось(( ${error.message}`)
        }
        else {
            if (genres.length == 0)
                resp.status(404).json({message: `Прости, братик, жанры у релиза с id: ${target} отсутствуют...`})
            else resp.json(genres)
        }
    })
})

// Удалить жанр из релиза
router.put('/release', (req, resp) => {
    const {release_id, genre_id} = req.body
    console.log(`[${req.method}]: Удаляем жанр с id: ${genre_id} из релиза с id: ${release_id}`)

    dao.deleteGenreFromRelease(release_id, genre_id, (error, result) => {
        if (error) {
            console.log(`\tОшибка при удалении жанра с id: ${genre_id} из релиза с id: ${release_id}... ${error.message}`)
            resp.status(500).json(`Не получилось(( ${error.message}`)
        }
        else {
            if (result.affectedRows > 0)
                resp.json({message: `Жанра с id: ${genre_id} удален из релиза с id: ${release_id}`})
            else resp.status(404).json({message: `Прости, братик, жанра с id: ${genre_id} у релиза с id: ${release_id} отсутствует...`})
        }
    })
})

module.exports = router