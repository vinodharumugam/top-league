// Scorebat free API — real match video highlights, no key needed

const SCOREBAT_BASE = 'https://www.scorebat.com/video-api/v1';

export interface VideoHighlight {
  id: string;
  title: string;
  thumbnail: string;
  date: string;
  url: string;
  embedUrl: string;
  team1: string;
  team2: string;
  competition: string;
}

// Map our league names to Scorebat competition name patterns
const LEAGUE_KEYWORDS: Record<number, string[]> = {
  39: ['Premier League'],
  140: ['La Liga', 'LaLiga'],
  135: ['Serie A'],
  78: ['Bundesliga'],
  61: ['Ligue 1'],
};

export async function fetchHighlights(leagueId?: number, teamName?: string): Promise<VideoHighlight[]> {
  try {
    const res = await fetch(SCOREBAT_BASE);
    if (!res.ok) throw new Error(`Scorebat API error: ${res.status}`);
    const data = await res.json();

    if (!Array.isArray(data)) return [];

    let highlights = data.map((item: any) => {
      // Extract embed URL from the embed iframe HTML
      const embedMatch = item.embed?.match(/src='([^']+)'/);
      const videoEmbedMatch = item.videos?.[0]?.embed?.match(/src='([^']+)'/);

      return {
        id: item.url || String(Math.random()),
        title: item.title || '',
        thumbnail: item.thumbnail || '',
        date: item.date || '',
        url: item.url || '',
        embedUrl: videoEmbedMatch?.[1] || embedMatch?.[1] || '',
        team1: item.side1?.name || '',
        team2: item.side2?.name || '',
        competition: item.competition?.name || '',
      };
    });

    // Filter by league if specified
    if (leagueId && LEAGUE_KEYWORDS[leagueId]) {
      const keywords = LEAGUE_KEYWORDS[leagueId];
      highlights = highlights.filter((h: VideoHighlight) =>
        keywords.some((kw) => h.competition.toLowerCase().includes(kw.toLowerCase()))
      );
    }

    // Filter by team name if specified
    if (teamName) {
      const name = teamName.toLowerCase();
      highlights = highlights.filter(
        (h: VideoHighlight) =>
          h.team1.toLowerCase().includes(name) ||
          h.team2.toLowerCase().includes(name) ||
          h.title.toLowerCase().includes(name)
      );
    }

    return highlights;
  } catch (err) {
    console.error('Scorebat highlights error:', err);
    return [];
  }
}
