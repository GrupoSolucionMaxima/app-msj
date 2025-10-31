// HorizontalOverlayCarousel.tsx
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
  useWindowDimensions,
} from 'react-native';

type Item = {
  id: string;
  // Puedes recibir cualquiera de los dos:
  source?: ImageSourcePropType;
  image?: ImageSourcePropType;

  title: string;
  subtitle?: string;

  // Campos extra para la pantalla de detalle:
  dateText?: string;
  venueName?: string;
  coords?: { lat?: number; lng?: number };
  ctaUrl?: string;
  bannerKey?: string;
  description?: string;
};

export default function HorizontalOverlayCarousel({
  data,
  cardWidth,
  cardHeight = 220,
  gap = 12,
  horizontalPadding = 20,
  overlayOpacity = 0.45,
  onPressItem, // opcional: si se pasa, tiene prioridad
}: {
  data: Item[];
  cardWidth?: number;
  cardHeight?: number;
  gap?: number;
  horizontalPadding?: number;
  overlayOpacity?: number;
  onPressItem?: (item: Item) => void;
}) {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const ITEM_WIDTH = cardWidth ?? width;
  const RADIUS = 16;

  const handlePress = (item: Item) => {
    if (onPressItem) {
      onPressItem(item);
      return;
    }

    // ✅ Navegación por defecto: /events/[id] con TODOS los params como strings
    router.push({
      pathname: '/events/[id]',
      params: {
        id: String(item.id),
        title: item.title ?? '',
        dateText: item.dateText ?? '',
        venueName: item.venueName ?? '',
        lat: item.coords?.lat != null ? String(item.coords.lat) : '',
        lng: item.coords?.lng != null ? String(item.coords.lng) : '',
        ctaUrl: item.ctaUrl ?? '',
        description: item.description ?? '',
        imgMain: item.bannerKey ?? 'banner-default',
      },
    });
  };

  return (
    <FlatList
      horizontal
      data={data}
      keyExtractor={(i) => i.id}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: horizontalPadding }}
      ItemSeparatorComponent={() => <View style={{ width: gap }} />}
      renderItem={({ item }) => {
        const imgSource = item.source ?? item.image;
        return (
          <Pressable
            onPress={() => handlePress(item)}
            accessibilityRole="button"
            android_ripple={{ color: 'rgba(255,255,255,0.1)' }}
            style={[
              styles.card,
              { width: ITEM_WIDTH, height: cardHeight, borderRadius: RADIUS },
            ]}
          >
            {imgSource ? (
              <Image source={imgSource} style={StyleSheet.absoluteFill} resizeMode="cover" />
            ) : null}

            {/* Overlay */}
            <View
              pointerEvents="none"
              style={[
                StyleSheet.absoluteFill,
                { backgroundColor: `rgba(0,0,0,${overlayOpacity})` },
              ]}
            />

            {/* Texto */}
            <View style={styles.textWrap}>
              <Text style={styles.title} numberOfLines={2}>
                {item.title}
              </Text>
              {item.subtitle ? (
                <Text style={styles.subtitle} numberOfLines={1}>
                  {item.subtitle}
                </Text>
              ) : null}
            </View>
          </Pressable>
        );
      }}
      snapToAlignment="start"
      decelerationRate="fast"
      snapToInterval={ITEM_WIDTH + gap}
      getItemLayout={(_, index) => ({
        length: ITEM_WIDTH + gap,
        offset: (ITEM_WIDTH + gap) * index,
        index,
      })}
      initialNumToRender={3}
      maxToRenderPerBatch={5}
      windowSize={5}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  textWrap: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 10,
  },
  title: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 20,
    marginBottom: 2,
  },
  subtitle: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.95,
  },
});
