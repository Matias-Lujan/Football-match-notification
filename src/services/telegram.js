import TelegramBot from 'node-telegram-bot-api';
import { config } from '../config/config.js';

const bot = new TelegramBot(config.TELEGRAM_BOT_TOKEN, { polling: false });

class TelegramService {
  async sendMessage(message) {
    try {
      await bot.sendMessage(config.TELEGRAM_CHAT_ID, message);
      console.log('Mensaje enviado');
    } catch (error) {
      console.error('Error sending Telegram message:', error);
    }
  }

  async notifyMatches(matches) {
    if (matches.length === 0) {
      console.log('No hay partidos para notificar');
      return;
    }

    const message = matches
      .map((match, index) => {
        return (
          `${index + 1}. ${match.homeTeam} vs ${match.awayTeam}\n` +
          `   📍 ${match.league}\n` +
          `   📅 ${match.date}\n` +
          `   🕐 ${match.time}\n`
        );
      })
      .join('\n');

    await this.sendMessage(`${matches.length} Partidos Importantes Mañana\n\n${message}`);
  }
}

export default new TelegramService();