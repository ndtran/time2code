// https://github.com/telegraf/telegraf
// https://www.divdev.io/telegraf_01/

const Telegraf = require("telegraf");

const bot = new Telegraf("996917685:AAF7ZAhEFxTc7WMSnNuO_VHx4YePZzhm20Y");

bot.telegram.deleteWebhook().then((success) => {
  success && console.log("🤖 is listening to your commands");
  bot.startPolling();
});

bot.start(async (ctx) => {
  const name = ctx.from.first_name;
  ctx.reply(`Hello ${name ? name : "friend"}! You managed to run me!`);
});

// responses/onmessage.js
const onMessage = bot => {

    const {
      message_id: messageId,
      chat: { id: chatId }
    } = ctx.message;

    ctx.reply(
      `Hello <b>${ctx.from.first_name ||
        "friend"}</b>! Your telegram id is <i>${
        ctx.from.id
      }</i>\n\nYour have sent me the following message: <code>${
        ctx.match[0]
      }</code>`,
      {
        parse_mode: "Html"
      }
    );

    setTimeout(() => {
      ctx.telegram.deleteMessage(chatId, messageId);
      ctx.telegram.deleteMessage(chatId, messageId + 1);
      ctx.telegram.sendMessage(
        chatId,
        "Cool, I managed to delete both messages!"
      );
    }, 2500);
  });
};

//module.exports = { onMessage }
