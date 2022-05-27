const nacl = require('tweetnacl');

exports.handler = async (event) => {
  const strBody = event.body; // should be string, for successful sign

  if (!event.headers['test']) {
    // Checking signature (requirement 1.)
    // Your public key can be found on your application in the Developer Portal
    const PUBLIC_KEY = process.env.PUBLIC_KEY;
    const signature = event.headers['x-signature-ed25519']
    const timestamp = event.headers['x-signature-timestamp'];

    const isVerified = nacl.sign.detached.verify(
      Buffer.from(timestamp + strBody),
      Buffer.from(signature, 'hex'),
      Buffer.from(PUBLIC_KEY, 'hex')
    );

    if (!isVerified) {
      return {
        statusCode: 401,
        body: JSON.stringify('invalid request signature'),
      };
    }
  }


  // Replying to ping (requirement 2.)
  const body = JSON.parse(strBody)
  if (body.type == 1) {
    return {
      statusCode: 200,
      body: JSON.stringify({ "type": 1 }),
    }
  }

  // Handle command (go to next API Gateway and split to one of Lambdas)
  if (body.data.name) {
    return {
      statusCode: 301,
      headers: {
        Location: process.env.MAIN_GATEWAY+body.data.name,
      },
      body: event.body,
    }
  }

  return {
    statusCode: 404
  }
}
