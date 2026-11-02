import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

/** The website's own self-hosted faces: Space Grotesk (variable, 300–700) and the Oughter wordmark face. */
export const fontsReady = Promise.all([
  loadFont({ family: "Space Grotesk", url: staticFile("fonts/SpaceGrotesk-Variable.woff2"), weight: "300 700", format: "woff2" }),
  loadFont({ family: "Oughter", url: staticFile("fonts/Oughter.otf"), format: "opentype" }),
]);
