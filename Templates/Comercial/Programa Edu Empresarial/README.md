# Template · Programa Edu Empresarial (Soteco-style)

**Capa económica**: 1a · Edu Empresarial
**Reemplaza**: `Cotizacion Edu Layer` (antiguo workshop Think AI 3 horas)
**Referencia viva**: propuesta Soteco en `Clientes/soteco/comercial/cotizacion/index.html`
**Documento de producto**: `../../../Chief Learning Officer/PRODUCTOS/B2B_CAPACITACIONES/README.md`

---

## Qué es este template

Template de cotización para **Programa de Formación Empresarial** — 4 sesiones × 3 horas (modalidad mensual) o 3 sesiones × 3 horas (intensiva 1 semana).

Sustituye al antiguo "Workshop Think AI" que era solo 3 horas · ahora es un **programa completo** con Discovery, Form a participantes, casos reales del cliente, y plan 30 días post.

---

## Estructura estándar del programa

### Antes del programa
- **Discovery con gerencia** (45-60 min) — ver `../../../Chief Learning Officer/PRODUCTOS/B2B_CAPACITACIONES/PROTOCOLO_DISCOVERY.md`
- **Form a participantes** (5-7 días antes) — ver `../../../Chief Learning Officer/PRODUCTOS/B2B_CAPACITACIONES/FORM_EQUIPO.md`
- **Sello pedagógico del papá de JP** antes de arrancar

### Durante el programa (4 sesiones · modalidad mensual)
- **Sesión 1**: Fundamentos + Primer artefacto (cada persona sale con proceso funcionando)
- **Sesión 2**: Skills compartidos + Datos sensibles
- **Sesión 3**: Integraciones + Flujos end-to-end
- **Sesión 4**: Consolidación + Plan 30 días post-programa

Ver template completo en `../../../Chief Learning Officer/PRODUCTOS/B2B_CAPACITACIONES/TEMPLATE_PROGRAMA.md`.

### Después del programa
- Biblioteca de prompts + skills base entregada
- Plan 30 días post-programa
- Account Lead (Head of Accounts) sigue check-ins a 7, 15, 30 días
- Head of Accounts + CLO procesa transcripts para mejorar template

---

## Pricing

| Modalidad | Precio sin IVA | USD equivalente |
|---|---|---|
| **Mensual** (4 sesiones × 3h en 4 semanas) | ~$10.000.000 COP | ~$2.400 |
| **Intensiva** (3 sesiones × 3h en 1 semana) | ~$8.000.000 COP | ~$1.900 |

**Ajustes posibles**:
- +20% si equipo >10 personas (caso especial, negociar scope o múltiples grupos)
- +15% si requiere producción de material gráfico específico del cliente

**Anticipo**: 50% para agendar · 50% al finalizar.

---

## Qué incluye / qué NO incluye

### ✅ Incluye
- Sesión previa de Discovery con liderazgo (45-60 min)
- Form a participantes con procesamiento custom del CLO
- Todas las sesiones del programa según modalidad
- Biblioteca de prompts + skills base específica del sector
- Plan 30 días post-programa (solo mensual)
- Recursos post-programa (biblioteca evergreen acceso 12 meses)
- Grabación de sesiones (si el cliente lo solicita · entregamos archivos)
- Documentación completa

### ❌ NO incluye
- **Suscripciones a Claude Pro Max** (~$200 USD/mes por cuenta) · responsabilidad del cliente · mínimo 1 cuenta activa antes del programa
- Cualquier otra herramienta (transcripción, automatización, conectores) que se incorpore al stack
- Delivery post-programa de funciones específicas (eso sería Ops Layer · cotización separada)
- Soporte técnico continuo post-30 días (eso es Core Layer)

---

## Requisitos del cliente (pre-programa)

1. **Mínimo 1 cuenta Claude Pro Max** activa antes de iniciar. Sin esta cuenta no se pueden ejecutar los ejercicios de Claude Code ni construir los procesos automatizados del entregable.
2. **Disponibilidad del liderazgo** para sesión de Discovery (45-60 min).
3. **Compromiso del equipo** para completar Form + asistir a todas las sesiones.
4. **Espacio apropiado** para sesiones (presencial o plataforma de video estable).

---

## Generación de cotización

Para generar cotización para un cliente específico, usar skill:

```
/cotizacion [empresa] edu-empresarial
```

(Nota: el skill `/cotizacion` debe actualizarse para aceptar el nuevo argumento `edu-empresarial` — ver sección de skills a actualizar.)

La cotización se genera como HTML interactivo (estilo Soteco) con:
- Página 1: contexto + objetivos del programa
- Página 2: contenido detallado (4 sesiones)
- Página 3: dos modalidades (mensual e intensiva)
- Página 4: inclusiones/exclusiones
- Página 5: términos comerciales + anticipo
- Página 6: agenda y fechas (a coordinar post-anticipo)

---

## Diferenciadores vs. workshops genéricos

Cuando el cliente pregunta "¿en qué son distintos a otros workshops de AI?":

1. **Personalización via Discovery + Form** — no hay dos programas iguales
2. **Casos reales del cliente** — ejercicios construidos sobre operación real, no genéricos
3. **Metodología pedagógica firmada** — sello del papá (profesor de carrera) + método `stayirrelevant.com/metodo`
4. **Plan 30 días post-programa** — instala el hábito, no solo entrega conocimiento
5. **Grupos pequeños** (máximo 10 personas · deliberado) — garantiza atención individual
6. **Biblioteca evergreen** — acceso 12 meses a recursos post-programa

---

## Cancelaciones

- **>48 horas de anticipación**: reembolsable descontando 20% por gestiones administrativas
- **≤48 horas**: no reembolsable · se puede reprogramar dentro de los 30 días siguientes
- **Cancelación completa del programa** después de iniciado: no reembolsable

---

## Handoff a CLO

Una vez cerrado el deal:

1. **CCO** completa `CCO/Clientes/[slug]/` con toda la info (discovery, cotización firmada, contexto especial)
2. **CCO notifica al CLO** vía espacio comercial del lunes (ritual del Board)
3. **CLO asume delivery**:
   - Agenda Discovery con gerencia (si no se hizo aún)
   - Activa proceso de Form a participantes
   - Coordina con papá para sello pedagógico
   - Ejecuta programa
4. **Head of Accounts** entra post-programa para seguimiento 30 días

Ver [`../../docs/HANDOFF_CLO.md`](../../docs/HANDOFF_CLO.md) para detalle completo.

---

## Archivos relacionados

- `../../Assets Fijos/PROP_VALUE_IRRELEVANT.md` — Sección 5 Capa 1a
- `../../docs/CASCADE_ALIGNMENT.md` — clasificación de Edu Empresarial
- `../../../Chief Learning Officer/PRODUCTOS/B2B_CAPACITACIONES/` — todo el protocolo detallado del producto
- `../../../Chief Learning Officer/PRODUCTOS/B2B_CAPACITACIONES/programas/soteco.md` — referencia viva

---

## Anti-patterns (qué NO hacer)

- ❌ Vender como "workshop de 3 horas" — el programa es 4 sesiones o 1 semana intensiva
- ❌ Aceptar grupos >10 personas sin negociar scope
- ❌ Saltarse el Discovery o el Form
- ❌ Usar casos genéricos en vez de los del cliente
- ❌ Ejecutar sin sello pedagógico del papá
- ❌ Incluir cuentas Claude Pro en la cotización (es responsabilidad del cliente)
- ❌ Prometer delivery post-programa que no está en el scope (eso es upsell a Ops o Core)
