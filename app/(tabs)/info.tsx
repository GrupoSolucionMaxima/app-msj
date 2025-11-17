// app/info/index.tsx
import CoverflowCarousel, { CoverItem } from '@/components/carousels/CoverflowCarousel';
import HorizontalImageCarousel, { Item } from '@/components/HorizontalImageCarousel';
import React, { useState, useEffect, useCallback } from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ThemedView } from '@/components/ThemedView';





export default function InfoScreen() {
  const firstCarouselImgs: Item[] = [
    { id: '1', source: require('../../assets/images/bannerexperiencias/Iconos-APP-MC2025_Armonia-Urbana-2-2.png'), link: '/info/touroperador' },
    { id: '2', source: require('../../assets/images/bannerexperiencias/Iconos-APP-MC2025_Arte-y-Cultura-2-2.png'), link: '/info/seguridad' },
    { id: '3', source: require('../../assets/images/bannerexperiencias/Iconos-APP-MC2025_Deporte-2-2.png'), link: '/info/embajadas' },
    { id: '4', source: require('../../assets/images/bannerexperiencias/Iconos-APP-MC2025_Economia-Local-2-2.png'), link: '/info/alojamientos' },
    { id: '5', source: require('../../assets/images/bannerexperiencias/Iconos-APP-MC2025_Gastronomia-2-2.png'), link: '/info/asistenciavital' },
    { id: '6', source: require('../../assets/images/bannerexperiencias/Iconos-APP-MC2025_Patrimonio-2-2.png'), link: '/info/transporte' },
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
            <Text style={styles.subtitle}>Informacion al viajero</Text>
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
