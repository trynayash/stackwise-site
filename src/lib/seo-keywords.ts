/**
 * Search queries each existing page is written to answer, by path. Server-only (feeds the keyword map in
 * docs/seo and nothing in the browser). Industry, location and guide pages keep their keywords in their own files.
 */
export const pageKeywords: Record<string, string[]> = {
    "/": [
        "saas development company", "software development company mumbai", "saas development company india", "software studio mumbai",
        "custom software development company india", "web app development company mumbai", "it company in mumbai for startups",
        "saas development agency", "software development agency india", "best software development company in mumbai",
        "app development company mumbai", "next.js development agency", "ai development company india", "startup software development partner",
        "software company for small business india", "hire software developers mumbai", "dedicated developer for startup india",
        "freelance vs agency software development", "end to end product development company", "product engineering studio india",
    ],
    "/pricing": [
        "software development pricing", "saas development pricing", "website development price india", "web app development cost india",
        "saas development cost", "website design packages mumbai", "website development packages india", "custom software development cost india",
        "fixed price software development", "how much does a website cost in mumbai", "how much does it cost to build a saas",
        "saas mvp price", "app development quote", "software development quote india", "affordable saas development",
        "cheap website development mumbai", "website development charges in india", "web development rates india",
        "hourly vs fixed price development", "software development cost in usd india", "next.js website price",
        "how much do indian developers charge", "website maintenance cost india", "saas development company pricing",
    ],
    "/services": [
        "software development services", "software development services india", "custom software development services",
        "web development services india", "it services mumbai", "full stack development services", "product development services",
    ],
    "/solutions": ["software solutions for startups", "business software solutions india", "mvp solutions", "digital transformation small business india"],
    "/technologies": ["next.js react node.js go development", "modern web development stack", "typescript development company"],
    "/services/saas-development": [
        "saas development", "saas development company", "saas development company india", "saas development services", "saas app development",
        "saas application development company", "custom saas development", "saas product development", "saas software development",
        "b2b saas development", "multi tenant saas development", "saas developers india", "hire saas developers", "saas development agency",
        "build a saas product", "saas platform development", "saas web application development", "saas subscription billing integration",
        "saas development mumbai", "saas startup development partner", "saas architecture design", "how to build a saas app",
        "saas development cost india", "saas development timeline", "white label saas development", "saas dashboard development",
        "saas development company for startups", "outsource saas development to india",
    ],
    "/services/ai-development": [
        "ai development company", "ai development company india", "ai development services", "llm integration services",
        "rag development services", "ai chatbot development", "ai agent development", "custom ai solutions for business",
        "add ai to my app", "ai saas development", "generative ai development company", "ai automation services",
        "document ai pipeline", "semantic search development", "vector database integration", "ai copilot development",
        "ai development cost india", "ai mvp development",
    ],
    "/services/custom-software": [
        "custom software development", "custom software development company", "custom software development company india",
        "bespoke software development", "internal tools development", "custom crm development", "custom erp development",
        "business software development", "client portal development", "custom api development", "custom software mumbai",
        "custom software development cost", "replace spreadsheets with software", "workflow software development",
    ],
    "/services/web-development": [
        "web development company", "website development company", "website development company mumbai", "web development services",
        "website design and development mumbai", "next.js website development", "custom website development", "business website development",
        "corporate website development", "landing page development", "seo friendly website development", "fast website development",
        "web app development company", "headless cms website", "ecommerce website development", "website redesign services",
        "website developer mumbai", "web designer mumbai", "website development india",
    ],
    "/services/mobile-app-development": [
        "mobile app development company", "mobile app development company india", "app development company mumbai",
        "react native app development", "cross platform app development", "ios and android app development", "app developers india",
        "mobile app development cost india", "startup app development", "hire react native developers",
    ],
    "/services/ui-ux-design": [
        "ui ux design agency", "ui ux design services", "saas ui ux design", "product design agency india", "figma prototype design",
        "web app ui design", "dashboard ui design", "ux design for startups", "design system services", "ui ux designer mumbai",
    ],
    "/services/cloud-devops": [
        "devops services", "cloud and devops services", "aws devops consulting", "ci cd pipeline setup", "github actions ci cd",
        "docker deployment services", "terraform infrastructure as code", "cloud migration services india", "vercel deployment", "devops for startups",
    ],
    "/services/software-modernization": [
        "legacy software modernization", "software modernization services", "legacy application modernization", "codebase refactoring services",
        "migrate to next.js", "migrate javascript to typescript", "rewrite vs refactor", "upgrade legacy web app", "technical debt reduction",
    ],
    "/services/maintenance-support": [
        "software maintenance services", "website maintenance services", "web app maintenance", "saas maintenance and support",
        "monthly website maintenance india", "bug fixing services", "application support services", "website maintenance cost india",
    ],
    "/solutions/startups": [
        "software development for startups", "startup software development company", "tech partner for startups india",
        "product development for startups", "outsourced cto services", "build startup app", "startup web app development", "non technical founder developer",
    ],
    "/solutions/mvp-development": [
        "mvp development", "mvp development company", "mvp development company india", "mvp development services", "saas mvp development",
        "build an mvp", "mvp app development", "rapid prototyping services", "startup mvp development", "mvp development cost",
        "how long to build an mvp", "mvp for startups india", "mvp software development",
    ],
    "/solutions/business-automation": [
        "business process automation", "business automation services", "workflow automation services", "automate spreadsheets",
        "custom automation software", "ai workflow automation", "operations automation small business", "zapier alternative custom",
    ],
    "/technologies/nextjs": [
        "next.js development company", "next.js development services", "next.js developers india", "hire next.js developer",
        "next.js agency", "next.js website development", "next.js ecommerce development", "next.js saas development", "next.js seo",
    ],
    "/technologies/react": [
        "react development company", "react.js development services", "react developers india", "hire react developer",
        "react dashboard development", "react web app development", "react typescript development",
    ],
    "/technologies/nodejs": [
        "node.js development company", "node.js development services", "node.js developers india", "hire node.js developer",
        "node.js api development", "node.js backend development", "typescript backend development",
    ],
    "/technologies/go": [
        "golang development company", "go development services", "golang developers india", "hire golang developer",
        "golang api development", "go microservices development", "high performance api development",
    ],
};
