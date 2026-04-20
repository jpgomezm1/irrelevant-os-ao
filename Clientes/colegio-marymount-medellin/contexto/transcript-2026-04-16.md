# Transcript — Reunión Propuesta Ops Layer — Marymount

**Fecha:** 2026-04-16
**Tipo:** Reunión de propuesta Ops Layer (segunda reunión tras discovery 2026-04-10)
**Participantes:**
- VF1: Sara Garcés (Irrelevant)
- VF2: María Luisa Muñoz (Gerente Administrativa, Marymount)
- VM: Asistente del colegio (voz masculina, probablemente parte del equipo financiero)

---

## Transcript

VF1: Gmail.

VM: Eh, ¿en el correo? Gmail.

VF1: Gmail, listo. O sea, el correo que manda Olga a las familias es por Gmail. Pero con el dominio, pues, del Marymount.

VM: Ajá.

VF1: Listo. Y bueno, y me habías dicho que tienen, pues, el tema de conciliaciones manuales que les toma una jornada, las facturas que te toca aprobar a ti, la cartera, pues, como de toda la parte manual en cartera y el conocimiento de Dora que se va a pensionar, también incluimos como esa parte importante. Entonces, lo que nosotros vemos es que tienen herramientas muy buenas, pero que el pegamento entre esas herramientas es el humano. Entonces es difícil como trabajar así. Entonces, a partir de lo que vimos, nosotros, como ya te conté, no les vamos a hacer un software a la medida, sino que con lo que ya tienen se puede trabajar muy bien y con Claude les implementamos como esas mejoras. Entonces, casi que el proceso va a quedar, pues, como automatizado.

VF2: Eso es para todo lo que hablamos.

VF1: Dime.

VF2: Con Claude vamos a atacar tres procesos de lo que hablamos y uno de ellos con nosotros.

VF1: Exacto. Entonces ya te voy a explicar cada uno. Entonces, los tres procesos financieros que vamos a atacar con Claude es: conciliación bancaria, que es el cruce entre, pues, los extractos bancarios y los movimientos que ustedes tienen para revisar que todas las comparaciones estén bien; la aprobación de facturas, que a ti no te toque pasar por todas las facturas, sino que si hay dos facturas que están iguales, no hay necesidad de aprobación, pues como futura, entonces simplemente se aprueban y ya; y el cobro de cartera, que también se hace por medio del correo de Olga a los papás, ese correo se puede mandar a través de Claude. Entonces eso también lo vamos a revisar. Entonces, lo que nos gusta es que este trabajo, como es con Claude también, sigue siendo asistido. O sea, simplemente le estamos implementando inteligencia artificial a un proceso que ya está, y Claude nos permite también como que aprender de lo que ustedes vayan haciendo. Entonces, digamos que mezclamos lo mejor de ambos mundos. Y ya el dashboard financiero, que era el que habíamos hablado también con temas de presupuesto, ese sí se necesitaría un agente como más robusto, que es el de Opslayer.

Entonces, en el primer proceso, sería la conciliación bancaria. Entonces, básicamente cómo funciona es que el cruce mensual de las seis cuentas contra el extracto bancario, que hoy toma una jornada, la idea es que termine tomando más o menos 30 minutos, una hora. Entonces, lo que se espera es que el equipo descarga el extracto de, pues, del colegio, descarga el extracto de Logro y lo pone en una carpeta. Eso lo hace una vez al mes, solo lo tiene que hacer y ya Claude se encarga de hacer la comparación. Entonces lo que pasa es: si todo está perfecto, listo, aprueba la comparación, todo súper bien; si no, escala a un humano. Entonces dice: "Aquí hay errores, esto se tiene que revisar" y así. Entonces básicamente acá te dimos el paso a paso: el equipo lo descarga, descarga el movimiento en Logro, luego Claude lee ambos archivos, los cruza por fecha, monto y descripción, separa en tres grupos (si es un match perfecto, todo está súper bien; si es match con ajuste, les dice; y si es que no tiene match, ahí sí escala completamente el proceso). El equipo ya lo valida, lo corrige y Claude aprende de ese ajuste también que ustedes vayan a hacer y va, pues como aprendiendo para que a futuro también pueda ser como más cosas. Y acá, pues, se conecta pues a Logro, a Bancolombia, la carpeta del colegio y pasa pues a 30 minutos. Ese sería el primer proceso. Entonces, digamos que ya todo queda casi que automatizado. Lo único que ustedes tendrían que hacer es cargarle los dos archivos y ya él les devuelve todo perfecto.

