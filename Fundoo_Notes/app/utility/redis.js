const redis = require('redis');
const client = redis.createClient(process.env.REDIS_PORT);

class Redis {

    checkCacheNote = (req, res, next) => {
        client.get("noteid", (error, data) => {
            if(error) {
                logger.error("Some error occured while retriving data", error)
            }
            if(data !== null) {
                if(JSON.parse(data)._id == req.params.id){
                    data = JSON.parse(data);
                    res.send({success: true, message: "Note Retrieved redis !", data: data});
                } else {
                    next();
                }
            } else {
                next();
            }
        });
    }

    checkCacheLabel = (req, res, next) => {
        client.get("label", (error, data) => {
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

    clearCache() {
        client.del(key);
        console.log('Cache is cleared!')
    }

    setDataInCache(key, time, value) {
        client.SETEX(key, time, value);
   }
}

module.exports = new Redis();