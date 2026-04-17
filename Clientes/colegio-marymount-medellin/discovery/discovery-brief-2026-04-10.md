# Discovery Brief — Colegio Marymount Medellín

**Fecha:** 2026-04-10
**Duración:** ~45 min
**Participantes:** María Luisa Muñoz (Gerente Administrativa, Marymount) · Sara Garcés (Irrelevant)
**Tipo:** Discovery Call
**Presencia adicional:** Dorita (Contadora, ~30 años en el colegio, se pensiona el próximo año) — brevemente

---

## Contexto del Cliente

- **Industria:** Educación (colegio privado femenino, Medellín)
- **Madurez IA:** Muy baja. Han recibido capacitaciones generales para profesores. María Luisa solo usa ChatGPT para redactar cositas. **Cero implementaciones previas.**
- **Sistemas actuales:** Logro (sistema contable nuevo, migración reciente), Fidias (facturación y cartera), Excel para presupuesto y controles paralelos, Adobe Acrobat para firmas de facturas
- **Calendario:** Año académico junio–mayo vs. año fiscal enero–diciembre → desajuste permanente
- **Estructura:** Sara (rol con firma sobre facturas) + María Luisa + contadores (Alexander, Dorita)

---

## Dolores Identificados (ordenados por peso en la call)

### 1. Aprobación de facturas — DOLOR ALTO
> *"Yo tengo que aprobar muchas de las facturas del colegio... me quita mucho tiempo, he puesto montos más altos... pero aún así..."*

- Todas las facturas llegan por correo
- Flujo: Correo → Adobe → firma Sara → firma María Luisa → contabilidad causa en Logro
- Control manual en Excel de presupuesto vs. ejecución
- **Insight clave:** Facturas recurrentes con **mismo valor** (ej. vigilancia) pasan por todo el flujo igual. Quiere auto-aprobación + notificación solo si el valor cambia.

### 2. Conciliaciones bancarias / contables — DOLOR ALTO + URGENCIA
> *"Esta vez me demoré más de un día cuadrando la información porque no sale con títulos..."*

- **6 cuentas** principales con conciliación mensual (bancos, deudores, ingresos, retención en la fuente, etc.)
- Proceso: Descargar Excel de Logro + descargar Excel del banco → cruzar manualmente → identificar diferencias
- Incluye cruce **Fidias → Logro** (migración de ingresos)
- **Urgencia real:** Dorita se pensiona el próximo año. María Luisa quiere **dejarlo organizado antes** de que se vaya.

### 3. Cobro de cartera personalizado — DOLOR MEDIO-ALTO
> *"Me dijeron en el comité financiero, ponga un agente que le haga eso, que vaya se fija y el nombre de Olguita..."*

- Fidias manda recordatorios automáticos los 15 y 30 → **no tienen impacto** en padres
- Cuando Olguita (tesorería) escribe personalmente → funciona
- Volumen: ~30+ correos personalizados al mes, con nombre del padre/madre y monto específico
- **Pedido explícito del comité financiero:** agente que envíe desde el dominio de Olguita con su tono

### 4. Presupuesto vs. ejecución — DOLOR MEDIO
- Presupuesto se construye en Excel por área, proyecto, mes
- Quiere subirlo a Logro para seguimiento
- Necesita comparativo **año académico vs. año fiscal** (hoy manual)
- Quiere visualización (pie charts, tablas) por centro de costos y variaciones

### 5. Centralización documental — DOLOR MEDIO (mencionado como potencial)
- Cada área maneja documentos independientes
- Interés en algo tipo Conaltura (agente que consulta base de datos centralizada)

### 6. Asistencia de estudiantes — DOLOR BAJO (mencionado al cierre)
- Una persona llamando a niñas que no asistieron
- Potencial: agente que mande WhatsApp y guarde respuestas

### Menciones menores
- Compras / comparativo de proveedores (ella lo maneja, no es prioridad)
- Libros contables físicos (por norma legal, difícil automatizar)

---

## Oportunidad Principal

**Entry point sugerido: Automatización contable** (facturas + conciliaciones + cartera).

Son los procesos donde:
- Hay **mayor volumen repetitivo**
- Hay **urgencia real** (pensión de Dorita)
- El **comité financiero ya está pidiendo** una solución (cartera)
- La integración es **viable vía API** (Logro y Fidias tienen API con alta probabilidad)

Expansión natural: presupuesto visual → asistencia estudiantes → gestión documental.

---

## Bloqueadores / Cosas a Validar

- **Autorización para conectar a sistemas** (Logro, Fidias) — validar con TI/contabilidad del colegio
- **API Key de Logro** — confirmar disponibilidad
- **API Key de Fidias** — confirmar disponibilidad
- **Presupuesto de María Luisa:** No tiene línea en presupuesto. Dependiendo del monto puede necesitar autorización a nivel superior. **Riesgo de deal:** que tenga que escalar y se demore
- **Seguridad/datos:** Mencionó confidencialidad. Sara ya explicó las 5 capas + NDA. Cubierto en la call.

---

## Servicio Recomendado

**AI Core Layer** — la conversación es claramente transformacional:
- Múltiples procesos interconectados (contabilidad + cartera + presupuesto)
- Integraciones a sistemas core (Logro, Fidias)
- Necesita acompañamiento continuo (Dorita se va, hay cambio de chip cultural)
- Requiere Fase 0 para mapear bien antes de construir

**No es Ops Layer** porque la complejidad de integración y el número de procesos supera el alcance de un setup.

---

## Próximos Pasos

1. **Jueves 2026-04-16, 2:00 PM** — Reunión de propuesta aterrizada (con Sara)
2. Sara revisa con ingeniero del equipo:
   - Viabilidad API Logro
   - Viabilidad API Fidias
   - Arquitectura de agentes por proceso
3. Presentar propuesta con: proceso identificado → agente que lo resuelve → paso a paso → metodología
4. María Luisa decidirá **por cuál(es) empezar** (mencionó "uno o dos para arrancar")

---

## Citas Textuales Clave

- *"Yo creo que medio estamos bien... Nada, consultas con ChatGPT para que me ayude a redactar cositas y ya, muy básico"* — nivel 0 de madurez
- *"Me dijeron en el comité financiero, ponga un agente que le haga eso"* — **señal de deal ready**, stakeholder adicional pidiendo solución
- *"Dorita... Ya lleva 30 años aquí en el colegio... se pensiona el otro año. Yo también quiero aprovechar, dejar eso súper organizado"* — **urgencia concreta con fecha**
- *"Yo no he visto nada, no he cotizado con nadie, la primera persona que viene"* — **Irrelevant es único en consideración, ventaja competitiva temporal**
- *"Dependiendo del monto y todo... si tengo que pedir autorizaciones más arriba"* — posible bloqueador de budget
