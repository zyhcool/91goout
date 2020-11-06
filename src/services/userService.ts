import axios from 'axios'
import cheerio from 'cheerio'
import { User, userRepository } from '../entities/userEntity'

import { BaseService } from "./baseService"


export class UserService extends BaseService<User>{
    repository = userRepository

}