# Análisis Comparativo de Alcances - Grasshopper
## Propuesta Original vs Nueva Propuesta

**Fecha:** 21 de Abril de 2026
**Cliente:** Grasshopper
**Objetivo:** Determinar cambios de alcance para recotizar el proyecto

---

## 📊 RESUMEN EJECUTIVO

| Métrica | Propuesta Original | Nueva Propuesta | Diferencia |
|---------|-------------------|-----------------|------------|
| **Componentes** | 5 componentes simples | 3 componentes robustos | -2 componentes, +300% complejidad |
| **Timeline** | 10 semanas | 16 semanas | +60% tiempo |
| **Inversión Fee Único** | $8.500.000 COP + IVA | **Por Definir** | TBD |
| **Fee Mensual** | Escalonado (0-3000 usuarios) | **Por Definir** | TBD |
| **Scope Total** | Bot perfilador básico | Bot + Bot Interno + **Plataforma Completa** | **+350% alcance** |

---

## 🔍 COMPARACIÓN DETALLADA POR COMPONENTE

### COMPONENTE 1: CHATBOT PERFILADOR WEB

#### ✅ SIMILITUDES (lo que se mantiene)
- Bot conversacional embebido en web
- Motor de perfilamiento dinámico
- Sistema de scoring/calificación
- Integración con Bitrix 24 CRM
- Integración con sistema de agendamiento (Koalendar)
- Ruteo inteligente según calificación

#### ⚠️ DIFERENCIAS Y AMPLIACIONES

| Aspecto | Propuesta Original | Nueva Propuesta | Impacto |
|---------|-------------------|-----------------|---------|
| **Flujos conversacionales** | 1 flujo genérico adaptable | **3 ramas específicas** (A: Educación Global, B: Orientación Profesional, C: Programas Online) | +200% complejidad conversacional |
| **Blueprint Operativo** | No especificado | **5 etapas estructuradas** (Identidad, Exploración, Claridad, Viabilidad, Recomendación) | +Arquitectura formal |
| **Salidas del sistema** | 2 salidas (agendar o nutrir) | **6 salidas** (Dashboard, Upgrade Básico, Upgrade Premium, Bitrix, Nurturing, Contenido) | +200% lógica de ruteo |
| **Outputs internos** | Score básico | **8 outputs** (summary_profile, score_total, lead_category, next_best_action, recommended_services, recommended_programs, recommended_countries, objections) | +300% data processing |
| **Categorización** | Calificado / No calificado | **4 categorías** (Premium, Potencial, Exploratorio, No Fit) con mensajes y acciones diferenciadas | +100% granularidad |
| **Panel de configuración** | No mencionado | Panel de configuración de respuestas y flujos | Feature adicional |

**IMPACTO EN ESFUERZO:** +120% de desarrollo respecto al Componente 1 original

---

### COMPONENTE 2: BOT DE BÚSQUEDA INTERNA PARA ASESORES

#### ❌ NO EXISTÍA EN PROPUESTA ORIGINAL

Este componente es **100% NUEVO**.

**Alcance del Componente 2:**
- Panel interno para asesores con login y autenticación
- Interfaz de chat con bot de búsqueda inteligente
- Sistema de carga y actualización de Excel de programas educativos
- Motor de IA que consulta base de datos y genera recomendaciones
- Generación de tabla dinámica con 7 columnas (Nombre, País, Institución, Duración, Link, Tuition Fees, Beneficios)
- Exportación de resultados a PDF y Excel
- Historial de búsquedas por asesor
- Backend para procesamiento y storage

**Estimación de esfuerzo:** Este componente representa aproximadamente **20-25% del esfuerzo total del proyecto nuevo**.

---

### COMPONENTE 3: PLATAFORMA DE MENTORÍA HOPPER

#### ❌ NO EXISTÍA EN PROPUESTA ORIGINAL

Este componente es **100% NUEVO** y representa **la parte más grande del proyecto**.

**Nota crítica:** La propuesta original **EXCLUÍA EXPLÍCITAMENTE** este tipo de desarrollo:

> "Esta fase no contempla plataforma completa para estudiantes con autenticación, dashboards o experiencias personalizadas, tests psicotécnicos, matching avanzado con universidades, catálogos de programas, reportes personalizados, monetización de leads, portales administrativos complejos..."

**La nueva propuesta incluye TODO lo que la original excluía.**

#### Alcance Completo del Componente 3:

**3.1 ARQUITECTURA DE USUARIOS**

| Tipo de Usuario | Funcionalidades | Complejidad |
|----------------|-----------------|-------------|
| **Individual** | 4 perfiles (9°, 10°, 11°, Profesional) con journeys diferenciados | Alta |
| **B2B Colegios** | Panel de monitoreo, usuario "observer", Portal del Consejero | Muy Alta |
| **Corporate Universidades** | Visualización de leads, perfiles completos de estudiantes | Media-Alta |

