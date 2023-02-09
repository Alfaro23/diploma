const express = require('express')
const uuid = require('uuid')
const dao = require('../../dao/releases')

const router = express.Router()

// Получть все релизы
router.get('/', (req, resp) => {
    console.log(`[${req.method}]: Получаем все релизы :3`)
    dao.getReleases((error, releases) => {
        if (error) {
            console.log(`\tОшибка получения всех релизов... ${error.message}`)
            resp.status(500).json(`Не получилось(( ${error.message}`)
        }
        else resp.json(releases)
    })
})

// Получть id всех релизов
router.get('/ids/', (req, resp) => {
    console.log(`[${req.method}]: Получаем id всех релизов :3`)
    dao.getAllID((error, releases) => {
        if (error) {
            console.log(`\tОшибка получения id всех релизов... ${error.message}`)
            resp.status(500).json(`Не получилось(( ${error.message}`)
        }
        else resp.json(releases)
    })
})

// Получть релиз по id
router.get('/:id', (req, resp) => {
    const target = req.params.id
    console.log(`[${req.method}]: Ищем релиз с id: ${target}`)

    dao.getReleaseByID(target, (error, release) => {
        if (error) {
            console.log(`\tОшибка при поиске релиза с id: ${target}... ${error.message}`)
            resp.status(500).json(`Не получилось(( ${error.message}`)
        }
        else {
            if (release.length == 0)
                resp.status(404).json({message: `Прости, братик, релиз с id: ${target} не найден...`})
            else resp.json(release[0])
        }
    })
})

// Добавить новый релиз
router.post('/', (req, resp) => {
    const release = { ...req.body, id: uuid.v4() }
    console.log(`[${req.method}]: Добавление релиза: ${release.translated_name}!`)

    dao.addRelease(release, error => {
        console.log(error
            ? `\tОшибка при добавлении релиза :( ${error.message}`
            : `\tРелиз добавлен!`
        )
        if (error) resp.status(500).json(error)
        else resp.status(201).json({id: release.id})
    })
})

// Удалить релиз по ID
router.delete('/:id', (req, resp) => {
    const target = req.params.id
    console.log(`[${req.method}]: Удаляем релиз с id: ${target}`)

    dao.deleteReleaseByID(target, (error, result) => {
        if (error) {
            console.log(`\tОшибка при удалении релиза с id: ${target}... ${error.message}`)
            resp.status(500).json(`Не получилось(( ${error.message}`)
        }
        else {
            if (result.affectedRows > 0)
                resp.json({message: `Релиз с id: ${target} больше не существует, он удален`})
            else resp.status(404).json({message: `Прости, братик, релиз с id: ${target} не существует...`})
        }
    })
})

module.exports = router