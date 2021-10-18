const redis = require('redis');
const client = redis.createClient(process.env.REDIS_PORT);

class Redis {
    checkCacheNotes = (req, res, next) => {
        client.get("notes", (error, data) => {
            if(error) {
                logger.error("Some error occured while retriving data", error)
            }
            if(data !== null) {
                data = JSON.parse(data);
                res.send({success: true, message: "Notes Retrieved redis !", data: data});
            }else {
                next();
            }
        });
    }

    checkCacheNote = (req, res, next) => {
        client.get("note", (error, data) => {
            if(error) {
                logger.error("Some error occured while retriving data", error)
            }
            if(data !== null && JSON.parse(data)[0]._id == req.params.id) {
                data = JSON.parse(data);
                res.send({success: true, message: "Note Retrieved redis !", data: data});
            } else {
                next();
            }
        });
    }

    checkCacheLabels = (req, res, next) => {
        client.get("labels", (error, data) => {
            if(error) {
                logger.error("Some error occured while retriving data", error)
            }
            if(data !== null) {
                data = JSON.parse(data);
                res.send({success: true, message: "labels Retrieved redis !", data: data});
            }else {
                next();
            }
        });
    }

    checkCacheLabel = (req, res, next) => {
        client.get("label", (error, data) => {
            if(error) {
                logger.error("Some error occured while retriving data", error)
            }
            if(data !== null && JSON.parse(data)[0]._id == req.params.id) {
                const rdata = JSON.parse(data);
                res.send({success: true, message: "Label Retrieved redis !", data: rdata});
            } else {
                next();
            }
        });
    }

    clearCache() {
        client.flushall();
        console.log('Cache is cleared!')
    }

    setDataInCache(key, time, value) {
        client.SETEX(key, time, value);
   }
}

module.exports = new Redis();