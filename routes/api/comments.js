const express = require('express')
const uuid = require('uuid')
const dao = require('../../dao/comments')

const router = express.Router()

// Получть комментарии по id пользователя
router.get('/user/:id', (req, resp) => {
    const target = req.params.id
    console.log(`[${req.method}]: Ищем комментарии пользователя с id: ${target}`)

    dao.getCommentsByUserID(target, (error, comments) => {
        if (error) {
            console.log(`\tОшибка при поиске комментариев пользователя с id: ${target}... ${error.message}`)
            resp.status(500).json(`Не получилось(( ${error.message}`)
        }
        else {
            if (comments.length == 0)
                resp.status(404).json({message: `Прости, братик, комментариев пользователя с id: ${target} не найдено...`})
            else resp.json(comments)
        }
    })
})

// Получть комментарии по id релиза
router.get('/release/:id', (req, resp) => {
    const target = req.params.id
    console.log(`[${req.method}]: Ищем комментарии релиза с id: ${target}`)

    dao.getCommentsByReleaseID(target, (error, comments) => {
        if (error) {
            console.log(`\tОшибка при поиске комментариев релиза с id: ${target}... ${error.message}`)
            resp.status(500).json(`Не получилось(( ${error.message}`)
        }
        else {
            if (comments.length == 0)
                resp.status(404).json({message: `Прости, братик, комментариев релиза с id: ${target} не найдено...`})
            else resp.json(comments)
        }
    })
})

// Добавить новый комментарий
router.post('/', (req, resp) => {
    const comment = { ...req.body, id: uuid.v4() }
    console.log(`[${req.method}]: Добавление комментария: ${comment.content}!`)

    dao.addComment(comment, error => {
        console.log(error
            ? `\tОшибка при добавлении комментария :( ${error.message}`
            : `\tКомментарий добавлен!`
        )
        if (error) resp.status(500).json(error)
        else resp.status(201).json({success: `Комментарий ${comment.content} создан!`})
    })
})

// Удалить комментарий по ID
router.delete('/:id', (req, resp) => {
    const target = req.params.id
    console.log(`[${req.method}]: Удаляем комментарий с id: ${target}`)

    dao.deleteCommentByID(target, (error, result) => {
        if (error) {
            console.log(`\tОшибка при удалении комментария с id: ${target}... ${error.message}`)
            resp.status(500).json(`Не получилось(( ${error.message}`)
        }
        else {
            if (result.affectedRows > 0)
                resp.json({message: `Комментарий с id: ${target} больше не существует, он удален`})
            else resp.status(404).json({message: `Прости, братик, комментарий с id: ${target} не существует...`})
        }
    })
})

module.exports = router