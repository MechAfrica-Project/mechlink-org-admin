import { prisma } from "./prisma";

const fallback = {
  id: "singleton",
  contactEmail: "hello@mechlink.africa",
  careersEmail: "careers@mechlink.africa",
  linkedinUrl: "https://linkedin.com/company/mechlink",
  twitterUrl: "https://twitter.com/mechlinkafrica",
};

export async function getSiteSettings() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: "singleton" } });
  return settings ?? fallback;
}
