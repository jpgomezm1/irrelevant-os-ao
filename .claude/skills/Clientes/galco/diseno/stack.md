# Stack de Herramientas Recomendado para Galco

## Estas son las herramientas que vamos a integrar en tu operación

### 1. Claude Pro (Motor de IA)
**Qué hace:** Es el cerebro de todo. Es el sistema que lee tus requerimientos de compra, tus cotizaciones, tus recibos de caja menor, y genera los archivos listos para subir a Ilimitada y SIGO. Los 6 procesos inteligentes que diseñamos corren sobre Claude.

**Por qué para Galco:** Claude es el mejor modelo para procesar documentos complejos — PDFs de cotizaciones, recibos escaneados, formularios de proveedores, remisiones de Jenguar. Entiende contexto contable colombiano (PUC, retenciones, DIAN) mejor que cualquier otro modelo. Y funciona desde el computador de Jorge y Carolina sin instalar nada en los servidores de la empresa.

**Precio:** $20 USD/usuario/mes (~$80.000 COP c/u)
**Usuarios:** 2 (Jorge + Carolina) = $40 USD/mes

---

### 2. Claude Code (Entorno de Ejecución)
**Qué hace:** Es la herramienta donde los 6 procesos inteligentes viven y se ejecutan. Jorge escribe "registrar compra" y el sistema hace todo. Carolina escribe "legalizar caja menor" y el sistema procesa los recibos. Es como tener un asistente especializado dentro de la terminal del computador.

**Por qué para Galco:** Sin Claude Code no hay donde correr los 6 skills. Es el entorno que convierte a Claude de un chatbot genérico en un sistema que conoce la operación de Galco — sabe cómo se estructura el Excel de Jorge, conoce el PUC de Carolina, tiene los datos maestros de la empresa.

**Precio:** Incluido con Claude Pro (mismo plan de $20 USD/usuario/mes)

---

### 3. Fireflies.ai (Transcripción de Reuniones)
**Qué hace:** Se conecta a las reuniones virtuales (Zoom, Google Meet, Teams) y automáticamente graba, transcribe, y resume todo lo que se habló. Después puedes buscar cualquier cosa que se dijo en cualquier reunión.

**Por qué para Galco:** Diego organiza reuniones con proveedores, con el equipo, con clientes. Hoy esas conversaciones se pierden — acuerdos verbales, compromisos de entrega, negociaciones de precio. Con Fireflies, todo queda documentado y se puede buscar. Si Jorge necesita saber qué se acordó con un proveedor hace 2 meses, lo busca en 10 segundos.

**Precio:** $10 USD/mes (plan Pro, 1 cuenta para Diego)

---

### 4. NotebookLM (Base de Conocimiento Contable)
**Qué hace:** Es un sistema de Google donde cargas documentos (PDFs, normas, manuales) y le puedes hacer preguntas. Te responde citando exactamente de dónde sacó la información.

**Por qué para Galco:** Carolina ya usa ChatGPT para consultas tributarias. NotebookLM es mejor para eso porque le cargas el Estatuto Tributario, las resoluciones DIAN que aplican a Galco, el PUC, y las normas de retenciones — y ella le pregunta con la certeza de que la respuesta viene de fuentes reales, no inventadas. Es gratis y no requiere instalación.

**Precio:** Gratis

---

### 5. Gamma AI (Reportes y Presentaciones)
**Qué hace:** Genera presentaciones y documentos visuales profesionales en minutos. Le das información en texto y te devuelve slides o reportes listos.

**Por qué para Galco:** Cuando Diego necesite presentar resultados a Don Ignacio — el reporte de calificación de proveedores, el análisis de compras del mes, o un resumen financiero — puede generar la presentación en 2 minutos en vez de armarla a mano en PowerPoint. También sirve para presentaciones a clientes.

**Precio:** Gratis (con opciones premium)

---

## Costo Total Estimado del Stack

| Herramienta | Precio mensual |
|-------------|---------------|
| Claude Pro (Jorge) | $20 USD (~$80.000 COP) |
| Claude Pro (Carolina) | $20 USD (~$80.000 COP) |
| Fireflies.ai Pro (Diego) | $10 USD (~$40.000 COP) |
| NotebookLM | Gratis |
| Gamma AI | Gratis |
| **Total** | **$50 USD/mes (~$200.000 COP/mes)** |

> **Nota:** Los costos de suscripción de las herramientas son responsabilidad del cliente y NO están incluidos en el precio del Setup de IA ($7.000.000 COP + IVA). El setup es una inversión única; el stack es un costo recurrente mensual.

---

## Cómo se Conectan

```
JORGE (Compras):                      CAROLINA (Contabilidad):

  Correos/PDFs                          Recibos/Remisiones
  de proveedores                        de producción
       ↓                                      ↓
  ┌─────────────┐                      ┌─────────────┐
  │ CLAUDE CODE │                      │ CLAUDE CODE │
  │ (6 Skills)  │                      │ (6 Skills)  │
  └──────┬──────┘                      └──────┬──────┘
         ↓                                    ↓
  Archivos listos                      Archivos listos
  para SIGO                            para Ilimitada
  (OC, registro)                       (facturas, terceros,
                                        docs soporte)

              DIEGO (Dirección):

  Reuniones → FIREFLIES → Transcripts
                              ↓
  Consultas → NOTEBOOKLM → Respuestas con fuente
  tributarias

  Datos → GAMMA AI → Presentaciones para Don Ignacio
```

## Herramientas que Galco Ya Tiene y Mantenemos
- **SIGO** — ERP para órdenes de compra e inventario (los skills generan archivos compatibles)
- **Ilimitada** — Software contable (los skills generan plantillas de carga)
- **Word Manager** — Gestión documental de facturas (ya tiene bot de XMLs, funciona bien)
- **SharePoint** — Almacenamiento de archivos (seguir usando)
- **Jenguar** — Software de producción (los skills leen sus remisiones)
- **Excel** — Sigue siendo útil como formato intermedio y para la "biblia" de Jorge
