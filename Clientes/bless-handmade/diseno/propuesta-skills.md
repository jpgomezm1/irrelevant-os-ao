# Procesos Inteligentes Recomendados para Bless Handmade

## Esto es lo que vamos a dejar funcionando

### 1. Programador de Produccion
**El problema:** Juliana llega cada mañana, exporta la lista de ventas del sistema a Google Sheets, y tiene que revisar prenda por prenda para saber cuales necesitan talleres terceros (crochet, recamado, teñido, pedreria) y cuales van directo a produccion interna.

> *"Yo me tomo el tiempo de revisar venta por venta que es de talleres terceros y es cuando empiezo a programarle a los terceros."*

**Como funciona:** Juliana carga la exportacion del dia. El sistema lee cada venta, identifica automaticamente que prendas necesitan procesos terceros (por referencia y tipo de diseño), separa las internas de las externas, y genera el plan de produccion del dia organizado por taller y por fecha de entrega.

**Ejemplo:** Hoy Juliana revisa 15 ventas una por una durante 30-40 minutos. Despues, el sistema le entrega en segundos: "5 prendas para Marta (crochet), 3 para Ferney (teñido), 2 para Adri (recamado), 5 directas a produccion interna."

**Impacto estimado:** ~4 horas/semana recuperadas

---

### 2. Coordinador de Terceros
**El problema:** Despues de clasificar, Juliana tiene que escribirle a cada artesano por WhatsApp: mandarle la imagen del diseño, explicar la prenda, dar la fecha limite. Todo manual, prenda por prenda, taller por taller.

> *"Le mando imagen porque me gusta pues todo mas claro, tengo este top, por decirlo asi, de crochet para esta fecha."*

**Como funciona:** Partiendo del plan de produccion, el sistema genera automaticamente el mensaje para cada taller tercero: lista de prendas asignadas, imagenes de referencia, fechas de entrega, y notas especiales. Juliana solo revisa y envia.

**Ejemplo:** En vez de escribir 4 mensajes diferentes buscando imagenes y datos, el sistema le genera: "Marta: 1 top crochet ref. 045 (imagen adjunta), entrega 15 abril. 1 blusa crochet ref. 078 (imagen adjunta), entrega 17 abril."

**Impacto estimado:** ~2 horas/semana recuperadas

---

### 3. Tablero de Seguimiento
**El problema:** Juliana lleva el control en hojas de Google Sheets separadas por taller: una hoja para Marta, otra para Adri, otra para Ferney. Anota cuando envio y cuando recibio. No hay vision general, no hay forma rapida de saber que esta pendiente.

> *"Por ejemplo una hojita con el nombre del taller tercero, por ejemplo Adriana Pedreria, le mande un top alta en esta fecha, listo se lo mande y cuando me llegue le pongo la fecha cuando llego."*

**Como funciona:** Un tablero centralizado donde se ve todo de un vistazo: que prendas estan con que taller, fecha de envio, fecha esperada de retorno, estado actual, y flujos secuenciales (ej: crochet → pedreria). Los comerciales tambien pueden consultar el estado de un pedido sin tener que preguntarle a Juliana.

**Ejemplo:** Gio pregunta "¿como va el pedido de la clienta X?" En vez de que Juliana revise 3 hojas diferentes, el tablero muestra: "Ref 045 — Crochet (Marta): entregado 10 abril. Siguiente: Pedreria (Claudia) — pendiente."

**Impacto estimado:** ~3 horas/semana recuperadas (incluye tiempo de los comerciales preguntando)

---

### 4. Alarma de Atrasos
**El problema:** Juliana no tiene forma de saber que algo se atraso hasta que un comercial le reclama. No hay alertas, no hay fechas limite visibles, todo depende de su memoria.

> *"Necesito un sistema que me alarme."*
> *"Por esa tira se atraso, el cliente llamo... se enojo y 'devuelvame la plata'."*

**Como funciona:** Cada mañana, el sistema revisa automaticamente todos los pedidos en proceso y genera un reporte de alertas: que pedidos estan atrasados, cuales vencen hoy, cuales vencen mañana. Le avisa a Juliana antes de que el comercial le reclame.

**Ejemplo:** "ALERTA: 2 prendas con Marta llevan 3 dias (limite era 2). 1 prenda con Ferney vence hoy. 3 prendas sin novedad." Juliana llama a Marta antes de que se acumule el problema.

**Impacto estimado:** Reduccion directa de atrasos y devoluciones. Cada devolucion evitada = $50.000-$150.000 COP recuperados.

---

### 5. Procesador de Pedidos Mayoreo
**El problema:** Los pedidos de tiendas (B2B) llegan en papel y se procesan completamente a mano. Juliana hace el mismo trabajo que con las ventas individuales, pero sin ninguna ayuda digital.

> *"Al por mayor si es mas analogo... me entregan la orden y yo ya empiezo a recibir y ya empiezo a hacer lo mismo."*

**Como funciona:** Juliana carga la orden de compra mayorista (foto o archivo). El sistema la digitaliza, identifica las prendas, cantidades, referencias, y la integra al mismo flujo de produccion: clasifica que va a terceros, que va a produccion interna, y alimenta el tablero de seguimiento.

**Ejemplo:** Llega una orden de 30 prendas en papel. En vez de copiar a mano, el sistema extrae: "10 tops crochet, 8 blusas recamado, 12 faldas internas" y las programa automaticamente.

**Impacto estimado:** ~2 horas/semana recuperadas + visibilidad total sobre pedidos mayoristas

---

## Impacto Total
- **Horas semanales recuperadas:** ~11 horas
- **Procesos que dejan de ser manuales:** Clasificacion de ordenes, coordinacion con terceros, seguimiento, alertas, digitalizacion B2B
- **Tu equipo se enfoca en:** Produccion, calidad, atencion al cliente, diseño de nuevas colecciones
- **Riesgo que se elimina:** Olvidos que generan atrasos, devoluciones y clientes perdidos
