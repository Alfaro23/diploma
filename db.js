const mysql = require('mysql2')

// Подключение к базе данных
const connection = mysql.createConnection({
    host:     process.env.DB_HOST,
    user:     process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS
})

// Лог успешности подключения
connection.connect(error => {
    console.log(error
        ? `Оооо неееееет... Ошибка подключения к базе данных: ${error.message}`
        : 'Подключение к базе данных успешно установлено :3'
    )
})

// Экспорт подключения для использования во внешних файлах
module.exports = connection