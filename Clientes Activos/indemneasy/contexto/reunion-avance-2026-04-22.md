# Reunión de avance — Indemneasy

**Fecha:** 22 de abril de 2026
**Tipo:** Reunión semanal de avance (Core Layer producción)
**Participantes:** Sara (Irrelevant), Juan (equipo técnico Irrelevant), Juanda (Indemneasy), Nicolás (Indemneasy), Simón (Indemneasy)

---

## Resumen rápido

Presentación de avances técnicos del agente IA para Indemneasy:
- **Migración de infraestructura:** De DigitalOcean a Google Cloud (mayor estabilidad, seguridad, escalamiento automático, reducción de latencia desde >2 min hacia respuestas más rápidas).
- **Procesamiento de notas de voz:** El agente ya acepta audios; se probó en vivo y funcionó bien.
- **Respuestas rápidas de WhatsApp mapeadas:** El agente ya conoce y usa las respuestas rápidas internas del equipo.
- **Trazabilidad:** Se implementó registro de decisiones y razonamientos internos del modelo para debugging y validar estabilidad.
- **Prueba en vivo:** Se hizo un test del flujo (accidente de moto → fechas → lesiones → cirugía → póliza). Respondió bien en la interfaz pero no cargó en Telegram (bug identificado, en corrección).

## Pendientes técnicos identificados en la call

1. **Fix Telegram:** El agente responde en la interfaz pero los mensajes no llegan a Telegram — Juan lo está corrigiendo y despliega la versión actualizada después de su clase.
2. **Fix versión actual:** La versión desplegada es una anterior a la última (la última tiene fixes de: respuestas muy largas/redundantes, repetición de preguntas, tono alineado con atención al cliente de Indemneasy).
3. **Fechas:** El modelo tiene corte de conocimiento a sept 2023 — se está configurando para que use fechas correctas.
4. **Pruebas unitarias caso por caso:** Mapear todos los flujos como árbol de decisión, barrer rama por rama para identificar errores.

## Request clave del cliente (Juanda)

**Propuesta de dashboard de revisión de leads:**
> Que exista una vista donde el equipo pueda entrar y revisar caso por caso un resumen pre-clasificado por la IA (fecha, lesiones, cirugía, atención SOAT, cantidad de vehículos, responsable) y dar "aceptar o no" antes de que el proceso automatizado continúe hacia la generación de poder y contrato.

**Motivación:** Riesgo de firmar casos que no calificaban por error de clasificación del LLM. Ejemplo que salió en la prueba: el agente clasificó como "responsable identificado" basándose solo en lo dicho por el cliente — pero el informe policial podría decir otra cosa.

**Respuesta del equipo Irrelevant (Juan):** La arquitectura es híbrida — el LLM solo captura información y hace preguntas; la **clasificación del lead la hace un programa en Python determinístico con ponderaciones**, no el modelo. Los puntos de error se concentran en la captura de información, y ahí es donde se trabaja para minimizar. Aun así, se puede evaluar agregar la vista de resumen + validación humana.

**Acción:** Evaluar implementar un resumen visible + botón de validación humana antes de continuar el flujo automatizado hacia poder/contrato.

## Feedback del cliente sobre metodología

- Juanda preguntó si debe mandar screenshots de todos los errores que encuentra. Sara respondió: pueden probar si quieren pero **no es su responsabilidad** — el equipo Irrelevant hace las pruebas internamente. Iterar el agente hasta el final es parte del proceso, no es señal de que no funcione.
- Se reforzó que en las primeras semanas **habrá errores porque aún no se montan contratos, fechas, etc.** No preocuparse — es parte del proceso de pulido.

## Cambio de horario de la reunión semanal

**Juan tiene clase los miércoles a esta hora.** Se movió la reunión:
- **Nuevo horario:** Jueves a las 10:00 AM
- Ana (?) la reagenda.

## Próximos pasos

