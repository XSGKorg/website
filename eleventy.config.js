import { pathToFileURL } from "node:url";
import { evaluate } from "@mdx-js/mdx";
import { renderToStaticMarkup } from "react-dom/server";
import * as runtime from "react/jsx-runtime";
import * as sass from "sass";
import toml from "@iarna/toml";
const sitemap = require("@quasibit/eleventy-plugin-sitemap");
const path = require("node:path");

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

  // MDX
  eleventyConfig.addExtension("mdx", {
    compile: async (str, inputPath) => {
      const { default: mdxContent } = await evaluate(str, {
        ...runtime,
        baseUrl: pathToFileURL(inputPath)
      });

      return async function (data) {
        let res = await mdxContent(data);
        return renderToStaticMarkup(res);
      }
    }
  });
  eleventyConfig.addTemplateFormats("mdx")

  // Fonts
  eleventyConfig.addPassthroughCopy({
    // Fira Code
    "node_modules/@fontsource/fira-code/index.css": "fonts/fira-code/index.css",
    "node_modules/@fontsource/fira-code/files": "fonts/fira-code/files",
    // Iosevka Aile (sans)
    "node_modules/@fontsource/iosevka-aile/index.css": "fonts/iosevka-aile/index.css",
    "node_modules/@fontsource/iosevka-aile/files": "fonts/iosevka-aile/files",
    // Iosevka Etoile (slab)
    "node_modules/@fontsource/iosevka-etoile/index.css": "fonts/iosevka-etoile/index.css",
    "node_modules/@fontsource/iosevka-etoile/files": "fonts/iosevka-etoile/files",
    // Newsreader
    "node_modules/@fontsource/newsreader/index.css": "fonts/newsreader/index.css",
    "node_modules/@fontsource/newsreader/files": "fonts/newsreader/files",
  });

  // SASS
  eleventyConfig.addTemplateFormats("scss");
  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css",
    compile: async function (inputContent, inputPath) {
      const parsed = path.parse(inputPath);
      if (parsed.name.startsWith("_")) return;
      const result = sass.compileString(inputContent, {
        loadPaths: [parsed.dir || "."],
      });
      return async () => result.css;
    },
  });

  // Targets
  eleventyConfig.addWatchTarget("src/styles/");
  return {
    dir: {
      includes: "_includes",
      input: "src",
      output: "_site"
    },
    pathPrefix: process.env.PATH_PREFIX || "/",
  };
}