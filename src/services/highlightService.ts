import { Highlight } from '../types/match';
import { USE_SAMPLE_DATA } from '../constants/config';
import { SAMPLE_HIGHLIGHTS } from './sampleData';

export async function getHighlights(leagueId?: number): Promise<Highlight[]> {
  if (USE_SAMPLE_DATA) {
    await new Promise((r) => setTimeout(r, 400));
    if (leagueId) {
      return SAMPLE_HIGHLIGHTS.filter((h) => h.leagueId === leagueId);
    }
    return SAMPLE_HIGHLIGHTS;
  }

  // Real API: could use scorebat.com free API or similar
  return [];
}
