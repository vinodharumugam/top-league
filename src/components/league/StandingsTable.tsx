import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Standing } from '../../types/league';
import { Colors } from '../../constants/colors';
import StandingsRow from './StandingsRow';

interface Props {
  standings: Standing[];
}

export default function StandingsTable({ standings }: Props) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerText, { width: 24, textAlign: 'center' }]}>#</Text>
        <Text style={[styles.headerText, { flex: 1, marginLeft: 6 }]}>Team</Text>
        <Text style={[styles.headerText, { width: 26 }]}>P</Text>
        <Text style={[styles.headerText, { width: 26 }]}>W</Text>
        <Text style={[styles.headerText, { width: 26 }]}>D</Text>
        <Text style={[styles.headerText, { width: 26 }]}>L</Text>
        <Text style={[styles.headerText, { width: 30 }]}>GD</Text>
        <Text style={[styles.headerText, { width: 30 }]}>Pts</Text>
      </View>

      {/* Rows */}
      <ScrollView>
        {standings.map((s) => (
          <StandingsRow key={s.position} standing={s} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.darkCard,
    borderRadius: 14,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 4,
    backgroundColor: Colors.darkSurface,
  },
  headerText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textSecondary,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});
