import { config } from '../config/config.js';

class MatchFilter {
  isImportantMatch(fixture) {
    const leagueId = fixture.league.id;
    const homeTeam = fixture.teams.home.name;
    const awayTeam = fixture.teams.away.name;

    if (this.isPremierLeagueImportantMatch(leagueId, homeTeam, awayTeam)) {
      return true;
    }
    if (this.isLaLigaImportantMatch(leagueId, homeTeam, awayTeam)) {
      return true;
    }
    if (this.isArgentinaPrimeraDivisionImportantMatch(leagueId, homeTeam, awayTeam)) {
      return true;
    }
    if (this.isCopaLibertadoresImportantMatch(fixture)) {
      return true;
    }
    if (this.isChampionsLeagueImportantMatch(fixture)) {
      return true;
    }
    return false;
  }

  isPremierLeagueImportantMatch(leagueId, homeTeam, awayTeam) {
    return (
      (leagueId === config.leagues.PREMIER_LEAGUE || leagueId === config.leagues.FA_CUP) &&
      config.importantTeams.PREMIER_LEAGUE.includes(homeTeam) &&
      config.importantTeams.PREMIER_LEAGUE.includes(awayTeam)
    );
  }

  isLaLigaImportantMatch(leagueId, homeTeam, awayTeam) {
    return (
      (leagueId === config.leagues.LA_LIGA || leagueId === config.leagues.COPA_DEL_REY) &&
      config.importantTeams.LA_LIGA.includes(homeTeam) &&
      config.importantTeams.LA_LIGA.includes(awayTeam)
    );
  }

  isArgentinaPrimeraDivisionImportantMatch(leagueId, homeTeam, awayTeam) {
    return (
      leagueId === config.leagues.ARGENTINA_PRIMERA_DIVISION &&
      config.importantTeams.ARGENTINA_PRIMERA_DIVISION.includes(homeTeam) &&
      config.importantTeams.ARGENTINA_PRIMERA_DIVISION.includes(awayTeam)
    );
  }

  isCopaLibertadoresImportantMatch(fixture) {
    const leagueId = fixture.league.id;
    const homeTeam = fixture.teams.home.name;
    const awayTeam = fixture.teams.away.name;
    const round = fixture.league.round.toLowerCase();

    if (leagueId !== config.leagues.COPA_LIBERTADORES) return false;
    const [bocaJuniors, , , , , ,] = config.importantTeams.ARGENTINA_PRIMERA_DIVISION;

    if (
      homeTeam.toLowerCase() === bocaJuniors.toLowerCase() ||
      awayTeam.toLowerCase() === bocaJuniors.toLowerCase()
    ) {
      return true;
    }

    const [, , , semiFinal, final] = config.COPA_LIBERTADORES_KNOCKOUT_ROUNDS;

    if (
      (round.includes(semiFinal.toLocaleLowerCase()) ||
        round.includes(final.toLocaleLowerCase())) &&
      config.importantTeams.ARGENTINA_PRIMERA_DIVISION.includes(homeTeam) &&
      config.importantTeams.ARGENTINA_PRIMERA_DIVISION.includes(awayTeam)
    ) {
      return true;
    }

    return false;
  }

  isChampionsLeagueImportantMatch(fixture) {
    if (fixture.league.id !== config.leagues.CHAMPIONS_LEAGUE) return false;

    const round = fixture.league.round.toLowerCase();

    if (this.isChampionsLeagueSemifinalOrFinal(round)) {
      return true;
    }
    // Partido entre equipos grandes
    const homeTeam = fixture.teams.home.name;
    const awayTeam = fixture.teams.away.name;

    if (
      config.importantTeams.CHAMPIONS_LEAGUE.includes(homeTeam) &&
      config.importantTeams.CHAMPIONS_LEAGUE.includes(awayTeam) &&
      this.isKnockOutRounds(round)
    ) {
      return true;
    }

    return false;
  }

  isKnockOutRounds(round) {
    return config.CHAMPIONS_LEAGUE_KNOCKOUT_ROUNDS.some((knockoutRound) =>
      round.includes(knockoutRound.toLowerCase()),
    );
  }

  isChampionsLeagueSemifinalOrFinal(round) {
    const [, , semiFinal, final] = config.CHAMPIONS_LEAGUE_KNOCKOUT_ROUNDS;
    return round.includes(semiFinal.toLowerCase()) || round.includes(final.toLowerCase());
  }

  filterImportantMatches(fixtures) {
    return fixtures
      .filter((fixture) => this.isImportantMatch(fixture))
      .map((fixture) => this.formatMatch(fixture));
  }

  formatMatch(fixture) {
    const date = new Date(fixture.fixture.date);
    return {
      id: fixture.fixture.id,
      homeTeam: fixture.teams.home.name,
      awayTeam: fixture.teams.away.name,
      league: fixture.league.name,
      round: fixture.league.round,
      date: date.toLocaleDateString('es-AR'),
      time: date.toLocaleTimeString('es-AR', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
  }
}

export default new MatchFilter();
