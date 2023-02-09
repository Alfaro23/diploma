const container = document.getElementById('container')
const addButton = document.getElementById('addButton')

const url = 'http://localhost:5000/api/genres'

addButton.addEventListener('click', async event => {
    const text = document.getElementById('textField').value
    if (text.length > 0) {
        const headers = new Headers()
        headers.append('Content-Type', 'application/json')
        const resp = await fetch(url, {
            method: 'post', headers: headers,
            body: JSON.stringify({ name: text })
        })
        const msg  = await resp.json()
        alert((resp.status < 300)
            ? `^_^/\n${msg.success}`
            : `ОШИБКА:\n${msg.sqlMessage}`
        )
    }

    else alert('Братик, пожалуйста введи название жанра <3')
    update()
})

async function loadGenres() {
    const resp = await fetch(url)
    return resp.json()
}

function drawGenres(genres) {
    genres.forEach(genre => {
        const block = document.createElement('div')
        const id = document.createElement('span')
        const del = document.createElement('span')
        const name = document.createElement('h2')

        id.innerHTML = `<b>id:</b> ${genre.id}`
        del.classList.add('del-btn')
        del.innerText = 'X'
        del.addEventListener('click', async event => {
            const resp = await fetch(`${url}/${genre.id}`, { method: 'delete' })
            const msg = await resp.json()
            if (resp.status == 500) alert(`ОШИБКА:\n${msg.sqlMessage}`)
            else alert(msg.message)
            update()
        })
        name.innerText = genre.name

        block.appendChild(id)
        block.appendChild(del)
        block.appendChild(name)
        container.appendChild(block)
    });
}

async function update() {
    container.innerHTML = ''
    const genres = await loadGenres()
    drawGenres(genres)
}