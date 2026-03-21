import { DreamTeamPlayer } from '../types/player';
import { Squad, Formation } from '../types/dreamteam';
import { SAMPLE_PLAYERS } from '../services/sampleData';
import { getTierByName, TOTAL_BUDGET } from '../constants/tiers';

type Difficulty = 'easy' | 'medium' | 'hard' | 'legends' | 'best';

const TEAM_NAMES: Record<Difficulty, string[]> = {
  easy: ['Sunday Kickers', 'Park Players', 'Friendly FC', 'Rookie Stars'],
  medium: ['City Strikers', 'United Force', 'Dynamic FC', 'Thunder Squad'],
  hard: ['Elite Legends', 'Champions XI', 'World Stars', 'Dream Machine'],
  legends: ['The Immortals', 'All-Time Greatest XI', 'Hall of Fame FC', 'The Untouchables'],
  best: ['THE BEST EVER XI', 'Gods of Football', 'The Invincibles', 'Ultimate Dream Team'],
};

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function generateComputerTeam(
  difficulty: Difficulty,
  excludePlayerIds: number[] = []
): Squad {
  const availablePlayers = SAMPLE_PLAYERS.filter(
    (p) => !excludePlayerIds.includes(p.id)
  );

  // THE BEST MODE — pick the highest rated players from ALL players (legends + current), boosted to max
  if (difficulty === 'best') {
    const allSorted = [...availablePlayers].sort((a, b) => b.rating - a.rating);

    const squad: DreamTeamPlayer[] = [];

    const bestGK = allSorted.find((p) => p.position === 'GK');
    if (bestGK) squad.push(bestGK);

    const bestDEFs = allSorted.filter((p) => p.position === 'DEF' && !squad.some((s) => s.id === p.id));
    squad.push(...bestDEFs.slice(0, 4));

    const bestMIDs = allSorted.filter((p) => p.position === 'MID' && !squad.some((s) => s.id === p.id));
    squad.push(...bestMIDs.slice(0, 3));

    const bestFWDs = allSorted.filter((p) => p.position === 'FWD' && !squad.some((s) => s.id === p.id));
    squad.push(...bestFWDs.slice(0, 3));

    if (squad.length < 11) {
      const remaining = allSorted.filter((p) => !squad.some((s) => s.id === p.id));
      squad.push(...remaining.slice(0, 11 - squad.length));
    }

    const totalCost = squad.reduce((sum, p) => sum + (getTierByName(p.tier)?.price || 0), 0);

    // +5 rating boost — nearly impossible to beat
    const averageRating = Math.min(99, Math.round(squad.reduce((sum, p) => sum + p.rating, 0) / squad.length) + 5);

    return {
      id: 'best-squad',
      name: TEAM_NAMES.best[Math.floor(Math.random() * TEAM_NAMES.best.length)],
      formation: '4-3-3' as Formation,
      players: squad,
      totalCost,
      averageRating,
    };
  }

  // LEGENDS MODE — only pick from Legends team, sorted by highest rating
  if (difficulty === 'legends') {
    const legendsPool = availablePlayers
      .filter((p) => p.team === 'Legends')
      .sort((a, b) => b.rating - a.rating);

    const squad: DreamTeamPlayer[] = [];

    // Pick best GK
    const gk = legendsPool.find((p) => p.position === 'GK');
    if (gk) squad.push(gk);

    // Pick best DEFs
    const defs = legendsPool.filter((p) => p.position === 'DEF' && !squad.some((s) => s.id === p.id));
    squad.push(...defs.slice(0, 4));

    // Pick best MIDs
    const mids = legendsPool.filter((p) => p.position === 'MID' && !squad.some((s) => s.id === p.id));
    squad.push(...mids.slice(0, 3));

    // Pick best FWDs
    const fwds = legendsPool.filter((p) => p.position === 'FWD' && !squad.some((s) => s.id === p.id));
    squad.push(...fwds.slice(0, 3));

    // Fill remaining spots with highest rated legends
    if (squad.length < 11) {
      const remaining = legendsPool.filter((p) => !squad.some((s) => s.id === p.id));
      squad.push(...remaining.slice(0, 11 - squad.length));
    }

    const totalCost = squad.reduce((sum, p) => sum + (getTierByName(p.tier)?.price || 0), 0);
    const averageRating = squad.length
      ? Math.round(squad.reduce((sum, p) => sum + p.rating, 0) / squad.length)
      : 0;

    // Boost the average rating to make them even harder
    const boostedRating = Math.min(99, averageRating + 3);

    return {
      id: 'legends-squad',
      name: TEAM_NAMES.legends[Math.floor(Math.random() * TEAM_NAMES.legends.length)],
      formation: '4-3-3' as Formation,
      players: squad,
      totalCost,
      averageRating: boostedRating,
    };
  }

  // Filter by tier preferences based on difficulty
  let tierPools: Record<string, DreamTeamPlayer[]>;

  if (difficulty === 'easy') {
    tierPools = {
      GK: shuffleArray(availablePlayers.filter((p) => p.position === 'GK' && (p.tier === 'Good' || p.tier === 'Rising'))),
      DEF: shuffleArray(availablePlayers.filter((p) => p.position === 'DEF' && (p.tier === 'Good' || p.tier === 'Rising'))),
      MID: shuffleArray(availablePlayers.filter((p) => p.position === 'MID' && (p.tier === 'Good' || p.tier === 'Rising'))),
      FWD: shuffleArray(availablePlayers.filter((p) => p.position === 'FWD' && (p.tier === 'Good' || p.tier === 'Rising'))),
    };
  } else if (difficulty === 'medium') {
    tierPools = {
      GK: shuffleArray(availablePlayers.filter((p) => p.position === 'GK')),
      DEF: shuffleArray(availablePlayers.filter((p) => p.position === 'DEF')),
      MID: shuffleArray(availablePlayers.filter((p) => p.position === 'MID')),
      FWD: shuffleArray(availablePlayers.filter((p) => p.position === 'FWD')),
    };
  } else {
    tierPools = {
      GK: shuffleArray(availablePlayers.filter((p) => p.position === 'GK' && (p.tier === 'Star' || p.tier === 'Great'))),
      DEF: shuffleArray(availablePlayers.filter((p) => p.position === 'DEF' && (p.tier === 'Star' || p.tier === 'Great'))),
      MID: shuffleArray(availablePlayers.filter((p) => p.position === 'MID' && (p.tier === 'Star' || p.tier === 'Great'))),
      FWD: shuffleArray(availablePlayers.filter((p) => p.position === 'FWD' && (p.tier === 'Star' || p.tier === 'Great'))),
    };
  }

  // Pick players for 4-3-3: 1 GK, 4 DEF, 3 MID, 3 FWD
  const squad: DreamTeamPlayer[] = [];
  let budget = TOTAL_BUDGET;

  const pick = (pool: DreamTeamPlayer[], count: number) => {
    for (const player of pool) {
      if (squad.length >= 11) break;
      if (count <= 0) break;
      const tier = getTierByName(player.tier);
      if (tier && budget >= tier.price) {
        squad.push(player);
        budget -= tier.price;
        count--;
      }
    }
  };

  pick(tierPools.GK, 1);
  pick(tierPools.DEF, 4);
  pick(tierPools.MID, 3);
  pick(tierPools.FWD, 3);

  // If we still need players, pick from any remaining
  if (squad.length < 11) {
    const remaining = shuffleArray(
      availablePlayers.filter((p) => !squad.some((s) => s.id === p.id))
    );
    pick(remaining, 11 - squad.length);
  }

  const teamName = tierPools.GK.length > 0
    ? TEAM_NAMES[difficulty][Math.floor(Math.random() * TEAM_NAMES[difficulty].length)]
    : 'Computer Team';

  const totalCost = squad.reduce((sum, p) => {
    const tier = getTierByName(p.tier);
    return sum + (tier?.price || 0);
  }, 0);

  const averageRating = squad.length
    ? Math.round(squad.reduce((sum, p) => sum + p.rating, 0) / squad.length)
    : 0;

  return {
    id: 'computer-squad',
    name: teamName,
    formation: '4-3-3' as Formation,
    players: squad,
    totalCost,
    averageRating,
  };
}
