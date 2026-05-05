# ANEXO 3: ALCANCE TÉCNICO Y FUNCIONAL
## PLATAFORMA GRASSHOPPER MVP

**Fecha:** 5 de mayo de 2026
**Partes:** IRRELEVANT CLUB S.A.S. (NIT 901.935.642-1) y GRASSHOPPER INTERNATIONAL (NIT 900071995-1)

---

## 1. DESCRIPCIÓN GENERAL DE LA PLATAFORMA

### 1.1. Nombre y Propósito

**Nombre:** Plataforma Grasshopper (MVP - Minimum Viable Product)

**Propósito:** Sistema SaaS (Software as a Service) de orientación vocacional basado en inteligencia artificial, diseñado para que instituciones educativas (colegios) ofrezcan a sus estudiantes evaluaciones psicométricas profesionales, análisis personalizado con IA y recomendaciones de programas académicos y trayectorias profesionales alineadas con su perfil.

### 1.2. Modelo de Negocio Soportado

La Plataforma Grasshopper está diseñada para soportar el siguiente modelo de negocio de GRASSHOPPER INTERNATIONAL:

**a) B2B (Business-to-Business):**
GRASSHOPPER comercializa licencias de la plataforma a instituciones educativas (colegios, bachilleratos, academias).

**b) B2B2C (Business-to-Business-to-Consumer):**
Las instituciones educativas ofrecen el servicio de orientación vocacional a sus estudiantes (usuarios finales) a través de la plataforma.

**c) Modelo de Licenciamiento:**
Cada institución educativa tiene una licencia activa que le permite atender a un número determinado de estudiantes. GRASSHOPPER gestiona de manera autónoma la creación de instituciones, activación/desactivación de licencias y configuraciones operativas.

### 1.3. Valor Diferencial

La Plataforma Grasshopper se diferencia de soluciones tradicionales de orientación vocacional por:

- **Autonomía operativa total:** GRASSHOPPER opera independientemente sin dependencias técnicas con IRRELEVANT para operaciones del día a día (creación de colegios, gestión de licencias, actualización de catálogos).
- **Inteligencia artificial integrada:** Análisis automático de documentos y generación de recomendaciones personalizadas basadas en perfil psicométrico del estudiante.
- **Integración CRM nativa:** Sincronización bidireccional automatizada con Bitrix CRM para conversión de leads calificados.
- **Co-branding institucional:** Reportes PDF con branding compartido (Grasshopper + Colegio) para reforzar relación institución-estudiante.
- **Propiedad de datos garantizada:** GRASSHOPPER tiene propiedad exclusiva de la base de datos con capacidad de exportación sin restricciones.

---

## 2. COMPONENTES CORE DE LA PLATAFORMA

La Plataforma Grasshopper está compuesta por **seis (6) componentes core integrados** que operan de manera coordinada:

### 2.1. Platform Core (Núcleo de la Plataforma)

**Descripción:**
Infraestructura base que sostiene toda la plataforma, proporcionando funcionalidades transversales de autenticación, gestión de usuarios, navegación y dashboards.

**Funcionalidades:**

**a) Sistema de Autenticación y Autorización:**
- Registro y login de usuarios (administradores de GRASSHOPPER, administradores de colegios, estudiantes).
- Autenticación segura con contraseñas cifradas (hash bcrypt o similar).
- Recuperación de contraseñas mediante correo electrónico.
- Gestión de sesiones seguras.
- Control de accesos basado en roles (RBAC):
  - **Super Administrador (GRASSHOPPER):** Acceso total a la plataforma, creación de colegios, gestión global.
  - **Administrador Institucional (Colegio):** Gestión de estudiantes de su institución, visualización de métricas institucionales.
  - **Estudiante:** Acceso a evaluaciones, carga de documentos, visualización de resultados y recomendaciones.

**b) Dashboard Principal:**
- Dashboard diferenciado por rol:
  - **Super Administrador:** Métricas consolidadas globales (total de instituciones activas, licencias activas, estudiantes totales, evaluaciones realizadas en el período).
  - **Administrador Institucional:** Métricas de su institución (estudiantes registrados, evaluaciones completadas, licencias disponibles/consumidas).
  - **Estudiante:** Vista de su perfil, evaluaciones pendientes, resultados disponibles, recomendaciones personalizadas.

**c) Navegación y Menús:**
- Menú lateral o superior adaptado por rol.
- Navegación intuitiva entre módulos (evaluaciones, reportes, configuración, catálogo de universidades).
- Breadcrumbs para orientación del usuario.

**d) Gestión de Usuarios:**
- CRUD (Crear, Leer, Actualizar, Eliminar) de usuarios por parte de administradores.
- Asignación de roles y permisos.
- Activación/desactivación de cuentas de usuario.

**Tecnología sugerida (no vinculante):**
- Frontend: React.js, Next.js o similar (framework moderno de JavaScript).
- Backend: Node.js (Express, NestJS) o Python (FastAPI, Django).
- Base de datos: PostgreSQL o MySQL.
- Autenticación: JWT (JSON Web Tokens), OAuth 2.0 (opcional para login social).

---

### 2.2. Assessment Tools (Motor de Evaluaciones Psicométricas)

**Descripción:**
Motor de tests psicométricos que permite a estudiantes realizar evaluaciones profesionales reconocidas internacionalmente y cargar documentos complementarios (CV, portafolios) para análisis por IA.

**Evaluaciones Psicométricas Soportadas:**

La plataforma debe integrar las siguientes **cuatro (4) evaluaciones psicométricas reconocidas:**

**a) MBTI (Myers-Briggs Type Indicator):**
- Cuestionario de personalidad basado en 16 tipos psicológicos.
- Identifica preferencias en cuatro dimensiones: Extraversión/Introversión, Sensación/Intuición, Pensamiento/Sentimiento, Juicio/Percepción.
- Resultado: Tipo de personalidad (ej: INTJ, ESFP) con descripción de fortalezas, debilidades, carreras recomendadas.

**b) iStrong (Inventario de Intereses Profesionales):**
- Evaluación de intereses vocacionales basada en el modelo Holland (RIASEC: Realistic, Investigative, Artistic, Social, Enterprising, Conventional).
- Identifica áreas de interés del estudiante (ciencias, artes, negocios, ayuda social, etc.).
- Resultado: Perfil de intereses con carreras y campos profesionales alineados.

**c) Big 5 (Five Factor Model - Modelo de los Cinco Grandes):**
- Evaluación de personalidad basada en cinco dimensiones: Apertura, Responsabilidad, Extraversión, Amabilidad, Neuroticismo.
- Proporciona perfil de rasgos de personalidad científicamente validado.
- Resultado: Puntuación en cada dimensión con interpretación sobre encaje en entornos laborales y académicos.

**d) RIASEC (Holland Codes):**
- Evaluación complementaria que clasifica al estudiante en uno o varios de los seis tipos de Holland.
- Resultado: Código de Holland (ej: IAE - Investigativo, Artístico, Emprendedor) con carreras y ambientes laborales sugeridos.

**Funcionalidades del Motor de Evaluaciones:**

**a) Interfaz de Usuario para Tests:**
- Presentación de preguntas de cada test de manera clara, amigable y responsive (mobile-friendly).
- Barra de progreso que indica % completado del test.
- Guardado automático de respuestas (para evitar pérdida de progreso si se cierra sesión).
- Validación de respuestas obligatorias antes de avanzar.

**b) Carga de Archivos Complementarios:**
- Módulo para que estudiantes carguen documentos opcionales (CV, portafolio, certificados, ensayos vocacionales) en formatos PDF, DOCX, JPG, PNG.
- Límite de tamaño razonable (ej: 10 MB por archivo).
- Almacenamiento seguro de archivos con asociación al perfil del estudiante.

**c) Motor de Scoring y Cálculo de Resultados:**
- Algoritmo de scoring para cada evaluación psicométrica conforme a la metodología oficial.
- Cálculo automático de resultados al completar cada test.
- Almacenamiento estructurado de resultados en base de datos (para análisis posterior).

**d) Visualización de Resultados:**
- Presentación visual de resultados (gráficos, diagramas de radar, barras) para facilitar comprensión del estudiante.
- Descripción textual de cada resultado con interpretación profesional.
- Descarga de resultados en formato PDF (generado automáticamente, ver Sección 2.8).

**Consideraciones Técnicas:**

- Las evaluaciones psicométricas serán implementadas con base en **cuestionarios estándar de dominio público o licencias que GRASSHOPPER proporcione**. IRRELEVANT no asume responsabilidad de adquirir licencias de tests propietarios (ej: MBTI oficial licenciado por The Myers-Briggs Company).
- Si GRASSHOPPER requiere integración con proveedores oficiales de tests (ej: APIs de plataformas de MBTI, iStrong certificadas), esto deberá acordarse como desarrollo adicional con cotización separada.

---

### 2.3. AI Analysis Engine (Motor de Análisis con Inteligencia Artificial)

**Descripción:**
Componente de inteligencia artificial que procesa documentos cargados por estudiantes (CV, portafolios), analiza resultados de evaluaciones psicométricas y genera recomendaciones personalizadas de programas académicos y trayectorias profesionales.

**Funcionalidades:**

