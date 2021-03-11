const redis = require('redis');
const { makeMessage } = require('./data');

const client = redis.createClient({
    host: '127.0.0.1',
    port: 6379,    
});

const modClient = redis.createClient({
    host: '127.0.0.1',
    port: 6379,    
});

client.on('error', err => {
    console.log('Error ' + err);
});

const cartId = 'b4a3be83-4969-4d8b-9c7f-d1138e7ee1c8'
const lMsgKey = `carts.${cartId}.messages`


const TOTAL_LOAD = 1e6;
const BATCH_LOAD = 1e4;

push()

async function push() {
    for (let i = 0; i < TOTAL_LOAD; i+=BATCH_LOAD) {         
        client.rpush(lMsgKey, [...Array(BATCH_LOAD).keys()].map(makeMessage))
        await delay(500);
        //modClient.rpush(lMsgKey, [...Array(BATCH_LOAD).keys()].map(makeMessage))
        console.log(`[${Date.now()}] ${i+BATCH_LOAD}/${TOTAL_LOAD} test messages added`);        
    }
}

modClient.rpush(lMsgKey, [...Array(1).keys()].map(makeMessage))
client.watch(lMsgKey, function(watchError) {
    if (watchError) throw watchError;
    popAll();
});

function popAll() {
    client.multi()
          .lrange(lMsgKey, 0, -1)
          .del(lMsgKey)
          .exec(function(execError, results) {
            if (execError) throw err;

            /**
             * If results === null, it means that a concurrent client
             * changed the key while we were processing it and thus
             * the execution of the MULTI command was not performed.
             *
             * NOTICE: Failing an execution of MULTI is not considered
             * an error. So you will have err === null and results === null
             */
            if (results === null) {
                console.log("transaction aborted because results were null");
              } else {
                console.log("transaction worked and returned", results[0]);
              }
       
          })
}

function delay(ms) { return new Promise(resolve => setTimeout(resolve, ms)) }