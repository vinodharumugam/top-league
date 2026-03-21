import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Highlight } from '../../types/match';
import { Colors } from '../../constants/colors';

interface Props {
  highlight: Highlight;
  onPress?: () => void;
}

export default function HighlightCard({ highlight, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={onPress}>
      {/* Thumbnail placeholder */}
      <View style={styles.thumbnail}>
        <Text style={styles.playIcon}>▶️</Text>
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>{highlight.duration}</Text>
        </View>
      </View>

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {highlight.title}
        </Text>
        <View style={styles.matchInfo}>
          <Text style={styles.score}>{highlight.score}</Text>
          <Text style={styles.date}>
            {new Date(highlight.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.darkCard,
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 12,
  },
  thumbnail: {
    height: 160,
    backgroundColor: Colors.darkSurface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    fontSize: 48,
  },
  durationBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  durationText: {
    fontSize: 11,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  info: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  matchInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  score: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.accent,
  },
  date: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
});
