const api = 'http://localhost:5000/api'
const ID = document.location.href.substring(document.location.href.indexOf('?') + 4)
const container = document.getElementById('container')

async function loadRelease() {
    let resp = await fetch(`${api}/releases/${ID}`)
    let release = undefined
    if (resp.ok) {
        release = await resp.json()

        resp = await fetch(`${api}/genres/release/${ID}`)
        release.genres = (!resp.ok) ? [] : await resp.json()

        resp = await fetch(`${api}/voicers/release/${ID}`)
        release.voicers = (!resp.ok) ? [] : await resp.json()

        resp = await fetch(`${api}/comments/release/${ID}`)
        release.comments = (!resp.ok) ? [] : await resp.json()

        return release
    }

    else if (resp.status == 404) {
        alert((await resp.json()).message)
        document.location = './releases.html'
    }
    else {
        alert((await resp.json()).sqlMessage)
        document.location = './releases.html'
    }
}

async function showRelease() {
    container.innerHTML = ''

    const release = await loadRelease()

    const image = document.createElement('img')
    image.src = release.image_url

    const translatedName = document.createElement('h1')
    translatedName.innerText = release.translated_name
    translatedName.style.width = '60%'

    const originalName = document.createElement('h2')
    originalName.innerText = release.original_name

    const genres = document.createElement('span')
    genres.innerHTML = `<b>Жанры:</b> ${release.genres.map(g => g.name).join(', ')}`

    const voicers = document.createElement('span')
    voicers.innerHTML = `<b>Актеры озвучки:</b> ${release.voicers.map(v => v.nickname).join(', ')}`

    const year = document.createElement('span')
    year.innerHTML = `<b>Год выхода:</b> ${release.release_year}`

    const ongoing = document.createElement('span')
    ongoing.innerHTML = `<b><u>${release.ongoing ? 'Еще выходит' : 'Вышли все серии'}!</u></b>`

    const info = document.createElement('span')
    info.innerText = release.description

    const player = document.createElement('div')
    //player.innerText = 'Плеер еще в работе! Ожидайте...'
    player.id = 'player'

    container.appendChild(image)
    container.appendChild(translatedName)
    container.appendChild(document.createElement('br'))
    container.appendChild(originalName)
    container.appendChild(document.createElement('br'))
    container.appendChild(genres)
    container.appendChild(document.createElement('br'))
    container.appendChild(voicers)
    container.appendChild(document.createElement('br'))
    container.appendChild(year)
    container.appendChild(document.createElement('br'))
    container.appendChild(ongoing)
    container.appendChild(document.createElement('br'))
    container.appendChild(info)
    container.appendChild(player)

    if (getCookie('UserID') && getCookie('UserName')) {
        const userID = getCookie('UserID')
        const commentForm = document.createElement('input')
        commentForm.placeholder = 'Оставьте свой коментарий!'
        container.appendChild(commentForm)

        const sendButton = document.createElement('button')
        sendButton.innerText = '>Отправить'
        sendButton.addEventListener('click', async event => {
            const text = commentForm.value
            if (text.length == 0) return alert('Нельзя отправлять пустые комментарии!')

            const headers = new Headers()
            headers.set('Content-Type', 'application/json')
            await fetch(`${api}/comments`, {
                method: 'post',
                headers: headers,
                body: JSON.stringify({
                    user_id: userID,
                    release_id: ID,
                    content: text
                })
            })
            document.location.reload()
        })
        container.appendChild(sendButton)
    }

    if (release.comments.length > 0) {
        const commentsBlock = document.createElement('div')
        commentsBlock.style.cssFloat = 'left'
        commentsBlock.style.paddingTop = '20px'

        release.comments.forEach(async c => {
            const resp = await fetch(`${api}/users/${c.user_id}`)
            const data = await resp.json()

            const div = document.createElement('div')
            div.style.overflow = 'hidden'
            div.style.width = "80%"
            div.innerHTML += `<img class="avatar" src="${data.image_url}"> <h2>@${data.nickname}</h2>\n`
            div.innerHTML += `<span class="comment">${c.content}</span> <br>\n`
            commentsBlock.appendChild(div)
        })
        container.appendChild(commentsBlock)
    }

    
     if (release.original_name == "Vinland Saga") {
        let play = new Playerjs({
            id: 'player',
            poster: "./player_back.jpg",
            file:
                [{ "title": "Vinland Saga", "folder": Vinland_Saga }]
        })
    } else if (release.original_name == "Beastars") {
        let play = new Playerjs({
            id: 'player',
            poster: "./player_back.jpg",
            file:
                [{ "title": "Beastars", "folder": Beastars }]
        })
    }

}