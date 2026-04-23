# Brief inicial — Clasificador de residuos (Gestión Humana)

**Fecha:** 2026-04-22
**Canal:** Mensaje verbal / resumen transmitido por Sara
**Solicitante:** Departamento de Gestión Humana (Conaltura)

## Lo que piden textualmente

> "Lo que necesito es resolver un problema de la disposición de residuos, ¿cierto?, para clasificar y toda la cosa. Entonces la idea es tener una pantalla en la parte de arriba de las canecas donde yo pueda escanear la basura y que me diga en qué caneca va. Ustedes miren a ver eso cuánto me vale."

## División de responsabilidades (confirmado por Sara)

| Conaltura pone | Irrelevant pone |
|---|---|
| Cámara(s) físicas | Modelo de visión por computadora (clasificador) |
| Pantalla(s) sobre las canecas | Software que recibe la imagen y devuelve la caneca correcta |
| Dispositivo de cómputo (tablet / mini-PC / Raspberry) | Interfaz visual que se muestra en la pantalla |
| Canecas e infraestructura física | Dashboard de métricas de uso y clasificación |
| Instalación eléctrica y mantenimiento físico | Entrenamiento del modelo con residuos reales de Conaltura |
| Conectividad (WiFi / 4G en obra) | Mantenimiento y mejora continua del modelo |

**Implicación clave:** el proyecto encaja como **Ops Layer con componente de visión por computadora** (software puro del lado de Irrelevant). Ya no es una cotización híbrida hardware+software.

## Preguntas abiertas (pendientes de discovery)

### Técnicas — definición del scope
1. **Dispositivo objetivo**: ¿qué hardware va a ejecutar el software? (tablet Android, mini-PC, Raspberry Pi, procesamiento en cloud). Esto define si el modelo corre on-device u online.
2. **Conectividad**: ¿hay internet estable donde van las canecas? (las obras suelen tener conectividad irregular → puede requerir modelo offline).
3. **Esquema de clasificación**: ¿norma colombiana (blanco/verde/negro), norma municipal, o esquema interno más detallado (orgánico, cartón, plástico, vidrio, metal, peligroso)?
4. **Dataset**: ¿ya tienen fotos de residuos reales de sus obras/oficinas? ¿O lo construimos desde cero con un piloto de captura?
5. **Experiencia visual**: ¿qué se muestra en la pantalla? (texto simple, animación, voz, idioma específico para obreros).

### De negocio — alcance del piloto
6. **Cantidad de puntos**: ¿cuántas canecas van a equipar? ¿piloto en una sede u obra, o rollout completo?
7. **Objetivo real**: ¿métrica de cumplimiento ambiental? ¿certificación (ISO 14001, LEED)? ¿cultura organizacional? ¿reporte para auditoría?
8. **Presupuesto disponible**: orden de magnitud esperado para el piloto y para el modelo de operación recurrente.

## Decisiones arquitectónicas tempranas (validar con equipo técnico)

1. **Construir vs integrar**: evaluar si se entrena un modelo custom desde cero (más costoso, más preciso para residuos específicos de Conaltura) o se usa Google Vision AI / AWS Rekognition Custom Labels / modelo open-source tipo YOLOv8 fine-tuneado.
2. **On-device vs cloud**: si la conectividad en obra es irregular, el modelo debe correr local (más inversión inicial, menos costo recurrente).
3. **Formato de cotización**: implementación única (modelo entrenado + software + dashboard) + fee mensual (mantenimiento del modelo, infraestructura, reentrenamiento con datos nuevos).

## Próximos pasos sugeridos

1. Agendar discovery con el líder de Gestión Humana para responder las 8 preguntas abiertas
2. Validar con equipo técnico de Irrelevant el approach (custom vs API comercial vs open-source fine-tuning)
3. Diseñar propuesta de piloto (1 o 2 puntos de caneca) antes de cotizar rollout completo
4. Generar cotización una vez definidos: esquema de clasificación + cantidad de puntos + dispositivo objetivo
