# Procesos Inteligentes Recomendados para Unified Systems

## Esto es lo que vamos a dejar funcionando

### 1. Call Simulator — Medicare & Insurance
**El problema:** Los agentes nuevos no tienen forma de practicar llamadas de Medicare, Ancillary o Final Expense sin quemar leads reales. El training es informal y depende de personas presentes.
**Como funciona:** El agente activa el simulador, elige la campana (Medicare, Ancillary, Final Expense) y el idioma. El sistema simula un cliente realista que contesta, hace preguntas y pone objeciones. El agente practica todo el flujo: introduccion, preguntas de calificacion (edad, Part A&B, zip code), transferencia. Al terminar recibe evaluacion con score: cumplimiento de script, compliance, tiempo de llamada.
**Ejemplo:** "Hoy un agente nuevo entra y no sabe como manejar cuando el cliente dice 'I already have Medicare'. Practica 5 llamadas simuladas antes de tocar el dialer real."
**Impacto estimado:** ~10 horas/semana recuperadas en training ad-hoc. Reduce tasa de llamadas fallidas en primeras semanas.

### 2. Agent Onboarding Assistant
**El problema:** "I personally cannot look day to day operations. I would need somebody who I can work with and who can handle all these things." No hay manual de onboarding formal. El conocimiento depende de personas. Critico para escalar a 80-200 agentes.
**Como funciona:** El nuevo agente o su supervisor activa el onboarding para una campana especifica. El sistema guia paso a paso: que es Medicare/Ancillary, como funciona el dialer, codigos de disposicion, protocolo de transferencia, compliance rules, que decir y que NO decir. Incluye mini-quiz al final de cada modulo para verificar comprension. Genera checklist de onboarding completado.
**Ejemplo:** "Un agente en Colombia empieza el lunes. Sin supervisor presente, sigue el onboarding guiado, practica con el simulador, y para el martes ya esta listo para el dialer."
**Impacto estimado:** ~8 horas/semana. Elimina dependencia de trainer presencial. Estandariza calidad sin importar ubicacion.

### 3. QA Scorecard — Call Quality Analyzer
**El problema:** Con 300-400 agentes no se pueden escuchar llamadas manualmente. El QA depende de personas y no escala. Para un call center remoto en Colombia es aun mas critico.
**Como funciona:** El QA manager carga transcripts de llamadas (una o batch). El sistema evalua contra el scorecard de la campana: presentacion correcta, preguntas obligatorias (edad, Part A&B, zip code), compliance (no promesas falsas, no beneficios inventados), buffer time (>180 segundos), disposicion correcta. Genera scorecard por agente + red flags + coaching sugerido.
**Ejemplo:** "En vez de escuchar 20 llamadas al dia manualmente, el QA corre el skill sobre 100 transcripts y recibe un reporte con los agentes que necesitan coaching."
**Impacto estimado:** ~15 horas/semana. QA pasa de 20 llamadas/dia a 100+ analizadas automaticamente.

### 4. Campaign Script Generator
**El problema:** Cada campana tiene un script diferente. Al abrir en espanol, se necesitan versiones traducidas y adaptadas culturalmente. Hoy los scripts viven en la cabeza de la gente.
**Como funciona:** El operations manager indica la campana y el idioma. El sistema genera el script completo: apertura, preguntas de calificacion, manejo de objeciones comunes, protocolo de transferencia, cierre. Incluye variantes por escenario: "si dice que ya tiene Medicare", "si pide que lo saquen de la lista", "si no entiende bien". Output listo para cargar en el dialer o imprimir.
**Ejemplo:** "Abdul abre la campana de Ancillary en espanol. En vez de traducir y adaptar manualmente, corre el skill y tiene el script completo en 2 minutos, adaptado culturalmente para el mercado hispano de US."
**Impacto estimado:** ~5 horas/semana. Abre nuevas campanas/idiomas en minutos en vez de dias.

### 5. Daily Performance Digest
**El problema:** Con operaciones en Pakistan y expansion a Colombia, no hay forma de saber que paso hoy sin revisar reportes crudos del dialer. Abdul necesita control remoto sin depender de que alguien le cuente.
**Como funciona:** Al final del dia (o automaticamente), el sistema toma la data del dialer y genera un resumen ejecutivo: top 5 y bottom 5 agentes, campanas por encima/debajo del target (7 calls exitosas/agente), agentes que necesitan coaching urgente, anomalias (mucho pause time, disposiciones sospechosas, caidas de conversion). Resumen tipo "morning briefing" que se lee en 2 minutos desde el telefono.
**Ejemplo:** "Abdul se levanta en Utah, abre el digest y ve: 'Ayer el equipo de Medicare espanol hizo 85% del target. 3 agentes nuevos estan por debajo — recomendacion: sesion de practica con el simulador. El agente #12 tuvo 4 transfers rechazados — posible problema de compliance.'"
**Impacto estimado:** ~5 horas/semana en revision manual de reportes del dialer.

---

## Impacto Total
- **Horas semanales recuperadas:** ~43
- **Procesos que dejan de ser manuales:** Training de agentes, QA de llamadas, creacion de scripts, reporte diario de operaciones
- **Tu equipo se enfoca en:** Cerrar deals, escalar campanas, abrir nuevos mercados — no en supervisar manualmente a cada agente

---

## Nota: Dashboard de Performance (Desarrollo Aparte)
Adicionalmente, se recomienda un dashboard web que se conecta al VICIdial (API/MySQL) y muestra en tiempo real: calls/hora por agente, transfers exitosos vs fallidos, conversion rates por campana, alertas de underperformance. Esto se cotiza como desarrollo separado, no como parte del Ops Layer.
