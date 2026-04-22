# DISCOVERY NOTES — CAMPUZANO GROUP
**Fecha:** 2026-04-20
**Empresa:** Campuzano Group (Holding de Logística Internacional)
**Industria:** Logística / Comercio Exterior
**Contacto:** Jorge, Lorena, Tomás Campuzano
**Comercial:** Agustín
**Servicio:** AI Ops Layer

---

## 1. CONTEXTO DE LA EMPRESA

### ¿Qué hace Campuzano Group?
Holding de **logística internacional especializado en comercio exterior de perecederos refrigerados**. No importan mercancía propia — **prestan servicios logísticos integrales** de importación/exportación para terceros.

### Estructura
**5 empresas** con razones sociales separadas (requerimiento DIAN):
- **COMEX**: Agenciamiento aduanero (trámites de importación/exportación)
- **Planet Cargo**: Logística internacional (transporte marítimo/aéreo)
- **Empresa de almacenamiento**: Zonas francas
- **Dos empresas de logística en frío**: Transporte refrigerado

**Cobertura**: Medellín, Bogotá, Cali, Pereira, Cúcuta, Piales + puertos (Urabá, Santa Marta, Cartagena)
**Equipo**: ~150-200 personas directas

---

## 2. DOLORES IDENTIFICADOS (con citas textuales)

### DOLOR PRINCIPAL: Proceso Manual de Importación (COMEX)

> **"Esto es puro trámite duro y puro y repetitivo."** — Jorge

> **"No es muy malo, es súper cansón y quita demasiado tiempo a las niñas. Tiempo pues que se puede aprovechar para más necesarias."** — Lorena

> **"Yo necesito tres personas en teoría para una importación y una para hacer diez."** — Jorge

> **"Para mí mi prioridad en importación es rapidez, porque entre más rápido, menos costos a mi cliente."** — Jorge

### Procesos Manuales Repetitivos

1. **Declaraciones de Importación (DI)**: Llenado **casilla por casilla** en sistema DIAN. No usan archivo plano (carga masiva) aunque saben que existe.

2. **Clasificación arancelaria**: Manual, basada en fichas técnicas. Mismos productos repetidos constantemente.

3. **Gestión documental caótica**: Mensajeros físicos moviendo documentos. Falta documentación → mercancía retenida en puerto.

4. **Verificación de requisitos pre-importación**:

> **"Muchísimo. La gente cree que no necesita requisito. Entonces cuando uno pensa llega cada, no sé, la cliente los compre y los trae sin saber que son los requisitos."** — Jorge

### Costos de Ineficiencia

**Retención en puerto** por documentación incorrecta:
- Días 4-7: $100-$300 USD/día (puerto)
- Después día 7: +$100-$200 USD/día (naviera)
- **Total: hasta $500 USD/día por contenedor retenido**

**Personal**: 3 personas para 1 importación vs 1 persona para 10 exportaciones

---

## 3. OPORTUNIDAD PRINCIPAL

### AI Ops Layer — Automatización de Importaciones

**5 Procesos Inteligentes a Construir:**

1. **Automatizador de Declaraciones de Importación (DI)**
   - Extrae datos de factura comercial, packing list, guía, manifiesto DIAN
   - Genera archivo plano Excel para carga masiva
   - Validación cruzada automática (cantidad × precio = total)
   - **Impacto**: Reducir de 3 personas a 1 por importación

2. **Sistema de Alerta Pre-importación**
   - Bot que recibe descripción de producto
   - Clasifica arancelariamente
   - Lista requisitos obligatorios antes de comprar/embarcar
   - **Impacto**: Evitar retenciones ($100-500 USD/día)

3. **Asistente de Clasificación Arancelaria**
   - Descripción + ficha técnica → código arancelario
   - Validación contra histórico de Campuzano
   - Cálculo automático aranceles/IVA
   - **Impacto**: Velocidad y consistencia

4. **Extractor Inteligente de Documentos**
   - OCR + extracción semántica de facturas, certificados, packing lists
   - Normalización de formatos (cada proveedor diferente)
   - Detección de datos faltantes
   - **Impacto**: Eliminar digitación manual

5. **Chatbot de Seguimiento para Clientes**
   - "¿Dónde está mi contenedor XXXX?"
   - Trazabilidad en tiempo real
   - Alertas automáticas de cambios, retrasos
   - **Impacto**: Reducir carga operativa, mejorar servicio

---

## 4. SERVICIO RECOMENDADO

**AI Ops Layer** ($7.000.000 COP + IVA)
- **Duración**: 1 semana
- **Foco**: COMEX (importaciones) y Planet Cargo
- **Proceso prioritario**: Declaraciones de Importación (DI)

### ROI Estimado
- **Ahorro en personal**: Pasar de 3 personas a 1 por importación
- **Ahorro en costos de puerto**: Reducción de retenciones ($500/día por contenedor)
- **Velocidad**: Nacionalización más rápida = menos costos para el cliente

---

## 5. CONTEXTO ADICIONAL

### Intento Previo de Automatización
> **"Yo intenté hacer eso solo, pero no tengo función. Por cloud."** — Lorena

- Lorena intentó con **Claude (solo)** pero no pudo
- **Ya tienen documentación del proceso** (acta detallada en 2 versiones)

### Herramientas Actuales
- Sistema propio (legacy pero tienen control → bueno para integración API)
- Sistema DIAN (obligatorio)
- Bases de datos con códigos arancelarios históricos
- Termorregistradores GPS para contenedores refrigerados

### Nivel de Madurez Tecnológica
**Bajo-Medio**: No usan archivo plano, mensajeros físicos, sistema legacy. Pero: sistema propio → control total para integraciones.

---

## 6. PRÓXIMOS PASOS

1. ✅ Procesar transcript de discovery
2. **Ejecutar `/discovery-ops campuzano-group`** — Discovery estructurado 5 pilares
3. **Solicitar documentos**:
   - Acta del proceso de importación (2 versiones)
   - Acceso demo al sistema interno
   - Volumen mensual de operaciones
   - Costos operativos actuales (headcount, tiempo promedio DI)
4. **Ejecutar `/reporte-assessment campuzano-group`** — Análisis profundo + slides de urgencia
5. **Ejecutar `/disenar-skills campuzano-group`** — Definir los 5 procesos a construir
6. **Ejecutar `/cotizacion campuzano-group`** — Generar cotización Ops Layer

---

## PROBABILIDAD DE CIERRE: **ALTA** 🟢

- Pain point claro y cuantificable
- Ya intentaron automatizar (saben que es necesario)
- Tienen documentación del proceso
- Apertura total a proceso consultivo
- ROI evidente (ahorro en personal + costos de puerto)
