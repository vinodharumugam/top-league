import { useState, useEffect } from 'react';
import { Standing } from '../types/league';
import { getStandings } from '../services/leagueService';

export function useStandings(leagueId: number) {
  const [standings, setStandings] = useState<Standing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStandings = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getStandings(leagueId);
      setStandings(data);
    } catch (err) {
      setError('Failed to load standings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStandings();
  }, [leagueId]);

  return { standings, loading, error, refetch: fetchStandings };
}
