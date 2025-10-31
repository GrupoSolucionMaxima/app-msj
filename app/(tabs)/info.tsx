// app/info/index.tsx
import CoverflowCarousel, { CoverItem } from '@/components/carousels/CoverflowCarousel';
import React from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const DATA: CoverItem[] = [
  {
    id: 'hilo_urbano',
    image: require('../../assets/info/hilo_urbano.png'),
    title: '',
    link: {
      // TIP: en expo-router suele ser '/info/[id]' (sin .tsx)
      pathname: '/info/[id]',
      params: { subcategory: 'hilo_urbano' },
    },
  },
  // Agrega más categorías aquí…
];

export default function InfoScreen() {
  return (
    <ImageBackground
      source={require('../../assets/images/bg_tours.png')} // 👈 cambia esta ruta a tu imagen
      style={styles.bg}
      imageStyle={styles.bgImage}
      // blurRadius={2} // opcional: desenfoque suave
    >
      {/* Overlay para mejorar legibilidad */}
      <View style={styles.overlay}>
        <SafeAreaView style={styles.safe}>
          <View style={styles.containerText}>
            <Image
              source={require('../../assets/images/info.png')}
              style={styles.image}
              resizeMode="cover"
            />
            <Text style={styles.subtitle}>Info Viajero</Text>
          </View>

          {/* Ajusta según el contraste del fondo */}
          <StatusBar barStyle="dark-content" />

          <View style={styles.container}>
            <CoverflowCarousel data={DATA} />
          </View>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: '#FFFFFF'  },
  bgImage: { resizeMode: 'cover' },

  overlay: {
    flex: 1,
    paddingBottom: 35,
  },

  safe: { flex: 1, backgroundColor: 'transparent' },

  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 24,
    backgroundColor: 'transparent',
  },

  containerText: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    paddingLeft: 20,
    paddingTop: 24,
    paddingBottom: 6,
    backgroundColor: 'transparent',
  },

  image: { width: 31, height: 31 },
  subtitle: { fontSize: 20, fontWeight: '600', color: '#111' }, // Si el fondo es oscuro, usa '#fff'
});
