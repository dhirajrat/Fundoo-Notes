const labelModel = require('../models/label');
const redisClass = require('../utility/redis')

class Service {

    /**
     * Create Label
     * @param {*} label 
     * @returns 
     */
    createLabel = (label) => {
        return new Promise((resolve, reject) => {
        labelModel.createLabel(label)
        .then((data) => {
            resolve(data)
        })
        .catch((error) => reject(error));
        })
    }

    /**
     * Get All Label
     * @param {*} id 
     * @returns 
     */
    getLabel =(id) => {
        return new Promise((resolve, reject) => {
            labelModel.getLabel(id).then((data) => {
                resolve(data);
            })
            .catch((err) => { reject(err); });
        })
    }

    /**
     * Get Label by ID
     * @param {*} ids 
     * @returns 
     */
    getLabelById = (ids) => {
        return new Promise((resolve, reject) => {
            labelModel.getLabelById(ids)
            .then((data) => {
                const rdata = JSON.stringify(data);
                redisClass.setDataInCache(data.id, 3600, rdata);
                resolve(data)
            })
            .catch((message) => {
                reject(message)
            })
        })
    }

    /**
     * Update Label by ID
     * @param {*} data 
     * @returns 
     */
    async updateLabelById(data){
        const result = await labelModel.updateLabelById(data)
        if(result){
            redisClass.clearCache(result.id);
        }
        return result;
    }

    /**
     * Delete Label
     * @param {*} data 
     * @returns 
     */
    async deleteLabelById(data){
        const result = await labelModel.deleteLabelById(data)
        if(result){
            redisClass.clearCache(result.id);
        }
        return result;
    }
}
module.exports = new Service();