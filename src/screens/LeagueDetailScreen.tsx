import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import { LEAGUES } from '../constants/leagues';
import { useStandings } from '../hooks/useStandings';
import { useFixtures } from '../hooks/useFixtures';
import { useTopScorers } from '../hooks/useTopScorers';
import StandingsTable from '../components/league/StandingsTable';
import FixtureCard from '../components/league/FixtureCard';
import PlayerOfMonth from '../components/league/PlayerOfMonth';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

type Tab = 'standings' | 'fixtures' | 'potm';

export default function LeagueDetailScreen({ route, navigation }: any) {
  const { leagueId } = route.params;
  const league = LEAGUES.find((l) => l.id === leagueId);
  const [activeTab, setActiveTab] = useState<Tab>('standings');

  const { standings, loading: standingsLoading, error: standingsError, refetch: refetchStandings } = useStandings(leagueId);
  const { fixtures, loading: fixturesLoading, error: fixturesError, refetch: refetchFixtures } = useFixtures(leagueId);
  const { topScorers, loading: scorersLoading } = useTopScorers(leagueId);

  if (!league) return null;

  const TABS: { key: Tab; label: string; emoji: string }[] = [
    { key: 'standings', label: 'Standings', emoji: '🏆' },
    { key: 'fixtures', label: 'Matches', emoji: '⚽' },
    { key: 'potm', label: 'Top Scorers', emoji: '⭐' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>
          {league.emoji} {league.name}
        </Text>
      </View>

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && { backgroundColor: league.color }]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text style={styles.tabEmoji}>{tab.emoji}</Text>
            <Text style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'standings' && (
          standingsLoading ? (
            <LoadingSpinner message="Loading standings..." />
          ) : standingsError ? (
            <ErrorMessage message={standingsError} onRetry={refetchStandings} />
          ) : (
            <StandingsTable standings={standings} />
          )
        )}

        {activeTab === 'fixtures' && (
          fixturesLoading ? (
            <LoadingSpinner message="Loading matches..." />
          ) : fixturesError ? (
            <ErrorMessage message={fixturesError} onRetry={refetchFixtures} />
          ) : fixtures.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>⚽</Text>
              <Text style={styles.emptyText}>No recent matches</Text>
            </View>
          ) : (
            fixtures.map((fixture) => (
              <FixtureCard
                key={fixture.id}
                fixture={fixture}
                onPress={() => navigation.navigate('MatchDetail', { fixture })}
              />
            ))
          )
        )}

        {activeTab === 'potm' && (
          scorersLoading ? (
            <LoadingSpinner message="Loading top scorers..." />
          ) : (
            <PlayerOfMonth players={topScorers} />
          )
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
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  backButton: {
    marginBottom: 8,
  },
  backText: {
    fontSize: 14,
    color: Colors.primaryLight,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 12,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.darkCard,
    borderRadius: 10,
    paddingVertical: 10,
    gap: 6,
  },
  tabEmoji: { fontSize: 14 },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  tabTextActive: {
    color: Colors.textPrimary,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyEmoji: { fontSize: 40, marginBottom: 12 },
  emptyText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
});
