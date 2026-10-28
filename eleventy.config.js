import { pathToFileURL } from "node:url";
import { evaluate } from "@mdx-js/mdx";
import { renderToStaticMarkup } from "react-dom/server";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import * as runtime from "react/jsx-runtime";
import * as sass from "sass";
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

  // MDX
  eleventyConfig.addPlugin(syntaxHighlight, { templateFormats: ["*", "mdx"] });
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

  // Fonts
  eleventyConfig.addPassthroughCopy({
    // Fira Code
    "node_modules/@fontsource/fira-code/cyrillic.css": "fonts/fira-code/cyrillic.css",
    "node_modules/@fontsource/fira-code/greek-ext.css": "fonts/fira-code/greek-ext.css",
    "node_modules/@fontsource/fira-code/greek.css": "fonts/fira-code/greek.css",
    "node_modules/@fontsource/fira-code/latin-ext.css": "fonts/fira-code/latin-ext.css",
    "node_modules/@fontsource/fira-code/latin.css": "fonts/fira-code/latin.css",
    "node_modules/@fontsource/fira-code/symbols2.css": "fonts/fira-code/symbols2.css",
    "node_modules/@fontsource/fira-code/files": "fonts/fira-code/files",
    // Iosevka Aile (sans)
    "node_modules/@fontsource/iosevka-aile/latin-italic.css": "fonts/iosevka-aile/latin-italic.css",
    "node_modules/@fontsource/iosevka-aile/latin.css": "fonts/iosevka-aile/latin.css",
    "node_modules/@fontsource/iosevka-aile/files": "fonts/iosevka-aile/files",
    // Iosevka Etoile (slab)
    "node_modules/@fontsource/iosevka-etoile/latin-italic.css": "fonts/iosevka-etoile/latin-italic.css",
    "node_modules/@fontsource/iosevka-etoile/latin.css": "fonts/iosevka-etoile/latin.css",
    "node_modules/@fontsource/iosevka-etoile/files": "fonts/iosevka-etoile/files",
    // Newsreader
    "node_modules/@fontsource/newsreader/latin-ext-italic.css": "fonts/newsreader/latin-ext-italic.css",
    "node_modules/@fontsource/newsreader/latin-ext.css": "fonts/newsreader/latin-ext.css",
    "node_modules/@fontsource/newsreader/latin-italic.css": "fonts/newsreader/latin-italic.css",
    "node_modules/@fontsource/newsreader/latin.css": "fonts/newsreader/latin.css",
    "node_modules/@fontsource/newsreader/files": "fonts/newsreader/files",
  });

  // SASS
  eleventyConfig.addPlugin(eleventySass);
  // eleventyConfig.addExtension("scss", {
	// 	outputFileExtension: "css",

	// 	useLayouts: false,

	// 	compile: async function (inputContent, inputPath) {
	// 		let parsed = path.parse(inputPath);
	// 		if(parsed.name.startsWith("_")) {
	// 			return;
	// 		}

	// 		let result = sass.compileString(inputContent, {
	// 			loadPaths: [
	// 				parsed.dir || ".",
	// 				this.config.dir.includes,
	// 			]
	// 		});

	// 		this.addDependencies(inputPath, result.loadedUrls);

	// 		return async (data) => {
	// 			return result.css;
	// 		};
	// 	},
	// });

  // Targets
  eleventyConfig.addTemplateFormats("mdx")
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