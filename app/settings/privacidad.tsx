// app/privacidad.tsx
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

type Lang = 'es' | 'en';

const UI_STRINGS: Record<Lang, { title: string; back: string }> = {
  es: { title: 'Términos y condiciones', back: 'Volver' },
  en: { title: 'Terms & Conditions', back: 'Back' },
};

// === Contenido legal ===
// Si prefieres, mueve estos strings a un archivo compartido (ej: lib/legal.ts) e impórtalos aquí.
const TERMS_ES = `Términos y condiciones generales de adhesión
I.  Generalidades de la aplicación.
La Municipalidad de San José, ha implementado una herramienta digital denominada [nombre de la aplicación], diseñada para el disfrute de residentes y visitantes del cantón. Esta herramienta consiste en una aplicación móvil gratuita, disponible para sistemas operativos Android y iOS, así como un sitio web oficial de uso intuitivo.
Tanto la aplicación como el sitio web ofrecen contenido informativo sobre la riqueza histórica, cultural, recreativa y deportiva del cantón, promoviendo espacios emblemáticos, sitios de interés y actividades representativas de San José. Esta iniciativa busca fortalecer el vínculo ciudadano con su entorno, contribuyendo al desarrollo social y económico local.
La herramienta digital es de uso sencillo e intuitivo, y permite al usuario habilitar la geolocalización de su dispositivo para generar rutas personalizadas y sugerencias de entretenimiento, ajustados al tiempo disponible y sitios de interés seleccionados.
La adhesión al servicio [nombre de la aplicación] se formaliza mediante la aceptación expresa del formulario de solicitud que se presenta a continuación, en el cual el usuario declara darse por notificado y conocer los Términos y Condiciones Generales de adhesión a la aplicación [nombre de la aplicación].

II. Solicitud de servicio. 
La presente solicitud de acceso al servicio de la aplicación [nombre de la aplicación], implica que la instalación y activación de dicho servicio quedan supeditadas a la aceptación expresa por parte de la Municipalidad de San José.
La Municipalidad se reserva, en forma discrecional y sin necesidad de expresión de causa, el derecho de admitir o excluir al solicitante al sistema del servicio, circunstancia que el ciudadano solicitante acepta de forma expresa e irrevocable. 
La aceptación del solicitante por parte del municipio se considerará perfeccionada en el momento en que se produzca la activación del servicio, instrumentada mediante la validación del solicitante dentro del sistema. 
En caso de que existan imposibilidades técnicas o cualquier otra circunstancia que impida la activación, suspensión o interrupción del servicio, la Municipalidad no asumirá responsabilidad alguna frente al solicitante ni ante terceros por los efectos que tal situación pueda ocasionar.

III. Del solicitante.
El solicitante se compromete a notificar cualquier cambio en su número telefónico en un plazo máximo de 24 horas. La aceptación de estas condiciones se formaliza con la validación del servicio por parte de la Municipalidad, la cual será comunicada al interesado por mensaje de texto o correo electrónico.

IV. Del servicio.
IV.1. El servicio objeto de la presente solicitud consiste exclusivamente en ofrecer una recopilación de contenido informativo relacionado con la riqueza histórica, cultural, recreativa y deportiva del cantón San José, a través de la promoción de espacios estimulantes, sitios emblemáticos y actividades representativas que caracterizan este cantón. Fomentar el uso de esta APP busca, fomentar el disfrute del ciudadano y contribuir al desarrollo de la economía local.
IV.2. La instalación del servicio quedará sujeta a la validación por parte de la Municipalidad, y su realización implicará la aceptación expresa del solicitante respecto de lo establecido en el apartado anterior.
IV.3. El servicio se regirá por los presentes Términos y Condiciones Generales, manifestados en la presente solicitud de servicio. La Municipalidad podrá modificar las condiciones del servicio en cualquier momento, notificando al interesado mediante mensaje de texto o correo electrónico.
IV.4. El solicitante reconoce y acepta que la calidad, continuidad y disponibilidad del servicio prestado a través de la aplicación, están sujetos a factores técnicos ajenos al control de la Municipalidad, incluyendo, pero no limitándose, al correcto funcionamiento de los servicios de internet, red móvil o dispositivos utilizados por el solicitante. 
En virtud de lo anterior, la Municipalidad queda exonerada de toda responsabilidad por interrupciones, deficiencias o fallos en el servicio que tengan origen en causas externas o atribuibles al equipo, conectividad o infraestructura a la que accede el solicitante. En caso de detectar algún tipo de falla, deficiencia o anomalía en el funcionamiento de la herramienta, el solicitante se compromete a notificarlo a la mayor brevedad posible al correo electrónico contactomsj@msj.go.cr 
IV.5. La Municipalidad no será responsable, bajo ninguna circunstancia, por daños directos o indirectos de cualquier naturaleza derivados del uso de la aplicación,  incluidos daños patrimoniales, morales o el lucro cesante, que pudieran derivarse del uso de la información proporcionada, de la interrupción o falla total o parcial del servicio, o de cualquier contingencia que ocurra durante o como consecuencia de visitas, desplazamientos o interacciones derivadas de las recomendaciones ofrecidas mediante esta aplicación.
IV.6. El usuario exonera expresamente a la Municipalidad de San José, así como a sus autoridades, funcionarios y personal vinculado, de cualquier responsabilidad por hechos ajenos a su control o causados por terceros. Además, reconoce de forma expresa que, el uso de esta aplicación se realiza bajo la entera responsabilidad del usuario, quién deberá tomar las medidas de precaución y seguridad que considere razonables al momento de desplazarse, asistir o interactuar en los lugares o con los actores que se mencionen a través de la APP.
El tratamiento de los datos personales que el solicitante proporcione en el marco del presente servicio se regirá por lo dispuesto en la Ley de Protección de la Persona Frente al Tratamiento de sus Datos Personales, N.° 8968, en especial lo establecido en sus artículos 10, 11, 12 y 13 relativos a la confidencialidad, consentimiento informado, finalidad y calidad del dato.
La Municipalidad de San José se compromete a adoptar las medidas técnicas y organizativas necesarias para garantizar la seguridad, integridad y confidencialidad de los datos personales recopilados, evitando su alteración, pérdida, tratamiento o acceso no autorizado.
Con la solicitud del servicio, el usuario acepta brindar los datos requeridos de manera libre y voluntaria al utilizar esta aplicación o en el sitio web. Los datos personales serán recolectados con el fin de brindar acceso al uso del servicio digital ofrecido por esta herramienta, validar la identificación del solicitante, personalizar la experiencia del usuario mediante funcionalidades como geolocalización y sugerencias, gestionar comunicaciones informativas o técnicas relacionadas al servicio, así como cumplir con obligaciones legales y reglamentarias que imperan para la administración pública.

V. Del uso del servicio. 
El solicitante reconoce y acepta la importancia de utilizar el servicio de manera responsable y conforme con el ordenamiento jurídico vigente, incluyendo la normativa legal y reglamentaria aplicable, Términos y Condiciones Generales y lo establecido en la presente solicitud.
El servicio no deberá ser utilizado de forma que cause, directa o indirectamente, daños o perjuicios a la Municipalidad, al servicio o a terceros. Su utilización no debe implicar afectación, puesta en riesgo o menoscabo de bienes públicos o privados, ni afectación a la integridad de las personas. El solicitante asume plena responsabilidad por cualquier consecuencia derivada del uso indebido o negligente del servicio, tanto si se produce por su actuación como por la de un tercero por el cual deba legalmente responder. 
El incumplimiento de estas condiciones facultará a la Municipalidad de San José para cancelar de manera inmediata el acceso al servicio, sin necesidad de previo aviso, así como para ejercer las acciones legales correspondientes en resguardo de sus derechos e intereses, incluyendo el reclamo de los daños y perjuicios que se hubieren ocasionado.
Asimismo, esta municipalidad no asume responsabilidad alguna por el uso indebido de la aplicación o de la información contenida en ella, siendo dicho uso de su exclusiva responsabilidad. El solicitante reconoce y acepta expresamente esta condición al aprobar los presentes Términos y Condiciones.

VI. Del plazo.
El servicio se brindará a partir del envío del correo de bienvenida al solicitante y tendrá una duración indefinida, salvo que medie cancelación conforme a lo establecido en esta solicitud de servicio, en los Términos y Condiciones Generales, o en caso de que la Municipalidad suspenda o finalice la prestación del servicio por algún incumplimiento de parte del solicitante, o bien, que se dé por finalizada la prestación del servicio en forma general.

VII. Del costo del servicio.
El servicio será prestado de forma gratuita por la Municipalidad de San José durante el periodo de uso, a todos los solicitantes cuya solicitud haya sido debidamente aceptada y que cuenten con los medios tecnológicos requeridos.

VIII. De los medios tecnológicos del solicitante.
El solicitante utilizará, bajo su exclusiva responsabilidad, el dispositivo tecnológico que posea (teléfono móvil, tableta o computadora), y asumirá cualquier costo derivado del uso de datos móviles o conexión a redes inalámbricas. La Municipalidad no tiene vinculo contractual ni extracontractual alguno con los proveedores de servicios tecnológicos utilizados por el solicitante, y se considera un tercero ajeno a dichas relaciones; lo cual acepta y conoce el solicitante al requerir el servicio regulado a través del presente contrato.

IX. De la cancelación del servicio:
IX.1. La Municipalidad podrá cancelar el servicio en cualquier momento, sin necesidad de expresar causa, pudiendo notificar al carreo constituido por el solicitante, sin que dicha notificación sea condición previa para su cancelación.
IX.2. El solicitante podrá cancelar el servicio en cualquier momento notificando su decisión por escrito al correo electrónico: contactomsj@msj.go.cr

X. De la transferencia del servicio.
El servicio es personal, por lo que no podrá ser cedido, vendido o enajenado, ni podrá ser compartido con terceros bajo ninguna modalidad.

XI. Del domicilio electrónico: 
Para todos los efectos legales y contractuales relacionados con esta solicitud y con la prestación del servicio, se constituye como domicilio electrónico de la Municipalidad el correo contactomsj@msj.go.cr 
La dirección de correo electrónico señalada por la Municipalidad de San José será el único medio válido para la recepción de notificaciones y comunicaciones.`;

