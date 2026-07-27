import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Package,
  Wrench,
  Quote,
  HelpCircle,
  Briefcase,
  Newspaper,
  Inbox,
  Settings,
  LogOut,
} from "lucide-react";
import { auth } from "@/auth";
import { Logo } from "@/components/ui/Logo";
import { signOutAction } from "./actions";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/products", label: "Products", icon: Package },
  { href: "/services", label: "Services", icon: Wrench },
  { href: "/testimonials", label: "Testimonials", icon: Quote },
  { href: "/faq", label: "FAQ", icon: HelpCircle },
  { href: "/careers", label: "Careers", icon: Briefcase },
  { href: "/blog", label: "Blog", icon: Newspaper },
  { href: "/team", label: "Team", icon: Users },
  { href: "/inbox", label: "Inbox", icon: Inbox },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default async function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <div className="min-h-screen flex bg-void">
      <aside className="w-64 shrink-0 border-r border-steel/30 flex flex-col p-6">
        <Link href="/" className="mb-10 block w-fit">
          <Logo textClassName="text-lg" />
        </Link>

        <nav className="flex flex-col gap-1 flex-grow">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-silver hover:text-cloud hover:bg-carbon transition-colors text-sm font-medium"
            >
              <item.icon className="w-4 h-4" strokeWidth={2} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-steel/30 pt-4 mt-4">
          <p className="text-xs text-silver/60 px-4 mb-2 truncate">{session?.user?.email}</p>
          <form action={signOutAction}>
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-silver hover:text-cloud hover:bg-carbon transition-colors text-sm font-medium cursor-pointer"
            >
              <LogOut className="w-4 h-4" strokeWidth={2} />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-grow p-10 overflow-x-hidden">{children}</main>
    </div>
  );
}