VF2: Entonces, los dos archivos y ya si son varias cuentas, se hace lo mismo para cada cuenta.

VF1: Exacto, sí. Como que si son varias... Ustedes solamente tienen que descargar los archivos. Nosotros vamos a crear, o sea, la idea sería sentarnos con ustedes y crearles una carpeta compartida pues como en los que lo necesiten. Y en esa carpeta ya lo revisamos como ustedes lo quieran tener. Entonces: ¿lo quieren tener por grupos o lo quieren tener así, así? Entonces ya ustedes cada vez que lo vayan a descargar van a esa carpeta, montan el archivo y van a Claude y dicen: "/conciliación" y ya él hace todo el proceso y les dice: "Mira, tienes que revisar esta, esta y esta" y ya. Así sería el proceso más o menos. Igual, esta es una primera como acercamiento para que ustedes entiendan muy bien cómo funciona. Obviamente, si aprobamos el proceso pues y decidimos avanzar, ya nos sentaríamos ya con un plan súper detallado de cómo sería todo, pero funciona pues súper fácil.

VF2: Exacto. Eso es desde el conocimiento de ustedes, pues eso debería ser pilado.

VF1: Sí, pues, o sea, pilado en el sentido de que nosotros pues lo sabemos hacer y todo.

VF2: Exacto.

VF1: Pero, ajá, pero digamos que no es como fácil, sino que como ya existe la herramienta, nosotros lo podemos instalar, sabemos hacer el flujo, entonces queda súper bien. Listo. El siguiente proceso que habíamos hablado es el de aprobación contextual de facturas en Claude. Entonces tú me habías dicho que tú tienes que aprobar demasiadas facturas, te llegan, tienes que firmar, luego pasan por otra persona, entonces era un proceso pues como muy manual. Entonces lo que hace con... lo que hacemos con Claude es que él lee el correo administrativo donde llegan las facturas, extrae estos, pues, esta información, las compara contra el histórico del colegio (si es recurrente, si el monto coincide con el mes anterior) y contra el presupuesto (si cae dentro de un centro de costo asignado). Y ya a partir de ahí, entonces tenemos tres casos:

Auto-aprueba: si es recurrente, si tiene el mismo monto y está dentro del presupuesto. Entonces ahí lo único que hay que hacer es poner la firma de ustedes y ya deja el PDF firmado en la carpeta para causar. Y ustedes ya no tienen que volver a pasar por ahí.

Recurrente pero cambia el monto: notifica. O sea, les pregunta: "Mira, pasó de 4.2 a 4.5, ¿lo apruebo?". Entonces tú solo tienes que decir sí o no. Si dices no, listo, hay que revisar como qué pasó.

Y luego, si no es recurrente o fuera del presupuesto: pues se maneja como un flujo manual, porque ya sí toca pues que ustedes revisen más procesos digámoslo. Y te pregunto... o sea, si es recurrente, el mismo monto, está en presupuesto, ¿puede poner porque necesita dos firmas? ¿Las podría poner las dos firmas y puede hacer como la causación del Logro? Eso nosotros creo que nos podemos conectar a Logro, sí. O sea, tú dices es montar el documento solo.

VF2: Pues porque es que, o sea, todo cuando decimos... pues que allá al final vi "firma manual y después causación en Logro". ¿Eso es cuando no es o eso se hace manual todo, pues?

VF1: No, no, no. Cuando... si digamos cuando es esta parte de que no es recurrente o fuera del presupuesto, que es algo que tienen que revisar, ya sí saldría como del flujo de Claude, digámoslo así.

VF2: Exacto, porque es que, pues, este proceso, bueno, la firma es una parte, pero después esa factura pues ya me debe quedar en el sistema contable. En el sistema contable total. Entonces si la factura está bien, sería ideal que ¡pin! de una vez la monte en el sistema, pues y ya monte, haga como esa causación que es montar en el sistema contable: a esta fecha, a este proveedor, tun-tun-tun, okay.

