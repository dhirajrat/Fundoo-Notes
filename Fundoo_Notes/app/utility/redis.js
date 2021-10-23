const redis = require('redis');
const client = redis.createClient(process.env.REDIS_PORT);

class Redis {

    /**
     * check Cache For Notes
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    checkCacheNote = (req, res, next) => {
        client.get(req.params.id, (error, data) => {
            if(error) {
                logger.error("Some error occured while retriving data", error)
            }
            if(data !== null) {
                // if(JSON.parse(data)._id == req.params.id){
                    data = JSON.parse(data);
                    res.send({success: true, message: "Note Retrieved redis !", data: data});
                // } else {
                //     next();
                // }
            } else {
                next();
            }
        });
    }

    /**
     * Check Cache For Label
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    checkCacheLabel = (req, res, next) => {
        client.get(req.params.id, (error, data) => {
            console.log("l 53");
            if(error) {
                logger.error("Some error occured while retriving data", error)
            }
            if(data !== null) {
                if(JSON.parse(data)._id == req.params.id){
                    console.log("l 60: "+JSON.parse(data)._id);
                const rdata = JSON.parse(data);
                res.send({success: true, message: "Label Retrieved redis !", data: rdata});
                } else {
                    next();
                }
            } else {
                next();
            }
        });
    }

    /**
     * Clear Cache for given Key
     * @param {*} key 
     */
    clearCache(key) {
        client.del(key);
        console.log('Cache is cleared!')
    }

    /**
     * Set Data
     * @param {*} key 
     * @param {*} time 
     * @param {*} value 
     */
    setDataInCache(key, time, value) {
        client.SETEX(key, time, value);
   }
}

module.exports = new Redis();