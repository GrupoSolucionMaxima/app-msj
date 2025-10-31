// components/carousels/CoverflowCarousel.tsx
import { useRouter } from 'expo-router';
import React, { useMemo, useRef } from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewToken,
  useWindowDimensions,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

/** Tipos */
export type CoverItem = {
  id: string;
  image: ImageSourcePropType;
  title?: string; // Título opcional
  link?: string | { pathname: string; params?: Record<string, string> };
};

type Props = {
  data: CoverItem[];
  cardWidth?: number;
  cardHeight?: number;
  sidePeek?: number;
  borderRadius?: number;
  onIndexChange?: (index: number) => void;
  onPressItem?: (item: CoverItem, index: number) => void;
};

/** Carrusel */
export default function CoverflowCarousel({
  data,
  cardWidth,
  cardHeight,
  sidePeek,
  borderRadius = 16,
  onIndexChange,
  onPressItem,
}: Props) {
  const router = useRouter();
  const { width, height } = useWindowDimensions();

  const CARD_WIDTH  = cardWidth  ?? Math.round(width * 0.85);
  const CARD_HEIGHT = cardHeight ?? Math.round(height * 0.65);

  const SPACING = 12;
  const ITEM_SIZE = CARD_WIDTH + SPACING;
  const SIDE = sidePeek ?? Math.round((width - CARD_WIDTH) / 2.3);

  const x = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => { x.value = e.contentOffset.x; },
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 60 });
  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const centered = viewableItems.find(v => v.isViewable);
      if (centered && typeof centered.index === 'number') onIndexChange?.(centered.index);
    }
  );

  const renderItem = ({ item, index }: { item: CoverItem; index: number }) => {
    const handlePress = () => {
      if (onPressItem) return onPressItem(item, index);
      if (!item.link) return;
      if (typeof item.link === 'string') router.push(item.link as any);
      else router.push({ pathname: item.link.pathname, params: item.link.params as any });
    };

    return (
      <View style={{ width: ITEM_SIZE }}>
        <Pressable
          onPress={handlePress}
          android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
          style={{ borderRadius }}
        >
          <CoverCard
            index={index}
            image={item.image}
            title={item.title}
            x={x}
            itemSize={ITEM_SIZE}
            cardWidth={CARD_WIDTH}
            cardHeight={CARD_HEIGHT}
            borderRadius={borderRadius}
          />
        </Pressable>
      </View>
    );
  };

  const keyExtractor = useMemo(() => (i: CoverItem) => i.id, []);

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <Animated.FlatList
        horizontal
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{ paddingHorizontal: SIDE }}
        snapToInterval={ITEM_SIZE}
        snapToAlignment="start"
        decelerationRate="fast"
        onScroll={onScroll}
        scrollEventThrottle={16}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewConfigRef.current}
      />
    </GestureHandlerRootView>
  );
}

/** Card sin imagen de fondo duplicada */
function CoverCard({
  index,
  image,
  title,
  x,
  itemSize,
  cardWidth,
  cardHeight,
  borderRadius,
}: {
  index: number;
  image: ImageSourcePropType;
  title?: string;
  x: Animated.SharedValue<number>;
  itemSize: number;
  cardWidth: number;
  cardHeight: number;
  borderRadius: number;
}) {
  // Animación coverflow
  const animatedCard = useAnimatedStyle(() => {
    const inputRange = [(index - 1) * itemSize, index * itemSize, (index + 1) * itemSize];
    const scale = interpolate(x.value, inputRange, [0.88, 1, 0.88], Extrapolation.CLAMP);
    const rotateY = interpolate(x.value, inputRange, [20, 0, -20], Extrapolation.CLAMP);
    const translateY = interpolate(x.value, inputRange, [16, 0, 16], Extrapolation.CLAMP);
    const opacity = interpolate(x.value, inputRange, [0.9, 1, 0.9], Extrapolation.CLAMP);
    return {
      transform: [{ perspective: 1000 }, { scale }, { rotateY: `${rotateY}deg` }, { translateY }],
      opacity,
    };
  });

  return (
    <Animated.View
      style={[
        styles.card,
        { width: cardWidth, height: cardHeight, borderRadius },
        animatedCard,
      ]}
    >
      {/* ÚNICA imagen */}
      <View style={[StyleSheet.absoluteFill, { justifyContent: 'center', alignItems: 'center' }]}>
        <Image source={image} resizeMode="cover"  style={{ width: '100%', height: '100%' }} />
      </View>

      {/* Título (siempre presente para mantener el layout) */}
      {/* 🚨 MODIFICACIÓN: Usa title ?? '' para asegurar que se renderice el contenedor, incluso si el título es undefined. */}
      <View style={styles.centerLabel}>
          <Text style={styles.title} numberOfLines={2}>{title ?? ''}</Text> 
      </View>
    </Animated.View>
  );
}

/** Estilos */
const styles = StyleSheet.create({
  card: {
     overflow: 'hidden',     
    alignSelf: 'center',
    backgroundColor: 'transparent', 
  },
  centerLabel: {
    position: 'absolute',
    left: 16,
    right: 16,
    top: '45%',
    transform: [{ translateY: -16 }],
    alignItems: 'center',
  },
  title: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 32,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
})