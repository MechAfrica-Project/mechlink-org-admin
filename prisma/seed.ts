import { config } from "dotenv";
config({ path: ".env.local" });

import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";

const adapter = new PrismaNeon({ connectionString: process.env.POSTGRES_PRISMA_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  // --- Admin user ---
  const adminEmail = "admin@mechafrica.com";
  const existingAdmin = await prisma.adminUser.findUnique({ where: { email: adminEmail } });
  let generatedPassword: string | null = null;

  if (!existingAdmin) {
    generatedPassword = randomBytes(12).toString("base64url");
    const passwordHash = await bcrypt.hash(generatedPassword, 12);
    await prisma.adminUser.create({
      data: { email: adminEmail, passwordHash, name: "MechLink Admin" },
    });
  }

  // --- Team members (real roster only — no placeholders seeded) ---
  await prisma.teamMember.upsert({
    where: { slug: "elvis-gyasi-owusu" },
    update: {},
    create: {
      slug: "elvis-gyasi-owusu",
      name: "Elvis Gyasi Owusu",
      initials: "EO",
      title: "Co-Founder & CEO",
      bio: "Co-Founder and CEO of MechLink, leading the team and driving MechAfrica's front-end architecture from product vision through execution.",
      photoUrl: "/images/team/elvis-gyasi-owusu.jpg",
      linkedin: "https://www.linkedin.com/in/elvis-gyasi-owusu-0a4044193/",
      order: 0,
    },
  });

  await prisma.teamMember.upsert({
    where: { slug: "emmanuel-lomotey" },
    update: {},
    create: {
      slug: "emmanuel-lomotey",
      name: "Emmanuel Lomotey",
      initials: "EL",
      title: "Co-Founder & CTO",
      bio: "Co-Founder and CTO of MechLink, leading backend architecture for MechAfrica — building secure, scalable systems that connect farmers and service providers across Ghana.",
      photoUrl: null,
      linkedin: "https://www.linkedin.com/in/emmanuellomotey/",
      order: 1,
    },
  });

  // --- Blog posts ---
  const articles = [
    {
      slug: "offline-first-ussd-african-agtech",
      title: "Building Offline-First: Why USSD Still Matters in African Agtech",
      category: "Engineering",
      readTime: "8 min read",
      excerpt:
        "Smartphones and stable internet are not universal in rural Africa. Here's how MechAfrica's architecture treats USSD and feature phones as first-class citizens, not fallbacks.",
      isFeatured: true,
      coverImageUrl: "/images/blog/blog-offline-first-ussd.png",
      contentMd: `## Designing for the Network You Actually Have

Most software is architected around an assumption: the user has a smartphone, a data plan, and a signal. That assumption breaks down fast once you leave the city center in most of the countries we operate in. For the farmers and service providers MechAfrica serves, a feature phone and a USSD session are often the only reliable path online.

So we flipped the usual build order. Instead of building a smartphone app and bolting on a "lite" USSD mode later, we designed the coordination logic — matching a farmer to a tractor operator, confirming a booking, settling payment — to work end-to-end over USSD first. The mobile and web apps for service providers are the layer built on top of that same core, not the other way around.

### Why This Is Harder Than It Sounds

USSD sessions are stateless, character-limited, and can drop at any point in a multi-step flow. Every interaction has to be designed so a farmer can start a session, lose signal, and pick back up without losing their place or triggering a duplicate booking. That constraint shapes everything from our session state machine to how we structure confirmation messages.

### Field Agents Close the Trust Gap

Technology alone doesn't solve rural onboarding. A USSD menu can't build trust the way a person can. That's why Field Agents are structural to MechAfrica, not a stopgap: they onboard farmers in person, explain how a booking works, and stay the human point of contact while the digital rails handle matching, scheduling, and mobile money settlement underneath.

### Our Architectural Blueprint

1. **A single coordination core.** Farmer requests, provider availability, and payment state live in one system that USSD, mobile, and web clients all read from — no divergent logic between channels.
2. **Mobile money as the default rail.** Payments settle through mobile money first, with reconciliation built to handle intermittent connectivity on both sides of a transaction.
3. **Provider-facing tools for real-time visibility.** Service providers get a live view of demand and matched jobs, so the coordination layer benefits both sides of the marketplace, not just the farmer.
`,
    },
    {
      slug: "field-agents-human-layer-of-digital-trust",
      title: "Field Agents: The Human Layer Behind Digital Trust",
      category: "Product",
      readTime: "6 min read",
      excerpt:
        "No app store download convinces a farmer to trust a new platform with their harvest. Here's why MechAfrica put people, not push notifications, at the center of onboarding.",
      isFeatured: false,
      coverImageUrl: "/images/blog/blog-field-agents-trust.png",
      contentMd: `## The Digital Divide Isn't Just About Signal

It's tempting to treat rural technology adoption as purely an infrastructure problem — get enough towers up, get smartphone prices down, and adoption follows. In practice, the bigger barrier is trust. A farmer weighing whether to book a tractor through a new platform is weighing real risk: a missed planting window, a wasted season, a payment sent into the void.

MechAfrica's Field Agents exist to close that gap directly. They're trained, local, and present — walking farmers through their first booking, answering questions a menu can't anticipate, and standing behind the platform with a face and a name.

### What Field Agents Actually Do

Onboarding is the obvious part, but Field Agents also handle much of the localized calibration a purely digital platform would struggle with: understanding which service providers are reliable in a given district, translating platform terms into the right local context, and surfacing feedback from the ground back into the product.
`,
    },
    {
      slug: "designing-for-zero-data",
      title: "Designing for Zero Data: UX Lessons from the Field",
      category: "Design",
      readTime: "5 min read",
      excerpt:
        "Every design decision costs kilobytes and cognitive load. What we learned building interfaces for users who may never load a full webpage.",
      isFeatured: false,
      coverImageUrl: "/images/blog/blog-designing-zero-data.png",
      contentMd: `## Design Constraints as Design Direction

A USSD menu gives you roughly 182 characters and a numeric keypad. There's no color, no imagery, no whitespace to lean on. Every word has to earn its place, and every flow has to be short enough to complete before a session times out.

That constraint turned out to be clarifying rather than limiting. It forced us to define the actual decision a farmer needs to make at each step — book, confirm, pay — and strip everything else away. Those same flows, once proven at their most constrained, translate cleanly into the richer mobile and web experiences built for service providers and Field Agents.
`,
    },
    {
      slug: "the-flywheel-products-services-talent",
      title: "The Flywheel: How Products, Services, and Talent Compound",
      category: "Strategy",
      readTime: "6 min read",
      excerpt:
        "MechLink isn't three separate businesses stapled together. Here's how building MechAfrica, delivering client work, and training engineers reinforce each other.",
      isFeatured: false,
      coverImageUrl: "/images/blog/blog-flywheel-products-services-talent.png",
      contentMd: `## Three Pillars, One Engine

MechLink operates on three pillars: Products we build and own, Services delivered under contract, and Talent developed through hands-on training. Treated separately, these would just be three lines of business. Treated as a system, they compound.

Building MechAfrica surfaces real, hard problems — offline-first sync, USSD session design, mobile money reconciliation at scale — that make our engineering team sharper across the board. That sharpened team is what we bring to client Services work. And Services work, in turn, funds and stress-tests the discipline we teach through our Talent program, whose best graduates go on to build on MechAfrica and client projects themselves.

None of the three pillars is the "real" business propping up hobbies on the side. Each one makes the other two better.
`,
    },
  ];

  for (const article of articles) {
    await prisma.blogPost.upsert({
      where: { slug: article.slug },
      update: {},
      create: article,
    });
  }

  // --- Career roles ---
  const roles = [
    {
      slug: "mobile-ussd-engineer",
      title: "Mobile & USSD Engineer",
      department: "Engineering",
      location: "Accra, Ghana (Hybrid)",
      type: "Full-time",
      descriptionMd: `You'll work on the coordination core that powers MechAfrica across USSD, mobile, and web — the systems that let a farmer with a feature phone book a tractor as reliably as a service provider managing a fleet from a smartphone.

### What you will do

- Build and harden USSD session flows designed for intermittent connectivity and low-end devices.
- Develop React Native experiences for Field Agents and service providers.
- Design backend services for real-time matching, scheduling, and mobile money settlement.
- Work directly with Field Agents to translate on-the-ground feedback into product decisions.
`,
    },
    {
      slug: "field-operations-lead",
      title: "Field Operations Lead — Farmer & Agent Network",
      department: "Operations",
      location: "Accra, Ghana (Hybrid)",
      type: "Full-time",
      descriptionMd: `You'll build and manage the Field Agent network that bridges MechAfrica's digital platform and the rural communities it serves — recruiting, training, and supporting the people who onboard farmers and service providers on the ground.

### What you will do

- Recruit, train, and support Field Agents across our launch districts in Ghana.
- Build localized trust with farmers and mechanization service providers.
- Feed on-the-ground insights back into product and engineering priorities.
- Own onboarding quality and retention metrics for the farmer and provider network.
`,
    },
    {
      slug: "talent-program-mentor",
      title: "Talent Program Mentor — Software Engineering",
      department: "Talent",
      location: "Remote / Accra",
      type: "Contract",
      descriptionMd: `You'll mentor cohorts in MechLink's hands-on Talent program, helping aspiring engineers build real skills against real product and client work — with the best graduates going on to build on MechAfrica and MechLink client projects.

### What you will do

- Mentor cohort participants through structured, project-based curriculum.
- Review code and provide feedback grounded in production engineering standards.
- Help design practical exercises drawn from real MechAfrica and client challenges.
- Identify standout graduates for MechLink Product and Services teams.
`,
    },
  ];

  for (const role of roles) {
    await prisma.careerRole.upsert({
      where: { slug: role.slug },
      update: {},
      create: role,
    });
  }

  // --- Products (MechAfrica is the first; more can be added later purely via admin) ---
  const mechafrica = await prisma.product.upsert({
    where: { slug: "mechafrica" },
    update: {},
    create: {
      slug: "mechafrica",
      name: "MechAfrica",
      tagline: "The product we build and own",
      description:
        "MechAfrica connects farmers with mechanization, crop care, and logistics providers through an offline-first, mobile and USSD-based platform — starting in Ghana, scaling pan-African.",
      url: "https://www.mechafrica.com/",
      logoUrl: null,
      status: "live",
      stats: [
        { label: "Farmers", value: "50,000+" },
        { label: "Providers", value: "1,000+" },
      ],
      order: 0,
    },
  });

  // --- MechAfrica feature cards ---
  const projects = [
    { title: "Farmer ↔ Provider Matching", tags: ["Mechanization", "Crop Care", "Logistics"], imageUrl: "/images/features/feature-farmer-provider-matching.png", order: 0 },
    { title: "Offline-First, USSD Access", tags: ["No Smartphone Required", "No Internet Required"], imageUrl: "/images/features/feature-offline-ussd-access.png", order: 1 },
    { title: "Field Agent Network", tags: ["Onboarding", "Localized Trust"], imageUrl: "/images/features/feature-field-agent-network.png", order: 2 },
    { title: "Mobile Money Payments", tags: ["Seamless Settlement", "Real-Time Visibility"], imageUrl: "/images/features/feature-mobile-money-payments.png", order: 3 },
  ];
  for (const project of projects) {
    const existing = await prisma.project.findFirst({ where: { title: project.title } });
    if (!existing) await prisma.project.create({ data: { ...project, productId: mechafrica.id } });
  }

  // --- Services ---
  const services = [
    { title: "Web App Development", desc: "Robust platforms deployed in weeks, not months. We remove the technical risk so you can go to market faster.", iconName: "Code2", order: 0 },
    { title: "UI/UX Design", desc: "Precision-engineered UI that prioritizes cognitive ease and strategic user flows. We design screens that remove doubt and make adoption effortless.", iconName: "Paintbrush", order: 1 },
    { title: "Cloud Infrastructure", desc: "Automated deployment pipelines that handle real-world constraints — intermittent connectivity, offline-first sync, and scale under pressure.", iconName: "Cloud", order: 2 },
    { title: "Data & AI Integration", desc: "Transform raw data into clear, actionable decisions. We build dashboards and AI-assisted tooling that remove guesswork.", iconName: "BarChart", order: 3 },
    { title: "SaaS Product Development", desc: "End-to-end product engineering from MVP to enterprise scale, built with the same discipline that powers MechAfrica.", iconName: "Layers", order: 4 },
    { title: "Mobile & USSD Development", desc: "Native, cross-platform, and USSD-based apps that meet users where they are — smartphone or feature phone.", iconName: "Smartphone", order: 5 },
  ];
  for (const service of services) {
    const existing = await prisma.service.findFirst({ where: { title: service.title } });
    if (!existing) await prisma.service.create({ data: service });
  }

  // --- Testimonials (pillar statements) ---
  const testimonials = [
    { quote: "MechAfrica connects farmers with mechanization, crop care, and logistics providers through an offline-first, mobile and USSD-based platform — no smartphone or internet required.", name: "MechAfrica", role: "Product", iconName: "Boxes", order: 0 },
    { quote: "Trained Field Agents bridge the digital divide, handling onboarding and building localized trust directly in rural communities — the human layer beneath the platform.", name: "Field Agent Network", role: "Product", iconName: "Boxes", order: 1 },
    { quote: "We design and deliver custom software solutions under contract — bringing the same engineering, AI, and product discipline behind MechAfrica to organizations that need technology built right.", name: "MechLink", role: "Services", iconName: "Wrench", order: 2 },
    { quote: "We train and mentor aspiring tech professionals through practical, cohort-based learning programs — with the best graduates building on real MechLink products and client projects.", name: "MechLink", role: "Talent", iconName: "GraduationCap", order: 3 },
  ];
  for (const testimonial of testimonials) {
    const existing = await prisma.testimonial.findFirst({ where: { quote: testimonial.quote } });
    if (!existing) await prisma.testimonial.create({ data: testimonial });
  }

  // --- FAQ ---
  const faqs = [
    { question: "What is MechAfrica, and how do farmers use it without a smartphone?", answer: "MechAfrica is our flagship product — an offline-first platform that connects farmers with mechanization, crop care, and logistics providers. Farmers can book services through USSD on any feature phone, with no internet connection required. Field Agents handle onboarding in person, and payments settle through mobile money.", order: 0 },
    { question: "What does MechLink actually do, beyond MechAfrica?", answer: "MechLink operates on three pillars: Products we build and own (like MechAfrica), Services delivered under contract for other businesses and organizations, and Talent — hands-on training for aspiring engineers. All three reinforce each other.", order: 1 },
    { question: "Do you take on custom software projects outside of MechAfrica?", answer: "Yes. Our Services pillar delivers custom software under contract, bringing the same engineering, AI, and product discipline behind MechAfrica to client work — web, mobile, cloud infrastructure, and data/AI integration.", order: 2 },
    { question: "How does the Talent program work?", answer: "We run practical, cohort-based training for aspiring tech professionals, mentored by our engineering team. Training is grounded in real product and client work, not toy exercises — and our strongest graduates go on to build on MechAfrica and MechLink client projects.", order: 3 },
    { question: "Where does MechAfrica currently operate, and what's next?", answer: "We're starting in Ghana, building the Field Agent network and provider base district by district. The long-term vision is a connected, multi-sided coordination platform serving the agricultural value chain across the continent.", order: 4 },
  ];
  for (const faq of faqs) {
    const existing = await prisma.faqItem.findFirst({ where: { question: faq.question } });
    if (!existing) await prisma.faqItem.create({ data: faq });
  }

  // --- Site settings (singleton) ---
  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      contactEmail: "hello@mechlink.africa",
      careersEmail: "careers@mechlink.africa",
      linkedinUrl: "https://linkedin.com/company/mechlink",
      twitterUrl: "https://twitter.com/mechlinkafrica",
    },
  });

  console.log("Seed complete.");
  if (generatedPassword) {
    console.log("─────────────────────────────────────────");
    console.log(`Admin login: ${adminEmail}`);
    console.log(`Admin password: ${generatedPassword}`);
    console.log("─────────────────────────────────────────");
  } else {
    console.log(`Admin user ${adminEmail} already exists — password unchanged.`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
