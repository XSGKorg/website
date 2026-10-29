import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import toml from "@iarna/toml";
const sitemap = require("@quasibit/eleventy-plugin-sitemap");
const path = require("node:path");
const eleventySass = require("eleventy-sass");

export default function (eleventyConfig) {
  // Passthroughs
  eleventyConfig.addPassthroughCopy({
    "src/robots.txt": "robots.txt",
  });

  // sitemap.xml
  eleventyConfig.addPlugin(sitemap, {
    lastModifiedProperty: "modified",
    sitemap: {
      hostname: "https://xsgk.org",
    },
  });

  // TOML
  eleventyConfig.setFrontMatterParsingOptions({
    engines: {
      toml: toml.parse.bind(toml),
    },
    language: "toml",
  });

  // Fonts
  eleventyConfig.addPassthroughCopy({
    // Fira Code
    // "node_modules/@fontsource/fira-code/cyrillic.css": "fonts/fira-code/cyrillic.css",
    // "node_modules/@fontsource/fira-code/greek-ext.css": "fonts/fira-code/greek-ext.css",
    // "node_modules/@fontsource/fira-code/greek.css": "fonts/fira-code/greek.css",
    // "node_modules/@fontsource/fira-code/latin-ext.css": "fonts/fira-code/latin-ext.css",
    // "node_modules/@fontsource/fira-code/latin.css": "fonts/fira-code/latin.css",
    // "node_modules/@fontsource/fira-code/symbols2.css": "fonts/fira-code/symbols2.css",
    "node_modules/@fontsource/fira-code/files": "styles/files",
    // Iosevka Aile (sans)
    // "node_modules/@fontsource/iosevka-aile/latin-italic.css": "fonts/iosevka-aile/latin-italic.css",
    // "node_modules/@fontsource/iosevka-aile/latin.css": "fonts/iosevka-aile/latin.css",
    "node_modules/@fontsource/iosevka-aile/files": "styles/files",
    // Iosevka Etoile (slab)
    // "node_modules/@fontsource/iosevka-etoile/latin-italic.css": "fonts/iosevka-etoile/latin-italic.css",
    // "node_modules/@fontsource/iosevka-etoile/latin.css": "fonts/iosevka-etoile/latin.css",
    "node_modules/@fontsource/iosevka-etoile/files": "styles/files",
    // Newsreader
    // "node_modules/@fontsource/newsreader/latin-ext-italic.css": "fonts/newsreader/latin-ext-italic.css",
    // "node_modules/@fontsource/newsreader/latin-ext.css": "fonts/newsreader/latin-ext.css",
    // "node_modules/@fontsource/newsreader/latin-italic.css": "fonts/newsreader/latin-italic.css",
    // "node_modules/@fontsource/newsreader/latin.css": "fonts/newsreader/latin.css",
    "node_modules/@fontsource/newsreader/files": "styles/files",
  });  

  // Targets
  eleventyConfig.addPlugin(eleventySass);
  eleventyConfig.addPlugin(syntaxHighlight, { templateFormats: ["*"] });
  // eleventyConfig.addWatchTarget("src/styles/");
  return {
    dir: {
      includes: "_includes",
      input: "src",
      output: "_site"
    },
    pathPrefix: process.env.PATH_PREFIX || "/",
  };
}