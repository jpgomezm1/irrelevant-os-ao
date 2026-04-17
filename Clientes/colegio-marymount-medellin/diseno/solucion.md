# Solución Propuesta — Colegio Marymount Medellín

**Fecha:** 2026-04-14
**Cliente:** Colegio Marymount Medellín
**Contacto:** María Luisa Muñoz (Gerente Administrativa)
**Servicio:** AI Core Layer
**Preparado por:** Sara Garcés (Irrelevant)

---

## El Problema

Marymount es un colegio privado femenino en Medellín que compite por **reputación, cercanía con las familias y calidad educativa**. Sin embargo, el equipo administrativo —María Luisa, Sara, Olguita, Alexander y Dorita— gasta una fracción significativa de su tiempo en tareas manuales de contabilidad, conciliación, aprobación de facturas y cobro de cartera. Ese tiempo no se está invirtiendo en lo que sí diferencia al colegio: la relación con las familias.

Hay tres presiones concurrentes:

1. **Transición generacional:** Dorita se pensiona el próximo año después de 30 años. Todo el conocimiento tácito del área contable se va con ella.
2. **Sistema contable nuevo (Loggro):** la migración está exponiendo ineficiencias que antes se toleraban.
3. **Comité financiero pidiendo acción:** ya hay mandato interno para automatizar el cobro personalizado de cartera.

---

## El Proceso Core a Intervenir

**El ciclo financiero del colegio** — desde que entra un ingreso (matrícula/pensión) o sale un gasto (factura), pasa por aprobación, se concilia contra bancos, impacta presupuesto y se comunica a las familias.

No es un proceso. Es un sistema de 4 engranajes desconectados hoy: facturación, cartera, conciliación y presupuesto. Cada uno vive en un software o Excel distinto, y el pegamento entre ellos es el tiempo humano.

---

## Nuestra Tesis

No se trata de "automatizar tareas". Se trata de **convertir el ciclo financiero del colegio en un sistema inteligente** que:

- Libera a María Luisa del trabajo de carpintería administrativa para que pueda enfocarse en decisiones.
- **Preserva el conocimiento de Dorita** antes de que se pensione (el sistema aprende sus reglas).
- Convierte la cobranza impersonal de Phidias en comunicación que refuerza la relación colegio–familia.
- Da visibilidad en tiempo real del presupuesto por centro de costos, año académico vs. año fiscal.

---

## Qué Vamos a Construir — 4 Componentes

### 1. Conciliador Automático
Se conecta vía API a Loggro y procesa los extractos bancarios (Bancolombia y demás). Cruza las 6 cuentas principales mensuales (bancos, deudores, ingresos, retención en la fuente, etc.) + el cruce Phidias → Loggro. Identifica diferencias y las presenta en una interfaz para validación humana. Lo que hoy toma más de un día pasa a 30 minutos de revisión.

Impacta a toda el área contable y mitiga el riesgo de pérdida de conocimiento cuando Dorita se pensione.

### 2. Agente de Aprobación de Facturas
Lee el correo administrativo, extrae datos de la factura, la compara contra presupuesto y contra el histórico. Auto-aprueba facturas recurrentes con mismo valor (vigilancia, servicios fijos) con las dos firmas digitales pre-autorizadas. Escala a Sara y María Luisa solo cuando cambia el valor o excede presupuesto.

Reduce drásticamente el volumen que pasa por María Luisa y Sara sin perder control sobre lo excepcional.

### 3. Dashboard Financiero Inteligente
Sube el presupuesto desde Excel a una interfaz visual. Muestra ejecución por centro de costos, comparativo año académico (jun–may) vs. año fiscal (ene–dic) y variaciones año vs. año. María Luisa puede **preguntarle** al dashboard en lenguaje natural: "¿Por qué subió el costo del centro de costo X este mes?".

Le da a la dirección administrativa visibilidad en tiempo real sin depender de reportes manuales.

### 4. Agente de Cobro Personalizado ("Olguita AI")
Lee el reporte de cartera de Phidias, genera correos personalizados con el tono y firma de Olguita y los envía desde su dominio. Aprende de los correos históricos de Olguita. Si un padre no paga después de 2 recordatorios, escala a Olguita para llamada personal.

Resuelve el pedido explícito del comité financiero y conecta directamente con cómo las familias perciben al colegio.

---

## Cómo Arrancamos

Los cuatro procesos los podemos abordar en secuencia. La idea no es hacer los cuatro al tiempo — es **empezar por uno o dos** y, a medida que las integraciones quedan conectadas (Loggro, Phidias, correo), los siguientes se construyen mucho más rápido porque reutilizan la infraestructura.

**María Luisa decide con cuál(es) arrancar** según lo que hoy duela más y según su lectura de prioridades internas.

---

## Impacto Proyectado

| Métrica | Hoy | Con el sistema |
|---|---|---|
| Tiempo de conciliación mensual (6 cuentas) | 1+ día completo | ~30 min de revisión |
| % de facturas recurrentes que María Luisa aprueba manualmente | 100% | < 20% |
| Tono/personalización del cobro de cartera | Impersonal (Phidias) | Personalizado (nombre + monto + tono Olguita) |
| Visibilidad de presupuesto por centro de costo | Excel manual reactivo | Dashboard en tiempo real |
| Riesgo de pérdida de conocimiento contable | Alto (Dorita) | Mitigado (sistema captura reglas) |

---

## Timeline

**10 semanas** total si se abordan los cuatro componentes completos:
- Semanas 1–2: Fase 0 (diagnóstico profundo + acceso a APIs)
- Semanas 3–8: Implementación de los componentes priorizados por María Luisa (paralelización donde aplique)
- Semanas 9–10: Integración + testing end-to-end + puesta en producción

Si se arranca con un subset (ej. solo Conciliador + Facturas), el timeline se reduce proporcionalmente.

---

## Referencias del Portafolio Irrelevant

- **El Organizador** (SaaS): facturación recurrente con cobro automático → patrón técnico para Olguita
- **Cluvi** (finanzas): cierre financiero con IA + asistente conversacional → patrón para dashboard y conciliador
- **ISAVIA** (infraestructura): gestión documental y facturación de contratistas → patrón para aprobación de facturas
- **Indemneasy** (legal): agente con tono personalizado + escalamiento humano → modelo de diseño conversacional para Olguita

---

## Condiciones Comerciales

- **Modelo:** AI Core Layer — Implementación inicial + fee mensual recurrente
- **Forma de pago:** 50% anticipo + 50% contra entrega (implementación). Fee mensual comienza al mes 1 post-producción.
- **Fase 0:** Se cobra como parte del contrato. Documento entregable antes del arranque de implementación.
- **Soporte:** Incluido mientras dure el servicio. Reuniones semanales durante implementación, mensuales post-producción.
- **Capas de seguridad:** NDA + 5 capas de seguridad + autenticación en interfaces. Los datos no salen del colegio.

**Precio:** A definir según alcance final. Rango estimado en spec técnico interno.

---

## Siguiente Paso

Reunión del **jueves 2026-04-16 a las 2:00 PM** para presentar esta propuesta a María Luisa. Output en formato slides.