VF1: Listo. Igual nosotros, Claude se puede conectar con Logro porque Logro tiene API. Ya tendríamos que revisar desde la parte de ellos si no hay problema. O sea, lo que te he dicho, nosotros desde nuestro lado no tenemos problema con conectarnos con Logro, entonces no creo que habría problema. Si hay algún problema o si hay que hacer algo adicional, miramos si sí es lo mejor hacerlo con Claude o si hacerlo con un agente ya propio de nosotros. Pero como nosotros lo estamos viendo desde ahora, lo más fácil sería hacerlo con Claude, pues. Pero yo no vería problema con que se conecte y pues haga la causación. Igual te resuelvo esa duda ahorita pues que hable con el ingeniero, te la puedo mandar también por WhatsApp.

Listo. Y ya la segunda es el cobro personalizado que me dices que es muy difícil cuando los papás no responden con el correo de Olga. Entonces simplemente lo que hacemos es: el equipo descarga el reporte de deudores de Phidias en Excel, Claude lee quién debe, cuánto debe y desde cuándo, aprende el tono de Olga a partir de sus correos históricos (entonces necesitaríamos como base de datos de eso), genera ese correo personalizado con el nombre del papá, la mamá, el alumno, el monto y el mes. Y en las primeras semanas la idea es que Olga revise cada correo para ver cómo están, o sea, para iterar sobre esos cambios, y cuando Claude ya aprenda y esté calibrado, pues ya simplemente se va a enviar el correo automáticamente con copia a Olga si es necesario. Y si ya no hay dos recordatorios, pues la idea es que Olga haga una llamada personal pues. Ya eso se revisaría también. Y esto se conectaría a Phidias a través del Excel, a Gmail y al correo pues de Olga. Esa sería la idea. Y el resultado sería pues como... o sea, ella está haciendo 360 correos al año más o menos, entonces la idea es que ya Claude se ocupe de ese proceso. Súper. ¿Acá tienes en este alguna duda o este sí está listo?

VF2: No, está bien.

VF1: Listo, de una. Listo, entonces esos son los tres procesos que haríamos con Claude. Y el último ya es el tablero financiero que habíamos hablado. Nuestra recomendación es... yo siempre te dije pues como que fuéramos paso a paso. Nuestra recomendación es: empecemos con Claude, como que seteemos los procesos, que todo quede súper bien, y ya a partir de ahí nos concentramos en el tablero financiero. Igual si tú dices: "Me parece prioritario, quiero empezar ya con los cuatro", se puede hacer también.

VF2: Sí, sí, sí, se puede.

VM: Sí, sí, sí.

VF1: Ajá. Entonces la idea sería ya después con el tablero financiero, la idea de nosotros es que tengan un tablero que haga todo el proceso pues mucho más fácil. Ya es un desarrollo a la medida que vive dentro del colegio también. Lo que hace es que ingiere el presupuesto anual desde Excel, lo sincroniza con Logro, visualización por centro de costo, bueno... y tú le puedes preguntar o cualquier persona cosas sobre ese presupuesto, sobre todos los datos que vayamos a conectar ustedes le pueden preguntar. Entonces, por ejemplo: "¿Por qué subió mantenimiento este mes?" o "¿Este número por qué cambió?", "¿Por qué esta variación?". Entonces ya es algo mucho más, digamos, personalizado también y ya tienen el tablero y el agentico ahí al lado que es como un asistente básicamente con los números. Y entonces sí, la idea es como sería empezar con esos también.

Entonces sí, pues digamos con Claude es muy bueno porque se los podemos entregar en dos semanas, genera valor inmediatamente y el equipo pues empieza a trabajar con él. Entonces la idea sería en esas primeras dos semanas se hace todo el desarrollo, ustedes nos dan acceso a todo, lo implementamos... Obviamente también dependemos del tiempo de ustedes, entonces la idea es que haya una persona como encargada de esto, que nos pueda dar acceso pues como a todo lo que necesitemos. Y luego de configurar los procesos, la idea es una capacitación con todas las personas que van a tener acceso como a esto nuevo que vamos a tener. Entonces una capacitación de tres horas, que todas las personas estén y les podamos explicar cómo funciona ese proceso. Y ya a partir de ahí tenemos un mes entero de soporte. Entonces nos pueden escribir cuando sea como: "Mira, esto me parece que lo deberíamos cambiar" o "Siento que esta respuesta se podría mejorar", "¿Podemos agregarle esto?". Entonces ese primer mes el soporte está incluido, ya a partir de ahí pues tiene un costo adicional, pero la idea es que ya quede pues súper funcional cuando ustedes lo tengan. Y lo único que habría que pagar adicional es la suscripción de Claude, que serían 100 dólares al mes para que funcione súper bien. Nosotros con estos tres procesos iniciales calculamos que 100 dólares les va a alcanzar. El siguiente plan sería 200 dólares, pero nosotros tenemos 200 y ni siquiera nos lo acabamos a veces. Entonces no creo que sea necesario, pero igual es algo que se tiene que hablar, ¿cierto?

