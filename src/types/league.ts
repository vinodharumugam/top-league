export interface Standing {
  position: number;
  teamId: number;
  teamName: string;
  teamLogo: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: string; // e.g. "WWDLW"
}

export interface Fixture {
  id: number;
  leagueId: number;
  round: string;
  date: string;
  status: 'FT' | 'LIVE' | 'NS'; // Full Time, Live, Not Started
  homeTeam: {
    id: number;
    name: string;
    logo: string;
  };
  awayTeam: {
    id: number;
    name: string;
    logo: string;
  };
  homeGoals: number | null;
  awayGoals: number | null;
  events: MatchEvent[];
}

export interface MatchEvent {
  minute: number;
  type: 'goal' | 'card' | 'substitution';
  team: string;
  player: string;
  detail: string; // "Normal Goal", "Yellow Card", etc.
}

export interface TopScorer {
  playerId: number;
  playerName: string;
  playerPhoto: string;
  teamName: string;
  teamLogo: string;
  goals: number;
  assists: number;
  appearances: number;
}
