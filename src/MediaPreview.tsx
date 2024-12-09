// MediaPreview.tsx
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  Modal,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import type { MediaItemType, MediaPreviewProps } from './types';

const STATUS_BAR_HEIGHT = Platform.select({
  ios: 44,
  android: StatusBar.currentHeight,
  default: 0,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    position: 'absolute',
    top: STATUS_BAR_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  counter: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
  },
  mediaContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  media: {
    width: '100%',
    height: '100%',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
  },
});

export const MediaPreview: React.FC<MediaPreviewProps> = ({
  visible,
  items,
  initialIndex,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [hasError, setHasError] = useState<Record<string, boolean>>({});
  const flatListRef = useRef<FlatList>(null);
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  useEffect(() => {
    if (visible && flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: initialIndex,
        animated: false,
      });
    }
  }, [visible, initialIndex]);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const handleError = useCallback((url: string) => {
    setHasError((prev) => ({ ...prev, [url]: true }));
  }, []);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetX = event.nativeEvent.contentOffset.x;
      const index = Math.round(offsetX / SCREEN_WIDTH);
      setCurrentIndex(index);
    },
    [SCREEN_WIDTH]
  );

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: SCREEN_WIDTH,
      offset: SCREEN_WIDTH * index,
      index,
    }),
    [SCREEN_WIDTH]
  );

  const handleScrollToIndexFailed = useCallback(
    (info: { index: number; averageItemLength: number }) => {
      const wait = new Promise((resolve) => setTimeout(resolve, 100));
      wait.then(() => {
        if (flatListRef.current) {
          flatListRef.current.scrollToIndex({
            index: info.index,
            animated: false,
          });
        }
      });
    },
    []
  );

  const renderMedia = (media: MediaItemType): JSX.Element => {
    if (hasError[media.url]) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Failed to load media</Text>
        </View>
      );
    }

    return (
      <Image
        source={{ uri: media.url }}
        style={styles.media}
        resizeMode="contain"
        onError={() => handleError(media.url)}
      />
    );
  };

  const renderItem = ({
    item: media,
  }: {
    item: MediaItemType;
  }): JSX.Element => (
    <View style={[styles.mediaContainer, { width: SCREEN_WIDTH }]}>
      {renderMedia(media)}
    </View>
  );

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      statusBarTranslucent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <Text style={styles.counter}>
              {currentIndex + 1}/{items.length}
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            ref={flatListRef}
            data={items}
            renderItem={renderItem}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            bounces={false}
            onScroll={handleScroll}
            keyExtractor={(item, index) => item.url + index}
            getItemLayout={getItemLayout}
            onScrollToIndexFailed={handleScrollToIndexFailed}
            initialScrollIndex={initialIndex}
          />
        </SafeAreaView>
      </View>
    </Modal>
  );
};
