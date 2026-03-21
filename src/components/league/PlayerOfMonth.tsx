import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { TopScorer } from '../../types/league';
import { Colors } from '../../constants/colors';

interface Props {
  players: TopScorer[];
}

export default function PlayerOfMonth({ players }: Props) {
  if (players.length === 0) return null;

  const topPlayer = players[0];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⭐ Top Scorers</Text>

      {/* Featured player */}
      <View style={styles.featuredCard}>
        {topPlayer.playerPhoto ? (
          <Image source={{ uri: topPlayer.playerPhoto }} style={styles.playerPhoto} />
        ) : (
          <View style={styles.playerAvatar}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
        )}
        <View style={styles.playerInfo}>
          <Text style={styles.playerName}>{topPlayer.playerName}</Text>
          <Text style={styles.playerTeam}>{topPlayer.teamName}</Text>
          <View style={styles.statsRow}>
            <View style={styles.statBadge}>
              <Text style={styles.statValue}>{topPlayer.goals}</Text>
              <Text style={styles.statLabel}>Goals</Text>
            </View>
            <View style={styles.statBadge}>
              <Text style={styles.statValue}>{topPlayer.assists}</Text>
              <Text style={styles.statLabel}>Assists</Text>
            </View>
            <View style={styles.statBadge}>
              <Text style={styles.statValue}>{topPlayer.appearances}</Text>
              <Text style={styles.statLabel}>Apps</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Runners up */}
      {players.slice(1).map((p, i) => (
        <View key={p.playerId} style={styles.runnerUp}>
          <Text style={styles.runnerUpRank}>{i + 2}</Text>
          <Text style={styles.runnerUpName}>{p.playerName}</Text>
          <Text style={styles.runnerUpTeam}>{p.teamName}</Text>
          <Text style={styles.runnerUpGoals}>⚽ {p.goals}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 14,
  },
  featuredCard: {
    flexDirection: 'row',
    backgroundColor: Colors.darkCard,
    borderRadius: 14,
    padding: 16,
    borderLeftWidth: 3,
    borderLeftColor: Colors.accent,
    gap: 14,
  },
  playerPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  playerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.darkSurface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 30,
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  playerTeam: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 10,
  },
  statBadge: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.accent,
  },
  statLabel: {
    fontSize: 10,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  runnerUp: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.darkCard,
    borderRadius: 10,
    padding: 12,
    marginTop: 8,
    gap: 10,
  },
  runnerUpRank: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textSecondary,
    width: 20,
  },
  runnerUpName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
    flex: 1,
  },
  runnerUpTeam: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  runnerUpGoals: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.accent,
  },
});
