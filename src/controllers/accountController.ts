import {
    Get,
    Controller,
    Authorized,
    QueryParam,
} from "routing-controllers";
import { Inject } from "typedi";
import { AccountService } from "../services/accountService";


@Controller("/account")
export default class AccountController {

    @Inject(type => AccountService)
    accountService: AccountService;


    @Get("s")
    public async getAs(
        @QueryParam('days') days: number = 30,
        @QueryParam('bonusDays') bonusDays: number = 0,
        @QueryParam('page') page: number = 1,
        @QueryParam('pageSize') pageSize: number = 10000,
    ) {
        let conditions = {}
        let projection = { passwd: 0, _id: 0 };
        if (days) {
            conditions['$and'] = [
                {
                    'expiredAt':
                    {
                        $gte: new Date(),
                    }
                },
                {
                    'expiredAt':
                    {
                        $lt: new Date(Date.now() + (days + bonusDays) * 24 * 60 * 60 * 1000)
                    }
                },
            ]
        }
        let accounts = await this.accountService.findByPage(conditions, page, pageSize, projection)
        accounts = accounts.map(account => {
            account['left'] = Math.floor((account.expiredAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
            return account
        })
        return accounts
    }

    @Get('/updateAll')
    async updateAll() {
        this.accountService.updateAll();
        return 'updating'
    }

    @Get('/updateNewAccount')
    async updataAccounts() {
        const num = await this.accountService.updateAccounts()
        return num
    }

}
