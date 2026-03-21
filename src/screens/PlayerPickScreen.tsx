import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import { TIERS } from '../constants/tiers';
import { DreamTeamPlayer } from '../types/player';
import BudgetBar from '../components/dreamteam/BudgetBar';
import PlayerCard from '../components/dreamteam/PlayerCard';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

interface Props {
  squad: DreamTeamPlayer[];
  budgetRemaining: number;
  totalCost: number;
  canAddPlayer: (player: DreamTeamPlayer) => boolean;
  addPlayer: (player: DreamTeamPlayer) => void;
  removePlayer: (playerId: number) => void;
  getAvailablePlayers: (filters?: any) => DreamTeamPlayer[];
  onBack: () => void;
}

export default function PlayerPickScreen({
  squad,
  budgetRemaining,
  totalCost,
  canAddPlayer,
  addPlayer,
  removePlayer,
  getAvailablePlayers,
  onBack,
}: Props) {
  const [selectedTier, setSelectedTier] = useState<string | undefined>();
  const [selectedPosition, setSelectedPosition] = useState<string | undefined>();
  const [searchText, setSearchText] = useState('');

  const players = getAvailablePlayers({
    tier: selectedTier,
    position: selectedPosition,
    search: searchText || undefined,
  });

  const positions = ['GK', 'DEF', 'MID', 'FWD'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Pick Players</Text>
      </View>

      <View style={styles.budgetSection}>
        <BudgetBar spent={totalCost} remaining={budgetRemaining} squadCount={squad.length} />
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
          style={[styles.filterChip, !selectedTier && styles.filterChipActive]}
          onPress={() => setSelectedTier(undefined)}
        >
          <Text style={[styles.filterText, !selectedTier && styles.filterTextActive]}>All</Text>
        </TouchableOpacity>
        {TIERS.map((tier) => (
          <TouchableOpacity
            key={tier.name}
            style={[
              styles.filterChip,
              selectedTier === tier.name && { backgroundColor: tier.color + '30', borderColor: tier.color },
            ]}
            onPress={() => setSelectedTier(selectedTier === tier.name ? undefined : tier.name)}
          >
            <Text
              style={[
                styles.filterText,
                selectedTier === tier.name && { color: tier.color },
              ]}
            >
              {tier.emoji} {tier.priceLabel}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Position filter */}
      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[styles.filterChip, !selectedPosition && styles.filterChipActive]}
          onPress={() => setSelectedPosition(undefined)}
        >
          <Text style={[styles.filterText, !selectedPosition && styles.filterTextActive]}>All Pos</Text>
        </TouchableOpacity>
        {positions.map((pos) => (
          <TouchableOpacity
            key={pos}
            style={[styles.filterChip, selectedPosition === pos && styles.filterChipActive]}
            onPress={() => setSelectedPosition(selectedPosition === pos ? undefined : pos)}
          >
            <Text style={[styles.filterText, selectedPosition === pos && styles.filterTextActive]}>
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
          const isInSquad = squad.some((p) => p.id === item.id);
          return (
            <View style={{ width: CARD_WIDTH }}>
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
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No players found</Text>
          </View>
        }
      />
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
    paddingBottom: 8,
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
  budgetSection: {
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: Colors.darkCard,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginHorizontal: 16,
    color: Colors.textPrimary,
    fontSize: 14,
    marginBottom: 8,
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
    paddingBottom: 20,
    gap: 10,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 15,
    color: Colors.textSecondary,
  },
});
