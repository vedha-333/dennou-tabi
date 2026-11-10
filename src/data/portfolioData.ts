export interface Project {
  id: string;
  title: string;
  subtitle: string;
  japaneseTitle: string;
  description: string;
  technologies: string[];
  repository: string;
  featured?: boolean;
}

export interface SkillCategory {
  title: string;
  japaneseTitle: string;
  skills: string[];
}

export const OWNER_INFO = {
  name: "Vedant Yadav Pandilwad",
  japaneseName: "ヴェダント・ヤダヴ",
  title: "Computer Science Student | AI & ML Developer | Problem Solver",
  tagline: "Building practical software that solves real problems.",
  bio: "I build practical software that solves real problems. My work sits at the intersection of product thinking, backend systems, and modern web development, with a strong focus on building experiences that are useful, scalable, and open to learning.",
  github: "https://github.com/vedha-333",
  linkedin: "https://www.linkedin.com/in/vedant-pandilwad63724/",
  interests: [
    "Full-stack development",
    "Backend architecture",
    "Artificial Intelligence & Machine Learning",
    "Computer Vision",
    "Data Structures & Algorithms",
    "Product development",
    "Scalable software systems",
  ],
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Programming Languages",
    japaneseTitle: "言 語",
    skills: ["Python", "Java", "TypeScript", "JavaScript", "C / C++", "SQL"],
  },
  {
    title: "Frontend Development",
    japaneseTitle: "表 面",
    skills: ["Next.js", "React", "Tailwind CSS", "TypeScript", "HTML5 / CSS3", "State Management"],
  },
  {
    title: "Backend Development",
    japaneseTitle: "基 盤",
    skills: ["Node.js", "Express", "RESTful APIs", "Backend Architecture", "Microservices"],
  },
  {
    title: "Databases & Storage",
    japaneseTitle: "蓄 積",
    skills: ["PostgreSQL", "MongoDB", "Redis", "MySQL"],
  },
  {
    title: "AI & Machine Learning",
    japaneseTitle: "知 能",
    skills: ["Python", "OpenCV", "MediaPipe", "Computer Vision", "Scikit-Learn", "Neural Networks"],
  },
  {
    title: "Developer Tools & Systems",
    japaneseTitle: "道 具",
    skills: ["Git & GitHub", "Docker", "Linux", "Postman", "Vercel", "CI/CD"],
  },
];

export const PROJECTS: Project[] = [
  {
    id: "resolvex",
    title: "ResolveX",
    subtitle: "Voice-Driven Customer Dispute Resolution",
    japaneseTitle: "解決録",
    description: "Voice-driven customer dispute resolution application featuring order verification, secure evidence uploads, and a comprehensive real-time operations dashboard.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Redis"],
    repository: "https://github.com/vedha-333/ResolveX",
    featured: true,
  },
  {
    id: "aeroclick",
    title: "AeroClick",
    subtitle: "Touchless Gesture-Controlled Interface",
    japaneseTitle: "空触手",
    description: "Touchless mouse-control software translating webcam hand gestures into desktop cursor actions with sub-millimeter precision tracking.",
    technologies: ["Python", "OpenCV", "MediaPipe", "PyAutoGUI"],
    repository: "https://github.com/vedha-333/-AeroClick",
    featured: true,
  },
  {
    id: "network-optimizer",
    title: "Network Infrastructure Optimizer",
    subtitle: "Algorithmic Campus Topology Planner",
    japaneseTitle: "網最適化",
    description: "Interactive campus network planner visualizing Minimum Spanning Trees (MST) and actively benchmarking Kruskal's vs. Prim's graph algorithms.",
    technologies: ["Next.js", "React", "TypeScript", "Java"],
    repository: "https://github.com/vedha-333/Network-Infrastructure-Optimizer",
    featured: true,
  },
  {
    id: "ecommerce-follow-along",
    title: "Ecommerce Platform",
    subtitle: "Full-Stack Commerce Architecture",
    japaneseTitle: "商業網",
    description: "End-to-end full stack commerce platform emphasizing robust transaction pipelines, authenticated checkout workflows, and stateful cart resilience.",
    technologies: ["Next.js", "Node.js", "Express", "MongoDB"],
    repository: "https://github.com/vedha-333/Ecommerce-Follow-Along-Real",
    featured: false,
  },
  {
    id: "nand2tetris",
    title: "Nand2Tetris (Part 1)",
    subtitle: "From Logic Gates to Computer Architecture",
    japaneseTitle: "論理門",
    description: "Built an entire general-purpose computer system from elementary NAND gates up to a working Hack CPU and assembler, grounded in foundational computer engineering.",
    technologies: ["HDL", "Assembly", "Computer Architecture", "Hardware Sim"],
    repository: "https://github.com/vedha-333/nand2tetris-Part1",
    featured: false,
  },
  {
    id: "dsa-leetcode",
    title: "DSA & Algorithmic Problem Solving",
    subtitle: "Deep Foundations & Analytical Rigor",
    japaneseTitle: "算法考",
    description: "Extensive repertoire of algorithmic problem solutions spanning graph theory, dynamic programming, trees, and advanced data structures.",
    technologies: ["Java", "Python", "Data Structures", "Algorithms"],
    repository: "https://github.com/vedha-333/DSA-LeetCode",
    featured: false,
  },
];

export const PHILOSOPHY_PILLARS = [
  {
    title: "Learn by Building",
    japanese: "作而学",
    description: "Deepest understanding comes from constructing systems from first principles — from elemental logic gates up to modern cloud architectures.",
  },
  {
    title: "Solve Genuine Problems",
    japanese: "実効解",
    description: "Technology is a vessel for utility. Every line of code should relieve friction, deliver measurable value, or illuminate complex data.",
  },
  {
    title: "Maintainable Systems",
    japanese: "整然美",
    description: "Clean architecture, typed interfaces, and disciplined engineering ensure software remains resilient and graceful under growth.",
  },
  {
    title: "Continuous Refinement",
    japanese: "日々新",
    description: "Embracing curiosity, exploring computer vision and intelligent algorithms, and treating software craftsmanship as a lifelong pursuit.",
  },
];

