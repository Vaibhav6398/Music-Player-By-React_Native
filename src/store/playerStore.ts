import { create } from "zustand";
import { Audio } from "expo-av";

export type Song = {
  id: string;
  name: string;
  downloadUrl: { url: string }[];
};

type PlayerState = {
  currentSong: Song | null;
  sound: Audio.Sound | null;
  isPlaying: boolean;
  position: number;
  duration: number;

  playSong: (song: Song) => Promise<void>;
  togglePlayPause: () => Promise<void>;
  seekTo: (value: number) => Promise<void>;
};

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentSong: null,
  sound: null,
  isPlaying: false,
  position: 0,
  duration: 1,

  playSong: async (song) => {
    try {
      const { sound } = get();

      if (sound) {
        await sound.unloadAsync();
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        // interruptionModeIOS:  Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        shouldDuckAndroid: true,
        // interruptionModeAndroid:  Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playThroughEarpieceAndroid: false,
      });

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: song.downloadUrl[0].url },
        { shouldPlay: true }
      );

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (!status.isLoaded) return;

        set({
          position: status.positionMillis,
          duration: status.durationMillis || 1,
          isPlaying: status.isPlaying,
        });
      });

      set({
        currentSong: song,
        sound: newSound,
        isPlaying: true,
      });
    } catch (e) {
      console.log("Play song error:", e);
    }
  },

  togglePlayPause: async () => {
    const { sound, isPlaying } = get();
    if (!sound) return;

    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
  },

  seekTo: async (value) => {
    const { sound } = get();
    if (!sound) return;
    await sound.setPositionAsync(value);
  },
}));
