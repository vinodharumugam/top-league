import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '../../constants/colors';

interface Props {
  activeFilter?: 'buy' | 'loan' | 'free';
  onFilterChange: (filter?: 'buy' | 'loan' | 'free') => void;
}

const FILTERS = [
  { key: undefined, label: 'All', emoji: '📋' },
  { key: 'buy' as const, label: 'Bought', emoji: '💰' },
  { key: 'loan' as const, label: 'Loans', emoji: '🔄' },
  { key: 'free' as const, label: 'Free', emoji: '🆓' },
];

export default function TransferFilter({ activeFilter, onFilterChange }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {FILTERS.map((f) => (
        <TouchableOpacity
          key={f.label}
          style={[
            styles.chip,
            activeFilter === f.key && f.key !== undefined && styles.chipActive,
            activeFilter === undefined && f.key === undefined && styles.chipActive,
          ]}
          onPress={() => onFilterChange(f.key)}
        >
          <Text style={styles.chipEmoji}>{f.emoji}</Text>
          <Text
            style={[
              styles.chipText,
              (activeFilter === f.key || (activeFilter === undefined && f.key === undefined)) &&
                styles.chipTextActive,
            ]}
          >
            {f.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    gap: 8,
    paddingVertical: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.darkCard,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    gap: 6,
    borderWidth: 1,
    borderColor: Colors.darkSurface,
  },
  chipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primaryLight,
  },
  chipEmoji: { fontSize: 14 },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  chipTextActive: {
    color: Colors.textPrimary,
  },
});