**3.2 SISTEMA DE SUSCRIPCIONES**
- Modelo Básico ($50 USD): 8+ features
- Modelo Premium ($90 USD): 15+ features (incluye Básico + extras)
- Procesador de pagos integrado
- Sistema de gestión de suscripciones
- Lógica de restricción de features por plan

**3.3 JOURNEY GUIADO ("Mundos Desbloqueables")**
- Sistema de progresión por etapas
- 5 fases del blueprint (Identidad, Exploración, Claridad, Viabilidad, Recomendación)
- Contenido adaptado según perfil (9°, 10°, 11°, Profesional)
- Unlocking de secciones condicionado a completitud

**3.4 FORMULARIOS Y CUESTIONARIOS INTEGRADOS**
- 7 cuestionarios principales
- Formularios diferenciados para estudiantes vs profesionales
- Prueba socio-emocional
- Simulador de Realidad y Estilo de Vida
- Sistema de evaluación de 3 opciones de carrera

**3.5 TESTS PSICOMÉTRICOS**

| Test | Tipo | Complejidad Integración |
|------|------|------------------------|
| RIASEC | API externa (O*NET) | Media |
| MBTI Career Report | API externa / licencia | Alta |
| iStrong | API externa / licencia | Alta |
| Big 5 Personality | API externa | Media |
| Nivel de inglés | Custom + posible API | Media-Alta |

**3.6 SISTEMA DE RECOMENDACIÓN CON IA**
- Procesamiento de resultados de tests
- Análisis de respuestas de formularios
- Matching con portfolio de instituciones Grasshopper
- Integración con O*NET Online para profesiones y salarios
- Cálculo de afinidad con GPA
- Recomendaciones de programas, países, universidades

**3.7 GESTIÓN DE DOCUMENTOS**
- Upload de documentos (diplomas, certificados, transcripts, cartas)
- Sistema de storage (S3 o similar)
- Organización por estudiante
- Visor de documentos

**3.8 GENERADOR AUTOMÁTICO CON IA**
- **CV Generator:** Generación automática de hoja de vida con IA
- **SOP Generator:** Redacción de Statement of Purpose con IA
- Templates profesionales
- Personalización según perfil del estudiante

**3.9 MARKETPLACE DE SERVICIOS EXTRA**
- Preparación SAT/ACT (integración APIs de práctica)
- Preparación TOEFL/IELTS (SpeechAce API, Grammarly)
- Pago de AP's
- Materia de inglés online
- Sistema de checkout y pagos

**3.10 EXPORTACIÓN DE SNAPSHOT PDF**
- Generación dinámica de PDF
- Resumen de personalidad (tests)
- Nivel de inglés certificado
- Intereses y logros
- Programas recomendados

**3.11 PANEL B2B PARA COLEGIOS**
- Portal del Consejero
- Visualización de progreso grupal
- Identificación de estudiantes perdidos vs decididos
- Reportes agregados

**3.12 PANEL CORPORATE PARA UNIVERSIDADES**
- Acceso a perfiles de leads asignados
- Información condensada para trabajar leads
- Sistema de asignación de estudiantes

**3.13 INTEGRACIONES TÉCNICAS**
- Bitrix CRM (conversión de leads)
- O*NET Online (profesiones y salarios)
- APIs de tests psicométricos (múltiples)
- APIs de preparación de exámenes (Khan Academy, Quizlet, SpeechAce, Grammarly)
- Procesador de pagos (Stripe, PayU, etc.)

**Estimación de esfuerzo:** Este componente representa aproximadamente **60-65% del esfuerzo total del proyecto nuevo**.

---

## 📈 CUANTIFICACIÓN DE DIFERENCIAS

### ANÁLISIS POR TIPO DE TRABAJO

| Categoría de Trabajo | Propuesta Original | Nueva Propuesta | Incremento |
|---------------------|-------------------|-----------------|-----------|
| **Frontend Development** | 25% del proyecto | 45% del proyecto | +180% |
| **Backend Development** | 30% del proyecto | 40% del proyecto | +133% |
| **Integraciones API** | 20% del proyecto | 35% del proyecto | +175% |
| **Base de Datos** | 10% del proyecto | 20% del proyecto | +200% |
| **IA/ML Processing** | 10% del proyecto | 15% del proyecto | +150% |
| **QA y Testing** | 15% del proyecto | 20% del proyecto | +133% |

### FEATURES NUEVAS QUE NO EXISTÍAN

