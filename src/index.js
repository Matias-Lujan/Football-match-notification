import { apiFootball } from './services/apiFootball.js';
import TelegramService from './services/telegram.js';
import matchFilter from './utils/matchFilter.js';

async function main() {
  try {
    console.log('Iniciando Football Notifier...\n');

    console.log('Obteniendo partidos de mañana...');
    const fixtures = await apiFootball.getTomorrowFixtures();
    console.log(`${fixtures.length} partidos encontrados\n`);

    console.log('Filtrando partidos importantes...');
    const importantMatches = matchFilter.filterImportantMatches(fixtures);
    console.log(`${importantMatches.length} partidos importantes\n`);

    await TelegramService.notifyMatches(importantMatches);
    console.log('\nProceso completado exitosamente');
  } catch (error) {
    console.error('\nError en el proceso:', error.message);
    process.exit(1); // terminar con código de error
  }
}

main();
