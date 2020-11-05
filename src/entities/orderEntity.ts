
import mongoose from "mongoose"

export class Order {
    account: string;
    guest: string;
    days: number;
    pricePd: number;
    total: number;
}

type OrderDocument = mongoose.Document & Order;

const orderSchema = new mongoose.Schema({
    account: String,
    guest: String,
    days: Number,
    pricePd: Number,
    total: Number,
}, { timestamps: true })

export const orderRepository = mongoose.model<OrderDocument>("Order", orderSchema)
