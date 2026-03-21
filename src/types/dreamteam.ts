import { DreamTeamPlayer } from './player';

export type Formation = '4-3-3' | '4-4-2' | '3-5-2' | '4-2-3-1';

export interface PositionSlot {
  slotId: string; // e.g. "GK1", "DEF1", "MID1", "FWD1"
  position: 'GK' | 'DEF' | 'MID' | 'FWD';
  x: number; // 0-100 % position on pitch
  y: number; // 0-100 % position on pitch
  player: DreamTeamPlayer | null;
}

export interface Squad {
  id: string;
  name: string;
  formation: Formation;
  players: DreamTeamPlayer[];
  totalCost: number;
  averageRating: number;
}

export interface MatchSimEvent {
  minute: number;
  type: 'goal' | 'save' | 'foul' | 'card' | 'chance' | 'kickoff' | 'halftime' | 'fulltime' | 'injury';
  team: 'home' | 'away';
  player: string;
  commentary: string;
}

export interface ManOfTheMatch {
  name: string;
  team: 'home' | 'away';
  goals: number;
  saves: number;
  chances: number;
  rating: number;
}

export interface MatchSimResult {
  homeSquad: Squad;
  awaySquad: Squad;
  homeGoals: number;
  awayGoals: number;
  events: MatchSimEvent[];
  winner: 'home' | 'away' | 'draw';
  motm: ManOfTheMatch;
}

export const FORMATIONS: Record<Formation, { positions: { position: 'GK' | 'DEF' | 'MID' | 'FWD'; x: number; y: number }[] }> = {
  '4-3-3': {
    positions: [
      { position: 'GK', x: 50, y: 92 },
      { position: 'DEF', x: 15, y: 75 },
      { position: 'DEF', x: 38, y: 78 },
      { position: 'DEF', x: 62, y: 78 },
      { position: 'DEF', x: 85, y: 75 },
      { position: 'MID', x: 25, y: 55 },
      { position: 'MID', x: 50, y: 52 },
      { position: 'MID', x: 75, y: 55 },
      { position: 'FWD', x: 20, y: 30 },
      { position: 'FWD', x: 50, y: 25 },
      { position: 'FWD', x: 80, y: 30 },
    ],
  },
  '4-4-2': {
    positions: [
      { position: 'GK', x: 50, y: 92 },
      { position: 'DEF', x: 15, y: 75 },
      { position: 'DEF', x: 38, y: 78 },
      { position: 'DEF', x: 62, y: 78 },
      { position: 'DEF', x: 85, y: 75 },
      { position: 'MID', x: 15, y: 52 },
      { position: 'MID', x: 38, y: 55 },
      { position: 'MID', x: 62, y: 55 },
      { position: 'MID', x: 85, y: 52 },
      { position: 'FWD', x: 35, y: 28 },
      { position: 'FWD', x: 65, y: 28 },
    ],
  },
  '3-5-2': {
    positions: [
      { position: 'GK', x: 50, y: 92 },
      { position: 'DEF', x: 25, y: 78 },
      { position: 'DEF', x: 50, y: 80 },
      { position: 'DEF', x: 75, y: 78 },
      { position: 'MID', x: 10, y: 55 },
      { position: 'MID', x: 30, y: 52 },
      { position: 'MID', x: 50, y: 48 },
      { position: 'MID', x: 70, y: 52 },
      { position: 'MID', x: 90, y: 55 },
      { position: 'FWD', x: 35, y: 28 },
      { position: 'FWD', x: 65, y: 28 },
    ],
  },
  '4-2-3-1': {
    positions: [
      { position: 'GK', x: 50, y: 92 },
      { position: 'DEF', x: 15, y: 75 },
      { position: 'DEF', x: 38, y: 78 },
      { position: 'DEF', x: 62, y: 78 },
      { position: 'DEF', x: 85, y: 75 },
      { position: 'MID', x: 35, y: 60 },
      { position: 'MID', x: 65, y: 60 },
      { position: 'MID', x: 20, y: 42 },
      { position: 'MID', x: 50, y: 38 },
      { position: 'MID', x: 80, y: 42 },
      { position: 'FWD', x: 50, y: 22 },
    ],
  },
};
