/**
 * Config constant - Replace values below.
 */

const config = {
    API_KEY: "<YOUR_API_KEY>",
    API_SECRET: "<YOUR_API_SECRET>",
    APPLICATION_ID: "<YOUR_APPLICATION_ID>",
    PRIVATE_KEY: "private.key",
    TO_NUMBER: "<YOUR_TO_NUMBER>",
    FROM_NUMBER: "<YOUR_FROM_NUMBER>",
    PORT: 3000,
    TIMEOUT: 180*1000 // 180 seconds
};

/**
 * Nexmo NodeJS client configuration
 */
const Nexmo = require('nexmo');
const nexmo = new Nexmo({
    apiKey: config.API_KEY,
    apiSecret: config.API_SECRET,
    applicationId: config.APPLICATION_ID,
    privateKey: config.PRIVATE_KEY
}, {debug: false}); // Leave debug: true to showcase all information.

nexmo.channel.send(
    { "type": "sms", "number": config.FROM_NUMBER },
    { "type": "sms", "number": config.TO_NUMBER },
    {
        "content": {
            "type": "text",
            "text": "This is a confirmation for your order. Please send a response back in " + (config.TIMEOUT/1000).toString() + " seconds or get MMS back."
        }
    },
    (err, data) => { console.log(data.message_uuid); }
);

// Determines whether an MMS is sent or not
var mmsFlag = true;

/**
 * Define server variables and parameters
 */
const app = require('express')();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * POST method to handle incoming SMS message
 */
app.post('/webhooks/inbound-message', (req, res) => {
    console.log(req.body);
    console.log("MMS flag has been set. MMS will not be sent");
    mmsFlag = false;
    res.status(200).end();
});

/**
 * Function inside setTimeout function.
 * The function will be initiated after the timeout has been reached.
 * In the meantime, if the application receives an SMS, the mmsFlag is set to false and no MMS will be sent.
 */
setTimeout(function(){
    if(!mmsFlag) {
        console.log("Deadline expired, message not received before the deadline.")
    } else if (mmsFlag) {
        console.log("Deadline expired and message received, sending MMS.");
        nexmo.channel.send(
            { "type": "sms", "number": config.FROM_NUMBER },
            { "type": "sms", "number": config.TO_NUMBER }, // "MMS only supported in US"
            {
                "content": {
                    "type": "image",
                    "image": { "url": "https://www.newmorninggallerync.com/wp-content/uploads/2015/01/small-package.jpg" }
                }
            },
            (err, data) => {
            console.log("Deadline expired and message not received, sending MMS.");
            console.log(data.message_uuid); }
        );
    }
}, config.TIMEOUT);

/**
 * Initialize the Express server with the predefined port
 */
var port = config.PORT;
app.listen(port, () => console.log(`Server started using port ${port}`));
