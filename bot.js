const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: 'LOC10072.aternos.me',
  port: 16715, // <--- Thay đúng số port 5 chữ số của bạn vào đây
  username: 'KeeperAFK',
  version: '1.21.4',
  auth: 'offline',
  physicsEnabled: false,
  viewDistance: 'tiny'
});

bot.once('spawn', () => {
  console.log('Bot da vao server thanh cong!');
  setInterval(() => {
    if (bot.entity) {
      bot.look(bot.entity.yaw + 0.05, 0, true);
    }
  }, 40000);
});

bot.on('end', (reason) => {
  console.log('Mat ket noi, dang thoat de chay lai...', reason);
  process.exit(0);
});
