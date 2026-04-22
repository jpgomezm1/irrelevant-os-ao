# PROPUESTA COMERCIAL — CAMPUZANO GROUP
## Automatización del Proceso de Declaración de Importación (DIM)
### AI Ops Layer — Setup de IA para COMEX

**Fecha:** 2026-04-20
**Empresa:** Campuzano Group
**Contacto:** Tomás Campuzano, Jorge, Lorena
**Servicio:** AI Ops Layer
**Inversión:** $10.000.000 COP + IVA
**Fee Mensual:** $110-120 USD (API OCR + Claude Plan Max)
**Duración:** 1 semana

---

## 1. CONTEXTO — EL PROBLEMA QUE ESTAMOS RESOLVIENDO

### Situación Actual

**Diagnóstico del Proceso Actual de Declaraciones de Importación en COMEX:**

El equipo de importaciones de Campuzano Group llena actualmente el Formulario 500 (Declaración de Importación) de forma completamente manual, ingresando la información casilla por casilla directamente en el sistema de la DIAN.

**Ineficiencias Identificadas:**

- **91 casillas** del Formulario 500 se llenan manualmente una por una
- **5-6 documentos diferentes** de los cuales se debe extraer información (factura comercial, guía aérea/BL, factura de fletes, seguro, certificados, manifiesto DIAN)
- **Carga operativa desbalanceada:** Se requieren 3 personas para procesar 1 importación, mientras que 1 persona puede procesar 10 exportaciones
- **Tiempo de procesamiento:** Entre 45-60 minutos por declaración
- **Códigos DIAN complejos:** Requieren consulta constante de tablas (ciudades, depósitos, transportadores, formas de pago, tipos de importación)
- **Validaciones manuales:** Los términos de negociación requieren interpretación experta (ejemplo: una factura que dice SWORD pero incluye flete, debe corregirse a CPT)
- **Riesgo de errores:** La digitación manual puede generar errores que retrasan el levante de mercancía

### Oportunidad Detectada

El equipo de Campuzano identifica que el sistema DIAN permite carga masiva de declaraciones vía archivo plano Excel, un método mucho más eficiente que el llenado casilla por casilla. Sin embargo, generar ese archivo Excel de forma manual también es complejo y consume tiempo, por lo que actualmente no se aprovecha esta funcionalidad.

### Impacto del Problema

- **Costo operativo alto:** 3 personas por importación
- **Capacidad limitada:** Velocidad de procesamiento depende de digitación manual
- **Riesgo de errores:** Retenciones en puerto pueden costar **$100-500 USD/día** por contenedor
- **Tiempo del cliente:** Entre más rápido la nacionalización, menos costos para el cliente

---

## 2. ALCANCE DEL PROYECTO — QUÉ VAMOS A HACER

### ✅ QUÉ INCLUYE

**Objetivo:** Automatizar la generación del Formulario 500 (Declaración de Importación) mediante inteligencia artificial que extraiga información de los documentos del cliente y genere el archivo plano Excel listo para carga masiva en el sistema DIAN.

#### **PROCESO AUTOMATIZADO:**

```
DOCUMENTOS DEL CLIENTE
(Factura comercial, Guía aérea/BL, Factura fletes, Seguro, Certificados)
           ↓
   [MOTOR DE IA]
   Extrae datos + Valida + Aplica reglas
           ↓
   ARCHIVO PLANO EXCEL
   (Listo para cargar en sistema DIAN)
```

#### **ENTREGABLES CONCRETOS:**

1. **Motor de IA configurado** que extrae información de documentos

2. **5 Procesos Inteligentes** construidos y funcionando para automatización de DIM:
   - Extractor de documentos (factura, guía, fletes, seguro)
   - Validador de términos de negociación (SWORD vs CPT, etc.)
   - Asistente de códigos DIAN (ciudades, depósitos, transportadores)
   - Validador de reglas de negocio (DAV, forma pago, cálculos)
   - Generador de archivo plano Excel (Formulario 500)

3. **2 Skills adicionales personalizadas** para otros procesos de Campuzano (se definen en kickoff según prioridades operativas)

