---
name: calcular-roi
description: >
  Calcula ROI personalizado para un prospecto. Triggers: "calcular roi", "roi",
  "retorno de inversion", "return on investment", "/calcular-roi".
  Usa /calcular-roi [empresa]
argument-hint: "[empresa]"
allowed-tools: [AskUserQuestion, Write]
---

# Calcular ROI — Calculadora de Retorno de Inversion

Calculas el ROI personalizado de contratar los servicios de Irrelevant para un prospecto especifico. El output es una tabla clara lista para presentar en una reunion.

---

## STEP 0.5: Verificar Carpeta del Cliente

Busca si existe carpeta del cliente en `Clientes/[empresa-lowercase]/` usando Glob.

**Si EXISTE:**
1. Usar esa carpeta para guardar outputs
2. Leer contexto previo relevante:
   - `Clientes/[empresa]/contexto/*` — transcripts y notas
   - `Clientes/[empresa]/discovery/*` — discovery notes
   - `Clientes/[empresa]/diseno/*` — propuestas y specs
   Esto enriquece tu output con todo el historial del cliente.

**Si NO EXISTE:**
Preguntar: *"No encontré carpeta para [Empresa]. ¿La creo? (o usa /cliente crear [empresa])"*
Si dice sí, crear la estructura básica de carpetas.

---

## STEP 1: Recopilar Datos

Pregunta al usuario:

*"Vamos a calcular el ROI. Necesito estos datos:*

*1. Nombre de la empresa*
*2. Servicio propuesto: Ops Layer, Edu Layer, o Core Layer?*
*3. Tamano del equipo afectado (cuantas personas)*
*4. Horas manuales semanales estimadas que se perderian (en tareas repetitivas/ineficientes)*
*5. Costo hora promedio del equipo — o salario mensual promedio (yo calculo el costo hora)*
*6. Precio del servicio de Irrelevant (si es diferente al estandar)*

*Si no tienes los numeros exactos, dame estimados y trabajamos con esos."*

Espera la respuesta.

---

## STEP 2: Calcular

### Datos Base
- **Costo hora:** Si dan salario mensual, dividir por 160 (horas laborales/mes). Si dan salario en COP, convertir si es necesario.
- **Precio del servicio:** Usar estandar si no se especifica:
  - Ops Layer: $7.000.000 COP
  - Edu Layer: $4.500.000 COP
  - Core Layer: Pedir al usuario

### Benchmarks por Servicio

**AI Ops Layer:**
- Ahorro tipico: 30-40 horas/semana para el equipo
- Usar el dato del usuario si lo proporciona, sino usar 35 hrs/semana como default

**AI Edu Layer:**
- Mejora de productividad estimada: 15-20% de eficiencia
- Calcular: horas totales del equipo x % mejora = horas recuperadas

**AI Core Layer:**
- Ahorro depende del alcance — usar los datos del usuario

### Calculos

```
Ahorro semanal     = Horas recuperadas x Costo hora
Ahorro mensual     = Ahorro semanal x 4.33
Ahorro anual       = Ahorro mensual x 12
Payback period     = Precio servicio / Ahorro mensual (en meses)
ROI a 3 meses      = ((Ahorro mensual x 3) - Precio) / Precio x 100
ROI a 6 meses      = ((Ahorro mensual x 6) - Precio) / Precio x 100
ROI a 12 meses     = ((Ahorro mensual x 12) - Precio) / Precio x 100
```

---

## STEP 3: Generar Output

### Tabla Comparativa (Before/After)

```
ANALISIS DE ROI — [Empresa]
Servicio: [AI Ops/Edu/Core Layer]
Fecha: [fecha actual]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         ANTES          DESPUES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Horas manuales/semana:  [X]h         [X - ahorro]h
Costo operativo/mes:    $[X]         $[X - ahorro mensual]
Procesos manuales:      [X]          Automatizados
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INVERSION
Precio del servicio:    $[X]

RETORNO
Ahorro semanal:         $[X]
Ahorro mensual:         $[X]
Ahorro anual:           $[X]

Payback period:         [X] meses
ROI a 3 meses:          [X]%
ROI a 6 meses:          [X]%
ROI a 12 meses:         [X]%
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Version "Listo para Presentar"

Una version mas corta y visual para usar en una call:

*"Con una inversion de $[precio], tu equipo recupera $[ahorro mensual] al mes. En [payback] meses ya se pago solo, y al ano el retorno es de [ROI 12m]%."*

---

## STEP 4: Guardar Output

Guarda como: `Clientes/[empresa]/comercial/calcular-roi.md`

---

## Reglas

- SIEMPRE pedir datos reales — los calculos son tan buenos como los inputs
- Si los datos son estimados, decirlo claramente: "Basado en estimados"
- Los benchmarks (30-40 hrs Ops, 15-20% Edu) son GUIAS — si el usuario da datos reales, usar esos
- Formatear numeros COP con puntos de miles: $7.000.000
- Formatear numeros USD con comas: $3,500
- El payback period es el dato mas poderoso en una venta — resaltarlo
- Si el ROI es negativo o el payback es muy largo, ser honesto y decirlo
- Espanol por defecto
