---
name: comparador-cotizaciones
description: >
  Compara cotizaciones de múltiples proveedores, identifica mejor precio por ítem
  y genera matriz de decisión. Use when "comparar cotizaciones", "cuál proveedor
  es mejor", "comparar precios", "evaluar ofertas", "análisis de cotizaciones".
  Soporta PDF y Excel de proveedores.
argument-hint: "[rutas a cotizaciones de proveedores]"
allowed-tools: ["Read", "Write", "Bash", "Glob"]
---

# comparador-cotizaciones — Análisis de Ofertas y Comparativa de Precios

Compara cotizaciones de 2-5 proveedores para los mismos o similares ítems. Normaliza precios, identifica el ganador por ítem, detecta anomalías de precio, y genera una matriz de decisión clara.

---

## STEP 1: Leer Referencias Base

Antes de hacer cualquier análisis:

1. Lee `references/precios-historicos.md` — Precios históricos de referencia
2. Lee `references/proveedores-preferidos.md` — Ranking de proveedores y preferencias

---

## STEP 2: Recibir Cotizaciones

El usuario puede proporcionar:

- **Rutas a archivos:** PDF de cotizaciones, Excel, imágenes
- **Nombres de proveedores:** Si ya están en el registro de Galco
- **Texto pegado:** Una cotización copiada de correo

Si proporciona rutas, usa Read para leer cada archivo.

---

## STEP 3: Parsear Cotizaciones

Para cada cotización, extrae:

1. **Nombre del proveedor**
2. **Fecha de la cotización**
3. **Vigencia** (cuántos días es válida)
4. **Plazo de entrega**
5. **Condiciones de pago**
6. **Para cada ítem:**
   - Descripción del producto
   - Cantidad
   - Unidad
   - Precio unitario
   - Precio total
   - Especificaciones/notas

---

## STEP 4: Normalizar Descripciones

Los proveedores describen items diferente. Estandariza:

- "Lámina acero HR c14" = "Lámina acero HR calibre 14 (1.22x2.44)"
- "Tornillos 1/2x2 grado 5" = "Tornillo hexagonal acero 1/2\" x 2\" grado 5"
- "Varilla 6013 1/8" = "Varilla soldadura 6013 de 1/8\""

Agrupa por descripción normalizada.

---

## STEP 5: Comparar Precios

Para cada ítem normalizado, crea fila en tabla comparativa:

| Descripción | Cantidad | Unidad | Proveedor 1 | Proveedor 2 | Proveedor 3 | Ganador | Var % |
|-------------|----------|--------|------------|------------|-----------|--------|-------|
| Acero HR c14 | 20 | Láminas | $X | $Y | $Z | Proveedor2 | -10% |

**Cálculos:**

- **Ganador:** Menor precio total por línea
- **Var %:** Variación del ganador respecto al más caro
- **Alerta:** Si el precio está FUERA del rango histórico (muy caro o muy barato)

---

## STEP 6: Comparar Contra Histórico

Consulta `references/precios-historicos.md`:

- Si precio actual < precio histórico − 5% → "Buen precio ✓"
- Si precio actual > precio histórico + 10% → "Alerta: precio alto ⚠"
- Si precio está dentro del rango → Normal

Marca en la matriz.

---

## STEP 7: Evaluar Proveedores

Más allá del precio, considera:

1. **Plazo de entrega:** ¿Cuál es más rápido? (especialmente si es URGENTE)
2. **Vigencia:** ¿Cuál cotización es válida por más días?
3. **Condiciones:** ¿Quién da mejor plazo de pago?
4. **Preferencia Galco:** Consulta `references/proveedores-preferidos.md`
5. **Historial:** ¿Hemos trabajado bien con este proveedor antes?

---

## STEP 8: Generar Matriz Completa

Crea tabla HTML o Markdown con:

**Sección 1: Comparativa de Precios**

| Ítem | Proveedor A | Proveedor B | Proveedor C | Ganador | Ahorro vs 2° |
|-----|-----------|-----------|-----------|---------|------------|
| Acero HR c14 (20 láminas) | $8.500.000 | $8.200.000 ✓ | $9.100.000 | Prov B | $300.000 |
| Tornillos 1/2" (500 piezas) | $125.000 ✓ | $140.000 | $135.000 | Prov A | $15.000 |
| ... | ... | ... | ... | ... | ... |
| **TOTAL** | **$XXX** | **$XXX ✓** | **$XXX** | **Prov B** | **$XXX** |

**Sección 2: Análisis de Términos**

| Aspecto | Proveedor A | Proveedor B | Proveedor C | Nota |
|--------|-----------|-----------|-----------|------|
| Plazo entrega | 5 días | 2 días ✓ | 4 días | Prov B más rápido |
| Vigencia cotización | 15 días | 30 días ✓ | 7 días | Prov B más flexible |
| Plazo pago | 30 días | 15 neto | 30 días | Prov B exige pago rápido |
| Preferencia Galco | Preferido ✓ | Normal | Preferido ✓ | Competencia cerrada |

