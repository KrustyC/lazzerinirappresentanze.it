export const StudioNotConfigured: React.FC = () => (
  <main className="min-h-screen bg-white px-6 py-24 text-black">
    <div className="mx-auto max-w-xl">
      <h1 className="mb-4 text-3xl">Sanity Studio non ancora collegato</h1>
      <p className="mb-4">
        Imposta <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> (e il dataset) in{" "}
        <code>.env.local</code> e riavvia il server. Fino ad allora il sito
        mostra i contenuti locali in <code>src/content/</code>.
      </p>
      <p>
        Vedi <code>docs/runbooks/sanity.md</code>.
      </p>
    </div>
  </main>
);
