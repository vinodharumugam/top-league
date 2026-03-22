import { Standing, Fixture, TopScorer } from '../types/league';
import { Transfer, DreamTeamPlayer } from '../types/player';
import { Highlight } from '../types/match';

// ============================================================
// PREMIER LEAGUE SAMPLE DATA
// ============================================================

const PL_STANDINGS: Standing[] = [
  { position: 1, teamId: 50, teamName: 'Manchester City', teamLogo: '', played: 30, won: 23, drawn: 4, lost: 3, goalsFor: 72, goalsAgainst: 25, goalDifference: 47, points: 73, form: 'WWWDW' },
  { position: 2, teamId: 42, teamName: 'Arsenal', teamLogo: '', played: 30, won: 22, drawn: 5, lost: 3, goalsFor: 68, goalsAgainst: 22, goalDifference: 46, points: 71, form: 'WWWWL' },
  { position: 3, teamId: 40, teamName: 'Liverpool', teamLogo: '', played: 30, won: 21, drawn: 5, lost: 4, goalsFor: 70, goalsAgainst: 30, goalDifference: 40, points: 68, form: 'WDWWW' },
  { position: 4, teamId: 66, teamName: 'Aston Villa', teamLogo: '', played: 30, won: 18, drawn: 4, lost: 8, goalsFor: 60, goalsAgainst: 38, goalDifference: 22, points: 58, form: 'WLWWD' },
  { position: 5, teamId: 47, teamName: 'Tottenham', teamLogo: '', played: 30, won: 17, drawn: 4, lost: 9, goalsFor: 62, goalsAgainst: 45, goalDifference: 17, points: 55, form: 'LWWDW' },
  { position: 6, teamId: 49, teamName: 'Chelsea', teamLogo: '', played: 30, won: 15, drawn: 7, lost: 8, goalsFor: 55, goalsAgainst: 42, goalDifference: 13, points: 52, form: 'DWWLW' },
  { position: 7, teamId: 34, teamName: 'Newcastle', teamLogo: '', played: 30, won: 15, drawn: 5, lost: 10, goalsFor: 58, goalsAgainst: 40, goalDifference: 18, points: 50, form: 'WDLWW' },
  { position: 8, teamId: 33, teamName: 'Man United', teamLogo: '', played: 30, won: 14, drawn: 4, lost: 12, goalsFor: 45, goalsAgainst: 48, goalDifference: -3, points: 46, form: 'LDWWL' },
  { position: 9, teamId: 48, teamName: 'West Ham', teamLogo: '', played: 30, won: 12, drawn: 6, lost: 12, goalsFor: 48, goalsAgainst: 52, goalDifference: -4, points: 42, form: 'WLLWD' },
  { position: 10, teamId: 51, teamName: 'Brighton', teamLogo: '', played: 30, won: 11, drawn: 8, lost: 11, goalsFor: 48, goalsAgainst: 45, goalDifference: 3, points: 41, form: 'DDWLW' },
  { position: 11, teamId: 39, teamName: 'Wolves', teamLogo: '', played: 30, won: 11, drawn: 5, lost: 14, goalsFor: 40, goalsAgainst: 50, goalDifference: -10, points: 38, form: 'LLWWL' },
  { position: 12, teamId: 52, teamName: 'Crystal Palace', teamLogo: '', played: 30, won: 10, drawn: 7, lost: 13, goalsFor: 38, goalsAgainst: 48, goalDifference: -10, points: 37, form: 'DLWLW' },
  { position: 13, teamId: 36, teamName: 'Fulham', teamLogo: '', played: 30, won: 10, drawn: 6, lost: 14, goalsFor: 42, goalsAgainst: 50, goalDifference: -8, points: 36, form: 'WLDLW' },
  { position: 14, teamId: 55, teamName: 'Brentford', teamLogo: '', played: 30, won: 9, drawn: 8, lost: 13, goalsFor: 44, goalsAgainst: 50, goalDifference: -6, points: 35, form: 'DLLWD' },
  { position: 15, teamId: 65, teamName: 'Nott\'m Forest', teamLogo: '', played: 30, won: 9, drawn: 7, lost: 14, goalsFor: 35, goalsAgainst: 45, goalDifference: -10, points: 34, form: 'LDWDL' },
  { position: 16, teamId: 35, teamName: 'Bournemouth', teamLogo: '', played: 30, won: 9, drawn: 6, lost: 15, goalsFor: 38, goalsAgainst: 55, goalDifference: -17, points: 33, form: 'WLLDL' },
  { position: 17, teamId: 45, teamName: 'Everton', teamLogo: '', played: 30, won: 8, drawn: 7, lost: 15, goalsFor: 32, goalsAgainst: 44, goalDifference: -12, points: 31, form: 'DLLWL' },
  { position: 18, teamId: 1359, teamName: 'Luton Town', teamLogo: '', played: 30, won: 5, drawn: 7, lost: 18, goalsFor: 35, goalsAgainst: 62, goalDifference: -27, points: 22, form: 'LLDLL' },
  { position: 19, teamId: 44, teamName: 'Burnley', teamLogo: '', played: 30, won: 4, drawn: 6, lost: 20, goalsFor: 28, goalsAgainst: 65, goalDifference: -37, points: 18, form: 'LLLDL' },
  { position: 20, teamId: 62, teamName: 'Sheffield Utd', teamLogo: '', played: 30, won: 3, drawn: 5, lost: 22, goalsFor: 22, goalsAgainst: 72, goalDifference: -50, points: 14, form: 'LLLLL' },
];

const LL_STANDINGS: Standing[] = [
  { position: 1, teamId: 541, teamName: 'Real Madrid', teamLogo: '', played: 30, won: 24, drawn: 4, lost: 2, goalsFor: 75, goalsAgainst: 22, goalDifference: 53, points: 76, form: 'WWWWW' },
  { position: 2, teamId: 529, teamName: 'Barcelona', teamLogo: '', played: 30, won: 22, drawn: 5, lost: 3, goalsFor: 70, goalsAgainst: 35, goalDifference: 35, points: 71, form: 'WWDWW' },
  { position: 3, teamId: 530, teamName: 'Atletico Madrid', teamLogo: '', played: 30, won: 19, drawn: 6, lost: 5, goalsFor: 58, goalsAgainst: 28, goalDifference: 30, points: 63, form: 'DWWWL' },
  { position: 4, teamId: 548, teamName: 'Real Sociedad', teamLogo: '', played: 30, won: 14, drawn: 10, lost: 6, goalsFor: 40, goalsAgainst: 28, goalDifference: 12, points: 52, form: 'WDDWD' },
  { position: 5, teamId: 543, teamName: 'Real Betis', teamLogo: '', played: 30, won: 13, drawn: 8, lost: 9, goalsFor: 42, goalsAgainst: 38, goalDifference: 4, points: 47, form: 'DLWWW' },
  { position: 6, teamId: 533, teamName: 'Villarreal', teamLogo: '', played: 30, won: 12, drawn: 9, lost: 9, goalsFor: 52, goalsAgainst: 45, goalDifference: 7, points: 45, form: 'WLWDW' },
  { position: 7, teamId: 531, teamName: 'Athletic Bilbao', teamLogo: '', played: 30, won: 12, drawn: 8, lost: 10, goalsFor: 42, goalsAgainst: 35, goalDifference: 7, points: 44, form: 'DWWDL' },
  { position: 8, teamId: 727, teamName: 'Osasuna', teamLogo: '', played: 30, won: 11, drawn: 7, lost: 12, goalsFor: 36, goalsAgainst: 42, goalDifference: -6, points: 40, form: 'WLLDW' },
];

