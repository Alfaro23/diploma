const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
// const session = require('express-session')

// Конфигурация и создание Express-приложения
const app = express()
dotenv.config()

// Установка директории для статических ресурсов
app.use(express.static(path.join(__dirname, 'public')))

// Установка middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Установка роутеров
app.use('/api/users', require('./routes/api/users'))
app.use('/api/genres', require('./routes/api/genres'))
app.use('/api/voicers', require('./routes/api/voicers'))
app.use('/api/releases', require('./routes/api/releases'))
app.use('/api/comments', require('./routes/api/comments'))
app.use('/auth', require('./routes/auth'))

// Конфигурация и запуск сервера
const PORT = process.env.SERVER_PORT
app.listen(PORT, () => {
    console.log(`Сервер работает на порту: [${PORT}]  ^_^/`)
})