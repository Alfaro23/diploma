document.getElementById('random-release').addEventListener('click', async event => {
    const resp = await fetch('http://localhost:5000/api/releases/ids')
    const data = await resp.json()

    if (data.length == 0) {
        alert('Прости, братик, но на сайте еще нет релизов :(')
        document.location.href = 'http://localhost:5000/index.html'
    }
    
    document.location.href = `http://localhost:5000/show.html?id=${data[Math.floor(Math.random() * data.length)].id}`
})