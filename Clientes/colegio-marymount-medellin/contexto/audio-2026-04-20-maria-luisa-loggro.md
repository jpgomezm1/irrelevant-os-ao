# Audio — María Luisa Muñoz (Gerente Administrativa, Marymount) — 20 de abril de 2026

**Fuente:** audio de WhatsApp enviado por María Luisa al equipo de Irrelevant.
**Contexto:** respuesta a las 3 preguntas técnicas sobre Loggro que se mandaron el 2026-04-18.

## Transcripción

> "Hola Sara, ¿cómo estás? Mira, Loggro está en la nube, entonces sí, eso se puede acceder desde cualquier lado con las credenciales sin problema. Claro que tenemos un Plan Único de Cuentas, usamos Loggro Enterprise. Bueno, yo creo que ahí ya tienes toda la información... ¡buenísimo!"

> "¿Sabes qué estaba pensando? Es que cuando pase esa causación de las facturas, podemos revisar cómo se ha causado esa misma factura antes cuando haga la verificación de qué histórico hay, y es repita lo mismo. Cáuselo a esa misma cuenta y demás. Entonces yo creo que, en realidad, es muy fácil... como, pues sí, que se pueda hacer ahí mismo en esa búsqueda."

> "Entonces, bueno, pásame el documento, porfa. Mil gracias."

## Confirmaciones técnicas

1. **Loggro en la nube** — accesible con credenciales desde cualquier lado. API REST disponible (ya investigada en `developer.loggro.com`).
2. **Tienen Plan Único de Cuentas (PUC)** — todas las cuentas contables están parametrizadas.
3. **Usan Loggro Enterprise** — el producto que asumimos en la propuesta. Trae la carga inteligente de facturas electrónicas desde XML de la DIAN y la API para causación.

## Aporte adicional de María Luisa — lógica de causación

María Luisa propone que, al momento de la causación automática, Claude **revise el histórico de cómo se causó esa misma factura antes y replique la misma cuenta contable**. Es lo que el equipo contable hace hoy manualmente: busca el proveedor, ve a qué cuenta se causó la última vez y repite.

Esta lógica quedó reforzada en el documento (pág 05, paso 7) y en las slides (slide 7, tarjeta "04 VALIDA") para validar que escuchamos su insight.

## Implicación para la propuesta

- No hay cambios estructurales. Toda la propuesta ya asumía Loggro Enterprise + API.
- Se actualizó la fecha de portada a 20 de abril (vigencia 15 días calendario).
- Propuesta queda **lista para mandar** a María Luisa.