const TERMS_EN = TERMS_ES; // TODO: provide official translation when available

export default function PrivacidadScreen() {
  const router = useRouter();
  const [lang, setLang] = useState<Lang>('es');
  const ui = useMemo(() => UI_STRINGS[lang], [lang]);
  const body = lang === 'es' ? TERMS_ES : TERMS_EN;

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          onPress={() => setLang(p => (p === 'es' ? 'en' : 'es'))}
          hitSlop={8}
          style={styles.langBtn}
        >
          <Text style={styles.langText}>{lang.toUpperCase()}</Text>
          <Text style={styles.langCaret}>▾</Text>
        </Pressable>

        <Text style={styles.headerTitle} numberOfLines={1}>
          {ui.title}
        </Text>

        <Pressable onPress={() => router.back()} hitSlop={12} style={styles.closeBtn}>
          <Text style={styles.closeText}>✕</Text>
        </Pressable>
      </View>

      {/* Body */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator
      >
        <Text style={styles.title}>{ui.title}</Text>
        <Text style={styles.body}>{body}</Text>
      </ScrollView>

      {/* Footer */}
      <SafeAreaView style={styles.footer}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>{ui.back}</Text>
        </Pressable>
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  header: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e5e7eb',
  },
  langBtn: { flexDirection: 'row', alignItems: 'center' },
  langText: { fontSize: 16, fontWeight: '800', color: '#111' },
  langCaret: { marginLeft: 4, fontSize: 14, color: '#111' },
  headerTitle: { marginLeft: 12, fontSize: 16, fontWeight: '700', color: '#111', flex: 1 },
  closeBtn: { padding: 8 },
  closeText: { fontSize: 22, fontWeight: '800', color: '#111' },

  scroll: { flex: 1 },
  title: { fontSize: 20, fontWeight: '800', marginBottom: 12, color: '#111' },
  body: { fontSize: 14, lineHeight: 21, color: '#111' },

  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e5e7eb',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: 'rgba(255,255,255,0.96)',
  },
  backBtn: {
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2F2A66',
  },
  backBtnText: { color: '#fff', fontWeight: '800' },
});
