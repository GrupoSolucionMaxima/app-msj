import CoverflowCarousel, { CoverItem } from '@/components/carousels/CoverflowCarousel';
import { usePathname, useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { Image, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';


export const DATA: CoverItem[] = [
   {
    id: 'barrio-amon',
    image: require('../../assets/descubre/gastronomia/barrio_amon.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'barrio-amon',
        title: 'Barrio Amón',
        lat: '',
        lng: '',
        imgMain: 'barrio-amon',
        indications: 'Distrito Carmen',
        description:
          'Barrio Amón representa la vida urbana josefina, historia, patrimonio y arquitectura, es un barrio diverso, creativo, con una cultura, arte y gastronomía únicos.',
      },
    },
  },
  {
    id: 'barrio-la-california',
    image: require('../../assets/descubre/gastronomia/barrio_la_california.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'barrio-la-california',
        title: 'Barrio La California',
        lat: '',
        lng: '',
        imgMain: 'barrio-la-california',
        indications: 'Distrito Carmen',
        description:
          'Conocido como “La Cali”, sus alrededores albergan gran cantidad de bares, clubes y restaurantes, por lo que convierte a este barrio en un importante centro de vida nocturna, que congregar a cientos de personas que participan de las actividades y espacios seguros disponibles. Además, cuenta con componentes culturales  icónicos y cercanía estratégica con otros focos artísticos como galerías y museos.',
      },
    },
  },
  {
    id: 'barrio-escalante',
    image: require('../../assets/descubre/gastronomia/barrio_escalante.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'barrio-escalante',
        title: 'Barrio Escalante',
        lat: '',
        lng: '',
        imgMain: 'barrio-escalante',
        indications: 'Distrito Carmen',
        description:
          'Barrio Escalante, es un vibrante movimiento citadino conocido por ser un destino asegurado para los amantes del buen vivir, gracias a la inversión público-privada, se convirtió en un poderoso proyecto comunitario que transformó este barrio en un sector ampliamente conocido por su gastronomía y vida nocturna cosmopolita.',
      },
    },
  },
  {
    id: 'atractivos-gastronomicos-parque-okayama-y-alrededores',
    image: require('../../assets/descubre/gastronomia/atractivos_gastronomicos_parque_okayama_y_alrededores.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'atractivos-gastronomicos-parque-okayama-y-alrededores',
        title: 'Atractivos Gastronómicos Parque Okayama y alrededores',
        lat: '',
        lng: '',
        imgMain: 'atractivos-gastronomicos-parque-okayama-y-alrededores',
        indications: 'Distrito San Francisco de Dos Ríos',
        description:
          'Atrévase a saborear el festín de sabores que le esperan en cada rincón en San Francisco de Dos Ríos; desde delicias tradicionales hasta propuestas innovadoras, su paladar vivirá una explosión de gusto. ¡Venga y descúbralo!',
      },
    },
  },
  {
    id: 'atractivos-gastronomicos-boulebard-ernesto-rohrmoser-y-alrededores',
    image: require('../../assets/descubre/gastronomia/atractivos_gastronomicos_boulebard_ernesto_rohrmoser_y_alrededores.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'atractivos-gastronomicos-boulebard-ernesto-rohrmoser-y-alrededores',
        title: 'Atractivos Gastronómicos Boulebard Ernesto Rohrmoser y alrededores',
        lat: '',
        lng: '',
        imgMain: 'atractivos-gastronomicos-boulebard-ernesto-rohrmoser-y-alrededores',
        indications: 'Distrito San Francisco de Dos Ríos',
        description:
          'Sumérjase en una escena gastronómica trendy en San José. Rohrmoser le espera con experiencias culinarias innovadoras y sabores que conquistan, viva una aventura de sabores sin igual, descubra  nuevas propuestas culinarias audaces y vanguardistas en un ambiente moderno y acogedor ¡Atrévase a probar!',
      },
    },
  },
  {
    id: 'feria-japonesa',
    image: require('../../assets/descubre/gastronomia/feria_japonesa.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'feria-japonesa',
        title: 'Feria Japonesa',
        lat: '',
        lng: '',
        imgMain: 'feria-japonesa',
        indications: '',
        description:
          '¡Pura vida!  ¡Venga a celebrar la cultura nipona en la Feria Japonesa de la Muni de San José!  Deléitese con sabores auténticos, arte increíble y tradiciones fascinantes en el Boulevard de Rohrmoser. ¡Le esperamos!',
      },
    },
  },
]

export default function ArteCultural() {

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
        <Text style={styles.subtitle}>Gastronomía</Text>
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
