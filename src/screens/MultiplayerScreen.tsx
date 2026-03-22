import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Share,
  Platform,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import { AuthContext } from '../../App';
import {
  createChallenge,
  joinChallenge,
  cancelChallenge,
  subscribeToChallengeUpdates,
} from '../services/supabase';
import { supabase } from '../services/supabase';

interface Props {
  hasSquad: boolean;
  squadJson: any;
  onPlayComputer: (difficulty: 'easy' | 'medium' | 'hard' | 'legends' | 'best') => void;
  onLocalMultiplayer: () => void;
  onOnlineMatch: (opponentSquad: any, matchSeed: number) => void;
  onBack: () => void;
}

export default function MultiplayerScreen({ hasSquad, squadJson, onPlayComputer, onLocalMultiplayer, onOnlineMatch, onBack }: Props) {
  const { user, isGuest } = useContext(AuthContext);
  const [challengeCode, setChallengeCode] = useState('');
  const [createdCode, setCreatedCode] = useState<string | null>(null);
  const [createdChallengeId, setCreatedChallengeId] = useState<string | null>(null);
  const [waiting, setWaiting] = useState(false);
  const [noSquadMsg, setNoSquadMsg] = useState<string | null>(null);
  const [joinMsg, setJoinMsg] = useState<string | null>(null);
  const [joining, setJoining] = useState(false);

  // Subscribe to challenge updates when waiting
  useEffect(() => {
    if (!createdChallengeId || !waiting) return;

    const channel = subscribeToChallengeUpdates(createdChallengeId, (challenge) => {
      if (challenge.status === 'matched' && challenge.guest_squad_json) {
        setWaiting(false);
        setCreatedCode(null);
        onOnlineMatch(challenge.guest_squad_json, challenge.match_seed);
      }
    });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [createdChallengeId, waiting]);

  const handleCreateChallenge = async () => {
    if (!hasSquad) {
      setNoSquadMsg('You need 11 players first! Go pick your squad.');
      setTimeout(() => setNoSquadMsg(null), 4000);
      return;
    }
    if (!user) {
      setNoSquadMsg('You need to be logged in to play online! Go to More > Sign In.');
      setTimeout(() => setNoSquadMsg(null), 4000);
      return;
    }

    const { challenge, code, error } = await createChallenge(user.id, squadJson);
    if (error) {
      setNoSquadMsg(error);
      setTimeout(() => setNoSquadMsg(null), 4000);
      return;
    }
    setCreatedCode(code);
    setCreatedChallengeId(challenge.id);
    setWaiting(true);
  };

  const handleJoinChallenge = async () => {
    if (!hasSquad) {
      setNoSquadMsg('You need 11 players first! Go pick your squad.');
      setTimeout(() => setNoSquadMsg(null), 4000);
      return;
    }
    if (!user) {
      setNoSquadMsg('You need to be logged in to play online! Go to More > Sign In.');
      setTimeout(() => setNoSquadMsg(null), 4000);
      return;
    }
    if (challengeCode.length < 4) {
      setJoinMsg('Enter the code your friend shared with you!');
      setTimeout(() => setJoinMsg(null), 3000);
      return;
    }

    setJoining(true);
    const { challenge, error } = await joinChallenge(challengeCode, user.id, squadJson);
    setJoining(false);

    if (error) {
      setJoinMsg(error);
      setTimeout(() => setJoinMsg(null), 4000);
      return;
    }

    if (challenge) {
      onOnlineMatch(challenge.host_squad_json, challenge.match_seed);
    }
  };

  const handleCancelChallenge = async () => {
    if (createdChallengeId) {
      await cancelChallenge(createdChallengeId);
    }
    setCreatedCode(null);
    setCreatedChallengeId(null);
    setWaiting(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>🆚 Multiplayer</Text>
        </View>

        {/* No squad warning */}
        {noSquadMsg && (
          <View style={styles.warningBanner}>
            <Text style={styles.warningText}>⚠️ {noSquadMsg}</Text>
          </View>
        )}

        {/* VS Computer */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🤖 Play vs Computer</Text>
          <Text style={styles.sectionSub}>
            Choose a difficulty and play against a randomly generated team
          </Text>

          <View style={styles.difficultyRow}>
            <TouchableOpacity
              style={[styles.difficultyCard, { borderLeftColor: Colors.primaryLight }]}
              onPress={() => onPlayComputer('easy')}
            >
              <Text style={styles.diffEmoji}>😊</Text>
              <Text style={styles.diffName}>Easy</Text>
              <Text style={styles.diffDesc}>Good & Rising players</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.difficultyCard, { borderLeftColor: Colors.draw }]}
              onPress={() => onPlayComputer('medium')}
            >
              <Text style={styles.diffEmoji}>😤</Text>
              <Text style={styles.diffName}>Medium</Text>
              <Text style={styles.diffDesc}>Mixed team</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.difficultyCard, { borderLeftColor: Colors.loss }]}
              onPress={() => onPlayComputer('hard')}
            >
              <Text style={styles.diffEmoji}>🔥</Text>
              <Text style={styles.diffName}>Hard</Text>
              <Text style={styles.diffDesc}>Star & Great players</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.legendsCard}
              onPress={() => onPlayComputer('legends')}
            >
              <Text style={styles.diffEmoji}>👑</Text>
              <Text style={styles.legendsName}>LEGENDS</Text>
              <Text style={styles.legendsDesc}>Maradona, Pelé, Messi... Can you beat the GOATs?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.bestCard}
              onPress={() => onPlayComputer('best')}
            >
              <Text style={styles.diffEmoji}>💀</Text>
              <Text style={styles.bestName}>THE BEST</Text>
              <Text style={styles.bestDesc}>The greatest XI ever assembled. Nearly impossible.</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Challenge Friend */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>👥 Challenge a Friend</Text>

          {/* Local 2-Player Button */}
          <TouchableOpacity
            style={styles.localButton}
            onPress={onLocalMultiplayer}
            activeOpacity={0.8}
          >
            <Text style={styles.localEmoji}>🎮</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.localTitle}>2 Player Battle (Same Device)</Text>
              <Text style={styles.localDesc}>Take turns picking squads, then watch the match!</Text>
            </View>
            <Text style={styles.localArrow}>▶</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>— or play online —</Text>

          {!user && !isGuest && (
            <View style={styles.loginNeeded}>
              <Text style={styles.loginNeededText}>🔑 Log in to play online matches</Text>
            </View>
          )}

          {/* Created challenge code display */}
          {createdCode && waiting ? (
            <View style={styles.codeDisplay}>
              <Text style={styles.codeLabel}>🎮 Your Challenge Code:</Text>
              <View style={styles.codeBigBox}>
                <Text style={styles.codeBigText}>{createdCode}</Text>
              </View>
              <Text style={styles.codeInstruction}>
                Send this code to your friend so they can join!
              </Text>

              {/* Share buttons */}
              <View style={styles.shareRow}>
                <TouchableOpacity
                  style={styles.shareButton}
                  onPress={async () => {
                    await Clipboard.setStringAsync(createdCode);
                    setJoinMsg('Code copied!');
                    setTimeout(() => setJoinMsg(null), 2000);
                  }}
                >
                  <Text style={styles.shareButtonText}>📋 Copy Code</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.shareButton, styles.shareButtonPrimary]}
                  onPress={async () => {
                    try {
                      await Share.share({
                        message: `I challenge you to a match in Top League! ⚽\n\nJoin with code: ${createdCode}\n\nOpen the app and enter my code in Multiplayer > Join.\n\nhttps://top-league.vercel.app`,
                      });
                    } catch (e) {}
                  }}
                >
                  <Text style={styles.shareButtonPrimaryText}>📤 Share via...</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[styles.shareButton, { marginTop: 8, alignSelf: 'stretch' }]}
                onPress={async () => {
                  const subject = encodeURIComponent('Top League Challenge! ⚽');
                  const body = encodeURIComponent(
                    `I challenge you to a match in Top League!\n\nJoin with code: ${createdCode}\n\nOpen https://top-league.vercel.app, go to Dream Team > Multiplayer > Join, and enter my code.\n\nLet's see who builds the better squad!`
                  );
                  const mailUrl = `mailto:?subject=${subject}&body=${body}`;
                  // Using Share as fallback since Linking may not work on all platforms
                  try {
                    await Share.share({
                      message: `I challenge you to a match in Top League! ⚽\n\nJoin with code: ${createdCode}\n\nOpen https://top-league.vercel.app and enter my code in Multiplayer.\n\nLet's see who builds the better squad!`,
                      title: 'Top League Challenge',
                    });
                  } catch (e) {}
                }}
              >
                <Text style={styles.shareButtonText}>✉️ Invite via Email</Text>
              </TouchableOpacity>

              <View style={styles.waitingDots}>
                <Text style={styles.waitingText}>⏳ Waiting for friend to join...</Text>
              </View>

              {joinMsg && (
                <Text style={styles.copiedText}>{joinMsg}</Text>
              )}

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancelChallenge}
              >
                <Text style={styles.cancelText}>Cancel Challenge</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.createButton} onPress={handleCreateChallenge}>
              <Text style={styles.createButtonText}>📤 Create Challenge</Text>
            </TouchableOpacity>
          )}

          <Text style={styles.orText}>— or join a friend's game —</Text>

          <View style={styles.joinRow}>
            <TextInput
              style={styles.codeInput}
              placeholder="Enter code..."
              placeholderTextColor={Colors.textSecondary}
              value={challengeCode}
              onChangeText={(text) => setChallengeCode(text.toUpperCase())}
              maxLength={6}
            />
            <TouchableOpacity style={styles.joinButton} onPress={handleJoinChallenge}>
              <Text style={styles.joinButtonText}>Join</Text>
            </TouchableOpacity>
          </View>

          {joinMsg && (
            <View style={styles.joinMsgBox}>
              <Text style={styles.joinMsgText}>{joinMsg}</Text>
            </View>
          )}

          <View style={styles.comingSoonBox}>
            <Text style={styles.comingSoonEmoji}>🚀</Text>
            <Text style={styles.comingSoonTitle}>Online Play Coming Soon!</Text>
            <Text style={styles.comingSoonText}>
              Friend vs friend online matches will be added with Supabase.
              For now, try beating the computer on Hard mode!
            </Text>
          </View>
        </View>

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
  backText: {
    fontSize: 14,
    color: Colors.primaryLight,
    fontWeight: '600',
    marginBottom: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  warningBanner: {
    backgroundColor: '#F44336' + '25',
    borderRadius: 10,
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.loss,
  },
  warningText: {
    fontSize: 14,
    color: Colors.loss,
    fontWeight: '600',
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  sectionSub: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 14,
  },
  difficultyRow: {
    gap: 10,
  },
  difficultyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.darkCard,
    borderRadius: 12,
    padding: 14,
    borderLeftWidth: 3,
    gap: 12,
  },
  diffEmoji: { fontSize: 24 },
  diffName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    width: 70,
  },
  diffDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
    flex: 1,
  },
  bestCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a0000',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#FF0000',
    borderLeftWidth: 3,
    borderLeftColor: '#FF0000',
    gap: 12,
  },
  bestName: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FF0000',
    width: 70,
    letterSpacing: 1,
  },
  bestDesc: {
    fontSize: 12,
    color: '#FF0000',
    opacity: 0.7,
    flex: 1,
  },
  legendsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 14,
    borderLeftWidth: 3,
    borderLeftColor: '#FFD700',
    borderWidth: 1,
    borderRightColor: '#FFD70040',
    borderTopColor: '#FFD70040',
    borderBottomColor: '#FFD70040',
    gap: 12,
  },
  legendsName: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFD700',
    width: 70,
    letterSpacing: 1,
  },
  legendsDesc: {
    fontSize: 12,
    color: '#FFD700',
    opacity: 0.7,
    flex: 1,
  },
  localButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.accent,
    borderRadius: 14,
    padding: 16,
    gap: 12,
    marginBottom: 6,
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  localEmoji: { fontSize: 28 },
  localTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.dark,
  },
  localDesc: {
    fontSize: 12,
    color: Colors.dark,
    opacity: 0.7,
    marginTop: 2,
  },
  localArrow: {
    fontSize: 18,
    color: Colors.dark,
  },
  createButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  loginNeeded: {
    backgroundColor: Colors.draw + '20',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.draw,
  },
  loginNeededText: {
    fontSize: 14,
    color: Colors.draw,
    textAlign: 'center',
    fontWeight: '600',
  },
  shareRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 14,
    width: '100%',
  },
  shareButton: {
    flex: 1,
    backgroundColor: Colors.darkSurface,
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.textSecondary + '40',
  },
  shareButtonPrimary: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primaryLight,
  },
  shareButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  shareButtonPrimaryText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  copiedText: {
    fontSize: 13,
    color: Colors.primaryLight,
    fontWeight: '600',
    marginTop: 8,
  },
  codeDisplay: {
    backgroundColor: Colors.darkCard,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.accent,
  },
  codeLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  codeBigBox: {
    backgroundColor: Colors.dark,
    borderRadius: 12,
    paddingHorizontal: 30,
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: Colors.accent,
    borderStyle: 'dashed',
  },
  codeBigText: {
    fontSize: 36,
    fontWeight: '900',
    color: Colors.accent,
    letterSpacing: 8,
  },
  codeInstruction: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 12,
    textAlign: 'center',
  },
  waitingDots: {
    marginTop: 16,
    backgroundColor: Colors.primary + '30',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  waitingText: {
    fontSize: 14,
    color: Colors.primaryLight,
    fontWeight: '600',
  },
  cancelButton: {
    marginTop: 14,
    padding: 8,
  },
  cancelText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  orText: {
    textAlign: 'center',
    color: Colors.textSecondary,
    marginVertical: 14,
    fontSize: 13,
  },
  joinRow: {
    flexDirection: 'row',
    gap: 10,
  },
  codeInput: {
    flex: 1,
    backgroundColor: Colors.darkCard,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: Colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 4,
    textAlign: 'center',
  },
  joinButton: {
    backgroundColor: Colors.accentOrange,
    borderRadius: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  joinButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  joinMsgBox: {
    backgroundColor: Colors.accentOrange + '20',
    borderRadius: 10,
    padding: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: Colors.accentOrange,
  },
  joinMsgText: {
    fontSize: 13,
    color: Colors.accentOrange,
    textAlign: 'center',
    fontWeight: '600',
  },
  comingSoonBox: {
    backgroundColor: Colors.darkCard,
    borderRadius: 14,
    padding: 20,
    marginTop: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.darkSurface,
  },
  comingSoonEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  comingSoonTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  comingSoonText: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});
