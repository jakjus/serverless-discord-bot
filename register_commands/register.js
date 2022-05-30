const boxen = require("boxen");
const { devRegister, prodRegister } = require("./send");

var yargs = require("yargs/yargs")(process.argv.slice(2))
  .usage('Usage: $0 [options]')
  //.command('register', 'Register commands in Discord Applications Server')
  .example('$0 -e dev -g 01234 -b A1B2C3D4', 'register commands in guild 01234 for development purposes')

  .alias('e', 'env')
  .nargs('e', 1)
  .describe('e', 'choose environment')
  .choices('e', ['dev', 'prod'])

  .alias('g', 'guild-id')
  .nargs('g', 1)
  .describe('g', 'guild id from discord (only dev)')

  .alias('a', 'app-id')
  .nargs('a', 1)
  .describe('a', 'app id from discord (only dev)')

  .alias('b', 'bot-token')
  .nargs('b', 1)
  .describe('b', 'bot token from discord developer portal')

  .demandOption(['e', 'b', 'a'])

  .help('h')
  .alias('h', 'help')
  .argv;

console.log(yargs)

const main = () => {
  if (yargs.env == 'dev' && !yargs['guild-id']) {
    console.error('You must define Guild ID parameter for dev environment.')
    return
  }

  if (yargs.env == 'dev') {
    devRegister(yargs.appId, yargs.guildId, yargs.botToken)
  }

  if (yargs.env == 'prod') {
    prodRegister(yargs.appId, yargs.botToken)
  }
}

main()