**a) Procesamiento de Documentos con IA:**
- Extracción de información clave de documentos cargados mediante OCR (Optical Character Recognition) y procesamiento de lenguaje natural (NLP).
- Análisis de CV para identificar: experiencia laboral, habilidades técnicas, logros académicos, idiomas, certificaciones.
- Análisis de portafolios (si aplica) para identificar proyectos relevantes, áreas de expertise, inclinaciones profesionales.

**b) Consolidación de Perfil del Estudiante:**
- Consolidación automática de:
  - Resultados de evaluaciones psicométricas (MBTI, iStrong, Big 5, RIASEC).
  - Información extraída de documentos (experiencia, habilidades, intereses manifestados).
  - Datos de perfil del estudiante (edad, nivel educativo, presupuesto disponible para educación superior).

**c) Generación de Recomendaciones Personalizadas:**
- Algoritmo de IA que cruza el perfil consolidado del estudiante con la **Base de Datos de Programas Académicos** (ver Sección 2.6).
- Criterios de matching:
  - **Alineación con perfil psicométrico:** Programas que se ajusten al tipo de personalidad MBTI, intereses RIASEC, rasgos Big 5.
  - **Alineación con habilidades y experiencia:** Programas que aprovechen habilidades identificadas en CV.
  - **Alineación con presupuesto:** Programas dentro del rango de presupuesto indicado por el estudiante.
  - **Alineación con mercado laboral:** Programas con alta demanda laboral, proyección salarial favorable (si esta información está disponible en catálogo).

**d) Output de Recomendaciones:**
- Listado de **Top 5-10 programas académicos** recomendados, ordenados por relevancia/compatibilidad.
- Para cada programa recomendado, incluir:
  - Nombre del programa y universidad.
  - Descripción breve del programa.
  - Razón de la recomendación (ej: "Este programa se alinea con tu perfil INTJ y tus intereses en ciencias investigativas").
  - Presupuesto estimado (matrícula anual o total del programa).
  - Duración del programa.
  - Modalidad (presencial, virtual, híbrida).
  - Enlace o información de contacto de la universidad.

**e) Retroalimentación Iterativa (Opcional - Mejora Futura):**
- Capacidad del estudiante de dar feedback sobre recomendaciones ("Me interesa", "No me interesa"), para que el algoritmo de IA refine sugerencias futuras.
- Esta funcionalidad puede implementarse en una fase posterior si se considera valiosa.

**Tecnología de IA Sugerida:**

- **Modelos de Lenguaje (LLMs):** OpenAI GPT-4, Anthropic Claude, Google Gemini o similar para generación de recomendaciones textuales personalizadas.
- **OCR:** Tesseract, Google Cloud Vision API, AWS Textract para extracción de texto de documentos.
- **Procesamiento de Lenguaje Natural (NLP):** spaCy, Hugging Face Transformers para análisis de CV y perfiles.
- **Motor de Recomendación:** Algoritmo custom (reglas + scoring) o librerías de machine learning (scikit-learn, TensorFlow) para matching de perfiles con programas.

**Consideraciones de Costos de IA:**

Los costos de APIs de IA (inferencia de modelos GPT-4, Claude, etc.) están cubiertos por el **fee mensual de servicio** ($2.000.000 + IVA), dentro de un **uso razonable** (ver Sección 5 del Anexo 1). Si el volumen de procesamiento de IA excede significativamente las proyecciones (ej: más de 10,000 análisis mensuales con costos de API superiores a $500 USD/mes), podrá solicitarse revisión del fee mensual conforme a la Sección 5.2 del Anexo 1.

---

### 2.4. B2B Panel (Panel de Gestión Institucional)

**Descripción:**
Panel de control para que GRASSHOPPER y administradores de colegios gestionen instituciones educativas, visualicen métricas de uso, monitoreen licencias activas y accedan a reportes consolidados.

**Funcionalidades:**

**a) Gestión de Instituciones Educativas (Colegios):**
- Visualización de listado de todos los colegios registrados en la plataforma.
- Información de cada colegio:
  - Nombre de la institución.
  - NIT o identificación fiscal.
  - Dirección, ciudad, país.
  - Contacto principal (nombre, email, teléfono).
  - Fecha de creación en la plataforma.
  - Estado de la licencia (activa, inactiva, suspendida).
  - Cantidad de estudiantes registrados.
  - Cantidad de evaluaciones completadas.

**b) Visualización de Licencias Activas:**
- Dashboard que muestra:
  - Total de licencias activas globalmente (todas las instituciones).
  - Licencias por institución (cuántas licencias tiene cada colegio, cuántas están en uso, cuántas disponibles).
  - Fecha de activación y vencimiento de licencias (si aplica modelo de licencias temporales).
  - Indicadores visuales de estado (verde: activa, amarillo: próxima a vencer, rojo: vencida o inactiva).

**c) Seguimiento de Usuarios Institucionales:**
- Listado de estudiantes registrados por institución.
- Filtros por colegio, fecha de registro, estado de evaluaciones (completadas, pendientes).
- Información de cada estudiante:
  - Nombre, email, fecha de registro.
  - Evaluaciones completadas.
  - Estado de análisis de IA (pendiente, completado).
  - Fecha de última actividad.

**d) Reportes y Métricas Consolidadas:**
- Reportes visuales (gráficos, tablas) con métricas clave:
  - **Globales (Super Administrador):**
    - Total de instituciones activas.
    - Total de estudiantes en la plataforma.
    - Total de evaluaciones realizadas (por tipo: MBTI, iStrong, Big 5, RIASEC).
    - Tendencias de crecimiento (nuevos estudiantes por mes, evaluaciones por mes).
    - Tasa de completitud de evaluaciones.
  - **Por Institución (Administrador Institucional):**
    - Estudiantes registrados en su colegio.
    - Evaluaciones completadas vs. pendientes.
    - Distribución de perfiles psicométricos (ej: % de estudiantes INTJ, ESFP, etc.).
    - Programas más recomendados a sus estudiantes.

**e) Exportación de Reportes:**
- Capacidad de exportar reportes en formatos:
  - **CSV:** Para análisis en Excel, Google Sheets.
  - **PDF:** Para presentaciones a directivos o stakeholders.
  - **Excel (XLSX):** (opcional, si se considera valioso).

**f) Notificaciones y Alertas:**
- Sistema de notificaciones para administradores:
  - Alerta cuando una licencia está próxima a vencer.
  - Alerta cuando se registra un nuevo estudiante.
  - Alerta cuando un estudiante completa todas las evaluaciones (opcional).

**Acceso por Roles:**

- **Super Administrador (GRASSHOPPER):** Acceso completo al B2B Panel, visualización de todas las instituciones, métricas globales, gestión de licencias globales.
- **Administrador Institucional (Colegio):** Acceso limitado a información de su propia institución únicamente, sin visibilidad de otras instituciones.

---

### 2.5. Bitrix CRM Sync (Sincronización con CRM Bitrix)

**Descripción:**
Integración bidireccional automatizada con el CRM Bitrix de GRASSHOPPER para sincronizar leads calificados (estudiantes que completaron evaluaciones) con perfiles enriquecidos, permitiendo al equipo comercial de GRASSHOPPER realizar seguimiento y conversión.

**Funcionalidades:**

**a) Trigger de Sincronización:**
- Webhook automático que se activa cuando un estudiante **completa todas las evaluaciones psicométricas** y el análisis de IA genera recomendaciones.
- Evento disparador: "Evaluación completa + Recomendaciones generadas".

**b) Creación Automática de Lead en Bitrix:**
- Al activarse el webhook, la plataforma Grasshopper envía información del estudiante al CRM Bitrix mediante API de Bitrix24.
- Creación de un nuevo **Lead** en Bitrix con los siguientes datos:

**Datos Básicos del Lead:**
- Nombre completo del estudiante.
- Email.
- Teléfono (si disponible).
- Colegio de procedencia.
- Fecha de registro en la plataforma.
- Fecha de completitud de evaluaciones.

**Datos Enriquecidos (Perfil Psicométrico):**
- Tipo de personalidad MBTI (ej: INTJ).
- Código Holland / RIASEC (ej: IAE).
- Puntuación Big 5 (Apertura, Responsabilidad, Extraversión, Amabilidad, Neuroticismo).
- Intereses profesionales identificados (iStrong).

**Presupuesto y Expectativas:**
- Presupuesto disponible para educación superior (si el estudiante lo indicó).
- Modalidad preferida (presencial, virtual, híbrida).
- Programas de mayor interés (Top 3 recomendaciones generadas por IA).

**Información de Engagement:**
- Documentos cargados (CV, portafolio): sí/no.
- Nivel de completitud del perfil (%).
- Fuente del lead (ej: "Plataforma Grasshopper - Colegio XYZ").

**c) Enriquecimiento de Perfil del Lead:**
- Los datos enviados a Bitrix permiten al equipo comercial de GRASSHOPPER tener un perfil completo del estudiante **antes del primer contacto**, facilitando conversaciones personalizadas y aumentando tasa de conversión.

**d) Logging y Reintentos Automáticos:**
- Sistema de logging que registra cada intento de sincronización con Bitrix:
  - Timestamp del evento.
  - ID del estudiante.
  - Datos enviados.
  - Respuesta de la API de Bitrix (éxito, error, código de respuesta).
- Mecanismo de reintentos automáticos en caso de fallo de sincronización (ej: 3 reintentos con backoff exponencial).
- Notificación al Super Administrador de GRASSHOPPER si la sincronización falla después de todos los reintentos.

