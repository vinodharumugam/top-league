import { Transfer } from '../types/player';
import { USE_SAMPLE_DATA } from '../constants/config';
import { SAMPLE_TRANSFERS } from './sampleData';

export async function getTransfers(leagueId?: number): Promise<Transfer[]> {
  if (USE_SAMPLE_DATA) {
    await new Promise((r) => setTimeout(r, 400));
    if (leagueId) {
      return SAMPLE_TRANSFERS.filter((t) => t.leagueId === leagueId);
    }
    return SAMPLE_TRANSFERS;
  }

  // Real API implementation would go here
  return [];
}

export function filterTransfers(
  transfers: Transfer[],
  filters: { leagueId?: number; type?: 'buy' | 'loan' | 'free' }
): Transfer[] {
  let result = transfers;
  if (filters.leagueId) {
    result = result.filter((t) => t.leagueId === filters.leagueId);
  }
  if (filters.type) {
    result = result.filter((t) => t.type === filters.type);
  }
  return result;
}
