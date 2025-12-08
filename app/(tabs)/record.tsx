// freshshrimp/mt_final_project/freshshrimp-MT_final_project-5eff470c8680ed3556848388863c998f54801d6c/app/(tabs)/record.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
//自訂的component
import AudioRecorder from '@/components/AudioRecorder';
import ResultDisplay from '@/components/ResultDisplay';

export default function RecordScreen() {
  const [analysisText, setAnalysisText] = useState("");
  const [loading, setLoading] = useState(false);

  // 上傳錄音檔給 LLM API
  const uploadAudioToServer = async (uri: string) => {
    setLoading(true);

    // --- 測試階段：模擬 LLM API 呼叫，並顯示 URI ---
    // 模擬網路延遲
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 檢查 URI 是否存在，並將其顯示出來
    if (uri && uri.startsWith('file:///')) {
      setAnalysisText(`✅ 錄音檔案 URI 成功輸出給 LLM 函式！

檔案路徑: ${uri}

---
備註：這是一個模擬結果，用於驗證您的錄音功能。在實際部署時，請移除此模擬代碼，並解除註解下方的真實 API 呼叫邏輯。
`);
    } else {
      setAnalysisText("❌ 錄音檔案 URI 輸出失敗或格式不正確。");
    }
    // --- 結束模擬邏輯 ---
    
    /*
    // 實際連接 LLM API 的邏輯 (註解中，暫不執行)
    const formData = new FormData();
    formData.append("audio", {
      uri,
      name: "recording.m4a",
      type: "audio/m4a",
    } as any);

    try {
      const response = await fetch("https://你的API.com/analyze", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const result = await response.json();

      setAnalysisText(result.summary ?? "LLM 沒有回傳分析結果");
    } catch (err) {
      console.error("上傳錄音失敗:", err);
      setAnalysisText("分析失敗，請稍後再試");
    }
    */

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎤 錄音分析</Text>

      {/* 錄音元件 */}
      <AudioRecorder onRecordingFinished={uploadAudioToServer} />

      {/* 載入狀態 */}
      {loading && <Text style={styles.loading}>分析中，請稍候...</Text>}

      {/* 結果顯示 */}
      {analysisText !== "" && <ResultDisplay text={analysisText} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 70,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  loading: {
    marginTop: 10,
    fontStyle: "italic",
  },
});