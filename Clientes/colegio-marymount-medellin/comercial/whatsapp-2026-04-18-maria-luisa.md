# WhatsApp a María Luisa — 2026-04-18

**Enviado por:** Sara Garcés
**Destinataria:** María Luisa Muñoz, Gerente Administrativa Marymount
**Contexto:** Post-reunión de propuesta Ops Layer (2026-04-16). Sara confirmó viabilidad técnica con el equipo y pide datos de Loggro para cerrar el alcance de la causación automática.

---

## Mensaje enviado

> Hola María Luisa, ¿Cómo estás?
>
> Ya revisé con el equipo técnico y te confirmo que desde nuestro lado sí podemos construir los 3 procesos con Claude, así que el precio se mantiene en $12M como lo conversamos.
>
> Solo me quedan tres dudas para confirmarte el tema de la causación automática de facturas:
>
> 1. ¿Loggro lo usan como servicio web (entran por URL en el navegador) o lo tienen instalado en un servidor del colegio?
> 2. ¿Ustedes tienen un plan único de cuentas (PUC)?
> 3. ¿Cuál de estos productos de Loggro están usando en el colegio? (De los de la imagen)
>
> Por el tipo de operación me imagino que es Loggro Enterprise, pero prefiero confirmarlo contigo. Si usan más de uno (por ejemplo Enterprise + Docs Electrónicos), también me cuentas.
>
> Con eso, adapto el documento completo para que ya quede la propuesta final. Graciass! 🙌🏼

**Adjunto:** imagen del catálogo de productos Loggro (Enterprise, Restobar, Pymes, POS, Nómina, Alojamientos, Docs Electrónicos).

---

## Por qué estas preguntas

El objetivo de las 3 preguntas es confirmar el escenario técnico para la causación automática:

- **Pregunta 1 (nube vs on-premise):** si es nube con API pública, la causación automática es viable sin cambios. Ya investigamos que Loggro es 100% nube con API REST en `developer.loggro.com`, pero falta confirmación directa del colegio.
- **Pregunta 2 (PUC):** necesitamos saber si tienen plan único de cuentas para que Claude pueda inferir la cuenta contable correcta al causar. Si el PUC está mapeado en Loggro, podemos consultarlo vía API.
- **Pregunta 3 (producto específico):** define qué endpoints de API usamos. Probable: Loggro Enterprise + posiblemente Docs Electrónicos para facturación electrónica DIAN.

---

## Siguiente paso

Esperar respuesta de María Luisa. Cuando responda:

- Si confirma Loggro Enterprise + nube + PUC → adaptar el documento final y mandar
- Si usan otro producto o versión local → revalidar con ingeniero y posiblemente recotizar
- Si no sabe la respuesta técnica → pedir contacto del administrador de Loggro para validar directamente con ellos
