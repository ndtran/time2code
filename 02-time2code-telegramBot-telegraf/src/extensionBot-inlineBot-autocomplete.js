const { Markup, Extra } = require('telegraf')
const fetch = require('node-fetch')

/*
 * allow to find CH station
 * allow to find itinerer from ... to ...
 * gaol: autocomplation with https://transport.opendata.ch/
 *
 * inlineBot example
 * --> https://gist.github.com/dotcypress/262ae2469c7b413407bc69c2f645c15e
 * https://stackoverflow.com/questions/43301591/how-to-implement-autocomplete-search-movie-name-in-telegram-bot
 * https://core.telegram.org/bots/api#inlinequery
 * https://core.telegram.org/bots/inline
 *
 * need to allow /setinline @botfather
 */

const URL_TRANSPORT_API = 'https://transport.opendata.ch/v1'

exports.launch = function (bot) {
  /*
   * inline_query
   */
  bot.on('inline_query', async (ctx) => {
    const stations = await getLocation(ctx.inlineQuery.query)
    console.log('stations', stations)
    const results = stations.map(({ id, name }) => ({
      type: 'article',
      id,
      title: name,
      input_message_content: {
        message_text: name,
      },
      reply_markup: shortKeyboard,
    }))
    return ctx.answerInlineQuery(results)
  })

  bot.action('add', async (ctx) => ctx.editMessageReplyMarkup(longKeyboard))

  const shortKeyboard = Markup.inlineKeyboard([
    Markup.callbackButton('Add', 'add'),
    ,
    Markup.switchToChatButton('Dummy', '😱'),
  ])

  const longKeyboard = Markup.inlineKeyboard([
    Markup.callbackButton('Add', 'add'),
    Markup.switchToChatButton('Dummy', '😱'),
    Markup.switchToChatButton('Dummy', '🚨'),
    Markup.switchToChatButton('Dummy', '🍗'),
  ])
}

/*
 * get location from api
 */
async function getLocation(location) {
  const apiUrl = `${URL_TRANSPORT_API}/locations?query=${location}&type=station`
  const response = await fetch(apiUrl)
  const { stations } = await response.json()
  return stations
}

/*
 * get connection from api
 * https://transport.opendata.ch/docs.html#connections
 */
async function getConnection(from, to, time, isArrivalTime) {
  const apiUrl = `${URL_TRANSPORT_API}/connections?from=${from}&to=${to}`
  const response = await fetch(apiUrl)
  const { connections } = await response.json()
  return connections
}
