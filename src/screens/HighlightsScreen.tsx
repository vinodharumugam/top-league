import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import { LEAGUES } from '../constants/leagues';
import { fetchEspnTeams, fetchEspnTeamResults } from '../services/espnApi';

interface Team {
  id: string;
  name: string;
  shortName: string;
  logo: string;
}

interface MatchResult {
  id: string;
  date: string;
  homeTeam: string;
  awayTeam: string;
  homeLogo: string;
  awayLogo: string;
  homeScore: string;
  awayScore: string;
}

type Step = 'leagues' | 'teams' | 'results';

export default function HighlightsScreen() {
  const [step, setStep] = useState<Step>('leagues');
  const [selectedLeague, setSelectedLeague] = useState(LEAGUES[0]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [results, setResults] = useState<MatchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const loadTeams = async (leagueId: number) => {
    setLoading(true);
    const data = await fetchEspnTeams(leagueId);
    setTeams(data);
    setLoading(false);
    setStep('teams');
  };

  const loadResults = async (teamId: string) => {
    setLoading(true);
    const data = await fetchEspnTeamResults(selectedLeague.id, teamId);
    setResults(data);
    setLoading(false);
    setStep('results');
  };

  // ====== LEAGUE SELECTION ======
  if (step === 'leagues') {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>🎬 Highlights</Text>
        <Text style={styles.subtitle}>Pick a league to browse</Text>

        <View style={styles.leagueGrid}>
          {LEAGUES.map((league) => (
            <TouchableOpacity
              key={league.id}
              style={[styles.leagueCard, { borderLeftColor: league.color }]}
              onPress={() => {
                setSelectedLeague(league);
                loadTeams(league.id);
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.leagueEmoji}>{league.emoji}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.leagueName}>{league.name}</Text>
                <Text style={styles.leagueCountry}>{league.country}</Text>
              </View>
              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    );
  }

  // ====== TEAM SELECTION ======
  if (step === 'teams') {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => setStep('leagues')} style={styles.backButton}>
          <Text style={styles.backText}>← Leagues</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{selectedLeague.emoji} {selectedLeague.name}</Text>
        <Text style={styles.subtitle}>Pick a club</Text>

        {loading ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color={Colors.accent} />
            <Text style={styles.loadingText}>Loading teams...</Text>
          </View>
        ) : (
          <FlatList
            data={teams}
            numColumns={3}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.teamGrid}
            columnWrapperStyle={styles.teamRow}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.teamCard}
                onPress={() => {
                  setSelectedTeam(item);
                  loadResults(item.id);
                }}
                activeOpacity={0.7}
              >
                {item.logo ? (
                  <Image source={{ uri: item.logo }} style={styles.teamLogo} />
                ) : (
                  <View style={styles.teamLogoPlaceholder}>
                    <Text style={styles.teamLogoText}>⚽</Text>
                  </View>
                )}
                <Text style={styles.teamName} numberOfLines={2}>
                  {item.shortName}
                </Text>
              </TouchableOpacity>
            )}
          />
        )}
      </SafeAreaView>
    );
  }

  // ====== MATCH RESULTS ======
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => setStep('teams')} style={styles.backButton}>
        <Text style={styles.backText}>← {selectedLeague.name}</Text>
      </TouchableOpacity>

      {selectedTeam && (
        <View style={styles.teamHeader}>
          {selectedTeam.logo ? (
            <Image source={{ uri: selectedTeam.logo }} style={styles.teamHeaderLogo} />
          ) : null}
          <Text style={styles.title}>{selectedTeam.name}</Text>
        </View>
      )}
      <Text style={styles.subtitle}>Latest results</Text>

      {loading ? (
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color={Colors.accent} />
          <Text style={styles.loadingText}>Loading results...</Text>
        </View>
      ) : results.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyEmoji}>📋</Text>
          <Text style={styles.emptyText}>No results found</Text>
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.resultsList}
          renderItem={({ item }) => {
            const isHomeWin = Number(item.homeScore) > Number(item.awayScore);
            const isAwayWin = Number(item.awayScore) > Number(item.homeScore);
            const isDraw = item.homeScore === item.awayScore;

            return (
              <View style={styles.resultCard}>
                <Text style={styles.resultDate}>
                  {new Date(item.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })}
                </Text>
                <View style={styles.resultMatch}>
                  <View style={styles.resultTeam}>
                    {item.homeLogo ? (
                      <Image source={{ uri: item.homeLogo }} style={styles.resultLogo} />
                    ) : null}
                    <Text style={[styles.resultTeamName, isHomeWin && styles.resultWinner]} numberOfLines={1}>
                      {item.homeTeam}
                    </Text>
                  </View>

                  <View style={[
                    styles.resultScoreBox,
                    isDraw && styles.resultScoreDraw,
                  ]}>
                    <Text style={styles.resultScore}>
                      {item.homeScore} - {item.awayScore}
                    </Text>
                  </View>

                  <View style={[styles.resultTeam, { alignItems: 'flex-end' }]}>
                    {item.awayLogo ? (
                      <Image source={{ uri: item.awayLogo }} style={styles.resultLogo} />
                    ) : null}
                    <Text style={[styles.resultTeamName, isAwayWin && styles.resultWinner, { textAlign: 'right' }]} numberOfLines={1}>
                      {item.awayTeam}
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textPrimary,
    paddingHorizontal: 16,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    paddingHorizontal: 16,
    marginTop: 4,
    marginBottom: 16,
  },
  backButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  backText: {
    fontSize: 14,
    color: Colors.primaryLight,
    fontWeight: '600',
  },
  arrow: {
    fontSize: 18,
    color: Colors.textSecondary,
  },

  // League selection
  leagueGrid: {
    paddingHorizontal: 16,
    gap: 10,
  },
  leagueCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.darkCard,
    borderRadius: 14,
    padding: 18,
    borderLeftWidth: 4,
    gap: 14,
  },
  leagueEmoji: {
    fontSize: 36,
  },
  leagueName: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  leagueCountry: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },

  // Team selection
  teamGrid: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  teamRow: {
    justifyContent: 'flex-start',
    gap: 8,
    marginBottom: 8,
  },
  teamCard: {
    backgroundColor: Colors.darkCard,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    width: '31%',
  },
  teamLogo: {
    width: 48,
    height: 48,
    marginBottom: 8,
  },
  teamLogoPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.darkSurface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  teamLogoText: { fontSize: 24 },
  teamName: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textPrimary,
    textAlign: 'center',
  },

  // Team header
  teamHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 12,
  },
  teamHeaderLogo: {
    width: 36,
    height: 36,
  },

  // Results
  resultsList: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  resultCard: {
    backgroundColor: Colors.darkCard,
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
  },
  resultDate: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '600',
    marginBottom: 10,
  },
  resultMatch: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultTeam: {
    flex: 1,
    alignItems: 'flex-start',
    gap: 6,
  },
  resultLogo: {
    width: 28,
    height: 28,
  },
  resultTeamName: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  resultWinner: {
    color: Colors.textPrimary,
    fontWeight: '700',
  },
  resultScoreBox: {
    backgroundColor: Colors.darkSurface,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginHorizontal: 10,
  },
  resultScoreDraw: {
    borderWidth: 1,
    borderColor: Colors.draw + '40',
  },
  resultScore: {
    fontSize: 18,
    fontWeight: '900',
    color: Colors.accent,
  },

  // Loading / Empty
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
  emptyBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyEmoji: { fontSize: 40, marginBottom: 8 },
  emptyText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
});
