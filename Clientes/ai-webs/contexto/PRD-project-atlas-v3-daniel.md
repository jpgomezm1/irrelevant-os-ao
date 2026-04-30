# Project Atlas — PRD

**Technical Requirements Document for Implementation Team**
**Version:** 3.0 · Ready for engineering kickoff
**Status:** 100% of MVP features SPEC_READY

---

## 0. Reading this document

This PRD is the single technical source of truth for the implementation team building Project Atlas.

**Terminology used throughout:**
- **"the Client"** — the end-user organization consuming this system (a US-based broker-dealer / RIA; specific identity is not required for implementation)
- **"Atlas"** — the system being built (this project)
- **"the Program"** — the overarching engagement; contractually the owner of this PRD
- **Speaker attributions on transcript quotes** (e.g., *"Client Head of Operations"*) are role-based; names are intentionally omitted

**Source material:** Requirements trace to a discovery-call transcript conducted with the Client's operational leadership. Every feature references the specific quote that justifies it, with role-based attribution only.

**What changes vs. a typical PRD:**
- Every requirement has a transcript source quote, because ambiguity at the requirement level is a lot more expensive than verbosity here
- Every feature ships with GIVEN/WHEN/THEN acceptance criteria
- External API contracts (LandingAI, WorldCheck, DocuSign) are locked to specific documented endpoints, not inferred

---

## 1. Product overview

### 1.1 What Atlas is

Atlas is a back-office pipeline that ingests completed DocuSign vinculación (client onboarding) envelopes, extracts and cross-validates structured data across the submitted documents, runs watchlist and adverse-media screening, and surfaces only exceptions for human analyst review.

### 1.2 Why it exists

The Client is at an operational ceiling. Current state:

> *"tenemos una necesidad puntual y es frente a la vinculación... tenemos un proceso bastante manual"* — Client Head of Operations

> *"ya me dijeron no puedes crecer más en personas... señores, bienvenidos al partido"* — Client Head of Operations

Three analysts are currently dedicated 100% to reviewing new-account applications. Onboarding volume is ~130 accounts/month with 40% corporate / 60% individual split (inverted from prior year). The Client has been explicitly told they cannot hire additional headcount. Each case requires 30 minutes (individual) to 1.5 hours (complex corporate multi-layer structures) of manual review, across four parallel workstreams per case.

### 1.3 Primary success metric

**~80% reduction in analyst time per case** (design target set by the Program):

> *"podrías estar hablando de automatizaciones más o menos en términos de ahorro de tiempo por ahí del 80%"* — Program design target

At current volume this equates to removing approximately 200–300 analyst hours per month from the queue. End-to-end case time target: reduce from the current 10-15 day average to ≤4 days.

> *"el promedio digamos que nosotros tenemos para vincular una cuenta. Pero pues por las devoluciones que hemos venido teniendo. Estamos en un promedio de 10 a 15 días"* — Client Head of Operations

### 1.4 What is in scope for MVP

| Feature ID | Name |
|------------|------|
| F-01 | DocuSign envelope intake (Connect webhook + HMAC) |
| F-02 | Document ingestion + immutable vault storage |
| F-03 | Document classification + field extraction (LandingAI ADE) |
| F-04 | Field normalization layer |
| F-05 | Cross-document field validator |
| F-06 | Dual-model divergence verifier |
| F-07 | KYC completeness validator (with `origen_de_fondos` focus) |
| F-08 | Watchlist screening adapter (WorldCheck One API v3) |
| F-09 | Adverse media screening (SERP + LLM disambiguation) |
| F-10 | Case scoring + exception router |
| F-11 | Analyst reviewer UI |
| F-12 | Immutable evidence vault |
| F-13 | Commercial agent pre-flight validator + return flow |
| F-16 | Corporate ownership chain walker |

### 1.5 What is out of scope for MVP

> *"yo no me apalancaría mucho y de pronto es como para la propuesta... porque todavía no estamos"* — Client Head of Operations, on the Client's current digital account-opening platform

- **Client-facing self-service UI replacement** — the Client is mid-migration from their current account-opening platform to a Salesforce-based system. Atlas does not replace the customer-facing layer in MVP.
- **Automated write-back to the core custody system** (US-based clearing/custody platform) — read-only reference; US-based compliance officer retains manual approval.
- **Replacement of the final US-based compliance approval step** — regulatory; must remain human-in-the-loop.

> *"una persona con una licencia específica tiene que aprobar la cuenta. Esto no se hace digamos como desde Colombia"* — Client Head of Operations

### 1.6 What is deferred to Phase 2 (post-MVP)

- **Client-facing UX redesign** (document-first flow: upload documents → auto-prefill the New Account Form):

> *"sería como cambiar que al principio la persona adjunte documentos y se prellenen algunos formularios. Y eso les va a agilizar, mejorar el UX también"* — Program recommendation

- **Salesforce FSC adapter** — Atlas is built abstraction-ready to accept the new system of record when the Client's Salesforce migration lands:

> *"eventualmente la solución tiene que ser como suitable o que sirva a las dos"* — Client Head of Operations

- **Automated status sync from the custody platform**
- **Colombian government registry direct query** (CAPTCHA-protected; handled by the analyst UI surfacing URLs for MVP)
- **ML correction layer** on top of LLM extractions (Program-identified capability to close the LLM-vs-human error-rate gap over time)

---

## 2. System architecture

### 2.1 Component map

```
                          ┌────────────────────────────────────────┐
                          │  Client users (commercial agents,      │
                          │  end customers) — sign via DocuSign    │
                          └──────────────────┬─────────────────────┘
                                             │
                                             │ Connect webhook (HMAC-SHA256)
                                             ▼
                          ┌────────────────────────────────────────┐
                          │  F-01 Intake Orchestrator              │
                          │  POST /api/v1/webhooks/docusign        │
                          └──────────────────┬─────────────────────┘
                                             │ enqueues job
                                             ▼
                          ┌────────────────────────────────────────┐
                          │  F-02 Document Ingestion               │
                          │  → Azure Blob (US region, immutable)   │
                          └──────────────────┬─────────────────────┘
                                             │
                                             ▼
                          ┌────────────────────────────────────────┐
                          │  F-03 OCR + Field Extraction           │
                          │  LandingAI ADE                         │
                          │  /v1/ade/parse → /v1/ade/extract       │
                          └──────────────────┬─────────────────────┘
                                             │
                                             ▼
                          ┌────────────────────────────────────────┐
                          │  F-04 Field Normalization              │
                          └──────────────────┬─────────────────────┘
                                             │
                ┌────────────────────────────┼──────────────────────┐
                ▼                            ▼                      ▼
     ┌────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐
     │ F-06 Dual-model    │  │ F-05 Cross-doc      │  │ F-16 Corporate      │
     │ divergence verifier│  │ field validator     │  │ ownership walker    │
     │ GPT-4o + Claude    │  │                     │  │                     │
     └──────────┬─────────┘  └──────────┬──────────┘  └──────────┬──────────┘
                │                       │                        │
                └───────────────────────┼────────────────────────┘
                                        ▼
                          ┌────────────────────────────────────────┐
                          │  F-07 KYC Completeness Validator       │
                          │  (origen_de_fondos LLM rubric)         │
                          └──────────────────┬─────────────────────┘
                                             │
                ┌────────────────────────────┼──────────────────────┐
                ▼                            ▼                      ▼
     ┌────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐
     │ F-08 WorldCheck    │  │ F-09 Adverse media  │  │ F-13 Commercial     │
     │ One API v3         │  │ (Bing SERP + LLM)   │  │ pre-flight return   │
     │ api.risk.lseg.com  │  │                     │  │ (via DocuSign)      │
     └──────────┬─────────┘  └──────────┬──────────┘  └──────────┬──────────┘
                │                       │                        │
                └───────────────────────┼────────────────────────┘
                                        ▼
                          ┌────────────────────────────────────────┐
                          │  F-10 Case Scoring + Exception Router  │
                          └──────────────────┬─────────────────────┘
                                             │
                ┌────────────────────────────┴──────────────────────┐
                ▼                                                   ▼
     ┌─────────────────────┐                          ┌─────────────────────┐
     │ F-11 Analyst UI     │                          │ F-12 Evidence Vault │
     │ Next.js + shadcn/ui │                          │ Azure Blob +        │
     │                     │                          │ append-only Postgres│
     └─────────────────────┘                          └─────────────────────┘
```

### 2.2 Data residency (hard constraint)

**All data-at-rest and data-in-transit must remain within US jurisdictional boundaries.**

> *"La información no puede estar en Colombia... No puede estar por fuera de Estados Unidos"* — Client Head of Operations

- Azure resources: all in `East US 2` or `Central US` regions. No EU, no Asia, no cross-region replication outside US
- LandingAI: use the US production endpoint (default). **Do not** initialize the client with `environment="eu"`
- OpenAI: use Azure OpenAI (East US 2). Do not route through OpenAI's direct API (which has EU fallback routing)
- Anthropic API: the `us-east-1` AWS Bedrock region OR Anthropic's direct API (both are US-pinned)
- WorldCheck One: LSEG hosts at `api.risk.lseg.com`; per LSEG documentation, data processing is region-aware — confirm US-region tenancy during pilot credential provisioning

### 2.3 Core data model

