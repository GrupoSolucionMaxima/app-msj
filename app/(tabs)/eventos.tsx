// app/(tabs)/TabTwoScreen.tsx
import { useRouter,usePathname } from 'expo-router';
import React, { useState,useEffect } from 'react';
import CoverflowCarousel, { CoverItem } from '@/components/carousels/CoverflowCarousel';
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

  let imageUrl = '';

  if (a.images && a.images.length > 0 && a.images[0].path) {
    const imagePath = a.images[0].path;
    const base = API_BASE.replace(/\/+$/, "");
    const path = imagePath.replace(/^\/+/, "");
    imageUrl = `${base}/storage/${path}`;
  } else if (a.image_url) {
    imageUrl = a.image_url;
  }

  const categoryColor = a.category.toLowerCase().includes("eventos") ? 'bg-[#EE3048]' : 'bg-primary';

  return {
    id: String(a.id),
    title: a.title,
    category: a.category,
    notes: a.notes ?? "",
    publishDate,
    uploadDate,
    status: computeStatus(publishDate, a.status),

    image_url: imageUrl,

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
      pathname: '/info/[id]',
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
  };
};
export default function TabTwoScreen() {
  const [q, setQ] = useState('');

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
            item.category.toLowerCase().includes("eventos")
          )
          .map(mapApiDataToCoverItem);

        setData(filteredData);

      } catch (e: any) {
        console.error("Fetch Error en eventos:", e);
        setError("Error al cargar el contenido. Intente de nuevo.");
      } finally {
        setLoading(false);
      }
    };

    fetchEconomiaLocal();
  }, []);
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
