# Forma Mentis ODV — Sito istituzionale

Sito web completo per **Forma Mentis ODV**, associazione siciliana (dal 2016) che aggrega
una rete territoriale di professionisti, imprese, startup e realtà locali.

Comprende:

- **Landing page** animata (scroll cinematografico con GSAP ScrollTrigger)
- **Pagine progetto** dinamiche `/progetti/[slug]`
- **Pannello admin** protetto `/admin` per gestire contenuti senza toccare il codice

> 💡 **Modalità demo**: il sito funziona da subito anche **senza Supabase**, usando dati di
> esempio (`src/lib/fallback-data.ts`). Configura Supabase per abilitare admin e persistenza.

---

## Stack tecnico

| Layer            | Tecnologia                                   |
| ---------------- | -------------------------------------------- |
| Frontend         | Next.js 14 (App Router) + TypeScript         |
| Stile            | Tailwind CSS                                 |
| Animazioni       | GSAP + ScrollTrigger                         |
| Backend / DB     | Supabase (PostgreSQL + Storage)              |
| Autenticazione   | Supabase Auth (email + password)             |
| Deploy           | Vercel                                       |

**Stile**: editoriale/luxury chiaro — immagini a tutto schermo, ampio spazio bianco,
animazioni cinematografiche (ken-burns, parallax, reveal a maschera, testo che si illumina).
**Tipografia**: Cormorant Garamond (titoli serif) + DM Sans (testo/UI) — Google Fonts.
**Palette**: canvas chiaro `#F4F5F6`, testo near-black `#16191C`, accento blu `#157CB8`
(estratto dal logo Forma Mentis). Le immagini editoriali sono in `src/lib/images.ts`
(facilmente sostituibili).

---

## 1. Avvio rapido (locale)

```bash
npm install
cp .env.local.example .env.local   # opzionale finché non usi Supabase
npm run dev
```

Apri http://localhost:3000 — il sito gira in **modalità demo** con i 3 progetti di esempio.

---

## 2. Configurazione Supabase

### 2.1 Crea il progetto

1. Vai su [supabase.com](https://supabase.com) → **New project**.
2. Da **Project Settings → API** copia:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - chiave **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - chiave **service_role** (segreta) → `SUPABASE_SERVICE_ROLE_KEY`

Inseriscile in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...
```

### 2.2 Crea le tabelle, le policy e lo storage

Apri **SQL Editor** su Supabase ed esegui, nell'ordine:

1. [`supabase/schema.sql`](./supabase/schema.sql) → tabelle `projects`, `team_members`,
   `settings`, Row Level Security (lettura pubblica, scrittura autenticata) e il bucket
   pubblico **`media`** con le relative policy.
2. [`supabase/seed.sql`](./supabase/seed.sql) → popola i **3 progetti** iniziali, il team e i
   testi dell'associazione. È idempotente (puoi rieseguirlo).

### 2.3 Crea l'utente admin

In **Authentication → Users → Add user** crea un utente con email + password
(spunta *Auto Confirm User*). Userai queste credenziali per accedere a `/admin`.

### 2.4 (Opzionale) Carica il logo di Campus in Salute nello Storage

Il seed usa il path locale `/projects/campus-in-salute.png` (servito da `public/`), quindi
funziona già. Se preferisci servirlo da Supabase Storage, caricalo nel bucket `media` e
aggiorna `immagine_url` del progetto con l'URL pubblico (oppure rifai l'upload dal pannello
admin → Modifica progetto).

Riavvia `npm run dev`: ora il sito legge i dati da Supabase e `/admin` è operativo.

---

## 3. Pannello Admin

Accesso: **`/admin`** → login con l'utente creato al passo 2.3.

| Sezione               | Operazioni                                                                 |
| --------------------- | -------------------------------------------------------------------------- |
| **Progetti**          | Crea / modifica / elimina. Campi: nome, slug (auto), descrizione breve e completa, immagine (upload), link esterno + CTA, ordine, attivo. |
| **Team**              | Crea / modifica / elimina membri. Campi: nome, ruolo, foto (upload), ordine. |
| **Info Associazione** | Modifica testo "Chi Siamo", email, indirizzo, telefono e link social.      |

Le immagini caricate finiscono nel bucket `media` di Supabase Storage.
Le modifiche compaiono sul sito pubblico entro **~60 secondi** (rivalidazione ISR).

---

## 4. Deploy su Vercel

1. Carica il progetto su un repository Git e importalo su [vercel.com](https://vercel.com).
2. In **Settings → Environment Variables** aggiungi le 3 variabili del passo 2.1
   (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`).
   Aggiungi anche `NEXT_PUBLIC_SITE_URL` con l'URL di produzione (per metadati/OG).
3. Deploy. Vercel rileva Next.js automaticamente — nessuna configurazione extra.

> In **Supabase → Authentication → URL Configuration** aggiungi il dominio Vercel tra i
> *Redirect URLs* / *Site URL*.

---

## 5. Struttura del progetto

```
SITO FORMA MENTIS/
├─ public/
│  ├─ formamentis.png            # logo associazione (sfondo trasparente)
│  └─ projects/
│     └─ campus-in-salute.png    # copertina progetto Campus in Salute
├─ supabase/
│  ├─ schema.sql                 # tabelle + RLS + bucket storage
│  └─ seed.sql                   # dati iniziali (3 progetti, team, settings)
└─ src/
   ├─ app/
   │  ├─ layout.tsx              # font, metadati globali
   │  ├─ page.tsx                # landing page (Server Component, ISR 60s)
   │  ├─ not-found.tsx           # 404 personalizzata
   │  ├─ progetti/[slug]/page.tsx
   │  └─ admin/
   │     ├─ layout.tsx
   │     ├─ page.tsx             # dashboard (protetta)
   │     └─ login/page.tsx
   ├─ components/
   │  ├─ Hero, ChiSiamo, Progetti, ProjectCard, Team, Footer, Navbar …
   │  └─ admin/                  # ProjectsManager, TeamManager, SettingsManager, …
   ├─ lib/
   │  ├─ data.ts                 # fetch con fallback automatico
   │  ├─ fallback-data.ts        # dati modalità demo
   │  ├─ supabase/{client,server,admin,middleware}.ts
   │  ├─ types.ts                # tipi + chiavi settings
   │  └─ slug.ts                 # generatore slug
   └─ middleware.ts              # refresh sessione + protezione /admin
```

---

## 6. Script

| Comando         | Descrizione                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Server di sviluppo (hot reload)      |
| `npm run build` | Build di produzione                  |
| `npm run start` | Avvia la build di produzione         |
| `npm run lint`  | Linting                              |

---

## Note

- **Accessibilità**: le animazioni rispettano `prefers-reduced-motion` e c'è un fallback
  `no-js` che mostra sempre i contenuti se JavaScript è disattivato.
- **Sicurezza**: `SUPABASE_SERVICE_ROLE_KEY` è usata solo lato server (mai esposta al client).
  La scrittura su DB e Storage è limitata agli utenti autenticati via Row Level Security.
- Gli asset originali ad alta risoluzione presenti nella cartella (`Group*.png/.jpg`) sono
  esclusi dal repo tramite `.gitignore`; le versioni ottimizzate sono in `public/`.
