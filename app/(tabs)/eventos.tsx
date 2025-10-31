// app/(tabs)/TabTwoScreen.tsx
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import EventsTabs from '@/components/EventsTabs';
import SearchBarWithFilter from '@/components/SearchBarWithFilterw';
import { ThemedView } from '@/components/ThemedView';

// Tipo local que amplía lo que muestra la tarjeta y además
// lleva datos para la pantalla de detalle.
type EventListItem = {
  id: string;
  image: any; // require('...')  (ImageSourcePropType)
  title: string;
  dateText?: string;
  description?: string;
  venueName?: string;
  coords?: { lat: number; lng: number };
  ctaUrl?: string;
  bannerKey?: string; // clave local para el banner del detalle (p.ej. "parque-nacional")
};

export default function TabTwoScreen() {
  const [q, setQ] = useState('');
  const router = useRouter();

  const onPressItem = (item: EventListItem) => {
    router.push({
      pathname: '/events/[id]',
      params: {
        id: item.id,
        title: item.title,
        dateText: item.dateText ?? '',
        venueName: item.venueName ?? '',
        lat: String(item.coords?.lat ?? ''),
        lng: String(item.coords?.lng ?? ''),
        ctaUrl: item.ctaUrl ?? '',
        description: item.description ?? '',
        imgMain: item.bannerKey ?? 'banner-default',
      },
    });
  };

  const agenda: EventListItem[] = [
    {
      id: '2',
      image: require('../../assets/events/article-1.png'),
      title: 'Biblioteca Rafael Arias Gomez',
      dateText: 'Todo el mes',
      venueName: 'Biblioteca Municipal Rafael Arias Gómez',
      coords: { lat: 9.91093, lng: -84.04611 },
      ctaUrl: 'https://ejemplo.com/residuos',
      bannerKey: 'banner-default',
      description:
        '¡Aprenda y descubra nuevas habilidades en la Biblioteca Municipal Rafael Arias Gómez! Le invitamos a ser parte de nuestros cursos y talleres diseñados para todas las edades. Manualidades. Inglés. Centros de lectura. Tecnologías de información. Estimulación temprana. Talleres de verano. San Francisco de Dos Ríos. 2547-6607  bibliotecarafaelarias@hotmail.com',
    },
    {
      id: '3',
      image: require('../../assets/events/art_2.jpg'),
      title: 'Promoviendo la coexistencia con nuestros vecinos silvestres urbanos - taller',
      dateText: '28 de Febrero de 2025',
      coords: { lat: 9.9327, lng: -84.0796 },
      ctaUrl: 'https://ejemplo.com/semana-santa',
      bannerKey: 'art-2',
      description: '¡Atención a todos los interesados! Les invitamos cordialmente a una charla especial sobre cómo convivir de manera armoniosa con la fauna silvestre en entornos urbanos. Cuándo: Mañana, viernes 28 de febrero 2025 Dónde: Auditorio del MINAE, San José Requisito: Inscripción previa. No pierda la oportunidad de aprender y ser parte del cambio para una mejor convivencia con la naturaleza .Inscríbase ahora y asegure su espacio. melissa.pinedopinto@unimelb.edu.au',
    },
  ];

  const proximos: EventListItem[] = [
    {
      id: '4',
      image: require('../../assets/events/10.png'),
      title: 'Feria de Productores',
      dateText: '2 de Mayo',
      bannerKey: 'banner-default',
    },
  ];

  const anteriores: EventListItem[] = [
    {
      id: '5',
      image: require('../../assets/events/10.png'),
      title: 'Festival Cultural',
      dateText: 'Marzo',
      bannerKey: 'banner-default',
    },
  ];

  return (
    <ImageBackground
      source={require('../../assets/images/bg_eventos.png')} // 👈 cambia a tu imagen de fondo
      style={styles.bg}
      imageStyle={styles.bgImage}
      // blurRadius={2} // opcional: desenfoque
    >
      {/* Overlay para mejorar contraste del contenido sobre el fondo */}
      <View style={styles.overlay}>
        <ThemedView style={[styles.titleContainer, { backgroundColor: 'transparent' }]}>
          <View style={styles.containerText}>
            <Image
              source={require('../../assets/images/calendar.png')}
              style={styles.image}
              resizeMode="cover"
            />
            <Text style={styles.subtitle}>Eventos</Text>
          </View>

          <View style={styles.searchBarContainer}>
            <SearchBarWithFilter
              value={q}
              onChangeText={setQ}
              filterIcon={require('../../assets/images/filters-icon.png')}
            />
          </View>

          <EventsTabs
            all={agenda}
            upcoming={proximos}
            past={anteriores}
            embedded
            onPressItem={onPressItem}
          />
        </ThemedView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  // Fondo
  bg: { flex: 1 },
  bgImage: { resizeMode: 'cover', },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.06)', 
  },

  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
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
    paddingTop: 12,
    paddingBottom: 12,
  },
  image: { width: 31, height: 31 },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111', // si subes la opacidad del overlay, puedes dejar #111; si no, usa #fff
  },
  searchBarContainer: { paddingHorizontal: 20 },
});
