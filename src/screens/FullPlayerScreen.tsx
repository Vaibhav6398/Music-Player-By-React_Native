import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";
import { usePlayerStore } from "../store/playerStore";

export default function FullPlayerScreen() {
  const {
    currentSong,
    isPlaying,
    togglePlayPause,
    position,
    duration,
    seekTo,
  } = usePlayerStore();

  if (!currentSong) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{currentSong.name}</Text>

      <Slider
        style={{ width: "100%", height: 40 }}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        onSlidingComplete={seekTo}
      />

      <View style={styles.timeRow}>
        <Text style={styles.timeText}>{formatTime(position)}</Text>
        <Text style={styles.timeText}>{formatTime(duration)}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={togglePlayPause}>
        <Text style={styles.buttonText}>
          {isPlaying ? "⏸ Pause" : "▶ Play "}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const formatTime = (ms: number) => {
  const min = Math.floor(ms / 60000);
  const sec = Math.floor((ms % 60000) / 1000);
  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d9f574ff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#000000",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  timeRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  timeText: {
    color:"#000",
    fontSize:12,
  },
  controls: {
    marginTop: 40,
  },
  playBtn: {
    backgroundColor: "#1DB954",
    paddingHorizontal: 50,
    paddingVertical: 14,
    borderRadius: 30,
  },
  playText: {
    color: "#a37d7dff",
    fontSize: 18,
    fontWeight: "bold",
  },
   button: {
    marginTop: 40,
    alignSelf: "center",
    backgroundColor: "#1DB954",
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
