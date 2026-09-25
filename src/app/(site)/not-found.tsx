import { AppLink } from "@/components/AppLink";
import { CenteredColumn } from "@/components/CenteredColumn";

export default function NotFound() {
  return (
    <CenteredColumn className="mb-24 text-center">
      <h1 className="mb-4 text-3xl md:text-4xl">Pagina non trovata</h1>
      <p className="mb-6">
        La pagina che cercavi non esiste o è stata spostata.
      </p>
      <AppLink href="/" className="text-primary font-bold underline">
        Torna alla home
      </AppLink>
    </CenteredColumn>
  );
}
