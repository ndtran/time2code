const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const Markup = require('telegraf/markup')
const WizardScene = require('telegraf/scenes/wizard')
const Extra = require('telegraf/extra')
const fetch = require('node-fetch')

const URL_API = 'https://quizapi.io/api/v1/questions'
let API_KEY = ''
// https://telegraf.js.org/#/?id=editmessagetext

/*
 * add the extensionBot-quizDev to the bot
 */

exports.launch = function (bot, apiKey) {
  API_KEY = apiKey
  const stage = new Stage([quizWizard])
  bot.use(session())
  bot.use(stage.middleware())

  bot.hears('/quiz', async (ctx) => {
    ctx.scene.enter('quiz-wizard')
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
      const { quizId, userAnswer, isCorrect } = JSON.parse(ctx.callbackQuery.data)
      const { id: userId, first_name: userFirstName } = ctx.callbackQuery.from
      const sayHello = `<a href="tg://user?id=${userId}">${userFirstName}</a>`

      const reply = `${sayHello} responded with <b>${userAnswer}</b>. The answer is ${
        isCorrect ? 'correct' : 'incorrect'
      }`

      // if we want to remove the message, we can edit it
      // ctx.editMessageCaption(`${reply}`, Extra.HTML())
      ctx.reply(`${reply}`, Extra.HTML())

      return ctx.scene.leave()
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
