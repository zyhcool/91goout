import jwt from "jsonwebtoken";
import {
    Get,
    Controller,
    Authorized,
    QueryParam,
    Post,
    BodyParam,
} from "routing-controllers";
import { Inject } from "typedi";
import { UserService } from "../services/userService";


@Controller("/user")
export default class UserController {

    @Inject(type => UserService)
    userService: UserService;

    @Get('s')
    async users() {
        return await this.userService.find({});
    }

    @Post('/register')
    async register(
        @BodyParam('username') username: string,
        @BodyParam('passwd') passwd: string,
        @BodyParam('permissions') permissions: Array<string>,
    ) {
        return await this.userService.create({ username, passwd, permissions })
    }

    @Post('/login')
    async login(
        @BodyParam('username') username: string,
        @BodyParam('passwd') passwd: string,
    ) {
        const user = await this.userService.findOne({ username }, { passwd: 0 });
        if (!user) {
            throw new Error('账号不存在')
        }
        if (user.passwd !== passwd) {
            throw new Error('密码错误')
        }
        let token = jwt.sign({
            username,
            passwd,
        }, "fakesecret", { expiresIn: '48h' })
        return {
            token, ...user
        }
    }

}
