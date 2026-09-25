import { contactsPage } from "./documents/contactsPage";
import { employee } from "./documents/employee";
import { homePage } from "./documents/homePage";
import { partner } from "./documents/partner";
import { partnersPage } from "./documents/partnersPage";
import { servicesPage } from "./documents/servicesPage";
import { portableText } from "./objects/portableText";
import { seo } from "./objects/seo";

export const schemaTypes = [
  portableText,
  seo,
  homePage,
  servicesPage,
  partnersPage,
  contactsPage,
  partner,
  employee,
];
