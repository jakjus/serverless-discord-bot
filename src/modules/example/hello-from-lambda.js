/**
 * A Lambda function that replies to interaction with static string
 */

const axios = require('axios').default;

exports.data = {
  name: 'hello',
  type: 1,
  description: 'replies with hello world.'
}

exports.handler = async (event) => {
  const body = JSON.parse(event.Records[0].Sns.Message)
  // May do something here with body
  // Body contains Discord command details
  let response = {
    "content": "Hello from Lambda!"
  }

  await axios.patch(`https://discord.com/api/v10/webhooks/${body.application_id}/${body.token}/messages/@original`, response)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}
