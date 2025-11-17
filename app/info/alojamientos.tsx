import CoverflowCarousel, { CoverItem } from '@/components/carousels/CoverflowCarousel';
import { usePathname, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { extractCoordinates } from '@/utils/FoundFindParamaters';
import { Image, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';

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
    location_url?: string
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

    const categoryColor = a.category.toLowerCase().includes("embajadas") ? 'bg-[#EE3048]' : 'bg-primary';

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
        location_url: a.location_url,
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
    if (item.location_url) {
        let result = extractCoordinates(item.location_url)
        if (result.length > 1) {
            lat = result[0];
            lng = result[1];
        }
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
export default function alojamientos() {
    const router = useRouter();
    const pathname = usePathname();

    // 1. ESTADO PARA LOS DATOS DINÁMICOS
    const [data, setData] = useState<CoverItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');

    // 2. FUNCIÓN DE FETCH DE DATOS
    useEffect(() => {
        const fetchTourOperador = async () => {
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

                // 3. FILTRAR POR "Tour de operador"
                const filteredData = mappedArticles
                    .filter(item =>
                        item.category.toLowerCase().includes("alojamientos")
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

        fetchTourOperador();
    }, []);


    const handleBack = useCallback((fallback: string = '/(tabs)/home') => {
        if (router.canGoBack()) {
            router.back();
            return;
        }
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
                    <Text style={styles.statusText}>No se encontró contenido de Tour de Operadores.</Text>
                </View>
            );
        }
        // console.log("Estos datos: ", data[0])
        return <CoverflowCarousel data={data} />
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
                <Text style={styles.subtitle}>Alojamientos</Text>
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
        justifyContent: 'flex-start', // Cambiado a 'flex-start' para la flecha
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