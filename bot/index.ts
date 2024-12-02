/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-require-imports */
const { Telegraf } = require('telegraf');
const { BOT_TOKEN, WEBAPP_URL } = require('./config');

if (!BOT_TOKEN) {
  throw new Error('BOT_TOKEN must be provided!');
}

const bot = new Telegraf(BOT_TOKEN);

// Basic commands
bot.command('start', (ctx: any) => {
  ctx.reply('Hi! \nUse /webapp to open the Mini App.');
});

bot.command('help', (ctx: any) => {
  ctx.reply(
    'Available commands:\n' +
    '/start - Starting bot progress\n' +
    '/help - Help me\n' +
    '/webapp - Open the Mini App'
  );
});

bot.command('webapp', (ctx: any) => {
  const chatId = ctx.chat.id;
  const encodedGroupId = Buffer.from(chatId.toString()).toString('base64');
  
  console.log('Chat ID:', chatId);
  console.log('Encoded Group ID:', encodedGroupId);
  
  ctx.reply('Open Web App', {
    reply_markup: {
      inline_keyboard: [[
        { text: "Open App", url: `${WEBAPP_URL}?startapp=${encodedGroupId}` }
      ]]
    }
  });
});

bot.launch().then(() => {
  console.log('Bot is running...');
});

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));