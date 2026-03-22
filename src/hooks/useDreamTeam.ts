import { useState, useCallback, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DreamTeamPlayer } from '../types/player';
import { Formation, Squad } from '../types/dreamteam';
import { TOTAL_BUDGET, SQUAD_SIZE, getTierByName } from '../constants/tiers';
import { SAMPLE_PLAYERS } from '../services/sampleData';

const STORAGE_KEY = 'top_league_dream_team';

interface SavedSquadData {
  squad: DreamTeamPlayer[];
  formation: Formation;
  teamName: string;
}

export function useDreamTeam() {
  const [squad, setSquad] = useState<DreamTeamPlayer[]>([]);
  const [formation, setFormation] = useState<Formation>('4-3-3');
  const [teamName, setTeamName] = useState('My Dream Team');
  const [loaded, setLoaded] = useState(false);
  const saveTimeout = useRef<any>(null);

  // Load saved squad on mount
  useEffect(() => {
    loadSquad();
  }, []);

  // Auto-save whenever squad, formation, or team name changes (debounced)
  useEffect(() => {
    if (!loaded) return; // Don't save before we've loaded
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      persistSquad();
    }, 500);
  }, [squad, formation, teamName, loaded]);

  const loadSquad = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed: SavedSquadData = JSON.parse(data);
        if (parsed.squad && parsed.squad.length > 0) {
          // Match saved player IDs to current player data (in case stats were updated)
          const restoredSquad = parsed.squad
            .map((savedPlayer) => {
              const current = SAMPLE_PLAYERS.find((p) => p.id === savedPlayer.id);
              return current || savedPlayer; // Use current stats if available
            });
          setSquad(restoredSquad);
        }
        if (parsed.formation) setFormation(parsed.formation);
        if (parsed.teamName) setTeamName(parsed.teamName);
      }
    } catch (e) {
      // Silently fail
    }
    setLoaded(true);
  };

  const persistSquad = async () => {
    try {
      const data: SavedSquadData = { squad, formation, teamName };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      // Silently fail
    }
  };

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
