import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import { TIERS, getTierByName, formatMoney, TOTAL_BUDGET, SQUAD_SIZE } from '../constants/tiers';
import { DreamTeamPlayer } from '../types/player';
import { Formation, Squad } from '../types/dreamteam';
import { SAMPLE_PLAYERS } from '../services/sampleData';
import { simulateMatch } from '../utils/matchEngine';
import PlayerCard from '../components/dreamteam/PlayerCard';
import BudgetBar from '../components/dreamteam/BudgetBar';
import FormationView from '../components/dreamteam/FormationView';
import MatchSimulation from '../components/dreamteam/MatchSimulation';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

type Step = 'setup' | 'p1-pick' | 'handover' | 'p2-pick' | 'preview' | 'match';

export default function LocalMultiplayerScreen({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState<Step>('setup');
  const [p1Name, setP1Name] = useState('');
  const [p2Name, setP2Name] = useState('');
  const [p1Squad, setP1Squad] = useState<DreamTeamPlayer[]>([]);
  const [p2Squad, setP2Squad] = useState<DreamTeamPlayer[]>([]);
  const [matchResult, setMatchResult] = useState<any>(null);
  const [matchKey, setMatchKey] = useState(0);

  // Current picking state
  const currentSquad = step === 'p1-pick' ? p1Squad : p2Squad;
  const setCurrentSquad = step === 'p1-pick' ? setP1Squad : setP2Squad;
  const currentName = step === 'p1-pick' ? (p1Name || 'Player 1') : (p2Name || 'Player 2');
  const otherSquadIds = step === 'p2-pick' ? p1Squad.map((p) => p.id) : [];

  const [filterTier, setFilterTier] = useState<string | undefined>();
  const [filterPos, setFilterPos] = useState<string | undefined>();
  const [searchText, setSearchText] = useState('');

  const totalCost = currentSquad.reduce((sum, p) => {
    const tier = getTierByName(p.tier);
    return sum + (tier?.price || 0);
  }, 0);
  const budgetRemaining = TOTAL_BUDGET - totalCost;

  const canAddPlayer = (player: DreamTeamPlayer): boolean => {
    if (currentSquad.length >= SQUAD_SIZE) return false;
    if (currentSquad.some((p) => p.id === player.id)) return false;
    if (otherSquadIds.includes(player.id)) return false;
    const tier = getTierByName(player.tier);
    if (!tier) return false;
    return budgetRemaining >= tier.price;
  };

  const addPlayer = (player: DreamTeamPlayer) => {
    if (!canAddPlayer(player)) return;
    setCurrentSquad((prev) => [...prev, player]);
  };

  const removePlayer = (playerId: number) => {
    setCurrentSquad((prev) => prev.filter((p) => p.id !== playerId));
  };

  const getFilteredPlayers = () => {
    let players = SAMPLE_PLAYERS.filter((p) => !otherSquadIds.includes(p.id));
    if (filterTier) players = players.filter((p) => p.tier === filterTier);
    if (filterPos) players = players.filter((p) => p.position === filterPos);
    if (searchText) {
      const q = searchText.toLowerCase();
      players = players.filter(
        (p) => p.name.toLowerCase().includes(q) || p.team.toLowerCase().includes(q)
      );
    }
    return players;
  };

  const makeSquadObject = (players: DreamTeamPlayer[], name: string): Squad => {
    const cost = players.reduce((sum, p) => sum + (getTierByName(p.tier)?.price || 0), 0);
    const avgRating = players.length
      ? Math.round(players.reduce((sum, p) => sum + p.rating, 0) / players.length)
      : 0;
    return {
      id: name,
      name: name + "'s Team",
      formation: '4-3-3' as Formation,
      players,
      totalCost: cost,
      averageRating: avgRating,
    };
  };

  const startMatch = () => {
    const squad1 = makeSquadObject(p1Squad, p1Name || 'Player 1');
    const squad2 = makeSquadObject(p2Squad, p2Name || 'Player 2');
    const result = simulateMatch(squad1, squad2);
    setMatchResult(result);
    setStep('match');
  };

  // ============ SETUP SCREEN ============
  if (step === 'setup') {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.setupScroll}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onBack}>
              <Text style={styles.backText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.title}>🆚 Local 2 Player</Text>
          </View>

          <View style={styles.setupContent}>
            <Text style={styles.setupEmoji}>🎮</Text>
            <Text style={styles.setupTitle}>2 Player Battle!</Text>
            <Text style={styles.setupDesc}>
              Take turns picking your dream squad, then watch your teams play!
            </Text>

            <View style={styles.nameSection}>
              <Text style={styles.nameLabel}>👤 Player 1 Name</Text>
              <TextInput
                style={styles.nameInput}
                placeholder="Enter name..."
                placeholderTextColor={Colors.textSecondary}
                value={p1Name}
                onChangeText={setP1Name}
                maxLength={15}
              />
            </View>

            <View style={styles.nameSection}>
              <Text style={styles.nameLabel}>👤 Player 2 Name</Text>
              <TextInput
                style={styles.nameInput}
                placeholder="Enter name..."
                placeholderTextColor={Colors.textSecondary}
                value={p2Name}
                onChangeText={setP2Name}
                maxLength={15}
              />
            </View>

            <View style={styles.rulesBox}>
              <Text style={styles.rulesTitle}>How it works:</Text>
              <Text style={styles.rulesText}>1. {p1Name || 'Player 1'} picks 11 players ($20M budget)</Text>
              <Text style={styles.rulesText}>2. Pass the device to {p2Name || 'Player 2'}</Text>
              <Text style={styles.rulesText}>3. {p2Name || 'Player 2'} picks 11 players</Text>
              <Text style={styles.rulesText}>4. Watch the match! ⚽</Text>
            </View>

            <TouchableOpacity
              style={styles.startButton}
              onPress={() => setStep('p1-pick')}
              activeOpacity={0.8}
            >
              <Text style={styles.startButtonText}>🏆 Let's Go!</Text>
            </TouchableOpacity>

            <View style={{ height: 40 }} />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ============ HANDOVER SCREEN ============
  if (step === 'handover') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.handoverContent}>
          <Text style={styles.handoverEmoji}>🔄</Text>
          <Text style={styles.handoverTitle}>Pass the device!</Text>
          <Text style={styles.handoverDesc}>
            {p1Name || 'Player 1'} has picked their team.{'\n'}
            Now give the device to {p2Name || 'Player 2'}!
          </Text>
          <Text style={styles.handoverWarning}>
            No peeking at {p1Name || 'Player 1'}'s squad! 👀
          </Text>

          <TouchableOpacity
            style={styles.readyButton}
            onPress={() => {
              setFilterTier(undefined);
              setFilterPos(undefined);
              setSearchText('');
              setStep('p2-pick');
            }}
            activeOpacity={0.8}
          >
            <Text style={styles.readyButtonText}>
              I'm {p2Name || 'Player 2'} - I'm Ready!
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ============ PREVIEW SCREEN ============
  if (step === 'preview') {
    const squad1 = makeSquadObject(p1Squad, p1Name || 'Player 1');
    const squad2 = makeSquadObject(p2Squad, p2Name || 'Player 2');
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.previewContent}>
          <Text style={styles.previewTitle}>⚽ Match Preview</Text>

          <View style={styles.vsCard}>
            <View style={styles.vsTeam}>
              <Text style={styles.vsTeamName}>{squad1.name}</Text>
              <Text style={styles.vsRating}>⭐ {squad1.averageRating}</Text>
              <Text style={styles.vsCount}>{p1Squad.length} players</Text>
            </View>
            <Text style={styles.vsText}>VS</Text>
            <View style={styles.vsTeam}>
              <Text style={styles.vsTeamName}>{squad2.name}</Text>
              <Text style={styles.vsRating}>⭐ {squad2.averageRating}</Text>
              <Text style={styles.vsCount}>{p2Squad.length} players</Text>
            </View>
          </View>

          <View style={styles.previewFormations}>
            <Text style={styles.formationLabel}>{squad1.name}</Text>
            <FormationView formation="4-3-3" players={p1Squad} />
            <View style={{ height: 20 }} />
            <Text style={styles.formationLabel}>{squad2.name}</Text>
            <FormationView formation="4-3-3" players={p2Squad} />
          </View>

          <TouchableOpacity
            style={styles.kickoffButton}
            onPress={startMatch}
            activeOpacity={0.8}
          >
            <Text style={styles.kickoffText}>⚽ KICK OFF!</Text>
          </TouchableOpacity>

          <View style={{ height: 30 }} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ============ MATCH SCREEN ============
  if (step === 'match' && matchResult) {
    return (
      <SafeAreaView style={styles.container}>
        <MatchSimulation key={matchKey} result={matchResult} />
        <TouchableOpacity
          style={styles.rematchButton}
          onPress={() => {
            const squad1 = makeSquadObject(p1Squad, p1Name || 'Player 1');
            const squad2 = makeSquadObject(p2Squad, p2Name || 'Player 2');
            const newResult = simulateMatch(squad1, squad2);
            setMatchResult(newResult);
            setMatchKey((k) => k + 1);
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.rematchText}>⚡ Rematch (Same Teams)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.doneButton}
          onPress={() => {
            setP1Squad([]);
            setP2Squad([]);
            setMatchResult(null);
            setStep('setup');
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.doneText}>🔄 New Game (Pick New Teams)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.exitButton}
          onPress={onBack}
        >
          <Text style={styles.exitText}>🏠 Back to Menu</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // ============ PLAYER PICK SCREEN (P1 or P2) ============
  const players = getFilteredPlayers();
  const positions = ['GK', 'DEF', 'MID', 'FWD'];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with player name */}
      <View style={styles.pickHeader}>
        <View style={[styles.playerBanner, step === 'p2-pick' && { backgroundColor: Colors.accentOrange }]}>
          <Text style={styles.playerBannerText}>
            🎯 {currentName}'s Turn — Pick Your Squad!
          </Text>
        </View>
      </View>

      <View style={styles.budgetSection}>
        <BudgetBar spent={totalCost} remaining={budgetRemaining} squadCount={currentSquad.length} />
      </View>

      {/* Search */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search players or teams..."
        placeholderTextColor={Colors.textSecondary}
        value={searchText}
        onChangeText={setSearchText}
      />

      {/* Tier filter */}
      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[styles.filterChip, !filterTier && styles.filterChipActive]}
          onPress={() => setFilterTier(undefined)}
        >
          <Text style={[styles.filterText, !filterTier && styles.filterTextActive]}>All</Text>
        </TouchableOpacity>
        {TIERS.map((tier) => (
          <TouchableOpacity
            key={tier.name}
            style={[
              styles.filterChip,
              filterTier === tier.name && { backgroundColor: tier.color + '30', borderColor: tier.color },
            ]}
            onPress={() => setFilterTier(filterTier === tier.name ? undefined : tier.name)}
          >
            <Text
              style={[styles.filterText, filterTier === tier.name && { color: tier.color }]}
            >
              {tier.emoji} {tier.priceLabel}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Position filter */}
      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[styles.filterChip, !filterPos && styles.filterChipActive]}
          onPress={() => setFilterPos(undefined)}
        >
          <Text style={[styles.filterText, !filterPos && styles.filterTextActive]}>All Pos</Text>
        </TouchableOpacity>
        {positions.map((pos) => (
          <TouchableOpacity
            key={pos}
            style={[styles.filterChip, filterPos === pos && styles.filterChipActive]}
            onPress={() => setFilterPos(filterPos === pos ? undefined : pos)}
          >
            <Text style={[styles.filterText, filterPos === pos && styles.filterTextActive]}>
              {pos}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Player Grid */}
      <FlatList
        data={players}
        numColumns={2}
        keyExtractor={(item) => String(item.id)}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const isInSquad = currentSquad.some((p) => p.id === item.id);
          const isOtherTeam = otherSquadIds.includes(item.id);
          return (
            <View style={{ width: CARD_WIDTH, opacity: isOtherTeam ? 0.3 : 1 }}>
              <PlayerCard
                player={item}
                isInSquad={isInSquad}
                canAdd={canAddPlayer(item)}
                onPress={() => {
                  if (isInSquad) removePlayer(item.id);
                  else if (canAddPlayer(item)) addPlayer(item);
                }}
              />
            </View>
          );
        }}
      />

      {/* Done picking button */}
      {currentSquad.length === SQUAD_SIZE && (
        <TouchableOpacity
          style={styles.donePickingButton}
          onPress={() => {
            if (step === 'p1-pick') {
              setStep('handover');
            } else {
              setStep('preview');
            }
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.donePickingText}>
            ✅ Done! ({currentSquad.length}/11 players)
          </Text>
        </TouchableOpacity>
      )}
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

  // Setup
  setupScroll: {
    flexGrow: 1,
  },
  setupContent: {
    paddingHorizontal: 16,
    alignItems: 'center',
    paddingTop: 20,
  },
  setupEmoji: { fontSize: 60, marginBottom: 12 },
  setupTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.accent,
    marginBottom: 8,
  },
  setupDesc: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  nameSection: {
    width: '100%',
    marginBottom: 14,
  },
  nameLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  nameInput: {
    backgroundColor: Colors.darkCard,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  rulesBox: {
    width: '100%',
    backgroundColor: Colors.darkCard,
    borderRadius: 12,
    padding: 16,
    marginTop: 10,
    marginBottom: 20,
  },
  rulesTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  rulesText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
    lineHeight: 22,
  },
  startButton: {
    backgroundColor: Colors.accent,
    borderRadius: 14,
    padding: 18,
    width: '100%',
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 20,
    fontWeight: '900',
    color: Colors.dark,
  },

  // Handover
  handoverContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  handoverEmoji: { fontSize: 70, marginBottom: 16 },
  handoverTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.accent,
    marginBottom: 12,
  },
  handoverDesc: {
    fontSize: 16,
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 8,
  },
  handoverWarning: {
    fontSize: 15,
    color: Colors.accentOrange,
    fontWeight: '600',
    marginBottom: 30,
  },
  readyButton: {
    backgroundColor: Colors.accentOrange,
    borderRadius: 14,
    padding: 18,
    paddingHorizontal: 40,
  },
  readyButtonText: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary,
  },

  // Pick screen
  pickHeader: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  playerBanner: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    marginBottom: 8,
  },
  playerBannerText: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  budgetSection: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  searchInput: {
    backgroundColor: Colors.darkCard,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginHorizontal: 16,
    color: Colors.textPrimary,
    fontSize: 14,
    marginBottom: 6,
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 6,
    marginBottom: 6,
  },
  filterChip: {
    backgroundColor: Colors.darkCard,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: Colors.darkSurface,
  },
  filterChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primaryLight,
  },
  filterText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  filterTextActive: {
    color: Colors.textPrimary,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  grid: {
    paddingTop: 8,
    paddingBottom: 80,
    gap: 10,
  },
  donePickingButton: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: Colors.accent,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  donePickingText: {
    fontSize: 18,
    fontWeight: '900',
    color: Colors.dark,
  },

  // Preview
  previewContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    alignItems: 'center',
  },
  previewTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: Colors.accent,
    marginBottom: 16,
  },
  vsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.darkCard,
    borderRadius: 16,
    padding: 20,
    width: '100%',
    marginBottom: 20,
  },
  vsTeam: {
    flex: 1,
    alignItems: 'center',
  },
  vsTeamName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  vsRating: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.accent,
    marginTop: 4,
  },
  vsCount: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  vsText: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.accentOrange,
    marginHorizontal: 16,
  },
  previewFormations: {
    width: '100%',
    alignItems: 'center',
  },
  formationLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  kickoffButton: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    padding: 20,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: Colors.primaryLight,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  kickoffText: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.accent,
  },

  // Match done
  rematchButton: {
    backgroundColor: Colors.accentOrange,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  rematchText: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  doneButton: {
    backgroundColor: Colors.darkCard,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.darkSurface,
  },
  doneText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  exitButton: {
    backgroundColor: Colors.darkCard,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  exitText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
});
