# Campos Tributarios — Reglas de Inferencia (Colombia 2026)

Reglas para asignar automáticamente régimen tributario, tipo de contribuyente, y responsabilidades fiscales basado en NIT/CC y otras características.

---

## INFERENCIA POR TIPO DE DOCUMENTO

### PERSONA JURÍDICA (NIT)

Basado en los primeros 3 dígitos del NIT:

#### NIT 800-819 (Pequeño Contribuyente)

| Característica | Régimen Tributario | Tipo Contribuyente | Responsabilidades Fiscales |
|---|---|---|---|
| **Por defecto** | No Responsable IVA | SAS / Sociedad Limitada | O-13 (si factura) |
| **Si tiene > 3 empleados** | Responsable IVA | SAS / Sociedad Limitada | O-13 |
| **Si ventas > 40 SMMLV** | Responsable IVA | SAS / Sociedad Limitada | O-13 |

**Regla:** Si no se conoce tamaño, usar **No Responsable IVA** (por defecto para pequeños).

---

#### NIT 820-899 (Mediano Contribuyente)

| Característica | Régimen Tributario | Tipo Contribuyente | Responsabilidades Fiscales |
|---|---|---|---|
| **Por defecto** | Responsable IVA | SAS / Sociedad Limitada / S.A. | O-13 |
| **Si > 5 años operando** | Responsable IVA | SAS / Sociedad Limitada / S.A. | O-13 |
| **Si > 500 empleados** | Responsable IVA | SAS / Sociedad Limitada / S.A. | O-23 (Gran Contribuyente) |

**Regla:** **Responsable IVA** por defecto.

---

#### NIT 900-919 (Gran Contribuyente)

| Característica | Régimen Tributario | Tipo Contribuyente | Responsabilidades Fiscales |
|---|---|---|---|
| **Siempre** | Responsable IVA | S.A. / SAS / Sociedad Limitada | O-23 (Gran Contribuyente) |
| **Si presta servicios de** | Responsable IVA | S.A. / SAS / Sociedad Limitada | O-48 (Agente Retención) |

**Regla:** **Responsable IVA + Gran Contribuyente (O-23)** siempre.

---

#### NIT 920-999 (Entidades Especiales)

Fundaciones, gremios, iglesias, ONG:

| Característica | Régimen Tributario | Tipo Contribuyente | Responsabilidades Fiscales |
|---|---|---|---|
| **Por defecto** | No Responsable IVA | Entidad Sin Ánimo de Lucro | O-13 (si aplica) |

---

### PERSONA NATURAL (CC)

#### CC — Régimen Común (Trabajador Independiente)

| Característica | Régimen Tributario | Tipo Contribuyente | Responsabilidades Fiscales |
|---|---|---|---|
| **Por defecto** | Régimen Común | Trabajador Independiente | O-47 (Autorretenedor) |
| **Si ventas > 40 SMMLV** | Responsable IVA | Comerciante | O-13 |
| **Si prestador de servicios** | Responsable IVA | Profesional | O-48 (Agente Retención) |

**Regla:** Si no hay más info, usar **Régimen Común + Trabajador Independiente + O-47**.

---

## TABLA RÁPIDA DE INFERENCIA

```
┌─────────────────────┬──────────────────────┬──────────────────┬────────────────┐
│ NIT/CC              │ Tipo Persona         │ Régimen (defecto) │ Responsabilidad │
├─────────────────────┼──────────────────────┼──────────────────┼────────────────┤
│ NIT 800-819         │ Jurídica             │ No Responsable   │ O-13           │
│ NIT 820-899         │ Jurídica             │ Responsable IVA  │ O-13           │
│ NIT 900-919         │ Jurídica             │ Responsable IVA  │ O-23 (GC)      │
│ NIT 920-999         │ Entidad Especial     │ No Responsable   │ O-13           │
│ CC (persona natural)│ Natural              │ Régimen Común    │ O-47           │
│ CC (comerciante)    │ Natural              │ Responsable IVA  │ O-13           │
└─────────────────────┴──────────────────────┴──────────────────┴────────────────┘
```

