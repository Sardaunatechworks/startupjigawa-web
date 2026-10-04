export interface NavItem {
  label: string;
  href: string;
  description?: string;
  badge?: string;
  children?: Array<{
    label: string;
    href: string;
    description?: string;
  }>;
}

export const mainNavigation: NavItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About Us",
    href: "/about",
    children: [
      {
        label: "About Startup Jigawa",
        href: "/about",
        description: "Our history, legal registration (RC 7256149), and work in Dutse",
      },
      {
        label: "Meet Our Team",
        href: "/about#team",
        description: "Our leadership team, technical advisors, and unit leads",
      },
      {
        label: "Vision, Mission & Principles",
        href: "/about#vision",
        description: "What we stand for and how we make decisions",
      },
      {
        label: "How We Are Organised",
        href: "/about#governance",
        description: "Our delivery units and management structure",
      },
    ],
  },
  {
    label: "Programs",
    href: "/programs",
    children: [
      {
        label: "All Programmes",
        href: "/programs",
        description: "Diploma courses, training pathways, and partner programmes",
      },
      {
        label: "Open Opportunities",
        href: "/opportunities",
        description: "Bootcamps, fellowships, internships, and open applications",
      },
      {
        label: "Digital Skills Academy",
        href: "/programs",
        description: "Practical training in software, data, and cybersecurity",
      },
    ],
  },
  {
    label: "Innovation & Sectors",
    href: "/innovation",
    children: [
      {
        label: "Four Innovation Labs",
        href: "/innovation#labs",
        description: "Civic Tech, Data & Research, Talent, and Products",
      },
      {
        label: "Digital Products",
        href: "/innovation#products",
        description: "Tools built for local needs: RentHouse, SoftDeliver, PrepAI, Yankasuwa",
      },
      {
        label: "Key Sectors",
        href: "/sectors",
        description: "Agriculture, Health, Education, Public Services & Commerce",
      },
      {
        label: "Community-to-Policy Model",
        href: "/innovation#pathway",
        description: "How we turn community feedback into practical solutions",
      },
    ],
  },
  {
    label: "Impact & Research",
    href: "/impact",
    children: [
      {
        label: "Our Impact",
        href: "/impact",
        description: "How we verify results and track participant progress",
      },
      {
        label: "Research & Publications",
        href: "/research",
        description: "Field surveys, baseline reports, and policy briefs",
      },
      {
        label: "Stories From Our Work",
        href: "/impact#stories",
        description: "Experiences from our participants and partner communities",
      },
    ],
  },
  {
    label: "Partners",
    href: "/partners",
  },
  {
    label: "News",
    href: "/news-events",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export const footerNavigation = {
  about: [
    { label: "About Startup Jigawa", href: "/about" },
    { label: "Vision, Mission & Values", href: "/about#vision" },
    { label: "Leadership & Governance", href: "/about#governance" },
    { label: "Track Record & Milestones", href: "/about#milestones" },
    { label: "Operating Principles", href: "/about#principles" },
  ],
  programs: [
    { label: "All Programs", href: "/programs" },
    { label: "Open Opportunities", href: "/opportunities" },
    { label: "Digital Skills Academy", href: "/programs" },
    { label: "Civic Tech Initiatives", href: "/innovation#civic-tech" },
    { label: "Fellowships & Bootcamps", href: "/opportunities" },
  ],
  innovation: [
    { label: "Four Innovation Labs", href: "/innovation#labs" },
    { label: "Homegrown Products", href: "/innovation#products" },
    { label: "AgriTech & Climate Lab", href: "/sectors/agtech" },
    { label: "GovTech & Open Gov", href: "/sectors/govtech" },
    { label: "Community-to-Policy Model", href: "/innovation#pathway" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
    { label: "Conflict of Interest Policy", href: "/about" },
    { label: "Data Protection & NDPA", href: "/privacy#data-protection" },
  ],
};
