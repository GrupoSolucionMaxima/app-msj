// components/events/EventDetailScreen.tsx
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import {
    ColorValue,
    Image,
    ImageBackground,
    ImageSourcePropType,
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import LeafletMap from "../LeafletMap";

const LOCAL = {
    // banners / comunes
    "banner-default": require("../../assets/events/article-1.png"),
    "parque-nacional": require("../../assets/images/parque-nacional.png"),
    "art-2": require("../../assets/events/art_2.jpg"),

    "ciudad-creativa": require("../../assets/images/main_ciudad_creativa.png"),
    "terminal-buses": require("../../assets/info/hilo_urbano_art_bg_1.png"),

    "chepecletas-logo": require("../../assets/experiencias/chepecletas_logo.png"),

    // mapa
    "map-icon": require("../../assets/map-ta.png"),

    // redes
    "icon-facebook": require("../../assets/social_icons/facebook-icon.png"),
    "icon-instagram": require("../../assets/social_icons/instagram-icon.png"),
    "icon-tiktok": require("../../assets/social_icons/tiktok-icon.png"),
} as const;

type LocalKey = keyof typeof LOCAL;
type LocalImageProp = LocalKey | ImageSourcePropType; // clave o require(...)

function localSrc(src: LocalImageProp | undefined, fallback: LocalKey): ImageSourcePropType {

    if (!src) return LOCAL[fallback];
    // if (typeof nada === 'string' ) return {"uri": JSON.parse(nada)} ;
    if (typeof src === "number") return src; // require(...)

    return LOCAL[src as LocalKey] ?? LOCAL[fallback]; // clave
}

// helper para permitir "undefined" si la clave no existe
function localMaybe(src?: LocalImageProp): ImageSourcePropType | undefined {
    if (!src) return undefined;
    if (typeof src === "number") return src;
    return LOCAL[src as LocalKey];
}

export type SocialLinks = Partial<
    Record<"facebook" | "instagram" | "tiktok" | "web" | "youtube" | "x" | "whatsapp", string>
>;

type Props = {
    /* Banner */
    bannerImage: LocalImageProp; // clave local o require(...)
    bannerHeight?: number;
    bannerOverlay?: boolean;

    /* Cabecera */
    title?: string;
    monthTag?: string;
    venueName?: string;

    // Logo opcional para reemplazar textos de la card
    headerLogo?: LocalImageProp;
    headerLogoHeight?: number;

    /* Cuerpo */
    description?: string;
    addressLines?: string[];

    /* Contacto */
    phone?: string;
    email?: string;

    /* CTA */
    ctaLabel?: string;
    ctaUrl?: string;
    onPressCTA?: () => void;

    /* Redes (links) + íconos (opcionales por clave/require) */
    social?: SocialLinks;
    socialIcons?: Partial<Record<keyof SocialLinks, LocalImageProp>>;

    /* Mapa */
    showMap?: boolean;
    mapTitle?: string;
    mapIconImage?: LocalImageProp;
    coords: { lat: number; lng: number };
    mapZoom?: number;

    /* Tema */
    cardBg?: ColorValue;
    textMuted?: ColorValue;
    primaryColor?: ColorValue;

    /* Visibilidad */
    showAddress?: boolean;
    showCTA?: boolean;
    showSocials?: boolean;
};

export default function ExperiencDetailScreen({
    // Banner
    bannerImage,
    bannerHeight = 300,
    bannerOverlay = false,

    // Cabecera
    title = "Título del evento",
    monthTag = "Todo el Mes",
    venueName = "Lugar del evento",

    // Logo opcional
    headerLogo,
    headerLogoHeight = 60,

    // Cuerpo
    description = "",
    addressLines = [],

    // Contacto
    phone,
    email,

    // CTA
    ctaLabel = "Más información",
    ctaUrl,
    onPressCTA,

    // Redes
    social = {},
    socialIcons = {},

    // Mapa
    showMap = true,
    mapTitle = "¿Cómo llegar?",
    mapIconImage,
    coords,
    mapZoom = 15,

    // Tema
    cardBg = "#D9D9D9",
    textMuted = "rgba(0,0,0,0.65)",
    primaryColor = "#1882CA",

    // Visibilidad
    showAddress = true,
    showCTA = true,
    showSocials = true,
}: Props) {
    const open = (url?: string) => url && Linking.openURL(url).catch(() => null);
    //pruebas 
    // Resolver imágenes locales JSON.parse(bannerImage)
    const imageUrl = useMemo(() => localSrc(bannerImage, "banner-default"), [bannerImage]);
    //console.log("imagen mas cabrona", bannerImage)
    const cleaner = () => {
        if (typeof bannerImage === 'string') { return JSON.parse(bannerImage) }
        return ["null"];
    };
    const hola=cleaner();
    const imagen = { "uri": hola[0] };
    const mapIconSrc = useMemo(() => localSrc(mapIconImage, "map-icon"), [mapIconImage]);

    // resolver logo (puede ser undefined)
    const headerLogoSrc = useMemo(() => localMaybe(headerLogo), [headerLogo]);

    // Íconos para redes
    const iconsMap: Partial<Record<keyof SocialLinks, ImageSourcePropType>> = {
        facebook: localSrc(socialIcons.facebook ?? "icon-facebook", "icon-facebook"),
        instagram: localSrc(socialIcons.instagram ?? "icon-instagram", "icon-instagram"),
        tiktok: localSrc(socialIcons.tiktok ?? "icon-tiktok", "icon-tiktok"),
        web: socialIcons.web ? localSrc(socialIcons.web, "icon-facebook") : undefined,
        youtube: socialIcons.youtube ? localSrc(socialIcons.youtube, "icon-facebook") : undefined,
        x: socialIcons.x ? localSrc(socialIcons.x, "icon-facebook") : undefined,
        whatsapp: socialIcons.whatsapp ? localSrc(socialIcons.whatsapp, "icon-facebook") : undefined,
    };

    const onCTA = () => (onPressCTA ? onPressCTA() : open(ctaUrl));

    const showLogoOnly = !!headerLogoSrc;

    return (
        <ScrollView
            style={styles.screen} // 👈 flex:1 aquí
            contentContainerStyle={styles.container} // 👈 sin flex aquí
            nestedScrollEnabled
            scrollIndicatorInsets={{ right: 1 }}
        >
            {/* Banner */}
            <ImageBackground source={imagen} style={[styles.banner, { height: bannerHeight }]}>
                {bannerOverlay ? <View style={styles.bannerOverlay} /> : null}
            </ImageBackground>

            {/* Card principal */}
            <View style={[styles.card, { backgroundColor: cardBg }]}>
                {showLogoOnly ? (
                    <View style={styles.logoWrap}>
                        <Image
                            source={headerLogoSrc!}
                            style={[styles.logoImg, { height: headerLogoHeight }]}
                            resizeMode="contain"
                        />
                    </View>
                ) : (
                    <>
                        <Text style={[styles.title, { color: primaryColor }]}>{title}</Text>

                        {!!monthTag && (
                            <View style={styles.row}>
                                <View style={styles.rowLeft}>
                                    <Ionicons name="calendar-outline" size={18} />
                                    <Text style={[styles.rowText, { color: textMuted }]}>{monthTag}</Text>
                                </View>
                            </View>
                        )}

                        {!!venueName && (
                            <View style={[styles.row, { marginTop: 6 }]}>
                                <View style={styles.rowLeft}>
                                    <Ionicons name="location-outline" size={18} />
                                    <Text style={[styles.rowText, { color: textMuted }]}>{venueName}</Text>
                                </View>
                            </View>
                        )}
                    </>
                )}
            </View>

            {/* Descripción + dirección */}
            {(!!description || (showAddress && addressLines.length)) && (
                <View style={styles.section}>
                    {!!description && <Text style={[styles.desc, { color: textMuted }]}>{description}</Text>}

                    {showAddress && addressLines.length ? (
                        <View style={{ marginTop: 8 }}>
                            {addressLines.map((l, i) => (
                                <Text key={i} style={[styles.descLine, { color: textMuted }]}>
                                    {l}
                                </Text>
                            ))}
                        </View>
                    ) : null}
                </View>
            )}

            {/* CTA + redes */}
            {(showCTA || showSocials) && (
                <View style={styles.actions}>
                    {showCTA && !!ctaLabel ? (
                        <TouchableOpacity onPress={onCTA} activeOpacity={0.7}>
                            <Text style={styles.ctaText}>{ctaLabel}</Text>
                        </TouchableOpacity>
                    ) : null}

                    {showSocials && (
                        <View style={styles.socials}>
                            {Object.entries(social).map(([k, url]) => {
                                if (!url) return null;
                                const key = k as keyof SocialLinks;
                                const iconSource = iconsMap[key];
                                if (!iconSource) return null;
                                return (
                                    <TouchableOpacity
                                        key={k}
                                        onPress={() => open(url)}
                                        style={styles.iconBtn}
                                        accessibilityLabel={k}
                                    >
                                        <Image source={iconSource} style={styles.iconImg} />
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    )}
                </View>
            )}

            {/* Mapa */}
            {showMap && coords?.lat != null && coords?.lng != null && (
                <View style={styles.mapBlock}>
                    <View style={styles.containerText}>
                        <Image source={mapIconSrc} style={styles.image} resizeMode="cover" />
                        <Text style={styles.subtitle}>{mapTitle}</Text>
                    </View>
                    <LeafletMap
                        lat={coords.lat}
                        lng={coords.lng}
                        zoom={mapZoom}
                        markerTitle={`${venueName ?? ""}\n${phone ? `Tel: ${phone}\n` : ""}${email ?? ""}`}
                    />
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    // 👇 flex:1 aquí (ScrollView.style)
    screen: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },

    // 👇 sin flex aquí (contentContainer)
    container: {
        paddingBottom: 24,
        backgroundColor: "#FFFFFF",
    },

    banner: {
        justifyContent: "flex-end",
    },
    bannerOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.25)",
    },

    card: {
        marginHorizontal: 12,
        marginTop: -65,
        padding: 24,
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 8,
        backgroundColor: "#D9D9D9",
        borderRadius: 8,
    },

    // envoltorio para centrar el logo
    logoWrap: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 8,
    },
    // tamaño del logo controlado por prop headerLogoHeight
    logoImg: {
        width: "80%",
        alignSelf: "center",
    },

    title: { fontSize: 18, fontWeight: "600", letterSpacing: 0.3 },

    row: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    rowLeft: { flexDirection: "row", alignItems: "center", gap: 8 },
    rowText: { fontSize: 14 },

    section: { marginTop: 6, padding: 20 },
    desc: { fontSize: 14, lineHeight: 20 },
    descLine: { fontSize: 14 },

    actions: {
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
        paddingTop: 0,
        gap: 12,
    },
    ctaText: {
        color: "#000000",
        fontWeight: "500",
        textDecorationLine: "underline",
        marginRight: 12,
    },

    socials: { flexDirection: "row", alignItems: "center", gap: 10 },
    iconBtn: {
        height: 24,
        width: 24,
        alignItems: "center",
        justifyContent: "center",
    },
    iconImg: { width: 24, height: 24, resizeMode: "contain" },

    mapBlock: { marginTop: 16, paddingHorizontal: 12, gap: 10 },
    containerText: {
        flexDirection: "row",
        gap: 6,
        alignItems: "center",
        paddingBottom: 12,
    },
    image: { width: 16, height: 22 },
    subtitle: { fontSize: 18, fontWeight: "600" },
});
