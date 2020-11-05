import mongoose from "mongoose"
import { Config } from "../config";
import { logger } from "../logger";
import bluebird from "bluebird"

export async function dbConnect() {

    const mongodbUrl = Config.databaseUrl
    mongoose.Promise = bluebird
    mongoose.connect(mongodbUrl, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    }).then(() => {
        console.log('mongodb success')
    }).catch(err => {
        console.log(err)
    })
}
