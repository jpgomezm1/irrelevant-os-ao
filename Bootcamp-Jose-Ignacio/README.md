# JIT Sales OS — Sistema de Negociación José Ignacio Tobón

Sistema operativo de negociación y ventas construido sobre el framework de José Ignacio Tobón. Acompaña el ciclo completo: antes, durante, después y a nivel organizacional.

**Construido por Irrelevant** para el bootcamp con José Ignacio Tobón (abril 29 y mayo 6 de 2026).

---

## Qué es

No es una colección de herramientas. Es una **capa de inteligencia** que toma la metodología JIT (7 huesos, 6 preguntas, ecuación del estrés, regla 95/5, tipologías, mandamientos) y la convierte en un asistente operacional para:

- El **negociador** (prepara, simula, analiza, mejora).
- El **director / coach** (audita equipo, detecta patrones, personaliza coaching).
- La **organización** (acumula aprendizaje: cada call hace al sistema más inteligente).

---

## Arquitectura — 3 módulos × 3 skills + capa de memoria

### Módulo 1 — ANTES (Preparación quirúrgica)

| Skill | Qué hace |
|---|---|
| `/investigar-prospecto` | Inteligencia de negociación sobre el otro: quién es, qué le importa, su BATNA probable, cómo piensa, tipología estimada. |
| `/disenar-estrategia` | Responde las 6 preguntas de planeación, define ZOPA (excelente/bueno/aceptable), diseña variables de rentabilidad infinita, anticipa tipología del otro. |
| `/simular-negociacion` | Role-play. Claude juega al prospecto alimentado con el research real — incluye modo HP / Soviético / Firme para entrenarse contra el peor escenario. |

### Módulo 2 — DURANTE/DESPUÉS (Radiografía)

| Skill | Qué hace |
|---|---|
| `/procesar-call-ji` | Ingesta transcript (Fireflies MCP o archivo) y lo organiza para análisis JIT. |
| `/radiografia-negociacion` | Análisis forense contra los 7 huesos + 6 preguntas + errores críticos. Score por dimensión, hard caps, momentos clave. |
| `/plan-accion` | Follow-up concreto: próximo movimiento, próximas variables a meter en la mesa, cómo manejar la siguiente interacción según lo que se reveló. |

### Módulo 3 — COACHING & MANAGEMENT (Escala)

| Skill | Qué hace |
|---|---|
| `/coaching-personal` | Feedback al negociador: "tú vs. tú mismo". Patrones que repites, blind spots, plan personalizado contra los errores críticos de JIT. |
| `/performance-equipo` | Vista director: quién falla en qué hueso, quién cae en temor al conflicto, quién no construye BATNA — con plan de coaching individualizado. |
| `/patrones-equipo` | Análisis cruzado de todas las calls: objeciones más comunes, manejos que ganan vs. pierden, aprendizajes que alimentan la memoria organizacional. |

### Capa transversal — MEMORIA ORGANIZACIONAL

| Skill | Qué hace |
|---|---|
| `/actualizar-memoria` | Después de cada call procesada, actualiza `memoria/aprendizajes.md` con patrones emergentes. La organización se vuelve más inteligente con cada conversación. |
| `/que-sigue-ji` | GPS del sistema. Te dice dónde estás y qué skill ejecutar ahora. |

---

## Estructura de carpetas

```
Bootcamp-Jose-Ignacio/
├── README.md                     ← este archivo
├── framework/
│   └── framework-jose-ignacio.md ← LA FUENTE DE VERDAD (todos los skills la leen)
├── casos/                        ← un subfolder por cada caso trabajado
│   └── [nombre-caso]/
│       ├── investigacion.md
│       ├── estrategia.md
│       ├── simulaciones/
│       ├── transcript.txt
│       ├── radiografia.md
│       ├── plan-accion.md
│       └── coaching.md
├── memoria/
│   ├── aprendizajes.md           ← patrones que emergen del uso
│   ├── objeciones-frecuentes.md
│   ├── tipologias-encontradas.md
│   └── casos-ejemplares.md
├── transcripts/                  ← dropzone para pegar transcripts crudos
└── .claude/skills/               ← los 11 skills del sistema
```

---

## Flujo recomendado

```
PRE-NEGOCIACIÓN:
/investigar-prospecto [caso]      → research orientado a negociación
/disenar-estrategia [caso]        → 6 preguntas + ZOPA + variables
/simular-negociacion [caso]       → role-play contra el prospecto estimado

DURANTE / POST:
[ejecutar negociación real]
/procesar-call-ji [caso]          → ingesta transcript (Fireflies)
/radiografia-negociacion [caso]   → análisis forense vs 7 huesos
/plan-accion [caso]               → próximo movimiento concreto

COACHING:
/coaching-personal [negociador]   → feedback personal al que hizo la call
/performance-equipo               → vista director (multi-caso)
/patrones-equipo                  → aprendizajes cruzados

MEMORIA:
/actualizar-memoria [caso]        → alimenta memoria organizacional

ORIENTACIÓN:
/que-sigue-ji [caso]              → GPS: dónde estoy, qué ejecuto ahora
```

---

## Principios operativos (aplican a todos los skills)

1. **Chat primero, archivo después.** Todo output se muestra en chat antes de guardarse. El chat es la herramienta de trabajo; el archivo es la referencia persistente.
2. **Framework como autoridad.** Ningún skill genera contenido sin antes leer `framework/framework-jose-ignacio.md`. Si el framework evoluciona, el sistema se recalibra.
3. **Español por defecto.** El método es español-nativo.
4. **Specificidad quirúrgica.** Ningún feedback genérico. Toda observación ancla en una cita, un minuto, o un hueso del framework.
5. **La memoria acumula.** Cada caso procesado alimenta `memoria/` para que el sistema sepa más con cada uso.

---

## Para el workshop del 29 de abril y 6 de mayo

**Sesión 1 (29 abril) — "De improvisar a operar con método":**
- Demo en vivo de Módulo 1 (preparación) con un caso real.
- Demo en vivo de Módulo 2 (radiografía) sobre una call real.
- Cierre: mostrar cómo la memoria se alimenta.

**Sesión 2 (6 mayo) — "El coach a escala":**
- Demo del Módulo 3 (performance del equipo) con data acumulada.
- Mostrar cómo un director audita 50 calls con la profundidad con que antes auditaba 2.
- Cierre: "Este sistema ya sabe más del equipo que el propio director."

---

## Datos del sistema

| Campo | Valor |
|---|---|
| **Sistema** | JIT Sales OS v1.0 |
| **Framework** | José Ignacio Tobón — 7 huesos, método JIT 4 fases |
| **Autor del framework** | José Ignacio Tobón (joseitobon.com) |
| **Implementación** | Irrelevant (stayirrelevant.com) |
| **Contacto** | Juan Pablo Gómez — jpgomez@stayirrelevant.com |
| **Fecha creación** | 2026-04-20 |
