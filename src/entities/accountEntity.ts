
import mongoose from "mongoose"

export class Account {
    username: string;
    passwd: string;
    expiredAt: Date;
}

type AccountDocument = mongoose.Document & Account;

const accountSchema = new mongoose.Schema({
    username: String,
    passwd: String,
    expiredAt: Date,
}, { timestamps: true })

export const accountRepository = mongoose.model<AccountDocument>("Account", accountSchema)