**e) Sincronización Bidireccional (Opcional - Fase Futura):**
- Actualización en Bitrix → Plataforma Grasshopper:
  - Si el equipo comercial de GRASSHOPPER actualiza información del estudiante en Bitrix (ej: cambia estado a "Matriculado", agrega notas), esa información podría sincronizarse de vuelta a la plataforma Grasshopper.
  - Esta funcionalidad bidireccional completa puede implementarse en fase posterior si se considera valiosa.

**Tecnología de Integración:**

- **API de Bitrix24:** REST API de Bitrix24 para creación y actualización de Leads.
- **Webhooks:** Configuración de webhooks en la plataforma Grasshopper para disparar eventos hacia Bitrix.
- **Autenticación:** OAuth 2.0 o API Keys proporcionadas por GRASSHOPPER para autenticación con su cuenta Bitrix.

**Responsabilidad de GRASSHOPPER:**

GRASSHOPPER deberá proporcionar a IRRELEVANT:
- Credenciales de API de Bitrix24 (API Key, URL del CRM, tokens de autenticación).
- Información sobre campos custom en Bitrix (si GRASSHOPPER ha personalizado su CRM) para mapear correctamente los datos.
- Acceso de prueba al CRM Bitrix para validación de la integración durante desarrollo.

---

### 2.6. Program Database (Base de Datos de Programas Académicos)

**Descripción:**
Catálogo actualizable de universidades aliadas, programas académicos disponibles y presupuestos asociados, que alimenta el motor de recomendaciones de IA.

**Funcionalidades:**

**a) Estructura de la Base de Datos:**
La base de datos de programas debe almacenar la siguiente información por cada programa académico:

**Información de la Universidad:**
- Nombre de la universidad.
- País y ciudad.
- Tipo de institución (pública, privada, mixta).
- Acreditación (nacional, internacional).
- Sitio web.
- Contacto de admisiones (email, teléfono).

**Información del Programa Académico:**
- Nombre del programa (ej: "Ingeniería de Sistemas", "Psicología Clínica", "Administración de Empresas").
- Facultad o departamento.
- Nivel (pregrado, posgrado, maestría, doctorado, técnico, tecnológico).
- Duración del programa (en años o semestres).
- Modalidad (presencial, virtual, híbrida).
- Idioma de instrucción (español, inglés, otro).
- Descripción breve del programa (objetivos, perfil del egresado).

**Información de Costos:**
- Costo total del programa (matrícula completa).
- Costo por semestre o año académico.
- Moneda (COP, USD, EUR, etc.).
- Opciones de financiamiento (becas, créditos, convenios).

**Metadatos para Matching:**
- **Perfiles psicométricos recomendados:** Tipos de personalidad MBTI que se alinean con el programa (ej: INTJ, INTP para Ingeniería).
- **Códigos Holland / RIASEC:** Códigos Holland ideales para el programa (ej: IE para Ingeniería - Investigativo + Emprendedor).
- **Habilidades clave:** Habilidades técnicas o blandas relevantes (ej: programación, liderazgo, creatividad).
- **Demanda laboral:** Indicador de alta/media/baja demanda laboral del programa (opcional).
- **Salario promedio de egresados:** Estimación salarial (opcional).

**b) CRUD de Programas (Crear, Leer, Actualizar, Eliminar):**
- Panel de administración que permite al **Super Administrador (GRASSHOPPER)** gestionar el catálogo de programas:
  - **Crear nuevo programa:** Formulario para ingresar todos los datos de un nuevo programa académico.
  - **Editar programa existente:** Actualizar información (ej: cambio de costo, actualización de descripción).
  - **Eliminar programa:** Eliminar programas que ya no estén disponibles o vigentes.
  - **Búsqueda y filtros:** Buscar programas por universidad, nombre, nivel, modalidad, presupuesto.

**c) Importación Masiva de Programas:**
- Funcionalidad para importar programas masivamente mediante archivo CSV o Excel (XLSX).
- Plantilla de importación con todos los campos requeridos.
- Validación de datos durante importación (ej: detectar duplicados, validar formatos de moneda, verificar campos obligatorios).

**d) Exportación de Catálogo:**
- Capacidad de exportar el catálogo completo de programas en CSV o Excel para análisis externo o respaldo.

**e) Versionado y Auditoría (Opcional):**
- Registro de cambios realizados al catálogo (quién, cuándo, qué cambió) para auditoría y trazabilidad.

**Responsabilidad de GRASSHOPPER:**

GRASSHOPPER es responsable de:
- Proporcionar la información inicial de programas académicos para poblar la base de datos.
- Mantener actualizado el catálogo mediante el panel de administración post-lanzamiento.
- Establecer alianzas comerciales con universidades y negociar convenios.

IRRELEVANT no tiene responsabilidad sobre la calidad, precisión o vigencia de la información de programas académicos cargada por GRASSHOPPER.

---

### 2.7. Super Administrator Panel (Panel de Super Administrador)

**Descripción:**
Interfaz de control total que otorga a GRASSHOPPER capacidades autónomas para operar la plataforma sin dependencias técnicas con IRRELEVANT para tareas operativas del día a día.

**Objetivo:**
Garantizar que GRASSHOPPER pueda gestionar **100% autónomamente** los siguientes aspectos:
- Creación y configuración de instituciones educativas (colegios).
- Activación y desactivación de licencias.
- Actualización del catálogo de universidades y programas académicos.
- Acceso a reportes consolidados globales.
- Configuración de parámetros operativos de la plataforma.

**Funcionalidades:**

**a) Gestión de Instituciones Educativas (Colegios):**

**Crear Nueva Institución:**
- Formulario completo para registrar un nuevo colegio:
  - Nombre de la institución.
  - NIT o identificación fiscal.
  - Dirección completa (calle, ciudad, país).
  - Contacto principal (nombre, cargo, email, teléfono).
  - Logo de la institución (para co-branding en reportes PDF).
  - Cantidad de licencias asignadas inicialmente.
  - Fecha de inicio y vencimiento de licencias (si aplica modelo temporal).
- Al crear la institución, se genera automáticamente:
  - Cuenta de **Administrador Institucional** con credenciales de acceso (enviadas por email).
  - Configuración de co-branding (logo del colegio asociado para reportes PDF).

**Editar Institución Existente:**
- Actualizar información de contacto, dirección, logo.
- Modificar cantidad de licencias asignadas (aumentar o reducir).
- Cambiar estado (activa, inactiva, suspendida).

**Eliminar o Desactivar Institución:**
- Desactivar institución (deja de operar, pero datos se conservan).
- Eliminar institución (borrado lógico: datos se ocultan pero no se eliminan físicamente de la base de datos, para cumplir con políticas de retención).

**b) Gestión de Licencias:**

**Activar Licencias:**
- Asignar licencias a instituciones (cantidad de estudiantes que puede atender).
- Configurar período de vigencia de licencias (si aplica modelo temporal: ej. licencia válida por 1 año académico).

**Desactivar Licencias:**
- Suspender licencias de instituciones que no han renovado o tienen pagos pendientes.
- Al desactivar licencia, estudiantes de esa institución no pueden iniciar nuevas evaluaciones, pero pueden visualizar resultados previos.

**Monitoreo de Consumo de Licencias:**
- Dashboard que muestra:
  - Licencias totales asignadas vs. consumidas por institución.
  - Proyección de agotamiento de licencias (ej: "A este ritmo, el Colegio XYZ agotará sus licencias en 2 meses").
  - Alertas cuando una institución alcanza 80% de consumo de licencias.

**c) Gestión del Catálogo de Universidades y Programas:**

- Acceso completo al módulo de **Program Database** (Sección 2.6) para:
  - Crear, editar, eliminar universidades y programas académicos.
  - Importar/exportar catálogo masivamente.
  - Actualizar costos, modalidades, descripción de programas.
- Esta gestión se realiza **sin necesidad de contactar a IRRELEVANT** para soporte técnico.

**d) Acceso a Reportes Consolidados Globales:**

- Visualización de métricas globales de toda la plataforma:
  - Total de instituciones activas y estudiantes registrados.
  - Evaluaciones completadas (totales y por tipo).
  - Tendencias de crecimiento (gráficos de nuevos estudiantes por mes, evaluaciones por mes).
  - Distribución de perfiles psicométricos global (ej: % de MBTI en toda la base de estudiantes).
  - Top 10 programas más recomendados.
  - Tasa de conversión de leads en Bitrix (si se integra sincronización bidireccional en futuro).

**e) Configuración de Parámetros Operativos:**

**Configuración de Co-Branding:**
- Logo de Grasshopper (logo principal que aparece en todos los reportes PDF).
- Colores corporativos de Grasshopper (para personalización de interfaz).

**Configuración de Notificaciones:**
- Activar/desactivar notificaciones automáticas por email a estudiantes (ej: "Tu evaluación está lista", "Nuevas recomendaciones disponibles").
- Plantillas de correos electrónicos editables (subject, contenido, firma).

**Configuración de Integraciones:**
- Credenciales de API de Bitrix CRM (actualización sin necesidad de soporte técnico de IRRELEVANT).
- Configuración de webhooks (URLs de destino, eventos disparadores).

**Configuración de Seguridad:**
- Políticas de contraseñas (complejidad mínima, expiración).
- Activación de autenticación de dos factores (2FA) para administradores (opcional).