---

## CÓDIGOS DE RESPONSABILIDADES FISCALES DIAN

| Código | Descripción | Aplica a | Obligaciones |
|--------|-------------|----------|------------|
| **O-13** | Responsable del Impuesto sobre las Ventas (IVA) | Jurídicas y Naturales que facturen | Declaración IVA mensual/bimestral |
| **O-15** | Contribuyente Especial ReteIVA | Jurídicas grandes | Retención de IVA en compras |
| **O-23** | Gran Contribuyente | Jurídicas (NIT 900-919) | Declaración trimestral, agente retención |
| **O-47** | Autorretenedor | Independientes / Personas Naturales | Retención en renta (2.5% compras) |
| **O-48** | Agente de Retención en Renta | Servicios, asesorías, prestadores | Retención IUE (11% servicios) |

---

## LÓGICA DE DECISIÓN PARA GALCO

### Si es PROVEEDOR DE SERVICIOS (soldadura, maquinado, etc.)

**Criterios:**
- ¿Tiene NIT o CC?
- ¿Es empresa o independiente?

**Flujo:**

```
SI NIT (820-899 ó 900-919) → Responsable IVA + O-13 (mínimo) ó O-23 (si GC)
SI CC (trabajador indep.) → Régimen Común + O-47 (autorretenedor)
SI CC (pero vende > 40 SMMLV) → Responsable IVA + O-13
```

### Si es CLIENTE (compra materias primas)

**Criterios:**
- ¿Tiene NIT o CC?
- ¿Construye o es industria?

**Flujo:**

```
SI NIT (800-919) → Responsable IVA (asumir por defecto)
SI NIT (920-999) → No Responsable (entidad especial)
SI CC → Régimen Común (a menos que compre > 40 SMMLV)
```

---

## CAMPOS TRIBUTARIOS OBLIGATORIOS POR TIPO

### PERSONA JURÍDICA (NIT)

- [x] Tipo Persona: Jurídica
- [x] Régimen Tributario: Responsable IVA ó No Responsable
- [x] Tipo Contribuyente: SAS, Ltda., S.A., E.U., etc.
- [x] Responsabilidades Fiscales: O-13, O-15, O-23, O-48
- [x] Actividad Económica (CIIU): Código de 4 dígitos

### PERSONA NATURAL (CC)

- [x] Tipo Persona: Natural
- [x] Régimen Tributario: Régimen Común, Responsable IVA
- [x] Tipo Contribuyente: Trabajador Independiente, Comerciante, Profesional
- [x] Responsabilidades Fiscales: O-13 (si vende), O-47 (autorretenedor)
- [x] Actividad Económica (CIIU): Código de 4 dígitos (opcional pero recomendado)

---

## VALIDACIONES POSTERIORES

**Una vez completados los campos tributarios, validar:**

1. ¿El NIT es válido? (formato, dígito verificación correcto)
2. ¿La combinación NIT/Régimen/Responsabilidad es coherente?
3. ¿Si CC, está verificada en RUES?
4. ¿El CIIU es válido? (tabla estándar DIAN)

**Si hay inconsistencia:** marca como "REVISAR MANUALMENTE" y avisa al usuario.

---

## UVT 2026

Para decisiones sobre bases mínimas y retenciones:

**UVT Vigencia 2026: $49,800 COP**

- Base mínima ReteFuente (servicios): 27 UVT = $1,344,600
- Base mínima ReteICA: Depende municipio
- Base mínima ReteIVA: Variable según caso

---

## Notas Importantes

- **Estos son valores por defecto.** Si el usuario proporciona info más precisa, usar esa.
- **Cuando sea ambiguo**, mostrar opciones al usuario para que confirme.
- **Después de inferir**, comunicar al usuario: "Inferí régimen X. ¿Correcto?"