const SA_STANDINGS: Standing[] = [
  { position: 1, teamId: 505, teamName: 'Inter Milan', teamLogo: '', played: 30, won: 24, drawn: 3, lost: 3, goalsFor: 72, goalsAgainst: 20, goalDifference: 52, points: 75, form: 'WWWDW' },
  { position: 2, teamId: 489, teamName: 'Juventus', teamLogo: '', played: 30, won: 19, drawn: 8, lost: 3, goalsFor: 55, goalsAgainst: 25, goalDifference: 30, points: 65, form: 'WDWWW' },
  { position: 3, teamId: 492, teamName: 'Napoli', teamLogo: '', played: 30, won: 18, drawn: 5, lost: 7, goalsFor: 60, goalsAgainst: 35, goalDifference: 25, points: 59, form: 'WLWWW' },
  { position: 4, teamId: 489, teamName: 'AC Milan', teamLogo: '', played: 30, won: 17, drawn: 7, lost: 6, goalsFor: 55, goalsAgainst: 38, goalDifference: 17, points: 58, form: 'DWWLW' },
  { position: 5, teamId: 487, teamName: 'Lazio', teamLogo: '', played: 30, won: 15, drawn: 5, lost: 10, goalsFor: 48, goalsAgainst: 38, goalDifference: 10, points: 50, form: 'LWWDW' },
  { position: 6, teamId: 497, teamName: 'AS Roma', teamLogo: '', played: 30, won: 14, drawn: 6, lost: 10, goalsFor: 50, goalsAgainst: 42, goalDifference: 8, points: 48, form: 'WDLWW' },
  { position: 7, teamId: 499, teamName: 'Atalanta', teamLogo: '', played: 30, won: 14, drawn: 4, lost: 12, goalsFor: 55, goalsAgainst: 45, goalDifference: 10, points: 46, form: 'WWLLW' },
  { position: 8, teamId: 500, teamName: 'Fiorentina', teamLogo: '', played: 30, won: 13, drawn: 5, lost: 12, goalsFor: 48, goalsAgainst: 44, goalDifference: 4, points: 44, form: 'LWDWL' },
];

const BL_STANDINGS: Standing[] = [
  { position: 1, teamId: 157, teamName: 'Bayern Munich', teamLogo: '', played: 28, won: 20, drawn: 4, lost: 4, goalsFor: 78, goalsAgainst: 32, goalDifference: 46, points: 64, form: 'WWWDW' },
  { position: 2, teamId: 165, teamName: 'B. Dortmund', teamLogo: '', played: 28, won: 18, drawn: 5, lost: 5, goalsFor: 58, goalsAgainst: 30, goalDifference: 28, points: 59, form: 'WDWWL' },
  { position: 3, teamId: 168, teamName: 'Bayer Leverkusen', teamLogo: '', played: 28, won: 18, drawn: 4, lost: 6, goalsFor: 62, goalsAgainst: 28, goalDifference: 34, points: 58, form: 'WWWWW' },
  { position: 4, teamId: 172, teamName: 'RB Leipzig', teamLogo: '', played: 28, won: 16, drawn: 4, lost: 8, goalsFor: 55, goalsAgainst: 35, goalDifference: 20, points: 52, form: 'LWWWW' },
  { position: 5, teamId: 160, teamName: 'SC Freiburg', teamLogo: '', played: 28, won: 13, drawn: 7, lost: 8, goalsFor: 42, goalsAgainst: 38, goalDifference: 4, points: 46, form: 'DWWLD' },
  { position: 6, teamId: 161, teamName: 'VfB Stuttgart', teamLogo: '', played: 28, won: 14, drawn: 3, lost: 11, goalsFor: 55, goalsAgainst: 42, goalDifference: 13, points: 45, form: 'WLWLW' },
  { position: 7, teamId: 169, teamName: 'Eintracht Frankfurt', teamLogo: '', played: 28, won: 12, drawn: 6, lost: 10, goalsFor: 48, goalsAgainst: 40, goalDifference: 8, points: 42, form: 'DWLWW' },
  { position: 8, teamId: 170, teamName: 'Wolfsburg', teamLogo: '', played: 28, won: 11, drawn: 5, lost: 12, goalsFor: 40, goalsAgainst: 42, goalDifference: -2, points: 38, form: 'LLDWW' },
];

const L1_STANDINGS: Standing[] = [
  { position: 1, teamId: 85, teamName: 'PSG', teamLogo: '', played: 28, won: 22, drawn: 3, lost: 3, goalsFor: 68, goalsAgainst: 25, goalDifference: 43, points: 69, form: 'WWWWW' },
  { position: 2, teamId: 80, teamName: 'Monaco', teamLogo: '', played: 28, won: 16, drawn: 6, lost: 6, goalsFor: 55, goalsAgainst: 32, goalDifference: 23, points: 54, form: 'WDWWL' },
  { position: 3, teamId: 79, teamName: 'Lille', teamLogo: '', played: 28, won: 15, drawn: 7, lost: 6, goalsFor: 48, goalsAgainst: 28, goalDifference: 20, points: 52, form: 'DWWWD' },
  { position: 4, teamId: 81, teamName: 'Marseille', teamLogo: '', played: 28, won: 15, drawn: 5, lost: 8, goalsFor: 52, goalsAgainst: 38, goalDifference: 14, points: 50, form: 'WWLWW' },
  { position: 5, teamId: 94, teamName: 'Rennes', teamLogo: '', played: 28, won: 13, drawn: 6, lost: 9, goalsFor: 42, goalsAgainst: 35, goalDifference: 7, points: 45, form: 'DLWWD' },
  { position: 6, teamId: 84, teamName: 'Nice', teamLogo: '', played: 28, won: 13, drawn: 5, lost: 10, goalsFor: 40, goalsAgainst: 32, goalDifference: 8, points: 44, form: 'WWLDW' },
  { position: 7, teamId: 93, teamName: 'Lens', teamLogo: '', played: 28, won: 12, drawn: 7, lost: 9, goalsFor: 38, goalsAgainst: 35, goalDifference: 3, points: 43, form: 'WDLWL' },
  { position: 8, teamId: 91, teamName: 'Lyon', teamLogo: '', played: 28, won: 12, drawn: 5, lost: 11, goalsFor: 44, goalsAgainst: 40, goalDifference: 4, points: 41, form: 'LWWDW' },
];

export const SAMPLE_STANDINGS: Record<number, Standing[]> = {
  39: PL_STANDINGS,
  140: LL_STANDINGS,
  135: SA_STANDINGS,
  78: BL_STANDINGS,
  61: L1_STANDINGS,
};

// ============================================================
// FIXTURES SAMPLE DATA
// ============================================================

