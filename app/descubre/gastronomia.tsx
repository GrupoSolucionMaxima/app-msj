import CoverflowCarousel, { CoverItem } from '@/components/carousels/CoverflowCarousel';
import { usePathname, useRouter } from 'expo-router';
import React, { useCallback, useState, useEffect } from 'react';
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

export interface ContentItem {
  id: string;
  title: string;
  category: string;
  uploadDate: string;
  publishDate: string;
  status: "queue" | "finished";
  notes: string;
  categoryColor?: string;
}

type ImageFromApi = {
  id: number;
  path: string;
  sort_order: number;
  created_at?: string | null;
};

type ArticleFromApi = {
  id: number;
  title: string;
  category: string;
  notes: string | null;
  publish_date: string;
  created_at: string | null;
  status?: "queue" | "finished";
  images?: ImageFromApi[];
  image_url?: string;
  description?: string;
  location?: string;
  duration?: string;
  stops?: string;
  difficulty?: string;
  event_time?: string;
};

type HomeContentItem = ContentItem & Partial<ArticleFromApi>;

const API_BASE = "https://msj.gruponbf-testlab.com";
const API_URL = `${API_BASE.replace(/\/+$/, "")}/api/articles`;

const authHeader = {};

const formatDate = (d?: string | null) => {
  if (!d) return "";
  return d.length >= 10 ? d.slice(0, 10) : d;
};

const computeStatus = (publishDate: string, incoming?: "queue" | "finished"): "queue" | "finished" => {
  if (incoming === "queue" || incoming === "finished") return incoming;
  const today = new Date().toISOString().slice(0, 10);
  return publishDate && publishDate <= today ? "finished" : "queue";
};

const mapArticleForHome = (a: ArticleFromApi): HomeContentItem => {
  const publishDate = formatDate(a.publish_date);
  const uploadDate = formatDate(a.created_at);

  let imagenes = [];
  let imageUrl = '';
  if (a.images?.length) {
    a.images?.forEach(element => {
      imagenes.push(element.path)
    });
  }

  if (a.images && a.images.length > 0 && a.images[0].path) {
    const imagePath = a.images[0].path;
    const base = API_BASE.replace(/\/+$/, "");
    const path = imagePath.replace(/^\/+/, "");
    imageUrl = `${base}/storage/${path}`;
  } else if (a.image_url) {
    imageUrl = a.image_url;
  }

  const categoryColor = a.category.toLowerCase().includes("gastronomía") ? 'bg-[#EE3048]' : 'bg-primary';

  return {
    id: String(a.id),
    title: a.title,
    category: a.category,
    notes: a.notes ?? "",
    publishDate,
    uploadDate,
    status: computeStatus(publishDate, a.status),

    image_url: imageUrl,
    images: a.images,
    description: a.description,
    location: a.location,
    duration: a.duration,
    stops: a.stops,
    difficulty: a.difficulty,
    event_time: a.event_time,
    categoryColor: categoryColor
  };
};

const mapApiDataToCoverItem = (item: HomeContentItem): CoverItem => {
  const DEFAULT_LAT = '9.9327';
  const DEFAULT_LNG = '-84.0796';

  let lat = DEFAULT_LAT;
  let lng = DEFAULT_LNG;
  let indications = item.location || '';
  let imagenes: string[] = [];

  if (item.images?.length) {
    item.images?.forEach(element => {
      imagenes.push(element.path)
    });
  }
  if (item.location) {
    const parts = item.location.split(',');
    if (parts.length >= 2) {
      lat = parts[0].trim();
      lng = parts[1].trim();
      indications = item.location;
    }
  }

  const imageSource = item.image_url
    ? { uri: item.image_url }
    : require('../../assets/descubre/armonia-urbana/parque-nacional.png');

  return {
    id: item.id,
    image: imageSource as any,
    title: item.title,
    link: {
      pathname: './[id]',
      params: {
        id: item.id,
        title: item.title,
        lat: lat,
        lng: lng,
        imgMain: JSON.stringify([item.image_url]),
        indications: indications,
        description: item.description || item.notes || 'Sin descripción.',
      }
    },
    imagenes: imagenes,
  };
};

export default function ArteCultural() {

  const router = useRouter();
  const pathname = usePathname();

  // 1. ESTADO PARA LOS DATOS DINÁMICOS
  const [data, setData] = useState<CoverItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  // 2. FUNCIÓN DE FETCH DE DATOS
  useEffect(() => {
    const fetchEconomiaLocal = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(API_URL, {
          method: "GET",
          headers: {
            Accept: "application/json",
            ...authHeader,
          },
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`HTTP ${res.status} - ${text}`);
        }

        const json = await res.json();

        if (!json || json.ok !== true || !Array.isArray(json.data)) {
          throw new Error("Respuesta inesperada del servidor");
        }

        const mappedArticles = json.data.map(mapArticleForHome) as HomeContentItem[];

        // 3. FILTRAR POR "Armonía Urbana"
        const filteredData = mappedArticles
          .filter(item =>
            item.category.toLowerCase().includes("gastronomía")
          )
          .map(mapApiDataToCoverItem);

        setData(filteredData);

      } catch (e: any) {
        console.error("Fetch Error en ArmoniaUrbana:", e);
        setError("Error al cargar el contenido. Intente de nuevo.");
      } finally {
        setLoading(false);
      }
    };

    fetchEconomiaLocal();
  }, []);


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

  // 4. Renderizado con manejo de estados
  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>Cargando contenido...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.statusContainer}>
          <Text style={styles.errorText}>❌ {error}</Text>
        </View>
      );
    }

    if (data.length === 0) {
      return (
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>No se encontró contenido de Armonía Urbana.</Text>
        </View>
      );
    }
    console.log("Estos datos: ", data[0])
    return <CoverflowCarousel data={data} />;
  }
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
        {renderContent()}
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
  statusContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  statusText: { fontSize: 16, color: '#333' },
  errorText: { fontSize: 16, color: 'red', fontWeight: 'bold' },
});
