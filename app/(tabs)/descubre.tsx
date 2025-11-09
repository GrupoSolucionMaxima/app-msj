// app/(tabs)/descubre.tsx (o donde esté tu componente)
import HorizontalImageCarousel, { Item } from '@/components/HorizontalImageCarousel';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function TabTwoScreen() {
  const firstCarouselImgs: Item[] = [
    { id: '1', source: require('../../assets/images/bannerexperiencias/Iconos-APP-MC2025_Armonia-Urbana-2-2.png'), link: '/descubre/armonia_urbana' },
    { id: '2', source: require('../../assets/images/bannerexperiencias/Iconos-APP-MC2025_Arte-y-Cultura-2-2.png'), link: '/descubre/arte_cultural' },
    { id: '3', source: require('../../assets/images/bannerexperiencias/Iconos-APP-MC2025_Deporte-2-2.png'), link: '/descubre/deporte_recreacion' },
    { id: '4', source: require('../../assets/images/bannerexperiencias/Iconos-APP-MC2025_Economia-Local-2-2.png'), link: '/descubre/economia_local' },
    { id: '5', source: require('../../assets/images/bannerexperiencias/Iconos-APP-MC2025_Gastronomia-2-2.png'), link: '/descubre/gastronomia' },
    { id: '6', source: require('../../assets/images/bannerexperiencias/Iconos-APP-MC2025_Patrimonio-2-2.png'), link: '/descubre/patrimonio' },
  ];

  return (
    <ImageBackground
      source={require('../../assets/images/bg_descubre.png')} // 👈 cambia esta ruta a tu imagen
      style={styles.bg}
      imageStyle={styles.bgImage}
      // blurRadius={2} // opcional: desenfoque si quieres más contraste
    >
      {/* Overlay opcional para mejorar contraste sobre el fondo */}
      <View style={styles.overlay}>
        <ThemedView style={[styles.titleContainer, { backgroundColor: 'transparent' }]}>
          <View style={styles.containerText}>
            <Image source={require('../../assets/images/lupa.png')} style={styles.image} resizeMode="cover" />
            <Text style={styles.subtitle}>Descubre</Text>
          </View>

          <HorizontalImageCarousel
            data={firstCarouselImgs}
            itemWidth={475}
            itemHeight={460}
            gap={0}
          />
        </ThemedView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  bgImage: {
    resizeMode: 'cover',
    opacity: 0.3,
  },
  overlay: {
    flex: 1,
  },

  titleContainer: {
    paddingTop: 12,
    flexDirection: 'column',
    gap: 8,
    flex: 1,
  },
  containerText: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    paddingLeft: 20,
    paddingTop: 14,
    paddingBottom: 18,
  },
  image: { width: 31, height: 31 },
  subtitle: { fontSize: 20, fontWeight: '600', color: '#111' }, // si usas overlay oscuro, puedes poner #fff
});
