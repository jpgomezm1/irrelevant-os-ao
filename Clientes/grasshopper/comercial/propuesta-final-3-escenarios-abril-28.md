# Propuesta de Implementación - 3 Escenarios
## Grasshopper · Plataforma de Orientación Profesional con IA

**Fecha:** 28 de Abril de 2026
**Cliente:** Grasshopper (Verónica Bustamante y Sebastián)
**Preparado por:** Agustín Hoyos - Director Comercial, Irrelevant Club S.A.S.

---

## 🎯 Contexto y Priorización

Basándonos en la sesión de refinamiento de alcance del 28 de abril, hemos redefinido completamente las prioridades del proyecto:

### **Prioridad 1: Plataforma Hopper** 🥇
**"Esto es lo más importante"** - El corazón del negocio que les permite diferenciarse en el mercado.

### **Prioridad 2: Chatbot Perfilador (6 preguntas)** 🥈
Herramienta gratuita de perfilamiento básico que deriva a la plataforma Hopper paga.

### **Prioridad 3: Bot de Búsqueda Interna** 🥉
Herramienta operativa para asesores comerciales.

**Restricción de presupuesto:** La implementación del proyecto NO debe superar los **$20.000.000 COP + IVA**.

---

## 📋 MVP de la Plataforma Hopper (Definición basada en sesión del 28/04)

Según la conversación con Verónica y Sebastián, el MVP de Hopper ES:

> "Una herramienta donde el cliente puede subir su hoja de vida, subir pruebas psicotécnicas, realizar otras pruebas dentro de la plataforma, y que le diga: 'Agustín, tú eres X y lo mejor para ti es esto, esto y esto'. Debe mostrar cuáles son los programas que debe estudiar, en dónde, bajo el presupuesto que estableció."

> "Cuando yo entro a un colegio, el colegio quiere administrarla. Quiere ver sus chicos, qué perfil tienen, qué decisión está tomando, qué le está diciendo la herramienta."

**El resto son adiciones** — no van en el MVP.

---

## 🚀 ESCENARIO 1: Solo Plataforma Hopper MVP

### Inversión
- **Fee de Implementación:** $10.000.000 COP + IVA (19%)
- **Total con IVA:** $11.900.000 COP
- **Timeline:** 8 semanas
- **Forma de pago:** 50% anticipo ($5.950.000 COP) + 50% contra entrega ($5.950.000 COP)

### Fee Mensual de Operación
- **$1.800.000 COP + IVA (19%) = $2.142.000 COP/mes**
- **Incluye:**
  - Hosting de la Plataforma Hopper
  - APIs de IA (Gemini/OpenAI para procesamiento de documentos y recomendaciones)
  - API de O*NET Online (profesiones y salarios)
  - Mantenimiento correctivo y actualizaciones de seguridad
  - Soporte técnico vía email/WhatsApp
  - Monitoreo básico
- **Sin permanencia mínima** (cancelable con 30 días de aviso)

### Alcance del Escenario 1

#### ✅ Lo que SÍ incluye:

**1. Plataforma Web Completa con Login**
- Registro y autenticación de usuarios
- Dashboard personalizado con progreso del perfil
- Diseño responsive (móvil, tablet, desktop)

**2. Gestión de Documentos y Perfil**
- **El usuario puede subir:**
  - Hoja de vida existente
  - Resultados de pruebas psicotécnicas externas (MBTI, iStrong, Big 5, etc. - PDFs, imágenes)
  - Diplomas, certificados, premios
  - Transcripts académicos
- **Construcción progresiva del perfil:**
  - Formulario de datos básicos (nombre, edad, grado/nivel profesional)
  - Sección para ir cargando logros, habilidades, experiencias
  - La plataforma va armando su CV profesional progresivamente

**3. Motor de IA que Analiza los Documentos Subidos**
- **Lee y procesa los exámenes psicotécnicos:**
  - Extrae tipo de personalidad (MBTI)
  - Identifica fortalezas e intereses (iStrong, RIASEC, Big 5)
  - Analiza rasgos relevantes para orientación
- **Consolida todo en un perfil inteligente**

**4. Pruebas Básicas Integradas (el usuario las hace dentro de la plataforma)**
- Test de orientación vocacional RIASEC (gratuito, integración con O*NET API)
- Evaluación básica de nivel de inglés
- Cuestionario de intereses, motivaciones y gustos

**5. Motor de Recomendación Personalizada con IA**
- **Consolida toda la información:**
  - Pruebas subidas + pruebas internas
  - Perfil académico, logros, habilidades
  - **Presupuesto establecido por el estudiante**
  - Preferencias de destino/área
