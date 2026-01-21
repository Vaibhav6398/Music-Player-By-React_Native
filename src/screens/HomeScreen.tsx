import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { usePlayerStore } from "../store/playerStore";

type Song = {
  id: string;
  name: string;
  downloadUrl: { url: string }[];
  artists: { primary: { id: string; name: string }[] };
  album: { id: string; name: string };
  image: { url: string }[];
};

export default function HomeScreen() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [query, setQuery] = useState("arijit");
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const limit = 10;

  const playSong = usePlayerStore((state) => state.playSong);

  const fetchSongs = async (newQuery?: string, newOffset?: number) => {
    try {
      setLoading(true);
      const searchQuery = newQuery ?? query;
      const currentOffset = newOffset ?? offset;

      const res = await fetch(
        `https://saavn.sumit.co/api/search/songs?query=${encodeURIComponent(
          searchQuery
        )}&limit=${limit}&offset=${currentOffset}`
      );
      const data = await res.json();
      const results: Song[] = data.data.results;

      if (currentOffset === 0) {
        setSongs(results);
      } else {
        setSongs((prev) => [...prev, ...results]);
      }

      setOffset(currentOffset + limit);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  const onSubmitSearch = () => {
    setOffset(0);
    fetchSongs(query, 0);
  };

  const loadMore = () => {
    if (!loading) fetchSongs(query, offset);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search songs..."
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={onSubmitSearch}
      />

      <FlatList
        data={songs}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.songItem}
            onPress={() => playSong(item)}
          >
            <Image
              source={{ uri: item.image[1]?.url || item.image[0]?.url }}
              style={styles.image}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.songName}>{decodeText(item.name)}</Text>
              <Text style={styles.artistName}>
                {item.artists.primary.map((a) => a.name).join(", ")}
              </Text>
              <Text style={styles.albumName}>{item.album.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const decodeText = (text: string) =>
  text.replace(/&quot;/g, '"').replace(/&amp;/g, "&");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  searchInput: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  songItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 6,
  },
  songName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  artistName: {
    fontSize: 14,
    color: "#555",
  },
  albumName: {
    fontSize: 12,
    color: "#888",
  },
});
