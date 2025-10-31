// app/info/[subcategory].tsx
import CoverflowCarousel, { CoverItem } from "@/components/carousels/CoverflowCarousel";
import { useLocalSearchParams, usePathname, useRouter } from "expo-router";
import React, { useCallback } from "react";
import { Image, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";


// Ejemplo de DATA según subcategoría
const DATA_MAP: Record<string, CoverItem[]> = {
  hilo_urbano: [
    {
      id: "tour1",
      image: require("../../assets/info/hilo_urbano_art_1.png"),
      title: "",
      link: {
        pathname: "/events/[id]",
        params: {
          id: "TourSanJose",
          title: "Terminal de Buses San José: Jacó - Monteverde -San Carlos - El Salvador - Nicaragua",
          dateText: "Horario de 5:00 am a 11:00 pm",
          lat: "9.9327",
          lng: "-84.0796",
          imgMain: "terminal-buses",
          description:
            "La terminal de transporte terrestre “7-10”, ubicada en el barrio México de San José, Costa Rica, cerró sus puertas el pasado 30 de abril, según informó el diario costarricense. Debido a este cierre, los nicaragüenses que utilizaban esta terminal para viajar desde o hacia Costa Rica deberán hacerlo ahora desde otros puntos establecidos por las empresas de transporte que operaron allí durante la última década.",
        },
      },
    },
    {
      id: "tour2",
      image: require("../../assets/tours/tour_san_jose.png"),
      title: "Barrio Amón Patrimonial",
      link: {
        pathname: "/events/[id]",
        params: {
          id: "BarrioAmon",
          title: "Barrio Amón Patrimonial",
          lat: "9.935",
          lng: "-84.079",
          imgMain: "parque-nacional",
          description:
            "Descubre la vida patrimonial de Barrio Amón: arquitectura, arte y gastronomía única.",
        },
      },
    },
  ],
  // puedes agregar más subcategorías aquí
};

export default function SubcategoryScreen() {
  const { subcategory } = useLocalSearchParams<{ subcategory: string }>();

  const DATA = DATA_MAP[subcategory || ""] || [];

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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f4f4f5" }}>
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
              <Image source={require('../../assets/images/info.png')} style={styles.image} resizeMode="cover" />
              <Text style={styles.subtitle}>Info Viajero</Text>
            </View>

      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <CoverflowCarousel data={DATA} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 24,
    backgroundColor: "#FFFFFF",
  },
  containerText: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    paddingLeft: 20,
    paddingBottom: 6,
    backgroundColor: "#FFFFFF",
  },
  subtitle: { fontSize: 20, fontWeight: "600" },
  image: { width: 31, height: 31 },
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
  imageArrow: { width: 13, height: 24 },
});
