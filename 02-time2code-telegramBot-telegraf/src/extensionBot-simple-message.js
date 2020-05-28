const { Telegraf } = require('telegraf')

/*
 * start + hears + help (example)
 */
exports.launch = function (bot) {
  bot.start((ctx) => ctx.reply('Welcome!'))
  bot.help((ctx) => ctx.reply('Do or do not there is no try 🍖\n\ncommand: \n1️⃣ /foaas help \n2️⃣ /quiz help'))
  bot.on('sticker', (ctx) => ctx.reply('👍'))
  bot.hears('😊', (ctx) => ctx.reply('😊'))
  bot.hears('😁', ({ reply }) => reply('😁'))
  bot.hears('hi', Telegraf.reply('Hey there'))
}