**Sección 3: Alertas y Recomendaciones**

- ✓ Precio de Proveedor A está en rango histórico
- ⚠ Precio de Proveedor C 12% ARRIBA de histórico — revisar especificación
- ✓ Proveedor B tiene mejor plazo pero exige pago más rápido
- ⚠ Lote de tornillos en Proveedor C — revisar si es realmente grado 5 certificado

**Sección 4: Recomendación Final**

```
RECOMENDACIÓN:
==============

Por precio: Proveedor B (ahorro total: $XXX vs promedio)
Por plazo: Proveedor B (2 días, crítico para viernes)
Por relación: Proveedor B + Proveedor A para EPP

ESTRATEGIA SUGERIDA:
- Orden principal: Proveedor B (acero, tornillería, soldadura)
- Orden secundaria: Proveedor A (EPP — es preferido Galco)
- Orden especial: Proveedor C solo si Prov B no tiene stock

Ahorro total estimado: $XXX (vs cotizar con un solo proveedor)
```

---

## STEP 9: Mostrar Resultado en Chat

Muestra ANTES de guardar:

1. **Tabla comparativa de precios**
2. **Análisis de términos comerciales**
3. **Alertas detectadas**
4. **Recomendación clara** — quién comprar y por qué

Pregunta: *"¿Ves bien el análisis? ¿Quieres que profundice en algo?"*

---

## STEP 10: Guardar Outputs

Una vez aprobado:

1. **Matriz Excel/CSV:** `comparativa-cotizaciones-[FECHA].csv`
2. **Análisis detallado:** `recomendacion-compra-[FECHA].md` con gráfico de ahorro

---

## Reglas Críticas

- NO inventar datos — si falta información en una cotización, avisar al usuario
- Los precios deben estar en la **MISMA moneda** (COP o USD, pero no mezclar)
- Si hay descuentos por volumen, incluir en la línea
- Plazo URGENTE (viernes) = proveedor rápido puede valer un 5-10% más de precio
- Proveedores preferidos (AcerosCOL, Ferretería Gómez, Seguridad Plus) reciben +1 punto en scoring
- **Especificaciones deben coincidir:** No comparar "grado 5" con "grado 8.8" — son diferentes
- Si hay duda sobre equivalencia de especificaciones, marcar como "NO COMPARABLE"

---

## Ejemplos de Triggers

- "Comparame estas tres cotizaciones de acero"
- "¿Cuál proveedor me da mejor precio para los tornillos?"
- "Evalúa estas ofertas y dame recomendación"
- "Recibí presupuestos de AcerosCOL, MetalCenter y Dipsa — analiza"

---

## Flujo Típico

```
Usuario trae 3 cotizaciones (PDF)
         ↓
Extraer datos de cada una
         ↓
Normalizar descripciones
         ↓
Cruzar contra precios históricos
         ↓
Evaluar plazo + términos
         ↓
Generar matriz + alertas
         ↓
Mostrar en chat
         ↓
Usuario aprueba/ajusta
         ↓
Guardar archivos
```

---

## Output Típico (Ejemplo)

```
MATRIZ COMPARATIVA — Proyecto Torres del Parque

Ítem                           | AcerosCOL | MetalCenter | Dipsa   | Ganador   | Ahorro
-------------------------------|-----------|------------|---------|-----------|--------
Lámina acero HR c14 (20)       | $8.5M     | $8.2M ✓    | $9.1M   | MetalCenter | $300K
Perfil IPN 120 (15m)           | $2.1M ✓   | $2.5M      | $2.3M   | AcerosCOL | $200K
Ángulo L 50x50x5 (50m)         | $1.8M ✓   | $2.0M      | $1.9M   | AcerosCOL | $100K
Tubería 2"x2"x3mm (8)          | $800K ✓   | $950K      | $920K   | AcerosCOL | $120K
---                            | ---       | ---        | ---     | ---       | ---
TOTAL ACERO                    | $13.2M ✓  | $13.65M    | $14.2M  | AcerosCOL | $1.0M

ANÁLISIS:
- AcerosCOL gana en 3 de 4 ítems — mejor opción
- MetalCenter más barato EN UN ÍTEM pero plazo 4 días vs 3 de AcerosCOL
- Dipsa: precios altos (8-12% arriba de histórico) — revisar especificaciones

RECOMENDACIÓN:
Comprar TODO con AcerosCOL (proveedor preferido, mejor precio, entrega 3 días).
Ahorro total: $1.0M respecto a MetalCenter, $2.0M respecto a Dipsa.
```
