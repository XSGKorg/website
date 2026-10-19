import { makeBadge } from "badge-maker";

export default class {
    data() {
        return {
            pagination: { data: "badges", size: 1, alias: "badge" },
            permalink: (data) => `/badges/${data.badge.slug}.svg`,
            eleventyExcludeFromCollections: true,
        };
    }
    render({ badge }) {
        const { label, message, color } = badge;
        return makeBadge({ label, message, color, style: "flat" });
    }
}