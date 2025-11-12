import React, { useMemo, useEffect, useState } from 'react';
import { Dimensions, Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';

import HorizontalGradientCarousel from '@/components/HorizontalGradientCarousel';
import HorizontalImageCarousel, { Item } from '@/components/HorizontalImageCarousel';
import LogoGrid from '@/components/LogoGrid';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { ResizeMode, Video } from 'expo-av';
import { usePathname, useRouter } from 'expo-router';

// Utilidad para barajar sin mutar el original
function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
const API_BASE = "https://msj.gruponbf-testlab.com";
const API_URL = `${API_BASE.replace(/\/+$/, "")}/api/articles`;
const authHeader = {};


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

const mapArticleForHome = (a: ArticleFromApi): Item => {
  let imageUrl = '';

  if (a.images && a.images.length > 0 && a.images[0].path) {
    const imagePath = a.images[0].path;
    const base = API_BASE.replace(/\/+$/, "");
    const path = imagePath.replace(/^\/+/, "");
    imageUrl = `${base}/storage/${path}`;
  } else if (a.image_url) {
    imageUrl = a.image_url;
  }

  return {
    id: String(a.id),
    source: { uri: imageUrl },
    title: a.category.toLocaleLowerCase() === "info. viajero" ? a.title : '',
    link: a.category.toLocaleLowerCase() === "info. viajero" ? '/info' : '/experiencias'
  };
};



export default function HomeScreen() {
  const router = useRouter();
  const pathname = usePathname();

  // 1. ESTADO PARA LOS DATOS DINÁMICOS
  const [data, setData] = useState<Item[]>([]);
  const [dataInfo, setDataInfo] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');


  useEffect(() => {
    const fetchExperencia = async () => {
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

        const mappedArticles = json.data as ArticleFromApi[];;

        // 3. FILTRAR POR "Experencia"
        const filteredData = mappedArticles
          .filter(item =>
            item.category.toLowerCase().includes("experiencia")
          )
          .map(mapArticleForHome);
        // 4. FILTRAR POR "Info al viajero"
        const filteredDataInfo = mappedArticles
          .filter(item =>
            item.category.toLowerCase().includes("info. viajero")
          )
          .map(mapArticleForHome);

        setData(filteredData);
        setDataInfo(filteredDataInfo);
      } catch (e: any) {
        console.error("Fetch Error en Experencia :", e);
        setError("Error al cargar el contenido. Intente de nuevo.");
      } finally {
        setLoading(false);
      }
    };

    fetchExperencia();
  }, []);


  const firstCarouselImgs: { id: string; source: ImageSourcePropType, link: any }[] = [ //Iconos-APP-MC2025_Arte-y-Cultura
    { id: '1', source: require('../../assets/images/bannerexperiencias/Iconos-APP-MC2025_Armonia-Urbana-2-2.png'), link: '/descubre/armonia_urbana' },
    { id: '2', source: require('../../assets/images/bannerexperiencias/Iconos-APP-MC2025_Arte-y-Cultura-2-2.png'), link: '/descubre/arte_cultural' },
    { id: '3', source: require('../../assets/images/bannerexperiencias/Iconos-APP-MC2025_Deporte-2-2.png'), link: '/descubre/deporte_recreacion' },
    { id: '4', source: require('../../assets/images/bannerexperiencias/Iconos-APP-MC2025_Economia-Local-2-2.png'), link: '/descubre/economia_local' },
    { id: '5', source: require('../../assets/images/bannerexperiencias/Iconos-APP-MC2025_Gastronomia-2-2.png'), link: '/descubre/gastronomia' },
    { id: '6', source: require('../../assets/images/bannerexperiencias/Iconos-APP-MC2025_Patrimonio-2-2.png'), link: '/descubre/patrimonio' },
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

  const thirdCarouselImgs: { id: string; source: ImageSourcePropType; title: string, link: any }[] = [
    { id: '1', source: require('../../assets/rutas/parque-nacional-INICIO-2.jpg'), title: 'Parque nacionales', link: '/rutas' },
    { id: '2', source: require('../../assets/rutas/Memoria-Nacional-INICIO.jpg'), title: 'Memoria Nacional', link: '/rutas' },
    { id: '3', source: require('../../assets/rutas/Huellas-del-Centro-Historico-INICIO.jpg'), title: 'Huellas del centro historíco', link: '/rutas' },
    { id: '4', source: require('../../assets/rutas/Entre-muros-y-memorias-INICIO.jpg'), title: 'Entre muros y memorias', link: '/rutas' },
    { id: '5', source: require('../../assets/rutas/Ecos-Urbanos-INICIO.jpg'), title: 'Ecos urbanos ', link: '/rutas' },
    { id: '6', source: require('../../assets/rutas/campanas-de-san-jose-INICIO.jpg'), title: 'Campanas de San José', link: '/rutas' },
  ];




  const partners = [
    { id: '1', source: require('../../assets/radar/Imagen(1).png'), url: 'https://www.facebook.com/museosbccr/?locale=es_LA ' },
  { id: '2', source: require('../../assets/radar/Imagen(2).png'), url: 'https://www.facebook.com/mac.mcj.cr/?locale=es_LA' },
  { id: '3', source: require('../../assets/radar/Imagen(3).png'), url: 'https://www.facebook.com/insmuseodeljade/?locale=es_LA' },
  { id: '4', source: require('../../assets/radar/Imagen(4).png'), url: 'https://www.facebook.com/musecal/?locale=es_LA' },
  { id: '5', source: require('../../assets/radar/Imagen(5).png'), url: 'https://www.facebook.com/museodelosninoscr' },
  { id: '6', source: require('../../assets/radar/Imagen(6).png'), url: 'https://www.facebook.com/museonacional.mcj.cr ' },
  { id: '7', source: require('../../assets/radar/Imagen(7).png'), url: 'https://www.madc.cr/ ' },
  { id: '8', source: require('../../assets/radar/Imagen(8).png'), url: 'https://www.facebook.com/MuseoPenitenciarioCR/?locale=es_LA ' },
  { id: '9', source: require('../../assets/radar/Imagen(9).png'), url: 'https://www.grupoice.com/wps/portal/ICE/quienessomos/sitio-educativo/museo-historico/nuestro-museo/' },
  { id: '10', source: require('../../assets/radar/Imagen(10).png'), url: 'https://www.facebook.com/costarica.cis/?locale=es_LA ' },
  { id: '11', source: require('../../assets/radar/Imagen(11).png'), url: 'https://www.facebook.com/museolasallecr/?locale=es_LA ' },
  { id: '12', source: require('../../assets/radar/Imagen(12).png'), url: 'https://www.facebook.com/melico.mcj.cr/?locale=es_LA ' },
  { id: '13', source: require('../../assets/radar/Imagen(13).png'), url: 'https://www.facebook.com/tn.mcj.cr/?locale=es_LA ' },
  { id: '14', source: require('../../assets/radar/Imagen(14).png'), url: 'https://www.facebook.com/cnt.mcj.cr/?locale=es_LA ' },
  { id: '15', source: require('../../assets/radar/Imagen(15).png'), url: 'https://www.facebook.com/cnd.mcj.cr/?locale=es_LA ' },
  { id: '16', source: require('../../assets/radar/Imagen(16).png'), url: 'https://www.facebook.com/CCECostaRica/ ' },
  { id: '17', source: require('../../assets/radar/Imagen(17).png'), url: 'https://www.facebook.com/CentroCulturalCostarricenseNorteamericano/' },
  { id: '18', source: require('../../assets/radar/Imagen(18).png'), url: 'https://britanico.cr/ ' },
  { id: '19', source: require('../../assets/radar/Imagen(19).png'), url: 'https://san-jose.diplo.de/cr-es ' },
  { id: '20', source: require('../../assets/radar/Imagen(20).png'), url: 'https://centrogoethe.com/#/ ' },
  { id: '21', source: require('../../assets/radar/Imagen(21).png'), url: 'https://www.facebook.com/sic.mcj.cr/?locale=es_LA' },
  { id: '22', source: require('../../assets/radar/Imagen(22).png'), url: 'https://www.facebook.com/mcj.cr/?locale=es_LA' },
  { id: '23', source: require('../../assets/radar/Imagen(23).png'), url: 'https://www.facebook.com/BalletNacionalCR/?locale=fr_FR' },
  { id: '24', source: require('../../assets/radar/Imagen(24).png'), url: 'https://www.facebook.com/AlianzaFrancesaCostaRica/?locale=es_LA' },
  { id: '25', source: require('../../assets/radar/Imagen(25).png'), url: 'https://www.facebook.com/FilarmonicadeCostaRica/?locale=es_LA' },
  { id: '26', source: require('../../assets/radar/Imagen(26).png'), url: 'https://www.facebook.com/patrimonio.mcj.cr/?locale=es_LA ' },
  { id: '27', source: require('../../assets/radar/Imagen(27).png'), url: 'https://www.facebook.com/casaculturalamonsj/' },
  { id: '28', source: require('../../assets/radar/Imagen(28).png'), url: 'https://www.facebook.com/Bandas.mcj.cr?locale=ms_MY ' },
  { id: '29', source: require('../../assets/radar/Imagen(29).png'), url: 'https://www.mcj.go.cr/agenda ' },
  { id: '30', source: require('../../assets/radar/Imagen(30).png'), url: 'https://www.facebook.com/people/CCDR-San-Jos%C3%A9-Oficial/61566521549375/?_rdr ' },
  { id: '31', source: require('../../assets/radar/Imagen(31).png'), url: 'https://home.passline.com/home' },
  { id: '32', source: require('../../assets/radar/Imagen(32).png'), url: 'https://www.facebook.com/costavida.presenta/?locale=es_LA' },
  { id: '33', source: require('../../assets/radar/Imagen(33).png'), url: 'https://oneticketcr.com/ ' },
  { id: '34', source: require('../../assets/radar/Imagen(34).png'), url: 'https://publitickets.com/ ' },
  { id: '35', source: require('../../assets/radar/Imagen(35).png'), url: 'https://www.eticket.cr/ ' },
  { id: '36', source: require('../../assets/radar/Imagen(36).png'), url: 'https://arceyut.com/ ' },
  { id: '37', source: require('../../assets/radar/Imagen(37).png'), url: 'https://moveconcerts.com/us/ ' },
  { id: '38', source: require('../../assets/radar/Imagen(38).png'), url: 'https://www.museocostarica.go.cr/visitar/ ' },
  { id: '39', source: require('../../assets/radar/Imagen(39).png'), url: 'https://starticket.cr/?srsltid=AfmBOopRGUZgLOEspuMkVxRVLfmf4RwefUexCSpcI4qO0yg98TuUqjyk ' },
  { id: '40', source: require('../../assets/radar/Imagen(40).png'), url: 'https://specialticket.net/ ' },
  { id: '41', source: require('../../assets/radar/Imagen(41).png'), url: 'https://salagarbo.com/cartelera/ ' },
  { id: '42', source: require('../../assets/radar/Imagen(42).png'), url: 'https://cinemagaly.com/' },
  { id: '43', source: require('../../assets/radar/Imagen(43).png'), url: 'https://www.centrodecine.go.cr/' },
  { id: '44', source: require('../../assets/radar/Imagen(44).png'), url: 'https://www.teatroeltriciclo.com/#/cartelera' },
  { id: '45', source: require('../../assets/radar/Imagen(45).png'), url: 'https://puestaenescena.cr/item/lucho-barahona/ ' },
  { id: '46', source: require('../../assets/radar/Imagen(46).png'), url: 'https://www.facebook.com/teatromolierecr/?locale=es_LA ' },
  { id: '47', source: require('../../assets/radar/Imagen(47).png'), url: 'https://teatronicobaker.com/ ' },
  { id: '48', source: require('../../assets/radar/Imagen(48).png'), url: 'https://www.facebook.com/teocentrocultural/?locale=es_LA ' },
  { id: '49', source: require('../../assets/radar/Imagen(49).png'), url: 'https://www.facebook.com/gallitopintocr/ ' },
  { id: '50', source: require('../../assets/radar/Imagen(50).png'), url: 'https://www.facebook.com/TeatroVargasCalvo/ ' },
  { id: '51', source: require('../../assets/radar/Imagen(51).png'), url: 'https://galeriatalentum.com/ ' },
  { id: '52', source: require('../../assets/radar/Imagen(52).png'), url: 'https://galeriavalanti.com/ ' },
  { id: '53', source: require('../../assets/radar/Imagen(53).png'), url: 'https://www.facebook.com/GaleriaNacionalCR/' },
  { id: '54', source: require('../../assets/radar/Imagen(54).png'), url: 'https://www.facebook.com/artepluralgaleria/ ' },
  { id: '55', source: require('../../assets/radar/Imagen(55).png'), url: 'https://www.facebook.com/GaleriasSophiaWanamaker/?locale=es_LA ' },
  { id: '56', source: require('../../assets/radar/Imagen(56).png'), url: 'https://www.facebook.com/elGranHotelCostaRica/ ' },
  { id: '57', source: require('../../assets/radar/Imagen(57).png'), url: 'https://www.facebook.com/hotelculturaplazasanjosecostarica/ ' },
  { id: '58', source: require('../../assets/radar/Imagen(58).png'), url: 'https://casarolandsanjose.com/es/ ' },
  { id: '59', source: require('../../assets/radar/Imagen(59).png'), url: 'https://www.hilton.com/es/hotels/sjonahh-hilton-san-jose-la-sabana/' },
  { id: '60', source: require('../../assets/radar/Imagen(60).png'), url: 'https://www.facebook.com/HiltonGardenInnSanJoseLaSabana/?locale=es_LA ' },
  { id: '61', source: require('../../assets/radar/Imagen(61).png'), url: 'https://www.facebook.com/BarceloSanJose/ ' },
  { id: '62', source: require('../../assets/radar/Imagen(62).png'), url: 'https://www.ihg.com/crowneplaza/hotels/us/en/san-jose/sjocp/hoteldetail ' },
  { id: '63', source: require('../../assets/radar/Imagen(63).png'), url: 'https://www.facebook.com/DSabanaHOTELSanJoseCostaRica' },
  { id: '64', source: require('../../assets/radar/Imagen(64).png'), url: 'https://www.facebook.com/casacondehotel/?locale=gn_PY' },
  { id: '65', source: require('../../assets/radar/Imagen(65).png'), url: 'https://www.facebook.com/hotelambassadorcr/ ' },
  { id: '66', source: require('../../assets/radar/Imagen(66).png'), url: 'https://www.facebook.com/hotelgranodeoro/?locale=es_LA' },
  { id: '67', source: require('../../assets/radar/Imagen(67).png'), url: 'https://www.facebook.com/HotelBoutiqueParquedelLago/ ' },
  { id: '68', source: require('../../assets/radar/Imagen(68).png'), url: 'https://www.facebook.com/autenticohotel ' },
  { id: '69', source: require('../../assets/radar/Imagen(69).png'), url: 'https://www.facebook.com/KCHotelSanJose/ ' },
  { id: '70', source: require('../../assets/radar/Imagen(70).png'), url: 'https://www.facebook.com/rincondelvallehotelysuites/?locale=es_LA ' },
  { id: '71', source: require('../../assets/radar/Imagen(71).png'), url: 'https://www.facebook.com/hotelpalmarealsanjose/ ' },
  { id: '72', source: require('../../assets/radar/Imagen(72).png'), url: 'https://www.suitescristina.com/ ' },
  { id: '73', source: require('../../assets/radar/Imagen(73).png'), url: 'https://www.hotel-presidente.com/es/' },
  { id: '74', source: require('../../assets/radar/Imagen(74).png'), url: 'https://www.balmoral.co.cr/es/' },
  { id: '75', source: require('../../assets/radar/Imagen(75).png'), url: 'https://www.facebook.com/SleepInnHotelPaseoLasDamas/' },
  { id: '76', source: require('../../assets/radar/Imagen(76).png'), url: 'https://www.facebook.com/deltabymarriottsanjoseaurola ' },
  { id: '77', source: require('../../assets/radar/Imagen(77).png'), url: 'https://www.facebook.com/HotelIrazu/ ' },
  { id: '78', source: require('../../assets/radar/Imagen(78).png'), url: 'https://urbangreenhotel.com/es/ ' },
  { id: '79', source: require('../../assets/radar/Imagen(79).png'), url: 'https://www.facebook.com/dunninncr/ ' },
  { id: '80', source: require('../../assets/radar/Imagen(80).png'), url: 'https://www.thevictorianhotelcr.com/ ' },
  { id: '81', source: require('../../assets/radar/Imagen(81).png'), url: 'https://www.facebook.com/RepublicaCasaCervecera ' },
  { id: '82', source: require('../../assets/radar/Imagen(82).png'), url: 'https://www.facebook.com/CahuitaTownCR/ ' },
  { id: '83', source: require('../../assets/radar/Imagen(83).png'), url: 'https://www.facebook.com/amonsolarcr/ ' },
  { id: '84', source: require('../../assets/radar/Imagen(84).png'), url: 'https://www.facebook.com/sotanocr/ ' },
  { id: '85', source: require('../../assets/radar/Imagen(85).png'), url: 'https://www.facebook.com/cafelamancha/ ' },
  { id: '86', source: require('../../assets/radar/Imagen(86).png'), url: 'https://www.facebook.com/safari.bar.kilates/' },
  { id: '87', source: require('../../assets/radar/Imagen(87).png'), url: 'https://www.facebook.com/p/El-Social-Sabana-100092673705169/ ' },
  { id: '88', source: require('../../assets/radar/Imagen(88).png'), url: 'https://www.facebook.com/elsocialcr/?locale=es_LA ' },
  { id: '89', source: require('../../assets/radar/Imagen(89).png'), url: 'https://www.facebook.com/laconchalora/ ' },
  { id: '90', source: require('../../assets/radar/Imagen(90).png'), url: 'https://www.facebook.com/CostaRicaBeerFactory ' },
  { id: '91', source: require('../../assets/radar/Imagen(91).png'), url: 'https://www.facebook.com/elcaferojo/ ' },
  { id: '92', source: require('../../assets/radar/Imagen(92).png'), url: 'https://www.facebook.com/OctoberSixCafe/ ' },
  { id: '93', source: require('../../assets/radar/Imagen(93).png'), url: 'https://www.facebook.com/elmuroartpub/ ' },
  { id: '94', source: require('../../assets/radar/Imagen(94).png'), url: 'https://www.facebook.com/p/La-Esquina-de-Buenos-Aires-Costa-Rica-100064618604541/ ' },
  { id: '95', source: require('../../assets/radar/Imagen(95).png'), url: 'https://www.facebook.com/antikcr/ ' },
  { id: '96', source: require('../../assets/radar/Imagen(96).png'), url: 'https://www.facebook.com/cafemundocr/?locale=es_LA ' },
  { id: '97', source: require('../../assets/radar/Imagen(97).png'), url: 'https://www.facebook.com/lolitacostarica/?locale=es_LA ' },
  { id: '98', source: require('../../assets/radar/Imagen(98).png'), url: 'https://www.facebook.com/tierragauchaparrillaargentina/?locale=es_LA ' },
  { id: '99', source: require('../../assets/radar/Imagen(99).png'), url: 'https://www.facebook.com/RestaurantesILPadrino/ ' },
  { id: '100', source: require('../../assets/radar/Imagen(100).png'), url: 'https://www.facebook.com/p/PALIO-Sabana-CLUB-100076268706748/ ' },
  { id: '101', source: require('../../assets/radar/Imagen(101).png'), url: 'https://www.facebook.com/muelle21cr/ ' },
  { id: '102', source: require('../../assets/radar/Imagen(102).png'), url: 'https://www.facebook.com/moodloungecr/' },
  { id: '103', source: require('../../assets/radar/Imagen(103).png'), url: 'https://www.facebook.com/almadelteatrocr/ ' },
  { id: '104', source: require('../../assets/radar/Imagen(104).png'), url: 'https://www.facebook.com/RestSilvestre/ ' },
  { id: '105', source: require('../../assets/radar/Imagen(105).png'), url: 'https://www.facebook.com/p/Mambo-Caf%C3%A9-100095572656993/ ' },
  { id: '106', source: require('../../assets/radar/Imagen(106).png'), url: 'https://www.facebook.com/cafebistroketzali/?locale=en_GB ' },
  { id: '107', source: require('../../assets/radar/Imagen(107).png'), url: 'https://www.facebook.com/CasaDomingaCafe/ ' },
  { id: '108', source: require('../../assets/radar/Imagen(108).png'), url: 'https://restaurantelimoncello.com/' },
  { id: '109', source: require('../../assets/radar/Imagen(109).png'), url: 'https://www.tripadvisor.es/Restaurant_Review-g309293-d23631422-Reviews-Emiliano_s_Gastro_Pub-San_Jose_San_Jose_Metro_Province_of_San_Jose.html' },
  { id: '110', source: require('../../assets/radar/Imagen(110).png'), url: 'https://www.facebook.com/KeyLargoCultural/ ' },
  { id: '111', source: require('../../assets/radar/Imagen(111).png'), url: 'https://casaaguizotes.com/ ' },
  { id: '112', source: require('../../assets/radar/Imagen(112).png'), url: 'https://www.facebook.com/people/Tapis-Tapas/61560496952945/ ' },
  { id: '113', source: require('../../assets/radar/Imagen(113).png'), url: 'https://delirio-cr.com/ ' },
  { id: '114', source: require('../../assets/radar/Imagen(114).png'), url: 'https://www.facebook.com/barlaterrazacr/ ' },
  { id: '115', source: require('../../assets/radar/Imagen(115).png'), url: 'https://www.facebook.com/inedito.cr/ ' },
  { id: '116', source: require('../../assets/radar/Imagen(116).png'), url: 'https://www.facebook.com/orvietorestaurante/ ' },
  { id: '117', source: require('../../assets/radar/Imagen(117).png'), url: 'https://www.facebook.com/MercadoLaCalifornia/' },
  { id: '118', source: require('../../assets/radar/Imagen(118).png'), url: 'https://www.instagram.com/apotecariocr/ ' },
  { id: '119', source: require('../../assets/radar/Imagen(119).png'), url: 'https://www.facebook.com/Mandragoragastropub/?locale=es_LA ' },
  { id: '120', source: require('../../assets/radar/Imagen(120).png'), url: 'https://www.facebook.com/mackavelabrewpub ' },
  { id: '121', source: require('../../assets/radar/Imagen(121).png'), url: 'https://www.facebook.com/p/N%C3%BAcleo-Gastro-61552271323281/?locale=es_LA ' },
  { id: '122', source: require('../../assets/radar/Imagen(122).png'), url: 'https://www.facebook.com/santopecadocostarica/ ' },
  { id: '123', source: require('../../assets/radar/Imagen(123).png'), url: 'https://www.facebook.com/azoteacalle7/?locale=es_LA ' },
  { id: '124', source: require('../../assets/radar/Imagen(124).png'), url: 'https://www.facebook.com/ElPatioDelBalmoral/ ' },
  { id: '125', source: require('../../assets/radar/Imagen(125).png'), url: 'https://www.facebook.com/SaporeTrattoria/ ' },
  { id: '126', source: require('../../assets/radar/Imagen(126).png'), url: 'https://www.gamcultural.com/?lang=es' },
  { id: '127', source: require('../../assets/radar/Imagen(127).png'), url: 'https://www.facebook.com/ParqueDiversiones' },
  { id: '128', source: require('../../assets/radar/Imagen(128).png'), url: 'https://www.facebook.com/El.Kubrick/' },
  { id: '129', source: require('../../assets/radar/Imagen(129).png'), url: 'https://onecr.com/' },
  { id: '130', source: require('../../assets/radar/Imagen(130).png'), url: 'https://puestaenescena.cr/item/arlequin/' },
  { id: '131', source: require('../../assets/radar/Imagen(131).png'), url: 'https://www.facebook.com/sinfonicanacionalcr/?locale=es_LA' },
  { id: '132', source: require('../../assets/radar/Imagen(132).png'), url: 'https://www.facebook.com/junglebarcr/' },
  { id: '133', source: require('../../assets/radar/Imagen(133).png'), url: 'https://www.facebook.com/teatrotorrescr/?locale=es_LA' },
  { id: '134', source: require('../../assets/radar/Imagen(134).png'), url: 'https://www.icoder.go.cr/directorio-entidades-deportivas/1015-federaciones-y-asociaciones-de-representacion-nacional ' },
  { id: '135', source: require('../../assets/radar/Imagen(135).png'), url: 'https://teatro-lamascara.com/' },
  { id: '136', source: require('../../assets/radar/Imagen(136).png'), url: 'https://www.facebook.com/centralpubcr' },
  { id: '137', source: require('../../assets/radar/Imagen(137).png'), url: 'https://www.facebook.com/ElObsevatorioBar/' },
  { id: '138', source: require('../../assets/radar/Imagen(138).png'), url: 'https://boleteria.museocr.org/ ' },





   
    

    

    

    

    

    

    

    






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
          data={data}
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
          data={dataInfo}
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
