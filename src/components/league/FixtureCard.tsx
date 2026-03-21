import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Fixture } from '../../types/league';
import { Colors } from '../../constants/colors';

interface Props {
  fixture: Fixture;
  onPress?: () => void;
}

export default function FixtureCard({ fixture, onPress }: Props) {
  const isFinished = fixture.status === 'FT';

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Text style={styles.round}>{fixture.round}</Text>
      <View style={styles.matchRow}>
        {fixture.homeTeam.logo ? (
          <Image source={{ uri: fixture.homeTeam.logo }} style={styles.teamLogo} />
        ) : null}
        <Text style={styles.teamName} numberOfLines={1}>
          {fixture.homeTeam.name}
        </Text>
        <View style={styles.scoreBox}>
          {isFinished ? (
            <Text style={styles.score}>
              {fixture.homeGoals} - {fixture.awayGoals}
            </Text>
          ) : (
            <Text style={styles.time}>
              {new Date(fixture.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </Text>
          )}
        </View>
        <Text style={[styles.teamName, { textAlign: 'right' }]} numberOfLines={1}>
          {fixture.awayTeam.name}
        </Text>
        {fixture.awayTeam.logo ? (
          <Image source={{ uri: fixture.awayTeam.logo }} style={styles.teamLogo} />
        ) : null}
      </View>
      {isFinished && (
        <View style={styles.statusRow}>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>FT</Text>
          </View>
          {fixture.events.length > 0 && (
            <Text style={styles.goalScorers}>
              ⚽ {fixture.events
                .filter((e) => e.type === 'goal')
                .map((e) => `${e.player} ${e.minute}'`)
                .join(', ')}
            </Text>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.darkCard,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  round: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginBottom: 8,
    fontWeight: '600',
  },
  matchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  teamLogo: {
    width: 24,
    height: 24,
    borderRadius: 2,
  },
  teamName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  scoreBox: {
    backgroundColor: Colors.darkSurface,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginHorizontal: 10,
  },
  score: {
    fontSize: 18,
    fontWeight: '900',
    color: Colors.accent,
  },
  time: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 8,
  },
  statusBadge: {
    backgroundColor: Colors.primary,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  goalScorers: {
    fontSize: 11,
    color: Colors.textSecondary,
    flex: 1,
  },
});
