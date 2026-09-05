# Hyrox Business — Strategie & Umsetzungsplan

**Stand:** 05.09.2026 · **Saison:** HYROX 26/27 · **Ziel-Meilenstein:** Pro-Division ab Februar 2027

---

## 0. Kurzfassung

Dein Plan trägt. Die sportliche Logik (Open-Rennen → sub 60 → Pro ab Februar 2027) ist
zufällig auch genau die Logik, die HYROX selbst vorschreibt — das ist ein Glücksfall, weil
dein persönliches Ziel und die offizielle Qualifikationsschwelle zusammenfallen. Daraus lässt
sich eine Story bauen, die über eine ganze Saison trägt.

Fünf Dinge würde ich gegenüber deiner Skizze ändern:

| # | Deine Skizze | Empfehlung | Warum |
|---|---|---|---|
| 1 | „Als Deutscher im Ausland auffallen" als Hook | Reicht nicht als Positionierung — braucht eine zweite Achse (siehe §2) | Es gibt hunderte deutsche Athleten im Ausland und tausende sub-60-Finisher. Nationalität ist kein Alleinstellungsmerkmal. |
| 2 | Video-Avatar nur gegen Bezahlung | Zweistufig: kurze Session gegen E-Mail (gratis), lange Session gegen Geld | Ein reiner Paywall-Avatar generiert **keine** Leads — und Leads sind laut deiner eigenen Zielsetzung der Zweck. |
| 3 | Twitch-Livestreams von Workouts ab Start | Zurückstellen bis ~5.000 IG-Follower; stattdessen IG-Live / YT-Live | Twitch hat praktisch keine Discovery. Streamen ohne Publikum kostet 4–6 h/Woche für ~0 Reichweite. |
| 4 | Mobile App für KI-Trainingspläne | Erst Web-Generator auf der eigenen Site, App frühestens 2028 | App-Stores, Abo-Abrechnung und Support kosten ein Vielfaches; der Web-Generator testet dieselbe Hypothese in 4 Wochen. |
| 5 | Alles parallel ab sofort | Drei Phasen mit Entscheidungs-Gates (§10/§11) | 12–14 h Training + Content + Website + Shop + App gleichzeitig ist der klassische Weg, sub 60 **nicht** zu schaffen. |

Der rote Faden für die nächsten 12 Monate: **eine einzige, überprüfbare Story** — „Von Open
zu Pro in einer Saison" — die alle Kanäle, die Website und später die Produkte zusammenhält.

---

## 1. Ausgangslage & ehrliche Einschätzung

### 1.1 Was an deinem Plan gut ist

- **Der Zeitpunkt stimmt.** Die Saison 26/27 startet gerade; die deutschen Rennen liegen
  günstig (Karlsruhe Anfang Oktober, Hamburg Ende Oktober, Düsseldorf November, Frankfurt
  Dezember 2026 — Termine vor Buchung auf hyrox.com gegenprüfen). Du hast damit 2–3
  Open-Versuche vor deinem Februar-Ziel.
- **Die Story hat einen Cliffhanger.** „Schaffe ich sub 60?" ist ein Spannungsbogen mit
  eingebautem, öffentlich überprüfbarem Ergebnis. Das ist genau die Art von Narrativ, die
  Abonnenten hält — im Gegensatz zu „hier ist mein Workout".
- **Sub 60 ist echt.** Sub-60 im Open ist Top-5-bis-10-%-Niveau. Das ist keine Vanity-Marke,
  sondern eine Leistung, die Sponsoren und Publikum als Beleg akzeptieren.
- **Der Tech-Stack existiert schon.** Das Repo hat bereits Next.js 16, Shop-Struktur und eine
  Tavus-Integration für den Video-Avatar. Du baust nicht bei null an.

### 1.2 Die drei Risiken, die ich sehe

**Risiko 1 — Positionierung zu unscharf.** „Deutscher Athlet, der im Ausland gute Zeiten
läuft" beschreibt eine große Gruppe. Der Zuschauer muss in einem Satz sagen können, warum er
*dir* folgt und nicht einem der 200 anderen Hyrox-Creator. Lösung in §2.

**Risiko 2 — Zielkonflikt Training vs. Content.** Sub 60 braucht realistisch 10–14 h
strukturiertes Training pro Woche. Ein wöchentlicher YouTube-Vlog in ordentlicher Qualität
braucht 8–12 h. Plus Website, Shop, App. Das geht sich neben einem Vollzeitjob nicht aus —
etwas muss reduziert werden, und die Entscheidung triffst du besser bewusst als durch
Erschöpfung. Lösung in §3.4 und §4.5.

**Risiko 3 — Monetarisierung vor Publikum.** Shop, Avatar-Paywall und App sind
Ernte-Instrumente. Ohne Publikum ernten sie nichts. Die Reihenfolge in §8.1 dreht das um.

---

## 2. Positionierung

### 2.1 Das Problem mit „guter Deutscher im Ausland"

Reichweite entsteht nicht durch Leistung allein, sondern durch **Wiedererkennbarkeit**.
Leistung ist der Beleg, nicht der Haken. Wenn deine Zeit die einzige Differenzierung ist,
konkurrierst du direkt mit Elite-Athleten, die schneller sind als du — ein Rennen, das du
sportlich (noch) nicht gewinnst.

Was „im Ausland" tatsächlich wert ist: **Orte sind visuell und emotional unterscheidbar,
Zeiten nicht.** Ein Vlog aus Kapstadt, Dubai oder Hongkong sieht anders aus als der
zehnte Clip aus einer deutschen Messehalle. Nutze das Ausland als *Bühne*, nicht als
Behauptung.

### 2.2 Drei Positionierungs-Optionen

| Option | Kernsatz | Stärke | Schwäche |
|---|---|---|---|
| **A — Der Reise-Athlet** | „Ein Rennen, eine Stadt, ein Film." | Visuell einzigartig, YouTube-freundlich, sponsorfähig (Reise, Nutrition, Gear) | Teuer; Reichweitenwachstum langsamer als reine Fitness-Hooks |
| **B — Das Sub-60-Projekt** | „Von Open zu Pro in einer Saison — jede Zahl offen." | Klarer Bogen, hoher Wiederkommens-Anreiz, perfekt für Daten-Content | Endet mit dem Ziel; braucht danach ein Nachfolge-Narrativ |
| **C — Der Engineer-Athlet** | „Ich trainiere mich mit KI und zeige die Daten." | Brücke zur App, differenziert sofort, GEO-Gold (zitierfähige Inhalte) | Nischig; erfordert echte Datentiefe und Ehrlichkeit auch bei Misserfolg |

**Empfehlung: B als Saison-Kampagne, getragen von A als visuellem Stil, mit C als
Produktbrücke.**

