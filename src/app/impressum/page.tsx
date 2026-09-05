import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Anbieterkennzeichnung nach § 5 DDG.",
  robots: { index: false },
};

// Blocking before launch. A German site that takes money without a valid
// Impressum is a warning letter waiting to happen — and the address has to be
// one that can receive legal post, which for most people means either their
// home address or a service that provides one.
export default function ImpressumPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-14">
      <h1 className="board text-4xl">Impressum</h1>

      <div className="mt-6 border-l-2 border-over bg-panel px-4 py-3">
        <p className="board-sm text-sm">Not filled in yet</p>
        <p className="mt-1 text-sm text-ink-soft">
          This page must be complete before the site goes live or takes a single
          payment. Replace everything below in{" "}
          <code className="text-signal">src/app/impressum/page.tsx</code>.
        </p>
      </div>

      <section className="mt-10">
        <h2 className="board-sm text-lg">Angaben gemäß § 5 DDG</h2>
        <ul className="mt-3 flex flex-col gap-2 text-ink-soft">
          <li>Vor- und Nachname</li>
          <li>Ladungsfähige Anschrift (kein Postfach)</li>
          <li>E-Mail-Adresse und Telefonnummer</li>
          <li>Umsatzsteuer-ID, falls vorhanden</li>
          <li>
            Hinweis auf die Kleinunternehmerregelung nach § 19 UStG, solange sie
            gilt
          </li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="board-sm text-lg">Verantwortlich für den Inhalt</h2>
        <p className="mt-3 text-ink-soft">
          Name und Anschrift der verantwortlichen Person.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="board-sm text-lg">EU-Streitschlichtung</h2>
        <p className="mt-3 text-ink-soft">
          Hinweis auf die Plattform der EU-Kommission zur Online-Streitbeilegung
          und eine Aussage dazu, ob an einem Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilgenommen wird.
        </p>
      </section>
    </div>
  );
}
