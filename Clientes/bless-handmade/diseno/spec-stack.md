# Spec Stack Técnico: Bless Handmade

## Herramientas Seleccionadas

### Claude (slug: claude)
- **Categoría:** dairy (AI general-purpose)
- **URL:** https://claude.ai
- **Pricing:** $20 USD/mes por usuario (Plan Pro)
- **Dificultad:** intermediate
- **Tags:** IA, razonamiento, texto, análisis, orquestación
- **Rol en el stack:** Motor de IA principal + orquestador de flujos. Ejecuta los 5 skills (clasificación de pedidos, generación de mensajes, detección de atrasos, digitalización de órdenes B2B) Y conecta automáticamente Google Sheets con Airtable usando MCPs.
- **Integración con motor IA:** Es el motor IA. Usa MCPs (Model Context Protocol) para conectarse directamente con Google Sheets y Airtable sin necesidad de herramientas intermedias.
- **MCP disponible:** Sí — Claude Desktop soporta MCPs nativamente para Google Sheets, Airtable y otras herramientas

---

### Airtable (slug: airtable)
- **Categoría:** apps (base de datos visual)
- **URL:** https://airtable.com
- **Pricing:** Free (1,200 registros/base), Plus $10 USD/usuario/mes (ilimitado)
- **Dificultad:** intermediate
- **Tags:** base de datos, automatización, colaboración, no-code
- **Rol en el stack:** Base de datos centralizada de producción. Reemplaza Google Sheets manual. Almacena: pedidos, talleres terceros, fechas de envío/retorno, estados, flujos secuenciales. Genera vistas filtradas (por taller, por estado, por urgencia).
- **Integración con motor IA:** Claude se conecta directamente vía MCP de Airtable. Claude genera datos estructurados y los escribe directamente en Airtable. API REST completa disponible.
- **MCP disponible:** Sí — existe MCP community para Airtable

---

### Google Sheets (slug: google-sheets — herramienta del cliente)
- **Categoría:** productividad (hojas de cálculo)
- **URL:** https://sheets.google.com
- **Pricing:** Free (incluido en Google Workspace)
- **Dificultad:** beginner
- **Tags:** hojas de cálculo, colaboración, exportación
- **Rol en el stack:** Punto de entrada de datos. El sistema in-house de Bless exporta ventas a Google Sheets. Claude lee directamente las nuevas filas.
- **Integración con motor IA:** Claude lee Google Sheets directamente vía MCP de Google. Claude monitorea cambios y procesa nuevas ventas automáticamente.
- **MCP disponible:** Sí — Google tiene MCP oficial para Google Workspace

---

### WhatsApp (slug: whatsapp — herramienta del cliente)
- **Categoría:** comunicación
- **URL:** https://whatsapp.com
- **Pricing:** Free (uso personal)
- **Dificultad:** beginner
- **Tags:** mensajería, comunicación, terceros
- **Rol en el stack:** Canal de comunicación con talleres terceros. Juliana copia los mensajes generados por Claude y los envía manualmente.
- **Integración con motor IA:** No automatizada en V1. Claude genera el texto, Juliana lo copia y envía. (V2: podríamos integrar WhatsApp Business API si el volumen crece).
- **MCP disponible:** No aplica (uso manual)
- **IMPORTANTE:** El sistema NO funciona como un agente proactivo de WhatsApp. No se construye un bot que envíe mensajes automáticamente ni que sostenga conversaciones de forma autónoma. La emisión de mensajes, administración de conversaciones, y uso general de WhatsApp sigue siendo responsabilidad 100% del cliente. El sistema solo prepara el contenido de los mensajes para que el cliente los copie y envíe manualmente.

---

### Circleback (slug: circleback)
- **Categoría:** productividad (transcripción y notas de reuniones con IA)
- **URL:** https://circleback.ai
- **Pricing:** Free trial 7 días, Individual $21 USD/mes, Team $25 USD/mes
- **Dificultad:** beginner
- **Tags:** transcripción, reuniones, IA, notas automáticas, action items, búsqueda
- **Rol en el stack:** Bonus — transcribe reuniones con talleres o clientes mayoristas con 95%+ de precisión. Genera notas estructuradas, extrae action items automáticamente, y permite buscar entre todas las reuniones. Funciona sin bots visibles (grabación local vía app desktop).
- **Integración con motor IA:** Circleback genera transcripts y notas estructuradas → se pueden pasar a Claude para extraer compromisos, detalles de órdenes, o términos acordados. Integra con 1,000+ apps vía automations.
- **MCP disponible:** No, pero tiene API REST y automations nativas

---

## Mapa de Integraciones

```
Sistema In-House (Bless)
        ↓
Google Sheets (exportación ventas)
        ↓
Claude (lee vía MCP de Google Sheets)
        ↓
Claude (Skill 1: Programador Producción)
        ↓
Claude (escribe vía MCP de Airtable)
        ↓
Airtable (tabla: Pedidos en Proceso)
        ↓
Claude (Skill 2: Coordinador Terceros + Insumos)
        ↓
Juliana (copia y envía por WhatsApp)

--- Flujo paralelo de alertas ---

Claude (cron: trigger diario 8:00 AM)
        ↓
Claude (Skill 4: Alarma de Atrasos)
        ↓
Claude (lee Airtable vía MCP)
        ↓
Juliana (recibe reporte de alertas)

--- Flujo de mayoreo ---

Orden B2B (foto/PDF)
        ↓
Claude (Skill 5: Procesador Mayoreo)
        ↓
Claude (escribe a Airtable vía MCP)
        ↓
Entra al flujo normal de producción
```

---

## Orden de Setup Recomendado

