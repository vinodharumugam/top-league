import { useState, useEffect } from 'react';
import { Transfer } from '../types/player';
import { getTransfers, filterTransfers } from '../services/transferService';

export function useTransfers(leagueId?: number) {
  const [allTransfers, setAllTransfers] = useState<Transfer[]>([]);
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'buy' | 'loan' | 'free' | undefined>();

  const fetchTransfers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTransfers(leagueId);
      setAllTransfers(data);
      setTransfers(data);
    } catch (err) {
      setError('Failed to load transfers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransfers();
  }, [leagueId]);

  useEffect(() => {
    const filtered = filterTransfers(allTransfers, { type: filterType });
    setTransfers(filtered);
  }, [filterType, allTransfers]);

  return { transfers, loading, error, filterType, setFilterType, refetch: fetchTransfers };
}
