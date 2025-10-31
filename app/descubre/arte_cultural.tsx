import CoverflowCarousel, { CoverItem } from '@/components/carousels/CoverflowCarousel';
import { usePathname, useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { Image, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';


export const DATA: CoverItem[] = [
  {
    id: 'museo-nacional-de-costa-rica',
    image: require('../../assets/descubre/arte-cultural/museo_nacional_costa_rica.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'museo-nacional-de-costa-rica',
        title: 'Museo Nacional de Costa Rica',
        lat: '',
        lng: '',
        imgMain: 'museo-nacional-de-costa-rica',
        indications:
          'Entre avenida Central y Segunda. Entrada frente a la Plaza de la Democracia, San José, Costa Rica',
        description:
          'Un antiguo cuartel militar, reformado para la exposición de artes, ciencia e historia sobre la construcción de Costa Rica como nación, desde la época precolombina hasta nuestros días.',
      },
    },
  },
  {
    id: 'museo-del-jade',
    image: require('../../assets/descubre/arte-cultural/museo_del_jade.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'museo-del-jade',
        title: 'Museo del Jade',
        lat: '',
        lng: '',
        imgMain: 'museo-del-jade',
        indications: 'Avenida Central calle 13 y 13 bis, San José, Costa Rica',
        description:
          'Una enorme colección de piezas de Jade y otros objetos de importancia histórica, arqueológica y cultural,  excelente  sitio para aprender más sobre las comunidades indígenas de Costa Rica.',
      },
    },
  },
  {
    id: 'museos-del-banco-central-de-costa-rica',
    image: require('../../assets/descubre/arte-cultural/museos_del_banco_central_costa_rica.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'museos-del-banco-central-de-costa-rica',
        title: 'Museos del Banco Central de Costa Rica',
        lat: '',
        lng: '',
        imgMain: 'museos-del-banco-central-de-costa-rica',
        indications:
          'Bajos de la Plaza de la Cultura. Avenida Central. Calle 5 San José Centro San José CR 10104, Av. Central, San José',
        description:
          'Este Museo es sede de las colecciones del Banco Central de Costa Rica y el Museo de Numismática Jaime Solera Bennett; además de poseer la colección de objetos elaborados en oro, que reflejan la cosmovisión, la estructura social y la orfebrería de los pueblos precolombinos que ocuparon el territorio costarricense.',
      },
    },
  },
  {
    id: 'museo-de-arte-costarricense',
    image: require('../../assets/descubre/arte-cultural/museo_de_arte_costarricense.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'museo-de-arte-costarricense',
        title: 'Museo de Arte Costarricense',
        lat: '',
        lng: '',
        imgMain: 'museo-de-arte-costarricense',
        indications:
          'Parque Metropolitano La Sabana. Contiguo a la estatua de León Cortés, San José, Costa Rica',
        description:
          'Este Museo es la principal institución de Costa Rica dedicada a la conservación, exhibición y promoción de las artes plásticas de este país. Su colección está compuesta por obras de arte de artistas nacionales e internacionales en todas las disciplinas artísticas.',
      },
    },
  },
  {
    id: 'museo-de-la-comunidad-judia',
    image: require('../../assets/descubre/arte-cultural/museo_de_la_comunidad_judia.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'museo-de-la-comunidad-judia',
        title: 'Museo de la Comunidad Judía',
        lat: '',
        lng: '',
        imgMain: 'museo-de-la-comunidad-judia',
        indications: 'San José, San José, Pavas, contiguo a AyA.',
        description:
          'El Centro Israelita Sionista de Costa Rica es un museo judío ubicado en San José, Costa Rica. Fundado en 1932, el museo alberga una colección de objetos judíos, como artefactos religiosos, libros y documentos históricos. El museo también ofrece exposiciones temporales sobre la historia y la cultura judías.',
      },
    },
  },
  {
    id: 'museo-de-arte-y-diseno-contemporaneo',
    image: require('../../assets/descubre/arte-cultural/museo_de_arte_y_diseno_contemporaneo.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'museo-de-arte-y-diseno-contemporaneo',
        title: 'Museo de Arte y Diseño Contemporáneo',
        lat: '',
        lng: '',
        imgMain: 'museo-de-arte-y-diseno-contemporaneo',
        indications:
          'Centro Nacional de la Cultura, Antigua FANAL. Avenida 3, calle 15/17., San José, Costa Rica',
        description:
          'Desde 1994, el Museo de Arte y Diseño Contemporáneo expone en sus cuatro salas, exhibiciones temporales, dentro de uno de los edificios más antiguos de San José, como lo es la Antigua Fábrica Nacional de Licores, actualmente el Centro Nacional de la Cultura (CENAC).',
      },
    },
  },
  // {
  //   id: 'museo-de-ciencias-naturales-la-salle-costa-rica',
  //   image: require('../../assets/descubre/arte-y-cultura/museo-de-ciencias-naturales-la-salle-costa-rica.png'),
  //   link: {
  //     pathname: './[id]',
  //     params: {
  //       id: 'museo-de-ciencias-naturales-la-salle-costa-rica',
  //       title: 'Museo de Ciencias Naturales La Salle Costa Rica',
  //       lat: '',
  //       lng: '',
  //       imgMain: base('museo-de-ciencias-naturales-la-salle-costa-rica'),
  //       indications:
  //         'Sabana sur, dentro de las instalaciones del Ministerio de Agricultura y Ganadería (MG)',
  //       description:
  //         'El museo cuenta con una variedad de campos, que incluye la sección de paleontología con los grandes dinosaurios. Sección de zoología: con los módulos de invertebrados (corales, artrópodos), de vertebrados (peces, reptiles, aves, mamíferos). Y las secciones de esqueletos, de arqueología y de fósiles.',
  //     },
  //   },
  // },
  {
    id: 'museo-rafael-angel-calderon-guardia',
    image: require('../../assets/descubre/arte-cultural/museo_rafael_angel_calderon_guardia.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'museo-rafael-angel-calderon-guardia',
        title: 'Museo Rafael Ángel Calderón Guardia',
        lat: '',
        lng: '',
        imgMain: 'museo-rafael-angel-calderon-guardia',
        indications:
          'Avenida 11, Calle 25 Barrio Escalante. De la Iglesia Sta. Teresita 100 mts este, 100 mts. norte.',
        description:
          'El Museo resguarda una parte fundamental de la historia y transformación social de Costa Rica en el siglo XX, que por su impacto mantiene vigencia en nuestros días como base de justicia y paz social, en un edificio declarado de interés histórico y arquitectónico, ubicado en el Barrio Escalante.',
      },
    },
  },
  {
    id: 'museo-penitenciario',
    image: require('../../assets/descubre/arte-cultural/museo_penitenciario.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'museo-penitenciario',
        title: 'Museo Penitenciario',
        lat: '',
        lng: '',
        imgMain: 'museo-penitenciario',
        indications: 'Calle 4, Av 9-15, San José',
        description:
          'Este museo posee un contenido sumamente minusioso, es posible aprender, sentir y experimentar muchas de las vivencias que se dieron mientras el penitenciario estaba funcionando.\n\nCuenta con una infraestructura, contenido y guías que nos ayudan a viajar en el tiempo y hacer conciencia de lo acontecido en ese lugar.',
      },
    },
  },
  {
    id: 'museo-historico-y-tecnologico-grupo-ice',
    image: require('../../assets/descubre/arte-cultural/museo_historico_y_tecnologico_grupo_ice.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'museo-historico-y-tecnologico-grupo-ice',
        title: 'Museo Histórico y Tecnológico Grupo',
        lat: '',
        lng: '',
        imgMain: 'museo-historico-y-tecnologico-grupo-ice',
        indications: '',
        description:
          'El Museo Histórico y Tecnológico del Grupo ICE es un viaje a través del tiempo y la tecnología. Con una colección de más de 10,000 objetos, este museo te llevará desde los inicios de la electricidad hasta los avances más recientes en energía renovable. ¡Explore la historia de la energía en Costa Rica y descubra cómo el Grupo ICE ha contribuido al desarrollo del país!',
      },
    },
  },
  {
    id: 'centro-costarricense-de-ciencia-y-cultura-museo-de-los-ninos-de-costa-rica',
    image: require('../../assets/descubre/arte-cultural/centro_costarricense_ciencia_y_cultura.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'centro-costarricense-de-ciencia-y-cultura-museo-de-los-ninos-de-costa-rica',
        title: 'Centro Costarricense de Ciencia y Cultura, Museo de los Niños de Costa Rica',
        lat: '',
        lng: '',
        imgMain: 'centro-costarricense-de-ciencia-y-cultura-museo-de-los-ninos-de-costa-rica',
        indications: 'San José, Calle 4. Avenida 9. Hospital',
        description:
          '¡Atrévase a explorar el Centro Costarricense de Ciencia y Cultura! En el icónico Castillo de los Niños, la diversión y el aprendizaje se entrelazan. Descubra el Museo de los Niños, un universo interactivo lleno de sorpresas para mentes curiosas de todas las edades. ¡Una aventura inolvidable te espera!',
      },
    },
  },
  {
    id: 'museo-filatelico-de-correos-de-costa-rica',
    image: require('../../assets/descubre/arte-cultural/museo_filatelico.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'museo-filatelico-de-correos-de-costa-rica',
        title: 'Museo Filatélico de Correos de Costa Rica',
        lat: '',
        lng: '',
        imgMain: 'museo-filatelico-de-correos-de-costa-rica',
        indications: 'Edificio Central de Correos y Telégrafos, en Calle 2, Avenida 1 y 3 en San José.',
        description:
          'Adéntrese en el fascinante mundo del Museo Filatélico de Costa Rica. Pequeñas estampillas, ¡grandes historias! Descubra tesoros gráficos, rarezas históricas y el arte que viaja por el mundo. ¡Un universo en miniatura le espera!',
      },
    },
  },
  {
    id: 'biblioteca-nacional-miguel-obregon-lizano',
    image: require('../../assets/descubre/arte-cultural/biblioteca_nacional_miguel.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'biblioteca-nacional-miguel-obregon-lizano',
        title: 'Biblioteca Nacional Miguel Obregón Lizano',
        lat: '',
        lng: '',
        imgMain: 'biblioteca-nacional-miguel-obregon-lizano',
        indications: 'Costado norte del Parque Nacional',
        description:
          'La Biblioteca tiene la misión de recopilar, conservar y difundir el patrimonio documental, constituido por periódicos, libros, revistas, mapas, fotografías, música, audiovisuales, entre otros. Esta institución es depositaria de toda publicación o producción hecha en el país.',
      },
    },
  },
  {
    id: 'biblioteca-publica-de-hatillo',
    image: require('../../assets/descubre/arte-cultural/biblioteca_publica_hatillo.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'biblioteca-publica-de-hatillo',
        title: 'Biblioteca Pública de Hatillo',
        lat: '',
        lng: '',
        imgMain: 'biblioteca-publica-de-hatillo',
        indications: '75 este del Centro Comercial de Hatillo 2',
        description:
          'Esta ofrece servicios bibliotecarios de información y recreación cultural de cobertura nacional, beneficiando el desarrollo integral de la comunidad, por medio de servicios bibliotecarios de información, formación y recreación cultural, que han permitido atender a más de un millón de usuarios al año.',
      },
    },
  },
  {
    id: 'biblioteca-municipal-maria-luisa-porras-monge',
    image: require('../../assets/descubre/arte-cultural/biblioteca_municipal_maria_luisa.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'biblioteca-municipal-maria-luisa-porras-monge',
        title: 'Biblioteca Municipal María Luisa Porras Monge',
        lat: '',
        lng: '',
        imgMain: 'biblioteca-municipal-maria-luisa-porras-monge',
        indications: 'Hatillo',
        description:
          'Sumérjase en un universo de historias y saberes en la Biblioteca Municipal María Luisa Porras Monge. Un espacio vibrante donde las páginas cobran vida y la imaginación no tiene límites. ¡Descubra su próxima aventura literaria!',
      },
    },
  },
  {
    id: 'biblioteca-municipal-emma-gamboa-alvarado',
    image: require('../../assets/descubre/arte-cultural/biblioteca_municipal_gamboa.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'biblioteca-municipal-emma-gamboa-alvarado',
        title: 'Biblioteca Municipal Emma Gamboa Alvarado',
        lat: '',
        lng: '',
        imgMain: 'biblioteca-municipal-emma-gamboa-alvarado',
        indications: 'San Sebastián, Paso Ancho.',
        description:
          'Despierte su curiosidad en la Biblioteca Municipal Emma Gamboa Alvarado. Un espacio mágico donde las ideas florecen y la imaginación no tiene límites. Le invitamos a vivir su próxima aventura literaria.',
      },
    },
  },
  {
    id: 'biblioteca-municipal-isidro-diaz-munoz',
    image: require('../../assets/descubre/arte-cultural/biblioteca_municipal_isidro.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'biblioteca-municipal-isidro-diaz-munoz',
        title: 'Biblioteca Municipal Isidro Díaz Muñoz',
        lat: '',
        lng: '',
        imgMain: 'biblioteca-municipal-isidro-diaz-munoz',
        indications: 'Zapote',
        description:
          'Un refugio de letras donde cada página le invita a explorar nuevos mundos. ¡Encuentra su próxima lectura aquí!',
      },
    },
  },
  {
    id: 'biblioteca-municipal-tulio-perlaza-salazar',
    image: require('../../assets/descubre/arte-cultural/biblioteca_municipal_tulio_perlaza.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'biblioteca-municipal-tulio-perlaza-salazar',
        title: 'Biblioteca Municipal Tulio Perlaza Salazar',
        lat: '',
        lng: '',
        imgMain: 'biblioteca-municipal-tulio-perlaza-salazar',
        indications: 'Mata Redonda',
        description:
          'Un espacio inspirador para aprender, crear y conectar. Sumérjase en un mar de conocimiento y cultura. ¡le esperamos!',
      },
    },
  },
  {
    id: 'biblioteca-municipal-rafael-angel-calderon-guardia',
    image: require('../../assets/descubre/arte-cultural/museo_rafael_angel_calderon_guardia.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'biblioteca-municipal-rafael-angel-calderon-guardia',
        title: 'Biblioteca Municipal Rafael Ángel Calderón Guardia',
        lat: '',
        lng: '',
        imgMain: 'biblioteca-municipal-rafael-angel-calderon-guardia',
        indications: 'Barrio México, Merced',
        description:
          'Descubra un tesoro de historias y saberes en un ambiente acogedor. ¡Enriquezca su mente y expanda sus horizontes!',
      },
    },
  },
  {
    id: 'biblioteca-municipal-rafael-angel-arias-gomez',
    image: require('../../assets/descubre/arte-cultural/biblioteca_municipal_rafael_angel.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'biblioteca-municipal-rafael-angel-arias-gomez',
        title: 'Biblioteca Municipal Rafael Ángel Arias Gómez',
        lat: '',
        lng: '',
        imgMain: 'biblioteca-municipal-rafael-angel-arias-gomez',
        indications: 'San Francisco Dos Ríos',
        description:
          'Un punto de encuentro para amantes de la lectura y la cultura. ¡Déjese sorprender por la magia de los libros!',
      },
    },
  },
  {
    id: 'biblioteca-municipal-carmen-lyra',
    image: require('../../assets/descubre/arte-cultural/biblioteca_municipal_carmen_lyra.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'biblioteca-municipal-carmen-lyra',
        title: 'Biblioteca Municipal Carmen Lyra',
        lat: '',
        lng: '',
        imgMain: 'biblioteca-municipal-carmen-lyra',
        indications: 'Pavas',
        description:
          'Este maravilloso sitio celebra la imaginación y el amor por los libros. Venga a vivir la aventura de leer.',
      },
    },
  },
  {
    id: 'teatro-nacional',
    image: require('../../assets/descubre/arte-cultural/teatro_nacional.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'teatro-nacional',
        title: 'Teatro Nacional',
        lat: '',
        lng: '',
        imgMain: 'teatro-nacional',
        indications:
          'Costado este de la Plaza Juan Mora Fernández en la ciudad de San José, sobre Avenida 2 Libertador Juan Rafael Mora, calles 3 y 5 en el distrito Catedral, San José',
        description:
          'Inaugurado en 1897, el Teatro Nacional es uno de los lugares más representativos de la capital, un lugar repleto de lujos y maravillas de la historia y el arte costarricense.',
      },
    },
  },
  {
    id: 'teatro-popular-melico-salazar',
    image: require('../../assets/descubre/arte-cultural/teatro_popular_melico.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'teatro-popular-melico-salazar',
        title: 'Teatro Popular Melico Salazar',
        lat: '',
        lng: '',
        imgMain: 'teatro-popular-melico-salazar',
        indications: 'Av. 2da, entre Calle Central y Calle 2, San José, Costa Rica.',
        description:
          'Teatro público costarricense, declarado patrimonio cultural, con capacidad para 1.180 espectadores, especializada en el fomento y desarrollo integral las artes escénicas, que facilita el acercamiento de la población hacia las diversas manifestaciones artístico-culturales, mediante la programación y producción de espectáculos y festivales de arte.',
      },
    },
  },
  {
    id: 'teatro-la-aduana-alberto-canas-escalante',
    image: require('../../assets/descubre/arte-cultural/teatro_la_aduana.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'teatro-la-aduana-alberto-canas-escalante',
        title: 'Teatro La Aduana, Alberto Cañas Escalante',
        lat: '',
        lng: '',
        imgMain: 'teatro-la-aduana-alberto-canas-escalante',
        indications: 'Calle 25, Av 3-5, Bo. Escalante.',
        description:
          'Este inmueble fue adaptado para teatro en el Centro para las Artes y la Tecnología, La Aduana, que es edificio propio que fue recientemente rediseñado, ofrece espectáculos a lo largo del año con más de 100 funciones y más de 10 mil espectadores.',
      },
    },
  },
  {
    id: 'teatro-1887-de-la-compania-nacional-de-teatro',
    image: require('../../assets/descubre/arte-cultural/teatro_1887.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'teatro-1887-de-la-compania-nacional-de-teatro',
        title: 'Teatro 1887 de la Compañía Nacional de Teatro del Ministerio de Cultura y Juventud',
        lat: '',
        lng: '',
        imgMain: 'teatro-1887-de-la-compania-nacional-de-teatro',
        indications:
          'Ubicado dentro del Centro Nacional de Arte y Cultura (CENAC) Avenidas 3 y 7 calles 11 y 15, San José, Costa Rica',
        description:
          'El inmueble fue adaptado para crear el teatro. Cuenta con capacidad para 200 personas en butacas. El Teatro 1887 ofrece asesoramiento y servicios teatrales a grupos e instituciones de música, folclor, danza y teatro.',
      },
    },
  },
  {
    id: 'teatro-de-la-danza-de-la-compania-nacional-de-danza',
    image: require('../../assets/descubre/arte-cultural/teatro_de_la_danza.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'teatro-de-la-danza-de-la-compania-nacional-de-danza',
        title: 'Teatro de la Danza de la Compañía Nacional de Danza del Ministerio de Cultura y Juventud',
        lat: '',
        lng: '',
        imgMain: 'teatro-de-la-danza-de-la-compania-nacional-de-danza',
        indications:
          'Ubicado dentro del Centro Nacional de Arte y Cultura (CENAC) Avenidas 3 y 7 calles 11 y 15, San José, Costa Rica',
        description:
          'Este inmueble se consolidó el “Teatro de La Danza” a partir de junio del 2005, asi  por sus condiciones técnicas y de espacio, se convirtió en  una respuesta a las necesidades de los artistas escénicos independientes y oficiales del país, además de promover  el acercamiento de todo tipo de público.',
      },
    },
  },
  {
    id: 'teatro-auditorio-nacional',
    image: require('../../assets/descubre/arte-cultural/teatro_auditorio_nacional.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'teatro-auditorio-nacional',
        title: 'Teatro Auditorio Nacional',
        lat: '',
        lng: '',
        imgMain: 'teatro-auditorio-nacional',
        indications: 'San José, Calle 4. Avenida 9. Hospital, San José Province, Costa Rica',
        description:
          'Es uno de los escenarios más versátiles para las artes escénicas y todo tipo de eventos especiales.Se han presentado conciertos de música clásica, certámenes literarios y de belleza, audiovisuales, conferencias, seminarios, congresos científicos y culturales, obras de teatro, entre otras. Suma por año un promedio de 200 presentaciones de carácter comercial, empresarial, académico y cultural.',
      },
    },
  },
  {
    id: 'alianza-francesa-de-costa-rica',
    image: require('../../assets/descubre/arte-cultural/alianza_francesa_costa_rica.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'alianza-francesa-de-costa-rica',
        title: 'Alianza Francesa de Costa Rica',
        lat: '',
        lng: '',
        imgMain: 'alianza-francesa-de-costa-rica',
        indications: 'Avenida 7, Calle 5 (200 metros oeste del INS), San José, Costa Rica',
        description:
          'La Alianza Francesa tiene una triple misión: la enseñanza del francés para todos los públicos, la difusión de las culturas francófonas y la defensa de la diversidad cultural. En Costa Rica, la asociación Alianza Francesa fue fundada en 1947 por costarricenses que querían implementar el proyecto en el país.',
      },
    },
  },
  {
    id: 'centro-multicultural-botica-solera',
    image: require('../../assets/descubre/arte-cultural/centro_multicultural_botica_solera.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'centro-multicultural-botica-solera',
        title: 'Centro Multicultural Botica Solera',
        lat: '',
        lng: '',
        imgMain: 'centro-multicultural-botica-solera',
        indications:
          'Calle 8 y 10 avenida 11, Barrio México. Distrito Merced Cantón Central de la ciudad de San José',
        description:
          'Este parque ajardinado, es la casa de cientos de loros verdes que viven en sus árboles, además en el centro de su área, cuenta con un templete de música llamativo por sus arcos. Este parque, se encuentra rodeado por importantes e icónicos edificios como el Teatro Popular Melico Salazar y la Catedral Metropolitana Santuario Nacional San José. ¡Venga y disfrute en el Parque Central.',
      },
    },
  },
  {
    id: 'centro-cultural-de-espana-en-costa-rica',
    image: require('../../assets/descubre/arte-cultural/centro_cultural_de_espana.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'centro-cultural-de-espana-en-costa-rica',
        title: 'Centro Cultural de España en Costa Rica',
        lat: '',
        lng: '',
        imgMain: 'centro-cultural-de-espana-en-costa-rica',
        indications:
          'Diagonal a la Rotonda del Farolito, Barrio Escalante Plaza del Farolito, Barrio Escalante 10150 - 1000 - San José',
        description:
          'El Centro Cultural de España, abrió sus puertas en San José en el año 1992. Su creación respondió a la voluntad política de España de ir ampliando la cooperación con Iberoamérica. Acá se realizan actividades conjuntas con instituciones costarricenses, colaborando para  ofertar cultura; es un punto de encuentro para la creación, capacitación y disfrute del arte.',
      },
    },
  },
  {
    id: 'centro-cultural-britanico',
    image: require('../../assets/descubre/arte-cultural/centro_cultural_britanico.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'centro-cultural-britanico',
        title: 'Centro Cultural Británico',
        lat: '',
        lng: '',
        imgMain: 'centro-cultural-britanico',
        indications:
          'Calle 29, entre avenidas 7 y 9 De la Iglesia de Santa Teresita, 200mts al este y 75 al sur, Casa azul N° 730 B° Escalante, San José, Costa Rica',
        description:
          'El Centro Cultural Británico fue fundado por profesores británicos y costarricenses que cuentan con una amplia experiencia en el campo de la enseñanza del idioma inglés y la preparación de docentes en esta área, así como la realización de eventos culturales.',
      },
    },
  },
  {
    id: 'la-casa-del-cuno',
    image: require('../../assets/descubre/arte-cultural/la_casa_del_cuno.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'la-casa-del-cuno',
        title: 'La Casa del Cuño',
        lat: '',
        lng: '',
        imgMain: 'la-casa-del-cuno',
        indications: 'Casa del Cuño. Barrio Escalante.Costado Norte de la Antigua Aduana.',
        description:
          'Como parte de las necesidades que generó la construcción del ferrocarril, en 1883 se construyó una bodega al lado de la nave principal de la Aduana, su nombre se origina debido a que fue utilizada como el lugar donde se acuñaban las monedas. A partir de 1987 sufrió una serie de transformaciones, para convertirse en un centro de conferencias.',
      },
    },
  },
  {
    id: 'antigua-aduana',
    image: require('../../assets/descubre/arte-cultural/antigua_aduana.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'antigua-aduana',
        title: 'Antigua Aduana',
        lat: '',
        lng: '',
        imgMain: 'antigua-aduana',
        indications: 'Antigua Aduana, Calle 23, Barrio Escalante, San José, Costa Rica',
        description:
          'La Antigua Aduana está más viva que nunca ya que fue designada por el Ministerio de Cultura como un centro de eventos culturales donde sus instalaciones se llenan de artes escénicas, stands informativos y otros en diferentes eventos declarados culturales en el país.',
      },
    },
  },
  {
    id: 'sendero-escalante',
    image: require('../../assets/descubre/arte-cultural/sendero_escalante.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'sendero-escalante',
        title: 'Sendero Escalante',
        lat: '',
        lng: '',
        imgMain: 'sendero-escalante',
        indications: 'frente al Restaurante Jardín de Lolita, Barrio Escalante, San José.',
        description:
          'Es una iniciativa multi-ciudad inspirada en el lema, "Vivero Urbano de Industrias Creativas”. Este proyecto posee características de innovación y buscan aportar a los emprendedores y a la oferta cultural, gastronómica y de diseño a través de diversas experiencias.',
      },
    },
  },
  {
    id: 'centro-cultural-costarricense-norteamericano-sabana-branch',
    image: require('../../assets/descubre/arte-cultural/centro_costarricense_ciencia_y_cultura.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'centro-cultural-costarricense-norteamericano-sabana-branch',
        title: 'Centro Cultural Costarricense Norteamericano Sabana Branch',
        lat: '',
        lng: '',
        imgMain: 'centro-cultural-costarricense-norteamericano-sabana-branch',
        indications: 'Localizado 300 norte, 100 este y 100 norte del ICE Sabana.',
        description:
          'El Centro Cultural Costarricense Norteamericano se ha consolidado como la institución líder en la enseñanza del idioma inglés en Costa Rica. Con más de 70 años de trayectoria (establecido en el año 1945), cuenta con profesores continuamente evaluados y capacitados, con lo último en tecnología para la enseñanza.',
      },
    },
  },
  {
    id: 'centro-nacional-de-la-cultura-cenac',
    image: require('../../assets/descubre/arte-cultural/centro_nacional_cultura.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'centro-nacional-de-la-cultura-cenac',
        title: 'Centro Nacional de la Cultura (CENAC)',
        lat: '',
        lng: '',
        imgMain: 'centro-nacional-de-la-cultura-cenac',
        indications:
          'Ubicado en la Antigua Fábrica Nacional de Licores (FANAL), Ave. 3 y 7, calles 11 y 15, al costado este del Parque España, San José.',
        description:
          'El Centro cultural con teatros y un museo ubicado en una antigua fábrica de licores del siglo XIX, actualmente, es la sede de las oficinas administrativas del Ministerio de Cultura y Juventud y alberga espacios como el Teatro 1887, el Teatro de la Danza, la Compañía Nacional de Danza (CND), el Anfiteatro Fidel Gamboa, el Museo de Arte y Diseño Contemporáneo (MADC).',
      },
    },
  },
  {
    id: 'plaza-de-la-cultura',
    image: require('../../assets/descubre/arte-cultural/plaza_de_la_cultura.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'plaza-de-la-cultura',
        title: 'Plaza de la Cultura',
        lat: '',
        lng: '',
        imgMain: 'plaza-de-la-cultura',
        indications: 'Avenida Central, Catedral, San José.',
        description:
          'La Plaza de la Cultura fue construida entre los años 1975 y 1983, ubicada entre la Avenida Central, la Avenida dos y la Calle cinco, se ha convertido en uno de los principales puntos de encuentro josefino, pues su ambiente cosmopolita así lo incita. Así esta Plaza, está rodeada de hermosos e importantes edificios emblemáticos de la capital.',
      },
    },
  },
  {
    id: 'plaza-de-la-democracia-y-la-abolicion-del-ejercito',
    image: require('../../assets/descubre/arte-cultural/plaza_democracia_abolicion.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'plaza-de-la-democracia-y-la-abolicion-del-ejercito',
        title: 'Plaza de la Democracia y la Abolición del Ejército',
        lat: '',
        lng: '',
        imgMain: 'plaza-de-la-democracia-y-la-abolicion-del-ejercito',
        indications: 'Entre la Avenida Central y la Avenida 2, Bella Vista, San José.',
        description:
          'Esta Plaza es un articulador entre diferentes instituciones gubernamentales y museísticas.Cuenta con una gran explanada y un anfiteatro  adecuados como espacios de acceso universal, esta se ha consolidado como un lugar de reunión para los ciudadanos costarricenses en diversas manifestaciones culturales, sociales y artísticas, convirtiéndose en uno de los principales nodos de la ciudad de San José.',
      },
    },
  },
  {
    id: 'plaza-de-las-artes',
    image: require('../../assets/descubre/arte-cultural/plaza_de_las_artes.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'plaza-de-las-artes',
        title: 'Plaza de las Artes',
        lat: '',
        lng: '',
        imgMain: 'plaza-de-las-artes',
        indications: 'Se ubica frente la Iglesia Nuestra Señora de la Soledad.',
        description:
          'Plaza ubicada en frente a la Iglesia de Nuestra Señora de la Soledad, cuenta con esculturas para admirar, un buen ambiente; es un fantástico lugar para pasar el rato y descansar después de una larga caminata.',
      },
    },
  },
  {
    id: 'plaza-juan-mora-fernandez',
    image: require('../../assets/descubre/arte-cultural/plaza_juan_mora_fernandez.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'plaza-juan-mora-fernandez',
        title: 'Plaza Juan Mora Fernández',
        lat: '',
        lng: '',
        imgMain: 'plaza-juan-mora-fernandez',
        indications:
          'Se ubicada frente al Teatro Nacional de Costa Rica, además colinda con la Plaza de la Cultura, San José.',
        description:
          'La Plaza Juan Mora Fernández, es una  plaza encantadora de la capital costarricense.Esta Plaza conmemora a una de las figuras más importantes de la política nacional: Juan Mora Fernández, quien fue el primer presidente de Costa Rica.',
      },
    },
  },
  {
    id: 'plaza-juan-rafael-mora-porras',
    image: require('../../assets/descubre/arte-cultural/plaza_juan_rafael_mora.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'plaza-juan-rafael-mora-porras',
        title: 'Plaza Juan Rafael Mora Porras',
        lat: '',
        lng: '',
        imgMain: 'plaza-juan-rafael-mora-porras',
        indications: 'Frente al Correo Central, Avenida 1-3 y Calle 2, San José.',
        description:
          'La Plaza Juan Rafael Mora Porras; espacio cultural y de recreación creado en el siglo XX, amplía el espacio urbano y permite obtener vistas de las virtuosas estilísticas del Edificio Central de Correos; se crea en conmemoración del expresidente y Capitán General del Ejército de Costa Rica, que combatió en la Campaña Nacional.',
      },
    },
  },
  {
    id: 'parque-de-las-garantias-sociales',
    image: require('../../assets/descubre/arte-cultural/parque_las_garantias.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'parque-de-las-garantias-sociales',
        title: 'Parque de las Garantías Sociales',
        lat: '',
        lng: '',
        imgMain: 'parque-de-las-garantias-sociales',
        indications: 'Situada en Avenidas 4 y 6, Calles 5 y 7',
        description:
          'El nombre de este Parque, se le atribuye a las Reformas Constitucionales y Garantías Sociales, que llegaron en los años 40” para mejorar el modo de vida de los costarricenses. Rodeada por el edificio de la Caja Costarricense del Seguro Social y el Mercado Municipal de Artesanías.',
      },
    },
  },
  {
    id: 'barrio-aranjuez',
    image: require('../../assets/descubre/arte-cultural/barrio_aranjuez.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'barrio-aranjuez',
        title: 'Barrio Aranjuez',
        lat: '',
        lng: '',
        imgMain: 'barrio-aranjuez',
        indications: '',
        description:
          'La historia en Aranjuez, está ligada al desarrollo socioeconómico de la ciudad josefina, incluso la primera planta de energía eléctrica de Costa Rica se inauguró allí en 1884, así San José se convirtió en la tercera ciudad en el mundo y la primera en Latinoamérica en tener electricidad. Actualmente, alberga muchas edificaciones que forman parte esencial del patrimonio histórico de Costa Rica.',
      },
    },
  },
  {
    id: 'barrio-otoya',
    image: require('../../assets/descubre/arte-cultural/barrio_otoya.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'barrio-otoya',
        title: 'Barrio Otoya',
        lat: '',
        lng: '',
        imgMain: 'barrio-otoya',
        indications: '',
        description:
          'Se caracteriza por la arquitectura particular de sus edificios y viviendas, predomina una arquitectura ecléctica con rasgos victorianos y neocoloniales. Aquí encontrará lugares muy particulares de la historia nacional;  además del Centro Cinematográfico Costarricense y el Parque Zoológico y Jardín Botánico Nacional Simón Bolívar.',
      },
    },
  },
  {
    id: 'cementerio-general',
    image: require('../../assets/descubre/arte-cultural/cementerio_general.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'cementerio-general',
        title: 'Cementerio General',
        lat: '',
        lng: '',
        imgMain: 'cementerio-general',
        indications:
          'Avenida 10, entre calles 32 y 34, Edificio Municipal José Figueres Ferrer, contiguo a Mercado de Mayoreo.',
        description:
          'Este cementerio se construyó en 1845, el camposanto ha sido la última morada de cientos de miles de personas comunes y destacadas personalidades históricas de Costa Rica como expresidentes, políticos y escritores que descansan en sus tumbas rodeados de una belleza artística, donde se destacan pequeñas capillas, bellas esculturas religiosas y mausoleos.',
      },
    },
  },
  {
    id: 'cementerio-obrero-municipalidad-de-san-jose',
    image: require('../../assets/descubre/arte-cultural/cementerio_obrero_municipalidad.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'cementerio-obrero-municipalidad-de-san-jose',
        title: 'Cementerio Obrero Municipalidad de San José',
        lat: '',
        lng: '',
        imgMain: 'cementerio-obrero-municipalidad-de-san-jose',
        indications: 'Sobre avenida 10, calle 26.',
        description:
          'El Cementerio Obrero de San José, fundado en 1949 es más que tumbas, historias de lucha y esperanza de la clase trabajadora costarricense. Un rincón de la memoria social en el corazón de la capital.',
      },
    },
  },
  {
    id: 'cementerio-extranjero',
    image: require('../../assets/descubre/arte-cultural/cementerio_extranjero.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'cementerio-extranjero',
        title: 'Cementerio Extranjero',
        lat: '',
        lng: '',
        imgMain: 'cementerio-extranjero',
        indications: '',
        description:
          'Un rincón sereno en San José, donde historias de ultramar descansan bajo el sol costarricense. El Cementerio de Extranjeros guarda ecos de viajes y legados lejanos. Un paseo tranquilo entre culturas unidas en el descanso eterno.',
      },
    },
  },
  {
    id: 'galeria-taletum',
    image: require('../../assets/descubre/arte-cultural/galeria_taletum.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'galeria-taletum',
        title: 'Galería Taletum',
        lat: '',
        lng: '',
        imgMain: 'galeria-taletum',
        indications: 'Avenida 9, Contiguo al Centro de Cine, San José, Costa Rica',
        description:
          'Una casa declarada patrimonio histórico por su estructura, cuenta con ambiente agradable, donde cada detalle sorprende, ya que en el primer nivel se encuentra un restaurante que permite disfrutar de su gastronomía acompañando de arte selecto en sus paredes y el segundo nivel es una galería con una amplia colección de obras de arte.',
      },
    },
  },
  {
    id: 'galeria-valanti',
    image: require('../../assets/descubre/arte-cultural/galeria_valanti.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'galeria-valanti',
        title: 'Galería Valanti',
        lat: '',
        lng: '',
        imgMain: 'galeria-valanti',
        indications: 'Calle 35, Avenida 11, Apartado 4273-1000, San José Province, San José, 10101',
        description:
          'Esta galería expone arte latinoamericano, ofreciendo obras de arte únicas para su hogar u oficina; también ofrece talleres de pintura y clases de apreciación de música clásica con expertos en estas materias.',
      },
    },
  },
  {
    id: 'galeria-nacional',
    image: require('../../assets/descubre/arte-cultural/galeria_nacional.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'galeria-nacional',
        title: 'Galería Nacional',
        lat: '',
        lng: '',
        imgMain: 'galeria-nacional',
        indications: 'San José, Calle 4. Avenida 9. Hospital, San José Province, Costa Rica',
        description:
          'Es la Galería más versátil del país, reúne más de cinco exposiciones mensualmente y ofrece de manera gratuita exposiciones individuales y colectivas con técnicas como pintura, escultura, instalaciones, vitrofusión, fotografía, gráfica y arte digital. Un espacio para la exhibición y análisis de creaciones artísticas, científicas y tecnológicas.',
      },
    },
  },
  {
    id: 'galeria-sophia-wanamaker',
    image: require('../../assets/descubre/arte-cultural/galeria_sofia.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'galeria-sophia-wanamaker',
        title: 'Galería Sophia Wanamaker',
        lat: '',
        lng: '',
        imgMain: 'galeria-sophia-wanamaker',
        indications: 'Av. 5, Dent, San José',
        description:
          'La Galería Sophia Wanamaker promueven la apreciación de las artes visuales, enfocándose en tendencias innovadoras y experimentales. Este proyecto ha surgido como resultado directo del entorno educativo multicultural del Centro Cultural.',
      },
    },
  },
  {
    id: 'sala-garbo',
    image: require('../../assets/descubre/arte-cultural/sala_garbo.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'sala-garbo',
        title: 'Sala Garbo',
        lat: '',
        lng: '',
        imgMain: 'sala-garbo',
        indications:
          'Calle 28, Avenida 2a. 100 m sur de Pizza Hut del Paseo Colón, San José',
        description:
          'El 7 de Mayo de 1977, se inaugura la primera sala de arte y ensayo de Centro América: la Sala Garbo, de la mano de Istmofilm, la primera productora cinematográfica del istmo. El teatro ha sido la casa de una gran variedad de espectáculos, incluyendo obras de teatro, conciertos, danza y más. El pub restaurante y galería Shakespeare está ubicado en el subterráneo del teatro.',
      },
    },
  },
  {
    id: 'cine-magaly',
    image: require('../../assets/descubre/arte-cultural/cine_magaly.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'cine-magaly',
        title: 'Cine Magaly',
        lat: '',
        lng: '',
        imgMain: 'cine-magaly',
        indications: 'Barrio La California, Frente al Bar El Observatorio, San José',
        description:
          'El Cine Magaly es el principal exhibidor de cine independiente y películas galardonadas provenientes de distintas partes del mundo, cuenta con una infraestructura única de una elegancia de un cine de mediados de los años 70. Es también casa de festivales de cine y otros eventos de índole cultural.',
      },
    },
  },
  {
    id: 'centro-de-cine-costarricense',
    image: require('../../assets/descubre/arte-cultural/centro_cine_costa_rica.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'centro-de-cine-costarricense',
        title: 'Centro de Cine Costarricense',
        lat: '',
        lng: '',
        imgMain: 'centro-de-cine-costarricense',
        indications:
          'Calle 11, avenida 9 detrás del Instituto Nacional de Seguros, San José, Costa Rica.',
        description:
          'El Centro Costarricense de Producción Cinematográfica, una institución adscrita al Ministerio de Cultura y Juventud, que se encarga de promover la actividad audiovisual en nuestro país. Es la entidad cultural y técnica especializada del Estado en el campo del cine y el video nacionales. La institución organiza su quehacer en cuatro líneas programáticas Preservación, Formación, Fomento y Difusión.',
      },
    },
  },
  {
    id: 'iglesia-de-la-catedral-metropolitana',
    image: require('../../assets/descubre/arte-cultural/catedral_metropolitana.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'iglesia-de-la-catedral-metropolitana',
        title: 'Iglesia de la Catedral Metropolitana',
        lat: '',
        lng: '',
        imgMain: 'iglesia-de-la-catedral-metropolitana',
        indications:
          'Se ubica entre la Avenida Segunda y la Calle Central, San José.',
        description:
          'La Catedral Metropolitana Santuario Nacional San José, es la principal iglesia de la arquidiocesis católica de San José Costa Rica, es un importante referente histórico y arquitectónico de la ciudad además es sede del arzobispo metropolitano. La iglesia posee un estilo arquitectónico neoclásico y barroco, su construcción data de los años 1825. Fue declarada Santuario Nacional en honor a San José en 2021.',
      },
    },
  },
  {
    id: 'iglesia-de-nuestra-senora-de-la-soledad',
    image: require('../../assets/descubre/arte-cultural/iglesia_soledad.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'iglesia-de-nuestra-senora-de-la-soledad',
        title: 'Iglesia de Nuestra Señora de la Soledad',
        lat: '',
        lng: '',
        imgMain: 'iglesia-de-nuestra-senora-de-la-soledad',
        indications:
          'Se ubica en el Paseo de los Estudiantes, frente a la Plaza de las Artes.',
        description:
          'La Iglesia de Nuestra Señora de la Soledad, fue construida a mediados del siglo XIX e incorporada al Patrimonio Histórico y Arquitectónico del país, desde el 08 de diciembre de 1999; además cuenta con imágenes de gran valor histórico y artístico como la Sagrada Familia, la pila bautismal construida con mármol italiano y vitrales donde se representan las catorce estaciones del Viacrucis.',
      },
    },
  },
  {
    id: 'iglesia-de-la-dolorosa',
    image: require('../../assets/descubre/arte-cultural/iglesia_dolorosa.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'iglesia-de-la-dolorosa',
        title: 'Iglesia de la Dolorosa',
        lat: '',
        lng: '',
        imgMain: 'iglesia-de-la-dolorosa',
        indications:
          'Iglesia De Nuestra Señora de la Dolorosa, C. Central Alfredo Volio 8, San José, Dolorosa, 10103',
        description:
          'La Parroquia Nuestra Señora de los Dolores es un templo con diseño arquitectónico de influencia neoclásica, fue declarada patrimonio histórico arquitectónico el 27 de Marzo del 2007.',
      },
    },
  },
  {
    id: 'la-iglesia-de-nuestra-senora-de-la-merced',
    image: require('../../assets/descubre/arte-cultural/iglesia_nuestra_senora_merced.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'la-iglesia-de-nuestra-senora-de-la-merced',
        title: 'La Iglesia de Nuestra Señora de La Merced',
        lat: '',
        lng: '',
        imgMain: 'la-iglesia-de-nuestra-senora-de-la-merced',
        indications: '',
        description:
          'Es un templo cristiano católico y parroquia bajo la advocación de la Virgen de las Mercedes, es muy visitada y valorada por su arquitectura neogótica.\n\nEn el año 1996 fue declarada patrimonio histórico-arquitectónico de Costa Rica',
      },
    },
  },
  {
    id: 'iglesia-de-nuestra-senora-del-carmen',
    image: require('../../assets/descubre/arte-cultural/iglesia_de_nuestra_senora_del_carmen.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'iglesia-de-nuestra-senora-del-carmen',
        title: 'Iglesia de Nuestra Señora del Carmen',
        lat: '',
        lng: '',
        imgMain: 'iglesia-de-nuestra-senora-del-carmen',
        indications:
        'El templo se localiza en la esquina de la avenida 3 y la calle central Alfredo Volio de la ciudad de San José.',
        description:
          'En el año 1874 se concluyó la construcción del templo dedicado a Nuestra Señora del Carmen, el actual templo de influencia historicista, principalmente neoclásica, es una edificación de planta rectangular, inmueble declarado patrimonio.',
      },
    },
  },
  {
    id: 'iglesia-santa-teresita-del-nino-jesus',
    image: require('../../assets/descubre/arte-cultural/iglesia_santa_teresita.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'iglesia-santa-teresita-del-nino-jesus',
        title: 'Iglesia Santa Teresita del Niño Jesús',
        lat: '',
        lng: '',
        imgMain: 'iglesia-santa-teresita-del-nino-jesus',
        indications: 'Ubicada en Avenida 9, Calle 23, Barrio Aranjuez, San José',
        description:
          'Esta iglesia,contribuyó a la conformación del Barrio Aranjuez, uno de los más prósperos de San José de principios del siglo XX, es un hito histórico, arquitectónico y urbano. Su estilo renacentista se denota en el interior  en la fachada, además cuenta con la imagen de la Virgen de Santa Teresa, tiene diferentes estancias y salones como el de  Catecismo y el Ateneo, que se le conoce como Domus Dei.',
      },
    },
  },
  {
    id: 'iron-church',
    image: require('../../assets/descubre/arte-cultural/iron_church.png'),
    link: {
      pathname: './[id]',
      params: {
        id: 'iron-church',
        title: 'Iron church',
        lat: '',
        lng: '',
        imgMain: 'iron-church',
        indications: 'Costado Norte del Colegio Superior de Señoritas, San José, Costa Rica',
        description:
          'La Iron Church, o Iglesia de Hierro, fue el primer templo protestante en San José, Costa Rica, contruida en 1865, hoy se llama Iglesia Episcopal El Buen Pastor. Los feligreses de habla inglesa del siglo XIX la llamaban "The Iron Church" por el material con el que fue construida',
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
        <Text style={styles.subtitle}>Arte y Cultura</Text>
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
