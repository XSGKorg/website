import pkg from "../../package.json" with { type: "json" };

export default [
    { slug: "version", label: "version", message: String(pkg.version ?? "0.0.0"), color: "blue" },
    { slug: "built", label: "built", message: new Date().toISOString().slice(0, 10), color: "green" },
    { slug: "license", label: "license", message: String(pkg.license ?? "MIT"), color: "lightgrey" },
];