export default {
    env: process.env.NODE_ENV || "local",
    clientUrl: process.env.VUE_APP_CLIENT_URL || "https://127.0.0.1:8080",
    serverUrl: process.env.VUE_APP_SERVER_URL || "https://127.0.0.1:3000",
    clientId: process.env.VUE_APP_CLIENT_ID || "481318809056-v7u1644mckbkhllsr6hi6igflsp3ag52.apps.googleusercontent.com",
}