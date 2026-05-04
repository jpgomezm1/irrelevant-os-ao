# Cámara del Pacífico · resumen ejecutivo del discovery

*Generado a partir del transcript del 2026-04-30. Insumo principal para Fase 0.*

---

## Quiénes son · en una mirada

Una **cámara de comercio multilateral** (Carlos lo corrigió en vivo: no es bilateral) que conecta empresarios entre **6 países** — México, Panamá, Colombia, Ecuador, Perú, Chile. Funcionan como nodo entre el sector privado y entes públicos: ministerios, viceministerios, embajadas, otras cámaras bilaterales (ej. ADVANTAGE AUSTRIA). Sede en Bogotá. +80 afiliados visibles en su web, equipo pequeño.

---

## Quién decide · 3 niveles

| Rol | Persona | Función |
|---|---|---|
| **Decisor estratégico** | Alberto Zapater · Presidente | Aprueba con el comité directivo el jueves 7-may |
| **Decisor operativo** | Carlos Olaya · Director Ejecutivo (14 años 7 meses) | Firma con el equipo · sabe la operación de memoria · vocero institucional |
| **Champion en piso** | Tania de la Rosa · Área comercial | La que sufre el dolor diario · la que va a usar la herramienta |

**Implicación de venta:** la cotización del martes 5 **no es para Carlos — es la munición que Carlos lleva al comité del jueves**. El deck tiene que aguantar segunda venta interna.

---

## Qué quieren · en sus palabras

> *"Crear un programa, una aplicación o un agente que te ayude en esos procesos que son repetitivos."* — Carlos
>
> *"Información que repose como en un centro de control donde uno pueda mirar."* — Carlos

Lo que NO quieren: un Copilot genérico ni "una app sólo para 15 cartas" (Carlos lo rechazó explícitamente). Quieren **el conjunto resuelto** — automatización + centro de control.

---

## Su operación tiene un patrón claro y repetible

Cada misión y cada evento dispara la misma cadena de 10 pasos:

1. Definir fechas, lugar, agenda.
2. Publicar minisitio con form de inscripción anclado a la web.
3. Convocar vía email marketing (Mail Turbo) — subir listas, lanzar campañas.
4. Filtrar respuestas: interesados, opt-outs, duplicados.
5. Reuniones 1:1 con interesados — entre **20 y 50 por convocatoria**.
6. Bifurcar según el camino que pida cada empresa: reunión / más info / propuesta directa.
7. Enviar propuesta (templates ya estandarizados — ~50/evento).
8. Recibir formato de inscripción + RUT + documentación.
9. Generar carta de aceptación + carta de compromiso (~20/misión, hoy en Word manual).
10. Generar y enviar factura desde sistema contable.

**Volumen anual estimado:** la operación NO es masiva — es **recurrente y multidimensional**. 5 servicios × 6 países × varias campañas al año = mucho del mismo flujo, repetido bajito todo el tiempo.

---

## Dónde duele · 8 pains identificados

1. **Documentos hechos a mano** · Tania edita cartas en Word cambiando datos por empresa. ~15 cartas/misión × 3-4 misiones/semestre + ~50 propuestas/evento.
2. **Errores humanos en el envío** · se manda la carta, se olvida la factura. Hay que reenviar.
3. **Información en 5 lugares distintos** · Drive + Dropbox + computador local + correos + Suite CRM. No hay punto único de verdad.
4. **Bases de datos sin higiene** · si alguien dice "no me interesa", esa señal no se propaga — la misma persona vuelve a aparecer en otra campaña.
5. **Agendamiento manual de reuniones** · 20-50 reuniones × convocatoria, copiando-pegando entre correo, contacto y agenda.
6. **Tres caminos post-respuesta sin orquestación** · cada prospecto pide algo distinto (reunión / info / propuesta directa) y el ruteo es manual.
7. **Eventos particulares tienen su propio cuello** · convocatoria → inscripciones → recordatorios correo + WhatsApp → confirmación.
8. **El CRM actual no acompaña** · Suite CRM guarda contactos pero no administra los procesos. Lo dijo Carlos textualmente.

---

## Stack actual

| Función | Herramienta |
|---|---|
| CRM | Suite CRM |
| Email marketing | Mail Turbo |
| Contable | Elisa |
| Facturación | Factura Tech |
| Documentos | Word + Drive + Dropbox + computador + correo (disperso) |
| Comunicación interna | WhatsApp |

---

## Síntesis · qué necesitan realmente

Dos cosas en una:

1. **Capa de automatización end-to-end del workflow de convocatorias.** Desde la base de datos hasta la factura, sin re-tipear nada. Que cartas, propuestas, recordatorios y facturas salgan solos cuando el form de inscripción se llena.

2. **Centro de control que muestre todo en un solo lugar.** Qué campañas corren, quién se inscribió, a quién ya se le mandó qué documento, qué falta, qué métricas dieron. El dolor no es sólo automatizar — es **ver**.

El insight contrarian de Irrelevant les calza directo: ellos mismos descartaron "estilo Copilot". Necesitan **AI específica para una operación gremial multilateral** — la especificidad es la palanca.

---

## Banderas y supuestos críticos

- **Timing apretado** · martes 5 cotización · jueves 7 comité directivo · 5 días hábiles entre uno y otro.
- **Scope creep latente** · Carlos abrió "eventos particulares" además de misiones casi al final de la call. Definir scope quirúrgico antes del lunes.
- **Validaciones técnicas pendientes** · API pública de Elisa · Factura Tech · Suite CRM (probable, es open source) · URL exacta de Mail Turbo.
- **WhatsApp = Core Layer** · Cloud no se conecta a WhatsApp directamente, requiere desarrollo propio. Mejor segunda fase.
- **Activo y riesgo simultáneo en Carlos** · 14 años en la Cámara = sabe TODO (discovery rico) pero también puede haber sesgo "así se ha hecho siempre". La AI se posiciona como amplificador, no reemplazo de criterio.
