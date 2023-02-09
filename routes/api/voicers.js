const express = require('express')
const uuid = require('uuid')
const dao = require('../../dao/voicers')

const router = express.Router()

// Получть всех актеров озвучки
router.get('/', (req, resp) => {
    console.log(`[${req.method}]: Получаем всех актеров озвучки :3`)
    dao.getVoicers((error, voicers) => {
        if (error) {
            console.log(`\tОшибка получения всех актеров озвучки... ${error.message}`)
            resp.status(500).json(`Не получилось(( ${error.message}`)
        }
        else resp.json(voicers)
    })
})

// Добавить нового актера озвучки
router.post('/', (req, resp) => {
    const voicer = { ...req.body, id: uuid.v4() }
    console.log(`[${req.method}]: Добавление актера озвучки: ${voicer.nickname}!`)

    dao.addVoicer(voicer, error => {
        console.log(error
            ? `\tОшибка при добавлении актера озвучки :( ${error.message}`
            : `\tАктер добавлен!`
        )
        if (error) resp.status(500).json(error)
        else resp.status(201).json({success: `Актер озвучки ${voicer.nickname} создан!`})
    })
})

// Удалить актера озвучки по ID
router.delete('/:id', (req, resp) => {
    const target = req.params.id
    console.log(`[${req.method}]: Удаляем актера озвучки с id: ${target}`)

    dao.deleteVoicerByID(target, (error, result) => {
        if (error) {
            console.log(`\tОшибка при удалении актера озвучки с id: ${target}... ${error.message}`)
            resp.status(500).json(`Не получилось(( ${error.message}`)
        }
        else {
            if (result.affectedRows > 0)
                resp.json({message: `Актера озвучки с id: ${target} больше не существует, X_X`})
            else resp.status(404).json({message: `Прости, братик, актера озвучки с id: ${target} не существует...`})
        }
    })
})

// Добавить актера озвучки релизу
router.post('/release', (req, resp) => {
    const {release_id, voicer_id} = req.body
    console.log(`[${req.method}]: Добавляем актера озвучки к релизу с id: ${release_id}`)

    dao.addVoicerToRelease(release_id, voicer_id, error => {
        console.log(error
            ? `\tОшибка при добавлении актера озвучки релизу :( ${error.message}`
            : `\tАктер озвучки добавлен релизу с id: ${release_id}!`
        )
        if (error) resp.status(500).json(error)
        else resp.status(202).json({success: `Актер озвучки с id: ${voicer_id} добавлен релизу с id: ${release_id}!`})
    })
})

// Получить актеров озвучки по id релиза
router.get('/release/:id', (req, resp) => {
    const target = req.params.id
    console.log(`[${req.method}]: Получаем актеров озвучки релиза с id: ${target} :3`)

    dao.getVoicersByReleaseID(target, (error, voicers) => {
        if (error) {
            console.log(`\tОшибка получения актеров озвучки релиза с id: ${target} ... ${error.message}`)
            resp.status(500).json(`Не получилось(( ${error.message}`)
        }
        else {
            if (voicers.length == 0)
                resp.status(404).json({message: `Прости, братик, актеры озвучки у релиза с id: ${target} отсутствуют...`})
            else resp.json(voicers)
        }
        
    })
})

// Удалить актера озвучки из релиза
router.put('/release', (req, resp) => {
    console.log(req.body)
    const {release_id, voicer_id} = req.body
    console.log(`[${req.method}]: Удаляем актера озвучки с id: ${voicer_id} из релиза с id: ${release_id}`)

    dao.deleteVoicerFromRelease(release_id, voicer_id, (error, result) => {
        if (error) {
            console.log(`\tОшибка при удалении актера озвучки с id: ${voicer_id} из релиза с id: ${release_id}... ${error.message}`)
            resp.status(500).json(`Не получилось(( ${error.message}`)
        }
        else {
            if (result.affectedRows > 0)
                resp.json({message: `Актер озвучки с id: ${voicer_id} удален из релиза с id: ${release_id}`})
            else resp.status(404).json({message: `Прости, братик, актера озвучки с id: ${voicer_id} у релиза с id: ${release_id} не существует...`})
        }
    })
})

module.exports = router