4. **Stack de herramientas** instalado y configurado:
   - Claude Pro Suite (motor de inteligencia artificial)
   - API de OCR (sistema de procesamiento de PDFs)
   - Base de datos de códigos DIAN
   - Generador de Excel automatizado

5. **Documentación completa:**
   - Manual de uso del sistema
   - Guía de validación de outputs
   - Procedimiento de carga a DIAN

6. **Sesión de entrenamiento** (2-3 horas) para el equipo de importaciones

7. **Soporte durante la primera semana** de uso en producción

---

### ❌ QUÉ NO INCLUYE

Para mantener el proyecto enfocado y dentro del alcance de 1 semana:

**NO incluye:**

- ❌ Integración directa con el sistema DIAN (la carga sigue siendo manual vía archivo Excel)
- ❌ Integración con el sistema interno de Campuzano (el output es archivo Excel independiente)
- ❌ Automatización de otros procesos más allá del Formulario 500 DIM
- ❌ Procesamiento de exportaciones (solo importaciones)
- ❌ Clasificación arancelaria automática (se usa la que ya tiene el cliente)
- ❌ Validación pre-importación de requisitos (esto sería otro proyecto)
- ❌ Infraestructura en la nube (corre en la máquina del cliente)

**Nota:** Estos puntos pueden ser parte de un proyecto de **AI Core Layer** (transformación completa) en una fase posterior.

---

## 3. FLUJO DEL PROYECTO — PASO A PASO (1 SEMANA)

### 📅 DÍA 1 — DIAGNÓSTICO Y CONFIGURACIÓN INICIAL

**Actividades:**
- Reunión de kickoff con el equipo de importaciones (1.5 horas)
  - Revisión del proceso actual de DIM
  - **Definición de las 2 skills adicionales** a construir según prioridades de Campuzano
- Recolección de ejemplos reales de documentos:
  - 5 facturas comerciales
  - 5 guías aéreas/BL
  - 5 facturas de fletes
  - 5 seguros/certificados
  - 5 DIM completadas (para validar outputs)
- Instalación del stack de herramientas en máquina del cliente
- Configuración del motor de IA (Claude Pro + API OCR)

**Entregable Día 1:**
- Stack instalado y funcionando
- 5 casos de ejemplo recolectados
- 2 skills adicionales definidas y priorizadas

---

### 📅 DÍA 2-3 — CONSTRUCCIÓN DE PROCESOS INTELIGENTES

**Actividades:**
- **Proceso 1:** Extractor de documentos
  - Configurar extracción de factura comercial (20 campos)
  - Configurar extracción de guía aérea/BL (15 campos)
  - Configurar extracción de factura fletes (5 campos)
  - Configurar extracción de seguro (3 campos)

- **Proceso 2:** Validador de términos de negociación
  - Reglas de Incoterms (SWORD, SIF, CPT, etc.)
  - Detección de inconsistencias automática

- **Proceso 3:** Asistente de códigos DIAN
  - Carga de base de datos de códigos históricos de Campuzano
  - Mapeo automático de descripciones a códigos

**Entregable Día 2-3:**
- 3 procesos funcionando y probados con casos reales

---

### 📅 DÍA 4-5 — VALIDACIÓN, GENERACIÓN DE ARCHIVO PLANO Y SKILLS ADICIONALES

**Actividades:**
- **Proceso 4:** Validador de reglas de negocio
  - DAV (>$5,000 USD)
  - Forma de pago (días)
  - Cálculos automáticos (TRM, valor aduana, aranceles, IVA)

- **Proceso 5:** Generador de archivo plano Excel
  - Mapeo de las 91 casillas del Formulario 500
  - Generación de Excel con formato DIAN
  - Validación de integridad del archivo

- **Construcción de las 2 skills adicionales** definidas en Día 1

- Pruebas end-to-end con los 5 casos de ejemplo
- Ajustes y refinamiento

**Entregable Día 4-5:**
- 5 procesos DIM completos funcionando
- 5 archivos Excel generados exitosamente
- 2 skills adicionales construidas y funcionando

