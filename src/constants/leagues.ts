import { Colors } from './colors';

export interface LeagueInfo {
  id: number;
  name: string;
  shortName: string;
  country: string;
  emoji: string;
  color: string;
  season: number;
}

export const LEAGUES: LeagueInfo[] = [
  {
    id: 39,
    name: 'Premier League',
    shortName: 'PL',
    country: 'England',
    emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    color: Colors.premierLeague,
    season: 2025,
  },
  {
    id: 140,
    name: 'La Liga',
    shortName: 'LL',
    country: 'Spain',
    emoji: '🇪🇸',
    color: Colors.laLiga,
    season: 2025,
  },
  {
    id: 135,
    name: 'Serie A',
    shortName: 'SA',
    country: 'Italy',
    emoji: '🇮🇹',
    color: Colors.serieA,
    season: 2025,
  },
  {
    id: 78,
    name: 'Bundesliga',
    shortName: 'BL',
    country: 'Germany',
    emoji: '🇩🇪',
    color: Colors.bundesliga,
    season: 2025,
  },
  {
    id: 61,
    name: 'Ligue 1',
    shortName: 'L1',
    country: 'France',
    emoji: '🇫🇷',
    color: '#0E6655',
    season: 2025,
  },
];

export function getLeagueById(id: number): LeagueInfo | undefined {
  return LEAGUES.find((l) => l.id === id);
}
