const amqp = require('amqplib/callback_api');

class RabitMq {
    sender = (data,queue) => {
        amqp.connect('amqp://localhost', (error, connection) => {
            if (error) {
                throw error;
            } else {
                connection.createChannel((error, channel) => {
                    if (error) {
                        throw error;
                    } else {
                        const tt = JSON.stringify(data);
                        channel.assertQueue(queue);
                        channel.sendToQueue(queue, Buffer.from(tt));
                        console.log("data sent");
                    }
                })
            }
        })
    }

    receiver = (queue) => {
        return new Promise((resolve, reject)=>{
            amqp.connect('amqp://localhost', (error, connection) => {
                if (error) {
                    throw error;
                } else {
                    connection.createChannel((error, channel) => {
                        if (error) {
                            throw error;
                        } else {
                            console.log("mq: ");
                            channel.assertQueue(queue);
                            channel.consume(queue, (msg) => {
                                // console.log("in receiver ",msg.content.toString());
                                console.log("37 mq: ",msg.content.toString());
                                resolve(msg.content.toString())
                            })
                        }
                    })
                }
            })
        })
    }
}


// const rab = new RabitMq();

// const dt = {
//     fName: "miraj",
//     lName: "Rathod",
//     email: "jam@mail.com"
// }

// rab.sender(dt,dt.email);
// async function getres(){
// const res = await rab.receiver(dt.email);
// console.log(res);
// }

// getres();

// rab.receiver('mandeep.test1996@gmail.com').then((val)=>{console.log("ttt: ",val);}).catch(()=>{console.log('failed');})


module.exports = new RabitMq();