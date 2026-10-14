export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ ".generated/styles": "styles" });
  eleventyConfig.addWatchTarget(".generated/styles");
  return {
    dir: { input: "src", output: "_site" },
    pathPrefix: process.env.PATH_PREFIX || "/",
  };
}