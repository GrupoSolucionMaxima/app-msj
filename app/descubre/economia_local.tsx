import CoverflowCarousel, { CoverItem } from '@/components/carousels/CoverflowCarousel';
import { usePathname, useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { Image, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';


export const DATA: CoverItem[] = [
  {
    id: 'mercado-central-de-san-jose',
    image: require('../../assets/descubre/economia-local/mercado_central_san_jose.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'mercado-central-de-san-jose',
        title: 'Mercado Central de San José',
        lat: '',
        lng: '',
        imgMain: 'mercado-central-de-san-jose',
        indications: 'Avenida Central y 1ª',
        description:
          'El Mercado Central abrió en el año 1880,  es el mercado más grande de la ciudad y el primer mall del país, declarado Patrimonio Cultural por su increíble tradición e identidad. En sus estrechos callejones encontrará más de 200 puestos y restaurantes. Un buen sitio donde conocer la atmósfera local. Abierto de lunes a sábado de 7:30 a.m. a 7:00 p.m. Se ubica entre Avenida Central y 1ª.',
      },
    },
  },
  {
    id: 'mercado-municipal-de-artesanias-de-san-jose',
    image: require('../../assets/descubre/economia-local/mercado_municipal_artesanias.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'mercado-municipal-de-artesanias-de-san-jose',
        title: 'Mercado Municipal de Artesanías de San José',
        lat: '',
        lng: '',
        imgMain: 'mercado-municipal-de-artesanias-de-san-jose',
        indications: 'calle 5 y 7, avenida 6',
        description:
          'El Mercado Municipal de la Artesanía, abrió sus puertas en el año 2018,  tiene 86 locales de venta de artesanía y 3 accesos al mercado para público visitante. Aquí, los artesanos nacionales, venden sus productos a los nacionales y extranjeros. Abierto todos los días del año de 8:30 a 6:30, incluídos todos los feriados y festivos. Se ubica entre calle 5 y 7, avenida 6, frente al Parque de las Garantías Sociales',
      },
    },
  },
  {
    id: 'mercado-mayoreo',
    image: require('../../assets/descubre/economia-local/mercado_mayoreo.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'mercado-mayoreo',
        title: 'Mercado Mayoreo',
        lat: '',
        lng: '',
        imgMain: 'mercado-mayoreo',
        indications: 'Ubicado contiguo a la Municipalidad de San José, sobre avenida 10',
        description:
          'El Mercado abrió sus puertas el 1º de julio de 1968, para la venta al por mayor de productos agropecuarios y de pesca, según Ley Nº 4138 Préstamo AID Proyecto Mercado de Mayoreo en San José, contrario a otros mercados, la mayor actividad es mayorista y se da en horas nocturnas y de madrugada, pero también se vende al detalle. Ubicado contiguo a la Municipalidad de San José, sobre avenida 10, tiene un horario de 22:00 hasta las 12:00 m.d.',
      },
    },
  },
  {
    id: 'mercado-del-antiguo-registro-civil',
    image: require('../../assets/descubre/economia-local/mercado_antiguo_registro_civil.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'mercado-del-antiguo-registro-civil',
        title: 'Mercado del Antiguo Registro Civil',
        lat: '',
        lng: '',
        imgMain: 'mercado-del-antiguo-registro-civil',
        indications: 'Avenida 2 y 4, Calle 6',
        description:
          'Abre sus puertas en el año 2005, como una solución para albergar a los comerciantes informales; así como parte de las estrategias de recuperación del espacio público y la renovación del paisaje urbano. Ofreciendo  gran variedad de frutas y verduras a un buen precio. Ubicado entre Avenida 2 y 4, Calle 6. Horario: lunes a sábado de 7:00 a.m. a 7:00 p.m. y domingo de 7:00 a.m. a 5:00 p.m.',
      },
    },
  },
  {
    id: 'mercado-de-calle-16',
    image: require('../../assets/descubre/economia-local/mercado_de_calle.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'mercado-de-calle-16',
        title: 'Mercado de Calle 16',
        lat: '',
        lng: '',
        imgMain: 'mercado-de-calle-16',
        indications: 'avenida 3 y calle 16',
        description:
          'Abrió en el año 1971, esta ubicado entre avenida 3 y calle 16, es conocido como Mercado de la Coca Cola,  es usado como terminal de autobús para destinos fuera del área Metropolitana como: Quepos, Parrita, Uvita, Naranjo, Orotina, Zarcero, Atenas, Bagaces, Montezuma, Jaco, Santa Ana y Puriscal, entre sus callejones encontrará 344 locales comerciales. Horario: lunes a sábado de 6:00 a.m. a 7:30 p.m. y domingos de 6:00 a.m. a 6:00 p.m',
      },
    },
  },
  {
    id: 'paseo-colon',
    image: require('../../assets/descubre/economia-local/paseo_colon.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'paseo-colon',
        title: 'Paseo Colón',
        lat: '',
        lng: '',
        imgMain: 'paseo-colon',
        indications:
          'al Este de La Sabana en la calle 42 y finaliza al noreste del Hospital San Juan de Dios en la calle 14',
        description:
          'El Paseo Colón es una importante vía de San José, perteneciente a la Avenida Central, que comienza al este de La Sabana en la calle 42 y finaliza al noreste del Hospital San Juan de Dios en la calle 14; este sitio es un verdadero paso peatonal con una gran y diversa oferta comercial.',
      },
    },
  },
  {
    id: 'avenida-central',
    image: require('../../assets/descubre/economia-local/avenida_central.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'avenida-central',
        title: 'Avenida Central',
        lat: '',
        lng: '',
        imgMain: 'avenida-central',
        indications: 'Av. Central',
        description:
          'Esta es una de las avenidas más antiguas de la ciudad de San José, además de ser muy concurrida, es la zona perfecta para conocer, caminar, comprar, disfrutar del comercio y la alegría de los espacios josefinos.',
      },
    },
  },
  {
    id: 'boulevard-avenida-cuatro',
    image: require('../../assets/descubre/economia-local/boulevard_avenida_cuatro.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'boulevard-avenida-cuatro',
        title: 'Boulevard Avenida Cuatro',
        lat: '',
        lng: '',
        imgMain: 'boulevard-avenida-cuatro',
        indications: 'Blvr. Av. 4',
        description:
          'El boulevard comprende 12 cuadras de pluralidad arquitectónica con valor histórico, su nombre oficial es Avenida Monseñor Rafael Otón Castro Jiménez, esta céntrica vía fue una de las principales arterias de la ciudad capital en la primera mitad del siglo XX, fue considerada como el perímetro sur del sector comercial de San José; también reconocido como el Paseo de la Unión Europea ¡Descúbralo hoy!',
      },
    },
  },
  {
    id: 'barrio-chino',
    image: require('../../assets/descubre/economia-local/barrio_chino.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'barrio-chino',
        title: 'Barrio Chino',
        lat: '',
        lng: '',
        imgMain: 'barrio-chino',
        indications:
          'calle 9, entre la avenida 2 y la avenida 14, dentro del Paseo de los Estudiantes',
        description:
          'San José tiene su “Chinatown”, este fue reconocido en el año 2012, además de haber sido el primero de su estilo entre las ciudades de Centroamérica, hoy día es un atractivo turístico importante de San José; en su entrada se observa el Arco Tang, cuenta con supermercados y restaurantes de comida especializada oriental.',
      },
    },
  },
  {
    id: 'gran-centro-comercial-del-sur',
    image: require('../../assets/descubre/economia-local/gran_centro_comercial_del_sur.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'gran-centro-comercial-del-sur',
        title: 'Gran Centro Comercial del Sur',
        lat: '',
        lng: '',
        imgMain: 'gran-centro-comercial-del-sur',
        indications: 'Vía 209, San José',
        description:
          'El Centro Comercial del Sur, fue inaugurado en el año 1979, sorprendió a los costarricenses  por su formato en tres niveles, aspecto que le permitió incrementar la cantidad de locales. Actualmente, su ubicación y facilidades comerciales le permiten seguir ofreciendo espacios de compras y servicios a los usuarios. Horario: Lunes a domingo de 9:00 a.m. a 6:00 p.m.',
      },
    },
  },
  {
    id: 'plaza-mayor',
    image: require('../../assets/descubre/economia-local/plaza_mayor.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'plaza-mayor',
        title: 'Plaza Mayor',
        lat: '',
        lng: '',
        imgMain: 'plaza-mayor',
        indications: 'Bv. de Rohrmoser, San José, Asunción',
        description:
          'Es un proyecto ubicado en Rohrmoser, distrito de Pavas, de experiencia y conveniencia para satisfacer las necesidades de la zona y los que cohabitan en ella, es un punto de conexión que conecta el pasado con el presente, el vecindario con las torres, la familia con el trabajo, las reuniones con las oficinas, empresas y negocios.Horario: Lunes a Viernes de 8:00 am a 5 pm.',
      },
    },
  },
  {
    id: 'centro-comercial-plaza-america',
    image: require('../../assets/descubre/economia-local/centro_comercial_plaza_america.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'centro-comercial-plaza-america',
        title: 'Centro Comercial Plaza América',
        lat: '',
        lng: '',
        imgMain: 'centro-comercial-plaza-america',
        indications: 'Hatillo Centro, San José',
        description:
          'Este centro comercial, se ubica en Hatillo Centro, San José, cuenta con una excelente ubicación, variedad de tiendas, entretenimiento, una plaza de comidas y acceso a servicios, es un lugar conveniente para hacer sus compras. Horario: de lunes a sábado de 10:30 am a 7:00 pm, domingos de 10:30 am a 4:00 pm. Algunos locales también tienen horarios distintos.',
      },
    },
  },
  {
    id: 'bambu-eco-plaza',
    image: require('../../assets/descubre/economia-local/bambu_eco_plaza.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'bambu-eco-plaza',
        title: 'Bambú Eco-Plaza',
        lat: '',
        lng: '',
        imgMain: 'bambu-eco-plaza',
        indications: 'Colonia 15 de Setiembre, San José.',
        description:
          'BAMBÚ ECO-PLAZA, es un centro comercial sostenible, construido con tecnologías ambientales.',
      },
    },
  },
  {
    id: 'feria-del-agricultor-en-san-francisco-de-dos-rios',
    image: require('../../assets/descubre/economia-local/feria_del_agricultro_en_san_francisco.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'feria-del-agricultor-en-san-francisco-de-dos-rios',
        title: 'Feria del Agricultor en San Francisco de Dos Ríos',
        lat: '',
        lng: '',
        imgMain: 'feria-del-agricultor-en-san-francisco-de-dos-rios',
        indications: 'San Francisco de Dos Ríos, San José',
        description:
          'Esta Feria del Agricultor, se realiza en el Polideportivo de San Francisco, surge como un mercado alternativo para conectar directamente a productores responsables con consumidores interesados de la zona con un estilo de vida más saludable y respetuoso con el medio ambiente. Horario: Sábado de 05:30 a.m.-1:30 p.m',
      },
    },
  },
  {
    id: 'feria-del-agricultor-en-zapote',
    image: require('../../assets/descubre/economia-local/feria_del_agricultor_en_zapote.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'feria-del-agricultor-en-zapote',
        title: 'Feria del Agricultor en Zapote',
        lat: '',
        lng: '',
        imgMain: 'feria-del-agricultor-en-zapote',
        indications: 'Zapote entre calle 54-61 y avenida 34-36',
        description:
          'La Feria del Agricultor se realiza en el campo ferial de Zapote entre calle 54-61 y avenida 34-36, surge como un mercado alternativo para conectar directamente a productores responsables con consumidores interesados de la zona con un estilo de vida más saludable y respetuoso con el medio ambiente. Horario: Domingo de 05:00 a.m.-14:00.',
      },
    },
  },
  {
    id: 'feria-del-agricultor-en-hatillo',
    image: require('../../assets/descubre/economia-local/feria_del_agricultor_en_hatillo.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'feria-del-agricultor-en-hatillo',
        title: 'Feria del Agricultor en Hatillo',
        lat: '',
        lng: '',
        imgMain: 'feria-del-agricultor-en-hatillo',
        indications: 'Hatillo 2 y Hatillo 4',
        description:
          'La Feria del Agricultor se realiza en la calle entre Hatillo 2 y Hatillo 4, surge como un mercado alternativo para conectar directamente a productores responsables con consumidores interesados de la zona con un estilo de vida más saludable y respetuoso con el medio ambiente. Horario: Domingo de 05:00 a.m.-14:00.',
      },
    },
  },
  {
    id: 'feria-del-agricultor-en-plaza-gonzalez-viquez',
    image: require('../../assets/descubre/economia-local/feria_del_agriculto_en_plaza_gonzalez.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'feria-del-agricultor-en-plaza-gonzalez-viquez',
        title: 'Feria del Agricultor en Plaza González Víquez',
        lat: '',
        lng: '',
        imgMain: 'feria-del-agricultor-en-plaza-gonzalez-viquez',
        indications: 'avenida 22 en calles 7 y 9',
        description:
          'La Feria del Agricultor se realiza sobre la avenida 22 en calles 7 y 9, surge como un mercado alternativo para conectar directamente a productores responsables con consumidores interesados de la zona con un estilo de vida más saludable y respetuoso con el medio ambiente. Horario:  Sábado de 05:00 a.m.-14:00.',
      },
    },
  },
  {
    id: 'feria-del-agricultor-en-san-sebastian',
    image: require('../../assets/descubre/economia-local/feria_del_agricultor_en_san_sebastian.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'feria-del-agricultor-en-san-sebastian',
        title: 'Feria del Agricultor en San Sebastián',
        lat: '',
        lng: '',
        imgMain: 'feria-del-agricultor-en-san-sebastian',
        indications: 'Av. 50A, San José',
        description:
          'La Feria del Agricultor se realiza sobre la avenida 50, surge como un mercado alternativo para conectar directamente a productores responsables con consumidores interesados de la zona con un estilo de vida más saludable y respetuoso con el medio ambiente. Horario: Sábado de 05:00 a.m.-13:00.',
      },
    },
  },
  {
    id: 'feria-del-agricultor-en-pavas',
    image: require('../../assets/descubre/economia-local/feria_del_agricultor_en_pavas.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'feria-del-agricultor-en-pavas',
        title: 'Feria del Agricultor en Pavas',
        lat: '',
        lng: '',
        imgMain: 'feria-del-agricultor-en-pavas',
        indications: '600 mts al oeste de la Embajada Americana,contiguo al Palí',
        description:
          'La Feria del Agricultor se realiza 600 metros al Oeste de la Embajada Americana, contiguo al Palí, surge como un mercado alternativo para conectar directamente a productores responsables con consumidores interesados de la zona con un estilo de vida más saludable y respetuoso con el medio ambiente. Horario: Sábado de 05:00 a.m.-13:30.',
      },
    },
  },
  {
    id: 'feria-verde-en-aranjuez',
    image: require('../../assets/descubre/economia-local/feria_verde_en_aranjuez.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'feria-verde-en-aranjuez',
        title: 'Feria Verde en Aranjuez',
        lat: '',
        lng: '',
        imgMain: 'feria-verde-en-aranjuez',
        indications: 'Colonia 15 de Setiembre, San José.',
        description:
          'Esta feria se realiza entre calle 19 y avenida 15 y nace como una opción de mercado alternativo para conectar directamente a productores responsables, actividades culturales y  gastronómicas con consumidores interesados en un estilo de vida más saludable y respetuoso con el medio ambiente. En estos espacios se promueve una economía solidaria, la agricultura orgánica, la reducción de residuos y el apoyo a emprendimientos locales. Horario: sábado de 07:00-13:00',
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
        <Text style={styles.subtitle}>Economía Local</Text>
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
