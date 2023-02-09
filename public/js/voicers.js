const container = document.getElementById('container')
const addButton = document.getElementById('addButton')

const url = 'http://localhost:5000/api/voicers'

addButton.addEventListener('click', async event => {
    const text = document.getElementById('textField').value
    if (text.length > 0) {
        const headers = new Headers()
        headers.append('Content-Type', 'application/json')
        const resp = await fetch(url, {
            method: 'post', headers: headers,
            body: JSON.stringify({ nickname: text })
        })
        const msg  = await resp.json()
        alert((resp.status < 300)
            ? `^_^/\n${msg.success}`
            : `ОШИБКА:\n${msg.sqlMessage}`
        )
    }

    else alert('Братик, пожалуйста введи ник актера озвучки <3')
    update()
})

async function loadVoicers() {
    const resp = await fetch(url)
    return resp.json()
}

function drawVoicers(voicers) {
    voicers.forEach(voicer => {
        const block = document.createElement('div')
        const id = document.createElement('span')
        const del = document.createElement('span')
        const nickname = document.createElement('h2')

        id.innerHTML = `<b>id:</b> ${voicer.id}`
        del.classList.add('del-btn')
        del.innerText = 'X'
        del.addEventListener('click', async event => {
            const resp = await fetch(`${url}/${voicer.id}`, { method: 'delete' })
            const msg = await resp.json()
            if (resp.status == 500) alert(`ОШИБКА:\n${msg.sqlMessage}`)
            else alert(msg.message)
            update()
        })
        nickname.innerText = voicer.nickname

        block.appendChild(id)
        block.appendChild(del)
        block.appendChild(nickname)
        container.appendChild(block)
    });
}

async function update() {
    container.innerHTML = ''
    const voicers = await loadVoicers()
    drawVoicers(voicers)
}