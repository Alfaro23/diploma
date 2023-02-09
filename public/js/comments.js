document.getElementById('button').addEventListener('click', async event => {
    const text = document.getElementById('textInput').value
    if (text.length > 0) {
        
        const resp = await fetch(`http://localhost:5000/api/comments/${text}`, {
            method: 'delete'
        })

        const result = await resp.json()
        if (resp.status == 500) alert(`ОШИБКА!\n${result.sqlMessage}`)
        else {
            alert(result.message)
            document.getElementById('textInput').value = ''
        }
    }
 
    else alert('Братик, пожалуйста введи ID комментария для удаления <3')
})