1. Juan despliega versión actualizada hoy mismo y comparte link de Telegram funcionando.
2. El equipo Irrelevant sigue probando caso por caso (árbol de decisión).
3. Próxima reunión: **jueves 30 de abril 10:00 AM** (a confirmar por calendario).
4. Mantener envío del documento de avance antes de cada reunión semanal.
5. Evaluar dashboard de validación humana pre-generación de poder/contrato.

---

## Transcripción completa

Hola, perdón, no había visto que estaban en la sala de espera.
Hola, ¿Qué tal?
¿Cómo vas?
Bien, bien ¿Y tú?
Todo súper. Ya va a entrar ¿Cuando? También que está desplazándose porque él tiene clase pero ya entra.
¿Listo?
¿Simón también va a entrar hoy o te lo mostramos a ti?
Si, no, él está aquí, ya se va a conectar.

Lice una. Yo voy a ir abriendo como lo que les tengo que mostrar hoy. Hola, Ya leí a Juanda que no entiendo que, pero creo que ya está acá. Bueno, pudieron ver antes como el documento pues igual vamos a revisar acá pero por si tienen como preguntas mientras tanto. Igual yo sé que lo mandamos antes de la reunión, la idea es que lo revisen pues después, pero por si lo habían visto por encima.

¿Si, no, yo lo estuve viendo y lo de la migración pues como de la nube a otro, lo más complicado. Esta vez otro lado pero yo quería ver eran cosas como por ejemplo el frontend que pues no me carga, no me está cargando.

¿O sea esto no te carga?
No, no me estaba cargando.
Bueno, si algo ahorita te volvemos a mandar el link porque a nosotros nos ha cargado bien, pero te lo mando. Listo.

Y no, pues tuve conversaciones también con el agente, va llegando a cierto punto pues en una conversación conmigo y en otra que tuve con el celular. Si se quedó.

Sí, obvio, porque es que, o sea, lo que yo quiero como quede súper claro es como nosotros estamos hablando en la gente pero eso pues es de iteración, ¿Cierto? A la Juanda, es decir, entonces la idea es como que se vaya probando con específicos pero la gente no funcionaron excelente como hasta el final, entonces que como súper claro la idea es uno ir iterando de la gente no queda listo pues como en las primeras semanas también para quede como claro cómo funciona el proceso y eso, para que no piensen que no pues no está funcionando o algo así. Listo.

¿Bien o no?
Súper, súper.

Perdón la demora, estoy saliendo de clase. Y tenía que moverme a un lugar Internet, no sé si me están escuchando.
Sí. Listo, entonces vamos a hablar un poco de los cambios que realizamos. No sé si quieres que abra el documento.
Estamos mirando. OK, Listo.

### Migración a Google Cloud

Bien, entonces nosotros antes teníamos desplegado el modelo en un servidor que se llama DigitalOcean, entonces nosotros hicimos unas pruebas de latencia de velocidad del modelo, estaba un poquito lento, más o menos estaba demorando un poco más de dos minutos en responder, entonces decidimos hacer una migración a un sistema más robusto, con mayor estabilidad que se llama, que es de los servicios de Google. Entonces este proyecto, este proceso es bastante ventajoso en términos de, como les digo, estabilidad y velocidad y acá pues en el documento dejamos explícito cada uno de los puntos que se realizaron, suena un poco técnico, realmente se coloca en el documento porque es parte de los avances que se realizaron, pero básicamente lo que es que una migración completa de todo el modelo a una nueva plataforma y está detallado.

Lo hace más rápido. Y también no sólo más rápido, sino lo que pasa es que a veces cuando los servidores se saturan, se caen, entonces cuando se caen esos servicios generan a veces que los modelos fallen y toque otra vez volver a configurar todo.

Entonces por ejemplo, digamos un servidor que se puede tener es un servidor local. Y cada vez que yo lo apague o prenda el computador va a tocar reiniciar todo, entonces nosotros lo trasladamos a los servicios de Google porque sabemos que son mucho más estables, entonces con eso nos aseguramos de que no se va a caer y también incluso si hay más tráfico de clientes por el chat, digamos un día que tuvieron, no sé, el doble de clientes, entonces el sistema es dinámico, entonces se amplía o se reduce para simplemente utilizar lo que el modelo necesita sin gastar de más y es completamente autónomo.