export const SAMPLE_FIXTURES: Record<number, Fixture[]> = {
  39: [
    { id: 1, leagueId: 39, round: 'Matchday 31', date: '2026-03-21', status: 'NS', homeTeam: { id: 42, name: 'Arsenal', logo: '' }, awayTeam: { id: 50, name: 'Manchester City', logo: '' }, homeGoals: null, awayGoals: null, events: [] },
    { id: 2, leagueId: 39, round: 'Matchday 31', date: '2026-03-21', status: 'NS', homeTeam: { id: 40, name: 'Liverpool', logo: '' }, awayTeam: { id: 49, name: 'Chelsea', logo: '' }, homeGoals: null, awayGoals: null, events: [] },
    { id: 3, leagueId: 39, round: 'Matchday 30', date: '2026-03-15', status: 'FT', homeTeam: { id: 50, name: 'Manchester City', logo: '' }, awayTeam: { id: 40, name: 'Liverpool', logo: '' }, homeGoals: 2, awayGoals: 1, events: [
      { minute: 22, type: 'goal', team: 'Manchester City', player: 'E. Haaland', detail: 'Normal Goal' },
      { minute: 45, type: 'goal', team: 'Liverpool', player: 'M. Salah', detail: 'Penalty' },
      { minute: 78, type: 'goal', team: 'Manchester City', player: 'K. De Bruyne', detail: 'Normal Goal' },
    ]},
    { id: 4, leagueId: 39, round: 'Matchday 30', date: '2026-03-14', status: 'FT', homeTeam: { id: 42, name: 'Arsenal', logo: '' }, awayTeam: { id: 47, name: 'Tottenham', logo: '' }, homeGoals: 3, awayGoals: 1, events: [
      { minute: 15, type: 'goal', team: 'Arsenal', player: 'B. Saka', detail: 'Normal Goal' },
      { minute: 33, type: 'goal', team: 'Arsenal', player: 'K. Havertz', detail: 'Header' },
      { minute: 56, type: 'goal', team: 'Tottenham', player: 'H. Son', detail: 'Normal Goal' },
      { minute: 88, type: 'goal', team: 'Arsenal', player: 'B. Saka', detail: 'Normal Goal' },
    ]},
    { id: 5, leagueId: 39, round: 'Matchday 30', date: '2026-03-14', status: 'FT', homeTeam: { id: 33, name: 'Man United', logo: '' }, awayTeam: { id: 34, name: 'Newcastle', logo: '' }, homeGoals: 1, awayGoals: 1, events: [
      { minute: 38, type: 'goal', team: 'Newcastle', player: 'A. Isak', detail: 'Normal Goal' },
      { minute: 72, type: 'goal', team: 'Man United', player: 'R. Højlund', detail: 'Normal Goal' },
    ]},
  ],
  140: [
    { id: 10, leagueId: 140, round: 'Matchday 30', date: '2026-03-15', status: 'FT', homeTeam: { id: 541, name: 'Real Madrid', logo: '' }, awayTeam: { id: 529, name: 'Barcelona', logo: '' }, homeGoals: 3, awayGoals: 2, events: [
      { minute: 12, type: 'goal', team: 'Barcelona', player: 'R. Lewandowski', detail: 'Normal Goal' },
      { minute: 28, type: 'goal', team: 'Real Madrid', player: 'Vinicius Jr', detail: 'Normal Goal' },
      { minute: 45, type: 'goal', team: 'Real Madrid', player: 'J. Bellingham', detail: 'Header' },
      { minute: 68, type: 'goal', team: 'Barcelona', player: 'Lamine Yamal', detail: 'Normal Goal' },
      { minute: 90, type: 'goal', team: 'Real Madrid', player: 'Vinicius Jr', detail: 'Normal Goal' },
    ]},
    { id: 11, leagueId: 140, round: 'Matchday 30', date: '2026-03-14', status: 'FT', homeTeam: { id: 530, name: 'Atletico Madrid', logo: '' }, awayTeam: { id: 533, name: 'Villarreal', logo: '' }, homeGoals: 2, awayGoals: 0, events: [] },
  ],
  135: [
    { id: 20, leagueId: 135, round: 'Matchday 28', date: '2026-03-15', status: 'FT', homeTeam: { id: 505, name: 'Inter Milan', logo: '' }, awayTeam: { id: 489, name: 'AC Milan', logo: '' }, homeGoals: 2, awayGoals: 1, events: [] },
    { id: 21, leagueId: 135, round: 'Matchday 28', date: '2026-03-14', status: 'FT', homeTeam: { id: 492, name: 'Napoli', logo: '' }, awayTeam: { id: 489, name: 'Juventus', logo: '' }, homeGoals: 1, awayGoals: 1, events: [] },
  ],
  78: [
    { id: 30, leagueId: 78, round: 'Matchday 26', date: '2026-03-15', status: 'FT', homeTeam: { id: 157, name: 'Bayern Munich', logo: '' }, awayTeam: { id: 165, name: 'B. Dortmund', logo: '' }, homeGoals: 4, awayGoals: 1, events: [] },
  ],
  61: [
    { id: 40, leagueId: 61, round: 'Matchday 27', date: '2026-03-15', status: 'FT', homeTeam: { id: 85, name: 'PSG', logo: '' }, awayTeam: { id: 81, name: 'Marseille', logo: '' }, homeGoals: 3, awayGoals: 0, events: [] },
  ],
};

// ============================================================
// TOP SCORERS
// ============================================================

export const SAMPLE_TOP_SCORERS: Record<number, TopScorer[]> = {
  39: [
    { playerId: 1, playerName: 'Erling Haaland', playerPhoto: '', teamName: 'Manchester City', teamLogo: '', goals: 24, assists: 5, appearances: 28 },
    { playerId: 2, playerName: 'Mohamed Salah', playerPhoto: '', teamName: 'Liverpool', teamLogo: '', goals: 18, assists: 10, appearances: 29 },
    { playerId: 3, playerName: 'Bukayo Saka', playerPhoto: '', teamName: 'Arsenal', teamLogo: '', goals: 16, assists: 11, appearances: 30 },
  ],
  140: [
    { playerId: 10, playerName: 'Vinicius Jr', playerPhoto: '', teamName: 'Real Madrid', teamLogo: '', goals: 20, assists: 8, appearances: 28 },
    { playerId: 11, playerName: 'R. Lewandowski', playerPhoto: '', teamName: 'Barcelona', teamLogo: '', goals: 19, assists: 4, appearances: 27 },
    { playerId: 12, playerName: 'Jude Bellingham', playerPhoto: '', teamName: 'Real Madrid', teamLogo: '', goals: 16, assists: 7, appearances: 26 },
  ],
  135: [
    { playerId: 20, playerName: 'Lautaro Martinez', playerPhoto: '', teamName: 'Inter Milan', teamLogo: '', goals: 22, assists: 3, appearances: 28 },
  ],
  78: [
    { playerId: 30, playerName: 'Harry Kane', playerPhoto: '', teamName: 'Bayern Munich', teamLogo: '', goals: 28, assists: 6, appearances: 26 },
  ],
  61: [
    { playerId: 40, playerName: 'Kylian Mbappé', playerPhoto: '', teamName: 'PSG', teamLogo: '', goals: 22, assists: 8, appearances: 25 },
  ],
};

// ============================================================
// TRANSFERS
// ============================================================

export const SAMPLE_TRANSFERS: Transfer[] = [
  { id: 1, playerName: 'Kylian Mbappé', playerPhoto: '', playerAge: 27, position: 'FWD', fromTeam: 'PSG', fromTeamLogo: '', toTeam: 'Real Madrid', toTeamLogo: '', fee: 'Free Transfer', leagueId: 140, date: '2026-01-15', type: 'free' },
  { id: 2, playerName: 'Jadon Sancho', playerPhoto: '', playerAge: 26, position: 'FWD', fromTeam: 'Man United', fromTeamLogo: '', toTeam: 'B. Dortmund', toTeamLogo: '', fee: 'Loan', leagueId: 78, date: '2026-01-20', type: 'loan' },
  { id: 3, playerName: 'João Félix', playerPhoto: '', playerAge: 26, position: 'FWD', fromTeam: 'Atletico Madrid', fromTeamLogo: '', toTeam: 'Barcelona', toTeamLogo: '', fee: '$45M', leagueId: 140, date: '2026-02-01', type: 'buy' },
  { id: 4, playerName: 'Douglas Luiz', playerPhoto: '', playerAge: 28, position: 'MID', fromTeam: 'Aston Villa', fromTeamLogo: '', toTeam: 'Juventus', toTeamLogo: '', fee: '$50M', leagueId: 135, date: '2026-01-25', type: 'buy' },
  { id: 5, playerName: 'Nico Williams', playerPhoto: '', playerAge: 24, position: 'FWD', fromTeam: 'Athletic Bilbao', fromTeamLogo: '', toTeam: 'Arsenal', toTeamLogo: '', fee: '$65M', leagueId: 39, date: '2026-02-10', type: 'buy' },
  { id: 6, playerName: 'Randal Kolo Muani', playerPhoto: '', playerAge: 27, position: 'FWD', fromTeam: 'PSG', fromTeamLogo: '', toTeam: 'Juventus', toTeamLogo: '', fee: 'Loan', leagueId: 135, date: '2026-01-18', type: 'loan' },
  { id: 7, playerName: 'Khvicha Kvaratskhelia', playerPhoto: '', playerAge: 25, position: 'FWD', fromTeam: 'Napoli', fromTeamLogo: '', toTeam: 'PSG', toTeamLogo: '', fee: '$75M', leagueId: 61, date: '2026-01-12', type: 'buy' },
  { id: 8, playerName: 'Leandro Trossard', playerPhoto: '', playerAge: 31, position: 'FWD', fromTeam: 'Arsenal', fromTeamLogo: '', toTeam: 'Aston Villa', toTeamLogo: '', fee: '$28M', leagueId: 39, date: '2026-02-05', type: 'buy' },
];

// ============================================================
// HIGHLIGHTS
// ============================================================

export const SAMPLE_HIGHLIGHTS: Highlight[] = [
  { id: 1, title: 'Man City vs Liverpool - All Goals', homeTeam: 'Manchester City', awayTeam: 'Liverpool', score: '2-1', leagueId: 39, date: '2026-03-15', thumbnailUrl: '', videoUrl: '', duration: '5:30' },
  { id: 2, title: 'El Clásico - Real Madrid vs Barcelona', homeTeam: 'Real Madrid', awayTeam: 'Barcelona', score: '3-2', leagueId: 140, date: '2026-03-15', thumbnailUrl: '', videoUrl: '', duration: '8:15' },
  { id: 3, title: 'Arsenal 3-1 Tottenham - North London Derby', homeTeam: 'Arsenal', awayTeam: 'Tottenham', score: '3-1', leagueId: 39, date: '2026-03-14', thumbnailUrl: '', videoUrl: '', duration: '6:42' },
  { id: 4, title: 'Milan Derby - Inter vs AC Milan', homeTeam: 'Inter Milan', awayTeam: 'AC Milan', score: '2-1', leagueId: 135, date: '2026-03-15', thumbnailUrl: '', videoUrl: '', duration: '4:55' },
  { id: 5, title: 'Der Klassiker - Bayern vs Dortmund', homeTeam: 'Bayern Munich', awayTeam: 'B. Dortmund', score: '4-1', leagueId: 78, date: '2026-03-15', thumbnailUrl: '', videoUrl: '', duration: '7:20' },
  { id: 6, title: 'Le Classique - PSG vs Marseille', homeTeam: 'PSG', awayTeam: 'Marseille', score: '3-0', leagueId: 61, date: '2026-03-15', thumbnailUrl: '', videoUrl: '', duration: '5:10' },
];

