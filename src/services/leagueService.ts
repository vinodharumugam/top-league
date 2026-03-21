import { Standing, Fixture, TopScorer } from '../types/league';
import { fetchEspnStandings, fetchEspnFixtures, fetchEspnTopScorers } from './espnApi';

export async function getStandings(leagueId: number): Promise<Standing[]> {
  return fetchEspnStandings(leagueId);
}

export async function getFixtures(leagueId: number): Promise<Fixture[]> {
  return fetchEspnFixtures(leagueId);
}

export async function getTopScorers(leagueId: number): Promise<TopScorer[]> {
  return fetchEspnTopScorers(leagueId);
}
