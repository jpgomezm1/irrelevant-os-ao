# Códigos DANE — Ciudades Principales Colombia

Referencia de códigos DANE (Departamento Administrativo Nacional de Estadística) para ciudades principales donde Galco opera o podría operar.

---

## ANTIOQUIA (Departamento 05)

| Código DANE | Municipio | Región | Distancia Galco (km) |
|---|---|---|---|
| **05001** | Medellín | Valle de Aburrá | 15 |
| **05088** | Bello | Área Metropolitana | 8 |
| **05266** | Envigado | Área Metropolitana | 12 |
| **05308** | Itagüí | Área Metropolitana | 0 (Sede Galco) |
| **05360** | La Estrella | Área Metropolitana | 5 |
| **05380** | Sabaneta | Área Metropolitana | 18 |
| **05631** | Rionegro | Oriente Antioqueño | 45 |

---

## OTROS DEPARTAMENTOS — PRINCIPALES CIUDADES

### BOGOTÁ D.C. (Distrito Capital)

| Código DANE | Municipio |
|---|---|
| **11001** | Bogotá D.C. |

### VALLE DEL CAUCA

| Código DANE | Municipio |
|---|---|
| **76001** | Cali |

### ATLÁNTICO

| Código DANE | Municipio |
|---|---|
| **08001** | Barranquilla |

### BOLÍVAR

| Código DANE | Municipio |
|---|---|
| **13001** | Cartagena |

### SANTANDER

| Código DANE | Municipio |
|---|---|
| **68001** | Bucaramanga |

### CALDAS

| Código DANE | Municipio |
|---|---|
| **17001** | Manizales |

### RISARALDA

| Código DANE | Municipio |
|---|---|
| **66001** | Pereira |

### QUINDÍO

| Código DANE | Municipio |
|---|---|
| **63001** | Armenia |

---

## FORMATO DE CÓDIGOS DANE

**Estructura:** 5 dígitos = DD + MMM

- **DD** (primeros 2): Código del departamento
- **MMM** (últimos 3): Código del municipio dentro del departamento

**Ejemplo:** 05360 (La Estrella)
- 05 = Antioquia
- 360 = La Estrella

---

## BÚSQUEDA RÁPIDA POR NOMBRE

**Para ciudades comunes mencionadas por Galco:**

```
Medellín → 05001
Bogotá → 11001
Bello → 05088
Envigado → 05266
Itagüí → 05360
Sabaneta → 05380
Cali → 76001
Barranquilla → 08001
Cartagena → 13001
Bucaramanga → 68001
Pereira → 66001
Armenia → 63001
Manizales → 17001
Rionegro → 05631
La Estrella → 05380
```

---

## VALIDACIÓN

**Si un usuario menciona una ciudad:**

1. Busca en esta tabla
2. Si encuentras → usa automáticamente el código DANE
3. Si NO encuentras → pregunta:
   - *"¿La ciudad es [opciones cercanas]? O confirma el nombre exacto"*
   - Si el usuario especifica, busca en tabla DIAN completa o marca como "REVISAR"
4. Nunca dejes una ciudad sin código DANE. Si no puedes determinar, marcar como "DANE_PENDIENTE_VERIFICACION"

---

## NOTAS IMPORTANTES

- **Estos son códigos DIAN oficiales 2026** — válidos para Ilimitada, SIGO, y formularios de ReteICA
- **Antioquia es Región Focal:** Galco está en Itagüí (05360), así que las ciudades del Área Metropolitana se usan frecuentemente
- **Ciudades fuera de la lista:** Si un tercero está en otra ciudad, usa tabla DIAN completa o consulta DANE.gov.co
- **Cambios:** Los códigos DANE no cambian, pero municipios nuevos se crean raramente. Mantener actualizado anualmente.
