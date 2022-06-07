require('dotenv').config()
const { register } = require("./misc/send");

register(process.env.APP_ID, process.env.BOT_TOKEN, process.env.GUILD_ID)
