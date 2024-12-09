// MediaItem.tsx
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { MediaItemProps } from './types';

/**
 * MediaItem component renders an individual media item (image).
 *
 * @param {MediaItemProps} props - The properties for the MediaItem component.
 * @returns {JSX.Element} The rendered MediaItem component.
 */
export const MediaItem: React.FC<MediaItemProps> = ({
  media,
  style,
  isLast,
  remainingCount,
  onPress,
}: MediaItemProps): JSX.Element => {
  /**
   * Renders an overlay with the remaining count if this is the last media item.
   *
   * @returns {JSX.Element | null} The overlay component or null.
   */
  const renderOverlay = (): JSX.Element | null => {
    if (!isLast || !remainingCount) return null;

    return (
      <View style={styles.overlay}>
        <Text style={styles.overlayText}>+{remainingCount}</Text>
      </View>
    );
  };

  /**
   * Renders the media component based on its type (image).
   *
   * @returns {JSX.Element} The media component.
   */
  const renderMedia = (): JSX.Element => {
    return (
      <Image
        source={{ uri: media.url }}
        style={[styles.media]}
        resizeMode="cover"
      />
    );
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[styles.container, style]}
    >
      {renderMedia()}
      {renderOverlay()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 8,
  },
  media: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
