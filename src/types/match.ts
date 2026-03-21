export interface Highlight {
  id: number;
  title: string;
  homeTeam: string;
  awayTeam: string;
  score: string;
  leagueId: number;
  date: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: string; // e.g. "4:32"
}