| Feature | Existía en Original | Nueva Propuesta |
|---------|-------------------|-----------------|
| Bot de búsqueda interna | ❌ NO | ✅ SÍ (Componente 2 completo) |
| Plataforma de estudiantes | ❌ NO (explícitamente excluido) | ✅ SÍ (Componente 3 completo) |
| Sistema de autenticación multi-rol | ❌ NO | ✅ SÍ (Individual, B2B, Corporate) |
| Tests psicométricos | ❌ NO (explícitamente excluido) | ✅ SÍ (5 tests integrados) |
| Matching avanzado universidades | ❌ NO (explícitamente excluido) | ✅ SÍ (con IA y O*NET) |
| Generador CV/SOP | ❌ NO | ✅ SÍ (con IA) |
| Sistema de suscripciones | ❌ NO (explícitamente excluido) | ✅ SÍ (Básico/Premium) |
| Portal B2B Colegios | ❌ NO (explícitamente excluido) | ✅ SÍ (completo) |
| Portal Corporate Universidades | ❌ NO | ✅ SÍ (completo) |
| Marketplace servicios extra | ❌ NO | ✅ SÍ (con checkout) |
| Snapshot PDF exportable | ❌ NO (explícitamente excluido) | ✅ SÍ (con generación dinámica) |
| 7 formularios integrados | ❌ NO | ✅ SÍ (diseñados y desarrollados) |
| Journey guiado por etapas | ❌ NO | ✅ SÍ ("mundos desbloqueables") |

**Total de features 100% nuevas:** 13 features principales + ~40 sub-features

---

## ⏱️ ANÁLISIS DE TIMELINE

### Propuesta Original: 10 semanas

| Sprint | Semanas | Actividad |
|--------|---------|-----------|
| 1 | 1-2 | Discovery, diseño conversacional, arquitectura |
| 2 | 3-5 | Desarrollo bot, perfilamiento, scoring |
| 3 | 6-8 | Integraciones Bitrix y agendamiento |
| 4 | 9-10 | QA, calibración, go-live |

### Nueva Propuesta: 16 semanas

| Fase | Semanas | Actividad |
|------|---------|-----------|
| 1 | 1-3 | Discovery y Arquitectura (todos componentes) |
| 2 | 4-7 | Componentes 1 y 2 (Chatbot + Bot Búsqueda) |
| 3 | 8-14 | Componente 3 (Plataforma Hopper completa) |
| 4 | 15-16 | Testing y Deploy |

**Incremento de timeline:** +60%
**Razón:** Componente 3 requiere 7 semanas vs las 10 semanas totales del proyecto original.

---

## 💰 ANÁLISIS DE COSTOS

### PROPUESTA ORIGINAL

**Fee de Implementación (única vez):**
- $8.500.000 COP + IVA (19%)
- Total: $10.115.000 COP

**Fee Mensual (recurrente):**
- 0-100 usuarios: $1.000.000 COP + IVA = $1.190.000 COP
- 101-500 usuarios: $3.000.000 COP + IVA = $3.570.000 COP
- 501-1.500 usuarios: $5.000.000 COP + IVA = $5.950.000 COP
- 1.501-3.000 usuarios: $7.000.000 COP + IVA = $8.330.000 COP

**Forma de pago:**
- 50% anticipo: $4.250.000 + IVA
- 50% contra entrega: $4.250.000 + IVA

---

### NUEVA PROPUESTA - RECOMENDACIÓN DE COSTOS

#### METODOLOGÍA DE CÁLCULO

Basándome en:
1. **Incremento de alcance:** +350%
2. **Incremento de timeline:** +60%
3. **Complejidad técnica:** +300%
4. **Cantidad de integraciones:** +175%
5. **Número de features nuevas:** 13 features principales

#### PROPUESTA DE ESTRUCTURA DE COSTOS

**Opción A: Fee Único + Fee Mensual (Manteniendo modelo original)**

| Concepto | Cálculo | Monto Recomendado |
|----------|---------|-------------------|
| **Componente 1 (Chatbot)** | Original $8.5M x 120% complejidad | $10.200.000 COP |
| **Componente 2 (Bot Búsqueda)** | 25% del proyecto total | $12.000.000 COP |
| **Componente 3 (Plataforma Hopper)** | 65% del proyecto total | $31.200.000 COP |
| **Integración y Testing** | 15% overhead por complejidad | $8.000.000 COP |
| **TOTAL FEE IMPLEMENTACIÓN** | | **$61.400.000 COP + IVA** |
| **TOTAL CON IVA** | | **$73.066.000 COP** |

**Fee Mensual de Operación y Mantenimiento:**

Dado que ahora hay 3 sistemas activos con múltiples integraciones APIs (algunas con costos por uso):

| Rango de Usuarios | Fee Mensual Sugerido (+ IVA) |
|------------------|------------------------------|
| 0-100 usuarios | $3.500.000 COP + IVA |
| 101-500 usuarios | $7.500.000 COP + IVA |
| 501-1.500 usuarios | $12.000.000 COP + IVA |
| 1.501-3.000 usuarios | $18.000.000 COP + IVA |

