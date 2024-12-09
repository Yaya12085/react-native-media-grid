// MediaGrid.tsx
import React, { useMemo, useState } from 'react';
import { AccessibilityInfo, StyleSheet, View } from 'react-native';
import { MediaItem } from './MediaItem';
import { MediaPreview } from './MediaPreview';
import { type MediaGridProps, type MediaItemType } from './types';

/**
 * MediaGrid component displays a grid of media items (images and videos).
 *
 * @param {MediaGridProps} props - The properties for the MediaGrid component.
 * @returns {JSX.Element} The rendered MediaGrid component.
 */
export const MediaGrid: React.FC<MediaGridProps> = ({
  items,
  containerStyle,
  itemStyle,
  spacing = 2,
  maxDisplayItems = 4,
  onMediaPress,
}: MediaGridProps): JSX.Element | null => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Memoize the remaining count calculation
  const remainingCount = useMemo(() => {
    if (items.length <= maxDisplayItems) return undefined;
    return items.length - maxDisplayItems;
  }, [items.length, maxDisplayItems]);

  // Validate items prop
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  /**
   * Handles the press event on a media item.
   */
  const handleMediaPress = (index: number) => {
    setSelectedIndex(index);
    // Announce to screen readers
    AccessibilityInfo.announceForAccessibility(
      `Viewing image ${index + 1} of ${items.length}`
    );
    onMediaPress?.(index);
  };

  /**
   * Closes the media preview.
   */
  const handleClosePreview = () => {
    setSelectedIndex(null);
  };

  /**
   * Renders a single media item.
   */
  const renderSingleMedia = (): JSX.Element => (
    <View
      style={styles.singleContainer}
      accessible={true}
      accessibilityRole="image"
      accessibilityLabel={`Single media item. Tap to view full screen.`}
    >
      <MediaItem
        media={items[0] as MediaItemType}
        style={[styles.singleMedia, itemStyle]}
        onPress={() => handleMediaPress(0)}
      />
    </View>
  );

  /**
   * Renders two media items side by side.
   */
  const renderTwoMedia = (): JSX.Element => (
    <View
      style={[styles.rowContainer, { gap: spacing }]}
      accessible={true}
      accessibilityLabel={`Grid of 2 media items`}
    >
      {items.map((media, index) => (
        <View
          key={media.url || index}
          style={styles.halfContainer}
          accessible={true}
          accessibilityRole="image"
          accessibilityLabel={`Media item ${index + 1} of 2. Tap to view full screen.`}
        >
          <MediaItem
            media={media}
            style={[styles.halfMedia, itemStyle]}
            onPress={() => handleMediaPress(index)}
          />
        </View>
      ))}
    </View>
  );

  /**
   * Renders three media items in a grid layout.
   */
  const renderThreeMedia = (): JSX.Element => (
    <View
      style={[styles.container, { gap: spacing }]}
      accessible={true}
      accessibilityLabel={`Grid of 3 media items`}
    >
      <View style={styles.leftContainer}>
        <MediaItem
          media={items[0] as MediaItemType}
          style={[styles.leftMedia, itemStyle]}
          onPress={() => handleMediaPress(0)}
        />
      </View>
      <View style={styles.rightContainer}>
        {items.slice(1, 3).map((media, index) => (
          <MediaItem
            key={media.url || index}
            media={media}
            style={[styles.rightMedia, itemStyle]}
            onPress={() => handleMediaPress(index + 1)}
          />
        ))}
      </View>
    </View>
  );

  /**
   * Renders four or more media items in a grid layout.
   */
  const renderFourMedia = (): JSX.Element => (
    <View
      style={[styles.container, { gap: spacing }]}
      accessible={true}
      accessibilityLabel={`Grid of ${Math.min(maxDisplayItems, items.length)} media items${remainingCount ? `, plus ${remainingCount} more` : ''}`}
    >
      <View style={styles.leftContainer}>
        <MediaItem
          media={items[0] as MediaItemType}
          style={[styles.leftMedia, itemStyle]}
          onPress={() => handleMediaPress(0)}
        />
      </View>
      <View style={[styles.rightContainer, { gap: spacing }]}>
        {items.slice(1, maxDisplayItems).map((media, index) => (
          <View
            key={media.url || index}
            style={styles.rightItemContainer}
            accessible={true}
            accessibilityRole="image"
            accessibilityLabel={`Media item ${index + 2} of ${items.length}${index === maxDisplayItems - 2 && remainingCount ? `. Plus ${remainingCount} more items` : ''}`}
          >
            <MediaItem
              media={media}
              style={[styles.rightMedia, itemStyle]}
              onPress={() => handleMediaPress(index + 1)}
              isLast={index === maxDisplayItems - 2 && remainingCount! > 0}
              remainingCount={remainingCount}
            />
          </View>
        ))}
      </View>
    </View>
  );

  /**
   * Renders the media grid based on the number of media items.
   */
  const renderGrid = (): JSX.Element => {
    switch (items.length) {
      case 1:
        return renderSingleMedia();
      case 2:
        return renderTwoMedia();
      case 3:
        return renderThreeMedia();
      default:
        return renderFourMedia();
    }
  };

  return (
    <>
      <View style={[styles.mainContainer, containerStyle]}>{renderGrid()}</View>
      <MediaPreview
        visible={selectedIndex !== null}
        items={items}
        initialIndex={selectedIndex || 0}
        onClose={handleClosePreview}
      />
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    aspectRatio: 4 / 3,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  singleContainer: {
    flex: 1,
  },
  singleMedia: {
    flex: 1,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  halfContainer: {
    flex: 1,
  },
  halfMedia: {
    flex: 1,
  },
  leftContainer: {
    flex: 2,
  },
  leftMedia: {
    flex: 1,
  },
  rightContainer: {
    flex: 1,
  },
  rightItemContainer: {
    flex: 1,
  },
  rightMedia: {
    flex: 1,
  },
});
