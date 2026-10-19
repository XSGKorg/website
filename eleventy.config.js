import '@fontsource/fira-code';
import '@fontsource/iosevka-aile';
import '@fontsource/iosevka-etoile';
const sitemap = require("@quasibit/eleventy-plugin-sitemap");

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ ".generated/styles": "styles" });
  eleventyConfig.addWatchTarget(".generated/styles");
  eleventyConfig.addPlugin(sitemap, {
    sitemap: {
      hostname: "https://xsgk.org",
    },
  });
  return {
    dir: { input: "src", output: "_site" },
    pathPrefix: process.env.PATH_PREFIX || "/",
  };
}