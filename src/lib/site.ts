/**
 * Company details that appear in the footer, the contacts page and the
 * privacy policy. Hardcoded today exactly as on the Gatsby site; a
 * `siteSettings` singleton in Sanity is the natural home once the redesign
 * decides what editors should own.
 */
export const SITE = {
  name: "Lazzerini Rappresentanze",
  legalName: "Lazzerini Rappresentanze S.r.l.",
  description: "Sito per Lazzerini Rappresentanze",
  slogan:
    "Trovarsi insieme è un inizio, restare insieme un progresso, lavorare insieme un successo!",
  street: "Via del Prucino, 2/L",
  postalCode: "52037",
  city: "Sansepolcro",
  province: "AR",
  country: "Italy",
  phone: "0575 742154",
  fax: "0575 742154",
  email: "info@lazzerinirappresentanze.it",
  privacyEmail: "lucalazze@gmail.com",
  vatNumber: "0225813051",
  openingDays: "Lunedì - Venerdì",
  openingHours: "9:00-13:00 14:00-18:00",
  linkedin: "https://linkedin.com",
  coordinates: { lat: 43.57115, lng: 12.13375 },
} as const;

export const NAV_LINKS = [
  { text: "Azienda", href: "/" },
  { text: "Servizi", href: "/servizi" },
  { text: "Partners", href: "/partners" },
  { text: "Contatti", href: "/contatti" },
] as const;

export const FOOTER_LINKS = [
  ...NAV_LINKS,
  { text: "Privacy Policy", href: "/privacy-policy" },
] as const;
