import { Stack, useFocusEffect, useRouter } from 'expo-router';
import React, { useState, useCallback } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';

import { getRecords, HealthRecord } from '@/services/historyService';

// 定義列表顯示需要的類型
type HistoryListItem = Pick<HealthRecord, 'id' | 'date' | 'transcription'>;

export default function HistoryScreen() {
  const [records, setRecords] = useState<HistoryListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const loadRecords = async () => {
    setLoading(true);
    const storedRecords = await getRecords();
    // 映射為列表顯示需要的簡化資料
    const listItems = storedRecords.map(r => ({
        id: r.id,
        date: r.date,
        transcription: r.transcription,
    }));
    setRecords(listItems);
    setLoading(false);
  };

  // 當頁面被選中或再次獲得焦點時，重新載入紀錄
  useFocusEffect(
    useCallback(() => {
      loadRecords();
    }, [])
  );

  const handlePressRecord = (record: HistoryListItem) => {
    // 導航到 analysis 頁面，並傳遞 recordId
    router.push({
      pathname: '/(tabs)/analysis',
      params: {
        recordId: record.id,
      },
    });
  };

  const renderItem = ({ item }: { item: HistoryListItem }) => (
    <TouchableOpacity style={styles.recordItem} onPress={() => handlePressRecord(item)}>
      <Text style={styles.recordDate}>{item.date}</Text>
      {/* 顯示轉錄內容的第一行或前 50 字作為預覽 */}
      <Text style={styles.recordPreview} numberOfLines={1}>
        {item.transcription.split('\n')[0]?.substring(0, 50).trim() || '無轉錄內容'}...
      </Text>
      <Text style={styles.recordArrow}>&gt;</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <Stack.Screen options={{ title: '看診紀錄' }} />
      <View style={styles.container}>
        <Text style={styles.title}>歷史看診紀錄</Text>
        
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#3b82f6" />
            <Text style={styles.message}>載入中...</Text>
          </View>
        ) : records.length === 0 ? (
          <Text style={styles.message}>目前沒有任何看診紀錄。開始錄音以創建您的第一筆紀錄。</Text>
        ) : (
          <FlatList
            data={records}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  listContent: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1f2937',
  },
  recordItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#3b82f6',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  recordDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    width: 120, 
    marginRight: 10,
  },
  recordPreview: {
    flex: 1,
    fontSize: 14,
    color: '#6b7280',
    overflow: 'hidden',
  },
  recordArrow: {
    marginLeft: 10,
    fontSize: 18,
    color: '#9ca3af',
  },
  message: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#6b7280',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    gap: 10,
  },
});