**f) Gestión de Usuarios Administradores:**

- Crear, editar, eliminar cuentas de **Super Administradores** adicionales de GRASSHOPPER.
- Asignar permisos granulares (ej: un Super Admin puede solo ver reportes, otro puede gestionar licencias).

**g) Logs de Auditoría:**

- Registro de todas las acciones críticas realizadas en el Super Administrator Panel:
  - Quién creó/editó/eliminó una institución.
  - Quién activó/desactivó licencias.
  - Quién modificó el catálogo de programas.
  - Timestamp de cada acción.
- Visualización de logs con filtros por usuario, fecha, tipo de acción.

**Acceso Exclusivo:**

El Super Administrator Panel es accesible **únicamente** para cuentas de **Super Administrador** de GRASSHOPPER. Ni los administradores institucionales (colegios) ni los estudiantes tienen visibilidad ni acceso a este panel.

---

### 2.8. Automatic PDF Report Generator (Generador Automático de Reportes PDF)

**Descripción:**
Funcionalidad que genera reportes profesionales en formato PDF con co-branding (Grasshopper + Colegio), conteniendo resultados de evaluaciones psicométricas, análisis de perfil y recomendaciones personalizadas, sin intervención manual.

**Funcionalidades:**

**a) Generación Automática al Completar Evaluaciones:**
- El reporte PDF se genera automáticamente cuando un estudiante:
  - Completa todas las evaluaciones psicométricas (MBTI, iStrong, Big 5, RIASEC).
  - El motor de IA finaliza el análisis y genera recomendaciones personalizadas.
- Proceso totalmente automatizado, sin necesidad de que un administrador active manualmente la generación.

**b) Estructura del Reporte PDF:**

El reporte debe contener las siguientes secciones:

**Portada:**
- Logo de Grasshopper (esquina superior izquierda).
- Logo del Colegio del estudiante (esquina superior derecha) - **Co-branding**.
- Título: "Reporte de Orientación Vocacional".
- Nombre completo del estudiante.
- Fecha de generación del reporte.

**Sección 1: Resumen Ejecutivo**
- Introducción breve sobre el propósito del reporte.
- Resumen de una frase del perfil psicométrico del estudiante (ej: "Eres una persona INTJ con fuerte inclinación hacia carreras investigativas y tecnológicas").

**Sección 2: Resultados de Evaluaciones Psicométricas**

**MBTI (Myers-Briggs Type Indicator):**
- Tipo de personalidad identificado (ej: INTJ - Arquitecto).
- Descripción del tipo de personalidad (fortalezas, debilidades, características clave).
- Carreras típicas para este tipo de personalidad.

**iStrong (Inventario de Intereses Profesionales):**
- Perfil de intereses vocacionales (gráfico de radar o barras mostrando puntuación en cada área: Ciencias, Artes, Negocios, Ayuda Social, etc.).
- Interpretación de intereses predominantes.

**Big 5 (Five Factor Model):**
- Gráfico de barras con puntuación en cada dimensión (Apertura, Responsabilidad, Extraversión, Amabilidad, Neuroticismo).
- Interpretación de cada dimensión y su relevancia para el ámbito académico/profesional.

**RIASEC (Holland Codes):**
- Código de Holland identificado (ej: IAE).
- Descripción de cada tipo (Investigativo, Artístico, Emprendedor).
- Ambientes laborales y carreras asociadas a ese código.

**Sección 3: Análisis de Perfil con IA**
- Consolidación del perfil del estudiante basado en evaluaciones + documentos cargados (si aplica).
- Fortalezas clave identificadas.
- Áreas de desarrollo o consideraciones.
- Habilidades técnicas o experiencia relevante (si se cargó CV).

**Sección 4: Recomendaciones Personalizadas**
- Listado de Top 5-10 programas académicos recomendados.
- Para cada programa:
  - Nombre del programa y universidad.
  - Descripción breve.
  - Razón de la recomendación (por qué se alinea con el perfil del estudiante).
  - Presupuesto estimado.
  - Duración y modalidad.
  - Información de contacto de la universidad.

**Sección 5: Próximos Pasos**
- Sugerencias de acciones que el estudiante puede tomar (ej: "Visita las páginas web de las universidades recomendadas", "Agenda una sesión de orientación con el consejero vocacional de tu colegio", "Contacta a Grasshopper para más información").

**Pie de Página:**
- Logo de Grasshopper y logo del Colegio.
- Información de contacto de Grasshopper (email, teléfono, sitio web).
- Disclaimer legal (ej: "Las recomendaciones de este reporte son generadas por algoritmos de IA y deben considerarse como herramientas de apoyo, no como dictámenes definitivos. Se recomienda complementar con orientación profesional humana").

**c) Co-Branding Personalizado:**
- El logo del colegio del estudiante debe aparecer en la portada y pie de página del reporte.
- Esto refuerza la percepción de que el servicio de orientación vocacional es **ofrecido por el colegio** (con soporte tecnológico de Grasshopper).
- El logo del colegio se configura automáticamente desde el Super Administrator Panel al crear la institución.

**d) Descarga y Distribución:**

**Descarga por Estudiante:**
- El estudiante puede descargar su reporte PDF desde su dashboard en cualquier momento.
- Botón de "Descargar Reporte" claramente visible.

**Descarga por Administrador Institucional:**
- Administradores de colegios pueden descargar reportes de sus estudiantes (útil para sesiones de orientación vocacional presenciales).

**Envío Automático por Email (Opcional):**
- Opción de enviar el reporte PDF automáticamente al email del estudiante al momento de generarse.
- Configurable desde el Super Administrator Panel (activar/desactivar envío automático).

**e) Diseño Visual Profesional:**
- El reporte debe tener diseño visual profesional, limpio y legible:
  - Uso de gráficos (barras, radar, iconos) para facilitar comprensión.
  - Tipografía clara (ej: sans-serif como Arial, Helvetica).
  - Uso de colores corporativos de Grasshopper y el colegio (configurable).
  - Espaciado adecuado, márgenes, separación de secciones.
  - Formato: A4 vertical, PDF optimizado (tamaño de archivo razonable: < 5 MB).

**Tecnología Sugerida para Generación de PDF:**
- Librerías: PDFKit (Node.js), ReportLab (Python), wkhtmltopdf (HTML a PDF), Puppeteer (HTML a PDF con renderizado de Chrome).
- Plantillas: Usar plantillas HTML + CSS para diseño del reporte, convertidas a PDF mediante librería.

---

### 2.9. Data Ownership & NDA (Propiedad de Datos y Acuerdo de Confidencialidad)

**Descripción:**
Garantías contractuales y técnicas que aseguran que GRASSHOPPER tiene propiedad exclusiva de la base de datos generada y que IRRELEVANT protege la confidencialidad de los datos.

**Garantías Contractuales:**

**a) Propiedad Exclusiva de la Base de Datos:**
- Conforme al Contrato Principal (Sección 5.6) y al Anexo 2 (NDA), todos los datos generados en la Plataforma Grasshopper son **propiedad exclusiva e irrevocable de GRASSHOPPER**.
- IRRELEVANT no tiene derechos de propiedad sobre los datos.

**b) Exportación de Datos Sin Restricciones:**
- GRASSHOPPER puede exportar la base de datos completa en cualquier momento, en formatos estándar (SQL dump, CSV, JSON).
- La exportación se realiza dentro de las 48 horas hábiles siguientes a la solicitud, sin costo adicional.

**c) No Uso, No Comercialización, No Retención Indebida:**
- IRRELEVANT se compromete contractualmente (Anexo 2, Sección 3.4) a **NO usar, comercializar, retener indebidamente ni explotar** los datos de GRASSHOPPER para fines propios, de terceros o de competidores.
- IRRELEVANT NO utilizará los datos de GRASSHOPPER para entrenar modelos de IA propios ni para generar datasets comercializables.

**d) Eliminación Post-Terminación:**
- Al término del contrato, IRRELEVANT eliminará completamente los datos de GRASSHOPPER de sus sistemas dentro de los 30 días, certificando por escrito dicha eliminación (salvo retención legal obligatoria tributaria).

**Funcionalidades Técnicas para Garantizar Propiedad de Datos:**

**a) Módulo de Exportación de Base de Datos:**
- Panel accesible desde el Super Administrator Panel que permite a GRASSHOPPER exportar:
  - **Exportación completa:** Toda la base de datos (estudiantes, evaluaciones, resultados, recomendaciones, instituciones, programas).
  - **Exportación selectiva:** Por institución, por fecha, por tipo de evaluación.
  - **Formatos disponibles:**
    - **SQL Dump:** Backup completo de la base de datos (formato .sql para PostgreSQL, MySQL).
    - **CSV:** Archivos CSV separados por tablas (ej: estudiantes.csv, evaluaciones.csv, resultados.csv).
    - **JSON:** Exportación en formato JSON estructurado.
- Proceso de exportación:
  - GRASSHOPPER hace clic en "Exportar Base de Datos".
  - Selecciona formato y alcance.
  - Sistema genera archivo comprimido (.zip) con la exportación.
  - Descarga inmediata o envío a email de GRASSHOPPER.