Entonces son ventajas por este lado. OK, listo. Y acá les muestro pues como que es cada cosita. Disponibilidad y resiliencia, escalamiento automático, esto puede ser técnico, pero la idea es que sepan literal qué se está haciendo, aunque no se entienda muy bien, para que vean como los avances literal súper claros.

Igual si tienen preguntas, interrumpo. Sara un momento y es que otra ventaja de este sistema es la seguridad, porque Google Cloud activamente trabaja en términos de seguridad y su credibilidad se basa en toda su infraestructura. ¿Entonces qué pasa? Que no solo el modelo tiene capas de seguridad programadas por nosotros, sino encima sobre la nube también tiene capas de seguridad muy robustas, entonces todo lo que son datos e información de los clientes va a estar bien protegido.

Y acá está el punto de escalamiento que yo les mencionaba, si el tráfico disminuye o aumenta, el sistema se adapta solo para consumir solo lo que se necesita. Entonces no se está pagando de más por una infraestructura que no se está utilizando siempre. Entonces eso lo hace mucho más robusto.

Acá lo que se menciona son más aspectos técnicos de la infraestructura en sí. El backend, como les mencionaba, ese servidor que hace llamadas a través de una API al frontend. Entonces acá estamos detallando un poco más los procesos que se realizaron. Ustedes también podrían coger este documento y pasárselo a Claude y hacerle preguntas sobre detalles puntuales que tengan y nosotros los vamos respondiendo a medida que vayan surgiendo las preguntas.

Entonces si quieres más información, como les digo, todo esto son cosas que se hicieron que voy a tratar como de mencionar como por encima, cosas que sean importantes. Pero digamos que este proceso del deploy es un proceso bastante completo por toda la configuración que tiene por detrás. Está la especificación de todo eso.

### Procesamiento de notas de voz

Si quieres bajemos donde están. Está explicado en palabras también cosas que han mejorado. Si quieren tómense unos minutos para leerlo para que vean un poco cómo funciona. La vez pasada hemos hablado del procesamiento de notas de voz. Entonces nosotros lo que hicimos fue adaptar toda la infraestructura con un sistema que puede reconocer audio también. Entonces el modelo ya le podemos mandar notas de voz. Ahorita lo vamos a probar el agente directamente en tiempo real mandando audios también. Está detalles de qué tecnologías utilizamos, de qué configuraciones implementamos.

### Respuestas rápidas de WhatsApp mapeadas

Si quieres Sara, puedes seguir. Y la vez pasada hablamos de esa información contenida en las notas rápidas de WhatsApp. Entonces ya todas esas las mapeamos al agente, las conoce y las utiliza activamente.

¿Listo?
Sí, yo vi que las está usando.
Sí, acá ya lo estás probando.
Sí, lo he estado probando. Lo que le decía Sara, lo probé. Uno se me quedó cuando ya le comencé a preguntar de póliza, pues me imagino que porque todavía no la sabe. El otro se me quedó creo que por la fecha del accidente, no sé.

Sí, sí, sí, el tema de la fecha sí es un caso que nosotros contemplamos. El tema es que el agente, o más bien los modelos, particularmente este que estamos utilizando, tiene información hasta septiembre del 2023. Entonces para él generalmente estamos en el 2023 entonces estamos configurándolo para que utilice las fechas correctas.

### Versión desactualizada vs versión actual

También hay una cosita y es que esta versión que ustedes están viendo es una versión, no sé cómo decirlo, que está una versión atrás de la actual. Y la razón por la cual no está subida la última última versión es porque me toca corregir un error que está teniendo, entonces les presenté una anterior donde no apareció ese error, pero cuando ustedes hablan con el agente, él envía como párrafos de texto muy largos, entonces eso ya lo corrige en la versión actual. Es como más conciso y no es redundante y utiliza el tono con los que ustedes usualmente atienden a los clientes de Indemneasy.