---

### 📅 DÍA 6 — VALIDACIÓN CON EQUIPO Y ENTRENAMIENTO

**Actividades:**
- Sesión de validación con equipo de importaciones (2.5 horas)
  - Revisar los 5 archivos Excel DIM generados
  - Compararlos con las DIM reales
  - Demostración de las 2 skills adicionales
  - Identificar ajustes finales

- Sesión de entrenamiento (2-3 horas)
  - Cómo usar el sistema DIM paso a paso
  - Cómo usar las 2 skills adicionales
  - Qué validar en los outputs
  - Cómo cargar el archivo Excel a DIAN
  - Manejo de excepciones

- Ajustes finales según feedback

**Entregable Día 6:**
- Sistema completo ajustado y validado (DIM + 2 skills)
- Equipo entrenado en todos los procesos

---

### 📅 DÍA 7 — ENTREGA Y SOPORTE

**Actividades:**
- Entrega formal del sistema completo (DIM + 2 skills adicionales)
- Entrega de documentación
- Proceso de 3 DIM reales en vivo con el equipo
- Demostración en vivo de las 2 skills adicionales
- Inicio de soporte durante primera semana de producción

**Entregable Día 7:**
- Sistema completo en producción (7 procesos: 5 DIM + 2 skills adicionales)
- Documentación completa de todos los procesos
- Soporte activo

---

## 4. SUPUESTOS Y REQUISITOS DEL CLIENTE

### ✅ CAMPUZANO GROUP DEBE PROPORCIONAR:

1. **Documentos de ejemplo reales:**
   - 5 facturas comerciales
   - 5 guías aéreas o BL
   - 5 facturas de fletes
   - 5 certificados de seguro
   - 5 DIM completadas (para validación)

2. **Acceso al equipo:**
   - 1 persona del equipo de importaciones disponible durante la semana
   - 1 sesión de kickoff (1 hora)
   - 1 sesión de validación (2 horas)
   - 1 sesión de entrenamiento (2-3 horas)

3. **Infraestructura:**
   - 1 computadora para instalar el sistema
   - Conexión a internet estable
   - Pago del fee mensual operativo ($110-120 USD/mes)

4. **Información:**
   - Acceso a base de datos histórica de códigos DIAN usados por Campuzano
   - Tablas de clientes frecuentes, proveedores, transportadores

---

## 5. CRITERIOS DE ÉXITO — CÓMO MEDIMOS EL RESULTADO

El proyecto será exitoso cuando se cumplan estos criterios:

### ✅ CRITERIO 1: Precisión de Extracción
- **Meta:** 95% de los campos extraídos correctamente de los documentos
- **Validación:** Comparar outputs con DIM reales

### ✅ CRITERIO 2: Validación de Reglas
- **Meta:** 100% de las reglas de negocio aplicadas correctamente (DAV, forma pago, términos)
- **Validación:** Pruebas con casos conocidos

### ✅ CRITERIO 3: Formato del Archivo Excel
- **Meta:** Archivo Excel cargable directamente en sistema DIAN sin errores de formato
- **Validación:** Carga exitosa en sistema DIAN

### ✅ CRITERIO 4: Reducción de Tiempo
- **Meta:** De 45-60 min a 10-15 min por declaración (75% reducción)
- **Validación:** Cronometrar proceso antes vs después

### ✅ CRITERIO 5: Adopción del Equipo
- **Meta:** Equipo de importaciones puede usar el sistema de forma autónoma después del entrenamiento
- **Validación:** Procesar 3 DIM reales sin asistencia de Irrelevant

---

## 6. INVERSIÓN Y RETORNO (ROI)

### 💰 INVERSIÓN

**AI Ops Layer — Setup de IA**
**$10.000.000 COP + IVA**

**Condiciones de pago:**
- 50% anticipo (inicio del proyecto)
- 50% contra entrega (día 7)

**Vigencia de la propuesta:** 15 días calendario

---

### 💳 FEE MENSUAL OPERATIVO

**$110-120 USD/mes** (aproximadamente $440.000-480.000 COP/mes según TRM)

