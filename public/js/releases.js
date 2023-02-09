const api = 'http://localhost:5000/api'
const genreSelector  = document.getElementById('genre_selector')
const voicerSelector = document.getElementById('voicer_selector')
const releasesList   = document.getElementById('releases_list')

async function loadGenres() {
    const resp = await fetch(`${api}/genres`)
    return resp.json()
}

async function loadVoicers() {
    const resp = await fetch(`${api}/voicers`)
    return resp.json()
}

async function loadReleases() {
    const resp = await fetch(`${api}/releases`)
    return resp.json()
}

let selectedGenres = []
document.getElementById('add_genre').addEventListener('click', event => {
    const genres = document.getElementById('genres_list')
    const current = genreSelector.options[genreSelector.selectedIndex]

    if (selectedGenres.includes(current.value)) {
        alert('Жанры не должны повторятся!!!')
        return
    }

    const newElem = document.createElement('li')
    newElem.innerText = current.innerText
    selectedGenres.push(current.value)
    genres.appendChild(newElem)
})

let selectedVoicers = []
document.getElementById('add_voicer').addEventListener('click', event => {
    const voicers = document.getElementById('voicers_list')
    const current = voicerSelector.options[voicerSelector.selectedIndex]

    if (selectedVoicers.includes(current.value)) {
        alert('Актеры озвучки не должны повторятся!!!')
        return
    }

    const newElem = document.createElement('li')
    newElem.innerText = current.innerText
    selectedVoicers.push(current.value)
    voicers.appendChild(newElem)
})

async function init() {
    [...await loadGenres()].forEach(genre => {
        const option = document.createElement('option')
        option.value = genre.id
        option.innerText = genre.name
        genreSelector.appendChild(option)
    });

    [...await loadVoicers()].forEach(voicer => {
        const option = document.createElement('option')
        option.value = voicer.id
        option.innerText = voicer.nickname
        voicerSelector.appendChild(option)
    });

    
}

async function update() {
    releasesList.innerHTML = '';
    [...await loadReleases()].forEach(release => {
        const item  = document.createElement('li')
        const cross = document.createElement('div')
        item.innerText = release.translated_name
        cross.innerText = 'x'

        cross.addEventListener('click', async event => {
            const resp = await fetch(
                `${api}/releases/${release.id}`,
                { method: 'delete' }
            )
            if (resp.status == 200) {
                alert(`Релиз ${release.translated_name} успешно удален ^_^/`)            
                update()
            }
        })

        item.appendChild(cross)
        releasesList.appendChild(item)
    });
}

const getFormData = () => {
    return {
        translated_name: document.getElementById('translated_name').value,
        original_name: document.getElementById('original_name').value,
        release_year:  parseInt(document.getElementById('release_year').value),
        ongoing:   document.getElementById('release_ongoing').checked,
        description:   document.getElementById('description').value,
        image_url: document.getElementById('image_url').value,
        episodes:  parseInt(document.getElementById('release_episodes').value)
    }
}

function isValid(r) {
    return r.translated_name.length > 0 && 
           r.original_name.length > 0 &&
           r.release_year && r.episodes &&
           r.description.length > 0 &&
           r.image_url.length > 0
}

document.getElementById('send-btn').addEventListener('click', async event => {
    if (selectedVoicers.length == 0 || selectedGenres.length == 0)
    {
        alert('Выберите актеров озвучки и жанры релиза!!!')
        return
    }

    const release = getFormData()
    if (isValid(release)) {
        let headers = new Headers()
        headers.append('Content-Type', 'application/json')
        const resp = await fetch(`${api}/releases`, {
            method: 'post', headers: headers,
            body: JSON.stringify(release)
        })
        const result = await resp.json()
        if (resp.status == 201) {
            release_id = result.id

            selectedGenres.forEach(genre_id => fetch(`${api}/genres/release/`, {
                method: 'post', headers: headers,
                body: JSON.stringify({ release_id, genre_id })
            }))

            selectedVoicers.forEach(voicer_id => fetch(`${api}/voicers/release/`, {
                method: 'post', headers: headers,
                body: JSON.stringify({ release_id, voicer_id })
            }))

            alert(`Релиз ${release.translated_name} успешно добавлен <3`)
            await update()
        } 
        else alert(`ОШИБКА:\n${result.sqlMessage}`)
    }
    else alert('Заполните все поля!!!')  
})