Hay veces que le pasa también es que como que vuelve a enviar la misma pregunta, entonces yo como que le dije como ya te dije que ya te dije lo que era pues porque pronto hay clientes que son así, entonces para ver qué hacía ese error también está solucionado en la versión actual. Ahorita yo tengo clase un ratico más y subo la versión actual y les comento directamente a ustedes para que lo prueben, OK?

Y no, y sí ya la otra fue que yo le pregunté sobre el contrato que tenía unas dudas y ya. Pues me dejó todas esas cosas que vas encontrando, ¿Podrías mandarnos por favor como le puedes tomar una captura y me la mandas a mí o en el grupo.

Igual con eso pues obviamente es porque ustedes lo están probando, pero nosotros igual internamente estamos haciendo pruebas entonces los errores se van a encontrar y como les decía, el agente se va puliendo pues nosotros vamos como llevando el agente como hasta el final de la conversación entonces en esta primera parte siempre van a haber errores, o sea porque no se ha montado el tema de los contratos, el tema de las fechas no se ha organizado, entonces por eso necesitamos como este tiempo ni siquiera es porque no esté funcionando, sino porque uno tiene que pulir al agente hasta el final solamente como para que eso quede también súper claro, pero todos los errores al final van a quedar corregidos pues.

No se preocupen así no, yo decía también si se pueden tener en cuenta desde ya pues como. Yo lo que digo es trabajo a ustedes porque me da pena también como que hay que nos manden un montón de screenshots, o sea igual súper rico si lo prueban porque al fin y al cabo ustedes conocen su proceso, pero para que queden tranquilos que si en algún momento no tienen el tiempo, nosotros lo vamos a hacer igual, o sea, es como nuestro trabajo encontrar esos errores, entonces también para que queden tranquilos por esa parte.

### Metodología de pruebas: árbol de decisión

De todos modos, uno de los mecanismos que estamos utilizando, y es algo que no sé si está en el documento, ¿Puedes bajar un poco más?

No, no, les iba a contar, nosotros lo que estamos haciendo es definiendo todos los flujos con todas las opciones en cada punto. Por ejemplo, si me preguntan por un documento y yo en vez de darles el documento le hago una pregunta a ver si el agente se confunde, si responde bien, estamos haciendo pruebas y esas pruebas son unitarias, una por una tenemos que ir caso por caso empezando a probar si el agente está funcionando bien y en el caso que no, buscar alternativas de qué podemos hacer para que funcione. Ahorita la estructura está montada, el paso que sigue es empezar a probar uno caso por caso, un árbol que es un machine learning, se llama como árboles de decisión, entonces vamos a mapear todos los flujos en ese árbol, vamos a ir como rama por rama, barriendo todas las opciones, encontrando errores y solucionamos todos esos detallitos que van encontrando.

Yo lo voy a ir probando y voy a tratar de poner el mayor número de gente, porque es que como todos tenemos conversaciones diferentes. Claro, y que ustedes también tienen información en la cabeza de casos específicos que de pronto no hemos contemplado, entonces nos sirve también eso.

La otra también es poner gente vieja, pues, porque igual nosotros hablamos también hasta diferente, pues puede que un señor o algo así que vaya probando también.

### Trazabilidad

No sé, algo más del documento, pues que esos beneficios operativos de integración, eso. Sí casi no lo entendemos.

El tema de la eficiencia operativa ya lo hablamos un poco de los cambios que implementamos, que funcionan mejor, los procesos son más rápidos, ahorita lo van a ver de todos modos, cuando probemos el agente. Y habían unos casos que no habíamos incluido en los procesos que hemos ido completando.

Y la trazabilidad es un proceso que nos ayuda a hacerle como un seguimiento al agente, o sea, en cada parte el agente tiene que tomar decisiones cada parte del flujo, pero para nosotros, o sea, para nosotros incluso como programadores es una caja negra porque si nosotros no vemos el razonamiento que el agente está haciendo para tomar esas decisiones, si falla o si responde bien, no sabemos si es reproducible el error o se va a mantener estable en sus respuestas. Entonces la trazabilidad es como un registro en donde se va guardando cada una de las decisiones y razonamientos internos del modelo y nosotros en base a eso miramos si esa respuesta estable, si los errores no son reproducibles en ese sentido.

