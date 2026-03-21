import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import { Formation } from '../types/dreamteam';
import { DreamTeamPlayer } from '../types/player';
import FormationView from '../components/dreamteam/FormationView';

const FORMATION_OPTIONS: Formation[] = ['4-3-3', '4-4-2', '3-5-2', '4-2-3-1'];

interface Props {
  formation: Formation;
  setFormation: (f: Formation) => void;
  squad: DreamTeamPlayer[];
  onBack: () => void;
  onStartMatch: () => void;
}

export default function FormationScreen({
  formation,
  setFormation,
  squad,
  onBack,
  onStartMatch,
}: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>📐 Set Formation</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Formation Selector */}
        <View style={styles.formationRow}>
          {FORMATION_OPTIONS.map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.formationChip, formation === f && styles.formationChipActive]}
              onPress={() => setFormation(f)}
            >
              <Text style={[styles.formationText, formation === f && styles.formationTextActive]}>
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Formation Preview */}
        <View style={styles.pitchContainer}>
          <FormationView formation={formation} players={squad} />
        </View>

        {/* Squad List */}
        <Text style={styles.sectionTitle}>Your Squad ({squad.length}/11)</Text>
        {squad.map((player) => (
          <View key={player.id} style={styles.squadRow}>
            <View
              style={[
                styles.posBadge,
                {
                  backgroundColor:
                    player.position === 'GK'
                      ? '#FF9800'
                      : player.position === 'DEF'
                      ? '#2196F3'
                      : player.position === 'MID'
                      ? '#4CAF50'
                      : '#F44336',
                },
              ]}
            >
              <Text style={styles.posText}>{player.position}</Text>
            </View>
            <Text style={styles.squadPlayerName}>{player.name}</Text>
            <Text style={styles.squadPlayerRating}>⭐ {player.rating}</Text>
          </View>
        ))}

        {squad.length === 0 && (
          <Text style={styles.emptyText}>No players picked yet! Go back and pick some.</Text>
        )}

        {/* Start Match Button */}
        {squad.length === 11 && (
          <TouchableOpacity style={styles.startButton} onPress={onStartMatch} activeOpacity={0.8}>
            <Text style={styles.startButtonText}>⚽ Start Match!</Text>
          </TouchableOpacity>
        )}

        {squad.length > 0 && squad.length < 11 && (
          <View style={styles.warningBox}>
            <Text style={styles.warningText}>
              You need {11 - squad.length} more player{11 - squad.length > 1 ? 's' : ''} to start a match!
            </Text>
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
  content: {
    paddingHorizontal: 16,
  },
  formationRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  formationChip: {
    flex: 1,
    backgroundColor: Colors.darkCard,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.darkSurface,
  },
  formationChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primaryLight,
  },
  formationText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  formationTextActive: {
    color: Colors.textPrimary,
  },
  pitchContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  squadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.darkCard,
    borderRadius: 10,
    padding: 12,
    marginBottom: 6,
    gap: 10,
  },
  posBadge: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  posText: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  squadPlayerName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  squadPlayerRating: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.accent,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingVertical: 20,
  },
  startButton: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    padding: 18,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: Colors.primaryLight,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  startButtonText: {
    fontSize: 20,
    fontWeight: '900',
    color: Colors.textPrimary,
  },
  warningBox: {
    backgroundColor: Colors.draw + '20',
    borderRadius: 10,
    padding: 14,
    marginTop: 16,
    borderWidth: 1,
    borderColor: Colors.draw,
  },
  warningText: {
    fontSize: 14,
    color: Colors.draw,
    textAlign: 'center',
    fontWeight: '600',
  },
});
