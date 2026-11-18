const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'LOC10072.aternos.me',
    port: 16715, // Đảm bảo đúng số Port hiện tại trên Aternos
    username: 'KeeperAFK',
    version: '1.21.4',
    auth: 'offline',
    physicsEnabled: false,
    viewDistance: 'tiny'
  });

  bot.once('spawn', () => {
    console.log('Bot da vao server thanh cong!');
    
    // Tự động xoay người chống AFK sau mỗi 40 giây
    setInterval(() => {
      if (bot.entity) {
        bot.look(bot.entity.yaw + 0.05, 0, true);
      }
    }, 40000);
  });

  bot.on('end', (reason) => {
    console.log('Mat ket noi, dang thu ket noi lai sau 30 giay...', reason);
    setTimeout(createBot, 30000); // Tự động kết nối lại sau 30 giây thay vì tắt bot
  });

  bot.on('error', (err) => {
    console.log('Loi ket noi:', err.message);
  });
}

createBot();
