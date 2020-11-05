import {
    Get,
    Controller,
    Authorized,
} from "routing-controllers";
import { Inject } from "typedi";


@Controller("/general")
export default class GeneralController {

    // @Inject(type => SkuService)
    // skuService: SkuService;


    @Authorized()
    @Get("/helloworld")
    public async helloWorld(): Promise<any> {
        return "Hello World";
    }

}