```
Entity: OnboardingCase
Fields:
  case_id                uuid             primary key
  docusign_envelope_id   string           unique, source envelope
  account_type           enum             individual | individual_with_beneficiary |
                                          joint | corporate_single_layer |
                                          corporate_multi_layer
  client_origin_country  iso-3166-1 α-2
  case_status            enum             [see state machine below]
  received_at            timestamp
  committed_at           timestamp        nullable
  assigned_analyst_id    uuid             nullable
  risk_score             decimal(0..1)    nullable
  revision_number        integer          increments on comercial re-submit
Relationships:
  1→N Applicant, Document, ValidationFinding, ScreeningResult, AuditEvent
Constraints:
  docusign_envelope_id unique
  case_status transitions logged in AuditEvent
```

```
Entity: Applicant
Fields:
  applicant_id           uuid
  case_id                uuid             FK
  role                   enum             primary_account_holder | joint_holder |
                                          beneficiary | authorized_signer |
                                          ultimate_beneficial_owner | commercial_agent
  entity_type            enum             natural_person | legal_entity
  parent_applicant_id    uuid             nullable, self-ref for ownership chains
  ownership_percentage   decimal          nullable
  depth_from_primary     integer          0 = primary, N = N-th ownership layer
```

```
Entity: Document
Fields:
  document_id            uuid
  case_id                uuid             FK
  applicant_id           uuid             nullable (entity-level docs apply to org)
  doc_type               enum             NAF | KYC | cedula | comprobante_domicilio |
                                          comprobante_ingresos | declaracion_renta |
                                          camara_comercio | pasaporte | other
  source                 enum             docusign | manual_upload
  blob_url               string           Azure Blob SAS (US region)
  sha256                 string
  classification_confidence  decimal
Constraints:
  sha256 unique within case_id (dedup)
```

```
Entity: ExtractedField
Fields:
  field_id               uuid
  document_id            uuid             FK
  applicant_id           uuid             nullable
  field_key              string           canonical key: "full_name" | "tax_id" |
                                          "address.street" | "income.annual_declared" |
                                          "funds_origin" | ...
  raw_value              string           as-extracted
  normalized_value       string           after F-04 normalization
  extraction_model       string           "landingai-ade-dpt-2-latest" |
                                          "gpt-4o-2024-08-06" |
                                          "claude-sonnet-4-6" | ...
  extraction_confidence  decimal
  bbox                   array[4]         [x, y, w, h] on source doc
  page                   integer
Constraints:
  (document_id, field_key, extraction_model) unique
```

```
Entity: ValidationFinding
Fields:
  finding_id             uuid
  case_id                uuid             FK
  finding_type           enum             field_mismatch | missing_field |
                                          format_invalid | corporate_chain_gap |
                                          model_divergence | extraction_failed |
                                          screening_infrastructure_failure
  severity               enum             info | warning | blocker
  field_key              string
  involved_field_ids     array[uuid]
  human_readable_message string           Spanish-language
  auto_fix_suggestion    string           nullable
  requires_comercial_input  boolean
```

```
Entity: ScreeningResult
Fields:
  screening_id           uuid
  case_id                uuid             FK
  applicant_id           uuid             FK
  screening_type         enum             watchlist_worldcheck | adverse_media | pep
  provider               string           "worldcheck_v3" | "bing_websearch" | ...
  queried_at             timestamp
  hit_count              integer
  hits                   jsonb            full provider response
  analyst_disposition    enum             not_reviewed | false_positive |
                                          confirmed_hit | needs_research
  evidence_blob_url      string           signed PDF/JSON snapshot (required)
```

```
Entity: AuditEvent
Fields:
  event_id               uuid
  case_id                uuid             FK
  event_type             string
  actor_type             enum             system | analyst | comercial |
                                          compliance_officer
  actor_id               string           nullable
  payload                jsonb
  occurred_at            timestamp
Constraints:
  APPEND-ONLY. No updates, no deletes. Enforced via DB grants.
```

### 2.4 Case state machine

```
received
   │ (webhook HMAC valid; envelope fetched)
   ▼
extracting
   │ (all docs OCR'd)
   ▼
validating
   │
   ├── blocker finding with requires_comercial_input=true → awaiting_comercial_fix
   │                                                              │
   │                                                              │ (comercial re-submits via DocuSign)
   │                                                              ▼
   │                                                         received (new revision)
   │
   └── no blockers → screening
                        │ (all screenings complete)
                        ▼
                   awaiting_analyst
                        │
                        ├── analyst approves → awaiting_compliance_approval
                        │                            │ (US compliance officer approves manually via F-11)
                        │                            ▼
                        │                         approved
                        │
                        └── analyst rejects → rejected

Any state → manual_review  (on system error / escalation)
```

---

## 3. Feature specifications

> Each feature below is independently implementable against the acceptance criteria. Features reference each other only through the dependency declarations.

---

### F-01 · DocuSign envelope intake

**Status:** SPEC_READY

**Source:**
> *"Después de que el cliente firma, lo mandamos al comercial. El comercial nos adjunta ahí documentación..."* — Client Head of Operations
>
> *"empieza a generar un flujo en DocuSign, que es el que te vamos a [ver] a continuación"* — Client Head of Operations

**External dependency docs:** https://developers.docusign.com/platform/webhooks/connect/hmac/ · https://developers.docusign.com/platform/webhooks/connect/validate/

**User story:** As the pipeline, I receive a completed DocuSign envelope via Connect webhook so that an `OnboardingCase` is created automatically and the downstream workflow begins, without requiring any manual upload.

**Acceptance criteria:**

- **GIVEN** a valid DocuSign Connect webhook for event `envelope-completed` with a valid HMAC-SHA256 signature in the `X-DocuSign-Signature-1` header
  **WHEN** it arrives at `POST /api/v1/webhooks/docusign`
  **THEN** a new `OnboardingCase` record is created with `case_status=received` and a 200 response is returned within 2 seconds

- **GIVEN** an invalid or missing HMAC signature
  **WHEN** the webhook arrives
  **THEN** 401 is returned and no `OnboardingCase` is created

- **GIVEN** a webhook for an `envelopeId` that already exists in `OnboardingCase.docusign_envelope_id` (i.e., a DocuSign retry, not a correction)
  **WHEN** it arrives
  **THEN** 409 is returned and the original case is not duplicated (idempotency via unique DB constraint)

