import axios from 'axios'
import cheerio from 'cheerio'

import { Order, orderRepository } from '../entities/orderEntity';
import { BaseService } from "./baseService"


export class OrderService extends BaseService<Order>{
    repository = orderRepository

}