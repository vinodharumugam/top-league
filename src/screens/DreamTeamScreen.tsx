import React, { useState, useContext, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import { TIERS, formatMoney } from '../constants/tiers';
import { useDreamTeam } from '../hooks/useDreamTeam';
import { simulateMatch } from '../utils/matchEngine';
import { generateComputerTeam } from '../utils/computerTeam';
import { saveMatchResult } from '../services/supabase';
import { AuthContext } from '../../App';
import BudgetBar from '../components/dreamteam/BudgetBar';
import FormationView from '../components/dreamteam/FormationView';
import PlayerPickScreen from './PlayerPickScreen';
import FormationScreen from './FormationScreen';
import MatchSimScreen from './MatchSimScreen';
import MultiplayerScreen from './MultiplayerScreen';
import LocalMultiplayerScreen from './LocalMultiplayerScreen';

type Screen = 'home' | 'pick' | 'formation' | 'match' | 'multiplayer' | 'local-mp';

export default function DreamTeamScreen() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [matchResult, setMatchResult] = useState<any>(null);
  const lastDifficulty = useRef<string>('medium');
  const { user } = useContext(AuthContext);

  const {
    squad,
    formation,
    setFormation,
    teamName,
    totalCost,
    budgetRemaining,
    averageRating,
    canAddPlayer,
    addPlayer,
    removePlayer,
    clearSquad,
    getAvailablePlayers,
    getSquadObject,
    positionCounts,
    isSquadFull,
  } = useDreamTeam();

  const saveMatch = async (result: any, difficulty: string) => {
    if (user) {
      try {
        await saveMatchResult(user.id, result, `computer_${difficulty}`);
      } catch (e) {
        // Silently fail — don't block gameplay
      }
    }
  };

  const handleStartMatch = () => {
    const computerTeam = generateComputerTeam('medium', squad.map((p) => p.id));
    const result = simulateMatch(getSquadObject(), computerTeam);
    setMatchResult(result);
    lastDifficulty.current = 'medium';
    setCurrentScreen('match');
    saveMatch(result, 'medium');
  };

  const handlePlayComputer = (difficulty: 'easy' | 'medium' | 'hard' | 'legends' | 'best') => {
    if (!isSquadFull) {
      Alert.alert('Squad Not Ready!', 'You need 11 players to play a match!');
      return;
    }
    const computerTeam = generateComputerTeam(difficulty, squad.map((p) => p.id));
    const result = simulateMatch(getSquadObject(), computerTeam);
    setMatchResult(result);
    lastDifficulty.current = difficulty;
    setCurrentScreen('match');
    saveMatch(result, difficulty);
  };

  // Sub-screens
  if (currentScreen === 'pick') {
    return (
      <PlayerPickScreen
        squad={squad}
        budgetRemaining={budgetRemaining}
        totalCost={totalCost}
        canAddPlayer={canAddPlayer}
        addPlayer={addPlayer}
        removePlayer={removePlayer}
        getAvailablePlayers={getAvailablePlayers}
        onBack={() => setCurrentScreen('home')}
      />
    );
  }

  if (currentScreen === 'formation') {
    return (
      <FormationScreen
        formation={formation}
        setFormation={setFormation}
        squad={squad}
        onBack={() => setCurrentScreen('home')}
        onStartMatch={handleStartMatch}
      />
    );
  }

  if (currentScreen === 'match' && matchResult) {
    return (
      <MatchSimScreen
        result={matchResult}
        onDone={() => {
          setMatchResult(null);
          setCurrentScreen('home');
        }}
        onRematch={() => {
          const difficulty = lastDifficulty.current as any;
          const computerTeam = generateComputerTeam(difficulty, squad.map((p) => p.id));
          const newResult = simulateMatch(getSquadObject(), computerTeam);
          setMatchResult(newResult);
          saveMatch(newResult, difficulty);
        }}
      />
    );
  }

  const handleOnlineMatch = (opponentSquadJson: any, matchSeed: number) => {
    // Reconstruct opponent squad
    const opponentSquad = {
      id: 'online-opponent',
      name: 'Online Opponent',
      formation: opponentSquadJson.formation || '4-3-3',
      players: opponentSquadJson.players || opponentSquadJson,
      totalCost: opponentSquadJson.totalCost || 0,
      averageRating: opponentSquadJson.averageRating || 80,
    };
    const result = simulateMatch(getSquadObject(), opponentSquad);
    setMatchResult(result);
    lastDifficulty.current = 'online';
    setCurrentScreen('match');
    if (user) {
      saveMatchResult(user.id, result, 'online').catch(() => {});
    }
  };

  if (currentScreen === 'multiplayer') {
    return (
      <MultiplayerScreen
        hasSquad={isSquadFull}
        squadJson={isSquadFull ? getSquadObject() : null}
        onPlayComputer={handlePlayComputer}
        onLocalMultiplayer={() => setCurrentScreen('local-mp')}
        onOnlineMatch={handleOnlineMatch}
        onBack={() => setCurrentScreen('home')}
      />
    );
  }

  if (currentScreen === 'local-mp') {
    return (
      <LocalMultiplayerScreen onBack={() => setCurrentScreen('multiplayer')} />
    );
  }

  // Main Dream Team home screen
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>⚽ Dream Team</Text>

        {/* Budget */}
        <View style={styles.section}>
          <BudgetBar
            spent={totalCost}
            remaining={budgetRemaining}
            squadCount={squad.length}
          />
        </View>

        {/* Formation Preview */}
        {squad.length > 0 && (
          <View style={styles.section}>
            <View style={styles.pitchContainer}>
              <FormationView formation={formation} players={squad} />
            </View>
          </View>
        )}

        {/* Squad Summary */}
        {squad.length > 0 && (
          <View style={styles.section}>
            <View style={styles.statsCard}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>⭐ {averageRating}</Text>
                <Text style={styles.statLabel}>Avg Rating</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{positionCounts.GK} GK</Text>
                <Text style={styles.statLabel}>{positionCounts.DEF} DEF</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{positionCounts.MID} MID</Text>
                <Text style={styles.statLabel}>{positionCounts.FWD} FWD</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{formatMoney(totalCost)}</Text>
                <Text style={styles.statLabel}>Spent</Text>
              </View>
            </View>
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => setCurrentScreen('pick')}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonIcon}>🎯</Text>
            <View>
              <Text style={styles.primaryButtonTitle}>
                {squad.length === 0 ? 'Pick Your Players' : 'Edit Squad'}
              </Text>
              <Text style={styles.primaryButtonSub}>
                {squad.length}/11 players selected
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => setCurrentScreen('formation')}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonIcon}>📐</Text>
            <Text style={styles.secondaryButtonText}>Set Formation ({formation})</Text>
          </TouchableOpacity>

          {isSquadFull && (
            <TouchableOpacity
              style={styles.playButton}
              onPress={handleStartMatch}
              activeOpacity={0.8}
            >
              <Text style={styles.playButtonIcon}>🏆</Text>
              <Text style={styles.playButtonText}>Play Match!</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => setCurrentScreen('multiplayer')}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonIcon}>🆚</Text>
            <Text style={styles.secondaryButtonText}>Multiplayer</Text>
          </TouchableOpacity>

          {squad.length > 0 && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => {
                Alert.alert('Clear Squad?', 'Remove all players from your squad?', [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Clear', style: 'destructive', onPress: clearSquad },
                ]);
              }}
            >
              <Text style={styles.clearButtonText}>🗑️ Clear Squad</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Tier Reference */}
        {squad.length === 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Player Tiers</Text>
            {TIERS.map((tier) => (
              <View
                key={tier.name}
                style={[styles.tierCard, { borderLeftColor: tier.color }]}
              >
                <Text style={styles.tierEmoji}>{tier.emoji}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.tierName}>{tier.name}</Text>
                  <Text style={styles.tierPrice}>{tier.priceLabel} per player</Text>
                </View>
                <Text style={styles.tierRating}>
                  {tier.minRating}-{tier.maxRating}
                </Text>
              </View>
            ))}
          </View>
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
  section: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  pitchContainer: {
    alignItems: 'center',
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: Colors.darkCard,
    borderRadius: 12,
    padding: 14,
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.accent,
  },
  statLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 14,
    padding: 16,
    gap: 12,
    marginBottom: 10,
  },
  primaryButtonIcon: { fontSize: 28 },
  primaryButtonTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  primaryButtonSub: {
    fontSize: 13,
    color: Colors.primaryLight,
    marginTop: 2,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.darkCard,
    borderRadius: 12,
    padding: 14,
    gap: 10,
    marginBottom: 10,
  },
  secondaryButtonIcon: { fontSize: 20 },
  secondaryButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.accent,
    borderRadius: 14,
    padding: 16,
    gap: 10,
    marginBottom: 10,
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  playButtonIcon: { fontSize: 24 },
  playButtonText: {
    fontSize: 20,
    fontWeight: '900',
    color: Colors.dark,
  },
  clearButton: {
    alignItems: 'center',
    padding: 12,
  },
  clearButtonText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  tierCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.darkCard,
    borderRadius: 12,
    padding: 14,
    borderLeftWidth: 3,
    gap: 12,
    marginBottom: 8,
  },
  tierEmoji: { fontSize: 24 },
  tierName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  tierPrice: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  tierRating: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
});
