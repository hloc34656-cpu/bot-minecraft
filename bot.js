const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'loc10072.progamer.me',
    port: 44357,
    username: 'KeeperAFK',
    version: '1.21.4',
    auth: 'offline',
    physicsEnabled: true,
    viewDistance: 'normal',
    hideErrors: false
  });

  let antiAfkLoop;

  bot.once('spawn', () => {
    console.log('Bot da vao game thanh cong!');

    bot.setSettings({
      chat: 'enabled',
      colorsEnabled: true,
      viewDistance: 'normal',
      mainHand: 'right'
    });

    antiAfkLoop = setInterval(() => {
      if (!bot.entity) return;
      const actions = ['forward', 'back', 'left', 'right', 'jump'];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];

      bot.setControlState(randomAction, true);
      bot.look(bot.entity.yaw + (Math.random() - 0.5), (Math.random() - 0.5) * 0.5, false);

      setTimeout(() => {
        if (bot.entity) bot.setControlState(randomAction, false);
      }, 600);
    }, 15000);
  });

  bot.on('kicked', (reason) => console.log('Bi kick vi:', reason));
  bot.on('end', (reason) => {
    console.log('Mat ket noi:', reason);
    if (antiAfkLoop) clearInterval(antiAfkLoop);
    setTimeout(createBot, 35000);
  });
  bot.on('error', (err) => console.log('Loi ket noi:', err.message));
}

createBot();
