---
name: pipeline-dashboard
description: >
  Genera un HTML visual con el estado de todos los clientes activos del pipeline.
  Triggers: "pipeline", "dashboard", "estado del pipeline", "ver todos los clientes", "/pipeline-dashboard".
allowed-tools: [Read, Write, Glob]
---

# Pipeline Dashboard — Vista Global de Clientes

Generas un dashboard HTML en dark mode con el estado de todo el pipeline comercial. Escaneas todas las carpetas de clientes y presentas una vista completa para toma de decisiones.

Antes de hacer CUALQUIER COSA:
1. Lee `CLAUDE.md` en la raíz del workspace para entender los servicios de Irrelevant y sus precios
2. Lee `Assets Fijos/PROP_VALUE_IRRELEVANT.md` para entender la propuesta de valor completa

---

## STEP 1: Escanear Todos los Clientes

Usa Glob para encontrar todas las carpetas en `Clientes/*/README.md`.

Para CADA cliente:
1. Lee `README.md` — extraer: empresa, industria, servicio, estado, contacto, fecha de creación
2. Escanea todas las subcarpetas y cuenta archivos por carpeta
3. Determina la etapa del pipeline:

| Etapa | Condición |
|-------|-----------|
| **Nuevo** | Solo tiene README, carpetas vacías |
| **Preparación** | Tiene prep-call o contexto |
| **Discovery** | Tiene discovery-notes |
| **Diseño** | Tiene archivos en diseno/ |
| **Cotización** | Tiene cotización en comercial/ |
| **Negociación** | Tiene cotización pero no contratos |
| **Contratos** | Tiene contratos generados |
| **Producción** | Tiene archivos en produccion/ (Core Layer) |
| **Entrega** | Tiene entregable generado |
| **Post-Entrega** | Tiene check-ins o evaluaciones post-entrega |
| **Cerrado** | Tiene entregable + check-in positivo |

4. Determina el valor estimado basado en servicio:
   - Ops Layer: $4.000.000 COP
   - Edu Layer: $4.500.000 COP
   - Core Layer: buscar en cotización o estimar $15.000.000 COP
   - No definido: $0

5. Calcula días en la etapa actual (diferencia entre hoy y fecha de último archivo relevante)

6. Determina siguiente acción sugerida (basada en la lógica de /que-sigue)

---

## STEP 2: Generar Dashboard HTML

Genera un archivo HTML con dark mode, estilo consistente con el Operating System de Irrelevant.

### Estructura del Dashboard:

```html
<!-- Estilo dark mode -->
<!-- Background: #0a0a0a -->
<!-- Cards: #1a1a1a -->
<!-- Borders: #333 -->
<!-- Text primary: #ffffff -->
<!-- Text secondary: #888 -->
<!-- Accent: #00ff88 (verde Irrelevant) -->
<!-- Warning: #ff6b35 -->
<!-- Danger: #ff3333 -->
```

### Secciones:

#### 1. Header
- Logo Irrelevant (usar URL del CLAUDE.md)
- Título: "Pipeline Dashboard"
- Fecha de generación
- Total de clientes activos

#### 2. Stats Cards (fila de 4)
- Total clientes
- Valor total del pipeline (suma de todos los deals)
- Deals por etapa (distribución)
- Deals en riesgo (>14 días sin actividad)

#### 3. Pipeline Table
Tabla principal con columnas:
| Cliente | Servicio | Etapa | Valor | Días en etapa | Último archivo | Siguiente acción |
- Rows con color coding: verde (avanzando), amarillo (>7 días), rojo (>14 días)
- Sorteable visualmente (más urgentes arriba)

#### 4. At-Risk Clients
Sección destacada con clientes que tienen >14 días sin actividad:
- Nombre, etapa actual, días sin actividad, último contacto
- Acción sugerida para reactivar

#### 5. Revenue Forecast
- Deals por probabilidad de cierre (basado en etapa):
  - Discovery: 20%
  - Diseño: 35%
  - Cotización: 50%
  - Negociación: 65%
  - Contratos: 85%
  - Producción/Entrega: 95%
- Pipeline ponderado (valor × probabilidad)
- Forecast mensual estimado

#### 6. Footer
- "Generado por Irrelevant Sales OS"
- Fecha y hora

### Estilo CSS:
- Responsive (funciona en desktop y tablet)
- Font: system-ui o similar
- Sin dependencias externas (todo inline)
- Dark mode consistente
- Tablas con hover effects
- Cards con sombras sutiles

---

## STEP 3: Guardar Output

Guarda como: `Assets Fijos/pipeline-dashboard.html` (SOBREESCRIBE cada vez)

---

## STEP 4: Confirmar

*"Dashboard generado: `Assets Fijos/pipeline-dashboard.html`"*

*"Resumen:*
- *[X] clientes activos*
- *Pipeline total: $[X] COP*
- *[X] deals en riesgo (>14 días sin actividad)*
- *Pipeline ponderado: $[X] COP"*

*"Abre el archivo en un navegador para ver el dashboard completo."*

---

## Reglas

- **Español** por defecto
- SIEMPRE sobreescribir el dashboard anterior (es una foto del momento)
- Si no hay clientes, generar dashboard vacío con mensaje "No hay clientes en el pipeline"
- Los valores deben ser realistas — usar precios de CLAUDE.md
- El HTML debe ser AUTOCONTENIDO — todo el CSS inline, sin dependencias
- Dark mode SIEMPRE — consistente con el estilo de Irrelevant
- Días en etapa se calcula con la fecha de modificación del último archivo relevante
- Si un cliente no tiene servicio definido, mostrar "Por definir" y valor $0
- Ordenar clientes por urgencia (más días sin actividad primero)