**b) Auditoría de Accesos a Datos:**
- Registro de todos los accesos a datos sensibles de GRASSHOPPER por parte del equipo de IRRELEVANT (para diagnóstico técnico, soporte).
- Logs incluyen: quién accedió, cuándo, qué datos consultó, desde qué IP.
- GRASSHOPPER puede solicitar revisión de logs de acceso para auditoría.

**c) Segregación de Datos por Cliente (Si IRRELEVANT Usa la Plataforma para Otros Clientes - Futuro):**
- Si en el futuro IRRELEVANT usa la misma arquitectura para otros clientes (multi-tenancy), los datos de GRASSHOPPER deben estar **completamente segregados** lógica y físicamente de datos de otros clientes, con garantías técnicas de no contaminación cruzada.

**Protección de Confidencialidad:**

Conforme al **Anexo 2 - NDA**:
- IRRELEVANT protege la confidencialidad de los datos de GRASSHOPPER con estándar de cuidado razonable.
- Medidas de seguridad técnicas: cifrado en tránsito (HTTPS/TLS), control de accesos basado en roles, backups cifrados, monitoreo de seguridad.
- Notificación de incidentes de seguridad dentro de 24 horas.
- Obligación de confidencialidad permanece vigente por 5 años post-terminación del contrato (datos personales sensibles: indefinidamente).

---

## 3. CRONOGRAMA DE IMPLEMENTACIÓN: 12 SEMANAS

La implementación de la Plataforma Grasshopper seguirá un cronograma estructurado de **12 semanas**, distribuido en **4 fases** con hitos claros y entregables validables.

### FASE 1: DISCOVERY & ARQUITECTURA (Semanas 1-3)

**Duración:** 3 semanas
**Objetivo:** Definir arquitectura técnica completa, diseñar experiencia de usuario (UX/UI) y construir el núcleo base de la plataforma.

**Actividades:**

**Semana 1: Discovery Técnico y Funcional**
- Reunión de kickoff con equipo de GRASSHOPPER para alinear expectativas y validar alcance.
- Análisis detallado de requerimientos funcionales y técnicos.
- Definición de stack tecnológico definitivo (frontend, backend, base de datos, infraestructura cloud, servicios de IA).
- Arquitectura de sistemas: diagramas de componentes, flujos de datos, modelos de integración.
- Definición de estructura de base de datos (entidades, relaciones, índices).

**Semana 2: Diseño UX/UI**
- Wireframes (prototipos de baja fidelidad) de todas las pantallas clave:
  - Dashboards (Super Admin, Admin Institucional, Estudiante).
  - Flujos de evaluaciones psicométricas.
  - Super Administrator Panel.
  - B2B Panel.
  - Visualización de resultados y recomendaciones.
- Mockups (prototipos de alta fidelidad) con diseño visual, colores, tipografías, iconografía.
- Revisión y aprobación de diseños por parte de GRASSHOPPER.

**Semana 3: Platform Core - Funcionalidad Base**
- Desarrollo de infraestructura base:
  - Configuración de repositorio de código (Git, GitHub/GitLab/Bitbucket).
  - Configuración de ambientes de desarrollo (dev), staging (pre-producción) y producción.
  - Setup de base de datos (PostgreSQL o MySQL).
  - Configuración de CI/CD (integración continua / despliegue continuo) básico.
- Implementación de **Platform Core** (Sección 2.1):
  - Sistema de autenticación y autorización (registro, login, recuperación de contraseña).
  - Control de accesos basado en roles (Super Admin, Admin Institucional, Estudiante).
  - Dashboard principal (estructura base, pendiente de integrar datos reales).
  - Navegación y menús por rol.

**Entregables de Fase 1:**
- Documento de arquitectura técnica.
- Wireframes y mockups aprobados.
- Platform Core funcional en ambiente de desarrollo (login, dashboards base, roles).
- Ambientes de dev, staging y producción configurados.

**Criterio de Aceptación:**
GRASSHOPPER puede crear usuarios de prueba, hacer login, visualizar dashboards vacíos (estructura sin datos reales todavía).

---

### FASE 2: MOTOR DE TESTS + IA (Semanas 4-7)

**Duración:** 4 semanas
**Objetivo:** Implementar motor de evaluaciones psicométricas, motor de análisis con IA, generador de reportes PDF y panel de super administrador.

**Actividades:**

**Semana 4: Assessment Tools - Evaluaciones Psicométricas**
- Implementación de motor de tests (Sección 2.2):
  - Integración de cuestionarios de MBTI, iStrong, Big 5, RIASEC (con cuestionarios proporcionados por GRASSHOPPER o versiones de dominio público).
  - Interfaz de usuario para presentación de preguntas (responsive, barra de progreso, guardado automático).
  - Motor de scoring y cálculo de resultados para cada evaluación.
  - Almacenamiento de resultados en base de datos.
- Módulo de carga de archivos (CV, portafolio) con validación de formatos y almacenamiento seguro.

**Semana 5: AI Analysis Engine - Motor de IA**
- Implementación de motor de análisis con IA (Sección 2.3):
  - Integración de APIs de modelos de lenguaje (GPT-4, Claude, Gemini) para generación de recomendaciones.
  - Procesamiento de documentos cargados (OCR, NLP) para extracción de información de CV.
  - Algoritmo de matching de perfil del estudiante con programas académicos (base de datos de programas).
  - Generación de recomendaciones personalizadas (Top 5-10 programas).
- Visualización de resultados de evaluaciones y recomendaciones en dashboard del estudiante.

**Semana 6: Super Administrator Panel**
- Implementación de panel de super administrador (Sección 2.7):
  - CRUD de instituciones educativas (crear, editar, eliminar colegios).
  - Gestión de licencias (activar, desactivar, monitorear consumo).
  - Gestión de catálogo de programas académicos (CRUD de universidades y programas, importación CSV).
  - Configuración de parámetros operativos (co-branding, notificaciones, webhooks).
  - Logs de auditoría.
- Acceso restringido por rol (solo Super Admins de GRASSHOPPER).

**Semana 7: Automatic PDF Report Generator**
- Implementación de generador de reportes PDF (Sección 2.8):
  - Diseño de plantilla HTML/CSS para reporte profesional.
  - Lógica de generación automática al completar evaluaciones + análisis de IA.
  - Co-branding (logo de Grasshopper + logo del colegio).
  - Inclusión de resultados de evaluaciones (gráficos, textos), análisis de IA, recomendaciones personalizadas.
  - Funcionalidad de descarga de PDF desde dashboard del estudiante y administrador institucional.
  - Envío automático de reporte por email (opcional, configurable).

**Entregables de Fase 2:**
- Motor de evaluaciones psicométricas funcional (MBTI, iStrong, Big 5, RIASEC).
- Motor de IA generando recomendaciones personalizadas.
- Super Administrator Panel operativo (GRASSHOPPER puede crear colegios, gestionar licencias, actualizar catálogo de programas).
- Reportes PDF generándose automáticamente con co-branding.

**Criterio de Aceptación:**
GRASSHOPPER puede:
- Crear un colegio de prueba.
- Registrar un estudiante de prueba.
- Completar las 4 evaluaciones psicométricas.
- Visualizar resultados y recomendaciones personalizadas.
- Descargar reporte PDF con co-branding del colegio de prueba.

---

### FASE 3: INTEGRACIÓN & B2B (Semanas 8-10)

**Duración:** 3 semanas
**Objetivo:** Implementar sincronización con Bitrix CRM, panel B2B para gestión institucional, base de datos de programas académicos, y realizar pruebas end-to-end de flujo completo.

**Actividades:**

**Semana 8: Bitrix CRM Sync - Integración con CRM**
- Implementación de sincronización con Bitrix (Sección 2.5):
  - Configuración de webhooks para disparar sincronización al completar evaluaciones.
  - Integración con API de Bitrix24 para creación de Leads.
  - Mapeo de datos del estudiante a campos de Bitrix (datos básicos, perfil psicométrico, presupuesto, programas de interés).
  - Sistema de logging y reintentos automáticos en caso de fallo.
  - Notificación al Super Admin en caso de fallo de sincronización.
- Pruebas de integración con cuenta Bitrix de prueba de GRASSHOPPER.

**Semana 9: B2B Panel - Panel de Gestión Institucional**
- Implementación de B2B Panel (Sección 2.4):
  - Dashboard de métricas consolidadas (globales para Super Admin, por institución para Admin Institucional).
  - Visualización de licencias activas, estudiantes registrados, evaluaciones completadas.
  - Reportes visuales (gráficos, tablas) con tendencias de crecimiento.
  - Exportación de reportes en CSV, PDF, Excel.
  - Notificaciones y alertas (licencias próximas a vencer, nuevos estudiantes, etc.).
- Acceso diferenciado por rol (Super Admin ve todo, Admin Institucional ve solo su institución).

**Semana 10: Program Database & Testing End-to-End**
- Implementación de base de datos de programas académicos (Sección 2.6):
  - CRUD completo de universidades y programas.
  - Importación masiva de programas desde CSV/Excel.
  - Exportación de catálogo.
  - Integración con motor de IA para matching de recomendaciones.
- **Pruebas end-to-end del flujo completo:**
  - Crear colegio → Registrar estudiante → Completar evaluaciones → Análisis de IA → Reporte PDF → Sincronización con Bitrix.
  - Validar que todos los componentes funcionan integrados.
  - Detectar y corregir errores de integración.

