import { Document, Model } from "mongoose";


export abstract class BaseService<T> {
    abstract repository: Model<T & Document>

    async find(condition, projection?, options?) {
        return await this.repository.find(condition, projection, options).lean();
    }

    async findOne(condition, projection?, options?) {
        return await this.repository.findOne(condition, projection, options).lean();
    }

    async findByPage(condition, page, pageSize, projection?, sort?) {
        const res = await this.repository.find(condition, projection).limit(pageSize).skip((page - 1) * pageSize).sort(sort).lean();
        return res
    }

    async create(data) {
        return await this.repository.create(data)
    }

    async update(conditions: any, doc: any) {
        return await this.repository.update(conditions, doc);
    }

    async saveOrCreate(doc, filterFields: Array<string>) {
        const conditions = {}
        filterFields.forEach(field => {
            conditions[field] = doc[field];
        })
        return await this.repository.update(conditions, doc, { upsert: true })
    }
}