Y lo otro es con el tema de la confidencialidad que nos parece muy importante porque igual son datos de empresa. Cuando ustedes firman con Anthropic una cuenta de empresa, automáticamente pues hay contrato de confidencialidad. Entonces por ese lado no hay ningún problema. Y por el lado de nosotros también podemos firmar un NDA o pues un contrato que necesiten para el tema de los datos, pero pues eso no saldría de acá. Y ya entonces esto es más o menos como ¿qué necesitamos del colegio? Un responsable interno pues como para poder conversar con él continuamente, autorización de entrada y apertura...

VF2: Entonces en las dos semanas de setup, ¿cuántas horas más o menos ahora que dijiste?

VF1: La verdad nosotros no es que hagamos... o sea, si nosotros tenemos todo lo que necesitamos como, por ejemplo, que nos den un día para que nos den todo, o sea literal que nos den correos, los accesos, todo eso yo no creo que se demore un día, nos podemos demorar medio día máximo. Pues que nos saquen un espacio donde digamos: "Pucha, nos van a entregar todo acá" y ya con eso nosotros trabajamos dos semanas sin molestarlos pues. Ya si tenemos dudas puntuales ya sí les podemos ir diciendo. O si de pronto decimos: "Vení, de verdad necesitamos otro mediodía o una hora con ustedes como para arreglar algo", se los haríamos saber también. Pero ya la construcción como tal interna sería muy fácil si tenemos toda la información. Y ya ese espacio como de mediodía que propongo, o pues puede ser menos, pueden ser tres horas, ya lo definimos como en el equipo, sí vendría un ingeniero porque la idea es que entienda muy bien los procesos que ustedes tienen, las aplicaciones que nos van a dar, todo el tema para que quede súper bien instalado en Claude.

Listo. Y ya acá pues también la autorización de los correos, entonces necesitamos obviamente el correo del que se van a mandar pues las cosas, los dominios que ahí también de pronto nos conectamos a otra herramienta, entonces ver qué dominio hay que ponerle pues para que también salga desde Olga, los reportes de Phidias, el presupuesto vigente pues si vamos a usar para...

VF2: Exacto, pero entonces ahí pues yo lo tengo en un formato X con unos nombres. ¿Él igual lee ahí?

VF1: Sí, él es como una persona que aprende. Es demasiado charro porque son, por ejemplo, yo estaba haciendo un ejercicio con mi mamá y era como: "Es que esta columna se llama, no sé, presupuesto, y esta columna se llama presupuesto del periodo". "¿Entonces no se va a confundir?". Y yo sí como: "No, o sea, si él ve que las dos columnas se relacionan y van a la misma, las va a coger como la misma". Entonces con eso no hay problema porque es inteligente literal. Entonces es muy charro, sí. Pero igual eso lo todo lo revisamos nosotros. El correo de Olga y pues las reglas del área obviamente.

Y ya, eso sería pues como por el momento lo que nosotros haríamos y esta sería como la inversión inicial. O sea, nosotros solamente les vamos a cobrar esto una vez, no tiene un recurrente, solamente es un pago de una vez (50% antes de empezar, 50% cuando se entregue ya que ustedes digan: "Está funcionando súper bien") y pues esta propuesta es para 15 días como te lo había mencionado y ya. Lo único que se agregaría sería el IVA. Y esto incluye el setup de todos los procesos, la configuración y conexión, las dos semanas de implementación, la capacitación de tres horas con el colegio y el mes de soporte post-entrega. Entonces todo lo que te dije ya se incluye en la... pues en todo esto.

VF2: Listo, miremos los procesos que vimos.

VF1: Claro.

VF2: Entonces, conciliación bancaria yo creo que esta está bien. Acá el tema de facturas, entonces, como te dije, no es solo la aprobación. Entonces para que lleves y te y averigües si ahí solo puede ser María Luisa o puede ser el dueño del presupuesto que lo apruebe.

VF1: No, se puede configurar con el que lo necesiten.

VF2: No, pues porque siempre cambia según la factura.

VF1: Okay. Sí.

