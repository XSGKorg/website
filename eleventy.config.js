export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ ".generated/styles": "styles" });
  eleventyConfig.addPassthroughCopy({
    "node_modules/@fontsource/fira-code/index.css": "fonts/fira-code/index.css",
    "node_modules/@fontsource/fira-code/files": "fonts/fira-code/files",
    "node_modules/@fontsource/iosevka-aile/index.css": "fonts/iosevka-aile/index.css",
    "node_modules/@fontsource/iosevka-aile/files": "fonts/iosevka-aile/files",
    "node_modules/@fontsource/iosevka-etoile/index.css": "fonts/iosevka-etoile/index.css",
    "node_modules/@fontsource/iosevka-etoile/files": "fonts/iosevka-etoile/files",
  });
  eleventyConfig.addWatchTarget(".generated/styles");

  return {
    dir: { input: "src", output: "_site" },
    pathPrefix: process.env.PATH_PREFIX || "/",
  };
}