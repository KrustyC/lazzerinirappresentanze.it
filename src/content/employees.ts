import type { Employee } from "./types";

function employee(slug: string, name: string, job: string, file: string) {
  return {
    _id: `employee-${slug}`,
    name,
    job,
    picture: { url: `/img/${file}`, alt: name },
  } satisfies Employee;
}

export const employees: Employee[] = [
  employee(
    "cristina-montalto",
    "Cristina Montalto",
    "Sales Manager",
    "cristina-montalto-4.jpg"
  ),
  employee("daniele-lazzerini", "Daniele Lazzerini", "Sales Manager", "dl.jpg"),
  employee("luca-lazzerini", "Luca Lazzerini", "Sales Manager", "ll4.jpg"),
  employee(
    "silvia-ghignoni",
    "Silvia Ghignoni",
    "Assistant Sales Manager",
    "foto-silvia-ghignoni.png"
  ),
];
