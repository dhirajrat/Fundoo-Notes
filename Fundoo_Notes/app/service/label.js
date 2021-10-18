const labelModel = require('../models/label');
const redisClass = require('../utility/redis')
const redis = require('redis');

class Service {

    createLabel = (label) => {
        return new Promise((resolve, reject) => {
        labelModel.createLabel(label)
        .then((data) => {
            redisClass.clearCache();
            resolve(data)
        })
        .catch((error) => reject(error));
        })
    }

    getLabel =(id) => {
        return new Promise((resolve, reject) => {
            labelModel.getLabel(id).then((data) => {
                const rdata = JSON.stringify(data);
                console.log("31 rdata: ");
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
                console.log("31 rdata: ");
                redisClass.setDataInCache("label", 3600, rdata);
                resolve(data)
            })
            .catch((message) => {
                reject(message)
            })
        })
    }

    async updateLabelById(data){
        redisClass.clearCache();
        return await labelModel.updateLabelById(data)
    }

    async deleteLabelById(data){
        redisClass.clearCache();
        return await labelModel.deleteLabelById(data)
}
}
module.exports = new Service();