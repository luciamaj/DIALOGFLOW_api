const dialogflow = require('dialogflow');
const { struct } = require('pb-util');  
const bodyParser = require('body-parser');

const projectId = 'provaapi-jrgakd';
const contextsClient = new dialogflow.ContextsClient({keyFilename: "new.json"});
const sessionClient = new dialogflow.SessionsClient({keyFilename: "new.json"});
const uuid = require('uuid');

async function sendMsg(msg) {
    const sessionId = uuid.v4();
    const responses = await sendQuery(sessionId, msg, {});

    console.log('Detected intent', responses[0].queryResult.outputContexts);
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
    client.emit('BOT_RESPONSE', result.fulfillmentText);

    if (result.intent) {
        console.log(`  Intent: ${result.intent.displayName}`);
    } else {
        console.log(`  No intent matched.`);
    }

    return result.fulfillmentText;
}