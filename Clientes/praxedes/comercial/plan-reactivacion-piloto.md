# Plan de Reactivación — Praxedes
**Fecha:** 2026-04-06
**Estado del deal:** Estancado hace ~3 semanas (último contacto 16 marzo)
**Estrategia:** Pivot a piloto acotado

---

## Diagnóstico

Deal atascado post-propuesta v2 ($73M total, F1 $30M). Señales de alarma:

1. Alcance creció de $22M → $73M sin cierre (posible sticker shock)
2. "Tenemos preguntas" pero nunca las mandaron (objeción no verbalizada)
3. Excusa de asamblea + "como quieras" = stall clásico
4. Lucas (contacto amigo) no es decision maker — **Juan Guillermo** (Director de Operaciones Praxedes, líder del proyecto) sí lo es
5. Proyecto enorme, ellos mismos dijeron que tenían miedo de reprocesos
6. En C3 pidieron piloto y no se incluyó en la propuesta final

**Diagnóstico real:** No es rechazo, es parálisis interna. Juan Guillermo no puede vender $30M a la junta sin evidencia concreta de que funciona sobre su data.

---

## Estrategia: Pivot a Piloto

### Qué es el piloto
Versión mini, acotada y corta del proyecto para probar el enfoque técnico (RAG, vectorización, semantic search) sobre data real de Praxedes, antes de comprometerse a la Fase 1 completa.

### Estructura sugerida

| Item | Detalle |
|---|---|
| **Duración** | 2-3 semanas |
| **Alcance** | 1 tipo de documento, 1 módulo de Midasoft, ~100-300 documentos |
| **Precio** | $10M COP (rango $8-12M) — **abonable 100% a F1 si continúan** |
| **Entregables** | Sistema funcional con RAG + interfaz de consulta + informe de precisión y recomendaciones |
| **Criterio de éxito** | Equipo de Praxedes puede hacer consultas reales con precisión >80% y fuentes citadas |
| **Siguiente paso** | Si funciona → arrancar F1 completa con ajustes del piloto |

### Qué INCLUYE el piloto
- Ingesta de documentos del módulo elegido
- Chunking + vectorización con embeddings
- Base de datos vectorial con RAG
- Interfaz web simple de consulta (no productizada)
- Informe de precisión + recomendaciones para escalar

### Qué NO incluye
- Las otras 3 fuentes (Geldes, webinars, conocimiento tácito)
- Taxonomía completa de 34 páginas
- RBAC (control de acceso por rol)
- Versionamiento / gobierno del conocimiento
- Integraciones (Zendesk, etc.)
- Interfaz bonita / productizada

### Por qué funciona

1. Baja la barrera de entrada: de $30M a ~$10M
2. Da evidencia real que Juan Guillermo puede mostrar internamente
3. Crea pie adentro — deal vuelve a estar "vivo"
4. Genera data real del corpus para ajustar F1 con precisión
5. Abonable a F1 → no sienten que "pagaron dos veces"
6. **Ellos mismos lo pidieron en C3** — respondemos a petición previa, no imponemos algo nuevo

---

## Plan de Acción

### Paso 1 — WhatsApp a Lucas (después de hablar con JP)
Reconectar cálido + plantar idea del piloto + pedir email de Juan Guillermo.

**Borrador:**
```
Lucas, qué más! Cómo va la asamblea?

Mira, he estado dándole vueltas al proyecto de ustedes y creo
que la propuesta que les mandé en febrero los puede estar
trabando más que ayudando. Es un proyecto gigante y entrar
con $30M de Fase 1 de una es mucho compromiso para algo
que todavía no han podido ver funcionando con su data real.

Quiero proponerte algo distinto: un piloto corto, acotado
a un solo tipo de documento (por ejemplo manuales funcionales
de un módulo), donde en 2-3 semanas les dejamos un prototipo
funcionando con SUS documentos para que ustedes mismos le
pregunten, vean la precisión y validen si el enfoque sirve
antes de comprometerse con la fase completa.

Así ustedes bajan el riesgo, nosotros bajamos nuestra
incertidumbre y si el piloto funciona, ya arrancamos la
Fase 1 con total confianza. Si no funciona, no perdieron $30M.

Te tinca? Si quieres te armo la propuesta del piloto esta
semana y la revisamos en 20 min con Juan Guillermo.
```

### Paso 2 — Email formal a Lucas + Juan Guillermo
Paralelo al WhatsApp, escalar a Juan Guillermo directamente para que no dependa de que Lucas reenvíe.

**Subject:** Propuesta de piloto acotado — Base de Conocimiento Praxedes

```
Juan Guillermo, Lucas,

Espero que estén bien. Tras nuestras conversaciones de
diciembre y febrero, y reflexionando sobre la escala del
proyecto de documentación que tienen entre manos, quiero
proponerles un ajuste de enfoque que creemos les va a
servir mejor.

La propuesta actual de Fase 1 ($30M) contempla construir
toda la fundación del activo de conocimiento de una vez.
Es el camino correcto técnicamente, pero entendemos que
comprometer esa inversión sin haber visto la tecnología
funcionando sobre su data real implica un nivel de riesgo
que probablemente los tiene reevaluando el ritmo.

Queremos proponerles un piloto de validación de 2-3 semanas,
con un alcance muy acotado:

• Un solo tipo de documento (proponemos manuales funcionales
  de un módulo que ustedes elijan — el de más dolor)
• Ingesta + vectorización + Semantic Search sobre ese corpus
• Interfaz básica de consulta para que el equipo de Praxedes
  pueda preguntarle en lenguaje natural
• Informe de precisión y recomendaciones para escalar

Objetivo: que ustedes mismos validen con sus propios ojos
que el enfoque técnico que planteamos (RAG + taxonomía +
vectorización) realmente responde con la precisión que
necesitan, antes de comprometer la Fase 1 completa.

Inversión del piloto: $10M COP, abonables 100% a la Fase 1
si deciden continuar.

¿Podemos agendar 30 minutos esta semana o la próxima para
revisar este enfoque?

Un abrazo,
Sara Garcés
```

### Paso 3 — Si no responde en 48-72h
Llamada directa a Lucas (no mensaje). Pregunta sin filtros:
> "Lucas, a mí hablame claro: ¿qué está frenando esto internamente? ¿Es precio, es timing, es que no se convencieron con la propuesta técnica, es que están evaluando otro proveedor? Necesito entender para saber si realmente hay chance o si ya está en pausa indefinida."

---

## Decisiones pendientes (hablar con JP)

1. **Precio del piloto:** $10M COP confirmado? (rango $8-12M)
2. **Duración:** 2-3 semanas o necesitamos 4?
3. **Módulo a proponer:** dejar abierto ("ustedes eligen el de más dolor") o sugerir uno específico?
4. **Email de Juan Guillermo:** pedírselo a Lucas primero o ya lo tenemos?
5. **¿JP entra al email como CEO** para darle peso institucional?
6. **¿Quién lidera técnicamente el piloto** — Juan David otra vez?

---

## Lo que NO hay que hacer

- ❌ Otro "¿ya revisaste?" — ya no funciona con Lucas
- ❌ Bajar precio de $30M sin cambiar alcance — devalúa lo entregado
- ❌ Asumir silencio = rechazo — es parálisis, no rechazo
- ❌ Esperar más de 1 semana para mover ficha
