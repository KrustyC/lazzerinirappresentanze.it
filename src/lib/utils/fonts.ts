import { League_Spartan } from "next/font/google";

// The Gatsby site loaded "Spartan" from Google Fonts, since renamed League
// Spartan. Only the weights the pages use.
export const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-league-spartan",
  display: "swap",
});
