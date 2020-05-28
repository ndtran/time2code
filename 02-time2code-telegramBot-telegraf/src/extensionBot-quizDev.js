const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const Markup = require('telegraf/markup')
const WizardScene = require('telegraf/scenes/wizard')
const Extra = require('telegraf/extra')
const fetch = require('node-fetch')
const cron = require('node-cron')

const URL_API = 'https://quizapi.io/api/v1/questions'
let API_KEY = ''
// https://telegraf.js.org/#/?id=editmessagetext

/*
 * add the extensionBot-quizDev to the bot
 */

const chat_ids = []
const ctxs = {}

exports.launch = function (bot, apiKey) {
  API_KEY = apiKey

  const stage = new Stage([quizWizard], { sessionName: 'chatSession' })
  // @dev bot.use(session()) force it to work with the only one user.
  // @dev for multiple user check https://github.com/telegraf/telegraf/issues/854
  bot.use(
    session({
      property: 'chatSession',
      getSessionKey: (ctx) => ctx.from && ctx.chat && `${ctx.chat.id}`,
    })
  )
  bot.use(stage.middleware())

  // help
  bot.hears('/quiz help', ({ reply }) => {
    reply(
      'Tchô !\n\nGet a question: /quiz \nSubscribe to a quiz each morning: /quiz subscribe \nTo unsubscribe: /quiz unsubscribe'
    )
  })

  // automatic send quiz
  bot.hears('/quiz subscribe', (ctx) => {
    const {
      message: { chat },
      reply,
    } = ctx
    if (!chat_ids.includes(chat.id)) {
      console.log('subscribe', chat.id)
      chat_ids.push(chat.id)
      ctxs[`${chat.id}`] = ctx
      reply('register 👍 \nyou will receive one question each morning (1000)')
    } else {
      reply('already register 😅')
    }
  })

  bot.hears('/quiz unsubscribe', ({ message: { chat }, reply }) => {
    if (chat_ids.includes(chat.id)) {
      console.log('unsubscribe', chat.id)
      console.log('ctxs', ctxs)
      chat_ids.splice(chat_ids.indexOf(chat.id), 1)
      delete ctxs[`${chat.id}`]
      reply('unsubscribe 👍')
      console.log(chat_ids)
      console.log('ctxs', ctxs)
    } else {
      reply('😅 start first with /quiz subscribe')
    }
  })

  // send a quiz
  bot.hears('/quiz', async (ctx) => {
    ctx.scene.enter('quiz-wizard')
  })

  // cron every morning
  cron.schedule('* 10 * * *', async () => {
    chat_ids.forEach((chat_id) => {
      bot.telegram.sendMessage(chat_id, 'Hello World')
      ctxs[`${chat_id}`].scene.enter('quiz-wizard')
    })
  })
}

/*
 * scene (which allow to get the choice of the user as callback)
 */

const quizWizard = new WizardScene(
  'quiz-wizard',
  async (ctx) => {
    /*
     * generate the question with inlineKeyboard
     */
    try {
      const quizData = await getQuiz()
      const possibleAnswer = Object.keys(quizData.answers)
        .filter((key) => !!quizData.answers[key])
        .map((key) => `${key}: ${quizData.answers[key]}`)

      const question = `<i>${quizData.question}</i>\n`
      const quizId = quizData.id

      const answer = Object.keys(quizData.correct_answers)
        .filter((key) => quizData.correct_answers[key] === 'true')[0]
        .replace('_correct', '')

      const choice = Object.keys(quizData.answers)
        .filter((key) => !!quizData.answers[key])
        .map((key) =>
          Markup.callbackButton(
            `${key.replace('answer_', '')}) ${quizData.answers[key]}`,
            JSON.stringify({
              quizId,
              userAnswer: key.replace('answer_', ''),
              isCorrect: key === answer,
              answer: answer.replace('answer_', ''),
            })
          )
        )

      ctx.reply(question, Extra.HTML().markup(Markup.inlineKeyboard(choice, { columns: 1 })))
      return ctx.wizard.next()
    } catch (e) {
      ctx.reply('sorry... something bad happen !')
      console.log(e)
      return ctx.scene.leave()
    }
  },

  /*
   * informe the user if it's correct or not then we leav the scene
   */
  async (ctx) => {
    try {
      console.log('nico', ctx.callbackQuery)
      if (ctx.callbackQuery) {
        const { quizId, userAnswer, isCorrect, answer } = JSON.parse(ctx.callbackQuery.data)
        const { id: userId, first_name: userFirstName } = ctx.callbackQuery.from
        const sayHello = `<a href="tg://user?id=${userId}">${userFirstName}</a>`
        const reply = `${sayHello} responded with <b>${userAnswer}</b>. The answer is <b>${
          isCorrect ? 'correct 😁' : `incorrect 🤓 \nThe correct answer is ${answer}`
        }</b>`
        ctx.reply(`${reply}`, Extra.HTML())
        return ctx.scene.leave()
      } else {
        // return ctx.reply('this is not a valid input');
        // not calling ctx.wizard.next() or .back() so it stays at this function
        // @dev https://github.com/telegraf/telegraf/issues/392
      }
    } catch (e) {
      ctx.reply('sorry... something bad happen !')
      console.log(e)
      return ctx.scene.leave()
    }
  }
)

/*
 * get question from api
 */
const getQuiz = () => {
  const url = `${URL_API}?apiKey=${API_KEY}&limit=1`

  return fetch(url)
    .then((res) => {
      return res.json()
    })
    .then((json) => {
      console.log('json', json)
      return json[0]
    })
    .catch((e) => {
      console.log('err', e)
    })
}
