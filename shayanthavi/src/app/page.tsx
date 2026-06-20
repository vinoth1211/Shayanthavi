import { getPortfolioContent } from "@/lib/content";
import { Navbar } from "@/components/Navbar/Navbar";
import { Hero } from "@/components/Hero/Hero";
import { About } from "@/components/About/About";
import { Skills } from "@/components/Skills/Skills";
import { Experience } from "@/components/Experience/Experience";
import { Projects } from "@/components/Projects/Projects";
import { Contact } from "@/components/Contact/Contact";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { settings } = await getPortfolioContent();
    return {
      title: settings.siteTitle,
      description: settings.metaDescription,
    };
  } catch {
    return {
      title: "Shayanthavi Tharmananthan | Portfolio",
      description: "Portfolio of Shayanthavi Tharmananthan",
    };
  }
}

export default async function HomePage() {
  const content = await getPortfolioContent();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar navItems={content.settings.navItems} logoInitials={content.settings.logoInitials} />
      <Hero data={content.hero} />
      <About data={content.about} />
      <Skills data={content.skills} />
      <Experience data={content.experience} />
      <Projects data={content.projects} />
      <Contact
        data={content.contact}
        navItems={content.settings.navItems}
        footerCopyright={content.settings.footerCopyright}
      />
    </div>
  );
}
