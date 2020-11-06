import {
    Get,
    Controller,
    Authorized,
    QueryParam,
    Post,
    Body,
} from "routing-controllers";
import { Inject } from "typedi";
import { Order } from "../entities/orderEntity";
import { AccountService } from "../services/accountService";
import { OrderService } from "../services/orderService";


@Controller("/order")
export default class OrderController {

    @Inject(type => OrderService)
    orderService: OrderService;

    @Inject(type => AccountService)
    accountService: AccountService;


    @Post('/')
    async create(
        @Body() body: Order,
    ) {
        const account = await this.accountService.findOne({ username: body.account })
        if (!account) {
            throw new Error('账号不存在')
        }
        body.total = body.days * body.pricePd
        return await this.orderService.create(body);
    }

    @Get('s')
    async getOrders(
        @QueryParam('page') page: number = 1,
        @QueryParam('pageSize') pageSize: number = 10,
        @QueryParam('keyword') keyword: string = '',
    ) {
        let conditions = {}
        if (keyword) {
            conditions['$or'] = [
                {
                    guest: { $regex: keyword }
                },
                {
                    desc: { $regex: keyword }
                },
                {
                    account: { $regex: keyword }
                }
            ]
        }
        let orders = await this.orderService.findByPage(conditions, page, pageSize, null, { createdAt: -1 })
        console.log(orders)
        return orders
    }

    @Get('/')
    async getOrder(
        @QueryParam('orderId') orderId: string,
    ) {
        const order = await this.orderService.findOne({ orderId })
        return order
    }

}
