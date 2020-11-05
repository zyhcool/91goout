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
        @QueryParam('days') days: number,
        @QueryParam('bonusDays') bonusDays: number = 0,
        @QueryParam('page') page: number = 1,
        @QueryParam('pageSize') pageSize: number = 10,
    ) {
        let conditions = {}
        let projection = { passwd: 0 };
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
        const accounts = await this.accountService.findByPage(conditions, page, pageSize, projection)
        return accounts
    }

    @Get('/updateAll')
    async updateAll() {
        this.accountService.updateAll();
        return 'updating'
    }

    @Get('/updateNewAccount')
    async updataAccounts() {
        this.accountService.updateAccounts()
        return 'updating'
    }

}
