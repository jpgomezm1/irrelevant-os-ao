# Ejemplo de Requerimiento de Compra — Demo

Requerimiento ficticio de compra como si fuera un correo real de Andrés García, Jefe de Producción.

---

**De:** andres.garcia@galcoing.com.co
**Para:** jorge.compras@galcoing.com.co
**Asunto:** Requerimiento urgente — Proyecto edificio Torres del Parque
**Fecha:** 24/03/2025, 09:15 AM

---

## Cuerpo del Correo

Hola Jorge,

Esperamos encuentres bien. Para el proyecto de fabricación de la estructura metálica del edificio **Torres del Parque** necesitamos urgentemente los siguientes materiales. La obra comienza el viernes (28/03), así que el plazo es bastante ajustado.

### Acero y Laminados

- **20 láminas de acero HR calibre 14** (medida estándar 1.22 x 2.44 metros)
- **15 metros de perfil IPN 120** para columnas
- **50 metros de ángulo L 50x50x5** para arriostramiento
- **8 tubos de estructural 2" x 2" x 3mm** de 6 metros cada uno

### Tornillería

- **500 tornillos hexagonales de 1/2" x 2 pulgadas grado 5** con sus tuercas y arandelas
- **200 pernos estructurales de 3/4" x 4"** grado 5 (para uniones críticas)

### Soldadura y Accesorios

- **50 kg de varilla de soldadura 6013 de 1/8"** (que es lo que usa el Maestro Javier)
- **2 carretes de alambre ER70S-6 ø0.045"** (2kg cada uno, para MIG)
- **1 botella de oxígeno industrial** (para oxicorte de perfiles)
- **1 botella de argón industrial** (para soldadura TIG en puntos de precisión)

### Herramientas y Accesorios

- **10 discos de corte 7" x 1/8"** (van a usar bastante con el oxicorte)
- **5 discos de desbaste 9" x 1/4"** (para pulir soldaduras)
- **1 piedra de esmeril 6" x 1"** (repuesto para pulidora)

### Equipo de Protección (EPP)

- **10 pares de guantes de carnaza** (para la cuadrilla)
- **5 cascos de seguridad amarillos** (renovación)
- **5 caretas para soldar automáticas** (algunas están viejas)
- **2 protectores auditivos** (para soldadura)
- **5 botas de seguridad punta acero** talla 42-43

### Químicos y Pintura

- **1 galón de anticorrosivo rojo óxido** (para proteger el acero antes de montaje)
- **1 galón de desengrante industrial** (para limpiar las piezas de acero)

### Observaciones Importantes

- **URGENTE:** Plazo máximo viernes 28/03 a las 5 PM. Si no llega antes, nos paraliza la obra.
- El cliente es muy exigente con calidad — preferimos Acero de AcerosCOL que conocemos bien.
- Los tornillos deben ser grado 5 certificado (revisar que la caja diga ISO 8.8 o superior).
- La soldadura 6013 es porque el Maestro Javier así lo especifica — no podemos cambiar.
- Para discos de corte, buscar el mejor precio — usamos bastante de esos.
- EPP: preferimos Seguridad Plus, nos conocen y tienen rápido.

---

## Resumen Cantidad

| Tipo | Cantidad |
|------|----------|
| **Acero** | 20 láminas + 15m perfil + 50m ángulo + 8 tubos |
| **Tornillería** | 500 tornillos + 200 pernos |
| **Soldadura** | 50 kg varillas + 2 carretes alambre + 2 botellas gas |
| **Herramientas** | 10 discos corte + 5 discos desbaste + 1 piedra |
| **EPP** | 10 pares guantes + 5 cascos + 5 caretas + 2 protectores + 5 botas |
| **Químicos** | 1 galón anticorrosivo + 1 galón desengrante |

---

## Instrucciones para el Skill

Si recibe este requerimiento como ejemplo, el skill debe:

1. **Parsear** cada ítem e identificar cantidad, unidad, urgencia
2. **Clasificar** por tipo de insumo (Acero, Tornillería, Soldadura, Herramientas, EPP, Químicos)
3. **Buscar códigos SIGO** para cada uno
4. **Sugerir proveedores:**
   - Acero → AcerosCOL (preferido)
   - Tornillería → Ferretería Industrial Gómez (rápido, local)
   - Soldadura → Soldaduras Integradas
   - Herramientas → Herramientas Profesionales HDZ
   - EPP → Seguridad Plus
   - Químicos → Químicos Industriales Atlántico
5. **Generar tabla** en formato de registro de Jorge
6. **Generar correos** por grupo de proveedor

---

## Output Esperado

### Tabla de Registro

