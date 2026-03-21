import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Standing } from '../../types/league';
import { Colors } from '../../constants/colors';

interface Props {
  standing: Standing;
}

export default function StandingsRow({ standing }: Props) {
  const isTop4 = standing.position <= 4;
  const isBottom3 = standing.position >= 18;

  return (
    <View
      style={[
        styles.row,
        isTop4 && styles.rowTop4,
        isBottom3 && styles.rowBottom3,
      ]}
    >
      <Text
        style={[
          styles.position,
          isTop4 && styles.posTop4,
          isBottom3 && styles.posBottom3,
        ]}
      >
        {standing.position}
      </Text>
      {standing.teamLogo ? (
        <Image source={{ uri: standing.teamLogo }} style={styles.teamLogo} />
      ) : null}
      <Text style={styles.teamName} numberOfLines={1}>
        {standing.teamName}
      </Text>
      <Text style={styles.stat}>{standing.played}</Text>
      <Text style={styles.stat}>{standing.won}</Text>
      <Text style={styles.stat}>{standing.drawn}</Text>
      <Text style={styles.stat}>{standing.lost}</Text>
      <Text style={styles.gd}>
        {standing.goalDifference > 0 ? '+' : ''}
        {standing.goalDifference}
      </Text>
      <Text style={styles.points}>{standing.points}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: Colors.darkSurface,
  },
  rowTop4: {
    borderLeftWidth: 3,
    borderLeftColor: Colors.primaryLight,
  },
  rowBottom3: {
    borderLeftWidth: 3,
    borderLeftColor: Colors.loss,
  },
  position: {
    width: 24,
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  posTop4: { color: Colors.primaryLight },
  posBottom3: { color: Colors.loss },
  teamLogo: {
    width: 20,
    height: 20,
    marginLeft: 4,
    borderRadius: 2,
  },
  teamName: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginLeft: 6,
  },
  stat: {
    width: 26,
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  gd: {
    width: 30,
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  points: {
    width: 30,
    fontSize: 14,
    fontWeight: '800',
    color: Colors.accent,
    textAlign: 'center',
  },
});
