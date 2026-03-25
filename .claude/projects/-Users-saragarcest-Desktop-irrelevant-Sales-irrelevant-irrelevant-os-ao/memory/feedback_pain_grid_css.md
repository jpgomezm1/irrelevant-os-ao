---
name: Definir CSS de pain-grid en cotizaciones
description: Siempre incluir estilos CSS para .pain-grid, .pain-item y .pain-title en cotizaciones para evitar fuentes inconsistentes
type: feedback
---

Siempre definir los estilos CSS de `.pain-grid`, `.pain-item` y `.pain-title` en las cotizaciones.

**Why:** Estos elementos se usaban con inline styles pero sin clases CSS definidas, causando que la fuente se viera diferente al resto del documento (fallback a serif en vez de Quicksand/Inter).

**How to apply:** Al generar cotizaciones con /cotizacion, incluir en el bloque `<style>` los estilos para `.pain-grid` (flex column, gap 12px), `.pain-item` (lavanda, border-left morado, padding), `.pain-title` (Quicksand 13px 600) y `.pain-item p` (Inter 11px 300). Nunca dejar estos elementos sin estilos definidos.
