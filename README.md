# React Native Media Grid

A highly customizable, performant, and accessible media grid component for React Native applications. Display images in an elegant grid layout with support for various configurations and full-screen preview.

![License](https://img.shields.io/npm/l/react-native-media-grid)

![npm](https://img.shields.io/npm/v/react-native-media-grid)

## Features

- 🎯 Responsive grid layouts (1-4+ images)
- 🖼️ Full-screen image preview with swipe gestures
- ♿️ Fully accessible with VoiceOver/TalkBack support
- 🎨 Customizable styles and spacing
- 📱 Native performance optimizations
- 💪 TypeScript support
- 📦 Zero dependencies

## Installation

```bash
npm install react-native-media-grid
# or
yarn add react-native-media-grid
```

## Demo

[![Demo](https://github.com/Yaya12085/react-native-media-grid/blob/main/example/assets/demo.png?raw=true)](https://raw.githubusercontent.com/Yaya12085/react-native-media-grid/main/example/assets/demo.mp4)

## Usage

```jsx
import { MediaGrid, type MediaItemType } from 'react-native-media-grid';

const App = () => {
  const mediaItems: MediaItemType[] = [
    {
      url: 'https://example.com/image1.jpg',
      type: 'image',
    },
    {
      url: 'https://example.com/image2.jpg',
      type: 'image',
    },
    // ... more items
  ];

  return (
    <MediaGrid
      items={mediaItems}
      spacing={2}
      maxDisplayItems={4}
      onMediaPress={(index) => console.log('Media pressed:', index)}
    />
  );
};
```

## Props

### MediaGrid Props

| Prop              | Type                      | Default  | Description                                                       |
| ----------------- | ------------------------- | -------- | ----------------------------------------------------------------- |
| `items`           | `MediaItemType[]`         | Required | Array of media items to display                                   |
| `spacing`         | `number`                  | `2`      | Gap between grid items in pixels                                  |
| `maxDisplayItems` | `number`                  | `4`      | Maximum number of items to display before showing a count overlay |
| `containerStyle`  | `ViewStyle`               | \-       | Style for the grid container                                      |
| `itemStyle`       | `ViewStyle`               | \-       | Style for individual media items                                  |
| `onMediaPress`    | `(index: number) => void` | \-       | Callback when a media item is pressed                             |

### MediaItemType

```typescript
interface MediaItemType {
  url: string;
  type: 'image';
}
```

## Grid Layouts

The component automatically adjusts its layout based on the number of items:

- 1 item: Full-width single image
- 2 items: Two equal-width images side by side
- 3 items: Large image on the left, two smaller images stacked on the right
- 4+ items: Large image on the left, three smaller images stacked on the right with a count overlay

## Customization

### Custom Styling

```jsx
<MediaGrid
  items={mediaItems}
  containerStyle={{
    borderRadius: 12,
    overflow: 'hidden',
  }}
  itemStyle={{
    borderRadius: 8,
  }}
  spacing={4}
/>
```

## Accessibility

The component includes built-in accessibility features:

- VoiceOver/TalkBack support with descriptive labels
- Proper focus management
- Accessible navigation in preview mode
- Screen reader announcements for image transitions

## Roadmap 🚀

We're actively working on adding these exciting features:

- 📹 Video support
- 🔍 Pinch-to-zoom in preview mode
- 🖼️ Custom image component support
- 📱 More grid layout variants
- 🎨 Advanced styling options
- 🔄 Custom loading states

Want to contribute to any of these features? Check out our contributing guidelines!

## Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) first.

## License

MIT

## Support

If you like this project, please consider giving it a ⭐️ on GitHub!
