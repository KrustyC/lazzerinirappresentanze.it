import type { Partner, PartnersPageContent } from "./types";

export const partnersPage: PartnersPageContent = {
  title: "I nostri partner",
  body: [],
};

function partner(slug: string, name: string, link: string, file: string) {
  return {
    _id: `partner-${slug}`,
    name,
    link,
    logo: { url: `/img/${file}`, alt: name },
  } satisfies Partner;
}

export const partners: Partner[] = [
  partner(
    "bjorne-beer",
    "Bjorne beer",
    "https://www.bjorneitalia.com/",
    "logo-bjorne-beer.png"
  ),
  partner(
    "concilio",
    "Concilio",
    "https://www.concilio.it/it/",
    "logo-concilio.jpg"
  ),
  partner(
    "il-fornaio-del-casale",
    "Il Fornaio del Casale",
    "https://www.gecchele.com/en/",
    "logo-gecchele.jpg"
  ),
  partner(
    "riso-vignola",
    "Riso Vignola",
    "http://www.risovignola.it/it/",
    "vignola.png"
  ),
  partner(
    "barbanera-vini",
    "Barbanera Vini",
    "https://www.barbaneravini.it/en",
    "barbanera.png"
  ),
  partner(
    "birra-flea",
    "Birra Flea",
    "https://birraflea.com",
    "birra-flea.jpg"
  ),
  partner(
    "cantina-colli-euganei",
    "Cantina Colli Euganei",
    "https://www.cantinacollieuganei.it/",
    "cantina-colli-euganei.jpg"
  ),
  partner(
    "cantina-di-negrar",
    "Cantina di Negrar",
    "https://www.cantinanegrar.it/",
    "negrar.png"
  ),
  partner(
    "acqua-dolomia",
    "Acqua Dolomia",
    "https://acquadolomia.it/",
    "dolomia.jpg"
  ),
  partner(
    "conserve-italia",
    "Conserve Italia",
    "https://accademia.horeca.conserveitalia.it",
    "conserve_italia_logo.jpg"
  ),
  partner("fumaiolo", "Fumaiolo", "https://www.fumaiolo.com/", "fumaiolo.png"),
  partner(
    "icam",
    "ICAM",
    "http://www.icamcioccolato.com/",
    "logo-icam-grande.jpg"
  ),
  partner(
    "miele-vangelisti",
    "Miele Vangelisti",
    "http://www.mielevangelisti.it/it/index.php",
    "miele-vangelisti.png"
  ),
  partner(
    "strega-alberti",
    "Strega Alberti",
    "https://www.strega.it/",
    "strega.png"
  ),
  partner(
    "terre-de-trinci",
    "Terre dè Trinci",
    "http://www.terredetrinci.com/site/en/",
    "128_terre_de_trinci.gif"
  ),
  partner(
    "terre-francescane",
    "Terre Francescane",
    "https://www.terrefrancescane.com/it/",
    "terre-francescane.jpeg"
  ),
  partner("togni", "Togni", "https://www.togni.it/?lang=en", "togni.png"),
  partner(
    "toschi-vignola",
    "Toschi Vignola",
    "http://www.toschi.it/",
    "logo-toschi.gif"
  ),
  partner(
    "villa-degli-olmi",
    "Villa degli Olmi",
    "https://www.villadegliolmi.it",
    "villa-degli-olmi.jpg"
  ),
  partner(
    "vini-casal-bordino",
    "Vini Casal Bordino",
    "https://www.vinicasalbordino.com",
    "casal-bordino.jpg"
  ),
  partner(
    "molini-spigadoro",
    "Molini Spigadoro",
    "https://www.molinispigadoro.com/",
    "logo-spigadoro.jpg"
  ),
];
