export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ ".generated/styles": "styles" });
  eleventyConfig.addPassthroughCopy({ "node_modules/@fontsource/**/*.woff2": "fonts" });
  eleventyConfig.addWatchTarget(".generated/styles");
  return {
    dir: { input: "src", output: "_site" },
    pathPrefix: process.env.PATH_PREFIX || "/",
  };
}