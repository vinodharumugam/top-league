import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated } from 'react-native';
import { MatchSimResult, MatchSimEvent } from '../../types/dreamteam';
import { Colors } from '../../constants/colors';

interface Props {
  result: MatchSimResult;
  onComplete?: () => void;
}

export default function MatchSimulation({ result, onComplete }: Props) {
  const [visibleEvents, setVisibleEvents] = useState<MatchSimEvent[]>([]);
  const [currentMinute, setCurrentMinute] = useState(0);
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const scrollRef = useRef<ScrollView>(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Pulse animation for scores
  const pulseScore = () => {
    Animated.sequence([
      Animated.timing(pulseAnim, { toValue: 1.3, duration: 200, useNativeDriver: true }),
      Animated.timing(pulseAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();
  };

  useEffect(() => {
    let minute = 0;
    let eventIndex = 0;

    // Tick every 0.6s — clock goes up 1 minute each tick (90 ticks = ~54 seconds total)
    const interval = setInterval(() => {
      if (minute > 90) {
        clearInterval(interval);
        setIsComplete(true);
        onComplete?.();
        return;
      }

      setCurrentMinute(minute);

      // Show all events that happen at this minute
      while (
        eventIndex < result.events.length &&
        result.events[eventIndex].minute <= minute
      ) {
        const event = result.events[eventIndex];
        setVisibleEvents((prev) => [...prev, event]);

        if (event.type === 'goal') {
          if (event.team === 'home') setHomeScore((s) => s + 1);
          else setAwayScore((s) => s + 1);
          pulseScore();
        }

        eventIndex++;

        // Auto scroll to bottom
        setTimeout(() => {
          scrollRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }

      minute++;
    }, 350);

    return () => clearInterval(interval);
  }, [result]);

  const getEventIcon = (type: MatchSimEvent['type']) => {
    switch (type) {
      case 'goal': return '⚽';
      case 'save': return '🧤';
      case 'chance': return '💨';
      case 'foul': return '⚠️';
      case 'card': return '🟨';
      case 'injury': return '🤕';
      case 'kickoff': return '🏟️';
      case 'halftime': return '⏸️';
      case 'fulltime': return '🏁';
      default: return '📋';
    }
  };

  return (
    <View style={styles.container}>
      {/* Scoreboard */}
      <View style={styles.scoreboard}>
        <View style={styles.teamCol}>
          <Text style={styles.teamName} numberOfLines={1}>
            {result.homeSquad.name}
          </Text>
          <Text style={styles.teamRating}>
            ⭐ {result.homeSquad.averageRating}
          </Text>
        </View>

        <Animated.View style={[styles.scoreCenter, { transform: [{ scale: pulseAnim }] }]}>
          <Text style={styles.scoreText}>
            {homeScore} - {awayScore}
          </Text>
        </Animated.View>

        <View style={[styles.teamCol, { alignItems: 'flex-end' }]}>
          <Text style={styles.teamName} numberOfLines={1}>
            {result.awaySquad.name}
          </Text>
          <Text style={styles.teamRating}>
            ⭐ {result.awaySquad.averageRating}
          </Text>
        </View>
      </View>

      {/* Minute display */}
      <View style={styles.minuteBar}>
        <View style={[styles.minuteFill, { width: `${(currentMinute / 90) * 100}%` }]} />
        <Text style={styles.minuteText}>{currentMinute}'</Text>
      </View>

      {/* Event feed */}
      <ScrollView ref={scrollRef} style={styles.eventFeed} showsVerticalScrollIndicator={false}>
        {visibleEvents.map((event, index) => (
          <View
            key={index}
            style={[
              styles.eventRow,
              event.type === 'goal' && styles.eventGoal,
              event.type === 'injury' && styles.eventInjury,
              event.type === 'halftime' && styles.eventBreak,
              event.type === 'fulltime' && styles.eventBreak,
            ]}
          >
            <Text style={styles.eventMinute}>{event.minute}'</Text>
            <Text style={styles.eventIcon}>{getEventIcon(event.type)}</Text>
            <Text style={styles.eventText}>{event.commentary}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Result banner */}
      {isComplete && (
        <View style={styles.resultBanner}>
          <Text style={styles.resultEmoji}>
            {result.winner === 'home' ? '🏆' : result.winner === 'away' ? '😔' : '🤝'}
          </Text>
          <Text style={styles.resultText}>
            {result.winner === 'home'
              ? 'You Win!'
              : result.winner === 'away'
              ? 'You Lost!'
              : "It's a Draw!"}
          </Text>
          <Text style={styles.finalScore}>
            {result.homeGoals} - {result.awayGoals}
          </Text>
        </View>
      )}

      {/* Man of the Match */}
      {isComplete && result.motm && (
        <View style={styles.motmBanner}>
          <Text style={styles.motmTitle}>🌟 Man of the Match</Text>
          <Text style={styles.motmName}>{result.motm.name}</Text>
          <View style={styles.motmRatingBox}>
            <Text style={styles.motmRating}>{result.motm.rating}</Text>
          </View>
          <View style={styles.motmStats}>
            {result.motm.goals > 0 && (
              <Text style={styles.motmStat}>⚽ {result.motm.goals} goal{result.motm.goals > 1 ? 's' : ''}</Text>
            )}
            {result.motm.saves > 0 && (
              <Text style={styles.motmStat}>🧤 {result.motm.saves} save{result.motm.saves > 1 ? 's' : ''}</Text>
            )}
            {result.motm.chances > 0 && (
              <Text style={styles.motmStat}>💨 {result.motm.chances} chance{result.motm.chances > 1 ? 's' : ''}</Text>
            )}
          </View>
          <Text style={styles.motmTeam}>
            {result.motm.team === 'home' ? result.homeSquad.name : result.awaySquad.name}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
  },
  scoreboard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.darkCard,
    borderRadius: 14,
    margin: 16,
    marginBottom: 8,
  },
  teamCol: {
    flex: 1,
  },
  teamName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  teamRating: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  scoreCenter: {
    backgroundColor: Colors.darkSurface,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 12,
  },
  scoreText: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.accent,
  },
  minuteBar: {
    height: 20,
    backgroundColor: Colors.darkSurface,
    borderRadius: 10,
    marginHorizontal: 16,
    marginBottom: 8,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  minuteFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: Colors.primary,
    borderRadius: 10,
  },
  minuteText: {
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  eventFeed: {
    flex: 1,
    paddingHorizontal: 16,
  },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 4,
    gap: 8,
  },
  eventGoal: {
    backgroundColor: 'rgba(76, 175, 80, 0.15)',
    borderLeftWidth: 3,
    borderLeftColor: Colors.primaryLight,
  },
  eventInjury: {
    backgroundColor: 'rgba(244, 67, 54, 0.15)',
    borderLeftWidth: 3,
    borderLeftColor: Colors.loss,
  },
  eventBreak: {
    backgroundColor: Colors.darkCard,
    justifyContent: 'center',
  },
  eventMinute: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
    width: 28,
  },
  eventIcon: {
    fontSize: 16,
  },
  eventText: {
    flex: 1,
    fontSize: 13,
    color: Colors.textPrimary,
    lineHeight: 18,
  },
  resultBanner: {
    alignItems: 'center',
    backgroundColor: Colors.darkCard,
    borderRadius: 14,
    margin: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: Colors.accent,
  },
  resultEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  resultText: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.accent,
  },
  finalScore: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textSecondary,
    marginTop: 4,
  },
  motmBanner: {
    alignItems: 'center',
    backgroundColor: Colors.darkCard,
    borderRadius: 14,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 18,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  motmTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFD700',
    marginBottom: 6,
  },
  motmName: {
    fontSize: 22,
    fontWeight: '900',
    color: Colors.textPrimary,
  },
  motmRatingBox: {
    backgroundColor: '#FFD700',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginTop: 8,
  },
  motmRating: {
    fontSize: 20,
    fontWeight: '900',
    color: Colors.dark,
  },
  motmStats: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 10,
  },
  motmStat: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  motmTeam: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 6,
  },
});
