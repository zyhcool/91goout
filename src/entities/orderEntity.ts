
import mongoose from "mongoose"
import getUUid from "../utils/uuidGenerator";

export class Order {
    orderId: string;
    account: string;
    guest: string;
    days: number;
    pricePd: number;
    total: number;
    desc: string;

    constructor() {
        this.orderId = getUUid()
    }
}

type OrderDocument = mongoose.Document & Order;

const orderSchema = new mongoose.Schema({
    orderId: String,
    account: String,
    guest: String,
    days: Number,
    pricePd: Number,
    total: Number,
    desc: String,
}, { timestamps: true })

export const orderRepository = mongoose.model<OrderDocument>("Order", orderSchema)
