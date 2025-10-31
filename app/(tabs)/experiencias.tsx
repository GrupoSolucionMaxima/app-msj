// app/experiencias/index.tsx
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
    id: 'tour_sj_historico',
    image: require('../../assets/experiencias/chepecletas.png'),
    title: '',
    link: {
      pathname: '/events/[id]',
      params: {
        id: 'TourSanJose',
        title: '',
        dateText: 'Todo el mes',
        showMap: '0',
        lat: '9.9327',
        lng: '-84.0796',
        imgMain: 'parque-nacional',
        headerLogo: 'chepecletas-logo',
        headerLogoHeight: '70',
        description: `ChepeCletas nació en el año 2010, con el propósito de promover la apropiación del espacio público en la ciudad de San José y medios alternativos de movilidad. Realizamos actividades a pie y en bicicleta por la ciudad de San José.

Realizamos recorridos colectivos todos los meses con el objetivo de atraer a las personas a redescubrir la ciudad y cambiar la percepción de San José.`,
      },
    },
  },
];

export default function ExperienciasScreen() {
  return (
    <ImageBackground
      source={require('../../assets/images/bg_tours.png')} // 👈 cambia esta ruta a tu imagen
      style={styles.bg}
      imageStyle={styles.bgImage}
      // blurRadius={2} // opcional
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.safe}>
          <View style={styles.containerText}>
            <Image
              source={require('../../assets/images/lupa.png')}
              style={styles.image}
              resizeMode="cover"
            />
            <Text style={styles.subtitle}>Tours Operados</Text>
          </View>

          {/* Ajusta según contraste del fondo/overlay */}
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
  // Fondo a pantalla completa
  bg: { flex: 1, backgroundColor: '#FFFFFF'  },
  bgImage: { resizeMode: 'cover' },

  // Capa para contraste (ajusta opacidad a gusto)
  overlay: {
    flex: 1,
    paddingBottom: 35,
  },

  // SafeArea sin color para que se vea el fondo
  safe: { flex: 1, backgroundColor: 'transparent' },

  // Contenedor principal
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 12,
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
