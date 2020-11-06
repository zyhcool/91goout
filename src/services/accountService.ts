import axios from 'axios'
import cheerio from 'cheerio'

import { Account, accountRepository } from "../entities/accountEntity";
import { BaseService } from "./baseService"


export class AccountService extends BaseService<Account>{
    repository = accountRepository

    async getAccount(username: string) {
        const passwd = '123456'
        let res = await axios.post('http://www.91goout.com/auth/login', {
            email: username,
            passwd,
        })

        // res.data.ret === 1 为true才说明账号存在
        if (res.data.ret === 1) {
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
    }

    async updateAll() {
        for (let i = 0; i < 10 ** 3; i++) {
            const username = `${i}@qq.com`
            const account = await this.getAccount(username)
            if (!account) {
                continue;
            }
            console.log(account.username)
            await this.saveOrCreate(account, ['username'])
        }
    }

    async updateAccounts() {
        let newAccount = 0;
        for (let i = 0; i < 10 ** 3; i++) {
            const username = `${i}@qq.com`
            // 数据是否已经存在
            const exist = await this.repository.exists({ username })
            if (exist) {
                continue;
            }
            const account = await this.getAccount(username)
            if (!account) {
                continue;
            }
            console.log(account)
            newAccount++
            await this.saveOrCreate(account, ['username'])
        }
        return newAccount
    }
}