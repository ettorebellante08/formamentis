-- ============================================================================
--  Forma Mentis ODV — Dati iniziali (seed)
--  Esegui dopo schema.sql. Idempotente: usa upsert su slug/chiave.
--
--  NOTA sulle immagini:
--   - "Campus in Salute" usa l'immagine già presente nel progetto
--     (public/projects/campus-in-salute.png). Per servirla da Supabase Storage
--     caricala nel bucket "media" e sostituisci immagine_url con l'URL pubblico,
--     oppure lascia il path locale (funziona comunque, è servito da /public).
--   - Gli altri due progetti usano immagini placeholder (Unsplash).
-- ============================================================================

-- PROGETTI -------------------------------------------------------------------
insert into public.projects
  (nome, slug, descrizione_breve, descrizione_completa, immagine_url, ordine, attivo)
values
  (
    'Campus in Salute',
    'campus-in-salute',
    'Benessere e assistenza per gli studenti universitari: una rete di servizi per la salute fisica e psicologica nei campus siciliani.',
    E'Campus in Salute è il progetto di Forma Mentis ODV dedicato al benessere della comunità studentesca universitaria. Nasce dalla consapevolezza che il percorso universitario, oltre alla formazione, richiede un ecosistema di supporto capace di prendersi cura della persona nella sua interezza.\n\nIl progetto mette in rete atenei, professionisti sanitari, associazioni e istituzioni locali per offrire servizi di prevenzione, ascolto psicologico, educazione alla salute e assistenza agli studenti fuori sede. Attraverso sportelli dedicati, campagne informative e attività sul territorio, Campus in Salute promuove uno stile di vita sano e un ambiente accademico più inclusivo e attento.\n\nObiettivo di lungo periodo è costruire un modello replicabile di welfare studentesco, in cui pubblico e privato collaborano per garantire a ogni studente l''accesso a cure, informazione e supporto di qualità.',
    '/projects/campus-in-salute.png',
    1,
    true
  ),
  (
    'Rete d’Impresa Sicilia',
    'rete-impresa-sicilia',
    'Un programma di matching tra startup, PMI e professionisti per generare collaborazioni, innovazione e nuove opportunità di crescita.',
    E'Rete d''Impresa Sicilia è il programma con cui Forma Mentis ODV accompagna imprese, startup e liberi professionisti nella costruzione di alleanze strategiche sul territorio.\n\nAttraverso tavoli di lavoro tematici, eventi di networking e percorsi di mentorship, il progetto favorisce l''incontro tra domanda e offerta di competenze, capitali e idee. Le realtà coinvolte trovano qui uno spazio neutrale dove confrontarsi, condividere buone pratiche e avviare progettualità comuni.\n\nL''iniziativa si propone di rafforzare la competitività del tessuto economico siciliano, valorizzando le eccellenze locali e stimolando l''innovazione attraverso la cooperazione tra attori pubblici e privati.',
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80',
    2,
    true
  ),
  (
    'Talenti del Territorio',
    'talenti-del-territorio',
    'Formazione, orientamento e valorizzazione dei giovani talenti siciliani per trattenere competenze e attrarre nuove energie.',
    E'Talenti del Territorio è il progetto formativo di Forma Mentis ODV pensato per intercettare, formare e valorizzare i giovani talenti della Sicilia.\n\nIl percorso combina laboratori, workshop con professionisti, esperienze sul campo e attività di orientamento per offrire ai partecipanti competenze concrete e una rete di relazioni utili al loro futuro professionale. Particolare attenzione è dedicata ai temi dell''innovazione, della sostenibilità e della transizione digitale.\n\nContrastare la fuga dei cervelli e creare condizioni perché i talenti possano crescere e mettersi in gioco nel proprio territorio: questa è la sfida che Talenti del Territorio affronta, mettendo in connessione scuole, università, imprese e istituzioni.',
    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1600&q=80',
    3,
    true
  )
on conflict (slug) do update set
  nome = excluded.nome,
  descrizione_breve = excluded.descrizione_breve,
  descrizione_completa = excluded.descrizione_completa,
  immagine_url = excluded.immagine_url,
  ordine = excluded.ordine,
  attivo = excluded.attivo;

-- TEAM -----------------------------------------------------------------------
insert into public.team_members (nome, ruolo, ordine) values
  ('Marco Rossi',    'Presidente',                  1),
  ('Giulia Marino',  'Vicepresidente',              2),
  ('Antonio Russo',  'Responsabile Progetti',       3),
  ('Chiara Bianchi', 'Responsabile Comunicazione',  4)
on conflict do nothing;

-- IMPOSTAZIONI ---------------------------------------------------------------
insert into public.settings (chiave, valore) values
  ('chi_siamo', 'Forma Mentis ODV (nata nel 2016) si configura come soggetto aggregatore di una rete territoriale di professionisti, imprese, startup e realtà locali operanti in diversi ambiti del territorio siciliano. L''associazione favorisce la costruzione di relazioni collaborative tra attori pubblici e privati, promuovendo un modello di cooperazione orientato all''innovazione, alla crescita competitiva e alla valorizzazione delle eccellenze del territorio.'),
  ('email_contatto', 'info@formamentisodv.it'),
  ('indirizzo', 'Sicilia, Italia'),
  ('telefono', ''),
  ('social_facebook', ''),
  ('social_instagram', ''),
  ('social_linkedin', '')
on conflict (chiave) do update set valore = excluded.valore;
