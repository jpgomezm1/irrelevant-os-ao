# Procesos Inteligentes Recomendados para Bless Handmade

## Esto es lo que vamos a dejar funcionando

### 1. Programador de Producción
**El problema:** Juliana llega cada mañana, exporta la lista de ventas del sistema a Google Sheets, y tiene que revisar prenda por prenda para saber cuáles necesitan talleres terceros (crochet, recamado, teñido, pedrería) y cuáles van directo a producción interna.

> *"Yo me tomo el tiempo de revisar venta por venta que es de talleres terceros y es cuando empiezo a programarle a los terceros."*

**Cómo funciona:** Juliana carga la exportación del día. El sistema lee cada venta, identifica automáticamente qué prendas necesitan procesos terceros (por referencia y tipo de diseño), separa las internas de las externas, y genera el plan de producción del día organizado por taller y por fecha de entrega.

**Ejemplo:** Hoy Juliana revisa 15 ventas una por una durante ~1 hora. Después, el sistema le entrega en segundos: "5 prendas para Marta (crochet), 3 para Ferney (teñido), 2 para Adri (recamado), 5 directas a producción interna."

**Impacto estimado:** ~4 horas/semana recuperadas

---

### 2. Coordinador de Terceros e Insumos
**El problema:** Después de clasificar, Juliana tiene que escribirle a cada artesano por WhatsApp (imagen del diseño, prenda, fecha límite) Y coordinar con proveedores de telas y flecos. Todo manual. Cuando el departamento de corte le avisa que se acaba una tela, tiene que hacer la orden de pedido manualmente y pasarla al proveedor.

> *"Le mando imagen porque me gusta pues todo más claro, tengo este top, por decirlo así, de crochet para esta fecha."*
> *"El departamento de corte me dice Juli, se nos está acabando estas telas, entonces yo ya realizo pues la orden de pedido y ya la paso al proveedor."*

**Cómo funciona:** Partiendo del plan de producción, el sistema genera automáticamente:
1. Mensajes para talleres terceros (prendas, imágenes, fechas)
2. Órdenes de pedido para proveedores de telas y flecos basadas en inventario
3. Alertas cuando un insumo baje del nivel mínimo

Juliana solo revisa y envía. Ya no tiene que redactar cada mensaje ni hacer órdenes manualmente.

**Ejemplo:** El sistema genera: "Marta: 1 top crochet ref. 045 (imagen adjunta), entrega 15 abril." + "ALERTA: Tela lycra negra bajo mínimo. Orden de pedido lista para proveedor XYZ: 15 metros."

**Impacto estimado:** ~3 horas/semana recuperadas (2h talleres + 1h insumos)

---

### 3. Tablero de Seguimiento
**El problema:** Juliana lleva el control en hojas de Google Sheets separadas por taller: una hoja para Marta, otra para Adri, otra para Ferney. Anota cuándo envió y cuándo recibió. No hay visión general, no hay forma rápida de saber qué está pendiente.

> *"Por ejemplo una hojita con el nombre del taller tercero, por ejemplo Adriana Pedrería, le mandé un top alta en esta fecha, listo se lo mandé y cuando me llegue le pongo la fecha cuando llegó."*

**Cómo funciona:** Un tablero centralizado donde se ve todo de un vistazo: qué prendas están con qué taller, fecha de envío, fecha esperada de retorno, estado actual, y flujos secuenciales (ej: crochet → pedrería). Los comerciales también pueden consultar el estado de un pedido sin tener que preguntarle a Juliana.

**Ejemplo:** Gio pregunta "¿Cómo va el pedido de la clienta X?" En vez de que Juliana revise 3 hojas diferentes, el tablero muestra: "Ref 045 — Crochet (Marta): entregado 10 abril. Siguiente: Pedrería (Claudia) — pendiente."

**Impacto estimado:** ~3 horas/semana recuperadas (incluye tiempo de los comerciales preguntando)

---

### 4. Alarma de Atrasos
**El problema:** Juliana no tiene forma de saber que algo se atrasó hasta que un comercial le reclama. No hay alertas, no hay fechas límite visibles, todo depende de su memoria.

> *"Necesito un sistema que me alarme."*
> *"Por esa tira se atrasó, el cliente llamó... se enojó y 'devuélvame la plata'."*

**Cómo funciona:** Cada mañana, el sistema revisa automáticamente todos los pedidos en proceso y genera un reporte de alertas: qué pedidos están atrasados, cuáles vencen hoy, cuáles vencen mañana. Le avisa a Juliana antes de que el comercial le reclame.

**Ejemplo:** "ALERTA: 2 prendas con Marta llevan 3 días (límite era 2). 1 prenda con Ferney vence hoy. 3 prendas sin novedad." Juliana llama a Marta antes de que se acumule el problema.

**Impacto estimado:** Reducción directa de atrasos y devoluciones. Cada devolución evitada = $50.000-$150.000 COP recuperados.

---

### 5. Procesador de Pedidos Mayoreo
**El problema:** Los pedidos de tiendas (B2B) llegan en papel y se procesan completamente a mano. Juliana hace el mismo trabajo que con las ventas individuales, pero sin ninguna ayuda digital.

> *"Al por mayor sí es más análogo... me entregan la orden y yo ya empiezo a recibir y ya empiezo a hacer lo mismo."*

**Cómo funciona:** Juliana carga la orden de compra mayorista (foto o archivo). El sistema la digitaliza, identifica las prendas, cantidades, referencias, y la integra al mismo flujo de producción: clasifica qué va a terceros, qué va a producción interna, y alimenta el tablero de seguimiento.

**Ejemplo:** Llega una orden de 30 prendas en papel. En vez de copiar a mano, el sistema extrae: "10 tops crochet, 8 blusas recamado, 12 faldas internas" y las programa automáticamente.

**Impacto estimado:** ~2 horas/semana recuperadas + visibilidad total sobre pedidos mayoristas

---

## Impacto Total
- **Horas semanales recuperadas:** ~12 horas
- **Procesos que dejan de ser manuales:** Clasificación de órdenes, coordinación con terceros e insumos, seguimiento, alertas, digitalización B2B
- **Tu equipo se enfoca en:** Producción, calidad, atención al cliente, diseño de nuevas colecciones
- **Riesgo que se elimina:** Olvidos que generan atrasos, devoluciones y clientes perdidos
