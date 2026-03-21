import { useState, useEffect } from 'react';
import { Highlight } from '../types/match';
import { getHighlights } from '../services/highlightService';

export function useHighlights(leagueId?: number) {
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHighlights = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getHighlights(leagueId);
      setHighlights(data);
    } catch (err) {
      setError('Failed to load highlights');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHighlights();
  }, [leagueId]);

  return { highlights, loading, error, refetch: fetchHighlights };
}
