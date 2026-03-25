---
name: registro-compras
description: >
  Estructura requerimientos de compra desde cualquier formato (email, PDF, Excel)
  al formato del registro de compras de Galco. Use when "registrar compra",
  "procesar requerimiento", "nuevo pedido", "agregar al registro".
  Lee inputs en cualquier formato, agrupa por tipo de insumo, sugiere proveedor.
argument-hint: "[pegar requerimiento o ruta al archivo]"
allowed-tools: ["Read", "Write", "Glob", "Grep", "Bash"]
---

# registro-compras — Estructura de Requerimientos de Compra

Procesa requerimientos de compra en cualquier formato y los estructura en el formato Excel estándar de Galco para Jorge. Agrupa ítems por tipo de insumo, sugiere proveedores, y genera borradores de correos de cotización.

---

## STEP 1: Leer Referencias Base

Antes de procesar cualquier requerimiento:

1. Lee `references/catalogo-proveedores.md` — Base de proveedores de Galco con especialidades
2. Lee `references/codigos-sigo.md` — Códigos SIGO de productos comunes
3. Lee `references/template-registro.md` — Estructura exacta del formato Excel de Jorge

---

## STEP 2: Recibir Requerimiento

El usuario puede:
- **Pegar texto directo:** Un correo, WhatsApp, o descripción en el chat
- **Proporcionar ruta a archivo:** PDF, Excel, o imagen de un documento
- **Describir verbalmente:** "Necesitamos acero, tornillos y EPP para..."

Si proporciona ruta, usa Read para leer el archivo. Si es texto, procesa directamente.

---

## STEP 3: Parsear Requerimiento

Para cada ítem mencionado, extrae:

1. **Descripción del ítem:** Qué es (acero, tornillo, disco de corte, guante, etc.)
2. **Cantidad:** Número
3. **Unidad:** kg, metros, piezas, pares, galones, etc.
4. **Urgencia:** Normal, media, alta, URGENTE (busca palabras clave como "viernes", "hoy", "inmediato", "urgente")
5. **Área solicitante:** Si está mencionada (Producción, Mantenimiento, Oficina, etc.)
6. **Especificaciones extras:** Calibre, espesor, tipo, grado, etc.

---

## STEP 4: Clasificar por Tipo de Insumo

Agrupa cada ítem en UNA de estas categorías (usa el catálogo de proveedores como guía):

- **Acero:** Láminas, tubería, perfiles, platinas, ángulos, barras
- **Tornillería:** Tornillos, tuercas, arandelas, pernos, remaches
- **Soldadura:** Varillas, alambres, gases (oxígeno, argón)
- **Herramientas/Accesorios:** Discos de corte, puntas, brocas, pesos, mangas
- **EPP:** Guantes, cascos, gafas, caretas, arneses, botas
- **Químicos:** Anticorrosivos, desengrantes, solventes, limpiadores
- **Maquila externa:** Trabajos que Galco encarga a terceros (soldadura, corte, fresado)

---

## STEP 5: Buscar Códigos SIGO

Para cada ítem, intenta encontrar su código SIGO en `references/codigos-sigo.md`:

- Si encuentra coincidencia exacta → usa ese código
- Si es cercana (ej: "acero HR calibre 14" ≈ "Lámina acero HR calibre 14") → nota la equivalencia
- Si no encuentra → deja espacio en blanco y nota que requiere confirmación

---

## STEP 6: Sugerir Proveedor

Consulta `references/catalogo-proveedores.md`:

- Para cada tipo de insumo/grupo, identifica **2-3 proveedores que tengan esa especialidad**
- Prioriza proveedores con buena cobertura en esa categoría
- Si alguno es "preferido" (notar en el catálogo), destácalo

Ejemplo:
- Acero → AcerosCOL (primera opción), Metalcenter, Dipsa
- Tornillería → Ferretería Industrial Gomez, Tornillos Medellín
- EPP → Seguridad Plus, Protección Total

---

## STEP 7: Generar Registro Estructurado

Crea una **tabla en markdown** con el formato del Excel de Jorge (usualmente):

| Fecha | Área Solicitante | Descripción Ítem | Cantidad | Unidad | Tipo Insumo | Proveedor Sugerido | Código SIGO | Urgencia | Estado | Observaciones |
|-------|------------------|-------------------|----------|--------|-------------|-------------------|------------|----------|--------|--------------|
| [Hoy] | [Producción] | [Acero HR calibre 14] | 20 | Láminas | Acero | AcerosCOL | 4521.01.02 | Alta | Pendiente cotización | Dimensiones: 1.22x2.44m |

---

## STEP 8: Generar Borradores de Correos

Por cada **grupo de insumos para un proveedor**, genera un correo borrador:

**ESTRUCTURA:**

```
Para: [email proveedor]
Asunto: Solicitud de Cotización — [Galco / Proyecto]

Cordial saludo [Nombre Contacto],

Esperamos encuentres bien. Te solicitamos cotización para los siguientes ítems:

1. [Descripción ítem 1] — [Cantidad] [Unidad] — Precio: ___
2. [Descripción ítem 2] — [Cantidad] [Unidad] — Precio: ___
[...]

Datos para la cotización:
- Plazo de entrega: [Si es urgente → ASAP]
- Condiciones de pago: [Estándar: 30 días]
- Dirección de entrega: Galco Ingeniería, Cra 50 #30-15 Bodega 4, Itagüí, Antioquia

Esperamos tu cotización.

Gracias,
Jorge (Compras)
Galco
```

---

## STEP 9: Mostrar Resultado en Chat

Muestra el output ANTES de guardar:

1. **Tabla estructurada** con todos los ítems
2. **Resumen de agrupación:** "Encontré X ítems: Y acero, Z tornillos, W EPP"
3. **Proveedores sugeridos:** Qué proveedor cubre cada grupo
4. **Borradores de correos** listos para copiar-pegar

Pregunta: *"¿Veo bien los ítems y proveedores? ¿Quieres que haga ajustes?"*

---

## STEP 10: Guardar Outputs

Una vez aprobado por el usuario:

1. **Archivo Excel/CSV:** Guarda la tabla en `registro-compras-[FECHA-YYYYMMDD].csv` en la carpeta del cliente
2. **Borradores de correos:** Guarda en `correos-cotizacion-[FECHA].md` en la carpeta del cliente

---

## Reglas

- SIEMPRE parsear correctamente cantidad y unidad — esto es crítico para el cálculo de costos
- Si falta urgencia, asumir "Normal"
- Si falta área solicitante, preguntar o asumir "Producción" si es materia prima
- Usar el catálogo de proveedores — NO inventar proveedores
- Si un ítem NO se encuentra en SIGO, dejar nota para que Jorge valide el código
- Los códigos SIGO deben ser EXACTOS — si hay duda, dejar blank
- Máximo 2-3 proveedores por grupo — más eso confunde la decisión
- Respeta los formatos: cantidades en números, unidades en minúsculas estándar

---

## Ejemplos de Triggers

- "Jorge, necesitamos para el proyecto del edificio Torres: 20 láminas de acero HR..."
- "Registra esta compra: 500 tornillos de 1/2 x 2 pulgadas, 5 guantes, 1 galón de anticorrosivo"
- "Procesa este requerimiento" → [adjunto Excel de Producción]
- "Nuevo pedido para Mantenimiento: discos de corte, varillas de soldadura"