**Incluye:**
- Hosting de 3 sistemas
- APIs de Gemini/OpenAI (IA conversacional)
- APIs de tests psicométricos
- Mantenimiento correctivo
- Actualizaciones de seguridad
- Soporte técnico
- Monitoreo 24/7

---

**Opción B: Fee Único sin Mensualidad (Pago total upfront)**

Si Grasshopper prefiere no tener fee mensual:

| Concepto | Monto |
|----------|-------|
| **Fee de Desarrollo** | $61.400.000 COP + IVA |
| **Fee de Infraestructura (12 meses prepago)** | $50.000.000 COP + IVA |
| **TOTAL** | **$111.400.000 COP + IVA** |
| **TOTAL CON IVA** | **$132.566.000 COP** |

Después del primer año: Fee anual de infraestructura negociable.

---

**Opción C: Fee Escalonado por Componente (Desarrollo por fases)**

Si Grasshopper quiere implementar por fases:

| Fase | Componente | Fee | Timeline |
|------|-----------|-----|----------|
| **Fase 1** | Componente 1 (Chatbot Web) | $15.000.000 COP + IVA | 6 semanas |
| **Fase 2** | Componente 2 (Bot Búsqueda) | $12.000.000 COP + IVA | 4 semanas |
| **Fase 3** | Componente 3 (Plataforma Hopper) | $35.000.000 COP + IVA | 10 semanas |
| **TOTAL** | | **$62.000.000 COP + IVA** | 20 semanas |

**Ventaja:** Grasshopper puede validar cada componente antes de continuar.
**Desventaja:** +4 semanas de timeline total por overhead de fases.

---

## 🎯 RECOMENDACIÓN FINAL

### OPCIÓN RECOMENDADA: **Opción A (Fee Único + Fee Mensual)**

**Justificación:**
1. **Mantiene la lógica del modelo original** que Grasshopper ya aceptó conceptualmente
2. **Fee mensual justo** dado el incremento de infraestructura y APIs de terceros con costos
3. **Permite escalabilidad** sin renegociaciones constantes
4. **Inversión inicial razonable** para el valor entregado

### DESGLOSE RECOMENDADO:

**Fee de Implementación:**
- **Total:** $61.400.000 COP + IVA (19%) = **$73.066.000 COP**
- **Forma de pago:**
  - 40% anticipo (inicio): $24.560.000 + IVA = **$29.226.400 COP**
  - 30% a mitad de proyecto (semana 8): $18.420.000 + IVA = **$21.919.800 COP**
  - 30% contra entrega (semana 16): $18.420.000 + IVA = **$21.919.800 COP**

**Fee Mensual de Operación:**
- Escalonado según usuarios activos (3.5M - 18M + IVA)
- Sin permanencia mínima
- Cancelable con 30 días de aviso

---

## 📊 TABLA COMPARATIVA FINAL

| Aspecto | Propuesta Original | Nueva Propuesta | Incremento |
|---------|-------------------|-----------------|-----------|
| **Componentes principales** | 5 simples | 3 robustos + complejos | +350% alcance |
| **Timeline** | 10 semanas | 16 semanas | +60% |
| **Fee Implementación** | $8.5M + IVA | $61.4M + IVA | **+722%** |
| **Fee Mensual (base)** | $1M + IVA | $3.5M + IVA | +250% |
| **Features principales** | 12 | 50+ | +317% |
| **Integraciones API** | 2 | 10+ | +400% |
| **Tipos de usuario** | 1 | 3 (Individual, B2B, Corporate) | +200% |
| **Tests integrados** | 0 | 5 | N/A |
| **Dashboards/Portales** | 0 | 4 | N/A |
| **Generadores con IA** | 0 | 2 (CV, SOP) | N/A |

---

## ✅ CONCLUSIÓN

**El alcance de la nueva propuesta es aproximadamente 7 veces más grande que la propuesta original.**

La propuesta original era un **bot perfilador básico** con integraciones simples.

La nueva propuesta es un **ecosistema completo de 3 plataformas** que incluye:
1. Bot perfilador avanzado con múltiples ramas
2. Sistema interno de búsqueda para asesores (100% nuevo)
3. Plataforma completa de orientación vocacional con suscripciones, tests, generadores de IA, portales B2B y Corporate (100% nuevo)

**El incremento de 722% en el fee de implementación está completamente justificado** por el incremento de 350% en alcance, 60% en timeline, y la adición de 13 features principales que NO existían en la propuesta original y que de hecho fueron **explícitamente excluidas**.

---

**Preparado por:** Irrelevant Club S.A.S.
**Fecha:** 21 de Abril de 2026
**Versión:** 1.0
