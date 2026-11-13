// 环境说明：
// - 本地开发（vite dev，5173）：前端在 5173，接口在 8000，需要跨域，后端已配 CORS。
// - 线上部署（npm run build 后由 Django 托管）：前端与接口同源，留空即可。
// 用 Vite 自带的 import.meta.env.DEV 自动判断，不用再手改 platform。

const isDev = import.meta.env.DEV

const CONFIG_API = {
    HTTP_URL: isDev ? 'http://127.0.0.1:8000' : '',
    VAD_URL: '',
}

export default CONFIG_API