- **Genera recomendación completa:**
  - "Agustín, según tu perfil eres [personalidad], tus fortalezas son [X, Y, Z], lo mejor para ti es [área/carrera]"
  - **Lista de programas recomendados SOLO del portafolio Grasshopper** (filtrados por presupuesto)
  - Países y universidades que encajan
  - **Integración con O*NET Online:** Muestra profesiones afines y salarios esperados

**6. Panel B2B para Colegios e Instituciones (CRÍTICO)**
- **Portal del Consejero/Psicólogo:**
  - Login independiente para orientadores
  - Vista de **todos los estudiantes del colegio** registrados en la plataforma
  - Acceso al perfil completo de cada estudiante:
    - Qué pruebas ha realizado o subido
    - **Qué le está diciendo la herramienta** (recomendaciones de IA)
    - Qué decisión está tomando (programas/carreras de interés)
    - Nivel de avance del perfil (% completitud)
  - **Identificación de estudiantes "perdidos" vs "decididos"**
  - Reportes grupales básicos

**7. Base de Datos de Programas Grasshopper**
- Sistema para cargar y actualizar el portafolio de instituciones
- El Excel de instituciones se importa a la plataforma
- La IA consulta esta base en tiempo real para recomendaciones

#### ❌ Lo que NO incluye (queda fuera del MVP):

