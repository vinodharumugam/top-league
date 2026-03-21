export interface Transfer {
  id: number;
  playerName: string;
  playerPhoto: string;
  playerAge: number;
  position: string;
  fromTeam: string;
  fromTeamLogo: string;
  toTeam: string;
  toTeamLogo: string;
  fee: string; // e.g. "$60M", "Free", "Loan"
  leagueId: number;
  date: string;
  type: 'buy' | 'loan' | 'free';
}

export interface DreamTeamPlayer {
  id: number;
  name: string;
  team: string;
  league: string;
  leagueId: number;
  position: 'GK' | 'DEF' | 'MID' | 'FWD';
  tier: 'Star' | 'Great' | 'Good' | 'Rising';
  rating: number;
  pace: number;
  shooting: number;
  passing: number;
  defending: number;
  physical: number;
  photo: string;
}
