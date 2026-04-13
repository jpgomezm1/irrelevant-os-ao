# Procesos Inteligentes Recomendados para MAAS 3 Ingenieros

## Esto es lo que vamos a dejar funcionando

### 1. Hub de Documentos de Obra
**El problema:** "Son cosas super manuales que podria hacer cualquier persona literalmente... simplemente con unas indicaciones iniciales y con un ejemplo." Hoy se gastan ~10 horas al mes generando documentos: informes de avance, presupuestos, contratos, emails para clientes.

**Como funciona:** Un solo comando `/documentos` que te pregunta que necesitas generar:

- **Informe semanal de avance** — Le das notas del avance y fotos, genera el informe completo con plantilla de MAAS 3: avance por partida, porcentaje de ejecucion, fotos, observaciones y proximos pasos.
- **Presupuesto de obra** — Le das tipo de obra, area y especificaciones, genera presupuesto con desglose por partida en ambas modalidades (todo costo y administracion delegada).
- **Contrato de obra** — Le das datos del cliente y modalidad, genera contrato con clausulas segun tipo de proyecto.
- **Email de envio** — Genera email profesional para acompanar cualquier documento que le envies al cliente.

**Ejemplo:** Hoy David abre Gemini, le pega notas, corrige, itera 1 hora. Despues: escribe "/documentos", elige "informe de avance", le da 3 bullet points y 4 fotos, y en 2 minutos tiene el informe listo con formato profesional.

**Impacto estimado:** ~10 horas/mes recuperadas

---

### 2. Comparador de Cotizaciones de Proveedores
**El problema:** En administracion delegada, se reciben cotizaciones de multiples proveedores (pisos, cocinas, muros) y hay que compararlas para presentarlas al cliente en comite de obra. Proceso manual con cada contratista.

**Como funciona:** Le cargas 2-4 cotizaciones de proveedores para el mismo trabajo, y el sistema las compara automaticamente: precio, alcance, tiempos, garantias. Genera un cuadro comparativo claro para presentar al cliente con recomendacion.

**Ejemplo:** "/comparar-cotizaciones" + 3 PDFs de proveedores de pisos genera cuadro comparativo con precio/m2, marca, tiempo de entrega y recomendacion para el comite.

**Impacto estimado:** ~2 horas/mes recuperadas

---

### 3. Facturacion
**El problema:** La facturacion se hace manualmente para cada proyecto, cada corte de obra o cada entrega parcial. Calcular valores, IVA, retenciones y generar el documento toma tiempo.

**Como funciona:** Le das el proyecto, el periodo o concepto a facturar, y el sistema genera la factura estructurada con todos los datos: razon social de MAAS 3, datos del cliente, concepto, valores, impuestos y condiciones de pago.

**Ejemplo:** "/factura Casa Lopez, corte de obra #3, $45.000.000" genera factura profesional lista con IVA, retencion y datos de pago.

**Impacto estimado:** ~2 horas/mes recuperadas

---

### 4. Generador de Cronograma de Obra
**El problema:** Cada proyecto necesita un cronograma con fases, duraciones y dependencias. Armarlo manualmente toma tiempo y actualizarlo segun el avance real es un dolor de cabeza.

**Como funciona:** Le das el tipo de obra, alcance y fecha de inicio, y el sistema genera un cronograma con fases tipicas de construccion, duraciones estimadas, dependencias entre actividades y ruta critica. Tambien puede actualizar el cronograma con el avance real para mostrar desviaciones.

**Ejemplo:** "/cronograma Remodelacion apartamento 80m2, inicio 15 abril" genera cronograma con: demolicion (1 semana), obra gris (3 semanas), instalaciones (2 semanas), acabados (3 semanas), entrega (1 semana).

**Impacto estimado:** ~3 horas/mes recuperadas

---

### 5. Actas de Comite de Obra
**El problema:** En cada proyecto de administracion delegada hay comites de obra periodicos con el cliente donde se toman decisiones: aprobacion de contratistas, cambios de alcance, aprobacion de materiales. Hoy esas decisiones quedan en WhatsApp o en la cabeza de alguien.

**Como funciona:** Despues del comite, le das las notas o le cuentas que paso, y el sistema genera el acta formal: asistentes, temas tratados, decisiones tomadas, compromisos con responsable y fecha, y proxima reunion. El acta queda como respaldo legal y operativo.

**Ejemplo:** "/acta-comite Casa Lopez" + "se aprobo proveedor de pisos Ceramicas ABC por $12M, el cliente pidio cambiar el color de la cocina, proxima reunion en 2 semanas" genera acta profesional con todo estructurado.

**Impacto estimado:** ~3 horas/mes recuperadas

---

### 6. Procesador de Facturas de Proveedores
**El problema:** Los proveedores mandan facturas en fotos, PDFs, formatos diferentes. Alguien tiene que abrir cada una, sacar los datos y pasarlos a un Excel para llevar el control de costos del proyecto. Con 4 obras activas y multiples proveedores por obra, son decenas de facturas al mes.

**Como funciona:** Le cargas la foto o PDF de la factura del proveedor y el sistema extrae automaticamente: proveedor, NIT, numero de factura, fecha, conceptos, valores, IVA y total. Todo se organiza en un Excel acumulado por proyecto, listo para contabilidad o para mostrar al cliente en administracion delegada.

**Ejemplo:** "/procesar-factura Casa Lopez" + foto de factura de Ceramicas ABC → extrae todos los datos y los agrega al Excel de costos del proyecto. Al final del mes tienes el consolidado completo sin digitar nada.

**Impacto estimado:** ~4 horas/mes recuperadas

---

## Impacto Total
- **Horas mensuales recuperadas:** ~24 horas/mes
- **Costo recuperado:** ~$1,680,000 COP/mes ($70,000 x 24 horas)
- **Procesos que dejan de ser manuales:** informes de obra, presupuestos, contratos, emails, comparativos de proveedores, facturacion, cronogramas, actas de comite, procesamiento de facturas de proveedores
- **El equipo se enfoca en:** ejecutar obras, captar clientes, estructurar proyectos propios