VF2: Entonces también necesitamos que según el centro de costos al que está dirigida esa factura...

VF1: O sea, ¿pero cambias como... como "ah, esta factura hazla tú" o siempre hay un orden? O sea, como que "si es este tipo de facturas, María Luisa firma, si es este...".

VF2: Ah, no. Entonces no habría problema. Se puede pues por centro de costo. Si son estos centros de costo y si es este monto, tun-tun-tun, si es este...

VF1: Si tiene unas condiciones establecidas se puede manejar y simplemente dice como: "Esta factura la tiene que firmar María Luisa, esta factura es para Sara, esta factura tal". Entonces sí, eso se podría hacer.

VF2: Listo, entonces eso debería quedar ahí y lo que te dije pues ver si con Logro, si ya tiene las dos aprobaciones, las dos firmas, ver si en cualquiera de los casos sea manual o automático si ya tiene las dos firmas, ¡pum!, que me lo cause en Logro.

VF1: Sí. O sea, como te digo, el API... voy a confirmar eso bien. Si no se puede, haríamos un agente entonces. O sea, pero por el momento siento que aplica todo súper bien.

VF2: No, yo creo que si funciona, pero como que lo que me falta es si si Logro amarrar pues si es más... porque estas tengo varias que tengo el mismo monto, pues sobre todo los servicios. El servicio de vigilancia es como la misma, pero igual yo hago compras cada mes con cada proveedor de insumos. Eso nunca va a ser el mismo valor.

VF1: Claro, sí.

VF2: Entonces me va a llegar siempre la pregunta igual.

VF1: Ah, la compra de insumos, yo no sé qué de tanto. "¿Ah, la pruebas?". "Ah, sí". Pero la idea es que no te llegue sino que simplemente vea en presupuesto si ya hay algo que se compró de eso...

VF2: Exacto, o no, pues o si yo le tengo que decir que sí, sí, pero que solo sea un clic, pues no sé ya eso.

VF1: Que yo no tenga que ir a buscar mi firma ahí.

VF2: Ah, no, no, no. La firma está dentro. Él solo te preguntaría como: "Cambió de esto a este monto, ¿apruebas?". Tú pones "Sí" y ya él hace el resto del flujo. Entonces eso podría ser y ya. Si es algo nuevo, algo que no está pues obviamente... obviamente no tiene la información para hacerlo. Listo perfecto. Igual me llevo toda esa parte y la analizo otra vez. Igual te la comparto. Y con los otros dos procesos el que sigue sería el de cartera, esos correos personalizados muy chévere a ver qué...

VF1: Igual este correo 100% se hace con Claude. Este correo también. Este lo voy a volver a revisar porque puede ser más complejo entonces ver si lo mejor es hacer un agente como tal nosotros o si podemos seguir con Claude, que nos sigue pareciendo pues como buena idea. Y ya este tablero sería al final.

VF2: Exacto, esto no está incluido pues en los dos millones.

VF1: No, este ya sería adicional porque este sí tiene un cobro pues un fee de implementación... eh, un fee mensual perdón. Porque nosotros cobramos fees mensuales por temas de soporte continuo, porque la IA avanza muy rápido, entonces Claude lo que hace es cuando tú pagas los 100 dólares, el soporte y esa actualización ya está dentro de Claude. Cuando es con nosotros sí toca hacerla pues nosotros. Entonces por eso se cobra un fee mensual.

VF2: Y te pregunto, cuando pagamos esos 100 dólares, bueno eso es como una licencia para el colegio y se usa solo en esto o se puede usar...

VF1: No, se puede seguir usando para muchas cosas.

VF2: ¿Puedo tener varios usuarios ahí haciendo consultas y haciendo cosas?

VF1: Es que lo bueno por eso también nos gusta Claude porque cuando nosotros les demos la capacitación también su mente se va a expandir mucho como en lo que se puede hacer porque también les vamos a enseñar cómo usar Claude. Entonces las personas que lo estén usando van a poder preguntarle cosas distintas.

VF2: Exacto, pero porque esto son para tres personas digamos son los que...

VF1: Sí, pero esto lo puede usar más gente si dan los créditos. O sea, yo priorizaría como que... a ver.

VF2: Porque ahorita tengo otra persona, digamos la directora de innovación, me está pidiendo Claude. ¿La podría usar?

