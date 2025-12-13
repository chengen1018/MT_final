import { useLocalSearchParams, Stack } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import ElderSummaryDisplay, { type ElderSummary } from "@/components/ElderSummaryDisplay";
import ResultDisplay from '@/components/ResultDisplay';

/**
 * 分析結果顯示頁面
 * 透過路由參數接收 transcription (轉錄文字) 和 summaryJson (結構化摘要 JSON 字串)
 */
export default function AnalysisScreen() {
  const { transcription, summaryJson } = useLocalSearchParams<{ transcription?: string, summaryJson?: string }>();

  let summary: ElderSummary | null = null;
  let analysisText = transcription || "無法取得轉錄文字。";

  if (summaryJson) {
    try {
      // 將傳入的 JSON 字串解析回 ElderSummary 物件
      const parsedSummary = JSON.parse(summaryJson);
      // 確保解析結果符合 ElderSummary 結構
      if (parsedSummary && typeof parsedSummary === 'object') {
        summary = parsedSummary as ElderSummary;
      }
    } catch (e) {
      console.error("解析 ElderSummary JSON 失敗:", e);
      analysisText = analysisText + "\n\n❌ 錯誤：無法載入結構化摘要資料。";
    }
  }

  return (
    <>
      <Stack.Screen options={{ title: '分析結果' }} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.title}>🎙️ 語音分析報告</Text>
        
        {/* 轉錄文字顯示 (保留) */}
        <ResultDisplay text={analysisText} />

        {/* LLM 結構化摘要顯示 (分段/朗讀功能已包含) */}
        {summary ? (
          <ElderSummaryDisplay summary={summary} />
        ) : (
          // 當 summary 無法載入或為 null 時的錯誤提示
          <View style={styles.errorContainer}>
              <Text style={styles.errorText}>無法顯示結構化摘要。資料載入失敗或格式錯誤。</Text>
          </View>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8', 
  },
  scrollContent: {
    padding: 20,
    paddingTop: 50,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: '#1f2937',
  },
  errorContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fee2e2',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#f87171',
  },
  errorText: {
    color: '#b91c1c',
    fontSize: 16,
  }
});