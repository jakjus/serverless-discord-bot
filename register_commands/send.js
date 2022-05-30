const axios = require('axios').default;
const YAML = require('yaml');
const fs = require('fs');

const commands_raw = fs.readFileSync('./commands.yaml', 'utf8')
const commands = YAML.parse(commands_raw)

exports.devRegister = async (appId, guildId, botToken) => {
  const headers = {
    "Authorization": `Bot ${botToken}`,
    "Content-Type": "application/json"
  }

  axios.put(`https://discord.com/api/v8/applications/${appId}/guilds/${guildId}/commands`,
      JSON.stringify(commands),
      { headers: headers })
    .then(() => console.log('Guild commands registered.'))
    .catch(e => console.log(e))
  return
}

exports.prodRegister = async (appId, botToken) => {
  const headers = {
    "Authorization": `Bot ${botToken}`,
    "Content-Type": "application/json"
  }

  axios.post(`https://discord.com/api/v8/applications/${appId}/commands`,
      JSON.stringify(commands),
      { headers: headers })
    .then(() => console.log('Global commands registered.'))
    .catch(e => console.log(e))
  return
}