VF1: Sí, o sea ya tú miras digamos... tú dices: "Estas tres personas lo van a usar, pero hijuepucha tengo cinco personas que lo quieren usar". ¿Entonces será que mejor compro el de 200 para que los procesos sigan funcionando y otras personas lo puedan usar? Yo no creo que se gasten los créditos con las consultas, pero sí, sí se podría. Nosotros en Eleva compartimos. No, nosotros también siempre compartimos. Nosotros compramos tres de 200 dólares pero es porque hacemos muchas cosas en Claude, pero las compartimos entonces sí podría ser, no habría ningún inconveniente. Simplemente entran con el mismo correo, misma contraseña y ya. Y nosotros les instalamos todo lo que necesiten entonces no, no hay problema.

VF2: Bueno, una vez digamos el de cartera se parametriza para que haga esto y tun-tun-tun según las deudas... bueno mande. Si yo quisiera en otro momento cambiar ese mensaje también se puede editar.

VF1: Sí, todo se puede editar. ¿Pero en cuál de cartera? ¿En el de Olga el último?

VF2: En el de Olga. O sea, decir: "El próximo viernes es entrega de calificaciones, te aviso que como no estás al día no puedes venir al reporte".

VF1: Sí, todo se puede. Incluso podríamos incluir eso desde ya. Pues si o sea si eso pasa...

VF2: Porque eso son unas fechas ya pues determinadas.

VF1: Igual no es como que... o sea digamos, si es una fecha determinada y puede cambiar y no hay una fecha específica, simplemente le podemos decir como: "Cuando te escriba correo de calificaciones, sacas este correo". Ah perfecto. Porque literal es a partir de comandos. Entonces uno puede darle lo que quiera. Si ella tiene cuatro correos diferentes pues se pueden instalar los cuatro correos de una vez. Si todos los lunes se manda cierto correo, se instala para que todos los lunes se mande ese correo. Entonces esa parte también está resuelta. Sí. Es muy bueno porque uno puede seguir editando, incluyendo cosas, iterando. Igual si después del mes de soporte ustedes quieren incluir otra cosa podemos organizar pues porque ya no sería implementación sino simplemente como adicionar algo específico entonces el precio cambia. Entonces también, o sea igual siempre vamos a estar ahí pues como aliados entonces no habría ningún problema y ya.

VF2: ¿Y entonces esas consultas después del mes qué costo tienen o ya se evalúa según la cantidad?

VF1: Sí ya se evalúa según el tipo de consulta y también como digamos si tú quieres añadir una instrucción nueva entonces cuánto sería eso o si quieres solamente una capacitación por un grupo de personas. Es muy depende como lo que uno necesite. Igual yo te mando esta presentación, te voy a mandarte... nosotros también siempre mandamos este documento que se llama pues como Opslayer... ay... se apagó solo pues no hicimos nada. Opslayer tun-tun-tun. Ya. Y lo que te iba a decir es: nosotros ya mandamos este documento que es mucho más detallado con el proceso de cada agente para que ustedes lo revisen internamente como con el resumen ejecutivo de lo que hablamos nosotros, el enfoque que tenemos, los tres procesos que pues vamos a hacer primero. Entonces en el segundo proceso lo que voy a hacer es detallártelo más y darte pues como el check de si sí es con Claude o es con el otro. Y ya te mando este documento súper completo yo creo que mañana máximo te lo estaría mandando para que ustedes ya lo revisen internamente. Y ya sería que nos digan y literal estamos disponibles si nos dices: "Listo perfecto, empezamos", la otra semana empezamos y te lo dejamos listo en dos semanas y así. Entonces si quieres yo te confirmo esto, te los mando al correo y ya me confirmas según eso pues si es con Claude, el precio queda igual. Si no, bajaría a dos procesos con Claude entonces este precio bajaría y te cotizaría pues como el otro agente aparte. Y ya a partir de eso pues me dices tu decisión y vamos hablando.

VF2: De una Sara. Está muy claro, muy bueno. Eh, nada, pasemos y miremos qué hacemos y qué hago para sacar la platica que esto obviamente yo no lo tenía pero bueno miremos.

VF1: Claro no no no, entiendo totalmente. Y la verdad piensa también es como lo que habíamos hablado, que es algo que les va a quitar mucho tiempo, o sea van a poder usarlo pues en otras cosas pero obvio entiendo que es un proceso entonces por eso nosotros siempre somos súper transparentes, traemos el precio de una vez a la reunión, ustedes tómense el tiempo pues como para analizarlo en presupuesto con todas las personas que lo van a usar y me cuentas. Igual yo te escribo la otra semana si algo también como para ver si tomaron una decisión y vamos conversando.