Este fee cubre los costos de las herramientas tecnológicas necesarias para el funcionamiento del sistema:

**Incluye:**
- **API de OCR** (sistema de extracción de datos de documentos): $10-20 USD/mes
- **Claude Plan Max** (motor de inteligencia artificial): $100 USD/mes

**Nota:** Este costo es variable según el volumen de documentos procesados mensualmente. El estimado está basado en procesar ~100 declaraciones de importación por mes.

---

### 🎁 VALOR AGREGADO — 2 SKILLS ADICIONALES INCLUIDAS

**Por este costo de implementación, construimos 2 skills adicionales personalizadas para otros procesos de Campuzano Group.**

#### ¿Qué es una Skill?

Una **skill** es un proceso inteligente automatizado que resuelve una tarea específica dentro de la operación de Campuzano. Funciona como un asistente especializado que ejecuta un flujo de trabajo completo de forma autónoma.

**Ejemplos de skills que podemos construir:**

1. **Skill de Seguimiento a Cliente**
   - Cliente pregunta por WhatsApp: "¿Dónde está mi contenedor XXXX?"
   - La skill consulta el sistema y responde automáticamente con trazabilidad en tiempo real
   - **Impacto:** Reducir carga operativa de seguimiento

2. **Skill de Validación Pre-importación**
   - Cliente envía descripción del producto que quiere importar
   - La skill identifica requisitos DIAN obligatorios (certificados, visto bueno, homologaciones)
   - Alerta al cliente ANTES de que compre/embarque
   - **Impacto:** Evitar retenciones en puerto ($100-500 USD/día)

3. **Skill de Generación de Cotizaciones**
   - Cliente solicita cotización de servicio de importación
   - La skill calcula automáticamente aranceles, IVA, costos logísticos
   - Genera cotización profesional en PDF
   - **Impacto:** Velocidad de respuesta comercial

4. **Skill de Clasificación Arancelaria**
   - Descripción de producto → Código arancelario sugerido
   - Validación contra histórico de Campuzano
   - **Impacto:** Consistencia y velocidad

5. **Skill de Alertas Operativas**
   - Monitoreo de plazos críticos (días libres, vencimientos)
   - Alertas automáticas al equipo vía WhatsApp/email
   - **Impacto:** Cero contenedores retenidos por olvido

**Estas 2 skills adicionales se definen en conjunto con Campuzano durante el Día 1 del proyecto, según las prioridades operativas más allá de la DIM.**

---

### 📈 RETORNO ESPERADO (ROI)

#### **AHORRO EN TIEMPO**

| Concepto | Antes | Después | Ahorro |
|----------|-------|---------|--------|
| Tiempo por DIM | 45-60 min | 10-15 min | **75%** |
| Digitación manual | 100% | 0% | **100%** |
| Validaciones | Manual | Automática | **100%** |

#### **AHORRO EN PERSONAL**

| Concepto | Antes | Después | Impacto |
|----------|-------|---------|---------|
| Personas por importación | 3 | 1 | **-66%** |
| Capacidad de procesamiento | Limitada | Escalable | **+300%** |

#### **REDUCCIÓN DE ERRORES**

| Concepto | Antes | Después | Impacto |
|----------|-------|---------|---------|
| Errores de digitación | Frecuentes | 0% | **100%** |
| Errores de códigos DIAN | Ocasionales | 0% | **100%** |
| Términos incorrectos | No detectados | Validados | **100%** |
| Costo de retención (evitado) | $100-500 USD/día | $0 | **Variable** |

#### **ROI ESTIMADO (12 MESES)**

**Supuestos:**
- 100 importaciones/mes (estimado conservador)
- Ahorro de 40 min/importación
- Costo hora operadora: $15.000 COP
- Reducción de 1 persona del equipo (o reasignación a otras tareas)

**Cálculo:**
- **Ahorro en tiempo:** 100 DIM × 40 min × $250/min = $1.000.000 COP/mes
- **Ahorro en personal:** 1 persona × $2.500.000 COP/mes = $2.500.000 COP/mes (reasignación)
- **Total ahorro mensual:** $3.500.000 COP/mes
- **Total ahorro anual:** $42.000.000 COP/año

