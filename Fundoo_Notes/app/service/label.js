const labelModel = require('../models/label');

class Service {

    createLabel = (label) => {
        return new Promise((resolve, reject) => {
        labelModel.createLabel(label)
        .then((data) => resolve(data))
        .catch((error) => reject(error));
        })
    }

    getLabel =(id) => {
        return new Promise((resolve, reject) => {
            labelModel.getLabel(id).then((data) => { resolve(data); })
            .catch((err) => { reject(err); });
        })
    }

    getLabelById = (ids) => {
        return new Promise((resolve, reject) => {
            labelModel.getLabelById(ids)
            .then((data) => {
                resolve(data)
            })
            .catch((message) => {
                reject(message)
            })
        })
    }

    async updateLabelById(data){
            return await labelModel.updateLabelById(data)
    }

    async deleteLabelById(data){
        return await labelModel.deleteLabelById(data)
}
}
module.exports = new Service();