**Entregables de Fase 3:**
- Sincronización con Bitrix CRM operativa (leads creándose automáticamente en Bitrix).
- B2B Panel funcional (métricas, reportes, exportación).
- Base de datos de programas académicos operativa (GRASSHOPPER puede gestionar catálogo).
- Flujo end-to-end validado (de estudiante registrándose a lead en Bitrix).

**Criterio de Aceptación:**
GRASSHOPPER puede:
- Registrar 5 colegios de prueba con licencias activas.
- Crear 20 estudiantes de prueba distribuidos en los colegios.
- Completar evaluaciones de los 20 estudiantes.
- Verificar que se crean 20 leads en Bitrix CRM con datos enriquecidos.
- Visualizar métricas consolidadas en B2B Panel.
- Exportar reporte CSV de estudiantes.

---

### FASE 4: QA & LANZAMIENTO (Semanas 11-12)

**Duración:** 2 semanas
**Objetivo:** Realizar pruebas exhaustivas de calidad (QA funcional, seguridad, rendimiento), capacitar al equipo de GRASSHOPPER, preparar documentación, y migrar a producción oficial.

**Actividades:**

**Semana 11: QA (Quality Assurance)**

**QA Funcional:**
- Pruebas de funcionalidad de todos los módulos (Platform Core, Assessment Tools, AI Analysis, Super Admin Panel, B2B Panel, Bitrix Sync, PDF Generator).
- Validación de flujos completos (happy paths y edge cases).
- Pruebas de roles y permisos (verificar que cada rol solo accede a lo autorizado).
- Pruebas de usabilidad (navegación intuitiva, claridad de mensajes de error, experiencia de usuario).
- Testing en múltiples navegadores (Chrome, Firefox, Safari, Edge) y dispositivos (desktop, tablet, mobile).

**QA de Seguridad:**
- Pruebas de vulnerabilidades comunes (OWASP Top 10):
  - Inyección SQL (SQL Injection).
  - Cross-Site Scripting (XSS).
  - Cross-Site Request Forgery (CSRF).
  - Autenticación y gestión de sesiones inseguras.
  - Exposición de datos sensibles.
- Validación de cifrado en tránsito (HTTPS/TLS).
- Revisión de control de accesos (no debe ser posible que un estudiante acceda a datos de otro estudiante, ni que un Admin Institucional vea datos de otra institución).
- Pruebas de carga de archivos (validar que no se puedan subir archivos maliciosos: scripts, ejecutables).

**QA de Rendimiento:**
- Pruebas de carga (load testing) para validar que la plataforma soporta volumen esperado de usuarios concurrentes (ej: 100 estudiantes realizando evaluaciones simultáneamente).
- Pruebas de tiempo de respuesta (página debe cargar en < 3 segundos bajo carga normal).
- Optimización de consultas a base de datos (índices, queries eficientes).
- Optimización de carga de assets (imágenes comprimidas, minificación de CSS/JS, CDN).

**Reporte de Bugs y Corrección:**
- Documentación de todos los bugs encontrados en herramienta de tracking (Jira, GitHub Issues, Trello).
- Priorización de bugs (críticos, altos, medios, bajos).
- Corrección de bugs críticos y altos antes del lanzamiento (bugs medios y bajos pueden priorizarse post-lanzamiento si no afectan funcionalidad core).

**Semana 12: Capacitación, Documentación y Lanzamiento**

**Capacitación al Equipo de GRASSHOPPER:**
- Sesiones de capacitación (presencial o remota) para equipo de GRASSHOPPER:
  - **Sesión 1: Operación del Super Administrator Panel** (2-3 horas):
    - Cómo crear y gestionar colegios.
    - Cómo activar/desactivar licencias.
    - Cómo actualizar catálogo de programas académicos.
    - Cómo interpretar reportes y métricas.
    - Cómo exportar base de datos.
  - **Sesión 2: Operación del B2B Panel y Gestión de Instituciones** (1-2 horas):
    - Cómo administradores institucionales (colegios) gestionan sus estudiantes.
    - Cómo visualizar reportes institucionales.
  - **Sesión 3: Troubleshooting y Soporte Básico** (1-2 horas):
    - Cómo diagnosticar problemas comunes (estudiante no puede completar evaluación, reporte PDF no se genera, sincronización con Bitrix falla).
    - Cómo revisar logs de auditoría.
    - Cuándo contactar a IRRELEVANT para soporte técnico (problemas que GRASSHOPPER no puede resolver autónomamente).
- Entrega de grabaciones de sesiones de capacitación para referencia futura.

**Documentación Entregada:**

**Documentación Técnica:**
- Arquitectura técnica de la plataforma (diagramas de componentes, flujos de datos, stack tecnológico).
- Modelos de datos (entidades de base de datos, relaciones, índices).
- Especificación de APIs (endpoints de integraciones, webhooks).
- Guía de mantenimiento técnico (cómo actualizar dependencias, cómo aplicar parches de seguridad - para que IRRELEVANT lo haga durante servicio mensual).

**Documentación de Usuario:**
- **Manual del Super Administrador:** Guía paso a paso de todas las funcionalidades del Super Administrator Panel (creación de colegios, gestión de licencias, actualización de catálogo, exportación de datos).
- **Manual del Administrador Institucional:** Guía para administradores de colegios (cómo gestionar estudiantes, cómo visualizar reportes institucionales).
- **Manual del Estudiante:** Guía breve para estudiantes (cómo registrarse, cómo completar evaluaciones, cómo descargar reporte PDF).
- **FAQs (Preguntas Frecuentes):** Respuestas a preguntas comunes de operación.
- **Guía de Troubleshooting:** Diagnóstico y solución de problemas comunes.

**Migración a Producción:**
- Configuración definitiva de ambiente de producción (servidores cloud, base de datos de producción, certificados SSL, dominio personalizado de GRASSHOPPER).
- Migración de datos de prueba a producción (si aplica) o inicio con base de datos limpia.
- Configuración de monitoreo de producción (uptime monitoring, alertas de errores, logs de aplicación).
- Configuración de backups automáticos de base de datos (diarios, retención de 30 días).
- Pruebas finales en ambiente de producción (smoke testing: validar que funcionalidades críticas operan correctamente en producción).

**Lanzamiento Oficial:**
- Entrega formal de credenciales de acceso al Super Administrator Panel a GRASSHOPPER.
- Notificación de que la plataforma está en producción y lista para operación.
- **Período de validación de 5 días hábiles** para que GRASSHOPPER pruebe la plataforma en producción y reporte eventuales no conformidades funcionales (conforme a Sección 4.5 del Contrato Principal).

**Entregables de Fase 4:**
- Plataforma Grasshopper funcional en ambiente de producción.
- Documentación técnica y de usuario completa.
- Capacitación completada y grabaciones entregadas.
- Credenciales de acceso a producción.
- Certificación de que QA fue completado sin bugs críticos pendientes.

**Criterio de Aceptación:**
GRASSHOPPER valida que:
- La plataforma está accesible en producción (URL definitiva).
- Todos los componentes core funcionan según especificaciones del Anexo 3.
- Documentación técnica y de usuario está completa y clara.
- Equipo de GRASSHOPPER está capacitado y puede operar autónomamente el Super Administrator Panel.
- No existen bugs críticos que impidan operación.

**Cierre de Implementación:**
- GRASSHOPPER firma acta de aceptación de la plataforma (o el período de validación de 5 días concluye sin observaciones).
- IRRELEVANT factura el saldo final del 50% de implementación ($8.032.500 COP con IVA).
- Inicia el período de servicio mensual recurrente (fee mensual de $2.000.000 + IVA).

---

## 4. ENTREGABLES FINALES DE LA IMPLEMENTACIÓN

Al cierre exitoso de las 12 semanas de implementación, IRRELEVANT entregará a GRASSHOPPER los siguientes entregables:

### 4.1. Plataforma Grasshopper en Producción

- Sistema SaaS completamente funcional, accesible en ambiente de producción con los 6 componentes core + 3 adiciones críticas operativos:
  - Platform Core.
  - Assessment Tools (MBTI, iStrong, Big 5, RIASEC).
  - AI Analysis Engine.
  - B2B Panel.
  - Bitrix CRM Sync.
  - Program Database.
  - Super Administrator Panel.
  - Automatic PDF Report Generator.
  - Data Ownership & NDA (garantías contractuales y técnicas).

### 4.2. Documentación Técnica Completa

- **Documento de Arquitectura Técnica:** Diagramas de componentes, flujos de datos, stack tecnológico utilizado.
- **Modelos de Datos:** Esquemas de base de datos (entidades, relaciones, índices, tipos de datos).
- **Especificación de APIs:** Documentación de endpoints de APIs internas y de integración con Bitrix CRM.
- **Guía de Mantenimiento Técnico:** Procedimientos para actualización de dependencias, aplicación de parches de seguridad, troubleshooting técnico.

### 4.3. Documentación de Usuario

- **Manual del Super Administrador:** Guía completa de operación del Super Administrator Panel (creación de colegios, gestión de licencias, actualización de catálogo, exportación de datos).
- **Manual del Administrador Institucional:** Guía para administradores de colegios.
- **Manual del Estudiante:** Guía breve para usuarios finales.
- **FAQs (Preguntas Frecuentes):** Respuestas a preguntas operativas comunes.
- **Guía de Troubleshooting:** Diagnóstico y solución de problemas comunes.

### 4.4. Capacitación Completada

