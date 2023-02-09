const express = require('express')
const uuid = require('uuid')
const dao = require('../../dao/users')

const router = express.Router()

// Получть всех пользователей
router.get('/', (req, resp) => {
    console.log(`[${req.method}]: Получаем всех пользователей :3`)
    dao.getUsers((error, users) => {
        if (error) {
            console.log(`\tОшибка получения всех пользователей... ${error.message}`)
            resp.status(500).json(`Не получилось(( ${error.message}`)
        }
        else resp.json(users)
    })
})

// Получть пользователя по id
router.get('/:id', (req, resp) => {
    const target = req.params.id
    console.log(`[${req.method}]: Ищем пользователя с id: ${target}`)

    dao.getUserByID(target, (error, users) => {
        if (error) {
            console.log(`\tОшибка при поиске пользователя с id: ${target}... ${error.message}`)
            resp.status(500).json(`Не получилось(( ${error.message}`)
        }
        else {
            if (users.length == 0)
                resp.status(404).json({message: `Прости, братик, пользователь с id: ${target} не найден...`})
            else resp.json(users[0])
        }
    })
})

// Получть пользователя по нику
router.get('/nickname/:nickname', (req, resp) => {
    const target = req.params.nickname
    console.log(`[${req.method}]: Ищем пользователя с ником: ${target}`)

    dao.getUserByNickName(target, (error, users) => {
        if (error) {
            console.log(`\tОшибка при поиске пользователя с ником: ${target}... ${error.message}`)
            resp.status(500).json(`Не получилось(( ${error.message}`)
        }
        else {
            if (users.length == 0)
                resp.status(404).json({message: `Прости, братик, пользователь с ником: ${target} не найден...`})
            else resp.json(users[0])
        }
    })
})

// Добавить нового пользователя
router.post('/', (req, resp) => {
    const user = { ...req.body, id: uuid.v4() }
    console.log(`[${req.method}]: Добавление пользователя: ${user.nickname}!`)

    dao.addUser(user, error => {
        console.log(error
            ? `\tОшибка при добавлении пользователя :( ${error.message}`
            : `\tПользователь добавлен!`
        )
        if (error) resp.status(500).json(error)
        else resp.status(201).json({success: `Пользователь с ником ${user.nickname} создан!`})
    })
})

// Удалить пользователя по ID
router.delete('/:id', (req, resp) => {
    const target = req.params.id
    console.log(`[${req.method}]: Удаляем пользователя с id: ${target}`)

    dao.deleteUserByID(target, (error, result) => {
        if (error) {
            console.log(`\tОшибка при удалении пользователя с id: ${target}... ${error.message}`)
            resp.status(500).json(`Не получилось(( ${error.message}`)
        }
        else {
            if (result.affectedRows > 0)
                resp.json({message: `Пользователя с id: ${target} больше не существует X_X`})
            else resp.status(404).json({message: `Прости, братик, пользователь с id: ${target} не существует...`})
        }
    })
})

module.exports = router