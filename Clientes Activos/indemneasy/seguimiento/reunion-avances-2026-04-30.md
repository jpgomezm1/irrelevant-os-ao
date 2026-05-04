# Reunión de avances · Indemneasy

**Fecha:** 2026-04-30
**Tipo:** Avances de proyecto (post-entrega)
**Entregable de hoy:** Documento de avances enviado al cliente por chat

---

## Lo que se entregó / cerró

### 1. Errores técnicos
- Se identificó que múltiples errores tenían **10 errores raíz**
- Al corregir los 10 raíz, los errores derivados se resolvieron en cascada
- Detalle técnico documentado en el documento de avances

### 2. Mejoras al agente
- Iteración continua sobre las respuestas del agente
- Mejoras backend ya aplicadas

### 3. Documentos cargados
- Los **25 documentos** entregados por el cliente quedaron montados y operativos en la generación de documentos

### 4. Catálogo aprobado
- Aseguradoras, juzgados y demás ítems → cliente lo revisó y quedó conforme

---

## Feedback del cliente (acciones para nuestro lado)

### A. Campos duplicados en documentos
- **Detectado en:** "Poder para adultos" → hay campos que se repiten
- **Acción:** revisar los otros 24 documentos para detectar duplicados similares

### B. Información fija vs variable en documentos

**Info FIJA** (datos de Indemneasy: razón social, NIT, etc.)
- Aplica en algunos documentos, no todos
- Como Indemneasy siempre es la empresa que emite poderes/contratos, esa info debe quedar precargada
- Cliente nos va a pasar la lista exacta de qué info va fija por documento

**Excepción** (1 documento)
- Hay un doc donde el emisor varía (Simón, Nicolás u otra persona del equipo Indemneasy)
- Cliente nos va a decir cuál es y cómo manejarlo

**Info VARIABLE** (datos del cliente final que se está atendiendo)
- Nombre, cédula, celular, SOAT, etc.
- El agente IA conversa por WhatsApp → extrae estos datos del chat → llena el documento → documento queda listo para enviar y disponible en la interfaz para Indemneasy
- Aplica para todos los contratos/documentos donde tenga sentido

### C. Conexión catálogo → documentos
- El agente debe extraer info del catálogo (ej: número de Allianz como aseguradora) y autocompletar el campo correspondiente en el documento

### D. Botón "Importar" — pedido de Juan David
- **Estado actual:** muy manual (hay que mapear columna por columna del Excel)
- **Pedido:** botón tipo **upload drag-and-drop** → arrastras el Excel y carga los datos automáticamente sin configuración manual

---

## Resumen de pendientes

### Nuestro lado (Irrelevant)
1. Auditar duplicados de campos en los 24 documentos restantes
2. Implementar info fija de Indemneasy (cuando llegue la lista del cliente)
3. Configurar la excepción del documento con emisor variable
4. Asegurar que el agente: extrae datos del chat WhatsApp → llena documento → publica en interfaz
5. Asegurar que el agente extrae datos del catálogo → autocompleta documentos
6. Rediseñar botón Importar → upload drag-and-drop

### Cliente (Indemneasy)
1. Pasar lista de información fija por documento
2. Indicar cuál es el documento-excepción y cómo se maneja el emisor variable
