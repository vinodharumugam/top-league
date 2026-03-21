// ESPN Free API - No key needed!
// Endpoints for live soccer data across the Big 5 leagues

const ESPN_BASE = 'https://site.api.espn.com/apis';

// ESPN league slugs for the Big 5
export const ESPN_LEAGUE_SLUGS: Record<number, string> = {
  39: 'eng.1',   // Premier League
  140: 'esp.1',  // La Liga
  135: 'ita.1',  // Serie A
  78: 'ger.1',   // Bundesliga
  61: 'fra.1',   // Ligue 1
};

interface EspnStandingEntry {
  team: {
    id: string;
    displayName: string;
    logos: { href: string }[];
  };
  stats: {
    name: string;
    value: number;
    displayValue: string;
  }[];
}

interface EspnEvent {
  id: string;
  name: string;
  date: string;
  status: { type: { name: string; description: string } };
  competitions: {
    competitors: {
      homeAway: string;
      score: string;
      team: {
        id: string;
        displayName: string;
        logos: { href: string }[];
      };
    }[];
  }[];
}

interface EspnStatLeader {
  displayValue: string;
  athlete: {
    id: string;
    displayName: string;
    headshot?: { href: string };
    team?: { displayName: string; logos?: { href: string }[] };
  };
}

function getStat(stats: { name: string; value: number }[], name: string): number {
  return stats.find((s) => s.name === name)?.value ?? 0;
}

export async function fetchEspnStandings(leagueId: number) {
  const slug = ESPN_LEAGUE_SLUGS[leagueId];
  if (!slug) return [];

  try {
    const res = await fetch(`${ESPN_BASE}/v2/sports/soccer/${slug}/standings`);
    if (!res.ok) throw new Error(`ESPN API error: ${res.status}`);
    const data = await res.json();

    const entries: EspnStandingEntry[] =
      data?.children?.[0]?.standings?.entries ?? [];

    return entries.map((entry) => {
      const stats = entry.stats;
      const rank = getStat(stats, 'rank');
      const gamesPlayed = getStat(stats, 'gamesPlayed');
      const wins = getStat(stats, 'wins');
      const ties = getStat(stats, 'ties');
      const losses = getStat(stats, 'losses');
      const goalsFor = getStat(stats, 'pointsFor');
      const goalsAgainst = getStat(stats, 'pointsAgainst');
      const goalDiff = getStat(stats, 'pointDifferential');
      const points = getStat(stats, 'points');
      const overallStat = stats.find((s) => s.name === 'overall');
      // Build form from overall record (W-D-L format)
      const form = overallStat?.displayValue ?? '';

      return {
        position: rank,
        teamId: Number(entry.team.id),
        teamName: entry.team.displayName,
        teamLogo: entry.team.logos?.[0]?.href ?? '',
        played: gamesPlayed,
        won: wins,
        drawn: ties,
        lost: losses,
        goalsFor,
        goalsAgainst,
        goalDifference: goalDiff,
        points,
        form: '', // ESPN doesn't provide last 5 form in this endpoint
      };
    });
  } catch (err) {
    console.error('ESPN standings error:', err);
    return [];
  }
}

export async function fetchEspnFixtures(leagueId: number) {
  const slug = ESPN_LEAGUE_SLUGS[leagueId];
  if (!slug) return [];

  try {
    // Get recent results
    const res = await fetch(
      `${ESPN_BASE}/site/v2/sports/soccer/${slug}/scoreboard?limit=15`
    );
    if (!res.ok) throw new Error(`ESPN API error: ${res.status}`);
    const data = await res.json();

    const events: EspnEvent[] = data?.events ?? [];

    return events.map((event) => {
      const comp = event.competitions[0];
      const home = comp.competitors.find((c: any) => c.homeAway === 'home')!;
      const away = comp.competitors.find((c: any) => c.homeAway === 'away')!;

      const statusMap: Record<string, 'FT' | 'LIVE' | 'NS'> = {
        STATUS_FULL_TIME: 'FT',
        STATUS_IN_PROGRESS: 'LIVE',
        STATUS_HALFTIME: 'LIVE',
        STATUS_SCHEDULED: 'NS',
        STATUS_FIRST_HALF: 'LIVE',
        STATUS_SECOND_HALF: 'LIVE',
      };

      return {
        id: Number(event.id),
        leagueId,
        round: event.status.type.description || '',
        date: event.date,
        status: statusMap[event.status.type.name] || 'NS',
        homeTeam: {
          id: Number(home.team.id),
          name: home.team.displayName,
          logo: home.team.logos?.[0]?.href ?? '',
        },
        awayTeam: {
          id: Number(away.team.id),
          name: away.team.displayName,
          logo: away.team.logos?.[0]?.href ?? '',
        },
        homeGoals: home.score ? Number(home.score) : null,
        awayGoals: away.score ? Number(away.score) : null,
        events: [],
      };
    });
  } catch (err) {
    console.error('ESPN fixtures error:', err);
    return [];
  }
}

export async function fetchEspnTopScorers(leagueId: number) {
  const slug = ESPN_LEAGUE_SLUGS[leagueId];
  if (!slug) return [];

  try {
    const res = await fetch(
      `${ESPN_BASE}/site/v2/sports/soccer/${slug}/statistics?season=2025`
    );
    if (!res.ok) throw new Error(`ESPN API error: ${res.status}`);
    const data = await res.json();

    const goalsStat = data?.stats?.find((s: any) => s.name === 'goalsLeaders');
    if (!goalsStat) return [];

    const leaders: EspnStatLeader[] = goalsStat.leaders ?? [];

    return leaders.slice(0, 5).map((leader, index) => {
      // Parse "Matches: 29, Goals: 22" format
      const parts = leader.displayValue.split(',').map((p: string) => p.trim());
      const goalsStr = parts.find((p: string) => p.startsWith('Goals:'));
      const matchesStr = parts.find((p: string) => p.startsWith('Matches:'));
      const goals = goalsStr ? Number(goalsStr.split(':')[1].trim()) : 0;
      const appearances = matchesStr ? Number(matchesStr.split(':')[1].trim()) : 0;

      return {
        playerId: Number(leader.athlete.id),
        playerName: leader.athlete.displayName,
        playerPhoto: leader.athlete.headshot?.href ?? '',
        teamName: leader.athlete.team?.displayName ?? '',
        teamLogo: leader.athlete.team?.logos?.[0]?.href ?? '',
        goals,
        assists: 0,
        appearances,
      };
    });
  } catch (err) {
    console.error('ESPN top scorers error:', err);
    return [];
  }
}
