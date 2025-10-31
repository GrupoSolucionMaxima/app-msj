import React, { useMemo } from 'react';
import { Dimensions, Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';

import HorizontalGradientCarousel from '@/components/HorizontalGradientCarousel';
import HorizontalImageCarousel from '@/components/HorizontalImageCarousel';
import LogoGrid from '@/components/LogoGrid';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { ResizeMode, Video } from 'expo-av';

// Utilidad para barajar sin mutar el original
function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const screenWidth = Dimensions.get('window').width;


export default function HomeScreen() {
  const firstCarouselImgs: { id: string; source: ImageSourcePropType, link: any }[] = [
    { id: '1', source: require('../../assets/images/armonia-urbana.png'), link: '/descubre/armonia_urbana' },
    { id: '2', source: require('../../assets/images/arte-cultura.png'), link: '/descubre/arte_cultural'  },
    { id: '3', source: require('../../assets/images/deporte-recreacion.png'), link: '/descubre/deporte_recreacion'  },
    { id: '4', source: require('../../assets/images/economia-local.png'), link: '/descubre/economia_local'  },
    { id: '5', source: require('../../assets/images/gastronomia.png'), link: '/descubre/gastronomia' },
    { id: '6', source: require('../../assets/images/patrimonio.png'), link: '/descubre/patrimonio' },
  ];

  const secondCarouselImgs = [
    {
      id: '2',
      image: require('../../assets/events/article-1.png'),
      source: require('../../assets/events/article-1.png'),
      title: 'Biblioteca Rafael Arias Gomez',
      dateText: 'Todo el mes',
      venueName: 'Biblioteca Municipal Rafael Arias Gómez',
      coords: { lat: 9.91093, lng: -84.04611 },
      ctaUrl: 'https://ejemplo.com/residuos',
      bannerKey: 'banner-default',
      description:
        '¡Aprenda y descubra nuevas habilidades en la Biblioteca Municipal Rafael Arias Gómez! Le invitamos a ser parte de nuestros cursos y talleres diseñados para todas las edades. Manualidades. Inglés. Centros de lectura. Tecnologías de información. Estimulación temprana. Talleres de verano. San Francisco de Dos Ríos. 2547-6607  bibliotecarafaelarias@hotmail.com',
    },
    // { id: '2', source: require('../../assets/events/2.png'), title: 'Paseo de los Estudiantes', subtitle: '2 de Abril de 2025' },
    // { id: '3', source: require('../../assets/events/3.png'), title: 'Rock Fest Se Baña', subtitle: '5 de Abril de 2025' },
    // { id: '4', source: require('../../assets/events/4.png'), title: 'Campaña “Puerta a Puerta', subtitle: '5 de Abril de 2025' },
    // { id: '5', source: require('../../assets/events/5.png'), title: 'Campaña de Reciclaje Barrio cuba', subtitle: '7 de Abril de 2025' },
    // { id: '6', source: require('../../assets/events/6.png'), title: 'Taller de Protocolo de Entrega de Alimentos y Donaciones', subtitle: '9 de Abril de 2025' },
    // { id: '7', source: require('../../assets/events/7.png'), title: '1era Feria de Empelo', subtitle: '10 de Abril de 2025' },
    // { id: '8', source: require('../../assets/events/8.png'), title: 'Semana Santa en San José', subtitle: '13 al 20 de Abril de 2025' },
  ];

  const thirdCarouselImgs: { id: string; source: ImageSourcePropType; title: string }[] = [
    { id: '1', source: require('../../assets/rutas/1.png'), title: 'Tour san josé histórico' },
    { id: '2', source: require('../../assets/rutas/2.png'), title: 'Templos parroquiales' },
    { id: '3', source: require('../../assets/rutas/3.png'), title: 'Tour san josé histórico' },
    { id: '4', source: require('../../assets/rutas/4.png'), title: 'Tour paseo de los museos' },
    { id: '5', source: require('../../assets/rutas/5.png'), title: 'El mejor café del mundo ' },
    { id: '6', source: require('../../assets/rutas/6.png'), title: ' Parques y monumentos' },
  ];

  const fourthCarouselImgs: { id: string; source: ImageSourcePropType }[] = [
    { id: '1', source: require('../../assets/experiencias/1.png') },
    { id: '2', source: require('../../assets/experiencias/2.png') },
    { id: '3', source: require('../../assets/experiencias/3.png') },
    { id: '4', source: require('../../assets/experiencias/4.png') },
    { id: '5', source: require('../../assets/experiencias/5.png') },
    { id: '6', source: require('../../assets/experiencias/6.png') },
    { id: '7', source: require('../../assets/experiencias/7.png') },
    { id: '8', source: require('../../assets/experiencias/8.png') },
    { id: '9', source: require('../../assets/experiencias/9.png') },
  ];

  const fifthCarouselImgs: { id: string; source: ImageSourcePropType }[] = [
    { id: '1', source: require('../../assets/info/1.png') },
    { id: '2', source: require('../../assets/info/2.png') },
    { id: '3', source: require('../../assets/info/3.png') },
    { id: '4', source: require('../../assets/info/4.png') },
    { id: '5', source: require('../../assets/info/5.png') },
    { id: '6', source: require('../../assets/info/6.png') },
    { id: '7', source: require('../../assets/info/7.png') },
  ];

  const partners = [
    { id: '1', source: require('../../assets/radar/1.png'), url: 'https://www.google.com/' },
    { id: '2', source: require('../../assets/radar/2.png'), url: 'https://www.google.com/' },
    { id: '3', source: require('../../assets/radar/3.png'), url: 'https://www.google.com/' },
    { id: '4', source: require('../../assets/radar/4.png'), url: 'https://www.google.com/' },
    { id: '5', source: require('../../assets/radar/5.png'), url: 'https://www.google.com/' },
    { id: '6', source: require('../../assets/radar/6.png'), url: 'https://www.google.com/' },
    { id: '7', source: require('../../assets/radar/7.png'), url: 'https://www.google.com/' },
    { id: '8', source: require('../../assets/radar/8.png'), url: 'https://www.google.com/' },
    { id: '9', source: require('../../assets/radar/9.png'), url: 'https://www.google.com/' },
    { id: '10', source: require('../../assets/radar/10.png'), url: 'https://www.google.com/' },
    { id: '11', source: require('../../assets/radar/11.png'), url: 'https://www.google.com/' },
    { id: '12', source: require('../../assets/radar/12.png'), url: 'https://www.google.com/' },
  ];

  const ciudadCreativaImgs = [
    {
      id: '2',
      image: require('../../assets/images/main_ciudad_creativa.png'),
      source: require('../../assets/images/main_ciudad_creativa.png'),
      title: 'Ciudad Creativa',
      coords: { lat: 9.91093, lng: -84.04611 },
      ctaUrl: 'https://ejemplo.com/residuos',
      bannerKey: 'ciudad-creativa',
      description: `Las ciudades que forman parte de la Red de Industrias Creativas, como San José; están comprometidas en:

• Reforzar la creación, producción, distribución y difusión de actividades, bienes y servicios culturales.
• Desarrollar polos de creatividad e innovación y ampliar las oportunidades de los creadores y profesionales del sector cultural.
• Mejorar el acceso y la participación en la vida cultural, en particular de los grupos y personas marginados o vulnerables.
• Integrar plenamente la cultura y la creatividad en sus planes de desarrollo sostenible. 

Proyectos a desarrollar:
• Consolidación del Clúster de Industrias Creativas.
• Actualización de la Política Cultural de San José.
• Desarrollo del Plan Turismo-Diseño-Sostenibilidad.
• Posicionar a San José como un HUB Creativo y país embajador de la UCCN.
• Impulsar el desarrollo sostenible de las Industrias Creativas y Culturales mediante mecanismos de reconocimiento, financiamiento, cogestión e intercambio.`,
  }
  ];


  // 🔀 Barajado solo una vez por montaje (evita reordenar en cada render)
  const partnersShuffled = useMemo(() => shuffle(partners), []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Video
          source={require('../../assets/main-video.mp4')}
          style={styles.headerVideo}
          resizeMode={ResizeMode.CONTAIN} 
          isLooping
          shouldPlay
          isMuted
          // hace que reproduzca en silencio por defecto (autoplay más confiable)
          // y se vea encima correctamente
        />
      }
    >
      <ThemedView style={styles.container}>
        <Text style={styles.title}>Hola,</Text>

        <View style={styles.containerText}>
          <Image
            source={require('../../assets/images/lupa.png')}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.subtitle}>Disfrute San José</Text>
        </View>

        <HorizontalImageCarousel
          data={firstCarouselImgs}
          itemWidth={394}
          itemHeight={389}
          gap={0}
        />

        <View style={styles.containerText}>
          <Image
            source={require('../../assets/images/calendar.png')}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.subtitle}>Eventos</Text>
        </View>

        <View>
          <HorizontalGradientCarousel
            data={secondCarouselImgs}
            cardWidth={260}
            cardHeight={150}
          />
        </View>

        <View style={styles.containerText}>
          <Image
            source={require('../../assets/images/map.png')}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.subtitle}>Rutas</Text>
        </View>

        <HorizontalImageCarousel data={thirdCarouselImgs} />

        <View style={styles.containerText}>
          <Image
            source={require('../../assets/images/icon_ciudad_creativa.png')}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.subtitle}>Ciudad Creativa</Text>
        </View>

        <View>
          <HorizontalGradientCarousel
            data={ciudadCreativaImgs}
            cardWidth={260}
            cardHeight={150}
          />
        </View>

        <View style={styles.containerText}>
          <Image
            source={require('../../assets/images/experiencia.png')}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.subtitle}>Experiencias</Text>
        </View>

        <HorizontalImageCarousel
          data={fourthCarouselImgs}
          itemWidth={260}
          itemHeight={150}
          gap={24}
        />

        <View style={styles.containerText}>
          <Image
            source={require('../../assets/images/info.png')}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.subtitle}>Info. Viajero</Text>
        </View>

        <HorizontalImageCarousel
          data={fifthCarouselImgs}
          itemWidth={260}
          itemHeight={150}
          gap={24}
        />

        <View style={styles.containerText}>
          <Text style={styles.subtitle}>Radar de actividades</Text>
        </View>

        {/* 🔀 Usa el array barajado */}
        <LogoGrid data={partnersShuffled} />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerVideo: {
    width: '100%',
    height: '100%',       
    borderRadius: 0,  
    backgroundColor: '#FFFFFF',
  },
  container: {
    flexDirection: 'column',
    gap: 8,
    marginTop: 30,
    paddingBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'semibold' as any,
    paddingLeft: 20,
  },
  containerText: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    paddingLeft: 20,
    paddingTop: 14,
    paddingBottom: 18,
  },
  image: {
    width: 31,
    height: 31,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'semibold' as any,
  },
});
