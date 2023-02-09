const express = require('express')
const uuid    = require('uuid')
const dao     = require('../dao/users')

const router = express.Router()

// Обработка запроса регистрации
router.post('/register', (req, resp) => {
    const user = { ...req.body, id: uuid.v4() }
    
    dao.getUserByNickName(user.nickname, (error, users) => {
        if (error) {
            console.log(`\tОшибка при поиске пользователя с ником: ${user.nickname}... ${error.message}`)
            resp.status(500).json(`Не получилось(( ${error.message}`)
        }
        else {
            if (users.length == 0) {
                dao.addUser(user, error => {
                    console.log(error
                        ? `\tОшибка при добавлении пользователя :( ${error.message}`
                        : `\tПользователь добавлен!`
                    )
                    if (error) resp.status(500).json(error)
                    else resp.status(201).json({ id: user.id })
                })
            }
            else resp.status(400).json({message: `Прости, братик, пользователь с ником: ${user.nickname} уже существует...`})
        }
    })
})

// Обработка запроса аутентификации
router.post('/login', (req, resp) => {
    const { nickname, pass_hash } = req.body
    
    dao.getUserByNickName(nickname, (error, users) => {
        if (error) {
            console.log(`\tОшибка при поиске пользователя с ником: ${nickname}... ${error.message}`)
            resp.status(500).json(`Не получилось(( ${error.message}`)
        }
        else {
            if (users.length == 0)
                resp.status(404).json({message: `Прости, братик, пользователь с ником: ${nickname} не найден...`})
            else {
                if (pass_hash == users[0].pass_hash) resp.json({ id: users[0].id })
                else resp.status(400).json({message: `Прости, братик, но введеный тобой пароль не подходит...`})
            }
        }
    })
})

module.exports = router