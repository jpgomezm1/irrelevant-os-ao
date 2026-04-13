# Discovery Notes — Bless Handmade

**Fecha:** 2026-04-10
**Consultor:** Agustin Hoyos
**Asistentes:** Gio (comercial/mercadeo), Juliana (programacion produccion)

---

## 1. Datos Basicos

| Campo | Valor |
|-------|-------|
| **Empresa** | Bless Handmade |
| **Industria** | Moda / Confeccion femenina |
| **Tamaño** | ~3 comerciales + equipo de produccion + 4 talleres terceros |
| **Contacto principal** | Gio (Grant Gio) — parte comercial y mercadeo |
| **Otro contacto clave** | Juliana — programacion de produccion, insumos y coordinacion con terceros |
| **Volumen mensual** | ~350 prendas/mes |
| **Referencias activas** | ~200 acumuladas, ~10-15 nuevas por coleccion |

---

## 2. Dolores Identificados

### Dolor 1: Coordinacion manual con talleres terceros sin trazabilidad

Juliana coordina por WhatsApp con 4 talleres terceros (crochet, recamado, teñido, pedreria). Cada prenda puede pasar por multiples terceros en secuencia (ej: crochet → pedreria). Lleva el control en hojas de Google Sheets manuales donde anota fecha de envio y fecha de recepcion.

> *"Yo tengo unas sheets, unas carpetas donde yo tengo como lo que entra y lo que sale de esos pedidos... por ejemplo una hojita con el nombre del taller tercero, por ejemplo Adriana Pedrería, le mandé un top alta en esta fecha, listo se lo mandé y cuando me llegue le pongo la fecha cuando llegó"*

**Impacto:** Sin trazabilidad real. Si se le olvida un envio, se atrasa toda la cadena.

### Dolor 2: Falta de sistema de alertas y seguimiento

Juliana programa en las mañanas (~1 hora), pero durante el dia no tiene forma de recibir alertas sobre pedidos pendientes o atrasos. Se entera cuando el comercial le reclama.

> *"Yo sí puedo hacerlo diario en las mañanas, pero necesito un sistema que me alarme."*

> Gio: *"Cuando ya el asesor le llama a Juliana, 'ya falta mucho la prenda de Agustín' y dice 'ay verdad, espérate, llamo a doña Claudia'... no puede estar mirando a toda hora el sistema porque está haciendo otras funciones."*

**Impacto:** Retrasos en entregas, clientes molestos, devoluciones.

### Dolor 3: Errores "pequeños" con impacto grande en satisfaccion del cliente

Detalles que parecen menores (una tira, un fleco) se olvidan y generan atrasos que terminan en reclamos y devoluciones.

> Gio: *"Por esa tira se atrasó, el cliente llamó, no estaba esa tira para ese todo, se enojó y 'devuélvame la plata'. Así de sencillo. Entonces uno dice '¿y Juli qué te pasó?' 'Ay, se me olvidó, imagínense.' Son cosas sencillas pero mira el impacto que tiene."*

**Impacto:** Perdida directa de ventas y reputacion.

### Dolor 4: Proceso de pedidos al por mayor completamente analogo

Los pedidos mayoristas (tiendas B2B) se manejan "a la antigua" — ordenes en papel, mismo proceso manual pero sin ningun soporte digital.

> *"Al por mayor sí es más análogo... me entregan la orden y yo ya empiezo a recibir y ya empiezo a hacer lo mismo, mirar qué prendas tienen teñido, qué prendas tienen crochet."*

**Impacto:** Doble trabajo, cero visibilidad sobre pedidos mayoristas.

---

## 3. Oportunidad Principal

Bless Handmade tiene un cuello de botella critico en una sola persona (Juliana) que coordina toda la cadena de produccion con herramientas manuales (Sheets + WhatsApp). El volumen (350 prendas/mes, 4 terceros, multiples procesos secuenciales) ya supera lo que se puede gestionar de cabeza. Cada olvido = cliente perdido.

La oportunidad es construir un sistema de trazabilidad y alertas que funcione como asistente de produccion para Juliana.

---

## 4. Servicio Recomendado

**AI Ops Layer**

El dolor es operativo y concreto — coordinacion, seguimiento, alertas. No necesitan transformacion de modelo de negocio (Core Layer) ni capacitacion (Edu Layer). Necesitan que sus procesos actuales dejen de depender de la memoria de una persona.

---

## 5. Metricas de Impacto Potencial

| Metrica | Estimado |
|---------|----------|
| Horas semanales en coordinacion manual | ~5-7h (1h diaria programacion + seguimientos dispersos) |
| Prendas con riesgo de atraso por falta de seguimiento | Cada error = venta perdida (~$50-150K COP por prenda) |
| Procesos automatizables | Extraccion de ordenes → asignacion a terceros, seguimiento de entregas, alertas de atrasos, control de insumos/telas |

---

## 6. Proximos Pasos Acordados

| Accion | Responsable | Fecha |
|--------|-------------|-------|
| Construir propuesta con skills concretas | Agustin / Irrelevant | Semana actual |
| Agendar presentacion de propuesta | Sara | Semana de Pascua (~20 abril 2026) |
| Presentacion de 20-30 min mostrando solucion | Irrelevant | Por agendar |

---

## 7. Señales

**Señales de compra:**
- Gio ya venia investigando sobre automatizacion (llego proactivo por grupo de WhatsApp)
- El dolor es tangible y reconocido por ambos
- Aceptaron agendar siguiente reunion sin resistencia
- Agustin ya les habia mandado un "mapa" previo que genera expectativa

**Red flags:**
- No se menciono presupuesto
- Juliana es operativa, no decisora — validar quien decide
- Empresa pequeña (~350 prendas/mes) — validar capacidad de inversion

---

## Contexto Operativo (para diseño de skills)

- **Sistema propio:** Programa in-house conectado a Google Drive donde comerciales montan ventas
- **Exportacion:** Del sistema → Google Sheets con: fecha compra, ID venta, canal, referencia, color
- **Programacion:** Juliana revisa L-M-V las exportaciones, imprime lista, revisa prenda por prenda
- **Talleres terceros (4):** Marta (crochet), Adri (recamado), Ferney (teñido), Claudia (pedreria/manualidad)
- **Comunicacion:** 100% WhatsApp con terceros y proveedores
- **Seguimiento:** Sheets manuales por taller (fecha envio / fecha recepcion)
- **Flujo secuencial:** Algunas prendas pasan por 2+ terceros en orden (crochet → pedreria)
- **B2B:** Pedidos mayoristas en papel, proceso completamente analogo
- **Insumos:** Juliana tambien coordina telas y flecos con proveedores
- **Comerciales (3):** Preguntan estado de pedidos por WhatsApp interno