- Tres (3) sesiones de capacitación al equipo de GRASSHOPPER (operación del Super Admin Panel, B2B Panel, troubleshooting).
- Grabaciones de sesiones de capacitación entregadas en formato MP4 o enlace a plataforma de video (Google Drive, Vimeo, Loom).

### 4.5. Credenciales de Acceso

- Credenciales de acceso al Super Administrator Panel (cuenta de Super Admin principal para GRASSHOPPER).
- Credenciales de acceso a ambientes de staging (pre-producción) para pruebas futuras.
- Información de acceso a sistemas de monitoreo y logs (si aplica).

### 4.6. Ambiente de Producción Configurado

- Infraestructura cloud configurada y operativa:
  - Servidores de aplicación (backend, frontend).
  - Base de datos de producción (PostgreSQL o MySQL).
  - Almacenamiento de archivos (S3, Google Cloud Storage o similar).
  - CDN (Content Delivery Network) para optimización de carga.
  - Certificados SSL/TLS para conexiones seguras (HTTPS).
  - Dominio personalizado configurado (ej: app.grasshopper.com o plataforma.grasshopper.com, según URL definida por GRASSHOPPER).
- Monitoreo de producción:
  - Uptime monitoring (ej: UptimeRobot, Pingdom).
  - Logging de errores (ej: Sentry, Rollbar).
  - Métricas de rendimiento (ej: New Relic, Datadog - opcional).
- Backups automáticos:
  - Backups diarios de base de datos con retención de 30 días.
  - Backups de archivos cargados por usuarios (opcional, si el volumen lo justifica).

### 4.7. Certificación de QA Completado

- Reporte de QA resumido que certifica que:
  - QA funcional, de seguridad y de rendimiento fueron completados.
  - Bugs críticos y altos fueron corregidos.
  - La plataforma cumple con estándares de calidad profesionales.
  - No existen vulnerabilidades de seguridad conocidas de severidad crítica o alta (OWASP Top 10).

---

## 5. GARANTÍAS Y CONDICIONES TÉCNICAS

### 5.1. Garantía Funcional (90 días)

IRRELEVANT garantiza que la Plataforma Grasshopper cumplirá con las especificaciones funcionales documentadas en este Anexo 3 durante los primeros **90 días posteriores a la puesta en producción** (conforme a Sección 9.4 del Contrato Principal).

**Alcance de la Garantía:**
- Cualquier desviación, error o incumplimiento funcional respecto al alcance de este Anexo 3 será corregido por IRRELEVANT **sin costo adicional** dentro de un plazo razonable:
  - Errores críticos (plataforma inaccesible, funcionalidad core inoperativa): **5 días hábiles**.
  - Errores no críticos (bugs menores que no afectan funcionalidad core): **15 días hábiles**.

**Proceso de Reporte:**
GRASSHOPPER reportará bugs o no conformidades a jpgomez@stayirrelevant.com, indicando:
- Descripción clara del error.
- Pasos para reproducir el error.
- Severidad (crítica, alta, media, baja).
- Capturas de pantalla o logs si están disponibles.

IRRELEVANT confirmará recepción del reporte dentro de 24 horas hábiles e investigará el error.

**Exclusiones de la Garantía:**
No están cubiertos por la garantía funcional:
- Errores causados por mal uso, configuración incorrecta o modificaciones no autorizadas por parte de GRASSHOPPER.
- Solicitudes de nuevas funcionalidades no documentadas en este Anexo 3 (requerirán cotización separada).
- Incompatibilidad con navegadores obsoletos (ej: Internet Explorer 11) o sistemas operativos no soportados.

### 5.2. Garantía de Disponibilidad (Uptime 99%)

IRRELEVANT se compromete a mantener la Plataforma Grasshopper disponible con un **objetivo de uptime del 99% mensual** (conforme a Sección 9.1 del Contrato Principal).

**Cálculo de Uptime:**
Uptime = (Total de minutos en el mes - Minutos de indisponibilidad no excluidos) / Total de minutos en el mes × 100

**Ejemplo:**
Mes de 30 días = 43,200 minutos.
Indisponibilidad no programada = 432 minutos (7.2 horas).
Uptime = (43,200 - 432) / 43,200 × 100 = **99%**.

**Exclusiones del Cálculo (No se cuentan como tiempo de indisponibilidad):**
- Mantenimientos programados notificados con 48 horas de anticipación (preferiblemente en horarios nocturnos o fines de semana).
- Fuerza mayor (desastres naturales, pandemias, guerras, actos terroristas).
- Caídas atribuibles a infraestructura externa fuera del control de IRRELEVANT (proveedores de cloud AWS/Google/Azure, proveedores de internet, APIs de terceros como Bitrix).
- Indisponibilidad causada por acciones de GRASSHOPPER (ej: ataque DDoS dirigido a GRASSHOPPER, sobrecarga intencional de la plataforma).

**Remedios en Caso de Incumplimiento de Uptime:**
Si el uptime cae por debajo del 99% en un mes calendario por causas atribuibles a IRRELEVANT (sin exclusiones):
- GRASSHOPPER puede solicitar un **crédito proporcional** en el fee mensual del mes siguiente.
- Fórmula de crédito: (99% - Uptime real) × Fee mensual.
- Ejemplo: Si uptime fue 97%, crédito = (99% - 97%) × $2.000.000 = $40.000 (descuento en el fee del mes siguiente).

Este crédito es el **único remedio** por incumplimiento de uptime (sin perjuicio de otros derechos en caso de incumplimiento grave reiterado que justifique terminación del contrato).

### 5.3. Soporte Técnico Post-Lanzamiento

Durante el período de servicio mensual (mientras se pague el fee mensual), IRRELEVANT proporcionará soporte técnico a GRASSHOPPER conforme a la **Sección 9.3 del Contrato Principal**:

| Severidad | Tiempo de Respuesta Inicial |
|-----------|----------------------------|
| Crítica (plataforma inaccesible, funcionalidad core inoperativa) | 4 horas hábiles |
| Alta (funcionalidad importante afectada, existen workarounds) | 12 horas hábiles |
| Media (error en funcionalidad secundaria, workarounds razonables) | 24 horas hábiles |
| Baja (consultas, mejoras, dudas operativas) | 48 horas hábiles |

**Horario de Soporte:** Lunes a viernes, 8:00 AM - 6:00 PM, hora de Colombia, excluyendo festivos nacionales colombianos.

**Canal de Soporte:** Email a jpgomez@stayirrelevant.com (puede habilitarse canal adicional como WhatsApp o Slack por acuerdo entre las partes).

### 5.4. Limitaciones de la Inteligencia Artificial

IRRELEVANT advierte expresamente que las tecnologías de inteligencia artificial integradas en la plataforma tienen las siguientes limitaciones inherentes:

**a) Los sistemas de IA no son infalibles:**
- Pueden producir recomendaciones inexactas, sesgadas o no óptimas en casos particulares.
- Las recomendaciones de IA deben considerarse **herramientas de apoyo**, no dictámenes definitivos.

**b) GRASSHOPPER es responsable final** de:
- Validar la pertinencia de las recomendaciones generadas antes de presentarlas a usuarios finales.
- Implementar disclaimers apropiados en la plataforma y reportes PDF informando a estudiantes que las recomendaciones son generadas por algoritmos de IA.
- Complementar las recomendaciones de IA con orientación profesional humana cuando sea apropiado.

**c) IRRELEVANT no garantiza:**
- Precisión del 100% en análisis o recomendaciones generadas por IA.
- Que las recomendaciones resulten en éxito académico o profesional del estudiante.
- Que los modelos de IA no tengan sesgos (todos los modelos de IA pueden tener sesgos derivados de sus datos de entrenamiento).

**d) Obligación de Disclaimer:**
GRASSHOPPER debe incluir en todos los reportes PDF y pantallas de resultados un disclaimer similar a:

> "Las recomendaciones de este reporte son generadas por algoritmos de inteligencia artificial y deben considerarse como herramientas de apoyo en tu proceso de orientación vocacional. Te recomendamos complementar esta información con orientación profesional humana (consejeros vocacionales, psicólogos, mentores) y realizar tu propia investigación sobre los programas sugeridos antes de tomar decisiones académicas o profesionales importantes."

IRRELEVANT no asume responsabilidad por decisiones académicas o profesionales de estudiantes basadas únicamente en recomendaciones de IA, sin complemento de orientación humana.

### 5.5. Escalabilidad y Límites de Capacidad

**Capacidad Inicial Proyectada:**
La plataforma está diseñada para soportar (de manera enunciativa, no limitativa):
- Hasta **100 instituciones educativas** simultáneas activas.
- Hasta **10,000 estudiantes registrados** globalmente.
- Hasta **5,000 evaluaciones mensuales** concurrentes.
- Almacenamiento de hasta **500 GB** de documentos cargados (CV, portafolios, archivos).
- Procesamiento de hasta **10,000 análisis de IA mensuales** (con costos de API de IA dentro de proyección razonable de ~$500 USD/mes).

**Escalabilidad:**
La plataforma está construida sobre infraestructura cloud escalable (AWS, Google Cloud o Azure), lo que permite aumentar capacidad conforme crece la operación de GRASSHOPPER (escalabilidad horizontal: agregar más servidores, escalabilidad vertical: aumentar recursos de servidores existentes).