### Prueba en vivo

Entonces no sé si pasamos a hacer unas pruebas directamente. De una entonces ¿Comparto Telegram o qué?

Lo que le decía que no me está el front no me está pues como cargando, si tienen otro link de pronto. ¿Pues eso, mira lo que pasa en él antes de que compartan si quieres. Espérate yo me vuelvo la llamada.

Juanda que no le está saliendo la interfaz a él, yo no sé por qué, a mí me sale súper bien, ¿Les mando como este nuevo link o qué? Por favor, a ver, espérate si quieres te va a mandar ya por el grupo a ver si te abre la interfaz. Listo, súper, no sé si de pronto el otro link como que no se actualizó bien pero.

Listo, entonces el agente listo. Banda, bueno, tú me vas guiando. ¿Le hago las preguntas normales pues? Sí, entonces empieza preguntándole, empieza le contando que tuviste un accidente como hola, tuve un accidente de tránsito acá y necesito ayuda. Si él por ejemplo pide más información no da nada ¿cierto?

Sí, sí, sí, o sea, si pide más información ustedes como les dije, nosotros tomamos las respuestas que ustedes tienen en WhatsApp, las respuestas rápidas y me parece que una de esas respuestas es "más información", entonces el agente debería poder hacerlo. Lo que les digo es como la versión, la versión actual está desactualizada pero podemos probar cómo responde para mirar eso. Como les digo las respuestas van a ser un poco largas pero eso ya está arreglado.

¿Y se está demorando mucho? Más o menos se demora como un minuto. Y este tema, la latencia es como la velocidad de respuesta, pero la latencia no sólo corresponde al programa en sí, sino también a la API. Entonces la API actualmente nosotros qué podemos hacer? Nosotros lo que hacemos es desde la parte de infraestructura construir un mecanismo que mande la respuesta lo más rápido posible, pero la API son cosas ya de los servidores internos OpenAI.

¿Entonces aparece por Telegram o en WhatsApp también va a ser así? No, no, la idea es que, espérenme que no. Ahora sí. ¿A ti te estaba funcionando ahorita Nicolás? Sí, a mí también. No entiendo, voy a mirar acá porque ya sí está. O de pronto es otro link.

Juanda, dime si me manda del otro. Porque mira que yo no llegué acá, mira que mi conversación no llegó a este link, pues acaba de aparecer la de Sara y la mía no. ¿A cuál? Pues al nuevo. OK, a esto pues el link que me diste de la interfaz aparece tu conversación, pero las que yo tuve no, seguramente otro link.

También de pronto Juanda mira por qué acá está respondiéndome normal. ¿Dónde te está respondiendo? Pues en el, o sea no sé si es que tengo otro link, pero está respondiéndome acá normal en la interfaz pues como de Indemneasy. "Mira, entiendo que es una situación difícil para ti, es un evento que te sientas apoyado en este momento..."

Si está raro, estoy acá tratando de corregirlos. ¿O sea el mensaje no te está cargando esa Telegram directamente? Sí, pues sí está respondiendo pero no me está cargando en Telegram pues.

Intenta, podrías probar por un audio diciendo como por ejemplo iba manejando mi moto por la calle 80, trata de darle una dirección así como en palabras que sea como difícil de capturar, a ver si para que veamos cómo responde entonces.

Con 68 un carro me chocó por detrás inicial. "Iba manejando mi moto por la calle 81 carro me chocó por detrás en el semáforo así." Pero te faltó 80 con 68, pero okay, I got a man there. Pues iba manejando, estás viendo qué fecha ocurrió el accidente, o sea acá sí está respondiendo bien, creo que faltó conectarlo con Telegram, pero está bien, o sea está respondiendo, o sea como que las respuestas no están viendo en Telegram, pero sí está respondiendo, entonces para que corrijamos eso.

