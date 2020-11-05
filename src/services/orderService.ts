import axios from 'axios'
import cheerio from 'cheerio'

import { Account, accountRepository } from "../entities/accountEntity";
import { BaseService } from "./baseService"


export class OrderService extends BaseService<Account>{
    repository = accountRepository

}