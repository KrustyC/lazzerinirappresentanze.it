import { CenteredColumn } from "@/components/CenteredColumn";
import { SITE } from "@/lib/site";

interface OfficeInfoProps {
  address: string;
}

const telHref = (number: string) => `tel:+39${number.replaceAll(" ", "")}`;

export const OfficeInfo: React.FC<OfficeInfoProps> = ({ address }) => (
  <CenteredColumn className="flex flex-col justify-between gap-12 md:flex-row">
    <div className="flex flex-col">
      <h2 className="mb-2 text-3xl">Ufficio</h2>
      <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
      <a href={telHref(SITE.phone)}>Tel. {SITE.phone}</a>
      <span>Fax. {SITE.fax}</span>
    </div>

    <div className="flex flex-col">
      <h2 className="mb-2 text-3xl">Orario</h2>
      <b>{SITE.openingDays}</b>
      <span>{SITE.openingHours}</span>
      <address className="not-italic">{address}</address>
    </div>
  </CenteredColumn>
);
