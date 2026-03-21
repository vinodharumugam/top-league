import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../constants/config';
import { Squad, MatchSimResult } from '../types/dreamteam';

// Initialize Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// ============================================
// AUTH
// ============================================

export async function signUp(email: string, password: string, username: string) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) return { user: null, error: error.message };
  if (!data.user) return { user: null, error: 'Sign up failed' };

  // Create profile
  const { error: profileError } = await supabase
    .from('profiles')
    .insert({ id: data.user.id, username });

  if (profileError) return { user: null, error: profileError.message };
  return { user: data.user, error: null };
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { user: null, error: error.message };
  return { user: data.user, error: null };
}

export async function signOut() {
  await supabase.auth.signOut();
}

export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return { profile: data, error: error?.message || null };
}

// ============================================
// SQUADS
// ============================================

export async function saveSquad(userId: string, squad: Squad) {
  const { data, error } = await supabase
    .from('squads')
    .upsert({
      id: squad.id === 'user-squad' ? undefined : squad.id,
      user_id: userId,
      name: squad.name,
      formation: squad.formation,
      players_json: squad.players,
      total_cost: squad.totalCost,
      average_rating: squad.averageRating,
    })
    .select()
    .single();
  return { squad: data, error: error?.message || null };
}

export async function getSquads(userId: string) {
  const { data, error } = await supabase
    .from('squads')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  return { squads: data || [], error: error?.message || null };
}

// ============================================
// MATCH HISTORY
// ============================================

export async function saveMatchResult(
  userId: string,
  result: MatchSimResult,
  opponentType: string
) {
  const { error } = await supabase.from('match_history').insert({
    user_id: userId,
    user_squad_json: result.homeSquad,
    opponent_name: result.awaySquad.name,
    opponent_type: opponentType,
    opponent_squad_json: result.awaySquad,
    home_goals: result.homeGoals,
    away_goals: result.awayGoals,
    result: result.winner === 'home' ? 'win' : result.winner === 'away' ? 'loss' : 'draw',
    motm_name: result.motm.name,
    motm_rating: result.motm.rating,
    events_json: result.events,
  });

  // Update win/loss/draw count on profile
  if (!error) {
    const field = result.winner === 'home' ? 'wins' : result.winner === 'away' ? 'losses' : 'draws';
    const { data: profile } = await supabase
      .from('profiles')
      .select(field)
      .eq('id', userId)
      .single();
    if (profile) {
      await supabase
        .from('profiles')
        .update({ [field]: (profile as any)[field] + 1 })
        .eq('id', userId);
    }
  }

  return { error: error?.message || null };
}

export async function getMatchHistory(userId: string) {
  const { data, error } = await supabase
    .from('match_history')
    .select('*')
    .eq('user_id', userId)
    .order('played_at', { ascending: false })
    .limit(50);
  return { matches: data || [], error: error?.message || null };
}

// ============================================
// MULTIPLAYER CHALLENGES
// ============================================

export async function createChallenge(userId: string, squadJson: any) {
  const code = Math.random().toString(36).substring(2, 8).toUpperCase();
  const matchSeed = Math.floor(Math.random() * 1000000);

  const { data, error } = await supabase
    .from('challenges')
    .insert({
      code,
      host_user_id: userId,
      host_squad_json: squadJson,
      match_seed: matchSeed,
      status: 'waiting',
    })
    .select()
    .single();

  return { challenge: data, code, error: error?.message || null };
}

export async function joinChallenge(code: string, userId: string, squadJson: any) {
  // Find the challenge
  const { data: challenge, error: findError } = await supabase
    .from('challenges')
    .select('*')
    .eq('code', code.toUpperCase())
    .eq('status', 'waiting')
    .single();

  if (findError || !challenge) {
    return { challenge: null, error: 'Challenge not found or already started' };
  }

  if (challenge.host_user_id === userId) {
    return { challenge: null, error: "You can't join your own challenge!" };
  }

  // Join the challenge
  const { data, error } = await supabase
    .from('challenges')
    .update({
      guest_user_id: userId,
      guest_squad_json: squadJson,
      status: 'matched',
      updated_at: new Date().toISOString(),
    })
    .eq('id', challenge.id)
    .select()
    .single();

  return { challenge: data, error: error?.message || null };
}

export async function cancelChallenge(challengeId: string) {
  await supabase
    .from('challenges')
    .update({ status: 'cancelled', updated_at: new Date().toISOString() })
    .eq('id', challengeId);
}

export function subscribeToChallengeUpdates(
  challengeId: string,
  callback: (challenge: any) => void
) {
  return supabase
    .channel(`challenge-${challengeId}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'challenges',
        filter: `id=eq.${challengeId}`,
      },
      (payload) => {
        callback(payload.new);
      }
    )
    .subscribe();
}

export function unsubscribeFromChallenge(channelName: string) {
  supabase.removeChannel(supabase.channel(channelName));
}