**Revisión de Capacidad:**
Si GRASSHOPPER anticipa crecimiento significativo que exceda los límites proyectados (ej: planea llegar a 500 instituciones o 50,000 estudiantes), deberá notificar a IRRELEVANT con al menos **30 días de anticipación** para:
- Validar que la infraestructura actual soportará el crecimiento.
- Escalar infraestructura proactivamente si es necesario.
- Evaluar si el fee mensual actual cubre los costos incrementales de infraestructura y servicios de IA (conforme a Sección 5.2 del Anexo 1).

### 5.6. Compatibilidad de Navegadores y Dispositivos

**Navegadores Soportados:**
La plataforma será compatible con las **versiones recientes** (últimos 2 años) de los siguientes navegadores:
- Google Chrome (desktop y mobile).
- Mozilla Firefox (desktop y mobile).
- Safari (desktop y mobile - iOS).
- Microsoft Edge (desktop).

**Dispositivos Soportados:**
- Desktop / Laptop (Windows, macOS, Linux).
- Tablets (iPad, Android tablets).
- Smartphones (iOS, Android) - diseño responsive mobile-friendly.

**Navegadores NO Soportados:**
- Internet Explorer 11 o versiones anteriores (obsoletos y inseguros).
- Navegadores muy antiguos sin soporte de estándares web modernos (HTML5, CSS3, ES6).

Si GRASSHOPPER requiere soporte para navegadores obsoletos, esto requerirá desarrollo adicional con cotización separada.

### 5.7. Protección de Datos Personales y Cumplimiento Legal

**Responsabilidad de Roles:**
- **GRASSHOPPER** actúa como **Responsable del Tratamiento** de datos personales de estudiantes (conforme a Ley 1581 de 2012 de Colombia).
- **IRRELEVANT** actúa como **Encargado del Tratamiento**, procesando datos únicamente bajo instrucciones de GRASSHOPPER.

**Obligaciones de GRASSHOPPER:**
- Obtener consentimientos informados de estudiantes para tratamiento de sus datos personales.
- Implementar avisos de privacidad claros y conformes a normativa colombiana.
- Atender derechos de los titulares (acceso, corrección, supresión de datos) conforme a la ley.
- Responder ante autoridades de protección de datos (Superintendencia de Industria y Comercio) por el tratamiento de datos.

**Obligaciones de IRRELEVANT:**
- Implementar medidas de seguridad técnicas y organizativas razonables para proteger datos personales (conforme a Sección 8.4 del Contrato Principal).
- Notificar a GRASSHOPPER dentro de 24 horas sobre incidentes de seguridad que puedan afectar datos personales.
- No usar datos personales de estudiantes para fines propios ni comercializarlos.
- Eliminar datos personales de estudiantes al término del contrato (conforme a Sección 8.6 del Contrato Principal y Anexo 2).

**Cumplimiento de Normativa Colombiana:**
La plataforma cumple con normativa colombiana aplicable:
- Ley 1581 de 2012 (Protección de Datos Personales).
- Decreto 1377 de 2013 (Reglamentario de la Ley 1581).
- Código de Comercio Colombiano (obligaciones contractuales).

Si en el futuro GRASSHOPPER expande operaciones a otros países con normativas de datos más estrictas (ej: GDPR de la Unión Europea, LGPD de Brasil), podrán requerirse ajustes a la plataforma para cumplimiento, los cuales serán cotizados separadamente.

---

## 6. EXCLUSIONES DEL ALCANCE

Las siguientes funcionalidades, servicios o desarrollos **NO están incluidos** en este Anexo 3 y requerirán cotización y adenda contractual separada si GRASSHOPPER los solicita en el futuro:

### 6.1. Desarrollos Adicionales Post-Lanzamiento

- Nuevas funcionalidades o módulos no especificados en este anexo (ej: módulo de chat en vivo, módulo de agendamiento de sesiones de orientación vocacional, integración con otras plataformas externas más allá de Bitrix).
- Personalización avanzada de interfaz por institución educativa (ej: cada colegio tiene diseño visual completamente diferente).
- Desarrollo de aplicaciones móviles nativas (iOS, Android) - la plataforma es web responsive, pero apps nativas requerirían desarrollo adicional.

### 6.2. Integraciones Adicionales

- Integración con plataformas de pago (pasarelas de pago, checkout) si GRASSHOPPER decide cobrar directamente a estudiantes - actualmente la plataforma no incluye módulo de pagos.
- Integración con sistemas LMS (Learning Management Systems) de colegios (Moodle, Canvas, Google Classroom).
- Integración con sistemas de información estudiantil (SIS) de colegios para importación automatizada de listados de estudiantes.
- Integración con otras herramientas de CRM más allá de Bitrix (ej: HubSpot, Salesforce, Zoho CRM).

### 6.3. Capacitación y Soporte Adicional

- Capacitación a usuarios finales (estudiantes) o personal de instituciones educativas clientes de GRASSHOPPER.
- Capacitación adicional al equipo de GRASSHOPPER más allá de las 3 sesiones iniciales post-lanzamiento.
- Consultoría estratégica, comercial o de marketing para GRASSHOPPER.
- Soporte a usuarios finales (estudiantes) - GRASSHOPPER es responsable de atender consultas de sus usuarios finales.

### 6.4. Servicios de Contenido

- Creación de contenidos educativos, guías de orientación vocacional, artículos de blog, videos explicativos - GRASSHOPPER es responsable de generar contenidos propios si desea enriquecer la plataforma.
- Traducción de la plataforma a otros idiomas más allá del español (si se requiere versión en inglés, francés, etc., requerirá cotización separada).

### 6.5. Licencias de Tests Psicométricos Oficiales

- Adquisición de licencias oficiales de tests psicométricas propietarios (ej: MBTI certificado por The Myers-Briggs Company, Strong Interest Inventory oficial) - GRASSHOPPER es responsable de adquirir dichas licencias si desea integrar versiones oficiales certificadas. IRRELEVANT implementará las evaluaciones con base en cuestionarios proporcionados por GRASSHOPPER o versiones de dominio público.

### 6.6. Marketing, Ventas y Operación Comercial

- Servicios de marketing digital, SEO, publicidad, generación de leads para GRASSHOPPER.
- Ventas de licencias a colegios en nombre de GRASSHOPPER.
- Atención comercial a colegios o estudiantes.

---

## 7. CONDICIONES DE MODIFICACIÓN DEL ALCANCE

**7.1. Solicitudes de Cambio (Change Requests):**
Si durante la implementación o después del lanzamiento GRASSHOPPER solicita modificaciones, adiciones o ajustes al alcance definido en este Anexo 3, se seguirá el siguiente procedimiento:

**Paso 1 - Solicitud Formal:**
GRASSHOPPER enviará solicitud por escrito (email a jpgomez@stayirrelevant.com) detallando:
- Descripción clara de la modificación solicitada.
- Justificación (por qué es necesaria la modificación).
- Urgencia (crítica, alta, media, baja).

**Paso 2 - Análisis de Impacto:**
IRRELEVANT analizará la solicitud y responderá dentro de 5 días hábiles con:
- Viabilidad técnica (si es posible implementar la modificación).
- Impacto en cronograma (cuánto tiempo tomará).
- Impacto en costo (cotización de la modificación).
- Impacto en funcionalidades existentes (si la modificación puede afectar otras funcionalidades).

**Paso 3 - Aprobación o Rechazo:**
GRASSHOPPER decide si:
- **Aprobar la modificación:** Se firma adenda contractual con nuevo alcance, precio y cronograma ajustado.
- **Rechazar la modificación:** Se mantiene el alcance original del Anexo 3 sin cambios.
- **Posponer la modificación:** Se implementará post-lanzamiento como desarrollo adicional separado.

**Importante:** Modificaciones solicitadas durante la implementación pueden retrasar el cronograma de 12 semanas. IRRELEVANT no será responsable de incumplimiento de plazo si el retraso es atribuible a solicitudes de cambio de GRASSHOPPER.

**7.2. Mejoras Proactivas de IRRELEVANT:**
Si IRRELEVANT identifica durante el desarrollo oportunidades de mejora técnica que no alteran el alcance funcional pero optimizan rendimiento, seguridad o experiencia de usuario, podrá implementarlas sin costo adicional, notificando a GRASSHOPPER.

---

## 8. VALIDEZ Y FIRMA DEL ANEXO

Este Anexo 3 - Alcance Técnico y Funcional forma parte integral del Contrato de Licenciamiento y Desarrollo de Plataforma SaaS Grasshopper firmado el 5 de mayo de 2026.

El alcance aquí definido es **exacto, exclusivo y exhaustivo**. Cualquier funcionalidad, módulo o servicio no documentado expresamente en este anexo NO forma parte del alcance contractual y requerirá negociación separada.

---

### FIRMAS

En constancia de aceptación del alcance técnico y funcional establecido en este anexo, las partes suscriben:

---

**POR IRRELEVANT CLUB S.A.S.**

Firma: _______________________________
Nombre: Juan Pablo Gómez Mejía
CC: 1006972309
Cargo: Representante Legal
Fecha: 5 de mayo de 2026

---

**POR GRASSHOPPER INTERNATIONAL**

Firma: _______________________________
Nombre: Sandra Bustamante
CC: 43567124
Cargo: Representante Legal
Fecha: 5 de mayo de 2026

---

*FIN DEL ANEXO 3*
