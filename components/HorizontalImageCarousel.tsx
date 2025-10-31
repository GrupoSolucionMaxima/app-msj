import { useRouter } from 'expo-router';
import React from 'react';
import {
  FlatList,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type ItemLink =
  | string
  | {
      pathname: string;
      params?: Record<string, string>;
    };

export type Item = {
  id: string;
  source: ImageSourcePropType;
  title?: string;
  link?: ItemLink; // 👈 soporte de link por item
};

export default function HorizontalImageCarousel({
  data,
  gap = 12,
  itemWidth = 350,
  itemHeight = 350,
  horizontalPadding = 20,
  borderRadius = 0,
  onPressItem, // 👈 override opcional
}: {
  data: Item[];
  gap?: number;
  itemWidth?: number;
  itemHeight?: number;
  horizontalPadding?: number;
  borderRadius?: number;
  onPressItem?: (item: Item, index: number) => void;
}) {
  const router = useRouter();

  const handlePress = (item: Item, index: number) => {
    if (onPressItem) return onPressItem(item, index);
    if (!item.link) return;

    if (typeof item.link === 'string') {
      router.push(item.link as any);
    } else {
      router.push({ pathname: item.link.pathname, params: item.link.params as any });
    }
  };

  return (
    <View style={styles.wrapper}>
      <FlatList
        horizontal
        data={data}
        keyExtractor={(i) => i.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: horizontalPadding }}
        ItemSeparatorComponent={() => <View style={{ width: gap }} />}
        renderItem={({ item, index }) => {
          const Card = (
            <View style={[styles.card, { width: itemWidth, height: itemHeight, borderRadius }]}>
              <Image source={item.source} style={StyleSheet.absoluteFill} resizeMode="cover" />
              {item.title ? (
                <View style={styles.textWrap}>
                  <Text style={styles.title} numberOfLines={2}>
                    {item.title}
                  </Text>
                </View>
              ) : null}
            </View>
          );

          // Si trae link → lo envolvemos en Pressable; si no, render directo
          return item.link ? (
            <Pressable
              onPress={() => handlePress(item, index)}
              android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
              style={{ borderRadius }}
              accessibilityRole="button"
              accessibilityLabel={item.title ?? 'Abrir'}
            >
              {Card}
            </Pressable>
          ) : (
            Card
          );
        }}
        snapToAlignment="start"
        decelerationRate="fast"
        snapToInterval={itemWidth + gap}
        getItemLayout={(_, index) => ({
          length: itemWidth + gap,
          offset: (itemWidth + gap) * index,
          index,
        })}
        initialNumToRender={3}
        maxToRenderPerBatch={5}
        windowSize={5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { paddingVertical: 8 },
  card: {
    overflow: 'hidden',
    position: 'relative',
  },
  textWrap: {
    position: 'absolute',
    left: 20,
    bottom: 24,
    right: 20,
  },
  title: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 24,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
