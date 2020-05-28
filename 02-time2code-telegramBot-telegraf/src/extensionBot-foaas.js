const { Telegraf } = require('telegraf')

/*
 * FOAAS (https://www.foaas.com/)
 */

exports.launch = function (bot) {
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

  /*
   * listen to a word
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
      let command = foaas[1]
      let args = foaas.slice(2)

      if (command === 'help' || command === 'list') {
        reply(
          `Tchô !.
                ${wordsKey.map((element) => '\n/foaas <i>' + element + '</i>')} ${wordsWithNameKey.map(
            (element) => '\n/foaas <i>' + element + '</i> [name]'
          )}`
        )
        return
      }

      // simple word
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

      if (foaas.length < 3) throw 'no compose word'

      // compose word (max 2)
      command = `${foaas[1]} ${foaas[2]}`
      args = foaas.slice(3)

      if (wordsWithNameKey.includes(command) && args.length > 0) {
        reply(wordsWithName[command](args.join(' ')))
        return
      }

      if (wordsKey.includes(command)) {
        reply(`${words[command]} ${args.length > 0 ? '- from ' + args.join(' ') : ''}`)
        return
      }

      throw 'wrong command'
    } catch (e) {
      reply('try /foaas list')
    }
  })
}

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
