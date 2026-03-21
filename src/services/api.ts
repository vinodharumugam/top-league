import { API_FOOTBALL_KEY, API_FOOTBALL_BASE, USE_SAMPLE_DATA } from '../constants/config';

interface ApiResponse<T> {
  data: T;
  error: string | null;
}

export async function apiFetch<T>(endpoint: string, params?: Record<string, string>): Promise<ApiResponse<T>> {
  if (USE_SAMPLE_DATA) {
    return { data: [] as unknown as T, error: 'Using sample data mode' };
  }

  try {
    const url = new URL(`${API_FOOTBALL_BASE}${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'x-apisports-key': API_FOOTBALL_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const json = await response.json();
    return { data: json.response as T, error: null };
  } catch (err) {
    return { data: [] as unknown as T, error: (err as Error).message };
  }
}
