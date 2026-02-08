import dotenv from 'dotenv';

dotenv.config();

const { 
    API_FOOTBALL_KEY, 
    API_FOOTBALL_URL, 
    TELEGRAM_BOT_TOKEN, 
    TELEGRAM_CHAT_ID 
} = process.env;

export const config = {
  API_FOOTBALL_KEY,
  API_FOOTBALL_URL,
  TELEGRAM_BOT_TOKEN,
  TELEGRAM_CHAT_ID,
  leagues: {
    PREMIER_LEAGUE: 39,
    LA_LIGA: 140,
    CHAMPIONS_LEAGUE: 2,
    FA_CUP: 45,
    COPA_DEL_REY: 143,
  },

  // Equipos importantes por liga
  importantTeams: {
    // Premier League - Big Six
    PREMIER_LEAGUE: [
      'Manchester City',
      'Manchester United', 
      'Liverpool',
      'Chelsea',
      'Tottenham',
      'Arsenal'
    ],
    // La Liga - Big Three
    LA_LIGA: [
      'Barcelona',
      'Real Madrid',
      'Atletico Madrid'
    ],
    // Champions - Equipos grandes
    CHAMPIONS_LEAGUE: [
      'Manchester City',
      'Manchester United',
      'Liverpool',
      'Chelsea',
      'Tottenham',
      'Arsenal',
      'Barcelona',
      'Real Madrid',
      'Atletico Madrid',
      'Bayern Munich',
      'Borussia Dortmund',
      'PSG',
      'Juventus',
      'Inter',
      'AC Milan'
    ],
  },

  CHAMPIONS_LEAGUE_KNOCKOUT_ROUNDS: [
    'Round of 16',
    'Quarter-finals',
    'Semi-finals',
    'Final',
    ],
};

if (!API_FOOTBALL_KEY || !TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
  throw new Error('Faltan variables de entorno en .env');
}