Konkret: Die Saison 26/27 läuft als benanntes Projekt („Road to Pro" o. ä.). Jedes Rennen ist
eine Episode in einer anderen Stadt (A liefert die Bilder). Parallel veröffentlichst du deine
Trainingsdaten und die KI-generierten Pläne offen (C liefert den Beleg und später das
Produkt). Nach dem Pro-Wechsel wird aus B automatisch „Road to World Championships" — der
Bogen setzt sich fort (WM 2027 in Hongkong, 10.–13. Juni 2027).

### 2.3 Markenname & Domain — ein Warnhinweis

**Verwende „HYROX" nicht in deinem Marken-, Kanal- oder Domainnamen.** HYROX ist eine
eingetragene Marke, und der Veranstalter geht gegen Trittbrettfahrer vor. Zulässig ist die
beschreibende Nennung („Ich starte bei HYROX Hamburg"), nicht die Aneignung
(`hyrox-thomas.de`, „Hyrox Coaching by X"). Baue eine eigene Wortmarke auf — die trägt
langfristig ohnehin mehr, weil sie dich vom Format unabhängig macht (Hybrid-Racing wächst
über HYROX hinaus).

Praktische Regel für Domain und Handles: **ein Name, überall identisch**, ohne Zahlen und
Unterstriche. Identische Handles über alle Plattformen sind auch ein GEO-Faktor (§6.2,
Entitäts-Konsistenz).

---

## 3. Der sportliche Pfad: Open → Pro → WM

### 3.1 Wie die Pro-Qualifikation wirklich funktioniert

Wichtig, weil es deinen Plan bestätigt und zugleich präzisiert:

- Der Zugang zur **Pro-Division** läuft über ein **Open-Rennen unter der
  Qualifikationszeit** deiner Alters- und Geschlechtsklasse. Für Männer im Open liegt diese
  Schwelle je nach Altersklasse etwa im Bereich **sub 57–60 Minuten**.
- Deine selbst gesetzte 60-Minuten-Marke ist also ungefähr die offizielle Schwelle — aber
  **je nach Altersklasse ggf. ein paar Minuten zu langsam.** Prüfe die exakte Zeit für deine
  Altersklasse auf hyrox.com, bevor du planst. Wenn deine Klasse sub 57 verlangt, ändert das
  deinen Trainingsplan erheblich.
- Ab der WM 2026 wird **primär über die Pro-Division** für die Weltmeisterschaft qualifiziert
  (Ausnahmen: Regional Championships mit Open-Slots, sowie Altersklassen 60+).
- Für die **WM 2027 in Hongkong (10.–13. Juni 2027)** zählen Events bis zum Renn-Wochenende
  **16. Mai 2027** als Qualifier. Danach zählt alles auf 2028 ein.
- Die **Elite 15** sind die 15 schnellsten Pro-Athleten pro Division und Saison. Das ist
  aktuell nicht dein Ziel, aber es ist der Grund, warum Pro-Zeiten öffentlich und vergleichbar
  sind — gut für Content.

> **To-do vor allem anderen:** Qualifikationszeit für deine exakte Altersklasse und Saison
> 26/27 nachschlagen und in `docs/` festhalten. Der ganze Plan hängt an dieser einen Zahl.

### 3.2 Rennplan Saison 26/27 (Vorschlag)

| Zeitraum | Rennen | Rolle im Plan | Content-Rolle |
|---|---|---|---|
| Okt 2026 | Deutschland #1 (z. B. Karlsruhe) | **Baseline.** Ehrliche Ausgangszeit, kein Druck. | Episode 1: „Wo ich wirklich stehe" — Zeit ungeschönt zeigen |
| Nov 2026 | Deutschland #2 (Hamburg/Düsseldorf) | **Pacing-Test.** Eine Variable ändern (z. B. Roxzone-Zeit). | Episode 2: Was ich zwischen Rennen 1 und 2 geändert habe |
| Dez 2026 | Frankfurt *oder* Auslandsrennen | **Qualifikationsversuch #1.** | Episode 3: Der erste ernsthafte Angriff |
| Jan 2027 | Kein Rennen | Trainingsblock, Regeneration | Trainings-Content, Datenauswertung |
| **Feb 2027** | Auslandsrennen | **Qualifikationsversuch #2 / Pro-Debüt** | Episode 4: Staffelübergabe der Story |
| Mrz–Mai 2027 | 2–3 Pro-Rennen, davon 2 im Ausland | Pro-Erfahrung, ggf. WM-Slot | Episoden 5–7: höchste Produktionsqualität |

Grundregeln: **maximal ein Rennen pro Monat** (Regeneration und Reisekosten), mindestens
**zwei Auslandsrennen vor Mai 2027** (das ist dein visueller Differenzierer), und mindestens
**ein Rennen ohne Kamera** — es hilft der Leistung, und du kannst darüber erzählen.

### 3.3 Realistische Einordnung von „sub 60"

Sub-60 im Open ist elitär (grob Top 5–10 %), aber der Kontext verschiebt sich mit der
Altersklasse: 58 Minuten mit 45 sind sportlich etwas völlig anderes als 58 Minuten mit 27.
Für die *Story* ist das gut — die Alterseinordnung ist ein eigener Content-Winkel. Für die
*Planung* heißt es: rechne deinen Abstand zur Schwelle in Sekunden pro Station aus, nicht in
„ich muss schneller werden". Die typischen Hebel in dieser Reihenfolge:

1. **Roxzone-Zeit** (die Übergänge) — meist 2–4 Minuten geschenkt, ohne einen Deut fitter zu sein
2. **Laufsplits unter Ermüdung** (Compromised Running) — der größte einzelne Block
3. **Sled Push/Pull-Technik** — Technik schlägt Kraft, Verzögerungen von 60–90 s sind normal
4. **Wall Balls unbroken-Strategie** — die häufigste Stelle, an der Rennen kippen

Diese vier Punkte sind gleichzeitig deine ersten vier Blog-/YouTube-Themen mit echtem
Suchvolumen (§6.3).

### 3.4 Der Zielkonflikt Training vs. Content

Zahlen, damit die Entscheidung bewusst fällt:

| Block | Realistischer Aufwand |
|---|---|
| Training für sub 60 | 10–14 h/Woche |
| YouTube-Vlog wöchentlich, ordentlich | 8–12 h/Woche |
| Shorts/Reels (8–12 Stück) | 3–5 h/Woche |
| Website/Shop/App-Aufbau | 5–10 h/Woche in der Bauphase |
| **Summe** | **26–41 h/Woche** |

Das ist neben einem Job nicht leistbar. Meine Empfehlung für Phase 1 (Okt–Dez 2026):

- Training **nicht** kürzen — es ist die Substanz des ganzen Geschäftsmodells.
- YouTube auf **einen Vlog pro Rennen** (≈ 1×/Monat) statt wöchentlich. Ein guter Film pro
  Monat schlägt vier mittelmäßige.
- Shorts/Reels als **Nebenprodukt** des Vlog-Materials, nicht als eigene Produktion.
- Website in einem **konzentrierten Sprint** bauen (2–3 Wochen), nicht dauerhaft nebenher.
- Ab dem ersten Umsatz: **Schnitt auslagern** (60–150 € pro Vlog). Das ist der erste
  Euro, der sich lohnt — er kauft Trainingszeit zurück.

---

## 4. Content-Engine

### 4.1 Plattform-Rollen

Jede Plattform bekommt **eine** Aufgabe. Kanäle ohne definierte Aufgabe werden zu Aufwand
ohne Wirkung.

| Plattform | Aufgabe | Format | Frequenz Phase 1 | Erfolgsmaß |
|---|---|---|---|---|
| **Instagram** | Reichweiten-Motor & Sponsorenkontakt | Reels 20–45 s, Carousels, Stories | 4–5 Reels/Woche, Stories täglich an Renn-/Testtagen | Follower-Wachstum, Saves |
| **YouTube** | Tiefe & Vermögenswert | Race-Vlog 10–18 min | 1 pro Rennen (monatlich) | Watch Time, Abonnenten pro Video |
| **TikTok** | Zweitverwertung, Zufallsreichweite | dieselben Reels, TikTok-nativ untertitelt | 4–5/Woche (Crosspost) | Reichweite (nicht Follower) |
| **Website/Newsletter** | **Besitz** der Beziehung | Blog, Events, Avatar, Shop | 1 Blogartikel/Woche, Newsletter 2×/Monat | E-Mail-Liste |
| **Twitch** | *zurückgestellt* | — | — | — |

**Die E-Mail-Liste ist der wichtigste Kanal**, auch wenn sie am langweiligsten aussieht. Sie
ist der einzige, den dir kein Algorithmus wegnehmen kann, und der einzige, aus dem sich
zuverlässig Umsatz machen lässt. Jede andere Plattform hat als Sekundärziel, Leute auf die
Liste zu bringen.

### 4.2 Warum Twitch (noch) nicht

Twitch hat kaum algorithmische Entdeckung — Zuschauer kommen fast ausschließlich von außen
mit. Ein Workout-Stream ohne bestehendes Publikum bedeutet 4–6 Stunden pro Woche vor 0–3
Zuschauern, in Zeit, die dir beim Training und beim Schnitt fehlt. Dazu kommt: Streaming
während eines harten Trainings verschlechtert das Training.

Was stattdessen dieselbe Funktion („Nähe, live, ungefiltert") mit einem Bruchteil des
Aufwands erfüllt:

- **Instagram Live 20–30 min** nach einer Schlüsseleinheit, aus dem Auto oder der Halle
- **YouTube-Live am Renn-Vorabend** — Kurs-Walkthrough, Nervosität, Ziel für morgen
- **Stories mit Frage-Sticker** statt Live-Chat

Twitch aktivieren, sobald ~5.000 IG-Follower erreicht sind und es wiederkehrende
Chat-Teilnehmer gibt. Dann ist es ein Community-Werkzeug statt eines Reichweiten-Experiments.

### 4.3 Format-Baukasten

Wiederkehrende Formate schlagen Einzelideen, weil sie Erwartung erzeugen und die Produktion
planbar machen.

**YouTube (lang)**
1. **Race Film** — Anreise, Vorabend, Rennen, Splits, ehrliches Fazit. Das Kernformat.
2. **„Ich habe X geändert"** — eine Variable, ein Trainingsblock, das Ergebnis in Zahlen.
3. **Kurs-Analyse vor Ort** — für Leute, die dasselbe Rennen laufen. Hoher Suchwert.
4. **Datenrückblick** — Quartalsweise: was die Zahlen sagen, inkl. der schlechten.

**Instagram/TikTok (kurz)**
1. **Split-Screen Zeit-Vergleich** (Rennen 1 vs. Rennen 3, dieselbe Station)
2. **Ein Fehler, den 90 % machen** — Technikclip, 20 s, ein Punkt
3. **Roxzone-Timer** — der übersehene Zeitfresser, sehr teilbar
4. **Reise-Establisher** — 15 s Stadt + Halle, für Auslandsrennen
5. **Ergebnis-Reveal** — Zeit auf dem Screen, echte Reaktion
6. **Antwort auf Kommentar** — direkte Interaktion, füttert den Algorithmus

Regel: **Jeder Clip funktioniert ohne Ton und ohne Vorwissen.** Zeit oder Aussage in den
ersten 1,5 Sekunden auf den Bildschirm.

### 4.4 Die Race-Weekend-Pipeline

Ein Rennwochenende ist ein Rohstofflager. Ziel: **aus einem Wochenende ~20 Assets**, in einem
festen Ablauf statt ad hoc.

**Aufnahme (Wochenende)**
- Anreise/Stadt: 10–15 Clips à 10 s (Establisher)
- Vorabend: Kurs-Walkthrough, Ziel-Statement zur Kamera (das ist dein Cliffhanger)
- Renntag: Warm-up, Start, so viel Renn-Footage wie erlaubt, Zieleinlauf, erste Reaktion
- Danach: 3–5 min ehrliches Fazit zur Kamera, **bevor** du die Splits analysierst
- Screenshots: offizielle Splits, Roxzone-Zeiten, Platzierung

**Verwertung (Folgewoche)**
| Tag | Output |
|---|---|
| Mo | Ergebnis-Reel + Story-Serie mit Splits |
| Di | Blogartikel „Rennbericht + Splits" (die zitierfähige Version, §6.3) |
| Mi | 2 Technik-Shorts aus Rennmaterial |
| Do | Newsletter: die Geschichte hinter der Zahl, Link zum Blog |
| Fr | YouTube Race Film |
| Sa | 2 Shorts als Teaser auf den Film |
| So | Events-Seite aktualisieren, nächstes Rennen ankündigen |

Diese Pipeline ist der Grund, warum ein Rennen pro Monat reicht: Ein Wochenende füllt vier
Wochen Kalender.

### 4.5 Produktions-Setup

Bewusst schlank — die Kamera ist nicht der Engpass, die Zeit ist es.

- **Kamera:** Aktuelles Smartphone reicht für alles. Eine Action-Cam (GoPro/Insta360) für
  Renn- und POV-Aufnahmen ist die einzig sinnvolle Zusatzanschaffung.
- **Ton:** Ein Funkmikrofon (Lav) ist die Anschaffung mit der größten Wirkung pro Euro.
  Schlechter Ton kostet mehr Zuschauer als schlechtes Bild.
- **Schnitt:** CapCut oder Resolve. Vorlagen einmal bauen (Intro, Untertitel-Stil, Split-Overlay),
  dann nur noch befüllen.
- **Nicht kaufen** in Phase 1: Gimbal, Drohne, zweite Kamera, Studio-Licht.
- **Musik:** Nur lizenzierte Bibliotheken (Epidemic Sound o. ä.). Ein Copyright-Strike auf
  einem Race Film kostet dich die Monetarisierung des besten Videos der Saison.

### 4.6 Kadenz-Regel

Lieber unterversprechen und halten: **1 YouTube-Video pro Rennen, 4 Reels pro Woche, 1
Blogartikel pro Woche, 2 Newsletter pro Monat.** Diese Kadenz ist neben 12 h Training
machbar. Wenn sie sich drei Monate lang trägt, erhöhen — nicht vorher.

---

## 5. Website — Architektur & Umsetzung

### 5.1 Seitenkarte

| Route | Zweck | Priorität | Status im Repo |
|---|---|---|---|
| `/` | Wer du bist, aktuelles Saisonziel, nächstes Rennen, letzte Zeit, E-Mail-Anmeldung | P0 | vorhanden (Gym-Inhalt) — Neubau |
| `/about` | Ausführliche Athleten-Bio, PBs, Splits-Historie | P0 | fehlt |
| `/races` | **Event-Seite**: kommende Rennen + Ergebnis-Archiv | P0 | fehlt (`/schedule` umbauen) |
| `/blog`, `/blog/[slug]` | Rennberichte, Technik, Datenauswertungen | P0 | fehlt |
| `/faq` | GEO/AEO-Anker, siehe §6 | P0 | teilweise (unter `/membership`) |
| `/avatar` | Video-Avatar mit zweistufigem Zugang | P1 | vorhanden als `/coach-ai` (Tavus) — umbauen |
| `/shop`, `/shop/[slug]` | Merch | P1 | vorhanden — Checkout fehlt |
| `/newsletter` | Anmeldung + Archiv | P1 | fehlt |
| `/kontakt` | Sponsoring-/Presseanfragen, Media-Kit-Download | P1 | vorhanden als `/contact` — umbauen |
| `/training` | KI-Plan-Generator (Web-Version, §7) | P2 | fehlt |
| `/impressum`, `/datenschutz` | Rechtspflicht (§9) | **P0** | **fehlt — blockiert den Livegang** |

### 5.2 Technische Basis — was mit dem bestehenden Code passiert

Das Repo ist derzeit die Gym-Site „FORGE". Für die Athleten-Marke gilt:

**Behalten**
- Next.js 16 App Router, Tailwind 4, Framer Motion — passt.
- `src/lib/site-config.ts` als zentrale Inhaltsquelle. Das Muster ist gut; nur die Werte
  müssen von Gym auf Athlet wechseln.
- `src/components/CinematicScroll.tsx` + `src/lib/scenes.ts` — die Scroll-Sequenz ist genau
  das visuelle Mittel, das zu Positionierung A („Ein Rennen, eine Stadt, ein Film") passt.
  Szenen von Gym-Motiven auf Rennorte umstellen.
- Shop-Struktur (`src/lib/products.ts`, `ProductCard`, `ProductGrid`) — bleibt, braucht
  Checkout.
- Tavus-Integration (`src/app/api/tavus/*`, `src/components/TavusCoach.tsx`) — bleibt, braucht
  Zugangskontrolle (§5.3).

**Ersetzen**
- `src/lib/schedule.ts` (Kursplan) → `src/lib/races.ts` (Rennkalender + Ergebnisse)
- `src/lib/memberships.ts` (Mitgliedschaften) → entfällt bzw. wird später zu Produkt-Tiers
- `src/lib/coaches.ts` (Trainerteam) → entfällt
- Alle Gym-Texte in `site-config.ts`

**Neu**
- Blog (MDX oder Headless CMS — für den Anfang MDX-Dateien im Repo, kein CMS-Overhead)
- Newsletter-Anbindung (Buttondown/Kit/Mailerlite — DSGVO-konformes Double-Opt-in)
- Stripe für Shop und Avatar-Guthaben
- Schema.org-Auszeichnung überall (§6.2)
- Impressum/Datenschutz

**Wichtige Vorentscheidung: eine Sprache oder zwei?** Deine Zielgruppe ist „international
sichtbarer Deutscher". Empfehlung: **Englisch als Hauptsprache der Website**, deutsche
Version für `/impressum`, `/datenschutz` und ausgewählte Blogartikel. Zweisprachigkeit
verdoppelt sonst den Pflegeaufwand. Bei zwei Sprachen unbedingt `hreflang` sauber setzen.

### 5.3 Video-Avatar — das Paywall-Design

**Dein Einwand ist richtig:** Tavus-CVI kostet pro Gesprächsminute, und ein offen zugänglicher
Avatar ist ein offenes Portemonnaie. Aber die Konsequenz „nur gegen Bezahlung" widerspricht
deinem eigenen Ziel (Leads generieren): Wer dich nicht kennt, zahlt nicht für ein Gespräch
mit dir — und wer dich kennt, braucht den Avatar nicht.

**Empfohlenes dreistufiges Modell:**

| Stufe | Zugang | Dauer | Preis | Funktion |
|---|---|---|---|---|
| **Teaser** | offen, ohne Anmeldung | 60 s | 0 € | Beweis, dass es funktioniert; erzeugt den Wunsch |
| **Lead** | E-Mail + Double-Opt-in | 5 min | 0 € | **Der eigentliche Zweck**: E-Mail-Adresse |
| **Deep** | Guthaben (Stripe) | 15–30 min | Guthabenpaket | Deckt Kosten, qualifiziert Interessenten |

Stufe 2 ist der Punkt. Eine E-Mail-Adresse ist mehr wert als 3 € Gesprächsumsatz, weil sie
später Shop, App und Coaching verkauft. Die Kosten für 5 Minuten Gespräch sind ein
vertretbarer Lead-Preis — deutlich günstiger als bezahlte Werbung.

**Kostenkontrolle (unbedingt vor dem Livegang):**

Der aktuelle Code in `src/app/api/tavus/create-conversation/route.ts` erzeugt eine Session
**ohne jede Zugangsprüfung und ohne Rate-Limit** — `max_call_duration` steht auf 600 s. Jeder,
der die Route kennt, kann beliebig viele 10-Minuten-Sessions auslösen und dein Tavus-Guthaben
leeren. Vor dem Livegang zwingend:

1. Rate-Limit pro IP und pro Session (z. B. Upstash Redis)
2. `max_call_duration` an die gebuchte Stufe koppeln (60 / 300 / 1800 s), nicht fest 600
3. Tages-Budget-Deckel serverseitig: ab X Minuten/Tag antwortet die Route mit „ausgebucht"
4. Turnstile/hCaptcha vor Stufe 1
5. Guthabenabzug **serverseitig** buchen, niemals im Client
6. Kosten pro Minute beim aktuellen Tavus-Tarif nachrechnen und den Verkaufspreis mit
   mindestens Faktor 3 darüber ansetzen

**Ehrlicher Hinweis zum Nutzen:** Der Avatar ist ein Neugier-Produkt, kein Umsatzträger. Plane
ihn als Lead-Magnet und Differenzierungsmerkmal (auch für GEO — „Website mit interaktivem
Athleten-Avatar" ist ein zitierfähiges Alleinstellungsmerkmal), nicht als Einnahmequelle.

### 5.4 Shop

- **Start als Print-on-Demand** (Printful/Spreadshirt-Anbindung). Kein Lagerrisiko, keine
  Vorfinanzierung. Marge ist schlechter, aber die Alternative ist ein Keller voller unverkaufter
  Shirts.
- **Erst ab ~5.000 engagierten Followern** auf Eigenproduktion umstellen. Faustregel: Erst
  wenn eine Kollektion in 14 Tagen 50 Stück verkauft, lohnt sich eine Vorproduktion.
- **Was zuerst funktioniert:** Kein Logo-Merch (das kauft niemand von einem unbekannten
  Athleten), sondern **Produkte mit Aussage** — der Saison-Claim, die Zielzeit, ein
  Insider-Witz aus der Community. Merch verkauft Zugehörigkeit, nicht Stoff.
- **Kein Shop-Launch vor dem ersten sub-60-Versuch.** Der Shop lebt vom Anlass.
- **Rechtlich:** Widerrufsbelehrung, Versandkosten, Lieferzeiten, Preisangabenverordnung —
  ein Shop ohne diese Angaben ist abmahnfähig (§9).

### 5.5 Blog

Der Blog ist kein Tagebuch, sondern **das GEO-Fundament** (§6). Drei Artikeltypen:

1. **Rennbericht mit Daten** — Splits-Tabelle, Roxzone-Zeiten, was schiefging. Diese Artikel
   werden von KI-Systemen gerne zitiert, weil sie konkrete Zahlen enthalten, die sonst nirgends
   maschinenlesbar stehen.
2. **Antwortartikel** — „Wie lange dauert die Roxzone im Schnitt?", „Was ist eine gute
   HYROX-Zeit mit 35?". Direkte Frage in der Überschrift, Antwort im ersten Absatz.
3. **Kurs- und Reiseguides** — „HYROX Hamburg: Halle, Anreise, Boden, was du wissen musst".
   Nischig, wenig Konkurrenz, hohe Absicht.

Ziel: 1 Artikel/Woche, mindestens 800 Wörter, immer mit eigenen Zahlen. **Kein
KI-generierter Fülltext** — genau der wird von Suchmaschinen und KI-Systemen abgewertet, und
deine eigenen Renndaten sind das Einzige, was niemand sonst hat.

### 5.6 Events-Seite (`/races`)

Zwei Blöcke auf einer Seite:

- **Kommende Rennen** — Datum, Stadt, Halle, Division, Startzeit, Zielzeit, „Ich bin da"-Info
  für Fans. Mit `Event`-Schema ausgezeichnet (§6.2), damit die Termine in KI-Antworten und
  Google-Snippets erscheinen.
- **Ergebnis-Archiv** — jedes gelaufene Rennen mit Gesamtzeit, Splits, Platzierung, Link zum
  Vlog und zum Rennbericht. Das ist deine Glaubwürdigkeits-Seite gegenüber Sponsoren *und*
  die datenreichste Seite für KI-Zitate.

Datenquelle: eine Datei `src/lib/races.ts` nach dem Muster der bestehenden
`src/lib/schedule.ts` — ein Array, aus dem beide Blöcke und das Schema-Markup gerendert werden.

### 5.7 App-Anbindung

Auf `/training` zunächst nur der Web-Generator (§7) plus eine E-Mail-Warteliste für die App.
Die Warteliste ist gleichzeitig deine Nachfrage-Validierung: Wenn sich in sechs Monaten keine
500 Leute eintragen, ist die App noch nicht dran.

---

## 6. GEO / AEO — gefunden werden, wenn niemand mehr googelt

Du hast „GEO und GAE" genannt; gemeint sind vermutlich **GEO (Generative Engine
Optimization)** und **AEO (Answer Engine Optimization)** — also: In den Antworten von
ChatGPT, Perplexity, Google AI Overviews & Co. vorkommen. Der Grundsatz unterscheidet sich
von klassischem SEO:

> Klassisches SEO optimiert auf **Ranking**. GEO/AEO optimiert auf **Zitiertwerden**. KI-Systeme
> zitieren, was sie eindeutig zuordnen, faktisch prüfen und ohne Kontext übernehmen können.

### 6.1 Die vier Hebel

1. **Eigene, sonst nirgends verfügbare Zahlen.** Deine Splits, deine Roxzone-Zeiten, dein
   Trainingsvolumen. Ein KI-System, das „durchschnittliche Roxzone-Zeit bei einem sub-60-Lauf"
   beantworten soll, findet dafür kaum Quellen — und deine wäre eine.
2. **Frage-Antwort-Struktur.** Überschrift = die wörtliche Frage. Erster Absatz = eine
   vollständige, aus dem Zusammenhang lösbare Antwort in 2–3 Sätzen. Danach Belege.
3. **Entitäts-Konsistenz.** Derselbe Name, dieselbe Schreibweise, dieselbe Biografie überall
   (Website, YouTube, Instagram, Strava, Rennergebnislisten, ggf. Wikidata). KI-Systeme bauen
   ein Personen-Modell — Widersprüche verhindern die Zuordnung.
4. **Erwähnungen auf Drittseiten.** Podcast-Auftritte, Gastartikel, Interviews in
   Hyrox-Communities. Werden häufiger zitiert als die eigene Seite und stützen die Entität.

### 6.2 Technische Checkliste

- [ ] `Person`-Schema auf `/about` (Name, `sameAs` zu allen Profilen, `nationality`,
      `award`, `knowsAbout`)
- [ ] `Event`-Schema für jedes Rennen auf `/races` (`SportsEvent`, Datum, Ort, `performer`)
- [ ] `FAQPage`-Schema auf `/faq`
- [ ] `Article` + `author` auf jedem Blogartikel; `speakable` wo sinnvoll
- [ ] `Product` + `Offer` im Shop
- [ ] `BreadcrumbList` auf allen Unterseiten
- [ ] `sitemap.xml` und `robots.txt` (in Next.js über `app/sitemap.ts` / `app/robots.ts`)
- [ ] `/llms.txt` — kurze, maschinenlesbare Zusammenfassung, wer du bist und was auf der Seite
      steht. Noch kein Standard, aber billig und wird zunehmend gelesen.
- [ ] KI-Crawler **erlauben** (GPTBot, PerplexityBot, ClaudeBot, Google-Extended) — die
      Standardeinstellung mancher Hoster blockt sie, das wäre hier kontraproduktiv
- [ ] Serverseitiges Rendern für alle Inhaltsseiten (App Router: keine reinen
      Client-Komponenten für Text) — was nur im Browser entsteht, wird oft nicht erfasst
- [ ] `hreflang`, falls zweisprachig
- [ ] Ladezeit: Bilder als WebP/AVIF, `next/image`, keine ungenutzten Client-Bundles

### 6.3 Content, der zitiert wird — konkrete Startthemen

Themen mit Nachfrage, zu denen du eigene Daten hast (jeweils als `/faq`-Eintrag **und**
ausführlicher Blogartikel):

- Was ist eine gute HYROX-Zeit? (nach Altersklasse, mit eigener Einordnung)
- Wie kommt man in die HYROX Pro Division? (Qualifikationszeiten, Ablauf, eigener Weg)
- Wie viel Zeit verliert man in der Roxzone? (mit eigenen Messwerten)
- Open oder Pro — was ist der Unterschied?
- Wie trainiert man Compromised Running für HYROX?
- Wie oft sollte man HYROX-Rennen laufen?
- Was kostet eine HYROX-Saison wirklich? (Startgelder, Reise, Ausrüstung — mit echten Belegen)
- Wie qualifiziert man sich für die HYROX Weltmeisterschaft?

Der letzte Punkt ist besonders wertvoll: Kostenaufstellungen sind selten, konkret und werden
von KI-Systemen gerne herangezogen — und niemand sonst veröffentlicht sie ehrlich.

### 6.4 FAQ-Struktur

`/faq` als eigenständige Seite mit 15–25 Fragen, gruppiert (Zu mir · HYROX-Grundlagen ·
Training · Zusammenarbeit/Sponsoring). Jede Antwort 40–80 Wörter, in sich abgeschlossen, mit
`FAQPage`-Auszeichnung. Zusätzlich am Ende jedes Blogartikels 2–3 passende Fragen.

---

## 7. Die KI-Trainings-App

### 7.1 Warum nicht als erstes eine Mobile App

Eine native App bedeutet: zwei Plattformen, App-Store-Prüfungen, In-App-Kauf-Abrechnung
(15–30 % Provision), Update-Zyklen, Support, Crash-Monitoring — und all das, bevor du weißt,
ob überhaupt jemand deine Pläne will. Die Hypothese („Menschen zahlen für KI-generierte
HYROX-Pläne von mir") lässt sich auf deiner Website in **vier Wochen** testen statt in
sechs Monaten.

### 7.2 Stufenplan

| Stufe | Was | Wann | Aufwand |
|---|---|---|---|
| **1 — Lead-Magnet** | Ein statischer 4-Wochen-Plan als PDF gegen E-Mail | sofort, Phase 1 | 1 Tag |
| **2 — Web-Generator** | `/training`: Formular (Zielzeit, Trainingstage, Schwächen, Ausrüstung) → LLM erzeugt einen 8-Wochen-Plan → PDF/HTML | Phase 2, nach dem ersten sub-60-Versuch | 3–4 Wochen |
| **3 — Abo** | Wöchentliche Anpassung anhand eingetragener Ergebnisse, Zugriff auf Planarchiv | Phase 3, ab ~500 Wartelisten-Einträgen | 2–3 Monate |
| **4 — Mobile App** | Nur wenn Stufe 3 zahlende Abonnenten hat und Retention stimmt | frühestens 2028 | 6+ Monate |

Technisch fügt sich Stufe 2 sauber in das bestehende Repo: eine Route
`src/app/api/training-plan/route.ts` nach dem Muster der vorhandenen Tavus-Routen, mit
demselben Rate-Limit- und Budget-Muster wie in §5.3.

### 7.3 Was du beim Produkt beachten musst

- **Deine Daten sind der Vorsprung, nicht das Modell.** Ein generischer Plan aus einem
  LLM ist wertlos — den bekommt jeder gratis. Wertvoll wird er, wenn er *deine* Methodik,
  *deine* Progression und *deine* Renndaten kodiert. Schreibe deine Trainingslogik als
  Regelwerk auf, bevor du sie automatisierst.
- **Qualitätssicherung.** Jeder generierte Plan muss durch Plausibilitätsregeln
  (Volumensprünge, Regenerationstage, Belastungsspitzen). Ein LLM, das unkontrolliert
  Trainingspläne ausgibt, produziert Verletzungen.
- **Haftung und Formulierung.** Klarer Hinweis: kein medizinischer Rat, Nutzung auf eigene
  Verantwortung, Gesundheitscheck empfohlen. Vermeide Heilversprechen und Garantien
  („in 8 Wochen sub 60" ist rechtlich heikel und sachlich falsch).
- **Kostenmodell.** LLM-Kosten pro Plan sind gering (Cent-Bereich), aber Regenerierungen
  häufen sich. Limit pro Nutzer und Monat einbauen.
- **DSGVO.** Trainingsdaten und Gesundheitsangaben sind sensibel. Datensparsam erheben,
  Zweck dokumentieren, Löschfunktion anbieten, AV-Vertrag mit dem LLM-Anbieter.

---

## 8. Monetarisierung

### 8.1 Reihenfolge der Umsatzströme

Der häufigste Fehler ist, Umsatzquellen parallel zu starten. Sie brauchen unterschiedlich
große Zielgruppen — in dieser Reihenfolge werden sie sinnvoll:

| Stufe | Umsatzstrom | Voraussetzung | Realistischer Beitrag |
|---|---|---|---|
| 1 | **Affiliate** (Schuhe, Nutrition, Gear) | ab ~1.000 Follower | 20–200 €/Monat |
| 2 | **Digitale Produkte** (Trainingsplan-PDF, Kurs-Guides) | ab ~2.500 Follower + E-Mail-Liste | 100–500 €/Monat |
| 3 | **Merch** (Print-on-Demand) | ab ~5.000 engagierte Follower | 100–800 €/Monat |
| 4 | **Sponsoring** (Gear, dann Geld) | ab ~10.000 Follower **oder** starken Ergebnissen | 500–3.000 €/Rennen bzw. Saisonvertrag |
| 5 | **Coaching 1:1** | ab nachweisbaren Ergebnissen (deinen und denen anderer) | 300–1.500 €/Monat, aber zeitintensiv |
| 6 | **App-Abo** | ab Stufe 3 des App-Plans | skaliert, aber erst 2028 relevant |

**Die ehrliche Erwartung:** In den ersten 12 Monaten ist das ein Zuschussgeschäft. Startgelder
(oft 100–150 € pro Rennen), Reisen, Ausrüstung, Software und Hosting summieren sich schnell auf
**4.000–8.000 € pro Saison** — bei Auslandsrennen deutlich mehr. Plane dieses Budget bewusst
ein und behandle es als Investition, nicht als laufende Kosten. Wer mit der Erwartung startet,
im ersten Jahr Geld zu verdienen, hört im Monat sieben auf.

### 8.2 Sponsoring — wann und wie

Sponsoren interessieren sich für **drei** Dinge, in dieser Reihenfolge: Zielgruppen-Passung,
Zuverlässigkeit, Reichweite. Nicht nur Reichweite.

Was du dafür brauchst, sobald du 3 Rennen dokumentiert hast:

- **Media-Kit als PDF** (1–2 Seiten): Wer du bist, Saisonziel, Rennkalender, Reichweiten pro
  Plattform mit Screenshots, Demografie (Alter/Land/Geschlecht aus den Insights), bisherige
  Ergebnisse, Kooperationsformate mit Preisen.
- **Ein Beleg für Zuverlässigkeit:** Die dokumentierte Kadenz aus §4.6. „Ich habe 12 Monate
  lang jede Woche geliefert" ist für einen Sponsor überzeugender als eine Follower-Zahl.
- **Realistischer Einstieg:** Erst Produkt-Sponsoring (Gear gegen Content), dann
  Umsatzbeteiligung (Rabattcode), dann Fixhonorar. Deutsche Nischenmarken und lokale Anbieter
  antworten deutlich eher als internationale Konzerne.
- **Wo du dich meldest:** Nicht per DM an den Hauptkanal, sondern per E-Mail an das
  Marketing-Team, mit konkretem Vorschlag für **ein** Rennen. Ein konkretes Angebot schlägt
  eine allgemeine Anfrage um Längen.

### 8.3 Lead-Definition und Funnel

„Leads generieren" braucht eine Definition, sonst ist es nicht messbar. Vorschlag:

> **Ein Lead ist eine bestätigte E-Mail-Adresse (Double-Opt-in) mit mindestens einer
> Interaktion** — Avatar-Session, Plan-Download oder Newsletter-Klick.

Der Funnel:

```
Instagram/TikTok Reel  ─┐
YouTube Race Film      ─┼─→  Website (Blog/Races/FAQ)
KI-Antwort / Google    ─┘             │
                                      ▼
                    Avatar-Teaser (60 s, ohne Anmeldung)
                                      │
                                      ▼
                    ►► E-Mail (Avatar 5 min ODER Plan-PDF) ◄◄  = LEAD
                                      │
                                      ▼
                    Newsletter (2×/Monat, echter Mehrwert)
                                      │
                    ┌─────────────────┼─────────────────┐
                    ▼                 ▼                 ▼
              Shop-Kauf        Avatar-Guthaben     App-Warteliste
```

Der Engpass ist fast nie der Traffic, sondern der Schritt zur E-Mail. Deshalb steht in jedem
Video, jedem Artikel und jeder Bio genau **ein** Angebot — nicht fünf.

---

## 9. Rechtliches & Steuern (Deutschland)

Keine Rechtsberatung, aber die Punkte, die erfahrungsgemäß am häufigsten teuer werden. Für die
Umsetzung Steuerberater bzw. Anwalt hinzuziehen.

**Vor dem Livegang der Website — blockierend:**
- [ ] **Impressum** nach § 5 DDG, mit ladungsfähiger Anschrift (Achtung: das ist deine
      Privatadresse, wenn du kein Büro hast — Alternative: Anbieter für Ladungsanschriften)
- [ ] **Datenschutzerklärung** nach DSGVO, inkl. Tavus (Drittland-Übermittlung!),
      Newsletter-Anbieter, Hosting, Analytics
- [ ] **Cookie-/Consent-Banner**, falls Analytics oder eingebettete Drittinhalte — mit echter
      Ablehnen-Option
- [ ] **Double-Opt-in** für den Newsletter, protokolliert

**Geschäftlich:**
- [ ] **Gewerbeanmeldung** — sobald Einnahmen erzielt werden (Affiliate zählt)
- [ ] **Kleinunternehmerregelung** (§ 19 UStG) prüfen — sinnvoll bei kleinen Umsätzen, aber
      Vorsicht: kein Vorsteuerabzug auf die hohen Anfangsinvestitionen (Kamera, Reisen).
      Bei absehbar hohen Ausgaben lohnt die Regelbesteuerung oft mehr. Mit dem Steuerberater
      durchrechnen, **bevor** du das Formular abgibst.
- [ ] **Umsatzsteuer bei digitalen Produkten ins Ausland** (OSS-Verfahren) — relevant, sobald
      der Shop oder das Avatar-Guthaben international verkauft
- [ ] **Trennung der Konten** — Geschäftskonto ab Tag eins, spart später Wochen Aufarbeitung

**Content:**
- [ ] **Werbekennzeichnung**: Kooperationen, Affiliate-Links und geschenkte Produkte müssen
      als Werbung gekennzeichnet werden (§ 5a UWG). „Werbung" am Beitragsanfang, nicht in
      Hashtags versteckt.
- [ ] **Musiklizenzen** für alle Videos (siehe §4.5)
- [ ] **Bild- und Filmrechte bei Events**: HYROX-Veranstaltungen haben Hausrecht und
      Medienregeln. Kommerzielle Aufnahmen können genehmigungspflichtig sein — vor dem ersten
      Rennen beim Veranstalter klären.
- [ ] **Persönlichkeitsrechte Dritter**: Andere Athleten und Zuschauer erkennbar im Bild —
      im Zweifel unkenntlich machen oder Einwilligung einholen.
- [ ] **Markenrecht HYROX** (§2.3) — keine Aneignung im Namen, keine Logo-Nutzung auf Merch.

**Shop (falls mit Checkout):**
- [ ] Widerrufsbelehrung + Muster-Widerrufsformular, AGB, Preisangabenverordnung,
      Versandkosten und Lieferzeiten, Grundpreisangaben. Rechtstexte-Dienst (z. B. IT-Recht
      Kanzlei/Trusted Shops) ist hier die günstigste Versicherung.

---

## 10. Roadmap

### Phase 1 — Fundament (Sep – Dez 2026)
*Ziel: Publikum aufbauen, Baseline-Zeit setzen, Website live*

- Woche 1–2: Positionierung festlegen, Name/Domain/Handles sichern, Qualifikationszeit für die
  eigene Altersklasse klären
- Woche 2–4: Website-Sprint — Rebrand des Repos, `/`, `/about`, `/races`, `/faq`, `/blog`,
  Impressum/Datenschutz, Newsletter-Anmeldung, Schema-Markup
- Ab Woche 3: Content-Kadenz starten (4 Reels/Woche, 1 Blogartikel/Woche)
- Okt: Rennen #1 (Baseline) → volle Race-Weekend-Pipeline testen
- Nov: Rennen #2 → erster Race Film in Zielqualität
- Dez: Rennen #3 (Qualifikationsversuch #1), Lead-Magnet-PDF live
- **Gate 1 (Ende Dez):** 1.000 Follower gesamt · 200 E-Mails · 3 dokumentierte Rennen

### Phase 2 — Beschleunigung (Jan – Jun 2027)
*Ziel: Pro-Qualifikation, erste Umsätze, internationale Sichtbarkeit*

- Jan: Trainingsblock ohne Rennen; Avatar mit Paywall live (§5.3), Web-Generator bauen
- **Feb: Pro-Debüt** (bei erfolgreicher Qualifikation) — Story-Höhepunkt, maximale Produktion
- Mrz–Apr: 2 Auslandsrennen, Shop-Launch, Media-Kit, erste Sponsoring-Anfragen
- Mai: Letztes Qualifikationsrennen vor dem 16.05.-Stichtag für die WM 2027
- Jun: WM Hongkong (falls qualifiziert) — oder Saisonrückblick mit Daten
- **Gate 2 (Ende Jun):** 5.000 Follower · 1.000 E-Mails · erster Umsatz · Pro-Status

### Phase 3 — Produkt (Jul – Dez 2027)
*Ziel: Aus Reichweite wird ein Geschäft*

- Saisonpause: Content-Vorrat aufbauen, Web-Generator zum Abo ausbauen
- Neue Saison 27/28 als Pro-Athlet — neues Narrativ („Road to Elite 15" o. ä.)
- Sponsoring-Verträge für die volle Saison
- App-Entscheidung anhand der Wartelisten- und Abo-Zahlen
- **Gate 3 (Ende Dez 2027):** Deckungsbeitrag positiv, oder Modell überarbeiten

---

## 11. KPIs & Entscheidungs-Gates

**Wöchentlich messen** (5 Minuten, eine Tabelle):

| Kennzahl | Warum |
|---|---|
| Neue E-Mail-Abonnenten | Die einzige Zahl, die wirklich zählt |
| Follower-Zuwachs je Plattform | Richtung, nicht Absolutwert |
| Watch Time YouTube / Ø Wiedergabedauer | Sagt, ob die Filme tragen |
| Reels über 10.000 Aufrufe | Zeigt, welche Formate funktionieren |
| Website-Sitzungen aus KI-Quellen | GEO-Wirkung (Referrer von chatgpt.com, perplexity.ai) |
| Trainingsstunden | Verhindert, dass Content das Training frisst |

**Monatlich prüfen:** Umsatz, Ausgaben, Kosten je Lead, Avatar-Minuten und deren Kosten,
Rennzeit-Entwicklung gegenüber der Qualifikationsschwelle.

**Abbruch-/Kurskorrektur-Kriterien** — vorher festlegen, damit sie im Zweifel nicht
wegdiskutiert werden:

- Nach 6 Monaten unter 500 E-Mail-Abonnenten → Positionierung ist falsch, nicht die Frequenz
- Nach 3 Rennen keine Verbesserung der Gesamtzeit → Training überarbeiten, Content reduzieren
- Trainingsstunden 3 Wochen in Folge unter 8 h → Content-Umfang sofort kürzen
- Avatar-Kosten übersteigen 3 Monate in Folge den Wert der generierten Leads → abschalten
- Wenn im Februar 2027 die Qualifikation nicht steht: **Das ist kein Scheitern, das ist
  Episode 5.** Der ehrliche Umgang mit dem verpassten Ziel ist erfahrungsgemäß der Content,
  der am meisten Bindung erzeugt. Plane die Story für beide Ausgänge.

---

## 12. Offene Punkte

Diese Entscheidungen kann ich dir nicht abnehmen, sie blockieren aber die Umsetzung:

1. **Deine Altersklasse und die exakte Pro-Qualifikationszeit** dafür (§3.1) — die wichtigste
   fehlende Zahl im ganzen Plan.
2. **Deine aktuelle Bestzeit und die Splits** — daraus ergibt sich, ob sub 60 in 5 Monaten
   realistisch ist oder ob das Ziel auf Mai 2027 rutschen muss.
3. **Zeitbudget pro Woche** neben Job/Studium — bestimmt die Kadenz in §4.6.
4. **Investitionsbudget für die Saison** (§8.1) — bestimmt, wie viele Auslandsrennen möglich sind.
5. **Positionierung**: Bestätigung von Variante B+A+C oder eine andere Wahl (§2.2).
6. **Marken- und Domainname** (§2.3).
7. **Website-Sprache**: Englisch, Deutsch oder zweisprachig (§5.2).
8. **Soll ich den Repo-Rebrand jetzt umsetzen?** Der Code ist aktuell eine Gym-Site; der Umbau
   auf die Athleten-Marke ist ein abgegrenzter Arbeitsschritt von wenigen Tagen.

---

## Quellen

- [HYROX World Championships (offiziell)](https://hyrox.com/hyrox-world-championships/)
- [How to Qualify for Hyrox Pro Division — Hyrox Vault](https://www.hyroxvault.com/blog/hyrox-pro-division-qualification/)
- [Hyrox Qualifying Guide 2026 — Hyrox Vault](https://www.hyroxvault.com/qualifiers/)
- [How to Qualify for the HYROX World Championships — Rox Lyfe](https://roxlyfe.com/how-to-qualify-for-the-hyrox-world-championships/)
- [HYROX World Championships 2026 — Red Bull](https://www.redbull.com/us-en/hyrox-world-championships-all-you-need-to-know)
- [HYROX 2026/27 Race Calendar — Hybrid Fitness Media](https://hybridfitnessmedia.com/2026/03/13/hyrox-2026-race-calendar/)
- [Hyrox Germany 2026 Race Calendar — Hyrox Vault](https://www.hyroxvault.com/hyrox/germany/)
- [Good HYROX Time 2026 — HyroxDataLab](https://hyroxdatalab.com/articles/what-is-a-good-hyrox-time)
- [HYROX Finish Time Benchmarks by Division & Age Group — HyCrew](https://www.hycrew.com/hyrox/times)

**Alle Renntermine und Qualifikationszeiten vor verbindlicher Planung auf
[hyrox.com](https://hyrox.com) gegenprüfen** — die Standards ändern sich pro Saison.
