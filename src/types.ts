// types.ts
import { type StyleProp, type ViewStyle } from 'react-native';

export interface MediaItemType {
  url: string;
  type: 'image';
}

export interface MediaGridProps {
  items: MediaItemType[];
  containerStyle?: StyleProp<ViewStyle>;
  itemStyle?: StyleProp<ViewStyle>;
  spacing?: number;
  maxDisplayItems?: number;
  variant?: 'dynamic' | 'square';
  onMediaPress?: (index: number) => void;
}

export interface MediaItemProps {
  media: MediaItemType;
  style?: StyleProp<ViewStyle>;
  isLast?: boolean;
  remainingCount?: number;
  onPress?: () => void;
}

export interface MediaPreviewProps {
  visible: boolean;
  items: MediaItemType[];
  initialIndex: number;
  onClose: () => void;
}
