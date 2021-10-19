const labelModel = require('../models/label');
const redisClass = require('../utility/redis')

class Service {

    createLabel = (label) => {
        return new Promise((resolve, reject) => {
        labelModel.createLabel(label)
        .then((data) => {
            const rdata = JSON.stringify(data);
            redisClass.setDataInCache("label", 3600, rdata);
            resolve(data)
        })
        .catch((error) => reject(error));
        })
    }

    getLabel =(id) => {
        return new Promise((resolve, reject) => {
            labelModel.getLabel(id).then((data) => {
                const rdata = JSON.stringify(data);
                redisClass.setDataInCache("labels", 3600, rdata);
                resolve(data);
            })
            .catch((err) => { reject(err); });
        })
    }

    getLabelById = (ids) => {
        return new Promise((resolve, reject) => {
            labelModel.getLabelById(ids)
            .then((data) => {
                const rdata = JSON.stringify(data);
                redisClass.setDataInCache("label", 3600, rdata);
                resolve(data)
            })
            .catch((message) => {
                reject(message)
            })
        })
    }

    async updateLabelById(data){
        // const rdata = JSON.stringify(data);
        // redisClass.setDataInCache("label", 3600, rdata);
        // return await labelModel.updateLabelById(data)


        const result = await labelModel.updateLabelById(data)
        if(result){
            const rdata = JSON.stringify(result);
            redisClass.setDataInCache("label", 3600, rdata);
        }
        return result;
    }

    async deleteLabelById(data){
        const result = await labelModel.deleteLabelById(data)
        if(result){
            redisClass.clearCache();
        }
        return result;
}
}
module.exports = new Service();