import {
    Get,
    Controller,
    Authorized,
    QueryParam,
} from "routing-controllers";
import { Inject } from "typedi";
import { OrderService } from "../services/orderService";


@Controller("/order")
export default class OrderController {

    @Inject(type => OrderService)
    orderService: OrderService;


}