Me tocaría, mira porque no conectó. ¿Respóndele, respóndele dale la fecha Sara? Yo que sigue? Listo, díganme una fecha, no sé cuál poner. 20 de abril de 2025.

Igual entonces lo de los audios si está funcionando entonces está bien también. Listo, ya me respondió. ¿Qué lesiones te causó el accidente? ¿Requirió cirugía? Le respondo normal. OK, vamos a ver, díganme una lesión pues o algo como. Me partí el brazo y sí requiere.

Listo, sí, eso es lo que generalmente piden ya luego cierto, pues el tema de los documentos. Bueno, ustedes no piden foto del accidente como tal, ¿cierto? No, pero. Bueno, sí porque ustedes me dijeron que eso les ayuda después como para la reclamación, pero. Pero solamente cuando el caso es de póliza. Solamente cuando el caso es de póliza, de resto no, por ejemplo después de me partí el brazo. Bueno, me partí el brazo y si requiere cirugía ya seguiría si la atención médica o por SOAT.

OK, le voy a poner como no tengo. OK, o ya pues dime. Si no tengo.

Bueno, entonces igual como saben esto es la primera prueba era para que vieran cómo está funcionando y la idea es como ya tenemos las respuestas que ustedes usan y la cosa de WhatsApp entonces ya se empieza a pulir qué tiene que responder después de cada cosa pues digamos lo que tú me dices de la póliza y demás, o sea al menos ya esta sería conectarlo con Telegram, pues igual eso no va a quedar.

Yo ahorita ya encontré el error pero desplegarlo tomó un tiempito entonces no creo que alcance a desplegarlo para mostrárselos, de todos modos podemos probarlo en la interfaz, sin embargo ya me pongo a trabajar en [ello].

Sí, no, tranqui, pues igual los avances pues están bien y es lo que habíamos mandado en el documento pues como lo del audio, todo y ya sería que nos muestres como pues igual les vamos mandando el link de Telegram para que ustedes lo sigan probando y seguimos como con estos avances.

Acá me dijo "¿Cómo? Tu caso fue un accidente mientras manejas tu moto y sufriste una fractura de brazo, podemos ayudarte con eso ya que hay un responsable identificado, nosotros nos encargamos de ese proceso, te cuento cómo funciona." Y ese responsable ¿cómo lo identificó? Por ejemplo.

No, pues me está diciendo que ya hay un responsable identificado en el sentido de que me chocó un carro por detrás, entonces sabe que hay un responsable. Tú dices, sí, yo dije, iba manejando moto y me chocó un carro por detrás en el semáforo, entonces sí, guardando el contexto de la conversación, entonces está súper bien, listo.

### Request de Juanda: vista de revisión humana de leads

No sé si ustedes tengan dudas igual, o sea, como algo para la próxima semana, no sé, pues díganme, también piensan.

**Juanda:** Sí, sabes qué, yo estoy pensando en algo a raíz de esto que nos están mostrando y es que de todas maneras, como es inteligencia artificial, yo creo que puede haber, como es la revisión de casos completamente diferentes, puede haber un margen de error en la calificación del lead, entonces no sé, por ejemplo, qué tan viable sea que esa inteligencia artificial, por ejemplo estuvo entonces hoy trabajando las 24 horas y tenga una pre-clasificación sobre todos los casos y al día siguiente se puede perder la inmediatez con la persona, pero que uno tenga la posibilidad de entrar a alguna parte y revisar caso por caso que diga todo pues, que diga todo, fecha, lesiones, cirugía o no, atención por SOAT, cuántos vehículos y que uno le tenga que dar aceptar o no para ver si puede que se equivoque. Por ejemplo aquí dijo que el responsable, pero fue a partir de lo que la persona dijo, creo que si el informe policial será diferente.

**Sara:** OK, o sea como que te muestre un resumen acá de [la conversación]. Y ya tú hagas...

