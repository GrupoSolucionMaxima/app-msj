import CoverflowCarousel, { CoverItem } from '@/components/carousels/CoverflowCarousel';
import { usePathname, useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { Image, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';


const DATA: CoverItem[] = [
  {
    id: 'parque-metropolitano-la-sabana-padre-chapui',
    image: require('../../assets/descubre/deporte-recreacion/parque_metropolitano_la_sabana.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'parque-metropolitano-la-sabana-padre-chapui',
        title: 'Parque Metropolitano La Sabana Padre Chapuí',
        lat: '',
        lng: '',
        imgMain: 'parque-metropolitano-la-sabana-padre-chapui',
        indications: 'Parque Metropolitano La Sabana, Mata Redonda, San José, Costa Rica.',
        description:
          'Este parque urbano de 72 hectáreas, se  localiza en el corazón de San José, en esta importante zona verde, se desarrollan múltiples actividades deportivas, culturales y recreativas.',
      },
    },
  },
  {
    id: 'estadio-nacional-de-costa-rica',
    image: require('../../assets/descubre/deporte-recreacion/Estadio_nacional_costa_rica.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'estadio-nacional-de-costa-rica',
        title: 'Estadio Nacional de Costa Rica',
        lat: '',
        lng: '',
        imgMain: 'estadio-nacional-de-costa-rica',
        indications: 'Parque Metropolitano La Sabana,  San José, Costa Rica.',
        description:
          'El Estadio Nacional de Costa Rica, es el más moderno de Centroamérica; en este espacio se desarrollan múltiples actividades culturales, artísticas y deportivas.',
      },
    },
  },
  {
    id: 'parque-diversiones-dr-roberto-ortiz-brenes',
    image: require('../../assets/descubre/deporte-recreacion/Parque_diversiones_dr_roberto.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'parque-diversiones-dr-roberto-ortiz-brenes',
        title: 'Parque Diversiones Dr. Roberto Ortiz Brenes',
        lat: '',
        lng: '',
        imgMain: 'parque-diversiones-dr-roberto-ortiz-brenes',
        indications: '2 km Oeste del Hospital México, La Uruca',
        description:
          'Este parque nació como una solución permanente para cubrir necesidades no contempladas en los presupuestos ordinarios del Hospital Nacional de Niños,  se inauguró el 18 de diciembre de 1981, bajo el lema "los niños sanos ayudan a los niños enfermos", proporcionando un mundo de fantasía y diversión de manera segura, facilitando servicios a sus huéspedes. ¡Venga, diviértase y colabore!',
      },
    },
  },
  {
    id: 'gimnasio-nacional-eddy-cortes',
    image: require('../../assets/descubre/deporte-recreacion/gimnasio_nacional_eddy_cortes.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'gimnasio-nacional-eddy-cortes',
        title: 'Gimnasio Nacional Eddy Cortés',
        lat: '',
        lng: '',
        imgMain: 'gimnasio-nacional-eddy-cortes',
        indications: 'Parque Metropolitano La Sabana, San José, Costa Rica.',
        description:
          'Este gimnasio fue inaugurado el 19 de febrero de 1960. Actualmente, la estructura se utiliza principalmente para partidos de baloncesto, competiciones de gimnasia, ceremonias de graduación y otros eventos.',
      },
    },
  },
  {
    id: 'domingos-familiares-sin-humo',
    image: require('../../assets/descubre/deporte-recreacion/gomingos_familiares_sin_humo.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'domingos-familiares-sin-humo',
        title: 'Domingos Familiares Sin Humo',
        lat: '',
        lng: '',
        imgMain: 'domingos-familiares-sin-humo',
        indications: 'Paseo Colón, entre los distritos de Merced y Hospital, San José.',
        description:
          '¡Domingos que inspiran! Súmese a Domingos Familiares Sin Humo en Paseo Colón. ¡Un espacio vibrante para disfrutar de actividades culturales, deportivas y recreativas en un ambiente 100% libre de humo! ¡Venga a vivir la diferencia!',
      },
    },
  },
];

export default function DepertoRecreacion() {

  const router = useRouter();
  const pathname = usePathname();

  const handleBack = useCallback((fallback: string = '/(tabs)/home') => {
  if (router.canGoBack()) {
    router.back();
    return;
  }
  // Fallback cuando no hay historial (deep link, replace, etc.)
  const parent =
    pathname.split('/').slice(0, -1).join('/') || fallback;

  router.replace(parent as any);
}, [router, pathname]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f4f4f5' }}>
      <View style={styles.containerArrow}>
        <Pressable
          onPress={() => handleBack('/(tabs)/home')}
          hitSlop={12}
          android_ripple={{ color: 'rgba(0,0,0,0.08)', borderless: false }}
          accessibilityRole="button"
          accessibilityLabel="Volver"
        >
          <Image source={require('../../assets/images/left_arrow.png')} style={styles.imageArrow} resizeMode="cover" />
        </Pressable>
      </View>
      <View style={styles.containerText}>
        <Image source={require('../../assets/images/lupa.png')} style={styles.image} resizeMode="cover" />
        <Text style={styles.subtitle}>Deporte y Recreación</Text>
      </View>

      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <CoverflowCarousel data={DATA} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', paddingTop: 12, backgroundColor: '#FFFFFF' },
  containerText: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    paddingLeft: 20,
    paddingBottom: 6,
    backgroundColor: '#FFFFFF'
  },
  containerArrow: {
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'flex-end',
    paddingLeft: 20,
    paddingTop: 24,
    paddingBottom: 0,
    paddingHorizontal: 24,
    backgroundColor: '#FFFFFF'
  },
  image: { width: 31, height: 31 },
  imageArrow: { width: 13, height: 24 },
  subtitle: { fontSize: 20, fontWeight: '600' },
});
