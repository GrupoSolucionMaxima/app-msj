// app/(tabs)/RutasScreen.tsx
import { ResizeMode, Video } from 'expo-av';
import React, { useMemo, useRef, useState } from 'react';
import {
  Image,
  ImageBackground,
  Modal,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
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

// ===== Tipo mínimo
type CoverItem = {
  id: string;
  image: any; // require(...) o { uri: string }
  video: { uri?: string } | number; // { uri: 'https://...' } o require('...')
  title?: string;
};

// ===== DATA (ejemplo) — ajusta rutas/URLs a las tuyas
const DATA: CoverItem[] = [
  {
    id: 'parque_nacional',
    image: require('../../assets/tours/tour_1.png'),
    video: require('../../assets/videos/ruta1.mp4'),
    title: 'Parque Nacional',
  },
  {
    id: 'templos_parroquiales',
    image: require('../../assets/tours/templos_parroquiales.png'),
    video: require('../../assets/videos/ruta2.mp4'),
    title: 'Templos Parroquiales',
  },
  {
    id: 'tour_san_jose_historico',
    image: require('../../assets/tours/tour_san_jose_historico.png'),
    video: require('../../assets/videos/ruta3.mp4'),
    title: 'Tour San José Histórico',
  },
  {
    id: 'tour_paseo_de_los_museos',
    image: require('../../assets/tours/tour_paseo_de_los_museos.png'),
    video: require('../../assets/videos/ruta4.mp4'),
    title: 'Tour Paseo de los Museos',
  },
  {
    id: '_el_mejor_cafe_del_mundo',
    image: require('../../assets/tours/_el_mejor_cafe_del_mundo.png'),
    video: require('../../assets/videos/ruta5.mp4'),
    title: 'El Mejor Café del Mundo',
  },
  {
    id: 'parques_y_monumentos',
    image: require('../../assets/tours/parques_y_monumentos.png'),
    video: { uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4' },
    title: 'Parques y Monumentos',
  },
];

export default function RutasScreen() {
  const { width, height } = useWindowDimensions();

  // Tamaños del carrusel
  const CARD_WIDTH = Math.round(width * 0.85);
  const CARD_HEIGHT = Math.round(height * 0.65);
  const SPACING = 12;
  const ITEM_SIZE = CARD_WIDTH + SPACING;
  const SIDE = Math.round((width - CARD_WIDTH) / 2.3);

  // Animación coverflow
  const x = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      x.value = e.contentOffset.x;
    },
  });

  // Modal de video
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState<CoverItem | null>(null);
  const videoRef = useRef<Video>(null);

  const openVideo = (item: CoverItem) => {
    if (!item.video) return;
    setCurrent(item);
    setVisible(true);
  };

  const closeModal = async () => {
    try {
      await videoRef.current?.pauseAsync();
    } catch {}
    setVisible(false);
    setCurrent(null);
  };

  const videoSource = useMemo(() => {
    if (!current?.video) return undefined;
    return typeof current.video === 'number'
      ? current.video
      : current.video.uri
      ? { uri: current.video.uri }
      : undefined;
  }, [current]);

  const keyExtractor = (i: CoverItem) => i.id;

  return (
    <ImageBackground
      source={require('../../assets/images/bg_tours.png')}
      style={styles.bg}
      imageStyle={styles.bgImage}
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.safe}>
          {/* Header */}
          <View style={styles.headerRow}>
            <Image
              source={require('../../assets/images/lupa.png')}
              style={styles.image}
              resizeMode="cover"
            />
            <Text style={styles.subtitle}>Tours</Text>
          </View>

          <StatusBar barStyle="dark-content" />

          {/* Carrusel inline */}
          <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'transparent' }}>
            <Animated.FlatList
              horizontal
              data={DATA}
              keyExtractor={keyExtractor}
              renderItem={({ item, index }) => (
                <ItemCard
                  item={item}
                  index={index}
                  x={x}
                  itemSize={ITEM_SIZE}
                  cardWidth={CARD_WIDTH}
                  cardHeight={CARD_HEIGHT}
                  onPress={() => openVideo(item)}
                />
              )}
              showsHorizontalScrollIndicator={false}
              bounces={false}
              contentContainerStyle={{ paddingHorizontal: SIDE }}
              snapToInterval={ITEM_SIZE}
              snapToAlignment="start"
              decelerationRate="fast"
              onScroll={onScroll}
              scrollEventThrottle={16}
            />
          </GestureHandlerRootView>
        </SafeAreaView>
      </View>

      {/* Modal de Video */}
      <Modal visible={visible} animationType="fade" transparent onRequestClose={closeModal}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle} numberOfLines={1}>
                {current?.title || 'Reproduciendo...'}
              </Text>
              <Pressable onPress={closeModal} hitSlop={8} style={styles.closeBtn}>
                <Text style={styles.closeTxt}>✕</Text>
              </Pressable>
            </View>

            <View style={styles.videoWrap}>
              {videoSource ? (
                <Video
                  ref={videoRef}
                  source={videoSource}
                  style={styles.video}
                  useNativeControls
                  shouldPlay
                  resizeMode={ResizeMode.CONTAIN}
                  isLooping={false}
                />
              ) : (
                <Text style={styles.noVideo}>No hay video disponible</Text>
              )}
            </View>

            <View style={styles.modalFooter}>
              <Pressable onPress={closeModal} style={styles.ctaBtn}>
                <Text style={styles.ctaTxt}>Cerrar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}

