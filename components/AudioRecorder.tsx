//錄音元件
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

const AudioRecorder: React.FC<{ onRecordingFinished: (uri: string) => void }> = ({ onRecordingFinished }) => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (!permission.granted) {
        alert("需要錄音權限");
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const rec = new Audio.Recording();
      await rec.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      await rec.startAsync();

      setRecording(rec);
      setIsRecording(true);
    } catch (err) {
      console.error("錄音失敗", err);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setIsRecording(false);
      setRecording(null);

      if (uri) {
        onRecordingFinished(uri); // 回傳錄音檔路徑給父元件
      }
    } catch (err) {
      console.error("停止錄音失敗", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text>{isRecording ? "錄音中..." : "準備錄音"}</Text>
      <Button
        title={isRecording ? "停止錄音" : "開始錄音"}
        onPress={isRecording ? stopRecording : startRecording}
      />
    </View>
  );
};

export default AudioRecorder;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: 'center',
  },
});