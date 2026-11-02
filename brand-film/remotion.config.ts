import { Config } from "@remotion/cli/config";

// The container ships Chromium with Playwright; point Remotion at it instead of downloading another copy.
if (process.env.REMOTION_BROWSER) Config.setBrowserExecutable(process.env.REMOTION_BROWSER);
Config.setVideoImageFormat("jpeg");
Config.setJpegQuality(95);
Config.setOverwriteOutput(true);
Config.setConcurrency(4);
