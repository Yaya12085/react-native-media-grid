import { StyleSheet, Text, View } from 'react-native';
import { MediaGrid, type MediaItemType } from 'react-native-media-grid';

export default function App() {
  const generateMediaItems = () => {
    const mediaItems: MediaItemType[] = [];
    for (let i = 0; i < 5; i++) {
      mediaItems.push({
        url: `https://picsum.photos/800/800?random=${i}`,
        type: 'image',
      });
    }
    return mediaItems;
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>React Native Media Grid</Text>
        <MediaGrid
          items={generateMediaItems()}
          spacing={2}
          maxDisplayItems={4}
          onMediaPress={(index) => console.log('Media pressed:', index)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
