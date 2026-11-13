const platform = 'cloud'  //vue. django. cloud

const CONFIG_API = {
    HTTP_URL: '',
    VAD_URL: '',
}

if (platform === 'vue') {
    CONFIG_API.HTTP_URL = 'http://127.0.0.1:8000'
    CONFIG_API.VAD_URL = ''
} else if (platform === 'django') {
    CONFIG_API.HTTP_URL = 'http://127.0.0.1:8000'
    CONFIG_API.VAD_URL = ''
} else if (platform === 'cloud') {
    CONFIG_API.HTTP_URL = ''  // 同源，http/https 都可用
    CONFIG_API.VAD_URL = ''
}

export default CONFIG_API
