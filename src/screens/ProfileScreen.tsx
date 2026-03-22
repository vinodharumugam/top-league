import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
// SafeAreaView handled by parent
import { Colors } from '../constants/colors';
import { getProfile, getMatchHistory, signOut } from '../services/supabase';

interface Props {
  userId: string;
  username: string;
  onSignOut: () => void;
}

interface MatchRecord {
  id: string;
  opponent_name: string;
  opponent_type: string;
  home_goals: number;
  away_goals: number;
  result: 'win' | 'loss' | 'draw';
  motm_name: string;
  motm_rating: number;
  played_at: string;
}

export default function ProfileScreen({ userId, username, onSignOut }: Props) {
  const [profile, setProfile] = useState<any>(null);
  const [matches, setMatches] = useState<MatchRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [profileRes, matchRes] = await Promise.all([
      getProfile(userId),
      getMatchHistory(userId),
    ]);
    if (profileRes.profile) setProfile(profileRes.profile);
    if (matchRes.matches) setMatches(matchRes.matches as MatchRecord[]);
    setLoading(false);
  };

  const handleSignOut = async () => {
    await signOut();
    onSignOut();
  };

  const wins = profile?.wins || 0;
  const losses = profile?.losses || 0;
  const draws = profile?.draws || 0;
  const total = wins + losses + draws;
  const winRate = total > 0 ? Math.round((wins / total) * 100) : 0;

  const getResultColor = (result: string) => {
    if (result === 'win') return Colors.win;
    if (result === 'loss') return Colors.loss;
    return Colors.draw;
  };

  const getResultEmoji = (result: string) => {
    if (result === 'win') return 'W';
    if (result === 'loss') return 'L';
    return 'D';
  };

  const formatOpponentType = (type: string) => {
    return type.replace('computer_', '').replace('_', ' ').toUpperCase();
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color={Colors.accent} />
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>
              {(username || '?')[0].toUpperCase()}
            </Text>
          </View>
          <Text style={styles.username}>{username}</Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { borderBottomColor: Colors.win }]}>
            <Text style={[styles.statValue, { color: Colors.win }]}>{wins}</Text>
            <Text style={styles.statLabel}>Wins</Text>
          </View>
          <View style={[styles.statCard, { borderBottomColor: Colors.draw }]}>
            <Text style={[styles.statValue, { color: Colors.draw }]}>{draws}</Text>
            <Text style={styles.statLabel}>Draws</Text>
          </View>
          <View style={[styles.statCard, { borderBottomColor: Colors.loss }]}>
            <Text style={[styles.statValue, { color: Colors.loss }]}>{losses}</Text>
            <Text style={styles.statLabel}>Losses</Text>
          </View>
          <View style={[styles.statCard, { borderBottomColor: Colors.accent }]}>
            <Text style={[styles.statValue, { color: Colors.accent }]}>{winRate}%</Text>
            <Text style={styles.statLabel}>Win Rate</Text>
          </View>
        </View>

        {/* Match History */}
        <Text style={styles.sectionTitle}>Match History</Text>

        {matches.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyEmoji}>⚽</Text>
            <Text style={styles.emptyText}>No matches played yet!</Text>
            <Text style={styles.emptySubtext}>Go play a match and your results will show here</Text>
          </View>
        ) : (
          matches.map((match) => (
            <View key={match.id} style={styles.matchCard}>
              <View style={[styles.resultBadge, { backgroundColor: getResultColor(match.result) }]}>
                <Text style={styles.resultBadgeText}>{getResultEmoji(match.result)}</Text>
              </View>
              <View style={styles.matchInfo}>
                <Text style={styles.matchScore}>
                  {match.home_goals} - {match.away_goals}
                </Text>
                <Text style={styles.matchOpponent}>
                  vs {match.opponent_name}
                </Text>
                <Text style={styles.matchMeta}>
                  {formatOpponentType(match.opponent_type)} · {match.motm_name && `MOTM: ${match.motm_name}`}
                </Text>
              </View>
              <Text style={styles.matchDate}>
                {new Date(match.played_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
              </Text>
            </View>
          ))
        )}

        {/* Sign Out */}
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
  },
  loadingBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: Colors.textSecondary,
    marginTop: 12,
    fontSize: 14,
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: '900',
    color: Colors.accent,
  },
  username: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.darkCard,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    borderBottomWidth: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '900',
  },
  statLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 4,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textPrimary,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  emptyBox: {
    alignItems: 'center',
    paddingVertical: 40,
    marginHorizontal: 16,
    backgroundColor: Colors.darkCard,
    borderRadius: 14,
  },
  emptyEmoji: { fontSize: 40, marginBottom: 8 },
  emptyText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  emptySubtext: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  matchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.darkCard,
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 8,
    gap: 12,
  },
  resultBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultBadgeText: {
    fontSize: 16,
    fontWeight: '900',
    color: Colors.textPrimary,
  },
  matchInfo: {
    flex: 1,
  },
  matchScore: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  matchOpponent: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  matchMeta: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  matchDate: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  signOutButton: {
    marginHorizontal: 16,
    marginTop: 24,
    padding: 14,
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.loss,
  },
  signOutText: {
    fontSize: 14,
    color: Colors.loss,
    fontWeight: '600',
  },
});
