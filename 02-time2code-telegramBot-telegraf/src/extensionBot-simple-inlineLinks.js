const { Markup, Extra } = require('telegraf')

/*
 * inlineLinks (example)
 */

exports.launch = function (bot) {
  bot.hears('hello', (ctx) => {
    ctx.reply(
      '<b>Hello</b>. <i>How are you today?</i>',
      Extra.HTML().markup(
        Markup.inlineKeyboard([
          Markup.callbackButton('Not bad', 'not bad'),
          Markup.callbackButton('All right', 'all right'),
        ])
      )
    )
  })
  bot.action('not bad', (ctx) => {
    ctx.editMessageText('<i>Have a nice day 😊</i>', Extra.HTML())
  })
  bot.action('all right', (ctx) => {
    ctx.editMessageText('<i>May happiness be with you 🙏</i>', Extra.HTML())
  })
}
