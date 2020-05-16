/* eslint-disable */
import * as uuid from 'uuid';
import AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();

export function main(event, context, callback) {
  // request is written and passed as a JSON encoded string in 'event.body'
  const data=JSON.parse(event.body);

  const params = {
    TableName: process.env.tablename,

    Item: {
      noteId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: Date.now(),
    },
  };

  dynamodb.put(params, (error, data) => {
    // set response to enable the cors.
    // so it will be accessible (Cross origin resource sharing)
    const headers ={
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    };

    // returns the value of 500 if error occurs
    if (error) {
      const response= {
        statuscode: 500,
        headers: headers,
        body: JSON.stringify({status: false}),
      };
      callback(null, response);
      return;
    }

    // returns the value of 200 if success :)

    const response ={
      statuscode: 200,
      headers: headers,
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
}
