import { useState, useCallback } from 'react';
import { DreamTeamPlayer } from '../types/player';
import { Formation, Squad } from '../types/dreamteam';
import { TOTAL_BUDGET, SQUAD_SIZE, getTierByName } from '../constants/tiers';
import { SAMPLE_PLAYERS } from '../services/sampleData';

export function useDreamTeam() {
  const [squad, setSquad] = useState<DreamTeamPlayer[]>([]);
  const [formation, setFormation] = useState<Formation>('4-3-3');
  const [teamName, setTeamName] = useState('My Dream Team');

  const totalCost = squad.reduce((sum, p) => {
    const tier = getTierByName(p.tier);
    return sum + (tier?.price || 0);
  }, 0);

  const budgetRemaining = TOTAL_BUDGET - totalCost;

  const averageRating = squad.length
    ? Math.round(squad.reduce((sum, p) => sum + p.rating, 0) / squad.length)
    : 0;

  const canAddPlayer = (player: DreamTeamPlayer): boolean => {
    if (squad.length >= SQUAD_SIZE) return false;
    if (squad.some((p) => p.id === player.id)) return false;
    const tier = getTierByName(player.tier);
    if (!tier) return false;
    return budgetRemaining >= tier.price;
  };

  const addPlayer = useCallback((player: DreamTeamPlayer) => {
    setSquad((prev) => {
      if (prev.length >= SQUAD_SIZE) return prev;
      if (prev.some((p) => p.id === player.id)) return prev;
      return [...prev, player];
    });
  }, []);

  const removePlayer = useCallback((playerId: number) => {
    setSquad((prev) => prev.filter((p) => p.id !== playerId));
  }, []);

  const clearSquad = useCallback(() => {
    setSquad([]);
  }, []);

  const getAvailablePlayers = useCallback(
    (filters?: { tier?: string; position?: string; leagueId?: number; search?: string }) => {
      let players = SAMPLE_PLAYERS;
      if (filters?.tier) {
        players = players.filter((p) => p.tier === filters.tier);
      }
      if (filters?.position) {
        players = players.filter((p) => p.position === filters.position);
      }
      if (filters?.leagueId) {
        players = players.filter((p) => p.leagueId === filters.leagueId);
      }
      if (filters?.search) {
        const q = filters.search.toLowerCase();
        players = players.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.team.toLowerCase().includes(q)
        );
      }
      return players;
    },
    []
  );

  const getSquadObject = (): Squad => ({
    id: 'user-squad',
    name: teamName,
    formation,
    players: squad,
    totalCost,
    averageRating,
  });

  const positionCounts = {
    GK: squad.filter((p) => p.position === 'GK').length,
    DEF: squad.filter((p) => p.position === 'DEF').length,
    MID: squad.filter((p) => p.position === 'MID').length,
    FWD: squad.filter((p) => p.position === 'FWD').length,
  };

  return {
    squad,
    formation,
    setFormation,
    teamName,
    setTeamName,
    totalCost,
    budgetRemaining,
    averageRating,
    canAddPlayer,
    addPlayer,
    removePlayer,
    clearSquad,
    getAvailablePlayers,
    getSquadObject,
    positionCounts,
    isSquadFull: squad.length >= SQUAD_SIZE,
  };
}
