import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
// SafeAreaView handled by parent
import { Colors } from '../constants/colors';
import { useTransfers } from '../hooks/useTransfers';
import TransferCard from '../components/transfers/TransferCard';
import TransferFilter from '../components/transfers/TransferFilter';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

export default function TransfersScreen() {
  const { transfers, loading, error, filterType, setFilterType, refetch } = useTransfers();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔄 Live Transfers</Text>

      <TransferFilter activeFilter={filterType} onFilterChange={setFilterType} />

      {loading ? (
        <LoadingSpinner message="Loading transfers..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={refetch} />
      ) : (
        <FlatList
          data={transfers}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <TransferCard transfer={item} />}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyEmoji}>📋</Text>
              <Text style={styles.emptyText}>No transfers found</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.textPrimary,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 4,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyEmoji: { fontSize: 40, marginBottom: 12 },
  emptyText: {
    fontSize: 15,
    color: Colors.textSecondary,
  },
});
