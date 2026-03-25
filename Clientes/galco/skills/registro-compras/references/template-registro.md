# Template — Registro de Compras de Galco

Estructura exacta del formato Excel de Jorge para registro de compras. Esta es la "biblia" del proceso de compras.

---

## Descripción del Formato

El registro es una tabla con las siguientes columnas (en orden):

| # | Columna | Tipo | Obligatorio | Ejemplo | Notas |
|----|---------|------|------------|---------|-------|
| 1 | **Fecha** | Fecha (DD/MM/YYYY) | Sí | 24/03/2025 | Fecha en que se registra el requerimiento |
| 2 | **Área Solicitante** | Texto | Sí | Producción | Producción, Mantenimiento, Oficina, Comercial |
| 3 | **Descripción Ítem** | Texto largo | Sí | Lámina acero HR calibre 14 1.22x2.44 | Descripción detallada del producto |
| 4 | **Cantidad** | Número | Sí | 20 | Cantidad solicitada (sin decimales o con 2 decimales) |
| 5 | **Unidad** | Texto | Sí | Láminas | Láminas, kg, piezas, pares, galones, metros, tubos |
| 6 | **Tipo Insumo** | Texto | Sí | Acero | Acero, Tornillería, Soldadura, Herramientas, EPP, Químicos, Maquila |
| 7 | **Proveedor Sugerido** | Texto | Sí | AcerosCOL | Nombre del proveedor principal (2-3 alternativas en Observaciones) |
| 8 | **Código SIGO** | Texto | No | 4501.01.03 | Código del sistema SIGO, si aplica |
| 9 | **Urgencia** | Texto | Sí | Alta | Normal, Media, Alta, URGENTE |
| 10 | **Estado** | Texto | Sí | Pendiente cotización | Pendiente cotización, Cotización enviada, Cotizado, Orden generada, Recibido |
| 11 | **Observaciones** | Texto largo | No | Alternativas: MetalCenter, Dipsa. Plazo max viernes | Proveedores alternos, especificaciones extra, restricciones |

---

## Valores Estándar Permitidos

### Área Solicitante
- Producción
- Mantenimiento
- Oficina
- Comercial
- Dirección
- [Otro — especificar en observaciones]

### Unidad
- Láminas
- kg
- Piezas
- Pares
- Galones
- Litros
- Metros
- Tubos
- Cajas
- Unidad
- [Otra — especificar]

### Tipo Insumo
- Acero
- Tornillería
- Soldadura
- Herramientas/Accesorios
- EPP
- Químicos
- Maquila
- Otros

### Urgencia
- Normal (entrega estándar, sin prisa)
- Media (preferible esta semana)
- Alta (preferible 2-3 días)
- URGENTE (ASAP, hoy o mañana)

### Estado
- Pendiente cotización (acaba de entrar, sin cotización aún)
- Cotización enviada (ya contactamos proveedor)
- Cotizado (recibimos presupuesto, en análisis)
- Orden generada (aprobado, orden creada en sistema)
- Recibido (llego a bodega, cerrado)

---

## Ejemplo de Registro Completo

```
Fecha | Área Solicitante | Descripción Ítem | Cantidad | Unidad | Tipo Insumo | Proveedor Sugerido | Código SIGO | Urgencia | Estado | Observaciones
---|---|---|---|---|---|---|---|---|---|---
24/03/2025 | Producción | Lámina acero HR calibre 14, dimensión 1.22x2.44 m | 20 | Láminas | Acero | AcerosCOL | 4501.01.03 | Alta | Pendiente cotización | Alternativas: MetalCenter, Dipsa. Proyecto Torres del Parque. Plazo max viernes 28/03
24/03/2025 | Producción | Varilla soldadura 6013 de 1/8" | 50 | Kg | Soldadura | Soldaduras Integradas | 4701.01.01 | Alta | Cotización enviada | Stock disponible, verificar plazo entrega
24/03/2025 | Producción | Disco de corte 7" x 1/8" | 10 | Piezas | Herramientas | Herramientas Profesionales HDZ | 4801.01.01 | Normal | Cotizado | Precio: $8.500 c/u. Presupuesto válido 7 días
24/03/2025 | Producción | Guante de carnaza | 5 | Pares | EPP | Seguridad Plus | 5001.01.01 | Normal | Orden generada | Entregan mañana 25/03. PO #5823
24/03/2025 | Producción | Anticorrosivo rojo óxido | 1 | Galón | Químicos | Químicos Industriales Atlántico | 5101.01.01 | Media | Pendiente cotización | Revisar stock. Alternativa: Soluciones Químicas
24/03/2025 | Mantenimiento | Tornillo hexagonal acero 1/2" x 2", grado 5 con tuerca | 500 | Piezas | Tornillería | Ferretería Industrial Gómez | 4601.01.04 | Media | Cotizado | $250 la paquete (por 50). Total: 10 paquetes. Entrega hoy.
```

---

## Instrucciones para Diligenciar

1. **Fecha:** Poner la fecha del día en que se registra
2. **Descripción Ítem:** Sea lo más específico posible — incluya calibres, medidas, especificaciones
3. **Cantidad + Unidad:** Asegurarse que sean compatibles (20 láminas, 50 kg, 500 piezas)
4. **Tipo Insumo:** Usar valores de la lista estándar — sirve para agrupar en reportes
5. **Proveedor Sugerido:** Siempre elegir 1 principal. En Observaciones: "Alternativas: X, Y"
6. **Código SIGO:** Si lo conoce, incluirlo. Si no, dejar en blanco y notar en Observaciones
7. **Urgencia:** Ser realista — "URGENTE" solo si realmente es hoy/mañana
8. **Estado:** Actualizar conforme avanza el proceso
9. **Observaciones:** Campo libre — aquí va contexto extra, alternativas, restricciones, etc.

---

## Flujo de Estados

```
Pendiente cotización
    ↓
Cotización enviada
    ↓
Cotizado
    ↓
Orden generada
    ↓
Recibido ✓
```

El registro vive en una hoja Excel de Google Sheets o Excel local, actualizado por Jorge en tiempo real.

---

## Exportar para Análisis

El registro se puede exportar a:
- **CSV** para análisis con Google Sheets
- **Excel** para análisis local con fórmulas de costo
- **PDF** para reportes mensuales de compras (por tipo de insumo, urgencia, proveedor)

---

## Criterios de Calidad

- ✓ Todas las filas tienen Fecha, Área, Descripción, Cantidad, Unidad, Tipo, Proveedor, Urgencia, Estado
- ✓ Descripción es detallada (no "acero" sino "Lámina acero HR calibre 14 1.22x2.44")
- ✓ Cantidades son números (20, no "veinte")
- ✓ Urgencia es realista (la mayoría "Normal" o "Media")
- ✓ Estados están actualizados (no queda todo en "Pendiente")
- ✓ Proveedores coinciden con catálogo Galco
- ✓ Observaciones explicaban cambios o excepciones
