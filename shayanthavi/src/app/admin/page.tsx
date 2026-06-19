import Link from "next/link";

const sections = [
  { href: "/admin/hero", title: "Hero", description: "Name, tagline, profile image, CV" },
  { href: "/admin/about", title: "About", description: "Intro text and role cards" },
  { href: "/admin/skills", title: "Skills", description: "Technologies and tools" },
  { href: "/admin/experience", title: "Experience", description: "Work history and projects" },
  { href: "/admin/projects", title: "Projects", description: "Portfolio projects and screenshots" },
  { href: "/admin/contact", title: "Contact", description: "Email, phone, social links" },
  { href: "/admin/settings", title: "Settings", description: "Site title, navigation, footer" },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
      <p className="text-gray-600 mb-8">Manage your portfolio content from here.</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:border-teal hover:shadow-md transition-all"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-1">{section.title}</h2>
            <p className="text-sm text-gray-500">{section.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
