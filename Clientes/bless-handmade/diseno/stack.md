# Stack de Herramientas Recomendado para Bless Handmade

## Estas son las herramientas que vamos a integrar en tu operación

### 1. Claude (Motor de IA + Orquestación)
**Qué hace:** Es el cerebro detrás de todos los procesos inteligentes. Lee las exportaciones de ventas desde Google Sheets, clasifica las prendas por tipo de proceso, genera los mensajes para talleres, detecta atrasos, digitaliza órdenes B2B, y coordina todo el flujo automáticamente entre sistemas.

**Por qué para tu empresa:** Bless necesita un asistente que entienda el contexto de moda artesanal, sepa diferenciar referencias, genere mensajes personalizados en español, Y que conecte automáticamente Google Sheets con Airtable sin necesidad de herramientas intermedias. Claude maneja todo el flujo de principio a fin.

**Precio:** $20 USD/mes por usuario

---

### 2. Airtable (Base de Datos de Producción)
**Qué hace:** Reemplaza tus hojas de Google Sheets separadas por taller. Todo queda en un solo lugar: pedidos, talleres, fechas de envío, estados, flujos secuenciales. Genera vistas automáticas por taller, por estado, por fecha de entrega.

**Por qué para tu empresa:** Google Sheets funciona para listas simples, pero cuando tienes pedidos que pasan por varios talleres en secuencia (crochet → pedrería), necesitas una base de datos real. Airtable te da tableros visuales, alertas automáticas, y vistas filtradas sin complicarte con SQL.

**Precio:** Free (hasta 1,200 registros/base) o $10 USD/usuario/mes (ilimitado)

---

### 3. Google Sheets (Exportaciones)
**Qué hace:** Lo seguís usando tal como está — el sistema in-house exporta ventas, Juliana sube órdenes B2B si es necesario.

**Por qué para tu empresa:** Ya lo usás, ya funciona para exportaciones, y Claude puede leerlo automáticamente. No hay razón para cambiarlo.

**Precio:** Free (ya lo tenés)

---

### 4. WhatsApp (Comunicación con Terceros)
**Qué hace:** Lo seguís usando como siempre — los mensajes que genera el Coordinador de Terceros los copiás y enviás por WhatsApp.

**Por qué para tu empresa:** Marta, Adri, Ferney y Claudia ya te responden por WhatsApp. No vamos a cambiar eso. El sistema te prepara los mensajes listos, vos solo enviás.

**IMPORTANTE:** Si bien el sistema genera los mensajes automáticamente, NO funciona como un agente proactivo que envía mensajes y sostiene conversaciones de forma autónoma. La emisión de los mensajes, la administración de las conversaciones y el uso en general de WhatsApp sigue corriendo por cuenta de Bless Handmade. El sistema solo prepara el contenido de los mensajes.

**Precio:** Free (ya lo tenés)

---

### 5. Circleback (Transcripción de Reuniones — Bonus)
**Qué hace:** Graba y transcribe tus reuniones de Zoom, Google Meet o Microsoft Teams automáticamente. Genera notas estructuradas, extrae action items y permite buscar entre todas las reuniones. Funciona sin bots visibles (grabación local).

**Por qué para tu empresa:** Cuando hablás con un taller sobre un pedido urgente o cerrás una orden mayorista, los detalles quedan grabados con 95%+ de precisión. Podés revisar después qué se acordó, buscar menciones específicas y extraer compromisos automáticamente sin tener que confiar solo en la memoria.

**Precio:** Free (trial 7 días), luego desde $21 USD/mes por usuario

---

## Costo Total Estimado del Stack

| Herramienta | Precio mensual | Notas |
|-------------|----------------|-------|
| Claude (1 usuario) | $20 USD | Obligatorio — motor de IA + orquestación |
| Airtable (1-2 usuarios) | $10 USD | Puede empezar Free |
| Google Sheets | Free | Ya lo tenés |
| WhatsApp | Free | Ya lo tenés (mensajes manuales) |
| Circleback | $21 USD | Opcional, trial 7 días gratis |
| **Total (arranque)** | **~$20 USD/mes** | Con planes Free donde aplique |
| **Total (full)** | **~$51 USD/mes** | Con todos los planes pagos |

**Promedio estimado:** $30-40 USD/mes (~$120.000-160.000 COP)

> **Nota importante:** Los costos de suscripción de las herramientas son responsabilidad de Bless Handmade y **no están incluidos** en el precio del AI Ops Layer ($7.000.000 COP + IVA). El servicio cubre el setup, configuración, diseño de procesos, entrenamiento y entrega funcionando — las herramientas son el "combustible" mensual.

---

## Cómo se conectan

```
Sistema In-House
     ↓
Google Sheets (exportación de ventas)
     ↓
Claude (lee automáticamente nuevas filas)
     ↓
Claude (clasifica prendas: internas vs terceros)
     ↓
Claude (escribe directamente en Airtable)
     ↓
Airtable (registra pedidos + genera plan de producción)
     ↓
Claude (genera mensajes por taller + alertas de insumos)
     ↓
Juliana recibe mensajes listos → los envía por WhatsApp
     ↓
Airtable (tablero de seguimiento en tiempo real)
     ↓
Claude (revisa cada mañana: calcula atrasos)
     ↓
Juliana recibe reporte de alertas
```

**Flujo para pedidos B2B (mayoreo):**
```
Orden en papel (foto)
     ↓
Claude (digitaliza: extrae prendas, cantidades, referencias)
     ↓
Claude (escribe en Airtable)
     ↓
Airtable (entra al mismo flujo de producción)
```

---

## ¿Por qué este stack y no otro?

**Simple:** Solo 1 herramienta nueva (Airtable). Claude conecta todo. El resto ya lo usás.

**Económico:** Puede arrancar con ~$20 USD/mes (solo Claude) y escalar gradualmente.

**Fácil de adoptar:** Airtable es visual, Claude se integra directamente. Juliana no necesita programar ni configurar integraciones complejas.

**Real-time:** Claude + Airtable permiten que el tablero de seguimiento se actualice automáticamente.

**Escalable:** Si Bless crece a 500-700 prendas/mes, el stack aguanta sin cambios grandes.

**Sin herramientas intermedias:** Claude maneja directamente la conexión entre Google Sheets y Airtable, sin necesidad de plataformas de automatización adicionales.
