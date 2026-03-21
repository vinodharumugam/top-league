import { useState, useEffect } from 'react';
import { Fixture } from '../types/league';
import { getFixtures } from '../services/leagueService';

export function useFixtures(leagueId: number) {
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFixtures = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getFixtures(leagueId);
      setFixtures(data);
    } catch (err) {
      setError('Failed to load fixtures');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFixtures();
  }, [leagueId]);

  return { fixtures, loading, error, refetch: fetchFixtures };
}
