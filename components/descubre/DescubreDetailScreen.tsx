// EventDetailScreen.tsx
import { usePathname, useRouter } from "expo-router";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import LeafletMap from "../LeafletMap";

// ==== Configuración de la API (Necesario) ====
const API_BASE = "https://msj.gruponbf-testlab.com"; 

type Props = {
title?: string;
  monthTag?: string;
  venueName?: string;
  description?: string;
  addressLines?: string[];
  phone?: string;
  email?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  social?: Partial<Record<"facebook" | "instagram" | "tiktok" | "web", string>>;
  coords: { lat: number; lng: number };
  imgMain?: string | string[];
  indications?: string;
};

type LocalImagesMap = {
  "parque-nacional": any;
  "parque-espana": any;
  "parque-jardin-paz": any;
  "parque-morazan": any;
  "parque-central": any;
  "parque-braulio": any;
  "museo-nacional-de-costa-rica": any;
  "museo-del-jade": any;
  "museos-del-banco-central-de-costa-rica": any;
  "museo-de-arte-costarricense": any;
  "museo-de-la-comunidad-judia": any;
  "museo-de-arte-y-diseno-contemporaneo": any;
  "museo-rafael-angel-calderon-guardia": any;
  "museo-penitenciario": any;
  "museo-historico-y-tecnologico-grupo-ice": any;
  "centro-costarricense-de-ciencia-y-cultura-museo-de-los-ninos-de-costa-rica": any;
  "museo-de-los-ninos-de-costa-rica": any;
  "museo-filatelico-de-correos-de-costa-rica": any;
  "biblioteca-nacional-miguel-obregon-lizano": any;
  "biblioteca-publica-de-hatillo": any;
  "biblioteca-municipal-maria-luisa-porras-monge": any;
  "biblioteca-municipal-emma-gamboa-alvarado": any;
  "biblioteca-municipal-isidro-diaz-munoz": any;
  "biblioteca-municipal-tulio-perlaza-salazar": any;
  "biblioteca-municipal-rafael-angel-calderon-guardia": any;
  "biblioteca-municipal-rafael-angel-arias-gomez": any;
  "biblioteca-municipal-carmen-lyra": any;
  "teatro-nacional": any;
  "teatro-popular-melico-salazar": any;
  "teatro-la-aduana-alberto-canas-escalante": any;
  "teatro-1887-de-la-compania-nacional-de-teatro": any;
  "teatro-de-la-danza-de-la-compania-nacional-de-danza": any;
  "teatro-auditorio-nacional": any;
  "alianza-francesa-de-costa-rica": any;
  "centro-multicultural-botica-solera": any;
  "centro-cultural-de-espana-en-costa-rica": any;
  "centro-cultural-britanico": any;
  "la-casa-del-cuno": any;
  "antigua-aduana": any;
  "sendero-escalante": any;
  "centro-cultural-costarricense-norteamericano-sabana-branch": any;
  "centro-nacional-de-la-cultura-cenac": any;
  "plaza-de-la-cultura": any;
  "plaza-de-la-democracia-y-la-abolicion-del-ejercito": any;
  "plaza-de-las-artes": any;
  "plaza-juan-mora-fernandez": any;
  "plaza-juan-rafael-mora-porras": any;
  "parque-de-las-garantias-sociales": any;
  "barrio-aranjuez": any;
  "barrio-otoya": any;
  "cementerio-general": any;
  "cementerio-obrero-municipalidad-de-san-jose": any;
  "cementerio-extranjero": any;
  "galeria-taletum": any;
  "galeria-valanti": any;
  "galeria-nacional": any;
  "galeria-sophia-wanamaker": any;
  "sala-garbo": any;
  "cine-magaly": any;
  "centro-de-cine-costarricense": any;
  "iglesia-de-la-catedral-metropolitana": any;
  "iglesia-de-nuestra-senora-de-la-soledad": any;
  "iglesia-de-la-dolorosa": any;
  "la-iglesia-de-nuestra-senora-de-la-merced": any;
  "iglesia-de-nuestra-senora-del-carmen": any;
  "iglesia-santa-teresita-del-nino-jesus": any;
  "iron-church": any;
  "parque-metropolitano-la-sabana-padre-chapui": any;
  "estadio-nacional-de-costa-rica": any;
  "parque-diversiones-dr-roberto-ortiz-brenes": any;
  "gimnasio-nacional-eddy-cortes": any;
  "domingos-familiares-sin-humo": any;
  "mercado-central-de-san-jose": any;
  "mercado-municipal-de-artesanias-de-san-jose": any;
  "mercado-mayoreo": any;
  "mercado-del-antiguo-registro-civil": any;
  "mercado-de-calle-16": any;
  "paseo-colon": any;
  "avenida-central": any;
  "boulevard-avenida-cuatro": any;
  "barrio-chino": any;
  "gran-centro-comercial-del-sur": any;
  "plaza-mayor": any;
  "centro-comercial-plaza-america": any;
  "bambu-eco-plaza": any;
  "feria-del-agricultor-en-san-francisco-de-dos-rios": any;
  "feria-del-agricultor-en-zapote": any;
  "feria-del-agricultor-en-hatillo": any;
  "feria-del-agricultor-en-plaza-gonzalez-viquez": any;
  "feria-del-agricultor-en-san-sebastian": any;
  "feria-del-agricultor-en-pavas": any;
  "feria-verde-en-aranjuez": any;
  "barrio-amon": any;
  "barrio-la-california": any;
  "barrio-escalante": any;
  "atractivos-gastronomicos-parque-okayama-y-alrededores": any;
  "atractivos-gastronomicos-boulebard-ernesto-rohrmoser-y-alrededores": any;
  "feria-japonesa": any;
};
const LOCAL_IMAGES: LocalImagesMap = {
  "parque-nacional": require("../../assets/images/parque-nacional.png"),
  "parque-espana": require("../../assets/descubre/armonia-urbana/art-parque-espana.png"),
  "parque-jardin-paz": require("../../assets/descubre/armonia-urbana/art-parque-jardin-paz.png"),
  "parque-morazan": require("../../assets/descubre/armonia-urbana/art-parque-morazan.png"),
  "parque-central": require("../../assets/descubre/armonia-urbana/art-parque-central.png"),
  "parque-braulio": require("../../assets/descubre/armonia-urbana/art-parque-braulio.png"),
  "museo-nacional-de-costa-rica": require("../../assets/descubre/arte-cultural/museo_nacional_costa_rica.png"),
  "museo-del-jade": require("../../assets/descubre/arte-cultural/museo_del_jade.png"),
  "museos-del-banco-central-de-costa-rica": require("../../assets/descubre/arte-cultural/museos_del_banco_central_costa_rica.png"),
  "museo-de-arte-costarricense": require("../../assets/descubre/arte-cultural/museo_de_arte_costarricense.png"),
  "museo-de-la-comunidad-judia": require("../../assets/descubre/arte-cultural/museo_de_la_comunidad_judia.png"),
  "museo-de-arte-y-diseno-contemporaneo": require("../../assets/descubre/arte-cultural/museo_de_arte_y_diseno_contemporaneo.png"),
  "museo-rafael-angel-calderon-guardia": require("../../assets/descubre/arte-cultural/museo_rafael_angel_calderon_guardia.png"),
  "museo-penitenciario": require("../../assets/descubre/arte-cultural/museo_penitenciario.png"),
  "museo-historico-y-tecnologico-grupo-ice": require("../../assets/descubre/arte-cultural/museo_historico_y_tecnologico_grupo_ice.png"),
  "centro-costarricense-de-ciencia-y-cultura-museo-de-los-ninos-de-costa-rica": require("../../assets/descubre/arte-cultural/centro_costarricense_ciencia_y_cultura.png"),
  "museo-filatelico-de-correos-de-costa-rica": require("../../assets/descubre/arte-cultural/museo_filatelico.png"),
  "biblioteca-nacional-miguel-obregon-lizano": require("../../assets/descubre/arte-cultural/biblioteca_nacional_miguel.png"),
  "biblioteca-publica-de-hatillo": require("../../assets/descubre/arte-cultural/biblioteca_publica_hatillo.png"),
  "biblioteca-municipal-maria-luisa-porras-monge": require("../../assets/descubre/arte-cultural/biblioteca_municipal_maria_luisa.png"),
  "biblioteca-municipal-emma-gamboa-alvarado": require("../../assets/descubre/arte-cultural/biblioteca_municipal_gamboa.png"),
  "biblioteca-municipal-isidro-diaz-munoz": require("../../assets/descubre/arte-cultural/biblioteca_municipal_isidro.png"),
  "biblioteca-municipal-tulio-perlaza-salazar": require("../../assets/descubre/arte-cultural/biblioteca_municipal_tulio_perlaza.png"),
  "biblioteca-municipal-rafael-angel-calderon-guardia": require("../../assets/descubre/arte-cultural/museo_rafael_angel_calderon_guardia.png"),
  "biblioteca-municipal-rafael-angel-arias-gomez": require("../../assets/descubre/arte-cultural/biblioteca_municipal_rafael_angel.png"),
  "biblioteca-municipal-carmen-lyra": require("../../assets/descubre/arte-cultural/biblioteca_municipal_carmen_lyra.png"),
  "teatro-nacional": require("../../assets/descubre/arte-cultural/teatro_nacional.png"),
  "teatro-popular-melico-salazar": require("../../assets/descubre/arte-cultural/teatro_popular_melico.png"),
  "teatro-la-aduana-alberto-canas-escalante": require("../../assets/descubre/arte-cultural/teatro_la_aduana.png"),
  "teatro-1887-de-la-compania-nacional-de-teatro": require("../../assets/descubre/arte-cultural/teatro_1887.png"),
  "teatro-de-la-danza-de-la-compania-nacional-de-danza": require("../../assets/descubre/arte-cultural/teatro_de_la_danza.png"),
  "teatro-auditorio-nacional": require("../../assets/descubre/arte-cultural/teatro_auditorio_nacional.png"),
  "alianza-francesa-de-costa-rica": require("../../assets/descubre/arte-cultural/alianza_francesa_costa_rica.png"),
  "centro-multicultural-botica-solera": require("../../assets/descubre/arte-cultural/centro_multicultural_botica_solera.png"),
  "centro-cultural-de-espana-en-costa-rica": require("../../assets/descubre/arte-cultural/centro_cultural_de_espana.png"),
  "centro-cultural-britanico": require("../../assets/descubre/arte-cultural/centro_cultural_britanico.png"),
  "la-casa-del-cuno": require("../../assets/descubre/arte-cultural/la_casa_del_cuno.png"),
  "antigua-aduana": require("../../assets/descubre/arte-cultural/antigua_aduana.png"),
  "sendero-escalante": require("../../assets/descubre/arte-cultural/sendero_escalante.png"),
  "centro-cultural-costarricense-norteamericano-sabana-branch": require("../../assets/descubre/arte-cultural/centro_costarricense_ciencia_y_cultura.png"),
  "centro-nacional-de-la-cultura-cenac": require("../../assets/descubre/arte-cultural/centro_nacional_cultura.png"),
  "plaza-de-la-cultura": require("../../assets/descubre/arte-cultural/plaza_de_la_cultura.png"),
  "plaza-de-la-democracia-y-la-abolicion-del-ejercito": require("../../assets/descubre/arte-cultural/plaza_democracia_abolicion.png"),
  "plaza-de-las-artes": require("../../assets/descubre/arte-cultural/plaza_de_las_artes.png"),
  "plaza-juan-mora-fernandez": require("../../assets/descubre/arte-cultural/plaza_juan_mora_fernandez.png"),
  "plaza-juan-rafael-mora-porras": require("../../assets/descubre/arte-cultural/plaza_juan_rafael_mora.png"),
  "parque-de-las-garantias-sociales": require("../../assets/descubre/arte-cultural/parque_las_garantias.png"),
  "barrio-aranjuez": require("../../assets/descubre/arte-cultural/barrio_aranjuez.png"),
  "barrio-otoya": require("../../assets/descubre/arte-cultural/barrio_otoya.png"),
  "cementerio-general": require("../../assets/descubre/arte-cultural/cementerio_general.png"),
  "cementerio-obrero-municipalidad-de-san-jose": require("../../assets/descubre/arte-cultural/cementerio_obrero_municipalidad.png"),
  "cementerio-extranjero": require("../../assets/descubre/arte-cultural/cementerio_extranjero.png"),
  "galeria-taletum": require("../../assets/descubre/arte-cultural/galeria_taletum.png"),
  "galeria-valanti": require("../../assets/descubre/arte-cultural/galeria_valanti.png"),
  "galeria-nacional": require("../../assets/descubre/arte-cultural/galeria_nacional.png"),
  "galeria-sophia-wanamaker": require("../../assets/descubre/arte-cultural/galeria_sofia.png"),
  "sala-garbo": require("../../assets/descubre/arte-cultural/sala_garbo.png"),
  "cine-magaly": require("../../assets/descubre/arte-cultural/cine_magaly.png"),
  "centro-de-cine-costarricense": require("../../assets/descubre/arte-cultural/centro_cine_costa_rica.png"),
  "iglesia-de-la-catedral-metropolitana": require("../../assets/descubre/arte-cultural/catedral_metropolitana.png"),
  "iglesia-de-nuestra-senora-de-la-soledad": require("../../assets/descubre/arte-cultural/iglesia_soledad.png"),
  "iglesia-de-la-dolorosa": require("../../assets/descubre/arte-cultural/iglesia_dolorosa.png"),
  "la-iglesia-de-nuestra-senora-de-la-merced": require("../../assets/descubre/arte-cultural/iglesia_nuestra_senora_merced.png"),
  "iglesia-de-nuestra-senora-del-carmen": require("../../assets/descubre/arte-cultural/iglesia_de_nuestra_senora_del_carmen.png"),
  "iglesia-santa-teresita-del-nino-jesus": require("../../assets/descubre/arte-cultural/iglesia_santa_teresita.png"),
  "iron-church": require("../../assets/descubre/arte-cultural/iron_church.png"),
  "parque-metropolitano-la-sabana-padre-chapui": require("../../assets/descubre/deporte-recreacion/parque_metropolitano_la_sabana_bg.png"),
  "estadio-nacional-de-costa-rica": require("../../assets/descubre/deporte-recreacion/Estadio_nacional_costa_rica_bg.png"),
  "parque-diversiones-dr-roberto-ortiz-brenes": require("../../assets/descubre/deporte-recreacion/Parque_diversiones_dr_roberto_bg.png"),
  "gimnasio-nacional-eddy-cortes": require("../../assets/descubre/deporte-recreacion/gimnasio_nacional_eddy_cortes_bg.png"),
  "domingos-familiares-sin-humo": require("../../assets/descubre/deporte-recreacion/gomingos_familiares_sin_humo_bg.png"),
  "mercado-central-de-san-jose": require("../../assets/descubre/economia-local/mercado_central_san_jose_bg.png"),
  "mercado-municipal-de-artesanias-de-san-jose": require("../../assets/descubre/economia-local/mercado_municipal_artesanias_bg.png"),
  "mercado-mayoreo": require("../../assets/descubre/economia-local/mercado_mayoreo_bg.png"),
  "mercado-del-antiguo-registro-civil": require("../../assets/descubre/economia-local/mercado_antiguo_registro_civil_bg.png"),
  "mercado-de-calle-16": require("../../assets/descubre/economia-local/mercado_de_calle_bg.png"),
  "paseo-colon": require("../../assets/descubre/economia-local/paseo_colon_bg.png"),
  "avenida-central": require("../../assets/descubre/economia-local/avenida_central_bg.png"),
  "boulevard-avenida-cuatro": require("../../assets/descubre/economia-local/boulevard_avenida_cuatro_bg.png"),
  "barrio-chino": require("../../assets/descubre/economia-local/barrio_chino_bg.png"),
  "gran-centro-comercial-del-sur": require("../../assets/descubre/economia-local/gran_centro_comercial_del_sur_bg.png"),
  "plaza-mayor": require("../../assets/descubre/economia-local/plaza_mayor_bg.png"),
  "centro-comercial-plaza-america": require("../../assets/descubre/economia-local/centro_comercial_plaza_america_bg.png"),
  "bambu-eco-plaza": require("../../assets/descubre/economia-local/bambu_eco_plaza_bg.png"),
  "feria-del-agricultor-en-san-francisco-de-dos-rios": require("../../assets/descubre/economia-local/feria_del_agricultro_en_san_francisco_bg.png"),
  "feria-del-agricultor-en-zapote": require("../../assets/descubre/economia-local/feria_del_agricultor_en_zapote_bg.png"),
  "feria-del-agricultor-en-hatillo": require("../../assets/descubre/economia-local/feria_del_agricultor_en_hatillo_bg.png"),
  "feria-del-agricultor-en-plaza-gonzalez-viquez": require("../../assets/descubre/economia-local/feria_del_agriculto_en_plaza_gonzalez_bg.png"),
  "feria-del-agricultor-en-san-sebastian": require("../../assets/descubre/economia-local/feria_del_agricultor_en_san_sebastian_bg.png"),
  "feria-del-agricultor-en-pavas": require("../../assets/descubre/economia-local/feria_del_agricultor_en_pavas_bg.png"),
  "feria-verde-en-aranjuez": require("../../assets/descubre/economia-local/feria_verde_en_aranjuez_bg.png"),
  "barrio-amon": require("../../assets/descubre/gastronomia/barrio_amon_bg.png"),
  "barrio-la-california": require("../../assets/descubre/gastronomia/barrio_la_california_bg.png"),
  "barrio-escalante": require("../../assets/descubre/gastronomia/barrio_escalante_bg.png"),
  "atractivos-gastronomicos-parque-okayama-y-alrededores": require("../../assets/descubre/gastronomia/atractivos_gastronomicos_parque_okayama_y_alrededores_bg.png"),
  "atractivos-gastronomicos-boulebard-ernesto-rohrmoser-y-alrededores": require("../../assets/descubre/gastronomia/atractivos_gastronomicos_boulebard_ernesto_rohrmoser_y_alrededores_bg.png"),
  "feria-japonesa": require("../../assets/descubre/gastronomia/feria_japonesa_bg.png"),
};
type LocalImageKey = keyof typeof LOCAL_IMAGES;