VF2: De una. Esas doce... o sea cada uno tiene su preciocito si te digo: "No, ¿sabes qué? pues si vamos a empezar solo con...".

VF1: O sea estos los cotizamos los tres. Si tú me dices solamente quiero empezar con este, te lo te lo cotizo pues aparte también. Entonces yo te lo mando y ya tú me dices: "Sari, me gustaron los tres, empezamos con los tres" o "Sari quiero empezar solo con el agente de facturas que es lo que más me afecta o los correos" y ya vamos mirando pues cuánto vale según eso. Listo.

VF2: Conciliaciones... pues hablamos de bancarias pero se puede o sea aplica igual como para otro tipo de conciliación. O sea si yo tengo dos archivos aplica igual o ya es otro proceso.

VF1: Podríamos crear el proceso también. O sea la idea es lo que nosotros necesitamos es como cuando se vaya a instalar ese proceso que sea súper claro como lo que vamos a tener. O sea si tú me dices: "Tengo la conciliación bancaria, tengo esta otra y tengo esta otra", eso hay que tenerlo súper claro para saber el cuándo va a responder según lo que ustedes necesiten. Eso tendría que estar mapeado. Y lo mismo con los otros. O sea si el correo de Olga es diferente para este caso, para este caso, para este caso, al inicio se mapea como manual por decirlo así y ya lo sigue haciendo automático. Listo. Digamos en el tema de causaciones cuántas cosas serían... eh perdón de conciliaciones...

VF2: No, ella qué nos dijo, pues que se hacían como cuatro pues conciliaciones de seis cuentas por... sí está bien. Ah yo tengo acá cruce mensual de seis cuentas contra extracto bancario. Sí eso lo tenemos incluido sí. Listo.

VF1: ¿Preguntas? No averíguame la consulta y mañana me mandas pues y me mandas cuando tengas la presentación y me dices pues qué te dijo.

VF2: Sí, pues mandas cuando tengas la presentación y me dices pues qué te dijo. De una Sara. Buenísimo. Listo.

---

## Fragmento clave — Proceso de facturas + Logro (descripción de María Luisa)

VF2: Entonces llega... llega una factura. Listo. Llega a un correo, por lo general llega a un correo de facturación. Se llama factura@marymount... Tun y hay una persona que lee el correo. Entonces: "Ah, esta factura". Entonces esta factura dice que son unos vendajes médicos, unas cosas médicas. "Ah bueno, entonces lo tiene que aprobar Andrea de Salud y Seguridad en el Trabajo". Entonces como es médico, entonces va Andrea. Entonces va a ir a ver o sea tiene el presupuesto pues si hay un presupuesto de ella de equipos médicos digamos. Pero está se llama así no específicamente el vendaje no sé qué, ¿cierto? Bueno. Y necesitamos que el responsable pues digamos que le llegue a Andrea. Primero... o sea nosotros siempre buscamos dos firmas. Para cualquier pago dos firmas. Entonces hay que: "Ah bueno, la que lo compró". Nosotros tenemos una persona en compras entonces María Camila que la que lo compró, entonces ya da el okay: "Sí, eso fue lo que yo compré". Y después pasa a Andrea como responsable del centro de costo y ella lo aprueba. Entonces ahí estaríamos como en el segundo caso: "Sí, yo compré esto hace seis meses pero otro monto, otra cosa", tun que le llegue a Andrea. "Ah sí lo compré, listo, bien". Entonces ya con las dos firmas esa factura tiene las dos firmas, vuelve a contabilidad y ahí es: "Ah bueno, poner en el sistema contable yo tuve un gasto de... de vendajes". Ah, esos vendajes van a la cuenta yo no sé qué gastos de salud digamos. Entonces sí, entonces es el NIT del proveedor... pues son datos que ya trae la factura pero que los ponga donde debe ser porque hay que poner muchos daticos en la hoja contable también en el sistema contable. Porque es una factura física y entonces la personita o el agente tiene que poner cada donde corresponde cada dato y el valor antes de IVA y el IVA y el tun-tun-tun. Listo. Hace eso. Y ya después es programar para pago. Entonces: "Ah esto se va a pagar el 15 o el 30". Listo. Si me hace esa causación también, ¡puf!, ahí sí me quita todo el proceso exactamente.
