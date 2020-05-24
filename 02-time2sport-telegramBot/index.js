const express = require('express')
const app = express()
const { Telegraf, Markup, Extra } = require('telegraf')
if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const PORT = process.env.PORT || 8080

app.listen(PORT, async () => {
  console.log(`🚀 server is running on port: ${process.env.PORT}`)

  /*
   * BOT (https://github.com/telegraf/telegraf)
   */
  const bot = new Telegraf(process.env.BOT_TOKEN)

  bot.start((ctx) => ctx.reply('Welcome!'))
  bot.help((ctx) => ctx.reply('Do or do not there is no try 🍖'))
  bot.on('sticker', (ctx) => ctx.reply('👍'))

  /*
   * inlineLinks
   */
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

  /*
   * FOAAS (https://www.foaas.com/)
   */
  const replyWithName = (ctx, text) => {
    const {
      message_id: messageId,
      chat: { id: chatId },
      from: { first_name },
    } = ctx.message
    // ctx.telegram.deleteMessage(chatId, messageId)
    ctx.replyWithHTML(`${text} - <b>from ${first_name} </b>`)
  }

  const words = {
    asshole: `Fuck you, asshole`,
    awesome: `This is Fucking Awesome 🤩`,
    bag: `Eat a bag of fucking dicks 🤟`,
    bday: `Happy Fucking Birthday`,
    'happy birthday': `Happy Fucking Birthday `,
    because: `Why? Because fuck you, that's why`,
    cool: `Cool story, bro`,
    everyone: `Everyone can go and fuck off`,
    everything: `Fuck everything`,
    family: `Fuck you, your whole family, your pets, and your feces`,
    flying: `I don't give a flying fuck`,
    fyyff: `Fuck you, you fucking fuck`,
    life: `Fuck my life`,
    logs: `Check your fucking logs!`,
    maybe: `Maybe. Maybe not. Maybe fuck yourself.`,
    mornin: `Happy fuckin' mornin'! `,
    no: `No fucks given`,
    programmer: `Fuck you, I'm a programmer, bitch!`,
    question: `To fuck off, or to fuck off (that is not a question)`,
    retard: `You Fucktard!`,
    rtfm: `Read the fucking manual! `,
    shit: `Fuck this shit!`,
    thanks: `Fuck you very much`,
    too: `Thanks, fuck you too`,
    what: `What the fuck‽`,
    xmas: `Merry Fucking Christmas`,
  }

  const wordsWithName = {
    anyway: (company) =>
      `Who the fuck are you anyway, ${company}, why are you stirring up so much trouble, and, who pays you?`,
    bday: (name) => `Happy Fucking Birthday ${name}`,
    'happy birthday': (name) => `Happy Fucking Birthday ${name}`,
    king: (name) => `Oh fuck off, just really fuck off you total dickface. Christ, ${name}, you are fucking thick`,
    off: (name) => `Fuck off, ${name}`,
    rockstar: (name) => `${name}, you're a fucking Rock Star! `,
  }

  const wordsKey = Object.keys(words)
  const wordsWithNameKey = Object.keys(wordsWithName)

  // listen to a word
  bot.hears('hi', Telegraf.reply('Hey there'))
  wordsKey.forEach((word) => {
    bot.hears(word, (ctx) => replyWithName(ctx, words[word]))
    bot.hears(word[0].toUpperCase() + word.slice(1), (ctx) => replyWithName(ctx, words[word]))
  })

  /*
   * COMMAND
   */

  bot.command('foaas', ({ reply, message }) => {
    const { text } = message

    try {
      const foaas = text.split(' ')
      const command = foaas[1]
      const args = foaas.slice(2)

      if (command === 'help') {
        reply(
          `<b>Hello</b>.
          ${wordsKey.map((element) => '\n/foaas <i>' + element + '</i>')} ${wordsWithNameKey.map(
            (element) => '\n/foaas <i>' + element + '</i> [name]'
          )}`,
          Extra.HTML().markup(
            Markup.inlineKeyboard([
              Markup.callbackButton('Not bad', 'not bad'),
              Markup.callbackButton('All right', 'all right'),
            ])
          )
        )
        return
      }

      if (command === 'list') {
        reply(
          `<b>Hello</b>.
          ${wordsKey.map((element) => '\n/foaas <i>' + element + '</i>')} ${wordsWithNameKey.map(
            (element) => '\n/foaas <i>' + element + '</i> [name]'
          )}`,
          Extra.HTML().markup(
            Markup.inlineKeyboard([
              Markup.callbackButton('Not bad', 'not bad'),
              Markup.callbackButton('All right', 'all right'),
            ])
          )
        )
        return
      }

      if (wordsKey.includes(command)) {
        reply(`${words[command]} ${args.length > 0 ? '- from ' + args.join(' ') : ''}`)
        return
      }

      if (wordsWithNameKey.includes(command) && args.length > 0) {
        reply(wordsWithName[command](args.join(' ')))
        return
      }

      if (wordsWithNameKey.includes(command)) {
        reply(`use /foaas ${command} [name]`)
        return
      }

      throw 'wrong command'
    } catch (e) {
      reply('try /foaas list')
    }
  })

  /*
   * launch the bot
   */
  bot.launch()
})

/**
 * https://core.telegram.org/bots/api#message
  ctx.message = {
  message_id: number,
  from: {
    id: number,
    is_bot: boolean,
    first_name: string,
    last_name: string,
    language_code: 'fr'
  },
  chat: {
    id: number,
    first_name: string,
    last_name: string,
    type: 'private'
  },
  date: number,
  text: '/oldschool toto',
 */