**ROI:**
- **Inversión inicial:** $10.000.000 COP
- **Costo operativo anual:** $5.500.000 COP (fee mensual promedio ~$115 USD/mes)
- **Inversión total año 1:** $15.500.000 COP
- **Retorno año 1:** $42.000.000 COP
- **ROI:** 171% (2.7X)
- **Payback:** 4-5 meses

**Nota:** No incluye ahorro por evitar retenciones en puerto, que puede ser significativo.

---

## 7. RIESGOS Y MITIGACIONES

### ⚠️ RIESGO 1: Calidad de Documentos del Cliente
**Riesgo:** Si los PDFs están escaneados con mala calidad, el OCR puede fallar.
**Mitigación:** Validar calidad de documentos en Día 1. Si es necesario, pedir versiones digitales.

### ⚠️ RIESGO 2: Variabilidad de Formatos
**Riesgo:** Cada proveedor envía facturas con formato diferente.
**Mitigación:** Entrenar el sistema con los 5-10 proveedores más frecuentes de Campuzano. Para proveedores nuevos, el sistema se adapta en tiempo real.

### ⚠️ RIESGO 3: Cambios en Formulario DIAN
**Riesgo:** Si DIAN cambia el formato del Formulario 500, el sistema necesita ajustes.
**Mitigación:** El sistema es flexible y puede actualizarse. Soporte incluido durante primera semana. Cambios posteriores pueden requerir ajustes (no incluidos en este proyecto).

### ⚠️ RIESGO 4: Adopción del Equipo
**Riesgo:** El equipo puede resistirse al cambio o preferir el método manual.
**Mitigación:** Involucrar al equipo desde el Día 1. Sesión de entrenamiento completa. El sistema **asiste**, no reemplaza — la operadora sigue validando y teniendo control final.

---

## 8. SIGUIENTES PASOS

### ✅ PASO 1: Revisión de Propuesta
Revisar esta propuesta con el equipo de Campuzano y confirmar:
- Alcance alineado con expectativas
- Disponibilidad del equipo durante la semana
- Aprobación de inversión

### ✅ PASO 2: Firma de Contrato
Generar contrato de AI Ops Layer con alcance específico del proyecto.

### ✅ PASO 3: Pago de Anticipo
50% anticipo para iniciar el proyecto.

### ✅ PASO 4: Kickoff
Agendar fecha de kickoff (Día 1) y coordinar logística.

### ✅ PASO 5: Ejecución
Flujo de 7 días según cronograma.

---

## 9. MÁS ALLÁ DE ESTE PROYECTO (FUTURO)

Este proyecto automatiza el **proceso más crítico y repetitivo** de COMEX: la generación de la Declaración de Importación.

### 🚀 OPORTUNIDADES FUTURAS (AI CORE LAYER)

Una vez implementado este proyecto, se abren oportunidades para:

1. **Sistema de Alerta Pre-importación**
   - Cliente consulta: "Quiero importar X producto"
   - Sistema responde: "Necesitas estos requisitos antes de comprar"
   - **Impacto:** Evitar retenciones en puerto ($100-500 USD/día)

2. **Clasificación Arancelaria Inteligente**
   - Descripción de producto → Código arancelario sugerido
   - **Impacto:** Velocidad y consistencia

3. **Integración con Sistema Interno**
   - Carga automática a sistema de Campuzano
   - Trazabilidad completa del proceso

4. **Integración API con DIAN**
   - Carga automática directa al sistema DIAN (sin archivo Excel intermedio)
   - **Impacto:** Proceso 100% end-to-end automatizado

5. **Dashboard de Operaciones**
   - Visualización en tiempo real de todas las DIM
   - Alertas automáticas de problemas

Estos proyectos serían parte de una **transformación completa (AI Core Layer)** en fases posteriores.

---

## 10. CONTACTO

**Irrelevant Club S.A.S.**

Agustín Hoyos
Comercial Responsable
ahoyosh@stayirrelevant.com
+57 316 056 7909
