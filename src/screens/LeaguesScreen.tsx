import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import { LEAGUES } from '../constants/leagues';
import { useStandings } from '../hooks/useStandings';
import StandingsTable from '../components/league/StandingsTable';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

export default function LeaguesScreen({ navigation }: any) {
  const [selectedLeagueIndex, setSelectedLeagueIndex] = useState(0);
  const selectedLeague = LEAGUES[selectedLeagueIndex];

  const { standings, loading, error, refetch } = useStandings(selectedLeague.id);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🏟️ League Hub</Text>

      {/* League Selector */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.leagueTabs}
      >
        {LEAGUES.map((league, index) => (
          <TouchableOpacity
            key={league.id}
            style={[
              styles.leagueTab,
              selectedLeagueIndex === index && {
                backgroundColor: league.color,
                borderColor: league.color,
              },
            ]}
            onPress={() => setSelectedLeagueIndex(index)}
          >
            <Text style={styles.leagueTabEmoji}>{league.emoji}</Text>
            <Text
              style={[
                styles.leagueTabText,
                selectedLeagueIndex === index && styles.leagueTabTextActive,
              ]}
            >
              {league.shortName}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* View Full League Button */}
      <TouchableOpacity
        style={[styles.viewFullButton, { backgroundColor: selectedLeague.color }]}
        onPress={() => navigation.navigate('LeagueDetail', { leagueId: selectedLeague.id })}
      >
        <Text style={styles.viewFullText}>
          {selectedLeague.emoji} View {selectedLeague.name} →
        </Text>
      </TouchableOpacity>

      {/* Standings */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {loading ? (
          <LoadingSpinner message="Loading standings..." />
        ) : error ? (
          <ErrorMessage message={error} onRetry={refetch} />
        ) : (
          <StandingsTable standings={standings} />
        )}
        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.textPrimary,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  leagueTabs: {
    paddingHorizontal: 16,
    gap: 10,
    paddingBottom: 8,
  },
  leagueTab: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.darkCard,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    gap: 6,
    borderWidth: 1,
    borderColor: Colors.darkSurface,
  },
  leagueTabEmoji: {
    fontSize: 18,
  },
  leagueTabText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  leagueTabTextActive: {
    color: Colors.textPrimary,
  },
  viewFullButton: {
    marginHorizontal: 16,
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 12,
  },
  viewFullText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