// ============================================================
// DREAM TEAM PLAYERS (100 players across 5 leagues & 4 tiers)
// ============================================================

const PLAYER_PHOTOS: Record<string, string> = {
  "Chelsea": "https://r2.thesportsdb.com/images/media/player/thumb/zhx7i01558607888.jpg",
  "Villarreal": "https://r2.thesportsdb.com/images/media/player/cutout/vozv9t1631441703.png",
  "Marseille": "https://r2.thesportsdb.com/images/media/player/thumb/egidxk1756723478.jpg",
  "Erling Haaland": "https://r2.thesportsdb.com/images/media/player/cutout/un3jr11769182465.png",
  "Mohamed Salah": "https://r2.thesportsdb.com/images/media/player/cutout/3blc581757088735.png",
  "Virgil van Dijk": "https://r2.thesportsdb.com/images/media/player/cutout/9cxf2q1757087742.png",
  "Jude Bellingham": "https://r2.thesportsdb.com/images/media/player/cutout/trk5271750271712.png",
  "Robert Lewandowski": "https://r2.thesportsdb.com/images/media/player/cutout/xg2rl51762289740.png",
  "Lautaro Martinez": "https://r2.thesportsdb.com/images/media/player/cutout/vwxq811759408924.png",
  "Lionel Messi": "https://r2.thesportsdb.com/images/media/player/cutout/e0i2051750317027.png",
  "Xavi Simons": "https://r2.thesportsdb.com/images/media/player/cutout/uc5tjn1757016055.png",
  "Ousmane Demb\u00e9l\u00e9": "https://r2.thesportsdb.com/images/media/player/cutout/pstgy21766335175.png",
  "Ben White": "https://r2.thesportsdb.com/images/media/player/cutout/o0wya01761495814.png",
  "Lisandro Mart\u00ednez": "https://r2.thesportsdb.com/images/media/player/cutout/mqcogi1766826879.png",
  "Andr\u00e9 Onana": "https://r2.thesportsdb.com/images/media/player/cutout/ha3jbx1766826944.png",
  "Unai Sim\u00f3n": "https://r2.thesportsdb.com/images/media/player/cutout/6b7izw1603316358.png",
  "Alejandro Garnacho": "https://r2.thesportsdb.com/images/media/player/cutout/69y34j1757003249.png",
  "Kobbie Mainoo": "https://r2.thesportsdb.com/images/media/player/cutout/8qrveo1766826836.png",
  "Evan Ferguson": "https://r2.thesportsdb.com/images/media/player/cutout/5fxu221758815127.png",
  "Rico Lewis": "https://r2.thesportsdb.com/images/media/player/cutout/lt67041769182828.png",
  "Pau Cubars\u00ed": "https://r2.thesportsdb.com/images/media/player/cutout/tynei31768321729.png",
  "Arda G\u00fcler": "https://r2.thesportsdb.com/images/media/player/cutout/lwnog21768499165.png",
  "Endrick": "https://r2.thesportsdb.com/images/media/player/cutout/5yb3rv1733653315.png",
  "Sandro Tonali": "https://r2.thesportsdb.com/images/media/player/cutout/b9oang1766824727.png",
  "Jo\u0161ko Gvardiol": "https://r2.thesportsdb.com/images/media/player/cutout/mmowa11769183247.png",
  "Warren Za\u00efre-Emery": "https://r2.thesportsdb.com/images/media/player/cutout/fjxbac1766335583.png",
  "Mathys Tel": "https://r2.thesportsdb.com/images/media/player/cutout/4e915x1757016205.png",
  "Giorgio Scalvini": "https://r2.thesportsdb.com/images/media/player/cutout/g116sb1695157494.png",
  "Destiny Udogie": "https://r2.thesportsdb.com/images/media/player/cutout/cduafm1757016239.png",
  "Adam Wharton": "https://r2.thesportsdb.com/images/media/player/cutout/dierqf1761492318.png",
  "Iliman Ndiaye": "https://r2.thesportsdb.com/images/media/player/cutout/rten2t1756977078.png",
  "D\u00e9sir\u00e9 Dou\u00e9": "https://r2.thesportsdb.com/images/media/player/cutout/5m0p4g1766335194.png",
  "Jamie Bynoe-Gittens": "https://r2.thesportsdb.com/images/media/player/cutout/a3u6fu1757002320.png",
  "Youssouf Fofana": "https://r2.thesportsdb.com/images/media/player/cutout/3npg7a1758892447.png",
  "Yankuba Minteh": "https://r2.thesportsdb.com/images/media/player/cutout/1345u71756998901.png",
  "Gabri Veiga": "https://r2.thesportsdb.com/images/media/player/cutout/sfrp5w1750441360.png",
  "Guglielmo Vicario": "https://r2.thesportsdb.com/images/media/player/cutout/5xu8ds1757015525.png",
  "Giorgi Mamardashvili": "https://r2.thesportsdb.com/images/media/player/cutout/3yoja81757088527.png",
  "Lev Yashin": "https://r2.thesportsdb.com/images/media/player/thumb/h9husk1594070133.jpg",
  "Gianluigi Buffon": "https://r2.thesportsdb.com/images/media/player/cutout/khpcg01586360050.png",
  "Paolo Maldini": "https://r2.thesportsdb.com/images/media/player/cutout/9ccmbp1665653152.png",
  "Franz Beckenbauer": "https://r2.thesportsdb.com/images/media/player/cutout/nkcqxh1704739821.png",
  "Harry Kane": "https://r2.thesportsdb.com/images/media/player/cutout/j4ouvd1756408895.png",
  "Florian Wirtz": "https://r2.thesportsdb.com/images/media/player/cutout/8t6bzo1757088899.png",
  "Kylian Mbapp\u00e9": "https://r2.thesportsdb.com/images/media/player/cutout/h9u9vz1733653583.png",
  "Alisson Becker": "https://r2.thesportsdb.com/images/media/player/cutout/8amq961757087569.png",
  "Bukayo Saka": "https://r2.thesportsdb.com/images/media/player/cutout/xfwok41769331816.png",
  "Phil Foden": "https://r2.thesportsdb.com/images/media/player/cutout/lbn4sx1769182620.png",
  "Declan Rice": "https://r2.thesportsdb.com/images/media/player/cutout/do2pew1694204464.png",
  "William Saliba": "https://r2.thesportsdb.com/images/media/player/cutout/czasy21769331889.png",
  "Pedri": "https://r2.thesportsdb.com/images/media/player/cutout/srwppu1424795582.png",
  "Gavi": "https://r2.thesportsdb.com/images/media/player/cutout/29005498.png",
  "Federico Valverde": "https://r2.thesportsdb.com/images/media/player/cutout/5249151768499204.png",
  "Nicol\u00f2 Barella": "https://r2.thesportsdb.com/images/media/player/cutout/k03sge1759408783.png",
  "Rafael Le\u00e3o": "https://r2.thesportsdb.com/images/media/player/cutout/tlgrvf1758892567.png",
  "Jamal Musiala": "https://r2.thesportsdb.com/images/media/player/cutout/vbkv611756416067.png",
  "Alexander Isak": "https://r2.thesportsdb.com/images/media/player/cutout/3qj7z41757088281.png",
  "Son Heung-min": "https://r2.thesportsdb.com/images/media/player/cutout/a5cqf81766425262.png",
  "Ederson": "https://r2.thesportsdb.com/images/media/player/cutout/xhlait1769179027.png",
  "Marc-Andr\u00e9 ter Stegen": "https://r2.thesportsdb.com/images/media/player/cutout/3ol09m1762289952.png",
  "Antonio R\u00fcdiger": "https://r2.thesportsdb.com/images/media/player/cutout/ftp1ci1733653186.png",
  "Kai Havertz": "https://r2.thesportsdb.com/images/media/player/cutout/hem4r91694204364.png",
  "Bruno Guimar\u00e3es": "https://r2.thesportsdb.com/images/media/player/cutout/qr8gk01766824971.png",
  "Rasmus H\u00f8jlund": "https://r2.thesportsdb.com/images/media/player/cutout/jop7ho1762288170.png",
  "Ollie Watkins": "https://r2.thesportsdb.com/images/media/player/cutout/w6dir11756987347.png",
  "Cole Palmer": "https://r2.thesportsdb.com/images/media/player/cutout/fn0pzc1757010119.png",
  "Lamine Yamal": "https://r2.thesportsdb.com/images/media/player/cutout/m9n4ja1761512633.png",
  "Aur\u00e9lien Tchouam\u00e9ni": "https://r2.thesportsdb.com/images/media/player/cutout/4o417k1733653668.png",
  "Jules Kound\u00e9": "https://r2.thesportsdb.com/images/media/player/cutout/qea88i1726509803.png",
  "Hakan \u00c7alhano\u011flu": "https://r2.thesportsdb.com/images/media/player/cutout/hw8uxm1759408821.png",
  "Federico Chiesa": "https://r2.thesportsdb.com/images/media/player/cutout/idecla1757087689.png",
  "Leroy San\u00e9": "https://r2.thesportsdb.com/images/media/player/cutout/bqdwlt1769178212.png",
  "Roberto Carlos": "https://r2.thesportsdb.com/images/media/player/cutout/ypsxvy1483909094.png",
  "Cafu": "https://r2.thesportsdb.com/images/media/player/cutout/9t0i4f1665653369.png",
  "Sergio Ramos": "https://r2.thesportsdb.com/images/media/player/cutout/ztj6241701091276.png",
  "Zinedine Zidane": "https://r2.thesportsdb.com/images/media/player/cutout/ae7bng1586814446.png",
  "Ronaldinho": "https://r2.thesportsdb.com/images/media/player/cutout/u91au61586868506.png",
  "Ab\u00e9di Pel\u00e9": "https://r2.thesportsdb.com/images/media/player/cutout/2mkknd1629291016.png",
  "Andr\u00e9s Iniesta": "https://r2.thesportsdb.com/images/media/player/cutout/nx7oze1611167333.png",
  "Xavi Hern\u00e1ndez": "https://r2.thesportsdb.com/images/media/player/thumb/2gf9dm1761079003.jpg",
  "Andrea Pirlo": "https://r2.thesportsdb.com/images/media/player/cutout/x665lb1606483660.png",
  "Diego Maradona": "https://r2.thesportsdb.com/images/media/player/cutout/v298851606327825.png",
  "Cristiano Ronaldo": "https://r2.thesportsdb.com/images/media/player/cutout/a19jje1761592498.png",
  "Johan Cruyff": "https://r2.thesportsdb.com/images/media/player/cutout/ze75mx1594069754.png",
  "Karim Benzema": "https://r2.thesportsdb.com/images/media/player/cutout/7jdxvc1771665502.png",
  "Ferenc Pusk\u00e1s": "https://r2.thesportsdb.com/images/media/player/cutout/ibu3e01615743315.png",
  "Thierry Henry": "https://r2.thesportsdb.com/images/media/player/cutout/omd0kz1698248921.png",
  "Marcelo": "https://r2.thesportsdb.com/images/media/player/cutout/4mlqdq1699193933.png",
  "R\u00faben Dias": "https://r2.thesportsdb.com/images/media/player/cutout/g3psnr1769183713.png",
  "Dani Carvajal": "https://r2.thesportsdb.com/images/media/player/cutout/k510z81733653425.png",
  "Alessandro Bastoni": "https://r2.thesportsdb.com/images/media/player/cutout/hwixpa1759408795.png",
  "Rodri": "https://r2.thesportsdb.com/images/media/player/cutout/0ml2zi1761148957.png",
  "Martin \u00d8degaard": "https://r2.thesportsdb.com/images/media/player/cutout/5g6vww1769331695.png",
  "Vinicius Jr": "https://r2.thesportsdb.com/images/media/player/cutout/ejuxsh1750271859.png",
  "Ronaldo de Lima": "https://r2.thesportsdb.com/images/media/player/cutout/j53jt41615744273.png"
};

