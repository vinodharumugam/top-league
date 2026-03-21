import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import { Fixture } from '../types/league';

export default function MatchDetailScreen({ route, navigation }: any) {
  const { fixture } = route.params as { fixture: Fixture };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.matchCard}>
        <Text style={styles.round}>{fixture.round}</Text>
        <View style={styles.teamsRow}>
          <View style={styles.teamCol}>
            <Text style={styles.teamAvatar}>🏟️</Text>
            <Text style={styles.teamName}>{fixture.homeTeam.name}</Text>
          </View>
          <View style={styles.scoreCol}>
            <Text style={styles.score}>
              {fixture.homeGoals ?? '-'} - {fixture.awayGoals ?? '-'}
            </Text>
            <Text style={styles.status}>
              {fixture.status === 'FT' ? 'Full Time' : fixture.status === 'LIVE' ? 'LIVE' : 'Upcoming'}
            </Text>
          </View>
          <View style={styles.teamCol}>
            <Text style={styles.teamAvatar}>🏟️</Text>
            <Text style={styles.teamName}>{fixture.awayTeam.name}</Text>
          </View>
        </View>
      </View>

      {/* Match Events */}
      {fixture.events.length > 0 && (
        <View style={styles.eventsSection}>
          <Text style={styles.sectionTitle}>Match Events</Text>
          <ScrollView>
            {fixture.events.map((event, index) => (
              <View key={index} style={styles.eventRow}>
                <Text style={styles.eventMinute}>{event.minute}'</Text>
                <Text style={styles.eventIcon}>
                  {event.type === 'goal' ? '⚽' : event.type === 'card' ? '🟨' : '🔄'}
                </Text>
                <View style={styles.eventInfo}>
                  <Text style={styles.eventPlayer}>{event.player}</Text>
                  <Text style={styles.eventDetail}>
                    {event.team} · {event.detail}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {fixture.events.length === 0 && (
        <View style={styles.noEvents}>
          <Text style={styles.noEventsEmoji}>📋</Text>
          <Text style={styles.noEventsText}>
            {fixture.status === 'NS' ? 'Match hasn\'t started yet' : 'No detailed events available'}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
    paddingHorizontal: 16,
  },
  backButton: {
    paddingVertical: 12,
  },
  backText: {
    fontSize: 14,
    color: Colors.primaryLight,
    fontWeight: '600',
  },
  matchCard: {
    backgroundColor: Colors.darkCard,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  round: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '600',
    marginBottom: 16,
  },
  teamsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  teamCol: {
    flex: 1,
    alignItems: 'center',
  },
  teamAvatar: {
    fontSize: 36,
    marginBottom: 8,
  },
  teamName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  scoreCol: {
    alignItems: 'center',
    marginHorizontal: 16,
  },
  score: {
    fontSize: 32,
    fontWeight: '900',
    color: Colors.accent,
  },
  status: {
    fontSize: 12,
    color: Colors.primaryLight,
    fontWeight: '600',
    marginTop: 4,
  },
  eventsSection: {
    marginTop: 20,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.darkCard,
    borderRadius: 10,
    padding: 12,
    marginBottom: 6,
    gap: 10,
  },
  eventMinute: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.accent,
    width: 30,
  },
  eventIcon: {
    fontSize: 18,
  },
  eventInfo: {
    flex: 1,
  },
  eventPlayer: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  eventDetail: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  noEvents: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  noEventsEmoji: { fontSize: 40, marginBottom: 12 },
  noEventsText: {
    fontSize: 15,
    color: Colors.textSecondary,
  },
});