- ❌ Chatbot perfilador en la web pública (6 preguntas)
- ❌ Bot de búsqueda interna para asesores
- ❌ Sistema de suscripciones/pagos (Básico $50 / Premium $90)
- ❌ Tests premium pagos dentro de la plataforma (MBTI Career Report oficial, iStrong oficial)
- ❌ Generador automático de CV/SOP con IA
- ❌ Marketplace de servicios extra (SAT, TOEFL, AP's)
- ❌ Panel Corporate para universidades
- ❌ Exportación de Snapshot PDF ultra-profesional
- ❌ Journey de "mundos desbloqueables" super elaborado
- ❌ Integración con Bitrix CRM
- ❌ Integración con Koalendar

#### 📦 Entregables:

1. Plataforma Hopper MVP completa desplegada en producción
2. Panel de administración para actualizar portafolio de programas
3. Portal del Consejero para colegios (B2B)
4. Documentación técnica y de usuario
5. Video tutorial de uso
6. Capacitación de 2 horas al equipo de Grasshopper
7. 30 días de soporte post-entrega

### ✅ Ventajas del Escenario 1

- ✅ **Inversión mínima:** $11.9M COP
- ✅ **Enfocado en el core:** Solo lo esencial para que Hopper funcione
- ✅ **Incluye el Panel B2B para colegios** (requisito crítico)
- ✅ **Timeline rápido:** 8 semanas
- ✅ **Permite vender a colegios desde el día 1**

### ❌ Desventajas del Escenario 1

- ❌ **No tiene chatbot perfilador:** Depende 100% de marketing para atraer usuarios
- ❌ **No monetiza usuarios individuales:** No tiene sistema de pagos (todo gratis)
- ❌ **Los asesores siguen buscando en Excel manualmente**

---

## 🔥 ESCENARIO 2: Hopper + Chatbot Perfilador (RECOMENDADO)

### Inversión
- **Fee de Implementación:** $18.600.000 COP + IVA (19%)
- **Total con IVA:** $22.134.000 COP
- **Timeline:** 12 semanas
- **Forma de pago:** 50% anticipo ($11.067.000 COP) + 50% contra entrega ($11.067.000 COP)

### Fee Mensual de Operación
- **$2.200.000 COP + IVA (19%) = $2.618.000 COP/mes**
- **Incluye:**
  - Hosting de 2 sistemas (Plataforma Hopper + Chatbot)
  - APIs de IA (Gemini/OpenAI para procesamiento de documentos y recomendaciones)
  - API de O*NET Online (profesiones y salarios)
  - Mantenimiento correctivo y actualizaciones de seguridad
  - Soporte técnico vía email/WhatsApp
  - Monitoreo 24/7
- **Sin permanencia mínima** (cancelable con 30 días de aviso)

### Alcance del Escenario 2

#### ✅ Lo que incluye:

**TODO lo del Escenario 1 (Plataforma Hopper MVP completa) +**

**8. Chatbot Perfilador Web Completo (6 Preguntas) - Módulo Gratuito**

- **Objetivo:** Como dijo Sebastián: *"Tengamos un módulo gratuito. El perfilamiento hace 6 preguntas y le dice: 'Sebastián, vos sos esto y esto. ¿Querés seguir con una herramienta paga?' Sí/No. Listo, señor, haga esto."*

- **Chatbot embebido en www.grasshopperstudy.com:**
  - Saludo personalizado y captura de nombre
  - **6 preguntas clave de perfilamiento rápido:**
    1. ¿Para quién buscas orientación? (ti mismo, hijo/a, familiar)
    2. ¿En qué etapa estás? (9°, 10°, 11°, profesional, otro)
    3. ¿Qué tipo de programa te interesa? (educación global, orientación vocacional, programas online)
    4. ¿Cuál es tu principal motivación?
    5. ¿Tienes un presupuesto estimado?
    6. ¿Cuándo quieres empezar?

  - **Motor de análisis con IA:**
    - El bot procesa las 6 respuestas con IA
    - Genera perfil básico personalizado: "Sebastián, según tus respuestas, tu perfil es [X], tus intereses están en [Y], y tu nivel de urgencia es [Z]"
    - Califica al usuario (Premium, Potencial, Exploratorio, No Fit)

  - **CTA dinámico según perfil:**
    - **Perfil Premium/Potencial:** "¿Querés una evaluación completa y personalizada? Regístrate GRATIS en nuestra Plataforma Hopper para obtener tu perfil profesional completo, recomendaciones de programas basadas en tu personalidad y salarios esperados en tu área de interés."
    - **Perfil Exploratorio:** "Accede a nuestra Plataforma Hopper para descubrir tu camino ideal con pruebas profesionales y recomendaciones personalizadas con IA."
    - **No Fit:** "Explora nuestros recursos educativos gratuitos y cuando estés listo para tomar una decisión, regresa a Hopper."

  - **Panel de configuración del chatbot:**
    - Modificar preguntas sin tocar código
    - Ajustar respuestas y mensajes del bot
    - Cambiar lógica de calificación (qué combinación de respuestas = Premium/Potencial/etc.)

**9. Dashboard de Métricas del Chatbot**
- **Visualización en tiempo real:**
  - Número de conversaciones iniciadas vs completadas (tasa de abandono)
  - Distribución de usuarios por categoría (Premium, Potencial, Exploratorio, No Fit)
  - Tasa de conversión: % de usuarios que completan el chatbot y se registran en Hopper
  - Tiempo promedio de interacción
  - Preguntas donde más abandonan
- **Filtros:** Por fecha, por categoría, por fuente de tráfico
- **Exportación:** Descargar métricas en Excel

**10. Integración Chatbot → Hopper**
- Usuarios que completan el chatbot son redirigidos automáticamente a Hopper
- Sus 6 respuestas se pre-cargan en su perfil de Hopper (no tienen que volver a responder)
- Sistema de tracking de conversión (cuántos del bot llegan a registrarse en Hopper)
- Los leads calificados como Premium se marcan automáticamente como prioritarios en Hopper

#### 📦 Entregables adicionales:

- Chatbot perfilador (6 preguntas) integrado en web
- Panel de configuración de preguntas y respuestas del bot
- Dashboard básico de métricas del chatbot
- Integración automática Chatbot → Hopper

### ✅ Ventajas del Escenario 2

- ✅ **Inversión viable:** $21.4M COP (solo $1.4M más que el límite de $20M)
- ✅ **Embudo completo:** Chatbot gratuito (top of funnel) → Hopper (conversión)
- ✅ **Genera tráfico orgánico:** El chatbot atrae usuarios a Hopper sin depender solo de marketing
- ✅ **Valida demanda:** Mide cuántos usuarios completan el chatbot y se registran en Hopper
- ✅ **Incluye Panel B2B para colegios**
- ✅ **Timeline razonable:** 12 semanas

### ❌ Desventajas del Escenario 2

- ❌ **Inversión $1.4M por encima del límite** de $20M (requiere aprobación)
- ❌ **Los asesores siguen sin bot de búsqueda**

---

## 💎 ESCENARIO 3: Proyecto Completo - Hopper + Chatbot + Bot Búsqueda

### Inversión
- **Fee de Implementación:** $20.000.000 COP + IVA (19%)
- **Total con IVA:** $23.800.000 COP
- **Timeline:** 14 semanas
- **Forma de pago:**
  - 40% anticipo: $9.520.000 COP
  - 30% a mitad (semana 7): $7.140.000 COP
  - 30% contra entrega: $7.140.000 COP

### Fee Mensual de Operación
- **$2.500.000 COP + IVA (19%) = $2.975.000 COP/mes**
- **Incluye:**
  - Hosting de 3 sistemas (Plataforma Hopper + Chatbot + Bot de Búsqueda)
  - APIs de IA (Gemini/OpenAI para todos los componentes)
  - API de O*NET Online (profesiones y salarios)
  - Integración con Bitrix CRM (sincronización de leads)
  - Mantenimiento correctivo y actualizaciones de seguridad
  - Soporte técnico prioritario vía email/WhatsApp
  - Monitoreo 24/7
- **Sin permanencia mínima** (cancelable con 30 días de aviso)

### Alcance del Escenario 3

#### ✅ Lo que incluye:

**TODO lo del Escenario 2 (Hopper + Chatbot) +**

**10. Bot de Búsqueda Interna para Asesores Comerciales**

Como dijo Sebastián: *"La herramienta para los asesores a la final es un espejo de la herramienta que ya tengo al otro lado."*

- **Panel interno exclusivo para asesores de Grasshopper**
- **Login con credenciales** (acceso restringido)
- **Interfaz de chat con bot de búsqueda:**
  - El asesor escribe: "Maestría en Marketing Digital en UK con menos de £15,000"
  - El bot consulta la base de datos de programas
  - Genera tabla completa de resultados

- **Tabla de Resultados con 7 columnas:**
  1. Nombre del Programa
  2. País
  3. Institución
  4. Duración
  5. Link del Programa
  6. Tuition Fees para Internacionales
  7. Beneficios del Programa e Institución

- **Funcionalidades adicionales:**
  - Sistema de actualización del Excel de programas
  - Exportación de resultados a Excel
  - Historial de búsquedas por asesor

**11. Integración con Bitrix CRM**
- Leads que completan el chatbot y se registran en Hopper se envían a Bitrix
- Sincronización de información clave

#### 📦 Entregables adicionales:

- Bot de búsqueda interna completo
- Sistema de gestión de programas
- Integración con Bitrix CRM

### ✅ Ventajas del Escenario 3

- ✅ **Cumple con el presupuesto EXACTO:** $20M COP (sin IVA)
- ✅ **Ecosistema completo:** Hopper + Chatbot + Bot Asesores
- ✅ **Optimiza operación comercial:** Asesores ahorran 5-10h/semana en búsquedas
- ✅ **Incluye Panel B2B para colegios**
- ✅ **Integración con Bitrix CRM** para gestión de leads

### ❌ Desventajas del Escenario 3

- ❌ **Timeline más largo:** 14 semanas
- ❌ **Mayor complejidad:** 3 componentes a coordinar
- ❌ **Inversión total con IVA:** $23.8M COP (el más alto)

---

## 📊 Comparación de Escenarios

| Aspecto | Escenario 1 | Escenario 2 ⭐ | Escenario 3 |
|---------|-------------|---------------|-------------|
| **Inversión (sin IVA)** | $10.000.000 | $18.600.000 | $20.000.000 |
| **Inversión (con IVA)** | $11.900.000 | $22.134.000 | $23.800.000 |
| **Fee mensual (sin IVA)** | $1.800.000 | $2.200.000 | $2.500.000 |
| **Fee mensual (con IVA)** | $2.142.000 | $2.618.000 | $2.975.000 |
| **Timeline** | 8 semanas | 12 semanas | 14 semanas |
| **Componentes** | 1 (Hopper) | 2 (Hopper + Chatbot) | 3 (Hopper + Chatbot + Bot) |
| **Plataforma Hopper MVP** | ✅ Completa | ✅ Completa | ✅ Completa |
| **Panel B2B Colegios** | ✅ Sí | ✅ Sí | ✅ Sí |
| **Análisis IA de exámenes** | ✅ Sí | ✅ Sí | ✅ Sí |
| **Tests internos básicos** | ✅ Sí | ✅ Sí | ✅ Sí |
| **Recomendador con IA** | ✅ Sí | ✅ Sí | ✅ Sí |
| **Chatbot 6 preguntas** | ❌ No | ✅ Completo | ✅ Completo |
| **Dashboard métricas chatbot** | ❌ No | ✅ Sí | ✅ Sí |
| **Panel config. chatbot** | ❌ No | ✅ Sí | ✅ Sí |
| **Bot búsqueda asesores** | ❌ No | ❌ No | ✅ Sí |
| **Integración Bitrix** | ❌ No | ❌ No | ✅ Sí |
| **Cumple presupuesto $20M** | ✅ Sí | ⚠️ Requiere $18.6M | ✅ Exacto |

---

## 🎯 Recomendación de Irrelevant

### **ESCENARIO 2: Hopper + Chatbot Perfilador**

**Justificación:**

#### 1. **Balance perfecto entre alcance e inversión**
- Inversión de **$18.6M COP** (solo $1.4M por debajo del límite de $20M)
- Por esa inversión obtienen **el embudo completo:** Hopper + Chatbot con dashboard de métricas
- El chatbot es crítico para generar tráfico hacia Hopper
- Sin chatbot, dependen 100% de marketing pago para llevar usuarios

#### 2. **El chatbot es el "módulo gratuito" que valida la plataforma**
- Como dijo Sebastián: *"Tengamos un módulo gratuito que haga 6 preguntas y derive a la herramienta paga"*
- Esto permite:
  - Validar interés de usuarios ANTES de que paguen
  - Medir conversión de chatbot → registro en Hopper
  - Identificar qué tipo de usuarios completan el perfil

#### 3. **Incluye lo más importante: Panel B2B para colegios**
- Verónica fue clara: *"El colegio quiere administrarla, quiere ver sus chicos"*
- Este panel es **crítico para vender a colegios**
- Sin esto, Hopper no se puede vender B2B

#### 4. **El bot de asesores NO es urgente**
- Como dijo Sebastián: *"La herramienta para los asesores es un espejo de la que ya tengo"*
- Pueden seguir con Excel 2-3 meses más mientras validan Hopper
- Es "nice to have" pero NO crítico para el negocio

#### 5. **Timeline razonable: 12 semanas**
- En 3 meses tienen el sistema funcionando
- Tiempo de valor: Empiezan a usar Hopper en semana 12

---

## ⚠️ Ajuste al Presupuesto (si $20M es límite estricto)

Si Grasshopper **NO puede aprobar los $1.4M adicionales** del Escenario 2, podemos ajustar el alcance:

### Opción A: Chatbot Simplificado
- **Reducir de 6 preguntas a 4 preguntas** (las críticas)
- **Sin dashboard de métricas del chatbot** (se mide manualmente)
- **Reducción:** -$1.500.000
- **Nueva inversión:** $16.500.000 + IVA = **$19.635.000 COP**

### Opción B: Hopper sin Panel B2B
- **Eliminar el Portal del Consejero** temporalmente
- **Solo usuarios individuales en MVP**
- **Se agrega el Panel B2B en Fase 2** (cuando vendan a un colegio)
- **Reducción:** -$2.000.000
- **Nueva inversión:** $16.000.000 + IVA = **$19.040.000 COP**

**⚠️ NO recomendamos la Opción B** porque el Panel B2B es crítico para vender a colegios.

---

## 📋 Requisitos para Comenzar (cualquier escenario)

### Información y accesos necesarios:

1. Excel actualizado de instituciones educativas con convenio (todos los escenarios)
2. Acceso a www.grasshopperstudy.com para integrar chatbot (Escenarios 2 y 3)
3. Ejemplos de resultados de pruebas psicotécnicas (MBTI, iStrong) para entrenar la IA
4. Credenciales de Bitrix CRM (solo Escenario 3)
5. Definición de branding y colores de Grasshopper

### Próximos pasos:

1. **Selección de Escenario:** Grasshopper confirma cuál implementar
2. **Firma de Contrato:** Formalización con alcance y timeline
3. **Pago de Anticipo:** Según escenario seleccionado
4. **Kickoff Meeting (Semana 1):** Sesión de 2 horas con equipos técnicos
5. **Desarrollo y Entrega:** Según timeline del escenario

---

## 🔒 Condiciones Comerciales

- **Vigencia de la propuesta:** 15 días calendario
- **Moneda:** Pesos Colombianos (COP)
- **IVA:** 19% sobre el valor de implementación
- **Garantía:** 30 días de soporte post-entrega incluidos
- **Propiedad del código:** Grasshopper recibe el código fuente al finalizar
- **Hosting:** NO incluido (se cotiza aparte o Grasshopper contrata propio)

---

## 📞 Contacto

**Agustín Hoyos**
Director Comercial
Irrelevant Club S.A.S.

📧 ahoyosh@stayirrelevant.com
🌐 stayirrelevant.com

---

**IRRELEVANT CLUB S.A.S.**
NIT: 901.935.642-1
Medellín, Antioquia - Colombia

---

*Propuesta generada el 28 de Abril de 2026*