**Juanda:** Que a partir de la información y de las preguntas que le hicimos, que generalmente pues esas preguntas permiten identificar qué tipo de caso es, sí, como que tenga el resumen de la información, entonces fecha del accidente, ciudad, cuántos vehículos hubo involucrados, tipo de lesión, cirugía o no, que es la respuesta a las preguntas que hacemos, que uno tenga la posibilidad de ver esas respuestas y como validar si efectivamente sí, porque estaríamos cometiendo un error muy grande donde empiece, porque va a estar automatizada hasta la generación del poder y el contrato, entonces empecemos a firmar por ejemplo un montón de gente que por algún motivo no era.

Pues ya sí un caso de estos, ella va a tener los criterios, va a llegar el punto en el que va a tener los criterios establecidos así como los tiene uno, ¿qué margen de error hay de que se equivoque, por ejemplo, en la clasificación? Es probable que pueda pasar.

**Juan:** Hay formas de mediar esa incertidumbre de los modelos y es que nosotros la estructura que utilizamos es híbrida con Python, entonces nosotros utilizamos el LLM, el modelo para capturar la información y para hacer preguntas, pero la clasificación no la va a hacer el modelo, la calificación del lead la va a hacer un programa en Python que por ejemplo podemos hacerlo ponderado, entonces tenemos una serie de parámetros que tienen cierta ponderación y cuando se cumplen suman o restan, es un ejemplo, entonces si cumple ciertas condiciones entonces eso lo hace un programa y ese programa es determinístico, siempre va a funcionar igual, entonces los únicos puntos de entrada de errores que podrían entrar serían a través del modelo cuando captura la información, entonces nuestro trabajo es delimitar bien qué información se está pidiendo y contrastarlo con lo que lo mande el cliente para minimizar el error, entonces aquí nosotros no le damos como tanto permiso al modelo de tomar decisiones sino las decisiones importantes se hacen con Python y lo que interpreta o comunica esas decisiones lo hace el modelo.

**Sara:** Igual podemos mirar el tema que tú dices como de que en el resumen —lo importante es lo que siempre hemos querido— como que en el resumen diga quién es el cliente, cuál fue el accidente, qué ha pasado y eso, pero lo que dice Juanda, o sea pues lo ideal, o sea y lo que nosotros construimos es que se minimicen esos errores al máximo para que a ustedes no les quede el trabajo de entrar otra vez, pues la idea de este modelo es como que no pase eso, que sea súper clara la comunicación y eso pues se va a ir puliendo y se va a ir viendo a medida que les mostramos el agente, entonces igual súper bueno pues como tener eso en el [radar].

Listo, no sé si tengan otra pregunta, igual nosotros pues como que les mostramos el link del agente, todo y la otra reunión le seguimos mandando el documento, avance y eso y nos van contando de una.

**Juanda:** Listo, no, súper claro, muchísimas gracias, todo súper bien, pues está más claro que nada. Sí, todo bien, listo, perfecto. Bueno niños mil gracias.

### Cambio de horario de la reunión

**Juan:** Perdón, quería comentarles, no sé si Ana ya les comentó pero si podríamos cambiar la fecha que realizamos esta para que no tenga problema con la clase, es que esa clase como que se la habían movido, había parado un tiempo y la volvieron a iniciar justo a esta hora, entonces ¿qué hora les queda fácil para organizar?

¿Puede ser si es el mismo miércoles, a qué hora te queda fácil Juan? Los miércoles me quedaría fácil en la tarde. O podríamos también tenerlo por ejemplo los lunes, no jueves. OK, porque el lunes no podemos. ¿A jueves? No mentiras los jueves sí, los jueves en la mañana después de las 9 podría. En el intervalo de 9, les parece jueves 10. Pues a las 10 de la mañana. Sí, sí, sí, de 9 a 11 estoy libre. Listo, entonces de 10 a 10 y media la podemos tener. Pues a las 9 bueno, mejor a las 10.

Listo, listo, perfecto, entonces ahorita la muevo y se las agendo para que la tengamos todos. Listo, bueno, perfecto, bien, bye.
