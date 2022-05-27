/**
 * A Lambda function that replies to interaction with static string
 */
exports.helloFromLambdaHandler = async (event) => {
  const body = JSON.parse(event.body)
  // May do something here with body
  // Body contains Discord command details
  return {
    statusCode: 200,
    body: JSON.stringify({
      "type": 4,
      "data": { "content": "Hello from Lambda!" }
    })
  }
}