- **GIVEN** the envelope template name does not match the Client's onboarding template allowlist (configured per template ID)
  **WHEN** it arrives
  **THEN** 422 is returned and a warning is logged (prevents unrelated DocuSign envelopes in the Client's account from triggering the pipeline)

- **GIVEN** a corrected/amended envelope from a comercial re-submission (same `envelopeId`, arriving after the case was in `awaiting_comercial_fix`)
  **WHEN** received
  **THEN** the existing case transitions back to `received`, `revision_number` is incremented, and an `AuditEvent` of type `case.resubmitted` is logged

**Implementation notes:**

- Configure DocuSign Connect at the **Account level** (not envelope-level), scoped to `envelope-completed` only. Do not subscribe to `recipient-completed`, `envelope-sent`, or other low-signal events.
- HMAC flow:
  1. The Client generates a 32+ character secret key in DocuSign Admin → Settings → Connect → HMAC keys
  2. Implementation Team stores the secret in Azure Key Vault
  3. On webhook receipt: compute `HMAC-SHA256(payload_body, secret)` base64-encoded, compare to `X-DocuSign-Signature-1` using constant-time comparison (e.g., `hmac.compare_digest` in Python)
- Payload format: **JSON** (not XML). Configure "Send individual messages" in Connect (not aggregated).
- Endpoint must be HTTPS; DocuSign will not deliver to HTTP.
- DocuSign retry behavior: Connect retries for up to 24 hours on non-2xx responses. Idempotency on `envelopeId` must absorb these retries cleanly.
- Enqueue downstream work to an async worker queue (Azure Service Bus). The webhook endpoint itself must not perform document downloads or OCR — those belong in F-02 onward. Webhook response target: < 500ms at p99.

**Key webhook payload fields consumed:**
```json
{
  "event": "envelope-completed",
  "apiVersion": "v2.1",
  "uri": "/restapi/v2.1/accounts/{accountId}/envelopes/{envelopeId}",
  "retryCount": 0,
  "data": {
    "accountId": "uuid",
    "envelopeId": "uuid",
    "envelopeSummary": {
      "status": "completed",
      "documentsUri": "/envelopes/{envelopeId}/documents",
      "customFields": { ... }
    }
  }
}
```

**Edge cases:**
- Very large envelopes (>50 MB attachments): webhook returns 200 immediately; document download deferred to F-02's async worker
- DocuSign throttling (high burst): Connect's retry mechanism absorbs this; do not add additional queuing in front of the webhook endpoint

**Dependencies:** Blocks all downstream features (pipeline root)

---

### F-02 · Document ingestion + vault storage

**Status:** SPEC_READY

**Source:**
> *"yo entro acá el DocuSign y... veo también todos los asuntos, la declaración de renta, el comprobante de domicilio, en este caso las cédulas, toda la información acá"* — Client Head of Operations
>
> *"se guardan todas las evidencias, precisamente las revisiones en listas de control... eso tiene unos tiempos que yo las tengo que mantener"* — Client Head of Operations

**User story:** As the pipeline, I pull all documents from a DocuSign envelope and store them in an immutable, US-region blob vault so that downstream extraction has a stable reference and compliance has an evidence trail.

**Acceptance criteria:**

- **GIVEN** an `OnboardingCase` in `received` state
  **WHEN** the worker picks it up
  **THEN** all envelope documents are downloaded via DocuSign `GET /envelopes/{envelopeId}/documents` and written to Azure Blob Storage in a US region

- **GIVEN** each downloaded document
  **WHEN** written to blob
  **THEN** a `Document` row is created with SHA-256 hash, MIME type, page count, and a time-limited SAS URL (1-hour TTL, read-only, IP-restricted to pipeline VNet)

- **GIVEN** the same envelope processed twice (either DocuSign retry or comercial resubmission of an identical file)
  **WHEN** documents are written
  **THEN** duplicate SHA-256 within the same `case_id` is detected and not re-stored; an `AuditEvent` of type `document.dedup_hit` is logged

- **GIVEN** any document write failure (network, quota, permissions)
  **WHEN** detected
  **THEN** the case transitions to `manual_review` with an `AuditEvent` capturing the error; the original documents remain in the DocuSign envelope and are not lost

**Implementation notes:**

- Azure Storage Account configuration:
  - Region: `eastus2` or `centralus` (US-only hard requirement)
  - Immutability policy: **time-based retention enabled**, default 7 years (aligns with SEC 17a-4 retention rule; the Client will confirm exact retention period in kickoff)
  - Versioning: enabled
  - Soft-delete: disabled (immutability supersedes it; enabling both causes redundancy)
  - Encryption-at-rest: Microsoft-managed keys for MVP; customer-managed keys (CMK) can be added in Phase 2 if Client security team requires
- Container naming: one container per `case_id` → simplifies per-case access control
- Do NOT copy documents between blobs; every document is written once and referenced by SAS thereafter
- Password-protected PDFs: detect via header; attempt unlock with no password first, then create a BLOCKER `ValidationFinding` requesting an unprotected version

**Edge cases:**
- Image-only PDFs vs. text-PDFs: handled by F-03 (LandingAI ADE decides)
- Very large documents (>100 MB): store but flag for manual review (typical onboarding docs are <10 MB)
- Envelope documents in unusual formats (e.g. `.heic` from iPhone): convert to PDF via `libreoffice --headless` or similar before storage

**Dependencies:** Requires F-01. Blocks F-03, F-08, F-09, F-12.

---

### F-03 · Document classification + field extraction (LandingAI ADE)

**Status:** SPEC_READY

**Source:**
> *"el equipo empieza y saca como toda la información de todos los nombres, direcciones y todo eso, y lo ponen como en Excel"* — Client Head of Operations

**External dependency docs:** https://docs.landing.ai/ade · https://pypi.org/project/landingai-ade/ · https://github.com/landing-ai/ade-python

**User story:** As the pipeline, I classify each ingested document and extract structured fields so that the downstream validator has normalized, ground-truth-referenced data to compare across documents.

**Acceptance criteria:**

- **GIVEN** a `Document` in blob storage
  **WHEN** the extraction worker processes it
  **THEN** `doc_type` is classified into: `NAF` | `KYC` | `cedula` | `comprobante_domicilio` | `comprobante_ingresos` | `declaracion_renta` | `camara_comercio` | `pasaporte` | `other`, with a `classification_confidence` score

- **GIVEN** a cédula or passport document
  **WHEN** extracted via LandingAI ADE with the `CedulaSchema` Pydantic model
  **THEN** these fields are populated with per-field bounding boxes and confidence scores: `full_name`, `tax_id`, `dob`, `document_number`, `place_of_issue`, `expedition_date`, `expiration_date` (if present on the document)

- **GIVEN** a comprobante de domicilio (utility bill) document
  **WHEN** extracted via ADE with the `DomicilioSchema`
  **THEN** these fields are populated: `account_holder_name`, `address.street`, `address.city`, `address.department`, `address.country`, `service_provider`, `bill_date`

- **GIVEN** a declaración de renta or comprobante de ingresos
  **WHEN** extracted via ADE with the `IngresosSchema`
  **THEN** these fields are populated: `declarant_name`, `declarant_tax_id`, `tax_year`, `annual_declared_income`, `patrimonio_bruto`, `patrimonio_liquido`

- **GIVEN** a cámara de comercio (Colombian Chamber of Commerce certificate) or equivalent corporate registration document
  **WHEN** extracted via ADE with the `CamaraComercioSchema`
  **THEN** these fields are populated: `entity_legal_name`, `tax_id` (NIT), `registered_address`, `legal_representatives[]`, `authorized_signers[]`, `shareholders[]` (each with `name`, `percentage`, `entity_type`, `tax_id`), `incorporation_date`, `activity_code`

- **GIVEN** any document with `classification_confidence < 0.85`
  **WHEN** processed
  **THEN** it is flagged for analyst review with reason `"low-confidence classification"` and is NOT auto-extracted

- **GIVEN** extraction completes
  **WHEN** ExtractedField rows are written
  **THEN** each row includes `extraction_model` (e.g., `"landingai-ade-dpt-2-latest"`), `extraction_confidence`, `bbox`, and `page`

**Implementation notes:**

**Why LandingAI ADE:**
- Zero-shot parsing — no custom model training required (critical-path saving; no sample-document training bottleneck)
- Visual grounding — every field is returned with bounding-box coordinates (required for F-11's analyst UI overlay)
- Schema-driven extraction via Pydantic → JSON Schema conversion (native)
- Per-field confidence scores — drive the exception routing in F-10
- Financial services is an explicit ADE target vertical; DPT-2 model handles tables (cámara de comercio shareholder tables, declaración de renta line items) natively
- US endpoint is default; Enterprise tier supports Zero Data Retention (ZDR) and VPC deployment if required

**SDK integration:**

```python
# pip install landingai-ade
from landingai_ade import LandingAIADE
from landingai_ade.lib import pydantic_to_json_schema
from pydantic import BaseModel, Field

client = LandingAIADE(apikey=os.environ["VISION_AGENT_API_KEY"])  # US production default

# Step 1: Parse document to markdown + layout structure
parse_response = client.parse(
    document=Path(blob_local_path),
    model="dpt-2-latest",
)
# parse_response.chunks contains structured text + bounding boxes per chunk

# Step 2: Extract fields per doc_type schema
class CedulaSchema(BaseModel):
    full_name: str = Field(description="Nombre completo del titular")
    tax_id: str = Field(description="Número de cédula, sin separadores")
    dob: str = Field(description="Fecha de nacimiento en formato YYYY-MM-DD")
    place_of_issue: str = Field(description="Lugar de expedición")
    expedition_date: str = Field(description="Fecha de expedición YYYY-MM-DD")

schema_json = pydantic_to_json_schema(CedulaSchema)

extract_response = client.extract(
    schema=schema_json,
    markdown=parse_response.markdown,
    model="extract-latest",
)

# extract_response.extraction: typed fields
# extract_response.extraction_metadata.<field>.confidence: per-field confidence
# extract_response.extraction_metadata.<field>.bounding_box: per-field bbox
```

**Rate limits & error handling:**
- ADE returns 429 on rate limit. The SDK auto-retries on 408, 429, 502, 503, 504 with exponential backoff + jitter
- Configure `max_retries=5`, `max_retry_wait_time=60s`
- On persistent failure: create `ExtractedField` rows with `extraction_confidence=0` and raise a BLOCKER finding of type `extraction_failed`

**Pricing:**
- Team plan: $250/month for 27,500 credits (credits charged per page processed)
- Expected volume: ~130 cases/month × ~15 docs × ~3 pages avg ≈ 5,850 pages/month — well within Team plan headroom
- Recommend starting on Team plan for pilot; re-evaluate against Enterprise (ZDR + VPC) post-MVP

**Classification strategy (Tier 1 call):**
- Run `parse()` first → get markdown + layout
- Lightweight classification call with `gpt-4o-mini` (Azure OpenAI) against the first page image + extracted markdown → returns `doc_type` with confidence
- Do NOT rely on DocuSign filename — filenames are unreliable per Client observation of commercial-agent naming practices:
  > *"la calidad de la información, que es donde se vuelve complejo"* — Client Head of Operations

**Dual-model verification (deferred to F-06):**
- F-03 runs the primary LandingAI extraction
- F-06 runs a parallel extraction with GPT-4o + Claude Sonnet 4.6 on **BLOCKER-tier fields only** and compares — see F-06 for divergence handling

**Edge cases:**
- Low-quality phone photos: run image-quality pre-check (Laplacian variance blur detection + histogram exposure check) BEFORE calling ADE. If quality below threshold → BLOCKER finding with `requires_comercial_input=true` asking for a better scan
- Multi-page cédula (front + back on separate pages): ADE handles this natively when both pages are in the same document
- Handwritten fields: ADE supports handwriting; flag `extraction_confidence < 0.7` as WARNING
- Expired cédula: separate rule in F-05 (not F-03) — calculate age from `expedition_date`
- Mixed-language docs (Spanish-English bilingual for US-resident Colombians): ADE is multilingual; no special handling

**Dependencies:** Requires F-02. Blocks F-04, F-05, F-06, F-07, F-16.

---

### F-04 · Field normalization layer

**Status:** SPEC_READY

**Source:**
> *"llevan cuánto es la información financiera. Esa información financiera la comparo contra la declaración de renta. La dirección la comparo contra la factura"* — Client Head of Operations

**User story:** As the pipeline, I normalize extracted fields (names, addresses, currencies, dates) so that cross-document comparisons in F-05 are robust to format variance across documents.

**Acceptance criteria:**

- **GIVEN** two names for the same person across documents (e.g. `"JUAN DIEGO MONSALVE GOMEZ"` on cédula, `"Juan D. Monsalve"` on NAF)
  **WHEN** normalized
  **THEN** they share the same canonical form (lowercase, no diacritics, token-ordered, initials expanded when unambiguous)

- **GIVEN** an address in Latin American format
  **WHEN** normalized
  **THEN** components `street`, `number`, `apartment`, `city`, `department`, `postal_code`, `country` are extracted into structured sub-fields

- **GIVEN** income figures in different currencies or formats (`"120.000.000 COP"`, `"$120,000,000"`, `"USD 30,000"`)
  **WHEN** normalized
  **THEN** they are converted to a structured `{amount, currency}` and a USD-equivalent is computed using the tax-year FX rate (Colombian TRM table, cached in-service)

- **GIVEN** a date in any of `DD/MM/YYYY`, `YYYY-MM-DD`, `"15 de enero de 2024"`
  **WHEN** normalized
  **THEN** it resolves to ISO 8601 format

**Implementation notes:**

- Name normalization: `nameparser` library + custom handling for compound Spanish surnames (two-part last names: e.g. `"García López"`)
- Address normalization: Colombian addresses don't fit `libpostal` cleanly. Use an LLM-based normalizer (GPT-4o-mini, temperature 0, JSON mode) with few-shot examples. Document the few-shot prompt in the repo.
- Currency: maintain a TRM FX rate table (DIAN publishes historical TRM). Cache with 30-day TTL.
- All normalization is **deterministic and versioned**. Record `normalizer_version` on `ExtractedField.normalized_value` so historical cases remain reproducible when the normalizer updates.

**Dependencies:** Requires F-03. Blocks F-05.

---

### F-05 · Cross-document field validator

**Status:** SPEC_READY

**Source:**
> *"que lo que el cliente me dijo en el formulario, si me coincide contra su comprobante digamos de ingresos, que la dirección que me dijo si está de acuerdo con la dirección que me entregó en la factura digamos de teléfono o de la casa. Es un análisis como de toda la información a entender, digamos, el cliente completo"* — Client Head of Operations

**User story:** As the pipeline, I compare normalized fields across all documents in the case so that inconsistencies are surfaced as `ValidationFinding` records for human review.

**Acceptance criteria:**

- **GIVEN** an applicant with extracted fields from NAF, cédula, comprobante de domicilio, and declaración de renta
  **WHEN** the validator runs
  **THEN** the rule matrix (configured YAML, see below) is evaluated and a finding is created per mismatch:

  | Rule | Fields compared | Match logic | Severity if mismatch |
  |------|-----------------|-------------|----------------------|
  | R-01 | `full_name` on NAF vs. cédula | Exact after normalization | BLOCKER |
  | R-02 | `tax_id` on NAF vs. cédula | Exact | BLOCKER |
  | R-03 | `dob` on NAF vs. cédula | Exact | BLOCKER |
  | R-04 | `address` on NAF vs. comprobante_domicilio | Fuzzy (90% similarity on street+number; apartment tolerant) | WARNING |
  | R-05 | `declared_income` on NAF vs. declaración_renta | ±15% (configurable) | WARNING |
  | R-06 | `entity_legal_name` on NAF vs. cámara_comercio | Exact after normalization | BLOCKER |
  | R-07 | `authorized_signers` on NAF ⊆ cámara_comercio | Subset test | BLOCKER |

- **GIVEN** a corporate multi-layer case
  **WHEN** validated
  **THEN** each ownership layer (provided by F-16) is verified — missing cámara de comercio for any layer creates BLOCKER `corporate_chain_gap` finding

- **GIVEN** all validations pass
  **WHEN** the validator finishes
  **THEN** the case transitions to `screening`; with any BLOCKER → `awaiting_comercial_fix` if `requires_comercial_input=true`, else `awaiting_analyst`

**Implementation notes:**

- **The rule matrix is a YAML config file in the repo, not hardcoded Python.** Compliance stakeholders will edit thresholds and add rules without code deploys. Example rule definition:

```yaml
rules:
  - id: R-05
    name: declared_income_matches_declaration
    compare:
      source_a: { doc_type: NAF, field_key: declared_income.usd_equivalent }
      source_b: { doc_type: declaracion_renta, field_key: annual_declared_income.usd_equivalent }
    match_logic: tolerance_percentage
    tolerance: 15
    severity_on_mismatch: warning
    requires_comercial_input: false
    message_template: >
      El ingreso declarado en el formulario ({a}) difiere en más de {tolerance}%
      del ingreso reportado en la declaración de renta ({b}).
```

- Fuzzy name matching: token overlap + Levenshtein + Metaphone (Spanish-tuned)
- Fuzzy address matching: weighted (street+number high, apartment low)
- The specific validation rules will be refined during the Client's process walkthrough (kickoff workshop). The dev team ships MVP with the rule matrix above as the starting config; tuning happens post-pilot.

**Edge cases:**
- Expired cédula: separate rule `R-08` — flag if `cedula.expedition_date` is older than the Colombian renewal period (10 years for adults, currently)
- Comprobante de domicilio in family member's name: soft-match, WARNING finding asking analyst to confirm residency proof validity
- Joint accounts with different last names: treat each applicant independently, each validated against their own documents

**Dependencies:** Requires F-04, F-16 (corporate cases). Blocks F-10.

---

### F-06 · Dual-model divergence verifier

**Status:** SPEC_READY

**Source (Program design decision):**
> The LLM error rate (~1.2% in typical configurations) exceeds the human baseline error rate in financial services (~0.3-0.6%). To close this gap for MVP, every BLOCKER-tier extraction is run against two independent models and divergences are routed to humans.

**User story:** As a compliance officer, every critical extraction is run against two independent models so that any divergence is surfaced as a finding requiring human review, closing the gap between LLM error rate and human baseline error rate.

**Acceptance criteria:**

- **GIVEN** a document extraction for a BLOCKER-tier field (`full_name`, `tax_id`, `dob`, `address`, `declared_income`)
  **WHEN** extracted
  **THEN** it runs with Model A (LandingAI ADE — primary, per F-03) AND Model B (GPT-4o via Azure OpenAI) AND Model C (Claude Sonnet 4.6 via AWS Bedrock us-east-1) in parallel

- **GIVEN** three model outputs for the same field
  **WHEN** compared on normalized values (from F-04)
  **THEN** if ≥ 2 of 3 agree → single `ExtractedField` written with `extraction_confidence = max(agreeing_models)` and `extraction_model = "A+B_agreed" | "A+C_agreed" | "B+C_agreed"`

- **GIVEN** three model outputs where no pair agrees (complete divergence)
  **WHEN** compared
  **THEN** all three are stored as separate `ExtractedField` rows AND a BLOCKER `model_divergence` finding is created listing all three values for analyst disambiguation

- **GIVEN** a BLOCKER-tier model divergence
  **WHEN** detected
  **THEN** the case routes to `awaiting_analyst` regardless of other validation outcomes

**Implementation notes:**

- Dual-model ONLY runs on BLOCKER-tier fields (name, tax_id, dob, address, income). Running on every field triples LLM costs for marginal gain.
- Comparison runs on **normalized values** (output of F-04), not raw values. `"JUAN MONSALVE"` vs `"Juan Monsalve"` is not divergence; `"1020304050"` vs `"1020304051"` is.
- Log every divergence to a separate analytics table — this dataset is Phase 2 training data for the ML correction layer referenced in Section 1.6.
- Cost target: < $0.50 per case at expected volumes. At ~130 cases × ~5 BLOCKER fields × 3 models × ~500 input tokens × ~50 output tokens per extraction, well under budget.

**Edge cases:**
- One model fails (timeout, quota): use the 2 remaining models for agreement; if 2 fail → BLOCKER `extraction_failed` finding, manual review
- All three fail: BLOCKER `extraction_failed`, case → `manual_review`
- Persistent divergence on a specific doc_type in the rolling 7-day window: emit ops alert — may indicate a prompt regression or new document variant

**Dependencies:** Requires F-03. Blocks F-10.

---

### F-07 · KYC completeness validator

**Status:** SPEC_READY

**Source:**
> *"El origen de los recursos... como que era la herencia del papá, pero ¿qué hacía el papá?"* — Client Head of Operations
>
> *"Este es el punto en el que más se quedan... Entonces cada vez que yo devuelvo una vinculación, se demoran dos días adicionales el proceso"* — Client Head of Operations

**User story:** As a compliance officer, I want the KYC form automatically scored on completeness and semantic adequacy — especially for the `funds_origin` field — so that incomplete KYCs are bounced back to the commercial agent before they reach my analyst queue.

**Acceptance criteria:**

- **GIVEN** a KYC form extracted
  **WHEN** the validator runs
  **THEN** each expected field is checked for: presence, minimum length (narrative fields), and semantic adequacy (`funds_origin`, `client_relationship_history`, `expected_activity`)

- **GIVEN** `funds_origin` is present but shorter than `min_chars` (configurable, default: 80)
  **WHEN** evaluated
  **THEN** BLOCKER finding with `requires_comercial_input=true` and Spanish message:
  > *"Origen de fondos insuficiente — se necesita detalle sobre la actividad que generó los recursos."*

- **GIVEN** `funds_origin` mentions a source requiring a chain (e.g., `"herencia"`, `"venta de empresa"`, `"bonos"`)
  **WHEN** the next-level detail is missing (e.g., `"herencia"` with no info about the decedent's occupation)
  **THEN** BLOCKER finding with `requires_comercial_input=true` and an LLM-generated Spanish follow-up question specific to the stated source

- **GIVEN** KYC declares `expected_monthly_activity ≥ $2M USD equivalent`
  **WHEN** the case is a new account
  **THEN** regulated enhanced-due-diligence question set is checked for presence

- **GIVEN** all KYC checks pass
  **WHEN** validator finishes
  **THEN** case proceeds to screening

**Implementation notes:**

- LLM rubric scoring: use GPT-4o (Azure OpenAI, temperature 0, JSON mode). The rubric — not the LLM — is the system of record. LLM produces explanations only.
- Maintain a taxonomy of funds sources with required follow-up questions per category:
  ```yaml
  funds_origin_taxonomy:
    herencia:
      required_follow_ups:
        - "Ocupación del causante"
        - "Fecha aproximada de la herencia"
        - "País donde se declaró la sucesión"
    venta_de_empresa:
      required_follow_ups:
        - "Nombre y sector de la empresa vendida"
        - "Año de la venta"
        - "Contraparte compradora"
    salario:
      required_follow_ups:
        - "Empleador actual"
        - "Cargo"
        - "Años en la posición"
    # ... etc
  ```
- This taxonomy is owned by the Client's compliance team and editable without code deploys
- Generated follow-up questions are delivered back to the commercial agent via F-13

**Edge cases:**
- Applicant is existing client of the broader Client group (NAF field `group_existing_client=true`): relax some checks based on Client's group-data-sharing practices, but still require `funds_origin` narrative
  > *"ya viene el grupo, entonces ya ha tenido unas validaciones"* — Client Head of Operations
- High-monthly-activity accounts: invoke SEC-specific EDD question set

**Dependencies:** Requires F-03. Blocks F-10, F-13.

---

### F-08 · Watchlist screening (WorldCheck One API v3)

**Status:** SPEC_READY

**Source:**
> *"WordCheck [sic] que es para toda la revisión de listas de control... Hay una que tiene Login, que es el de listas de control"* — Client Head of Operations

**External dependency docs:** https://developers.lseg.com/en/api-catalog/customer-and-third-party-screening/world-check-one-api · https://developers.lseg.com/content/dam/devportal/en_us/product-docs/wc1-api/documentation/v3/schema-reference/wc1-api-schema-reference-documentation.html

**User story:** As the pipeline, I screen every applicant (natural person or legal entity) against WorldCheck's PEP, sanctions, and enforcement lists via the WorldCheck One API v3 so that hits are attached as evidence before the case reaches an analyst.

**Acceptance criteria:**

- **GIVEN** an applicant with extracted `full_name`, `tax_id`, `dob`, `country`
  **WHEN** the watchlist worker runs
  **THEN** WorldCheck One API v3 is called via `POST /cases?screen=SYNC` with primary name + secondary identifiers (DOB, country, national ID)

- **GIVEN** the synchronous screening response (HTTP 200)
  **WHEN** received
  **THEN** the full `results[]` array is stored as a `ScreeningResult` with `provider="worldcheck_v3"`, `screening_id` mapped to WorldCheck's `caseSystemId`, and the full response JSON archived to the evidence vault

- **GIVEN** a hit with WorldCheck match score ≥ configurable threshold (default: 70 on 0-100 scale)
  **WHEN** received
  **THEN** WARNING finding created with hit metadata and evidence blob link

- **GIVEN** a hit where WorldCheck indicates likely homonym (name match but divergence on DOB/tax_id per WorldCheck record)
  **WHEN** received
  **THEN** finding severity downgraded to INFO with message `"Posible homónimo — verificar manualmente"`
  > *"los homónimos es un tema [donde] no venga usted [automáticamente]"* — Program design guidance

- **GIVEN** zero hits
  **WHEN** received
  **THEN** `ScreeningResult` row is STILL created with `hit_count=0` and signed evidence snapshot — the regulator requires proof that a search occurred, not just that it returned clean

- **GIVEN** ongoing screening (OGS) is enabled for the case
  **WHEN** applicant data changes post-approval
  **THEN** WorldCheck's ongoing screening re-checks automatically; the pipeline polls `POST /cases/ongoingScreeningUpdates` daily

- **GIVEN** the OAuth2 token has expired (configurable lifetime: 5 min / 2 hr / 24 hr)
  **WHEN** a request returns 401
  **THEN** adapter auto-refreshes via `POST /auth/oauth2/v1/token` and retries transparently

**Implementation notes:**

- **Gateway:** `https://api.risk.lseg.com`
- **Base path:** `/screening/v3/`
- **Auth:** OAuth 2.0 (recommended over HMAC for new integrations per LSEG docs)
  - Token endpoint: `POST /auth/oauth2/v1/token`
  - Grant: `client_credentials` via Basic Auth with `service-account-uuid:service-account-password`
  - Token lifetime: **2 hours** (balance between security and refresh overhead)

- **Key endpoints consumed:**
  - `GET /groups` — retrieve Client's top-level screening group (one-time, cached)
  - `GET /references/case-template?groupId={id}&entityType={INDIVIDUAL|ORGANIZATION}` — fetch case schema per entity type
  - `POST /cases?screen=SYNC` — **core call**, creates case and screens synchronously, returns results in same response
  - `GET /references/records/{recordId}` — retrieve full WorldCheck profile for analyst deep-dive
  - `POST /cases/{caseSystemId}/ongoingScreening` — enable ongoing monitoring (default: ON for all approved cases)
  - `POST /cases/ongoingScreeningUpdates` — daily poll for new matches

- **Request body for individual screening:**
```json
{
  "groupId": "{client_group_uuid}",
  "entityType": "INDIVIDUAL",
  "providerTypes": ["WATCHLIST", "MEDIA_CHECK"],
  "caseId": "{atlas_case_uuid}_{applicant_uuid}",
  "name": "<full name>",
  "secondaryFields": [
    { "typeId": "SFCT_1", "value": "<dob YYYY-MM-DD>" },
    { "typeId": "SFCT_2", "value": "<ISO country code>" },
    { "typeId": "SFCT_5", "value": "<national ID>" }
  ]
}
```
  Exact `typeId` codes come from the `case-template` response — do not hardcode them.

- **Environments:** Pilot and Production have different credentials. Use Pilot for integration testing; promote to Production after UAT.
- **Adapter pattern:** wrap WorldCheck behind a `WatchlistProvider` interface (`screen_individual`, `screen_organization`, `enable_ongoing`, `poll_updates`). Preserves ability to swap providers if the Client's license changes.
- **Rate limits:** WorldCheck enforces per-license quota on screenings/hour. Expected volume (~130 cases × ~4 applicants avg = ~520 screenings/month) is well within typical license quotas; confirm during pilot credential provisioning.
- **MEDIA_CHECK provider:** WorldCheck includes structured adverse-media. If the Client's license includes this, it **supplements** F-09's SERP-based adverse media (results merged and deduped by source URL). If not included, F-09 runs standalone.

**Edge cases:**
- Corporate with 10+ UBOs + authorized signers: use WorldCheck's bulk endpoint (v2.41+) for batched screening
- API timeout > 30s: fall back to `screen=ASYNC`, poll `GET /cases/{caseSystemId}/results`
- WorldCheck outage (5xx): circuit breaker, retry 3× with exponential backoff; on persistent failure → case transitions to `manual_review` with BLOCKER `screening_infrastructure_failure` finding (do NOT silently approve)
- Same person across cases: cache result in DB for 24h to reduce quota burn
- Ongoing screening alert on already-approved case: create new `ScreeningResult` + finding, transition case to `compliance_review_needed`; do NOT auto-un-approve

**Dependencies:** Requires F-04. Blocks F-10.

---

### F-09 · Adverse media screening

**Status:** SPEC_READY

**Source:**
> *"Esa digamos, esa partecita de Google la automatizamos un poquito... ya sí tenemos una herramienta que va, revisa, hace como unos filtros de acuerdo con unas palabras y ya te entrega como un resumen"* — Client Head of Operations
>
> *"una cosa es que a mí hubieran demandado por fraude... pero finalmente si el fallo fue que yo no tuve nada que ver, pues no debería tener problema"* — Client Ops Lead

**User story:** As a compliance officer, I want every applicant screened for adverse media so that negative news — especially active legal proceedings (distinct from final convictions) — is surfaced for review with severity classification.

**Acceptance criteria:**

- **GIVEN** an applicant
  **WHEN** adverse media worker runs
  **THEN** web searches in Spanish + English (+ Portuguese for applicable Latin American countries) across categories: `fraude`, `lavado_de_activos`, `corrupción`, `narcotráfico`, `procesos_judiciales`, `sanciones_financieras`, `extorsión`, `bienes_incautados`

- **GIVEN** SERP results
  **WHEN** retrieved
  **THEN** each result passes an LLM disambiguation + severity classification returning: `is_same_person` (yes/no/unclear), `confidence`, `is_adverse`, `severity` (low/medium/high), `ruling_status` (active_proceeding / final_ruling / allegation_only / unknown), `category`, `excerpt`, `reason`

- **GIVEN** any result with `is_adverse=true AND disambiguation_confidence ≥ 0.8`
  **WHEN** found
  **THEN** WARNING finding with source URL, publication date, ≤50-word excerpt, severity, ruling status

- **GIVEN** the applicant is a common-name case (name rarity below threshold, e.g., `"Juan Carlos Rodríguez"`)
  **WHEN** processed
  **THEN** `disambiguation_confidence` required rises to 0.9 AND even high-confidence hits flagged as `"verify manually"` rather than auto-resolved

- **GIVEN** the search completes
  **WHEN** finished
  **THEN** evidence snapshot (search terms, top-20 results per category, timestamp) archived to the vault regardless of hits

- **GIVEN** F-08 WorldCheck MEDIA_CHECK is also enabled
  **WHEN** both adverse-media signals present
  **THEN** findings deduplicated by source URL + applicant_id

**Implementation notes:**

**SERP provider:** **Bing Web Search API** (Azure)
- Aligns with Azure stack
- Cost at expected volume: ~$90/mo (8 categories × 3 languages × 130 cases × ~4 applicants ≈ 12,480 searches/month at Bing S1 tier ~$7/1000)
- US region available

**LLM disambiguation:**
- Model: `gpt-4o-2024-08-06` (Azure OpenAI, temperature 0, JSON mode)
- Prompt must include explicit: *"If uncertain about any field, output 'unclear' or 'unknown'. Do not guess."* — false negatives on adverse media have compliance consequences; conservative output is mandatory
- Input: applicant profile (name, DOB, tax_id, country, occupation if available) + SERP result (title + snippet + URL)

**Output schema (JSON mode):**
```json
{
  "is_same_person": "yes|no|unclear",
  "confidence": 0.0,
  "is_adverse": true,
  "severity": "low|medium|high",
  "ruling_status": "active_proceeding|final_ruling|allegation_only|unknown",
  "category": "fraud|money_laundering|corruption|...",
  "excerpt": "...",
  "reason": "..."
}
```

**Name rarity scoring:**
- Lookup table of name frequencies from DANE public data (Colombian names) + equivalent sources for other Latin American countries
- `rarity_score = 1 / log(frequency + 1)`
- Configurable threshold (default: bottom 40% → "common" → stricter disambiguation)

**Colombian registry direct query (MVP-scoped approach):**

Direct programmatic query against Procuraduría, Policía, Rama Judicial, and Registraduría is **not available** — these portals are CAPTCHA-protected and have no official APIs. WorldCheck One covers ~80% of what an analyst looks up manually; for the remaining ~20% (active judicial proceedings level 2, disciplinary records), the F-11 analyst UI surfaces direct URLs (pre-filled where supported via query params) with analyst-completed CAPTCHA — typical analyst overhead ~90 seconds per registry per flagged case.

Phase 2 option: Playwright + CAPTCHA-solving service RPA. Evaluate after 3 months of MVP operation based on actual registry-lookup volume and cost/benefit vs. analyst time.

**Edge cases:**
- Paywalled content: use snippet-only, flag `"snippet-only, paywalled"`
- Non-Spanish coverage of Spanish-speaking applicant: search in English; disambiguation must handle accent variants (`José` vs `Jose`, `Muñoz` vs `Munoz`)
- Old news: weight last 5 years more heavily; findings >10 years flagged `"historical — context required"`
- Social media noise: exclude Twitter/X, Reddit, blog-spam domains

**Dependencies:** Requires F-04. Blocks F-10.

---

### F-10 · Case scoring + exception router

**Status:** SPEC_READY

**Source (Program design decision):**
Cases should be routed by risk so analysts spend their time on genuine exceptions:
> *"lo único que va a terminar haciendo son las excepciones"* — Program design guidance

**User story:** As the pipeline, I compute a case-level risk score from all findings and screenings so that low-risk cases route to a fast-path analyst queue and high-risk cases escalate with full context.

**Acceptance criteria:**

- **GIVEN** a case with zero BLOCKER findings, zero watchlist hits, zero adverse-media hits
  **WHEN** scored
  **THEN** `risk_score ≤ 0.2` → "fast-path" analyst queue

- **GIVEN** any watchlist hit or adverse-media hit above severity threshold
  **WHEN** scored
  **THEN** `risk_score ≥ 0.7` → "senior analyst" queue with LLM-generated review brief

- **GIVEN** only WARNING findings
  **WHEN** scored
  **THEN** `0.2 < risk_score < 0.7` → standard analyst queue

- **GIVEN** the score is computed
  **WHEN** case transitions
  **THEN** AuditEvent logs the score, top-3 contributing factors, and routing decision (with formula version)

**Implementation notes:**

- Risk score formula: weighted sum, config-driven YAML. Compliance owns the weights.
- Fast-path still requires human sign-off — this redistributes workload, does not remove humans.
- Review brief (for senior-queue cases) is LLM-generated Spanish summary: why the score is high, which findings drove it, which documents to read first, which questions to ask.
- Never re-route a case after scoring; apply new formula only to new cases. Log `formula_version` on every score.

**Dependencies:** Requires F-05, F-06, F-07, F-08, F-09. Blocks F-11.

---

### F-11 · Analyst reviewer UI

**Status:** SPEC_READY

**Source:**
> *"lo único que va a terminar haciendo son las excepciones"* — Program design guidance

**User story:** As an ops analyst, I want a single reviewer UI that shows me every case in my queue with all extracted fields, findings, screenings, and evidence so that I can decide approve / route-back / reject in minutes instead of reopening every document and spreadsheet.

**Acceptance criteria:**

- **GIVEN** I am logged in via Azure AD SSO
  **WHEN** I open the UI
  **THEN** I see my assigned cases grouped by queue (fast-path / standard / senior) with columns: `case_id`, `applicant_name`, `account_type`, `risk_score`, `received_at`, `findings_count`, `sla_remaining`

- **GIVEN** I open a case
  **WHEN** rendered
  **THEN** I see: side-by-side view of original document images + extracted fields with bbox overlays, findings grouped by severity, screenings with evidence links, audit timeline, and three primary actions: **Approve** / **Route back to comercial** / **Reject**

- **GIVEN** I click **Approve** on a case with unresolved BLOCKER findings
  **WHEN** fired
  **THEN** I am forced to record an override justification; the override is logged to AuditEvent with my user ID

- **GIVEN** I click **Route back to comercial**
  **WHEN** fired
  **THEN** I select which findings to include; F-13 dispatches the return via DocuSign + email

- **GIVEN** I click **Reject**
  **WHEN** fired
  **THEN** rejection reason required; case transitions to `rejected`

- **GIVEN** the case is in `awaiting_compliance_approval` state (analyst has approved but US compliance officer has not yet approved in the external custody platform)
  **WHEN** the compliance officer confirms offline approval
  **THEN** they click **"Mark approved in custody system"** → case transitions to `approved`

**Implementation notes:**

- **Stack:** Next.js (App Router) + Tailwind + shadcn/ui (ships fast; handoff-friendly)
- **Document viewer:** overlays extracted-field bboxes on source document images — click field in right panel → highlight on left panel. This is the single most effective UX for analyst review at volume.
- **Keyboard shortcuts** for top-5 actions (analysts doing this all day want hotkeys)
- **No Excel export** — the current analyst workflow uses Excel scratchpads; the goal is to eliminate that, not preserve it
- **Printable PDF summary** for compliance handoff (see F-12 for structure)
- **Time-in-status timer** visible on every case

**Edge cases:**
- Two analysts opening same case: soft-lock with 5-minute timeout; show "currently being reviewed by X" banner
- Case updated by pipeline while analyst has it open: non-blocking toast; analyst can refresh
- Connection loss: local auto-save of notes; sync on reconnect

**Dependencies:** Requires F-10.

---

### F-12 · Immutable evidence vault

**Status:** SPEC_READY

**Source:**
> *"se guardan todas las evidencias, precisamente las revisiones en listas de control"* — Client Head of Operations
>
> *"eso tiene unos tiempos que yo las tengo que mantener"* — Client Head of Operations

**User story:** As a compliance officer, I want every document, extraction, screening response, and analyst action preserved in an immutable store with retention policies so that SEC audits and internal reviews have a verifiable trail.

**Acceptance criteria:**

- **GIVEN** any AuditEvent
  **WHEN** written
  **THEN** append-only — no UPDATE or DELETE permitted at the DB layer (enforced via Postgres role grants and/or row-level policy)

- **GIVEN** any `ScreeningResult`
  **WHEN** created
  **THEN** its `evidence_blob_url` points to an Azure Blob container with immutability policy (time-based or legal-hold) and retention matching SEC 17a-4 (minimum 6 years — confirm exact retention with Client compliance)

- **GIVEN** a compliance officer requests a case export
  **WHEN** they invoke the export API
  **THEN** a single PDF is generated containing: case summary, every document, every extraction, every screening evidence snapshot, every audit event, signed with a pipeline-wide timestamp certificate

- **GIVEN** any system attempts to mutate a record in the evidence vault
  **WHEN** it happens
  **THEN** the mutation fails at the storage layer AND the attempt is logged to a security event channel

**Implementation notes:**

- Azure Blob Storage: `immutableStorageWithVersioning` + time-based retention policy
- Postgres: partitioned append-only tables for audit. DENY UPDATE/DELETE via explicit grants.
- Case-export PDF: invest in formatting (TOC, pagination, embedded SHA-256 hashes of source files)
- All timestamps UTC with millisecond precision

**Edge cases:**
- Legal hold mid-retention: extend retention via storage API; log as AuditEvent
- GDPR/right-to-erasure request: for SEC-regulated accounts, retention obligations override erasure requests; escalate to Client compliance; log the conflict

**Dependencies:** Requires F-02. Blocks: none (parallel to main flow).

---

### F-13 · Commercial agent pre-flight validator + return flow

**Status:** SPEC_READY

**Source:**
> *"cada vez que yo devuelvo una vinculación, se demoran dos días adicionales el proceso del cliente. Y si yo lo devuelvo en la segunda ocasión, se me vuelve, se me triplica ocho días"* — Client Head of Operations
>
> Program recommendation: *"inmediatamente el [mercado/sistema] le dice: oiga, venga, estas son las cosas que usted no tiene"*

**User story:** As a commercial agent, I want to know immediately when a case I submitted has issues so that I can fix them the same day instead of discovering them after ops review two days later.

**Acceptance criteria:**

- **GIVEN** a case where F-05 or F-07 produces a BLOCKER finding with `requires_comercial_input=true`
  **WHEN** validator finishes
  **THEN** case → `awaiting_comercial_fix` AND a return flow triggers automatically (no analyst touch needed)

- **GIVEN** the return flow triggers
  **WHEN** fired
  **THEN** the commercial agent receives: (a) DocuSign envelope correction with specific fields flagged + per-field comments, AND (b) Spanish-language email listing every missing/problematic field with the LLM-generated follow-up question from F-07

- **GIVEN** the commercial agent resubmits via DocuSign
  **WHEN** corrected envelope arrives (F-01 recognizes same `envelopeId`)
  **THEN** pipeline reprocesses the case via F-02 onward WITHOUT creating a new `case_id`; same case is updated, `revision_number` incremented, AuditEvent captures the resubmission cycle

- **GIVEN** a case has been bounced 3+ times to the same comercial
  **WHEN** detected
  **THEN** internal alert to ops team with comercial's name and case history (coaching signal, not punishment)

**Implementation notes:**

- Return email: single Spanish paragraph per missing field, deterministic templates + LLM-generated specific follow-up. Warm tone (not form-letter).
- DocuSign envelope correction via `Envelopes::createCorrectRecipientView` endpoint — the comercial sees "corrections requested", not "new case".
- Per-comercial metrics dashboard: bounce rate, avg cycles-to-approval, top-3 bounce reasons. Surfaced in F-11 as a secondary view. High-value operational feedback.

**Edge cases:**
- Comercial ignores the return for N days: escalate to their manager (default: 3 business days)
- Client abandons: flag case as `abandoned` after 14 days no comercial action
- Multiple bounces on same field from same comercial: auto-offer training-link tooltip

**Dependencies:** Requires F-05, F-07.

---

### F-16 · Corporate ownership chain walker

**Status:** SPEC_READY

**Source:**
> *"estructuras más complejas, como una comunidad que tiene varias capas, en donde la compañía que estoy vinculando es dueña de otra compañía, que a su vez es dueña de otra y por allá al final tenemos a [personas]. Al final yo tengo que llegar al [último] final"* — Client Head of Operations

**User story:** As a compliance officer, I want the system to automatically map multi-layer corporate ownership structures from the cámara de comercio documents so that every ultimate beneficial owner (UBO) is identified and screened, without an analyst manually walking the tree.

**Acceptance criteria:**

- **GIVEN** a corporate case with cámara de comercio extracted (F-03)
  **WHEN** the chain walker runs
  **THEN** it identifies all legal-entity shareholders and natural-person shareholders from the shareholder list

- **GIVEN** a legal-entity shareholder
  **WHEN** detected
  **THEN** the system expects a corresponding cámara de comercio document for that entity — if missing, BLOCKER `corporate_chain_gap` finding with `requires_comercial_input=true`

- **GIVEN** all layers are covered
  **WHEN** walker finishes
  **THEN** every natural-person UBO at the bottom of every chain added as `Applicant` with `role=ultimate_beneficial_owner` and `depth_from_primary` correctly recorded

- **GIVEN** a UBO has ownership percentage below configurable threshold (default: 25%, per FATF guidance)
  **WHEN** detected
  **THEN** recorded but flagged as low-threshold for analyst filtering

**Implementation notes:**

- Traversal depth bound: 10 layers. If deeper → BLOCKER finding requesting ownership affidavit instead of continuing.
- Cross-layer deduplication: a natural person appearing as signer at layer 2 and UBO at layer 4 should be a single Applicant.
- Chain represented as tree data structure; F-11 analyst UI renders visually.

**Edge cases:**
- Circular ownership (A owns B owns A): detect and surface BLOCKER finding for manual review
- Trusts and foundations as intermediate layers: require additional doc types beyond cámara de comercio — extend schema per case type
- Non-Colombian intermediate entities: equivalent of cámara de comercio varies by jurisdiction — prompt comercial for equivalent document

**Dependencies:** Requires F-03, F-04. Blocks F-05 (corporate), F-08, F-09.

---

## 4. Build order

```
Phase 0 — Discovery (week 1, parallel with Phase 1 kickoff):
  • Process walkthrough with Client ops: validation rule matrix tuning (not PRD-blocking)
  • Sample document pack delivered (20-30 redacted real docs per doc_type)
    Used for: F-03 prompt tuning, F-05 rule threshold calibration
  • WorldCheck pilot credentials provisioned by Client via LSEG account manager
  • Azure US-region subscription provisioned, Key Vault set up
  • LandingAI account set up, Team plan activated

Phase 1 — Core intake + extraction (weeks 2-4, demo-able milestone):
  → F-01 DocuSign intake (webhook, HMAC, queue)
  → F-02 Document ingestion + Evidence Vault setup
  → F-12 Evidence Vault (parallel — Postgres append-only schema, audit triggers)
  → F-03 OCR + field extraction (LandingAI ADE, schemas per doc_type)
  → F-04 Field normalization

  🎯 DEMO MILESTONE (end of week 4):
  Real DocuSign envelope → documents extracted → fields normalized → JSON view of all
  applicants + documents. No validation logic yet. Earliest "valuable to Client" deliverable.

Phase 2 — Validation + screening (weeks 5-8):
  → F-16 Corporate ownership chain walker
  → F-05 Cross-document field validator (configurable YAML rule matrix)
  → F-06 Dual-model divergence verifier
  → F-07 KYC completeness validator (funds_origin rubric + taxonomy)
  → F-08 WorldCheck One adapter (OAuth2, sync screening, ongoing screening)
  → F-09 Adverse media screening (Bing SERP + LLM disambiguation)

Phase 3 — Human-in-the-loop (weeks 8-11):
  → F-10 Case scoring + exception router
  → F-11 Analyst reviewer UI (Next.js + Tailwind + shadcn/ui)
  → F-13 Commercial agent pre-flight + DocuSign correction flow

  🎯 MVP CUTOVER (end of week 11):
  Full pipeline in production against a shadow subset of Client onboarding volume.
  Analysts review in parallel with existing process. Metrics: touch-time delta,
  bounce-rate delta, approval-rate delta.

Phase 4 — Post-MVP enhancements (weeks 12+, not in MVP scope):
  • Custody-platform bidirectional status sync (when access confirmed)
  • Salesforce FSC adapter (when Client's FSC data model is finalized)
  • ML correction layer over LLM extractions
  • Document-first UX redesign
  • Colombian government registry RPA (evaluated post-MVP)
```

### Critical path

Longest chain: **F-01 → F-02 → F-03 → F-04 → F-05 → F-10 → F-11**

**Primary bottleneck: F-03 prompt/schema tuning** against real Client documents. Budget 5 days dedicated engineering in weeks 2-3 with the sample document pack.

**Secondary bottleneck: rule matrix definition (F-05)** — dependent on Phase 0 workshop. If workshop slips, F-05 config slips proportionally; the MVP ships with default thresholds and iterates on feedback.

No external-vendor research is on the critical path.

---

## 5. Technology stack (authoritative)

All components **must** be deployed in US regions. No EU, no Asia.

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Backend runtime | Python 3.11 + FastAPI | High I/O concurrency; FastAPI native async |
| Task queue | Azure Service Bus | Native Azure; reliable with DocuSign retry semantics |
| Primary database | Postgres 16 (Azure Flexible Server) | pgvector ready; append-only audit via role grants |
| Blob storage | Azure Blob Storage (East US 2) | Immutability policy; SAS-based access |
| Secrets | Azure Key Vault | Native; HSM-backed |
| Auth (analyst UI) | Azure AD (Entra ID) SSO | Aligns with typical enterprise IAM |
| OCR + extraction | LandingAI ADE (SDK: `landingai-ade`) | Zero-shot, visual grounding, schema-driven, US endpoint default |
| LLM — classification | GPT-4o-mini (Azure OpenAI East US 2) | Cheap, fast, structured output |
| LLM — extraction Model B | GPT-4o (Azure OpenAI East US 2) | Dual-model verification pair A |
| LLM — extraction Model C | Claude Sonnet 4.6 (AWS Bedrock us-east-1) | Dual-model verification pair B; truly independent reasoning |
| SERP | Bing Web Search API S1 | Azure-aligned; predictable pricing |
| Watchlist | LSEG WorldCheck One API v3 | Existing Client relationship; full REST API |
| E-sign | DocuSign eSignature (Connect webhook) | Existing Client system; source of truth for envelopes |
| Frontend | Next.js 15 (App Router) + TypeScript | Stable, handoff-friendly |
| UI kit | Tailwind + shadcn/ui | Matches pattern libraries the Client's tech team expects |
| Document viewer | `react-pdf` + custom bbox overlay | No external viewer dependency |
| Observability | OpenTelemetry + Azure Monitor | Standard |

**What is deliberately NOT used:**
- Azure Document Intelligence — replaced by LandingAI ADE (zero-shot vs. requires custom model training)
- GCP services — Azure + AWS only (US-region data residency control)
- Node.js backend — Python-first for AI/ML library maturity
- Any service that routes through EU by default — explicitly forbidden

---

## 6. MVP user stories — consolidated index

| ID | Actor | I want to... | So that... | Features | Validated by AC in |
|----|-------|--------------|------------|----------|-------------------|
| US-01 | Commercial agent | Submit a vinculación via DocuSign as today | Pipeline picks it up automatically | F-01 | F-01 AC-1,2,3 |
| US-02 | Commercial agent | Receive immediate feedback if my KYC is incomplete | I can fix same-day | F-13 + F-07 | F-13 AC-1,2 + F-07 AC-2,3 |
| US-03 | Commercial agent | Receive specific Spanish questions about what's missing | Client knows exactly what's needed | F-07 + F-13 | F-07 AC-3 + F-13 AC-2 |
| US-04 | Ops analyst | Open case, see docs + extractions side-by-side with bboxes | Verify AI extractions at a glance | F-11 | F-11 AC-2 |
| US-05 | Ops analyst | See only cases needing judgment | Focus on exceptions | F-10 + F-11 | F-10 AC-1,2,3 + F-11 AC-1 |
| US-06 | Ops analyst | See findings grouped by severity with sources | Know why each case was flagged | F-05 + F-06 + F-07 + F-08 + F-09 | All F-xx AC |
| US-07 | Ops analyst | One-click route case back to comercial | Don't rewrite same email 50× | F-13 | F-11 AC-4 + F-13 AC-1,2 |
| US-08 | Ops analyst | See watchlist hits with scores + record deep-links | Disambiguate quickly | F-08 + F-11 | F-08 AC-3,4 + F-11 AC-2 |
| US-09 | Ops analyst | See adverse-media hits with LLM severity + ruling status | Skip known false positives | F-09 + F-11 | F-09 AC-2,3 |
| US-10 | Ops analyst | Override BLOCKER findings with required justification | Handle legitimate exceptions | F-11 | F-11 AC-3 |
| US-11 | Ops analyst | Click "Ready for custody-system approval" | End-to-end state tracked | F-11 | F-11 AC-6 |
| US-12 | Compliance officer | Export full case PDF | Auditable evidence | F-12 | F-12 AC-3 |
| US-13 | Compliance officer | Prove to SEC every screening occurred | Meet 17a-4 retention | F-12 | F-12 AC-2 |
| US-14 | Compliance officer | Edit validation rule thresholds without a dev | Tune system based on operational feedback | F-05 + F-07 (YAML-driven) | F-05 implementation notes |
| US-15 | System | Handle corporate chains (company → company → company → UBOs) | No UBO slips through | F-16 | F-16 AC-1,2,3 |
| US-16 | System | Run independent models on BLOCKER fields, flag divergences | LLM error rate ≤ human baseline | F-06 | F-06 AC-1,2,3,4 |
| US-17 | System | Survive watchlist outage without silently approving | Compliance never compromised | F-08 (circuit breaker) | F-08 edge cases |
| US-18 | System | Monitor approved cases via WorldCheck ongoing screening | Post-approval changes caught | F-08 OGS | F-08 AC-6 |

**18/18 user stories traceable to feature-level acceptance criteria.**

---

## 7. Operational requirements

### 7.1 Performance

| Metric | Target |
|--------|--------|
| DocuSign webhook response (p99) | < 500ms |
| Document ingestion to first OCR result | < 3 minutes per document |
| End-to-end pipeline for clean individual case (all automated) | < 15 minutes |
| Analyst touch time on clean case | ≤ 10 minutes (down from current ~45 min) |
| Comercial bounce latency (F-13) | < 5 minutes from DocuSign completion |

### 7.2 Reliability

| Concern | Requirement |
|---------|-------------|
| Availability | 99.5% (MVP); 99.9% (Phase 2 target) |
| Data durability | 11 9's (Azure Blob default in US region) |
| Backup | Postgres: daily snapshot + 30-day PITR |
| Disaster recovery | RTO 4 hours, RPO 1 hour for MVP |

### 7.3 Security

| Concern | Requirement |
|---------|-------------|
| Data residency | US-only (see §2.2) |
| Encryption at rest | All blobs + DB Microsoft-managed keys; CMK in Phase 2 if required |
| Encryption in transit | TLS 1.3 minimum everywhere |
| Secrets | Azure Key Vault only; never in code, env files, or config repos |
| Auth (analyst UI) | Azure AD SSO |
| Auth (internal services) | mTLS between microservices |
| Audit | Every state transition → AuditEvent (§2.3 — append-only) |
| Compliance | SEC 17a-4 evidence retention; SOC 2 Type II target for Phase 2 |

### 7.4 Observability

- Structured logging via OpenTelemetry, sink to Azure Monitor
- Per-feature dashboards:
  - F-03 extraction confidence distribution
  - F-06 dual-model divergence rate (target: trending down week-over-week)
  - F-08 WorldCheck API latency + hit rate
  - F-10 case routing by queue + risk score distribution
  - F-11 analyst touch-time per case
  - F-13 comercial bounce rate per comercial

---

## 8. Open items (operational, not blocking)

These items do not block implementation start. They resolve during kickoff and early sprints.

| # | Item | Resolves by | Impact if delayed |
|---|------|-------------|-------------------|
| 1 | Sample document pack delivery (20-30 per doc_type) | Kickoff week 1 | F-03 prompt/schema tuning accelerates when received; ships with default schemas until then |
| 2 | Validation rule matrix final tuning | Kickoff week 1 workshop | MVP ships with default thresholds in §3 F-05; tunes post-pilot |
| 3 | WorldCheck pilot + production credentials | Client LSEG account-manager call | Use pilot credentials for UAT; promote to production at cutover |
| 4 | Exact SEC 17a-4 retention period for Client | Client compliance team | Default 7 years; adjust blob immutability policy when confirmed |
| 5 | Risk score weights + fast-path % | Client compliance team | Ship conservative defaults; compliance team tunes via YAML config |
| 6 | WorldCheck MEDIA_CHECK license inclusion | Client LSEG account-manager call | Both F-08 MEDIA_CHECK and F-09 SERP paths coded; remove redundant path after 30 days of operational data |

---

## 9. What this PRD does not specify

Intentional scope boundaries for the implementation team:

1. **Exact Client corporate-user onboarding UI for the analyst app** — Azure AD SSO integration is specified, but the Client's specific AD tenant configuration, RBAC groups, and onboarding/offboarding procedures are operational items the Program handles with the Client directly.
2. **Production deployment topology** — the implementation team ships a Bicep/Terraform IaC scaffold; the Program owns the production Azure subscription and deployment pipeline.
3. **Backup/DR procedures** — implementation team ensures DB supports PITR and blob has point-in-time restore; the Program owns the runbook.
4. **Comercial-side UI changes** — the commercial agents interact only with DocuSign (F-01, F-13); no separate commercial-facing UI is in MVP scope.
5. **Customer-facing UX** — the end customer flow is unchanged from the Client's current state (out of scope per §1.5).

---

## 10. Acceptance of this PRD

This document is considered the single source of truth for Atlas MVP implementation. Deviations from its specifications require written amendment through the Program's change-management process.

**What the implementation team commits to:**
- Each feature is built against its stated acceptance criteria
- Every requirement traces to a source quote (either transcript or documented external dependency)
- Any ambiguity encountered during implementation is surfaced to the Program within 24 hours — not silently interpreted
- Phase milestones (demo at week 4, MVP cutover at week 11) are the authoritative schedule

**What the Program commits to:**
- Client stakeholder access for the Phase 0 workshop within week 1 of kickoff
- Sample document pack delivery within week 1 of kickoff
- Access to Client's DocuSign, WorldCheck, and Azure subscription for credential provisioning
- Any scope change is negotiated explicitly — no silent drift

---

**End of PRD.**
