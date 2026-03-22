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
  Dimensions,
  Linking,
} from 'react-native';
// SafeAreaView handled by parent (MoreScreen)
import { Colors } from '../constants/colors';
import { LEAGUES } from '../constants/leagues';
import { fetchEspnTeams } from '../services/espnApi';
import { fetchHighlights, VideoHighlight } from '../services/highlightsApi';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface Team {
  id: string;
  name: string;
  shortName: string;
  logo: string;
}

type Step = 'leagues' | 'teams' | 'highlights' | 'video';

export default function HighlightsScreen() {
  const [step, setStep] = useState<Step>('leagues');
  const [selectedLeague, setSelectedLeague] = useState(LEAGUES[0]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [highlights, setHighlights] = useState<VideoHighlight[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<VideoHighlight | null>(null);
  const [loading, setLoading] = useState(false);

  const loadTeams = async (leagueId: number) => {
    setLoading(true);
    const data = await fetchEspnTeams(leagueId);
    setTeams(data);
    setLoading(false);
    setStep('teams');
  };

  const loadHighlights = async (teamName: string) => {
    setLoading(true);
    const data = await fetchHighlights(selectedLeague.id, teamName);
    setHighlights(data);
    setLoading(false);
    setStep('highlights');
  };

  // ====== LEAGUE SELECTION ======
  if (step === 'leagues') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>🎬 Highlights</Text>
        <Text style={styles.subtitle}>Pick a league</Text>

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
      </View>
    );
  }

  // ====== TEAM SELECTION ======
  if (step === 'teams') {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setStep('leagues')} style={styles.backButton}>
          <Text style={styles.backText}>← Leagues</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{selectedLeague.emoji} {selectedLeague.name}</Text>
        <Text style={styles.subtitle}>Pick a club to see highlights</Text>

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
                  loadHighlights(item.name);
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
      </View>
    );
  }

  // ====== VIDEO PLAYER ======
  if (step === 'video' && selectedVideo) {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setStep('highlights')} style={styles.backButton}>
          <Text style={styles.backText}>← Highlights</Text>
        </TouchableOpacity>

        <ScrollView contentContainerStyle={styles.videoContainer}>
          <Text style={styles.videoTitle}>{selectedVideo.title}</Text>
          <Text style={styles.videoMeta}>
            {selectedVideo.competition} · {new Date(selectedVideo.date).toLocaleDateString('en-US', {
              weekday: 'short', month: 'short', day: 'numeric',
            })}
          </Text>

          {/* Video thumbnail with play button — opens in browser */}
          <TouchableOpacity
            style={styles.videoPlayer}
            onPress={() => {
              if (selectedVideo.url) {
                Linking.openURL(selectedVideo.url);
              }
            }}
            activeOpacity={0.8}
          >
            {selectedVideo.thumbnail ? (
              <Image
                source={{ uri: selectedVideo.thumbnail }}
                style={styles.videoThumbnailBig}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.videoPlaceholder}>
                <Text style={styles.placeholderEmoji}>🎬</Text>
              </View>
            )}
            <View style={styles.playOverlay}>
              <View style={styles.playButton}>
                <Text style={styles.playButtonText}>▶</Text>
              </View>
              <Text style={styles.playLabel}>Tap to watch highlights</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.matchupBox}>
            <Text style={styles.matchupTeam}>{selectedVideo.team1}</Text>
            <Text style={styles.matchupVs}>vs</Text>
            <Text style={styles.matchupTeam}>{selectedVideo.team2}</Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  // ====== HIGHLIGHTS LIST ======
  return (
    <View style={styles.container}>
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
      <Text style={styles.subtitle}>Video highlights</Text>

      {loading ? (
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color={Colors.accent} />
          <Text style={styles.loadingText}>Loading highlights...</Text>
        </View>
      ) : highlights.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyEmoji}>🎬</Text>
          <Text style={styles.emptyText}>No highlights found right now</Text>
          <Text style={styles.emptySubtext}>Check back after match day!</Text>
        </View>
      ) : (
        <FlatList
          data={highlights}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.highlightList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.highlightCard}
              onPress={() => {
                setSelectedVideo(item);
                setStep('video');
              }}
              activeOpacity={0.7}
            >
              {/* Thumbnail */}
              <View style={styles.thumbnailBox}>
                {item.thumbnail ? (
                  <Image
                    source={{ uri: item.thumbnail }}
                    style={styles.thumbnail}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={[styles.thumbnail, styles.thumbnailPlaceholder]}>
                    <Text style={{ fontSize: 32 }}>🎬</Text>
                  </View>
                )}
                <View style={styles.thumbnailPlay}>
                  <Text style={styles.thumbnailPlayText}>▶</Text>
                </View>
              </View>

              {/* Info */}
              <View style={styles.highlightInfo}>
                <Text style={styles.highlightTitle} numberOfLines={2}>
                  {item.title}
                </Text>
                <Text style={styles.highlightMeta}>
                  {item.competition}
                </Text>
                <Text style={styles.highlightDate}>
                  {new Date(item.date).toLocaleDateString('en-US', {
                    month: 'short', day: 'numeric',
                  })}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
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
  leagueEmoji: { fontSize: 36 },
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

  // Highlights list
  highlightList: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  highlightCard: {
    flexDirection: 'row',
    backgroundColor: Colors.darkCard,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 10,
  },
  thumbnailBox: {
    width: 140,
    height: 90,
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  thumbnailPlaceholder: {
    backgroundColor: Colors.darkSurface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnailPlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  thumbnailPlayText: {
    fontSize: 24,
    color: '#fff',
  },
  highlightInfo: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  highlightTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
    lineHeight: 18,
  },
  highlightMeta: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  highlightDate: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
  },

  // Video player
  videoContainer: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  videoTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  videoMeta: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  videoPlayer: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: Colors.darkSurface,
    position: 'relative',
  },
  videoThumbnailBig: {
    width: '100%',
    height: '100%',
  },
  videoPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderEmoji: { fontSize: 60 },
  playOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonText: {
    fontSize: 28,
    color: Colors.dark,
    marginLeft: 4,
  },
  playLabel: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 10,
  },
  matchupBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.darkCard,
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    gap: 12,
  },
  matchupTeam: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    flex: 1,
    textAlign: 'center',
  },
  matchupVs: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.accentOrange,
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
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  emptySubtext: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 4,
  },
});