function getSourceFromKeyOrUrl(keyOrUrl?: string) {
  if (!keyOrUrl) return LOCAL_IMAGES["parque-nacional"];

  // 1. CHECK DE URL COMPLETA (Remote)
  if (keyOrUrl.startsWith("http://") || keyOrUrl.startsWith("https://")) {
    return { uri: keyOrUrl };
  }

  // 2. CHECK DE RUTA PARCIAL DEL BACKEND (e.g. "articles/1/image.png")
  if (keyOrUrl.includes('/')) { 
      const fullUrl = `${API_BASE}/storage/${keyOrUrl}`;
      if (__DEV__) {
          console.log(`[EventDetailScreen] Usando URL remota: ${fullUrl}`);
      }
      return { uri: fullUrl };
  }


  // 3. CHECK DE CLAVE LOCAL (Fallback)
  if ((keyOrUrl as LocalImageKey) in LOCAL_IMAGES) {
    return LOCAL_IMAGES[keyOrUrl as LocalImageKey];
  }
  
  if (__DEV__) {
    // Si la clave no es reconocida, y no es una URL, emitimos la advertencia.
    console.warn(`[EventDetailScreen] Clave/URL desconocida: "${keyOrUrl}". Usando fallback local.`);
  }

  // 4. Fallback final
  return LOCAL_IMAGES["parque-nacional"];
}

