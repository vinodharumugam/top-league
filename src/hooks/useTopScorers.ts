import { useState, useEffect } from 'react';
import { TopScorer } from '../types/league';
import { getTopScorers } from '../services/leagueService';

export function useTopScorers(leagueId: number) {
  const [topScorers, setTopScorers] = useState<TopScorer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTopScorers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTopScorers(leagueId);
      setTopScorers(data);
    } catch (err) {
      setError('Failed to load top scorers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopScorers();
  }, [leagueId]);

  return { topScorers, loading, error, refetch: fetchTopScorers };
}
