const container = document.getElementById('container')
const addButton = document.getElementById('addButton')

const url = 'http://localhost:5000/api/users'

async function loadUsers() {
    const resp = await fetch(url)
    return resp.json()
}

function drawUsers(users) {
    users.forEach(user => {
        const block = document.createElement('div')
        const id = document.createElement('span')
        const pass = document.createElement('span')
        const link = document.createElement('a')
        const img = document.createElement('img')
        const del = document.createElement('span')
        const nickname = document.createElement('h2')

        id.innerHTML = `<b>id:</b> ${user.id}`
        pass.innerHTML = `<b>Хэш-пароля:</b> ${user.pass_hash}`
        del.classList.add('del-btn')
        del.innerText = 'X'
        del.addEventListener('click', async event => {
            const resp = await fetch(`${url}/${user.id}`, { method: 'delete' })
            const msg = await resp.json()
            if (resp.status == 500) alert(`ОШИБКА:\n${msg.sqlMessage}`)
            else alert(msg.message)
            update()
        })
        nickname.innerText = user.nickname
        link.href = user.image_url
        img.src = user.image_url

        link.appendChild(img)
        block.appendChild(del)
        block.appendChild(link)
        block.appendChild(id)
        block.appendChild(document.createElement('br'))
        block.appendChild(pass)
        block.appendChild(document.createElement('br'))
        block.appendChild(nickname)
        container.appendChild(block)
    });
}

async function update() {
    container.innerHTML = ''
    const users = await loadUsers()
    drawUsers(users)
}