export default function EventDetailScreen({
  title = "",
  description = ``,
  coords = { lat: 9.91093, lng: -84.04611 },
  imgMain = "",
  indications = "",
}: Props) {
  
  // ==========================================
  // === LOGICA DE PARSEO DE IMAGEN (FIJA) ===
  // ==========================================
  const images = useMemo<string[]>(() => {
    if (!imgMain) return []; // Retorna array vacío si no hay prop

    if (typeof imgMain === 'string' && imgMain.startsWith('[')) {
        try {
            const parsed = JSON.parse(imgMain);
            
            if (Array.isArray(parsed)) {
                // Filtramos elementos no string y devolvemos. Si el array es [], devuelve []
                return parsed.filter(i => typeof i === 'string' && i.length > 0);
            }
        } catch (e: any) {
            // Si el parseo JSON falla (ej: "[ ]" no es válido), retornamos un array vacío.
            console.warn("[EventDetailScreen] Error al intentar parsear JSON de imagen: " + e.message);
            return []; 
        }
    }
    // Si es una string (que no es un JSON array) o un array normal, lo devolvemos
    return Array.isArray(imgMain) ? imgMain : [imgMain];
  }, [imgMain]);
  
  // Array final de imágenes: Si 'images' es vacío, añadimos el fallback local.
  const finalImages = images.length === 0 ? ["parque-nacional"] : images;


  const hasIndications = typeof indications === "string" && indications.trim().length > 0;

  const router = useRouter();
  const pathname = usePathname();

  const handleBack = useCallback(
    (fallback: string = "/(tabs)/home") => {
      if (router.canGoBack()) {
        router.back();
        return;
      }
      const parent = pathname.split("/").slice(0, -1).join("/") || fallback;
      router.replace(parent as any);
    },
    [router, pathname]
  );

  // ===== Carrusel (si hay 2+) =====
  const { width } = Dimensions.get("window");
  const [activeIndex, setActiveIndex] = useState(0);
  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const i = Math.round(x / width);
    if (i !== activeIndex) setActiveIndex(i);
  };
  const scrollRef = useRef<ScrollView>(null);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back arrow */}
      <View style={styles.containerArrow}>
        <Pressable
          onPress={() => handleBack("/(tabs)/home")}
          hitSlop={12}
          android_ripple={{ color: "rgba(0,0,0,0.08)", borderless: false }}
          accessibilityRole="button"
          accessibilityLabel="Volver"
        >
          <Image
            source={require("../../assets/images/left_arrow.png")}
            style={styles.imageArrow}
            resizeMode="cover"
          />
        </Pressable>
      </View>

      {/* Título */}
      <View style={styles.containerText2}>
        <Image
          source={require("../../assets/images/map.png")}
          style={styles.image2}
          resizeMode="cover"
        />
        <Text style={styles.subtitle}>{title}</Text>
      </View>

      {/* Banner: 1 imagen -> ImageBackground; 2+ -> carrusel con puntitos */}
      {/* Siempre usamos finalImages para asegurar que haya al menos una imagen (la de fallback) */}
      {finalImages.length <= 1 ? (
        <ImageBackground source={getSourceFromKeyOrUrl(finalImages[0])} style={styles.banner} />
      ) : (
        <View>
          <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll}
            scrollEventThrottle={16}
            snapToAlignment="center"
            decelerationRate="fast"
            style={{ width }}
          >
            {finalImages.map((img, idx) => (
              <ImageBackground
                key={`${img}-${idx}`}
                source={getSourceFromKeyOrUrl(img)}
                style={[styles.banner, { width }]}
              />
            ))}
          </ScrollView>

          {/* Puntos (indicator) */}
          <View style={styles.dotsWrap}>
            {finalImages.map((_, i) => (
              <View key={i} style={[styles.dot, i === activeIndex && styles.dotActive]} />
            ))}
          </View>
        </View>
      )}

      {/* Indicaciones */}
      {hasIndications && (
        <View style={styles.block}>
          <View style={styles.containerText}>
            <Image
              source={require("../../assets/images/outline-map.png")}
              style={styles.indicationsImg}
              resizeMode="cover"
            />
            <Text style={styles.indicationsText}>{indications}</Text>
          </View>
        </View>
      )}

      {/* Acerca de */}
      <View style={styles.mapBlock}>
        <View style={styles.containerText3}>
          <Text style={styles.subtitle}>Acerca de</Text>
        </View>
        <Text style={styles.descLine}>{description}</Text>
      </View>

      {/* ¿Cómo llegar? */}
      <View style={styles.mapBlock}>
        <View style={styles.containerText}>
          <Text style={styles.subtitle}>¿Cómo llegar?</Text>
        </View>
        <LeafletMap
          lat={coords.lat ?? 9.9327}
          lng={coords.lng ?? -84.0796}
          zoom={15}
          markerTitle={title || "Ubicación"}
        />
      </View>
    </ScrollView>
  );
}

