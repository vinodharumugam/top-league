import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Transfer } from '../../types/player';
import { Colors } from '../../constants/colors';

interface Props {
  transfer: Transfer;
}

export default function TransferCard({ transfer }: Props) {
  const typeColor =
    transfer.type === 'buy'
      ? Colors.accent
      : transfer.type === 'loan'
      ? Colors.accentOrange
      : Colors.primaryLight;

  const typeLabel =
    transfer.type === 'buy'
      ? '💰'
      : transfer.type === 'loan'
      ? '🔄'
      : '🆓';

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.playerAvatar}>
          <Text style={styles.avatarText}>👤</Text>
        </View>
        <View style={styles.playerInfo}>
          <Text style={styles.playerName}>{transfer.playerName}</Text>
          <Text style={styles.position}>
            {transfer.position} · Age {transfer.playerAge}
          </Text>
        </View>
        <View style={[styles.feeBadge, { backgroundColor: typeColor + '20', borderColor: typeColor }]}>
          <Text style={[styles.feeText, { color: typeColor }]}>
            {typeLabel} {transfer.fee}
          </Text>
        </View>
      </View>

      <View style={styles.transferFlow}>
        <View style={styles.teamBox}>
          <Text style={styles.teamLabel}>FROM</Text>
          <Text style={styles.teamName}>{transfer.fromTeam}</Text>
        </View>
        <Text style={styles.arrow}>→</Text>
        <View style={styles.teamBox}>
          <Text style={styles.teamLabel}>TO</Text>
          <Text style={[styles.teamName, { color: Colors.primaryLight }]}>
            {transfer.toTeam}
          </Text>
        </View>
      </View>

      <Text style={styles.date}>
        {new Date(transfer.date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.darkCard,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  playerAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.darkSurface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { fontSize: 22 },
  playerInfo: { flex: 1 },
  playerName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  position: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  feeBadge: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
  },
  feeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  transferFlow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 10,
  },
  teamBox: { flex: 1 },
  teamLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  teamName: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  arrow: {
    fontSize: 20,
    color: Colors.accentOrange,
    fontWeight: '700',
  },
  date: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 10,
  },
});
