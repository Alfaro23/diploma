const logIN    = document.getElementById('login-btn')
const logOUT   = document.getElementById('logout-btn')
const nickTEXT = document.getElementById('nick-text')

function getCookie(name) {
    const matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

logOUT.addEventListener('click', event => {
    document.cookie = `UserID=NONE; max-age=-1`
    document.cookie = `UserName=NONE; max-age=-1`
    document.location.reload()
})

if (getCookie('UserID') && getCookie('UserName')) {
    logIN.style.display = 'none'
    nickTEXT.innerHTML =  `@<i>${getCookie('UserName')}</i>`
}

else {
    logOUT.style.display = 'none'
    nickTEXT.style.display = 'none'
}