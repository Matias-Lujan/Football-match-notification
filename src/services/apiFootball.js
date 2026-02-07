import axios from 'axios';
import { config } from '../config/config.js';

const apiFootballClientHTTP = axios.create({
  baseURL: config.API_FOOTBALL_URL,
  headers: {
    'x-apisports-key': config.API_FOOTBALL_KEY,
  },
});

export const apiFootball = {
  getFixture: async (date, leagueId = null) => {
    try {
      const params = { date };
      if (leagueId) {
        params.league = leagueId;
      }
      const response = await apiFootballClientHTTP.get('/fixtures', { params });
      return response.data.response;
    } catch (err) {
      console.error(err.response?.status, err.message);
      return [];
    }
  },

  getTomorrowDate: () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyyMmDd = tomorrow.toISOString().split('T')[0];

    return yyyyMmDd;
  },

  getTomorrowFixtures: async (leagueId = null) => {
    const date = apiFootball.getTomorrowDate();
    return apiFootball.getFixture(date, leagueId);
  },
};