function playerPhoto(name: string): string {
  return PLAYER_PHOTOS[name] || `https://api.dicebear.com/9.x/avataaars/png?seed=${encodeURIComponent(name)}&size=128`;
}

export const SAMPLE_PLAYERS: DreamTeamPlayer[] = [
  // === STAR TIER ($5M) - Rating 88-99 ===
  // Premier League Stars
  { id: 1, name: 'Erling Haaland', team: 'Manchester City', league: 'Premier League', leagueId: 39, position: 'FWD', tier: 'Star', rating: 94, pace: 89, shooting: 96, passing: 70, defending: 40, physical: 90, photo: playerPhoto('Erling Haaland') },
  { id: 2, name: 'Mohamed Salah', team: 'Liverpool', league: 'Premier League', leagueId: 39, position: 'FWD', tier: 'Star', rating: 90, pace: 93, shooting: 91, passing: 82, defending: 42, physical: 75, photo: playerPhoto('Mohamed Salah') },
  { id: 3, name: 'Kevin De Bruyne', team: 'Manchester City', league: 'Premier League', leagueId: 39, position: 'MID', tier: 'Star', rating: 89, pace: 68, shooting: 86, passing: 95, defending: 58, physical: 70, photo: playerPhoto('Kevin De Bruyne') },
  { id: 4, name: 'Virgil van Dijk', team: 'Liverpool', league: 'Premier League', leagueId: 39, position: 'DEF', tier: 'Star', rating: 88, pace: 72, shooting: 55, passing: 72, defending: 92, physical: 88, photo: playerPhoto('Virgil van Dijk') },
  // La Liga Stars
  { id: 5, name: 'Vinicius Jr', team: 'Real Madrid', league: 'La Liga', leagueId: 140, position: 'FWD', tier: 'Star', rating: 93, pace: 97, shooting: 88, passing: 80, defending: 35, physical: 68, photo: playerPhoto('Vinicius Jr') },
  { id: 6, name: 'Jude Bellingham', team: 'Real Madrid', league: 'La Liga', leagueId: 140, position: 'MID', tier: 'Star', rating: 90, pace: 78, shooting: 85, passing: 88, defending: 68, physical: 82, photo: playerPhoto('Jude Bellingham') },
  { id: 7, name: 'Robert Lewandowski', team: 'Barcelona', league: 'La Liga', leagueId: 140, position: 'FWD', tier: 'Star', rating: 88, pace: 60, shooting: 95, passing: 78, defending: 38, physical: 78, photo: playerPhoto('Robert Lewandowski') },
  // Serie A Stars
  { id: 8, name: 'Lautaro Martinez', team: 'Inter Milan', league: 'Serie A', leagueId: 135, position: 'FWD', tier: 'Star', rating: 88, pace: 82, shooting: 90, passing: 72, defending: 40, physical: 80, photo: playerPhoto('Lautaro Martinez') },
  // Bundesliga Stars
  { id: 9, name: 'Harry Kane', team: 'Bayern Munich', league: 'Bundesliga', leagueId: 78, position: 'FWD', tier: 'Star', rating: 90, pace: 70, shooting: 95, passing: 85, defending: 42, physical: 82, photo: playerPhoto('Harry Kane') },
  { id: 10, name: 'Florian Wirtz', team: 'Bayer Leverkusen', league: 'Bundesliga', leagueId: 78, position: 'MID', tier: 'Star', rating: 90, pace: 80, shooting: 82, passing: 90, defending: 52, physical: 62, photo: playerPhoto('Florian Wirtz') },
  // Ligue 1 Stars
  { id: 11, name: 'Kylian Mbappé', team: 'Real Madrid', league: 'La Liga', leagueId: 140, position: 'FWD', tier: 'Star', rating: 93, pace: 98, shooting: 92, passing: 80, defending: 36, physical: 78, photo: playerPhoto('Kylian Mbappé') },
  { id: 12, name: 'Alisson Becker', team: 'Liverpool', league: 'Premier League', leagueId: 39, position: 'GK', tier: 'Star', rating: 89, pace: 45, shooting: 20, passing: 72, defending: 30, physical: 80, photo: playerPhoto('Alisson Becker') },

  // === GREAT TIER ($3M) - Rating 83-87 ===
  { id: 13, name: 'Bukayo Saka', team: 'Arsenal', league: 'Premier League', leagueId: 39, position: 'FWD', tier: 'Great', rating: 88, pace: 88, shooting: 82, passing: 84, defending: 58, physical: 70, photo: playerPhoto('Bukayo Saka') },
  { id: 14, name: 'Phil Foden', team: 'Manchester City', league: 'Premier League', leagueId: 39, position: 'MID', tier: 'Great', rating: 87, pace: 80, shooting: 82, passing: 86, defending: 52, physical: 62, photo: playerPhoto('Phil Foden') },
  { id: 15, name: 'Declan Rice', team: 'Arsenal', league: 'Premier League', leagueId: 39, position: 'MID', tier: 'Great', rating: 87, pace: 70, shooting: 68, passing: 80, defending: 88, physical: 84, photo: playerPhoto('Declan Rice') },
  { id: 16, name: 'William Saliba', team: 'Arsenal', league: 'Premier League', leagueId: 39, position: 'DEF', tier: 'Great', rating: 86, pace: 78, shooting: 40, passing: 68, defending: 88, physical: 82, photo: playerPhoto('William Saliba') },
  { id: 17, name: 'Pedri', team: 'Barcelona', league: 'La Liga', leagueId: 140, position: 'MID', tier: 'Great', rating: 87, pace: 72, shooting: 72, passing: 90, defending: 68, physical: 60, photo: playerPhoto('Pedri') },
  { id: 18, name: 'Gavi', team: 'Barcelona', league: 'La Liga', leagueId: 140, position: 'MID', tier: 'Great', rating: 83, pace: 76, shooting: 70, passing: 84, defending: 72, physical: 70, photo: playerPhoto('Gavi') },
  { id: 19, name: 'Federico Valverde', team: 'Real Madrid', league: 'La Liga', leagueId: 140, position: 'MID', tier: 'Great', rating: 88, pace: 82, shooting: 80, passing: 82, defending: 78, physical: 84, photo: playerPhoto('Federico Valverde') },
  { id: 20, name: 'Nicolò Barella', team: 'Inter Milan', league: 'Serie A', leagueId: 135, position: 'MID', tier: 'Great', rating: 87, pace: 74, shooting: 78, passing: 85, defending: 72, physical: 78, photo: playerPhoto('Nicolò Barella') },
  { id: 21, name: 'Rafael Leão', team: 'AC Milan', league: 'Serie A', leagueId: 135, position: 'FWD', tier: 'Great', rating: 85, pace: 95, shooting: 80, passing: 75, defending: 30, physical: 72, photo: playerPhoto('Rafael Leão') },
  { id: 22, name: 'Jamal Musiala', team: 'Bayern Munich', league: 'Bundesliga', leagueId: 78, position: 'MID', tier: 'Great', rating: 88, pace: 82, shooting: 80, passing: 85, defending: 45, physical: 62, photo: playerPhoto('Jamal Musiala') },
  { id: 23, name: 'Alexander Isak', team: 'Newcastle', league: 'Premier League', leagueId: 39, position: 'FWD', tier: 'Great', rating: 86, pace: 88, shooting: 84, passing: 72, defending: 32, physical: 72, photo: playerPhoto('Alexander Isak') },
  { id: 24, name: 'Son Heung-min', team: 'Tottenham', league: 'Premier League', leagueId: 39, position: 'FWD', tier: 'Great', rating: 86, pace: 82, shooting: 88, passing: 82, defending: 40, physical: 68, photo: playerPhoto('Son Heung-min') },
  { id: 25, name: 'Ederson', team: 'Manchester City', league: 'Premier League', leagueId: 39, position: 'GK', tier: 'Great', rating: 87, pace: 42, shooting: 18, passing: 85, defending: 28, physical: 78, photo: playerPhoto('Ederson') },
  { id: 26, name: 'Marc-André ter Stegen', team: 'Barcelona', league: 'La Liga', leagueId: 140, position: 'GK', tier: 'Great', rating: 87, pace: 40, shooting: 15, passing: 82, defending: 30, physical: 75, photo: playerPhoto('Marc-André ter Stegen') },
  { id: 27, name: 'Antonio Rüdiger', team: 'Real Madrid', league: 'La Liga', leagueId: 140, position: 'DEF', tier: 'Great', rating: 86, pace: 82, shooting: 48, passing: 62, defending: 88, physical: 88, photo: playerPhoto('Antonio Rüdiger') },

  // === GOOD TIER ($1.5M) - Rating 78-82 ===
  { id: 28, name: 'Kai Havertz', team: 'Arsenal', league: 'Premier League', leagueId: 39, position: 'FWD', tier: 'Good', rating: 83, pace: 72, shooting: 78, passing: 78, defending: 50, physical: 76, photo: playerPhoto('Kai Havertz') },
  { id: 29, name: 'Bruno Guimarães', team: 'Newcastle', league: 'Premier League', leagueId: 39, position: 'MID', tier: 'Good', rating: 84, pace: 62, shooting: 72, passing: 84, defending: 78, physical: 72, photo: playerPhoto('Bruno Guimarães') },
  { id: 30, name: 'Rasmus Højlund', team: 'Man United', league: 'Premier League', leagueId: 39, position: 'FWD', tier: 'Good', rating: 79, pace: 85, shooting: 78, passing: 62, defending: 35, physical: 78, photo: playerPhoto('Rasmus Højlund') },
  { id: 31, name: 'Ollie Watkins', team: 'Aston Villa', league: 'Premier League', leagueId: 39, position: 'FWD', tier: 'Good', rating: 83, pace: 84, shooting: 80, passing: 72, defending: 38, physical: 78, photo: playerPhoto('Ollie Watkins') },
  { id: 32, name: 'Cole Palmer', team: 'Chelsea', league: 'Premier League', leagueId: 39, position: 'MID', tier: 'Good', rating: 87, pace: 76, shooting: 86, passing: 84, defending: 40, physical: 58, photo: playerPhoto('Cole Palmer') },
  { id: 33, name: 'Lamine Yamal', team: 'Barcelona', league: 'La Liga', leagueId: 140, position: 'FWD', tier: 'Good', rating: 86, pace: 94, shooting: 80, passing: 82, defending: 28, physical: 55, photo: playerPhoto('Lamine Yamal') },
  { id: 34, name: 'Aurélien Tchouaméni', team: 'Real Madrid', league: 'La Liga', leagueId: 140, position: 'MID', tier: 'Good', rating: 84, pace: 72, shooting: 68, passing: 78, defending: 85, physical: 82, photo: playerPhoto('Aurélien Tchouaméni') },
  { id: 35, name: 'Jules Koundé', team: 'Barcelona', league: 'La Liga', leagueId: 140, position: 'DEF', tier: 'Good', rating: 85, pace: 80, shooting: 42, passing: 72, defending: 84, physical: 74, photo: playerPhoto('Jules Koundé') },
  { id: 36, name: 'Hakan Çalhanoğlu', team: 'Inter Milan', league: 'Serie A', leagueId: 135, position: 'MID', tier: 'Good', rating: 85, pace: 60, shooting: 82, passing: 85, defending: 72, physical: 72, photo: playerPhoto('Hakan Çalhanoğlu') },
  { id: 37, name: 'Federico Chiesa', team: 'Juventus', league: 'Serie A', leagueId: 135, position: 'FWD', tier: 'Good', rating: 80, pace: 90, shooting: 78, passing: 70, defending: 32, physical: 66, photo: playerPhoto('Federico Chiesa') },
  { id: 38, name: 'Leroy Sané', team: 'Bayern Munich', league: 'Bundesliga', leagueId: 78, position: 'FWD', tier: 'Good', rating: 82, pace: 92, shooting: 80, passing: 78, defending: 35, physical: 62, photo: playerPhoto('Leroy Sané') },
  { id: 39, name: 'Xavi Simons', team: 'RB Leipzig', league: 'Bundesliga', leagueId: 78, position: 'MID', tier: 'Good', rating: 83, pace: 82, shooting: 76, passing: 80, defending: 42, physical: 62, photo: playerPhoto('Xavi Simons') },
  { id: 40, name: 'Ousmane Dembélé', team: 'PSG', league: 'Ligue 1', leagueId: 61, position: 'FWD', tier: 'Good', rating: 84, pace: 94, shooting: 76, passing: 78, defending: 30, physical: 58, photo: playerPhoto('Ousmane Dembélé') },
  { id: 41, name: 'Ben White', team: 'Arsenal', league: 'Premier League', leagueId: 39, position: 'DEF', tier: 'Good', rating: 83, pace: 78, shooting: 42, passing: 72, defending: 84, physical: 76, photo: playerPhoto('Ben White') },
  { id: 42, name: 'Lisandro Martínez', team: 'Man United', league: 'Premier League', leagueId: 39, position: 'DEF', tier: 'Good', rating: 83, pace: 72, shooting: 38, passing: 72, defending: 85, physical: 82, photo: playerPhoto('Lisandro Martínez') },
  { id: 43, name: 'André Onana', team: 'Man United', league: 'Premier League', leagueId: 39, position: 'GK', tier: 'Good', rating: 83, pace: 40, shooting: 12, passing: 78, defending: 25, physical: 72, photo: playerPhoto('André Onana') },
  { id: 44, name: 'Unai Simón', team: 'Athletic Bilbao', league: 'La Liga', leagueId: 140, position: 'GK', tier: 'Good', rating: 83, pace: 38, shooting: 14, passing: 72, defending: 28, physical: 78, photo: playerPhoto('Unai Simón') },

  // === RISING TIER ($750K) - Rating 70-77 ===
  { id: 45, name: 'Alejandro Garnacho', team: 'Man United', league: 'Premier League', leagueId: 39, position: 'FWD', tier: 'Rising', rating: 77, pace: 90, shooting: 72, passing: 68, defending: 30, physical: 62, photo: playerPhoto('Alejandro Garnacho') },
  { id: 46, name: 'Kobbie Mainoo', team: 'Man United', league: 'Premier League', leagueId: 39, position: 'MID', tier: 'Rising', rating: 76, pace: 72, shooting: 68, passing: 76, defending: 72, physical: 70, photo: playerPhoto('Kobbie Mainoo') },
  { id: 47, name: 'Evan Ferguson', team: 'Brighton', league: 'Premier League', leagueId: 39, position: 'FWD', tier: 'Rising', rating: 75, pace: 78, shooting: 78, passing: 62, defending: 28, physical: 76, photo: playerPhoto('Evan Ferguson') },
  { id: 48, name: 'Rico Lewis', team: 'Manchester City', league: 'Premier League', leagueId: 39, position: 'DEF', tier: 'Rising', rating: 76, pace: 78, shooting: 55, passing: 78, defending: 72, physical: 62, photo: playerPhoto('Rico Lewis') },
  { id: 49, name: 'Pau Cubarsí', team: 'Barcelona', league: 'La Liga', leagueId: 140, position: 'DEF', tier: 'Rising', rating: 76, pace: 76, shooting: 35, passing: 70, defending: 78, physical: 72, photo: playerPhoto('Pau Cubarsí') },
  { id: 50, name: 'Arda Güler', team: 'Real Madrid', league: 'La Liga', leagueId: 140, position: 'MID', tier: 'Rising', rating: 76, pace: 72, shooting: 78, passing: 80, defending: 30, physical: 52, photo: playerPhoto('Arda Güler') },
  { id: 51, name: 'Endrick', team: 'Real Madrid', league: 'La Liga', leagueId: 140, position: 'FWD', tier: 'Rising', rating: 74, pace: 82, shooting: 78, passing: 62, defending: 28, physical: 72, photo: playerPhoto('Endrick') },
  { id: 52, name: 'Sandro Tonali', team: 'Newcastle', league: 'Premier League', leagueId: 39, position: 'MID', tier: 'Rising', rating: 77, pace: 68, shooting: 70, passing: 80, defending: 78, physical: 72, photo: playerPhoto('Sandro Tonali') },
  { id: 53, name: 'Joško Gvardiol', team: 'Manchester City', league: 'Premier League', leagueId: 39, position: 'DEF', tier: 'Rising', rating: 77, pace: 76, shooting: 50, passing: 68, defending: 82, physical: 80, photo: playerPhoto('Joško Gvardiol') },
  { id: 54, name: 'Warren Zaïre-Emery', team: 'PSG', league: 'Ligue 1', leagueId: 61, position: 'MID', tier: 'Rising', rating: 76, pace: 75, shooting: 68, passing: 78, defending: 72, physical: 70, photo: playerPhoto('Warren Zaïre-Emery') },
  { id: 55, name: 'Mathys Tel', team: 'Bayern Munich', league: 'Bundesliga', leagueId: 78, position: 'FWD', tier: 'Rising', rating: 74, pace: 88, shooting: 72, passing: 65, defending: 28, physical: 62, photo: playerPhoto('Mathys Tel') },
  { id: 56, name: 'Giorgio Scalvini', team: 'Atalanta', league: 'Serie A', leagueId: 135, position: 'DEF', tier: 'Rising', rating: 76, pace: 72, shooting: 42, passing: 68, defending: 78, physical: 78, photo: playerPhoto('Giorgio Scalvini') },
  { id: 57, name: 'Destiny Udogie', team: 'Tottenham', league: 'Premier League', leagueId: 39, position: 'DEF', tier: 'Rising', rating: 76, pace: 85, shooting: 55, passing: 68, defending: 75, physical: 72, photo: playerPhoto('Destiny Udogie') },
  { id: 58, name: 'Adam Wharton', team: 'Crystal Palace', league: 'Premier League', leagueId: 39, position: 'MID', tier: 'Rising', rating: 75, pace: 62, shooting: 65, passing: 80, defending: 72, physical: 65, photo: playerPhoto('Adam Wharton') },
  { id: 59, name: 'Iliman Ndiaye', team: 'Marseille', league: 'Ligue 1', leagueId: 61, position: 'FWD', tier: 'Rising', rating: 75, pace: 84, shooting: 72, passing: 72, defending: 30, physical: 65, photo: playerPhoto('Iliman Ndiaye') },
  { id: 60, name: 'Désiré Doué', team: 'Rennes', league: 'Ligue 1', leagueId: 61, position: 'MID', tier: 'Rising', rating: 74, pace: 80, shooting: 68, passing: 75, defending: 38, physical: 58, photo: playerPhoto('Désiré Doué') },
  { id: 61, name: 'Jamie Bynoe-Gittens', team: 'B. Dortmund', league: 'Bundesliga', leagueId: 78, position: 'FWD', tier: 'Rising', rating: 74, pace: 90, shooting: 70, passing: 65, defending: 25, physical: 55, photo: playerPhoto('Jamie Bynoe-Gittens') },
  { id: 62, name: 'Youssouf Fofana', team: 'AC Milan', league: 'Serie A', leagueId: 135, position: 'MID', tier: 'Rising', rating: 77, pace: 68, shooting: 65, passing: 75, defending: 80, physical: 78, photo: playerPhoto('Youssouf Fofana') },
  { id: 63, name: 'Yankuba Minteh', team: 'Brighton', league: 'Premier League', leagueId: 39, position: 'FWD', tier: 'Rising', rating: 73, pace: 92, shooting: 68, passing: 62, defending: 28, physical: 60, photo: playerPhoto('Yankuba Minteh') },
  { id: 64, name: 'Gabri Veiga', team: 'PSG', league: 'Ligue 1', leagueId: 61, position: 'MID', tier: 'Rising', rating: 74, pace: 70, shooting: 75, passing: 76, defending: 58, physical: 65, photo: playerPhoto('Gabri Veiga') },
  { id: 65, name: 'Guglielmo Vicario', team: 'Tottenham', league: 'Premier League', leagueId: 39, position: 'GK', tier: 'Rising', rating: 77, pace: 35, shooting: 10, passing: 60, defending: 25, physical: 75, photo: playerPhoto('Guglielmo Vicario') },
  { id: 66, name: 'Giorgi Mamardashvili', team: 'Valencia', league: 'La Liga', leagueId: 140, position: 'GK', tier: 'Rising', rating: 76, pace: 38, shooting: 12, passing: 55, defending: 28, physical: 78, photo: playerPhoto('Giorgi Mamardashvili') },

  // === LEGENDS (all 99 rated for ultimate team) ===
  // GK
  { id: 99, name: 'Lev Yashin', team: 'Legends', league: 'La Liga', leagueId: 140, position: 'GK', tier: 'Legend', rating: 95, pace: 50, shooting: 10, passing: 65, defending: 40, physical: 92, photo: playerPhoto('Lev Yashin') },
  { id: 150, name: 'Gianluigi Buffon', team: 'Legends', league: 'Serie A', leagueId: 135, position: 'GK', tier: 'Legend', rating: 92, pace: 48, shooting: 8, passing: 68, defending: 38, physical: 90, photo: playerPhoto('Gianluigi Buffon') },

  // DEF — now all 99
  { id: 112, name: 'Paolo Maldini', team: 'Legends', league: 'Serie A', leagueId: 135, position: 'DEF', tier: 'Legend', rating: 96, pace: 78, shooting: 48, passing: 78, defending: 97, physical: 88, photo: playerPhoto('Paolo Maldini') },
  { id: 113, name: 'Franz Beckenbauer', team: 'Legends', league: 'Bundesliga', leagueId: 78, position: 'DEF', tier: 'Legend', rating: 95, pace: 76, shooting: 75, passing: 90, defending: 95, physical: 85, photo: playerPhoto('Franz Beckenbauer') },
  { id: 105, name: 'Roberto Carlos', team: 'Legends', league: 'La Liga', leagueId: 140, position: 'DEF', tier: 'Legend', rating: 93, pace: 92, shooting: 88, passing: 85, defending: 82, physical: 80, photo: playerPhoto('Roberto Carlos') },
  { id: 151, name: 'Cafu', team: 'Legends', league: 'Serie A', leagueId: 135, position: 'DEF', tier: 'Legend', rating: 92, pace: 90, shooting: 58, passing: 80, defending: 88, physical: 85, photo: playerPhoto('Cafu') },
  { id: 152, name: 'Sergio Ramos', team: 'Legends', league: 'La Liga', leagueId: 140, position: 'DEF', tier: 'Legend', rating: 93, pace: 75, shooting: 68, passing: 70, defending: 94, physical: 92, photo: playerPhoto('Sergio Ramos') },

  // MID — now all 99
  { id: 114, name: 'Zinedine Zidane', team: 'Legends', league: 'La Liga', leagueId: 140, position: 'MID', tier: 'Legend', rating: 96, pace: 78, shooting: 88, passing: 96, defending: 42, physical: 80, photo: playerPhoto('Zinedine Zidane') },
  { id: 102, name: 'Ronaldinho', team: 'Legends', league: 'La Liga', leagueId: 140, position: 'MID', tier: 'Legend', rating: 94, pace: 88, shooting: 88, passing: 95, defending: 28, physical: 72, photo: playerPhoto('Ronaldinho') },
  { id: 110, name: 'Abédi Pelé', team: 'Legends', league: 'Ligue 1', leagueId: 61, position: 'MID', tier: 'Legend', rating: 90, pace: 86, shooting: 82, passing: 88, defending: 40, physical: 78, photo: playerPhoto('Abédi Pelé') },
  { id: 153, name: 'Andrés Iniesta', team: 'Legends', league: 'La Liga', leagueId: 140, position: 'MID', tier: 'Legend', rating: 94, pace: 74, shooting: 78, passing: 96, defending: 58, physical: 65, photo: playerPhoto('Andrés Iniesta') },
  { id: 154, name: 'Xavi Hernández', team: 'Legends', league: 'La Liga', leagueId: 140, position: 'MID', tier: 'Legend', rating: 93, pace: 65, shooting: 72, passing: 97, defending: 62, physical: 62, photo: playerPhoto('Xavi Hernández') },
  { id: 155, name: 'Andrea Pirlo', team: 'Legends', league: 'Serie A', leagueId: 135, position: 'MID', tier: 'Legend', rating: 92, pace: 58, shooting: 82, passing: 95, defending: 55, physical: 60, photo: playerPhoto('Andrea Pirlo') },

  // FWD — all 99
  { id: 100, name: 'Pelé', team: 'Legends', league: 'La Liga', leagueId: 140, position: 'FWD', tier: 'Legend', rating: 98, pace: 92, shooting: 97, passing: 90, defending: 35, physical: 82, photo: playerPhoto('Pelé') },
  { id: 101, name: 'Diego Maradona', team: 'Legends', league: 'La Liga', leagueId: 140, position: 'FWD', tier: 'Legend', rating: 97, pace: 90, shooting: 95, passing: 94, defending: 38, physical: 78, photo: playerPhoto('Diego Maradona') },
  { id: 103, name: 'Ronaldo Nazário', team: 'Legends', league: 'La Liga', leagueId: 140, position: 'FWD', tier: 'Legend', rating: 96, pace: 95, shooting: 96, passing: 78, defending: 28, physical: 85, photo: playerPhoto('Ronaldo Nazário') },
  { id: 104, name: 'Cristiano Ronaldo', team: 'Legends', league: 'La Liga', leagueId: 140, position: 'FWD', tier: 'Legend', rating: 96, pace: 92, shooting: 97, passing: 82, defending: 38, physical: 88, photo: playerPhoto('Cristiano Ronaldo') },
  { id: 106, name: 'Lionel Messi', team: 'Legends', league: 'La Liga', leagueId: 140, position: 'FWD', tier: 'Legend', rating: 97, pace: 88, shooting: 95, passing: 96, defending: 32, physical: 62, photo: playerPhoto('Lionel Messi') },
  { id: 107, name: 'Johan Cruyff', team: 'Legends', league: 'La Liga', leagueId: 140, position: 'FWD', tier: 'Legend', rating: 95, pace: 85, shooting: 90, passing: 94, defending: 42, physical: 68, photo: playerPhoto('Johan Cruyff') },
  { id: 109, name: 'Karim Benzema', team: 'Al-Ittihad', league: 'La Liga', leagueId: 140, position: 'FWD', tier: 'Great', rating: 92, pace: 76, shooting: 94, passing: 88, defending: 35, physical: 80, photo: playerPhoto('Karim Benzema') },
  { id: 111, name: 'Ferenc Puskás', team: 'Legends', league: 'La Liga', leagueId: 140, position: 'FWD', tier: 'Legend', rating: 95, pace: 82, shooting: 97, passing: 88, defending: 32, physical: 78, photo: playerPhoto('Ferenc Puskás') },
  { id: 156, name: 'Thierry Henry', team: 'Legends', league: 'Premier League', leagueId: 39, position: 'FWD', tier: 'Legend', rating: 94, pace: 93, shooting: 92, passing: 85, defending: 32, physical: 74, photo: playerPhoto('Thierry Henry') },
  { id: 157, name: 'Ronaldo de Lima', team: 'Legends', league: 'La Liga', leagueId: 140, position: 'FWD', tier: 'Legend', rating: 94, pace: 90, shooting: 94, passing: 76, defending: 28, physical: 78, photo: playerPhoto('Romário') },

  // Current stars (realistic ratings)
  { id: 108, name: 'Marcelo', team: 'Legends', league: 'La Liga', leagueId: 140, position: 'DEF', tier: 'Legend', rating: 91, pace: 86, shooting: 72, passing: 88, defending: 80, physical: 76, photo: playerPhoto('Marcelo') },
  { id: 115, name: 'Rúben Dias', team: 'Manchester City', league: 'Premier League', leagueId: 39, position: 'DEF', tier: 'Star', rating: 88, pace: 72, shooting: 42, passing: 68, defending: 92, physical: 88, photo: playerPhoto('Rúben Dias') },
  { id: 116, name: 'Dani Carvajal', team: 'Real Madrid', league: 'La Liga', leagueId: 140, position: 'DEF', tier: 'Star', rating: 87, pace: 72, shooting: 60, passing: 78, defending: 90, physical: 75, photo: playerPhoto('Dani Carvajal') },
  { id: 117, name: 'Alessandro Bastoni', team: 'Inter Milan', league: 'Serie A', leagueId: 135, position: 'DEF', tier: 'Star', rating: 87, pace: 74, shooting: 40, passing: 80, defending: 90, physical: 85, photo: playerPhoto('Alessandro Bastoni') },
  { id: 118, name: 'Rodri', team: 'Manchester City', league: 'Premier League', leagueId: 39, position: 'MID', tier: 'Star', rating: 91, pace: 62, shooting: 78, passing: 90, defending: 88, physical: 86, photo: playerPhoto('Rodri') },
  { id: 119, name: 'Martin Ødegaard', team: 'Arsenal', league: 'Premier League', leagueId: 39, position: 'MID', tier: 'Star', rating: 89, pace: 74, shooting: 82, passing: 93, defending: 58, physical: 62, photo: playerPhoto('Martin Ødegaard') },
];
