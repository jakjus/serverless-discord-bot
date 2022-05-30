const axios = require('axios').default;

const headers = {
  "Authorization": `Bot ${process.env.BOT_TOKEN}`,
  "Content-Type": "application/json"
}

let commands = [{
  "name": "hello",
  "type": 1,
  "description": "replies with hello world",
}]

const main = async () => {
  axios.put(`https://discord.com/api/v8/applications/${process.env.APP_ID}/guilds/${process.env.GUILD_ID}/commands`,
      JSON.stringify(commands),
      { headers: headers })
    .then(() => console.log('Commands registered.'))
    .catch(e => console.log(e))
  return
}

main()
