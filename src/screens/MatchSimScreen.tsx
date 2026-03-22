import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import { MatchSimResult } from '../types/dreamteam';
import MatchSimulation from '../components/dreamteam/MatchSimulation';

interface Props {
  result: MatchSimResult;
  onDone: () => void;
  onRematch?: () => void;
}

export default function MatchSimScreen({ result, onDone, onRematch }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>⚽ Match Day!</Text>
      </View>

      <MatchSimulation key={result.homeGoals * 1000 + result.awayGoals + Math.random()} result={result} onComplete={() => {}} />

      {onRematch && (
        <TouchableOpacity style={styles.rematchButton} onPress={handleRematch} activeOpacity={0.8}>
          <Text style={styles.rematchText}>⚡ Rematch (Same Teams)</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.doneButton} onPress={onDone} activeOpacity={0.8}>
        <Text style={styles.doneText}>🏠 Back to Dream Team</Text>
      </TouchableOpacity>
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
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
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
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.darkSurface,
  },
  doneText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
});
