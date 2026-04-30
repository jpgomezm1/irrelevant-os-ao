# Discovery — Búho + Trim and Drinks

**Fecha de la call:** 2026-04-29 (miércoles)
**Modalidad:** Presencial (Oviedo)
**Tipo:** Discovery primer contacto
**Comercial:** Sara Garcés Tobón
**Prospecto:** Simón Palacio (hijo de los dueños — empuja transformación digital · papá tradicional como freno)

---

## Cliente · Negocios

### 1. The Owl Centro de Idiomas (El Búho) — *prioridad*

| Campo | Valor |
|---|---|
| Industria | Educación · idiomas |
| Nicho | Inglés para niños y jóvenes 4-17 años |
| Posicionamiento | Punto medio entre Berlitz (premium) y Comfandi (masivo) |
| Estratos objetivo | 3 y 4 |
| Volumen | ~800 estudiantes activos · ~1.200 cotizaciones/semestre |
| Equipo operativo | 3 personas dedicadas a cotizaciones + atención |
| Stack actual | Siigo (cotización + factura) · Excel (BD) · atención manual |

### 2. Trim and Drinks (barbería) — *secundario*

| Campo | Valor |
|---|---|
| Modelo | Barbería + venta de bebidas (alcohólicas y no alcohólicas) |
| Equipo | Barberos + Johana (front desk) |
| Comisión | 60/40 con barberos |
| Sistema de metas | Bonos por quincena (ej. $150k extra si vendes $500k) |
| Stack actual | Excel manual · intento previo en Cloud sin éxito |

---

## Pain Points

### Búho

1. **Cotización manual masiva** — 1.200 cotizaciones uno por uno cada semestre, 3 personas medio día completo
   > *"que yo no tenga que llegar … y tres personas más todo el HP día a estar control C control V cambiando porque son 2.000 cotizaciones"* — Simón

2. **Tarifas variables por fecha y perfil** — 3 momentos (anticipada/regular/extemporánea) × descuentos (hermanos 5% · colegios aliados · Corazonista Tarde 30%) = matriz compleja que cambia por fecha
   > *"el 11 de diciembre, pum, las cambió todas la IA"* — Simón (lo que quisiera)

3. **Facturación manual** — mismo proceso 1 a 1 en Siigo cada cierre de semestre

4. **Captura de leads manual** — Excel llenado a mano tras llamadas
   > *"todo eso es manual pues. No tenemos sí ya después llegamos y los pasamos para acá"* — Simón

5. **Atención de FAQs manual** — 3 personas responden todo

6. **Cero visibilidad de funnel** — no saben volumen de leads ni tasa de conversión
   > *"No, ni idea."* — Simón (sobre leads y conversión)

7. **Cercanía como valor de marca** — la solución no puede robotizar el tono
   > *"uno de nuestros valor es ser cercanos"* — Simón

### Trim and Drinks

8. **Contabilidad bebidas + servicios manual en Excel** — Johana anota a mano cada cobro
9. **Sin reservas digitales** — intento previo en Cloud falló
10. **Barberos no ven progreso vs metas** — Simón quiere algo visual (barrita / muñequito)
11. **Cumpleaños regalan corte pero no hay envío automático**

---

## Oportunidades · Servicios recomendados

### Búho

| Solución | Capa Irrelevant | Urgencia | Plazo |
|---|---|---|---|
| Automatización cotizaciones + facturación Siigo (input desde Excel → API Siigo → email cliente · cambia tarifas en fechas establecidas) | **Ops Layer** | ALTA · arranca temporada matrículas mayo | 15 días |
| Agente WhatsApp/web con tono cercano + dashboard funnel + nurturing leads fríos | **Core Layer** | MEDIA · para próxima temporada | Mín. 9 semanas |

### Trim and Drinks

| Solución | Capa Irrelevant | Plazo |
|---|---|---|
| Sistema de reservas (producto estándar Irrelevant) + módulo bebidas en mismo dashboard + dashboard visual de metas para barberos + chatbot WhatsApp que agende (no Instagram) + alertas cumpleaños | **Ops Layer con personalización** | Por definir — es agregado, no urgente |

---

## Compromisos asumidos por Sara para el viernes

1. **Propuesta Búho Ops** (cotización + facturación) con precio
2. **Propuesta Búho Core** (agente WhatsApp + dashboard leads) con precio
3. **Propuesta Trim and Drinks** (reservas + bebidas + dashboard metas + chatbot WhatsApp) con precio
4. Documento que Simón pueda revisar internamente después
5. Presentación con: cómo lo hacían antes / cómo lo haríamos ahora / proceso

---

## Próxima reunión

- **Cuándo:** Viernes 2026-05-01 · 10:30 AM (festivo — ambos OK)
- **Dónde:** Presencial · Oviedo
- **Qué entregamos:** Las 3 propuestas con precios

---

## Riesgos y banderas

### 🔴 Bloqueante
- **API de Siigo** — Sara afirmó *"lo hemos hecho antes"*. **Validar HOY** que la API permite crear cotizaciones + facturar a escala (1.200 docs por temporada · cambio masivo de tarifas en fechas establecidas). Si no, la propuesta Ops 15 días se cae.

### 🟠 Banderas comerciales
- **Inconsistencia de plazo del agente** — Sara dijo *"dos semanas"* y luego *"nueve semanas"*. En la propuesta unificar a **mínimo 9 semanas**.
- **Ventana ajustada** — Simón se va el 20 de mayo por 2 meses. Si firma esta semana, Ops Búho debe estar entregado y validado **antes** de esa fecha. Quedan ~3 semanas hábiles netas: anticipo a tiempo es crítico.
- **Papá tradicional** — argumentar la propuesta enfatizando que la IA preserva la cercanía. Caso Indemneasy como referencia (ya mencionado en la call por Sara).
- **Demo prometió personalización del sistema de reservas con bebidas** — confirmar con ingeniería viabilidad y horas extra de personalización.

### 🟡 Banderas amarillas
- **Sin métricas de funnel actuales** — activo para vender el agente (les damos visibilidad que no tienen), pero impide cuantificar ROI con datos del cliente. Usar benchmarks.
- **Dos negocios mezclados en la conversación** — viernes hay que decidir explícitamente: ¿2 alcances separados (2 contratos) o 1 paquete consolidado?

---

## Next Steps Internos

- [ ] **Validar API Siigo HOY** (bloqueante)
- [ ] Hablar con ingeniería sobre alcance real y horas extra:
  - Conector Excel → Siigo (cotización + facturación + cambio de tarifas en fechas)
  - Personalización del sistema de reservas con módulo de bebidas y dashboard metas
  - Agente WhatsApp con dashboard de funnel para Búho
- [ ] Cotizar las 3 propuestas
- [ ] Preparar presentación: antes / después / proceso
- [ ] Definir si va como 2 contratos separados o 1 paquete
- [ ] Estimar fecha real de entrega Ops Búho considerando salida 20 de mayo
