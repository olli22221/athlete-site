import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzerklärung nach DSGVO.",
  robots: { index: false },
};

// Blocking before launch, and specifically harder than a standard template
// because of the avatar: conversations are processed by a third party, which
// means a named processor, a legal basis, and a transfer mechanism if that
// processor is outside the EU.
export default function DatenschutzPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-14">
      <h1 className="board text-4xl">Datenschutz</h1>

      <div className="mt-6 border-l-2 border-over bg-panel px-4 py-3">
        <p className="board-sm text-sm">Not filled in yet</p>
        <p className="mt-1 text-sm text-ink-soft">
          Must be complete before launch. The list below is what this site
          actually processes — a generic template will not cover the avatar.
        </p>
      </div>

      <section className="mt-10">
        <h2 className="board-sm text-lg">Was diese Seite tatsächlich verarbeitet</h2>
        <ul className="mt-3 flex flex-col gap-3 text-ink-soft">
          <li>
            <strong className="text-ink">Wallet-Cookie</strong> — ein
            httpOnly-Cookie mit einer zufälligen ID, das Avatar-Guthaben einem
            Browser zuordnet. Technisch erforderlich für die Bezahlfunktion,
            Laufzeit ein Jahr.
          </li>
          <li>
            <strong className="text-ink">Video-Avatar (Tavus)</strong> — Bild
            und Ton des Gesprächs werden vom Anbieter verarbeitet. Rechtsgrundlage,
            Auftragsverarbeitungsvertrag und Drittlandübermittlung müssen hier
            benannt werden. Aufzeichnung ist deaktiviert.
          </li>
          <li>
            <strong className="text-ink">E-Mail-Adressen</strong> — für die
            Freischaltung der Fünf-Minuten-Session gespeichert; der Newsletter
            zusätzlich nur nach bestätigtem Double-Opt-in.
          </li>
          <li>
            <strong className="text-ink">Zahlungen (Stripe)</strong> —
            Zahlungsdaten werden ausschließlich von Stripe verarbeitet, nicht
            auf diesem Server gespeichert.
          </li>
          <li>
            <strong className="text-ink">IP-Adressen</strong> — kurzzeitig für
            Rate-Limits und Missbrauchsschutz, in gezählter Form ohne dauerhafte
            Speicherung der Adresse selbst.
          </li>
          <li>
            <strong className="text-ink">Hosting-Logs</strong> — je nach Hoster
            zu ergänzen.
          </li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="board-sm text-lg">Betroffenenrechte</h2>
        <p className="mt-3 text-ink-soft">
          Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit,
          Widerspruch und Beschwerderecht bei einer Aufsichtsbehörde — jeweils
          mit Kontaktweg und zuständiger Behörde ergänzen.
        </p>
      </section>
    </div>
  );
}
