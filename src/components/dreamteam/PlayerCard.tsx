import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { DreamTeamPlayer } from '../../types/player';
import { Colors } from '../../constants/colors';
import { getTierByName } from '../../constants/tiers';

interface Props {
  player: DreamTeamPlayer;
  isInSquad: boolean;
  canAdd: boolean;
  onPress: () => void;
}

export default function PlayerCard({ player, isInSquad, canAdd, onPress }: Props) {
  const tier = getTierByName(player.tier);

  const posColor =
    player.position === 'GK'
      ? '#FF9800'
      : player.position === 'DEF'
      ? '#2196F3'
      : player.position === 'MID'
      ? '#4CAF50'
      : '#F44336';

  return (
    <TouchableOpacity
      style={[styles.card, isInSquad && styles.cardSelected]}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View style={styles.topSection}>
        <View style={styles.ratingBox}>
          <Text style={styles.rating}>{player.rating}</Text>
        </View>
        <View style={[styles.posBadge, { backgroundColor: posColor }]}>
          <Text style={styles.posText}>{player.position}</Text>
        </View>
      </View>

      {player.photo ? (
        <Image source={{ uri: player.photo }} style={styles.avatarImage} />
      ) : (
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>👤</Text>
        </View>
      )}

      <Text style={styles.playerName} numberOfLines={1}>{player.name}</Text>
      <Text style={styles.teamName} numberOfLines={1}>{player.team}</Text>

      <View style={styles.tierRow}>
        <Text style={[styles.tierBadge, { color: tier?.color }]}>
          {tier?.emoji} {tier?.priceLabel}
        </Text>
      </View>

      {/* Stats mini row */}
      <View style={styles.statsRow}>
        <View style={styles.miniStat}>
          <Text style={styles.miniStatValue}>{player.pace}</Text>
          <Text style={styles.miniStatLabel}>PAC</Text>
        </View>
        <View style={styles.miniStat}>
          <Text style={styles.miniStatValue}>{player.shooting}</Text>
          <Text style={styles.miniStatLabel}>SHO</Text>
        </View>
        <View style={styles.miniStat}>
          <Text style={styles.miniStatValue}>{player.passing}</Text>
          <Text style={styles.miniStatLabel}>PAS</Text>
        </View>
        <View style={styles.miniStat}>
          <Text style={styles.miniStatValue}>{player.defending}</Text>
          <Text style={styles.miniStatLabel}>DEF</Text>
        </View>
      </View>

      {/* Add/Remove button */}
      <TouchableOpacity
        style={[
          styles.actionButton,
          isInSquad ? styles.removeButton : canAdd ? styles.addButton : styles.disabledButton,
        ]}
        onPress={onPress}
        disabled={!isInSquad && !canAdd}
      >
        <Text style={styles.actionText}>
          {isInSquad ? '✕ Remove' : canAdd ? '+ Add' : 'Can\'t Add'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.darkCard,
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardSelected: {
    borderColor: Colors.primaryLight,
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 6,
  },
  ratingBox: {
    backgroundColor: Colors.accent,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  rating: {
    fontSize: 16,
    fontWeight: '900',
    color: Colors.dark,
  },
  posBadge: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  posText: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  avatarImage: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginVertical: 6,
    backgroundColor: Colors.darkSurface,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.darkSurface,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 6,
  },
  avatarText: { fontSize: 26 },
  playerName: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  teamName: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  tierRow: {
    marginTop: 6,
  },
  tierBadge: {
    fontSize: 12,
    fontWeight: '700',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  miniStat: {
    alignItems: 'center',
  },
  miniStatValue: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  miniStatLabel: {
    fontSize: 8,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  actionButton: {
    width: '100%',
    borderRadius: 8,
    paddingVertical: 6,
    alignItems: 'center',
    marginTop: 8,
  },
  addButton: {
    backgroundColor: Colors.primary,
  },
  removeButton: {
    backgroundColor: Colors.loss,
  },
  disabledButton: {
    backgroundColor: Colors.darkSurface,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
});
