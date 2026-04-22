# Clientes Activos

Carpeta de clientes que **ya firmaron y/o pagaron** — están en producción, en implementación de un Core/Ops/Edu Layer, o en periodo de soporte post-entrega.

**Diferencia con `Clientes/`:** La carpeta `Clientes/` contiene **prospectos y pipeline** (aún no firman, aún se evalúa, o están en discovery/propuesta). Una empresa se **promueve** de `Clientes/` a `Clientes Activos/` en el momento que firma contrato.

## Clientes activos

| # | Empresa | Servicio | Estado |
|---|---------|----------|--------|
| 1 | IndemnEasy | Core Layer (3 productos) | Fase 0 entregada — cuenta de cobro radicada |

## Estructura estándar por cliente activo

```
Clientes Activos/[slug]/
├── README.md                ← ficha del cliente activo
├── contexto/                ← documentos de referencia del cliente
├── comercial/               ← cotización firmada, facturación
│   └── pagos/               ← cuentas de cobro, comprobantes
├── contratos/               ← contrato firmado + anexos
├── fase0/                   ← documento Fase 0 (Core Layer)
├── entregable/              ← entregables formales (guías, documentación)
├── produccion/              ← trabajo vivo (kickoff, sprints, updates, issues)
├── seguimiento/             ← reportes periódicos al cliente (cadencia definida por cliente)
└── evaluaciones/            ← check-ins post-entrega, feedback
```

### Sobre `seguimiento/`

Aquí viven los reportes periódicos de avance que se comparten con el cliente (no los logs internos de `produccion/updates/`). La cadencia depende del acuerdo:
- **Semanal** (ej. IndemnEasy)
- **Quincenal** o **mensual** según cliente.

Convención de archivos: `reporte-[semanal|quincenal|mensual]-YYYY-MM-DD.md`. Generar con `/weekly-update [empresa]`.

## Flujo de promoción

Cuando un prospecto en `Clientes/[empresa]/` firma contrato:
1. Mover la carpeta a `Clientes Activos/[empresa]/`.
2. Consolidar: los documentos de pre-venta (discovery, diseño, propuesta) se conservan en `contexto/pre-venta/` para referencia histórica.
3. Activar estructura de producción: `produccion/kickoff/`, `produccion/updates/`, etc.
4. Actualizar el README del cliente con la ficha de activo.