1. **Claude** — Configurar cuenta Pro + Claude Desktop con MCPs
2. **Airtable** — Crear base de datos con tablas:
   - Pedidos en Proceso (ID venta, referencia, color, taller asignado, fecha envío, fecha esperada, estado)
   - Talleres Terceros (nombre, especialidad, WhatsApp, tiempo promedio)
   - Catálogo de Referencias (referencia, tipo de proceso, taller default)
   - Inventario de Insumos (tela/fleco, cantidad actual, mínimo, proveedor)
3. **MCPs** — Instalar y configurar:
   - MCP de Google Sheets (leer exportaciones)
   - MCP de Airtable (escribir/leer pedidos)
4. **Google Sheets** — Asegurar permisos de acceso para Claude via MCP
5. **Circleback** — Instalar app desktop y conectar a Google Meet/Zoom (opcional)

---

## Herramientas del Cliente que Mantenemos

- **Google Sheets:** Sigue siendo el punto de exportación del sistema in-house. Claude lo lee automáticamente vía MCP.
- **WhatsApp:** Sigue siendo el canal de comunicación con talleres. Solo que ahora los mensajes los genera el sistema.
- **Sistema in-house de Bless:** No se toca. Sigue exportando a Google Sheets como siempre.

---

## Herramientas del Cliente que Reemplazamos

- **Google Sheets manual por taller** → **Airtable centralizado**
  - **Por qué:** Las hojas separadas por taller no permiten visibilidad general ni flujos secuenciales. Airtable da tablero único con vistas filtradas, alertas automáticas, y API directa con Claude via MCP.

---

## Arquitectura de los 5 Skills

### Skill 1: programador-produccion
- **Trigger:** Nueva fila en Google Sheet (Claude monitorea vía MCP)
- **Input:** Fila con: ID venta, referencia, color, fecha, canal
- **Proceso:** Claude lee fila → cruza referencia con catálogo → clasifica interno vs tercero → asigna taller
- **Output:** Registro estructurado en Airtable (Claude escribe vía MCP)

### Skill 2: coordinador-terceros-insumos
- **Trigger:** Manual o automático después de Skill 1
- **Input:** Pedidos nuevos en Airtable + niveles de inventario
- **Proceso:** Claude genera mensajes por taller + órdenes para proveedores
- **Output:** Mensajes listos + órdenes de compra

### Skill 3: tablero-seguimiento
- **Trigger:** Permanente (Airtable vistas)
- **Input:** Datos en tiempo real de Airtable
- **Proceso:** Airtable genera vistas: por taller, por estado, por urgencia
- **Output:** Dashboard accesible vía web

### Skill 4: alerta-atrasos
- **Trigger:** Cron diario (8:00 AM) ejecutado por Claude
- **Input:** Pedidos en proceso (Claude lee Airtable vía MCP)
- **Proceso:** Claude calcula días en taller vs límite → clasifica atrasados, vencen hoy, vencen mañana
- **Output:** Reporte de alertas

### Skill 5: procesador-mayoreo
- **Trigger:** Manual (Juliana sube foto/PDF a Claude)
- **Input:** Imagen o PDF de orden B2B
- **Proceso:** Claude extrae: prendas, cantidades, referencias → valida contra catálogo → clasifica
- **Output:** Registros en Airtable vía MCP (entran al flujo normal)

---

## Consideraciones Técnicas

### Volumen esperado
- ~350 prendas/mes = ~15-20 pedidos/día
- Airtable Free (1,200 registros) = ~3-4 meses de historial antes de necesitar plan pago
- Claude procesa todo sin límites de operaciones (solo costo de API si usamos API directa)

### Escalabilidad
Si Bless crece a 500-700 prendas/mes:
- Airtable Plus ($10 USD/mes) da registros ilimitados
- Claude API puede manejar volumen sin problema
- No hay límites de "operaciones" como con iPaaS tradicionales

### Puntos de falla
- **Google Sheets como entrada:** Si el sistema in-house falla en exportar, Claude no recibe datos. Mitigación: alerta si no detecta nuevas filas en X horas.
- **WhatsApp manual:** Juliana debe copiar y enviar mensajes. Si se olvida, los terceros no reciben pedidos. Mitigación: Considerar WhatsApp Business API en V2.

### Ventajas vs iPaaS (Make/Zapier)
- **Sin límites de operaciones:** Claude procesa lo que necesite sin preocuparse por "ops mensuales"
- **Más simple:** Solo 1 herramienta (Claude) hace toda la orquestación
- **Más barato:** No hay costos adicionales de plataforma de automatización
- **Más flexible:** Cambios en la lógica se hacen en prompts de Claude, no reconfigurando flujos visuales

---

## Costos Proyectados (12 meses)

| Herramienta | Mes 1-3 | Mes 4-12 | Anual |
|-------------|---------|----------|-------|
| Claude (1 user) | $20 | $20 | $240 |
| Airtable | Free | $10 | $90 |
| Circleback | $21 (trial 7d) | $21 | $231 |
| **Total** | **$41** | **$51** | **$561 USD** |

**Promedio mensual:** ~$47 USD (~$190.000 COP)

**ROI estimado:**
- Horas recuperadas: ~12 horas/semana = ~48 horas/mes
- Valor hora Juliana: ~$15.000 COP/hora (estimado)
- Ahorro mensual: ~$720.000 COP
- Costo stack: ~$190.000 COP/mes
- **ROI neto:** ~$530.000 COP/mes (~3.8x)

**Sin contar:**
- Reducción de devoluciones por olvidos
- Mejora en satisfacción del cliente
- Capacidad de Juliana para enfocarse en tareas estratégicas vs operativas
