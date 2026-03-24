# Spec Stack Técnico: Galco

## Herramientas Seleccionadas (del catálogo Supabase)

### Claude (slug: claude)
- **Categoría:** dairy (AI assistants)
- **URL:** https://claude.ai
- **Pricing:** $20 USD/usuario/mes. 2 usuarios (Jorge + Carolina) = $40 USD/mes
- **Dificultad:** intermediate
- **Tags:** irrelevant
- **Rol en el stack:** Motor de IA central. TODOS los 6 skills corren sobre Claude. Es el modelo que procesa documentos, extrae datos de PDFs, cruza contra PUC, y genera plantillas de carga.
- **Integración con motor IA:** ES el motor. Claude Code ejecuta los skills usando Claude como LLM.
- **MCP disponible:** N/A — es el motor, no un servicio externo
- **Nota:** Claude Code viene incluido con la suscripción Pro. Es el entorno donde viven los skills.

### Fireflies.ai (slug: fireflies-ai)
- **Categoría:** marketing (meetings/transcription)
- **URL:** https://fireflies.ai
- **Pricing:** $10 USD/mes (plan Pro). 1 cuenta para Diego.
- **Dificultad:** beginner
- **Tags:** —
- **Rol en el stack:** Transcripción automática de reuniones. Captura acuerdos con proveedores, compromisos de entrega, negociaciones de precio. Crea trazabilidad de conversaciones.
- **Integración con motor IA:** MCP de Fireflies disponible en Claude Code → los skills pueden jalar transcripts directamente para procesar
- **MCP disponible:** SÍ — `mcp__fireflies` (ya configurado en nuestro workspace)

### NotebookLM (slug: notebooklm)
- **Categoría:** productivity
- **URL:** https://notebooklm.google/
- **Pricing:** Gratis
- **Dificultad:** intermediate
- **Tags:** Top, irrelevant
- **Rol en el stack:** Base de conocimiento contable y tributario. Carolina carga PUC, Estatuto Tributario, resoluciones DIAN, y consulta con respuestas citadas. Reemplaza su uso actual de ChatGPT para consultas tributarias con algo más confiable (cita fuentes).
- **Integración con motor IA:** Independiente — es herramienta de consulta de Carolina, no se integra con los skills
- **MCP disponible:** No

### Gamma AI (slug: gamma-ai)
- **Categoría:** productivity
- **URL:** https://gamma.app
- **Pricing:** Gratis (con opciones premium)
- **Dificultad:** beginner
- **Tags:** —
- **Rol en el stack:** Generación de presentaciones y reportes visuales. Diego la usa para presentar resultados a Don Ignacio (gerente general) — reportes de compras, análisis financiero, etc.
- **Integración con motor IA:** Independiente — se alimenta de los outputs de los skills (ej: el reporte de comparación de cotizaciones se puede convertir en presentación)
- **MCP disponible:** No

---

## Mapa de Integraciones

```
                    ┌─────────────────────┐
                    │    CLAUDE PRO        │
                    │  (Motor de IA)       │
                    └─────────┬───────────┘
                              │
                    ┌─────────┴───────────┐
                    │    CLAUDE CODE       │
                    │  (6 Skills Galco)    │
                    └─────────┬───────────┘
                              │
              ┌───────────────┼───────────────┐
              │               │               │
     ┌────────┴──────┐ ┌─────┴─────┐ ┌───────┴──────┐
     │ Exports SIGO  │ │ Exports   │ │ Remisiones   │
     │ (OC, inventario│ │ Ilimitada │ │ Jenguar      │
     │  proveedores) │ │ (plantillas│ │ (producción) │
     └───────────────┘ │  de carga)│ └──────────────┘
                       └───────────┘

     FIREFLIES.AI ──MCP──→ CLAUDE CODE (transcripts)

     NOTEBOOKLM ←── PUC, normas DIAN (consulta independiente)

     GAMMA AI ←── Outputs de skills (presentaciones)
```

## Orden de Setup Recomendado

