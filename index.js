const { Telegraf, Markup } = require('telegraf')
require('dotenv').config()
const googleIt = require('google-it')
const TOKEN = process.env.TOKEN
const bot = new Telegraf(TOKEN)
bot.start(async (ctx) => {
    const chatId = ctx.message.chat.id;
    const userId = ctx.message.from.id;

    try {
        const response = await bot.telegram.getChatMember(chatId, userId);
        if (response.status === 'member' || response.status === 'creator' || response.status === 'administrator') {
            ctx.reply("Привет!")
            ctx.sendSticker("CAACAgIAAxkBAAMJZLLKLelQT4T7osdQuKdWgntlVR0AAm4FAAI_lcwKhjrZXYi8tzUvBA")
            const keyboard = Markup.inlineKeyboard([
                Markup.button.callback("Button 1", "button1"),
                Markup.button.callback("Button 2", "button2"),
            ])
            ctx.reply("Выбери Чтото: ", keyboard)
        } else {
            const keyboard = {
                inline_keyboard: [
                    [{ text: 'Подписаться на канал', url: 'https://t.me/asad_projects' }]
                ]
            };
            ctx.reply('Вы не подписаны на наш канал. Пожалуйста, подпишитесь, чтобы получать обновления!', {
                reply_markup: JSON.stringify(keyboard)
            });
        }
    } catch (error) {
        console.log(error);
        ctx.reply('Произошла ошибка при проверке подписки.');
    }
});
bot.command('search', async (ctx) => {
    const query = ctx.message.text.replace('/search ', '');
  
    const results = await googleIt({ query });
    ctx.reply(results[0].link)
    ctx.reply(results[1].link)
  });
bot.action("button1", (ctx) => {
    setTimeout(() => {
        ctx.reply("ты нажал на кнопку1")
    }, 500)

})
bot.action("button2", (ctx) => {
    setTimeout(() => {
        ctx.reply("ты нажал на кнопку2")
    }, 500)
})

bot.launch()