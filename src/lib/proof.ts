/**
 * Proof points shown in the "Proof, not promises" section. Every item must be something a visitor
 * can check through its link. Add ratings or certifications (Clutch, ISO 27001, …) here only once they exist.
 */
export type ProofPoint = {
    value: string;
    label: string;
    text: string;
    link: { label: string; href: string };
};

export const proofPoints: ProofPoint[] = [
    {
        value: "3,853 trials",
        label: "Published research",
        text: "A measured study of how Redis rate limiters behave under concurrency, with the harness, raw data and analysis released.",
        link: { label: "Read the paper", href: "https://doi.org/10.5281/zenodo.23467402" },
    },
    {
        value: "3,400+",
        label: "Automated tests",
        text: "StartupDeckAI runs lint, type checks, unit tests and Playwright end-to-end tests on every push before it deploys.",
        link: { label: "See the case study", href: "/work/startupdeck" },
    },
    {
        value: "3 SDKs",
        label: "Node.js, Go and Python",
        text: "LimitYourAPI ships client libraries for three languages, with the Node.js SDK published on npm.",
        link: { label: "Browse the SDK repo", href: "https://github.com/trynayash/limityourapi-sdk" },
    },
    {
        value: "Public",
        label: "Code on GitHub",
        text: "Read the code behind ScopeCI and the LimitYourAPI SDKs before you decide to work with us.",
        link: { label: "Visit GitHub", href: "https://github.com/trynayash" },
    },
];
