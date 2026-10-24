import { pathToFileURL } from "node:url";
import { evaluate } from "@mdx-js/mdx";
import { renderToStaticMarkup } from "react-dom/server";
import * as runtime from "react/jsx-runtime";
import * as sass from "sass";
import toml from "@iarna/toml";
// const faviconsPlugin = require("eleventy-plugin-gen-favicons");
const EleventyPluginRobotsTxt = require("eleventy-plugin-robotstxt");
const sitemap = require("@quasibit/eleventy-plugin-sitemap");

export default function (eleventyConfig) {
  // sitemap.xml
  eleventyConfig.addPlugin(sitemap, {
    lastModifiedProperty: "modified",
    sitemap: {
      hostname: "https://xsgk.org",
    },
  });

  // robots.txt
  const eleventyPluginRobotsTxtOptions = {
    rules: new Map([
      ["DuckAssistBot", [{ allow: "/" }]],
      ["DuckDuckBot", [{ allow: "/" }]],
      ["DuckDuckGo-Favicons-Bot", [{ allow: "/" }]],
      ["ia_archiver", [{ allow: "/" }]],
      ["MojeekBot", [{ allow: "/" }]],
      ["search.marginalia.nu", [{ allow: "/" }]],
      ["*", [{ disallow: "/" }]],
    ]),
  };
  eleventyConfig.addPlugin(
    EleventyPluginRobotsTxt,
    eleventyPluginRobotsTxtOptions,
  );

  // faviconPlugin
  // eleventyConfig.addPlugin(faviconsPlugin, { "outputDir": "_site" });

  // TOML
  eleventyConfig.setFrontMatterParsingOptions({
    engines: {
      toml: toml.parse.bind(toml),
    },
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
    "node_modules/@fontsource/fira-code/index.css": "fonts/fira-code/index.css",
    "node_modules/@fontsource/fira-code/files": "fonts/fira-code/files",
    "node_modules/@fontsource/iosevka-aile/index.css": "fonts/iosevka-aile/index.css",
    "node_modules/@fontsource/iosevka-aile/files": "fonts/iosevka-aile/files",
    "node_modules/@fontsource/iosevka-etoile/index.css": "fonts/iosevka-etoile/index.css",
    "node_modules/@fontsource/iosevka-etoile/files": "fonts/iosevka-etoile/files",
  });

  // SASS
  eleventyConfig.addTemplateFormats("scss");
  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css",
    compile: async function (inputContent) {
      let result = sass.compileString(inputContent);
      return async (data) => {
        return result.css;
      };
    },
  });

  // Front Matter
  eleventyConfig.setFrontMatterParsingOptions({
    language: "toml",
  });

  return {
    dir: {
      includes: "_includes",
      input: "src",
      output: "_site"
    },
    pathPrefix: process.env.PATH_PREFIX || "/",
  };
}