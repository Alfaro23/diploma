const api = 'http://localhost:5000/api'
const container  = document.getElementById('container')

async function loadReleases() {
    const resp = await fetch(`${api}/releases`)
    return resp.json()
}

async function showReleases() {

    [... await loadReleases()].forEach(release => {
        const link = document.createElement('a')
        link.href  = `./show.html?id=${release.id}`

        const image = document.createElement('img')
        image.src   = release.image_url

        const block = document.createElement('div')
        const name = document.createElement('h1')
        name.innerText = release.translated_name
        const info = document.createElement('span')
        info.innerText = `${release.description.substring(0, 150)}...`

        block.appendChild(name)
        block.appendChild(info)
        link.appendChild(image)
        link.appendChild(block)
        container.appendChild(link)        
    })
}