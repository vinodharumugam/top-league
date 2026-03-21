import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { TOTAL_BUDGET, formatMoney } from '../../constants/tiers';

interface Props {
  spent: number;
  remaining: number;
  squadCount: number;
}

export default function BudgetBar({ spent, remaining, squadCount }: Props) {
  const percentage = ((TOTAL_BUDGET - remaining) / TOTAL_BUDGET) * 100;
  const barColor = percentage > 90 ? Colors.loss : percentage > 70 ? Colors.draw : Colors.primaryLight;

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Text style={styles.label}>Budget</Text>
        <Text style={styles.remaining}>{formatMoney(remaining)} left</Text>
      </View>
      <View style={styles.barBg}>
        <View style={[styles.barFill, { width: `${percentage}%`, backgroundColor: barColor }]} />
      </View>
      <View style={styles.bottomRow}>
        <Text style={styles.detail}>Spent: {formatMoney(spent)}</Text>
        <Text style={styles.detail}>Players: {squadCount}/11</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.darkCard,
    borderRadius: 12,
    padding: 14,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  remaining: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.accent,
  },
  barBg: {
    height: 8,
    backgroundColor: Colors.darkSurface,
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  detail: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
});