1. **Claude Pro × 2 usuarios** — Configurar primero. Sin esto no hay motor de IA. Crear cuentas para Jorge y Carolina.
2. **Claude Code + Skills** — Instalar Claude Code en los computadores de Jorge y Carolina. Desplegar los 6 skills con todas las referencias (PUC, plantillas, catálogos).
3. **Fireflies.ai** — Configurar cuenta de Diego. Conectar con su herramienta de videollamadas (Zoom/Meet/Teams).
4. **NotebookLM** — Crear notebook de Carolina con documentos tributarios. Cargar PUC, Estatuto Tributario, resoluciones DIAN relevantes.
5. **Gamma AI** — Mostrar a Diego en la sesión de entrenamiento. No requiere configuración compleja.

## Herramientas del Cliente que Mantenemos
- **SIGO** — ERP local → los skills generan archivos compatibles con sus formatos de importación
- **Ilimitada** — Software contable on-premise → los skills generan plantillas de carga en su formato exacto
- **Word Manager** — Gestión documental → ya tiene bot de XMLs para facturas electrónicas, funciona bien
- **SharePoint** — Almacenamiento → seguir usando para archivos compartidos
- **Jenguar** — Producción → los skills leen sus remisiones (Excel/PDF)
- **Excel** — Formato intermedio → la "biblia" de Jorge se mantiene, los skills generan output compatible
- **Correo electrónico** — Canal principal con proveedores → no se reemplaza

## Herramientas del Cliente que Complementamos (no reemplazamos)
- **ChatGPT (Carolina)** → Se complementa con NotebookLM para consultas tributarias más confiables (cita fuentes vs generar respuestas). Carolina puede seguir usando ChatGPT para otras cosas.

## Herramientas que NO Recomendamos (y por qué)
- **CRM (HubSpot, Kommo, etc.):** Galco no tiene un proceso comercial que lo justifique. Las compras son B2B industrial, basadas en relaciones de años.
- **Automatización (Zapier, Make, n8n):** Los sistemas de Galco (SIGO, Ilimitada, Jenguar) son on-premise sin API. No hay forma de conectarlos vía webhooks o API. La integración es vía archivos.
- **Herramientas de marketing:** No aplica al negocio de Galco.
- **Herramientas de voz/video AI:** No hay caso de uso relevante.

## Consideraciones Técnicas

### Sistemas On-Premise
SIGO, Ilimitada y Jenguar corren en servidores locales de Galco. Esto significa:
- **NO hay integración API directa** — todo es vía exports (CSV/Excel) y plantillas de carga
- **Los skills funcionan como puente:** leen archivos exportados de un sistema → transforman → generan archivo listo para importar al otro sistema
- **Ventaja:** No se toca la infraestructura del cliente. No se instala nada en sus servidores. Zero riesgo de afectar sistemas en producción.
- **Limitación:** El flujo no es 100% automático — Jorge/Carolina tienen que exportar de un sistema y subir al otro. Los skills eliminan el trabajo manual del medio, no los pasos de export/import.

### Seguridad y Datos
- Los archivos de Galco se procesan en Claude (cloud de Anthropic)
- Si hay restricciones de confidencialidad (planos de maquila, datos de proveedores críticos), validar con Diego si es aceptable
- Claude no almacena datos entre sesiones — los archivos se procesan en memoria y no se guardan
- Las referencias de los skills (PUC, catálogos, datos maestros) sí se almacenan localmente en el computador de Jorge/Carolina

## Costo Mensual Recurrente

| Herramienta | Precio/mes | Usuarios |
|-------------|-----------|----------|
| Claude Pro | $20 USD | 2 (Jorge + Carolina) |
| Fireflies.ai Pro | $10 USD | 1 (Diego) |
| NotebookLM | Gratis | Carolina |
| Gamma AI | Gratis | Diego |
| **Total** | **$50 USD/mes (~$200.000 COP/mes)** | |

**Contexto:** $200.000 COP/mes es ~0.6% del costo mensual estimado del trabajo manual que se elimina (~33-43 hrs/semana × costo hora-hombre).