| Fecha | Área Solicitante | Descripción Ítem | Cantidad | Unidad | Tipo Insumo | Proveedor Sugerido | Código SIGO | Urgencia | Estado | Observaciones |
|-------|---|---|---|---|---|---|---|---|---|---|
| 24/03/2025 | Producción | Lámina acero HR calibre 14 (1.22x2.44) | 20 | Láminas | Acero | AcerosCOL | 4501.01.03 | URGENTE | Pendiente cotización | Proyecto Torres del Parque. Plazo max viernes 28/03 5PM. Excelente calidad requerida |
| 24/03/2025 | Producción | Perfil IPN 120 | 15 | Metros | Acero | AcerosCOL | 4503.01.02 | URGENTE | Pendiente cotización | Para columnas. Alt: MetalCenter |
| 24/03/2025 | Producción | Ángulo L 50x50x5 | 50 | Metros | Acero | AcerosCOL | 4504.01.02 | URGENTE | Pendiente cotización | Para arriostramiento |
| 24/03/2025 | Producción | Tubería estructural 2" x 2" x 3mm (6m) | 8 | Tubos | Acero | MetalCenter | 4502.01.03 | URGENTE | Pendiente cotización | Alt: AcerosCOL |
| 24/03/2025 | Producción | Tornillo hexagonal acero 1/2" x 2" grado 5 con tuerca | 500 | Piezas | Tornillería | Ferretería Industrial Gómez | 4601.01.04 | URGENTE | Pendiente cotización | Certificación ISO 8.8 obligatoria. Stock local |
| 24/03/2025 | Producción | Perno estructural 3/4" x 4" grado 5 | 200 | Piezas | Tornillería | Tornillos y Tuercas Medellín | 4604.01.01 | URGENTE | Pendiente cotización | Uniones críticas. Grado 5 certificado |
| 24/03/2025 | Producción | Varilla soldadura 6013 de 1/8" | 50 | Kg | Soldadura | Soldaduras Integradas | 4701.01.01 | URGENTE | Pendiente cotización | Especificación Maestro Javier. No cambiar |
| 24/03/2025 | Producción | Alambre ER70S-6 ø0.045" (carrete 2kg) | 2 | Carretes | Soldadura | Soldaduras Integradas | 4702.01.02 | URGENTE | Pendiente cotización | Para MIG. Puntos de precisión |
| 24/03/2025 | Producción | Gas oxígeno industrial | 1 | Botella | Soldadura | Gases Industriales Colombianos | 4703.01.01 | URGENTE | Pendiente cotización | Para oxicorte perfiles. Stock local |
| 24/03/2025 | Producción | Gas argón industrial | 1 | Botella | Soldadura | Gases Industriales Colombianos | 4703.01.02 | URGENTE | Pendiente cotización | Para TIG. Stock local |
| 24/03/2025 | Producción | Disco de corte 7" x 1/8" | 10 | Piezas | Herramientas | Herramientas Profesionales HDZ | 4801.01.01 | URGENTE | Pendiente cotización | Uso intensivo. Mejor precio |
| 24/03/2025 | Producción | Disco desbaste 9" x 1/4" | 5 | Piezas | Herramientas | Herramientas Profesionales HDZ | 4801.02.02 | URGENTE | Pendiente cotización | Pulido de soldaduras |
| 24/03/2025 | Producción | Piedra de esmeril 6" x 1" | 1 | Unidad | Herramientas | Distribuidora de Abrasivos Cauca | 4802.01.02 | Media | Pendiente cotización | Repuesto pulidora |
| 24/03/2025 | Producción | Guante de carnaza | 10 | Pares | EPP | Seguridad Plus | 5001.01.01 | URGENTE | Pendiente cotización | Para cuadrilla. Stock local |
| 24/03/2025 | Producción | Casco de seguridad amarillo | 5 | Unidades | EPP | Seguridad Plus | 5002.01.02 | URGENTE | Pendiente cotización | Renovación. Normativa ARL |
| 24/03/2025 | Producción | Careta para soldar automática | 5 | Unidades | EPP | Seguridad Plus | 5004.01.01 | URGENTE | Pendiente cotización | Algunas viejas, requieren reemplazo |
| 24/03/2025 | Producción | Protector auditivo | 2 | Pares | EPP | Protección Total | 5005.01.01 | Media | Pendiente cotización | Para soldadura |
| 24/03/2025 | Producción | Bota de seguridad punta acero 42-43 | 5 | Pares | EPP | Seguridad Plus | 5007.01.01 | URGENTE | Pendiente cotización | Talla 42-43. Stock |
| 24/03/2025 | Producción | Anticorrosivo rojo óxido | 1 | Galón | Químicos | Químicos Industriales Atlántico | 5101.01.01 | Media | Pendiente cotización | Protección antes de montaje |
| 24/03/2025 | Producción | Desengrante industrial | 1 | Galón | Químicos | Químicos Industriales Atlántico | 5102.01.01 | Media | Pendiente cotización | Limpieza acero |

