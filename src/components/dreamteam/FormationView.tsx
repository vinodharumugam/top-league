import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Formation, FORMATIONS } from '../../types/dreamteam';
import { DreamTeamPlayer } from '../../types/player';
import { Colors } from '../../constants/colors';

interface Props {
  formation: Formation;
  players: DreamTeamPlayer[];
}

const PITCH_HEIGHT = 360;
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PITCH_WIDTH = SCREEN_WIDTH - 32;

export default function FormationView({ formation, players }: Props) {
  const slots = FORMATIONS[formation].positions;

  // Assign players to slots by matching positions
  const assignedPlayers: (DreamTeamPlayer | null)[] = slots.map((slot) => {
    const matchingPlayers = players.filter((p) => p.position === slot.position);
    const alreadyAssigned = slots
      .slice(0, slots.indexOf(slot))
      .filter((s) => s.position === slot.position).length;
    return matchingPlayers[alreadyAssigned] || null;
  });

  return (
    <View style={styles.pitch}>
      {/* Pitch markings */}
      <View style={styles.centerLine} />
      <View style={styles.centerCircle} />
      <View style={styles.penaltyBoxTop} />
      <View style={styles.penaltyBoxBottom} />

      {/* Player dots */}
      {slots.map((slot, index) => {
        const player = assignedPlayers[index];
        const left = (slot.x / 100) * PITCH_WIDTH - 22;
        const top = (slot.y / 100) * PITCH_HEIGHT - 22;

        const posColor =
          slot.position === 'GK'
            ? '#FF9800'
            : slot.position === 'DEF'
            ? '#2196F3'
            : slot.position === 'MID'
            ? '#4CAF50'
            : '#F44336';

        return (
          <View key={index} style={[styles.playerDot, { left, top, borderColor: posColor }]}>
            <Text style={styles.dotIcon}>{player ? '👤' : '+'}</Text>
            {player && (
              <Text style={styles.dotName} numberOfLines={1}>
                {player.name.split(' ').pop()}
              </Text>
            )}
            {!player && (
              <Text style={[styles.dotPos, { color: posColor }]}>{slot.position}</Text>
            )}
          </View>
        );
      })}

      {/* Formation label */}
      <View style={styles.formationLabel}>
        <Text style={styles.formationText}>{formation}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pitch: {
    width: PITCH_WIDTH,
    height: PITCH_HEIGHT,
    backgroundColor: '#1B5E20',
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#2E7D32',
    position: 'relative',
    overflow: 'hidden',
  },
  centerLine: {
    position: 'absolute',
    top: PITCH_HEIGHT / 2,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  centerCircle: {
    position: 'absolute',
    top: PITCH_HEIGHT / 2 - 30,
    left: PITCH_WIDTH / 2 - 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  penaltyBoxTop: {
    position: 'absolute',
    top: 0,
    left: PITCH_WIDTH / 2 - 60,
    width: 120,
    height: 40,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  penaltyBoxBottom: {
    position: 'absolute',
    bottom: 0,
    left: PITCH_WIDTH / 2 - 60,
    width: 120,
    height: 40,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  playerDot: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  dotIcon: {
    fontSize: 18,
  },
  dotName: {
    position: 'absolute',
    bottom: -14,
    fontSize: 8,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
    width: 60,
  },
  dotPos: {
    position: 'absolute',
    bottom: -12,
    fontSize: 8,
    fontWeight: '700',
  },
  formationLabel: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  formationText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
});
