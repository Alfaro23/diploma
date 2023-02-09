function generateHash(password) {
  let hash = 0
  if (password.length === 0) return hash;
  for (let i = 0; i < password.length; i++) {
      const character = password.charCodeAt(i)
      hash  = ((hash << 5) - hash) + character
      hash |= 0
  }
  return hash
}

function getFormData() {
    return {
        nickname: document.getElementById('nick').value,
        password: document.getElementById('pass').value,
        imageURL: document.getElementById('img').value,
    }
}

function validateForm(nickname, password, imageURL) {
    if (nickname.length == 0) {
        alert('Введите свой логин!')
        return false
    }
    if (password.length == 0) {
        alert('Введите свой пароль!')
        return false
    }
    if (imageURL != undefined && imageURL.length == 0)
    {
        alert('Укажите URL своего аватара!')
        return false
    }
    return true
}

document.getElementById('register').addEventListener('click', event => {
    document.getElementById('img').style.display = event.toElement.checked
        ? 'unset'
        : 'none'
})

document.getElementById('log-in').addEventListener('click', async event => {
    const { nickname, password, imageURL } = getFormData()
    const headers = new Headers()

    headers.set('Content-Type', 'application/json')
    if (document.getElementById('register').checked) {
        if (validateForm(nickname, password, imageURL)) {
            const resp = await fetch('http://localhost:5000/auth/register', {
                method: 'post',
                headers: headers,
                body: JSON.stringify({
                    nickname: nickname,
                    pass_hash: generateHash(password),
                    image_url: imageURL
                })
            })

            if (resp.status == 500) {
                alert(`ОШИБКА: ${(await resp.json()).sqlMessage}`)
            } else if (resp.status == 400) {
                alert(`ОШИБКА: ${(await resp.json()).message}`)
            } else {
                const data = await resp.json()
                document.cookie = `UserID=${data.id}; max-age=${60 *5}`
                document.cookie = `UserName=${nickname}; max-age=${60 *5}`
                document.location.href = 'http://localhost:5000/index.html'
            }
        }
    }

    else if (validateForm(nickname, password)) {
        const resp = await fetch('http://localhost:5000/auth/login', {
            method: 'post',
            headers: headers,
            body: JSON.stringify({
                nickname: nickname,
                pass_hash: generateHash(password),
            })
        })

        if (resp.status == 500) {
            alert(`ОШИБКА: ${(await resp.json()).sqlMessage}`)
        } else if (resp.status >= 400) {
            alert(`ОШИБКА: ${(await resp.json()).message}`)
        } else {
            const data = await resp.json()
            document.cookie = `UserID=${data.id}; max-age=${60 *5}`
            document.cookie = `UserName=${nickname}; max-age=${60 *5}`
            document.location.href = 'http://localhost:5000/index.html'
        }
    }
})
