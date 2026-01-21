import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { usePlayerStore } from "../store/playerStore";

export default function MiniPlayer() {
  const currentSong = usePlayerStore((state) => state.currentSong);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const togglePlayPause = usePlayerStore((state) => state.togglePlayPause);

  if (!currentSong) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text} numberOfLines={1}>
        {currentSong.name}
      </Text>

      <TouchableOpacity onPress={togglePlayPause}>
        <Text style={styles.play}>
          {isPlaying ? "⏸" : "▶"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 65,
    backgroundColor: "#111",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderTopWidth: 0.5,
    borderTopColor: "#333",
  },
  text: {
    color: "#fff",
    flex: 1,
    marginRight: 10,
    fontSize: 14,
  },
  play: {
    fontSize: 20,
    color: "#1DB954",
    fontWeight: "bold",
  },
});

