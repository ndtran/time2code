const express = require('express')
const app = express()
const { Telegraf, Markup, Extra } = require('telegraf')
if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const PORT = process.env.PORT || 8080
const QUIZ_API_TOKEN = process.env.QUIZ_API_TOKEN || ''

app.listen(PORT, async () => {
  console.log(`🚀 server is running on port: ${process.env.PORT}`)

  /*
   * BOT (https://github.com/telegraf/telegraf)
   */
  const bot = new Telegraf(process.env.BOT_TOKEN)

  require('./extensionBot-simple-message.js').launch(bot)
  require('./extensionBot-simple-inlineLinks.js').launch(bot)
  require('./extensionBot-foaas.js').launch(bot)
  require('./extensionBot-quizDev.js').launch(bot, QUIZ_API_TOKEN)
  require('./extensionBot-inlineBot-autocomplete.js').launch(bot)

  /*
   * launch the bot
   */
  bot.launch()
})
