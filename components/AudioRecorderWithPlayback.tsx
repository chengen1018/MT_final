//試錄音後並撥放

import { Audio } from 'expo-av';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const AudioRecorderWithPlayback: React.FC = () => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [uri, setUri] = useState<string | null>(null);

  // 開始錄音
  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (!permission.granted) {
        alert("Recording permission required");
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

  // 停止錄音
  const stopRecording = async () => {
    if (!recording) return;

    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setUri(uri || null);

      setRecording(null);
      setIsRecording(false);
    } catch (err) {
      console.error("停止錄音失敗", err);
    }
  };

  // 播放錄音
  const playRecording = async () => {
    if (!uri) return;
    try {
      const { sound } = await Audio.Sound.createAsync({ uri });
      setSound(sound);
      await sound.playAsync();
    } catch (err) {
      console.error("播放失敗", err);
    }
  };

  // 停止播放
  const stopPlayback = async () => {
    if (!sound) return;
    await sound.stopAsync();
  };

  return (
    <View style={styles.container}>
      <Text>{isRecording ? "Recording..." : "Ready to Record"}</Text>
      <Button
        title={isRecording ? "Stop Recording" : "Start Recording"}
        onPress={isRecording ? stopRecording : startRecording}
      />

      {uri && (
        <View style={{ marginTop: 10 }}>
          <Button title="Play Recording" onPress={playRecording} />
          <Button title="Stop Playback" onPress={stopPlayback} />
          <Text style={{ marginTop: 5 }}>Recording file path: {uri}</Text>
        </View>
      )}
    </View>
  );
};

export default AudioRecorderWithPlayback;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: 'center',
  },
});