function ItemCard({
  item,
  index,
  x,
  itemSize,
  cardWidth,
  cardHeight,
  onPress,
}: {
  item: CoverItem;
  index: number;
  x: Animated.SharedValue<number>;
  itemSize: number;
  cardWidth: number;
  cardHeight: number;
  onPress: () => void;
}) {
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
    <View style={{ width: itemSize }}>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
        style={{ borderRadius: 16 }}
      >
        <Animated.View
          style={[
            styles.card,
            { width: cardWidth, height: cardHeight, borderRadius: 16 },
            animatedCard,
          ]}
        >
          <View
            style={[StyleSheet.absoluteFill, { justifyContent: 'center', alignItems: 'center' }]}
          >
            <Image source={item.image} resizeMode="cover" style={{ width: '100%', height: '100%' }} />
          </View>

          {/* {item.title ? (
            <View style={styles.centerLabel}>
              <Text style={styles.title} numberOfLines={2}>
                {item.title}
              </Text>
            </View>
          ) : null} */}
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  // Fondo
  bg: { flex: 1, backgroundColor: '#FFFFFF' },
  bgImage: { resizeMode: 'cover' },
  overlay: { flex: 1, paddingBottom: 35 },
  safe: { flex: 1, backgroundColor: 'transparent' },

  // Header
  headerRow: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    paddingLeft: 20,
    paddingTop: 24,
    paddingBottom: 6,
    backgroundColor: 'transparent',
  },
  image: { width: 31, height: 31 },
  subtitle: { fontSize: 20, fontWeight: '600', color: '#111' },

  // Tarjeta
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

  // Modal
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  modalCard: {
    backgroundColor: '#101010',
    borderRadius: 16,
    overflow: 'hidden',
  },
  modalHeader: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#151515',
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalTitle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    flex: 1,
  },
  closeBtn: {
    padding: 6,
    marginLeft: 10,
  },
  closeTxt: {
    color: '#fff',
    fontSize: 18,
    lineHeight: 18,
  },
  videoWrap: {
    aspectRatio: 16 / 9,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: { width: '100%', height: '100%' },
  noVideo: { color: '#fff', fontSize: 14, opacity: 0.8 },
  modalFooter: {
    padding: 12,
    backgroundColor: '#151515',
    alignItems: 'flex-end',
  },
  ctaBtn: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  ctaTxt: { color: '#111', fontWeight: '700' },
});