const TEXT_MUTED = "rgba(0,0,0,0.65)";

const styles = StyleSheet.create({
  container: { paddingBottom: 24, backgroundColor: "#FFFFFF" },

  banner: { height: 300, justifyContent: "flex-end" },

  // Indicador (puntitos)
  dotsWrap: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.6)",
  },
  dotActive: {
    backgroundColor: "#fff",
    width: 10,
    height: 10,
    borderRadius: 5,
  },

  card: {
    backgroundColor: "#D9D9D9",
    marginHorizontal: 12,
    marginTop: -65,
    padding: 24,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
  },
  title: { fontSize: 18, fontWeight: "600", letterSpacing: 0.3, color: "#1882CA" },

  row: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowLeft: { flexDirection: "row", alignItems: "center", gap: 8 },
  rowText: { fontSize: 14, color: TEXT_MUTED },

  section: { marginTop: 6, padding: 20 },
  desc: { fontSize: 14, lineHeight: 20, color: TEXT_MUTED },
  descLine: { fontSize: 14, color: "#000000", paddingHorizontal: 12, },

  actions: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    paddingTop: 0,
  },
  cta: {
    backgroundColor: "#111827",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  ctaText: { color: "#000000", fontWeight: "500", textDecorationLine: "underline", marginRight: 12 },

  socials: { flexDirection: "row", alignItems: "center", gap: 10 },
  iconBtn: { height: 24, width: 24, alignItems: "center", justifyContent: "center" },
  iconImg: { width: 24, height: 24, resizeMode: "contain" },

  mapBlock: { marginTop: 16, paddingHorizontal: 12, gap: 10 },
  block: { marginTop: 16, paddingHorizontal: 12 },
  mapTitle: { color: "#000", fontWeight: "800", letterSpacing: 0.3 },

  containerText: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    paddingBottom: 12,
  },
  containerText3: { flexDirection: "row", gap: 6, alignItems: "center" },
  containerText2: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    paddingBottom: 12,
    paddingLeft: 25,
  },
  image: { width: 16, height: 22 },
  image2: { width: 32, height: 32 },
  subtitle: { fontSize: 18, fontWeight: "600" },

  indicationsText: {
    fontSize: 16,
    color: "#000",
    flex: 1,
    flexWrap: "wrap",
    lineHeight: 22,
    paddingRight: 16,
    paddingLeft: 5,
  },
  indicationsImg: { width: 16, height: 20, flexShrink: 0 },

  containerArrow: {
    flexDirection: "row",
    gap: 6,
    justifyContent: "flex-start", // Cambiado a flex-start para mejor visualización
    paddingLeft: 20,
    paddingTop: 24,
    paddingBottom: 0,
    paddingHorizontal: 24,
    backgroundColor: "#FFFFFF",
  },
  imageArrow: { width: 13, height: 24 },

  videoWrap: {
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#000",
  },
  video: {
    width: "100%",
    height: 220,
  },
});