### Correos Borrador

**CORREO 1: PARA ACEROSCOL (Acero)**

```
Para: juan@aceroscol.com.co
Asunto: Solicitud Cotización Urgente — Proyecto Torres del Parque (Galco)

Cordial saludo Juan,

Esperamos encuentres bien. Para un proyecto estructural que inicia el viernes 28/03 necesitamos
una cotización URGENTE de los siguientes materiales de acero:

1. Lámina acero HR calibre 14 (dimensión 1.22 x 2.44 m) — 20 láminas — Precio: ___
2. Perfil IPN 120 — 15 metros — Precio: ___
3. Ángulo L 50x50x5 — 50 metros — Precio: ___

Datos para la cotización:
- Plazo de entrega: ASAP (máximo viernes 28/03 5 PM)
- Condiciones de pago: Estándar 30 días
- Dirección de entrega: Galco Ingeniería, Cra 50 #30-15 Bodega 4, Itagüí, Antioquia

Es un cliente exigente con calidad — valoramos tu habitual excelencia en estos materiales.

Quedo atento a tu cotización.

Gracias,
Jorge
Compras — Galco
Tel: +57 3101234567
```

**CORREO 2: PARA FERRETERÍA INDUSTRIAL GÓMEZ (Tornillería)**

```
Para: andres@ferreindgomez.com.co
Asunto: Urgente — Tornillos y Pernos Grado 5 (Galco)

Cordial saludo Andrés,

Necesitamos URGENTE para obra que inicia viernes:

1. Tornillos hexagonales acero 1/2" x 2" grado 5 CON TUERCA — 500 piezas — Precio: ___
2. Pernos estructurales 3/4" x 4" grado 5 — 200 piezas — Precio: ___

IMPORTANTE: Los tornillos DEBEN ser grado 5 certificado (ISO 8.8 o superior).

Plazo: Máximo viernes 28/03
Entrega: Galco, Itagüí

¿Los tienes en stock?

Gracias,
Jorge
```

**CORREO 3: PARA SOLDADURAS INTEGRADAS (Soldadura)**

```
Para: m.lopez@soldintegrada.com.co
Asunto: Cotización Soldadura — Proyecto Torres del Parque

Cordial saludo Miguel,

Solicito cotización URGENTE (plazo viernes 28/03):

1. Varilla soldadura 6013 de 1/8" — 50 kg — Precio: ___
2. Alambre ER70S-6 ø0.045" (carrete 2kg) — 2 carretes — Precio: ___

El Maestro Javier especifica esta soldadura — no podemos cambiar.

Agradezco tu atención.

Jorge
```

**CORREO 4: PARA HERRAMIENTAS PROFESIONALES HDZ (Herramientas)**

```
Para: c.ruiz@hdztool.com.co
Asunto: Discos de Corte y Desbaste — Cotización

Catalina,

¿Cuál es el mejor precio que me das por:

1. Disco de corte 7" x 1/8" — 10 piezas
2. Disco desbaste 9" x 1/4" — 5 piezas

Necesito para el viernes. Usaremos bastante de estos.

Jorge
Compras Galco
```

**CORREO 5: PARA SEGURIDAD PLUS (EPP)**

```
Para: e.martinez@seguridadplus.com.co
Asunto: EPP Urgente — Proyecto Torres del Parque

Cordial saludo Erika,

Necesitamos URGENTE (viernes 28/03):

1. Guante de carnaza — 10 pares
2. Casco de seguridad amarillo — 5 unidades
3. Careta para soldar automática — 5 unidades
4. Bota de seguridad punta acero talla 42-43 — 5 pares

¿Lo tienes en stock para entrega mañana o viernes?

Gracias,
Jorge
```

**CORREO 6: PARA QUÍMICOS INDUSTRIALES ATLÁNTICO (Químicos)**

```
Para: j.reyes@quimindatl.com.co
Asunto: Anticorrosivo + Desengrante (Galco)

Cordial saludo Joaquín,

Necesito cotizar:

1. Anticorrosivo rojo óxido — 1 galón
2. Desengrante industrial — 1 galón

Plazo: Esta semana. Proyecto metalmecánico.

Gracias,
Jorge
```

---

## Notas Finales

- El requerimiento es **URGENTE** (plazo viernes)
- La mayoría de ítems son de **Producción** (estructura metálica)
- Hay múltiples proveedores involucrados → necesita 6 correos diferentes
- El skill debe preservar la **especificidad técnica** (grado 5, 6013, diámetros exactos)
- Las **Observaciones** son críticas (ISO 8.8 obligatorio, Maestro Javier específico, etc.)
