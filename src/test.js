import axios from 'axios';
import dotenv from 'dotenv';
import { config } from './config/config.js';
import TelegramBot from 'node-telegram-bot-api';

dotenv.config();

const response = await axios.get('https://v3.football.api-sports.io/leagues?id=143', {
  headers: { 'x-apisports-key': config.API_FOOTBALL_KEY },
});

console.log(JSON.stringify(response.data, null, 2)); // Formato más legible

/* const bot = new TelegramBot(config.TELEGRAM_BOT_TOKEN, { polling: false });
bot.sendMessage(config.TELEGRAM_CHAT_ID, 'Aguante Boca!');
 */
