"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/characters", label: "Characters" },
  { href: "/episodes", label: "Episode" },
  { href: "/locations", label: "Location" },
  { href: "/favorites", label: "Favorites" },
] as const;

function isNavActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

interface NavLinkProps {
  href: string;
  label: string;
  isActive: boolean;
}

function NavLink({ href, label, isActive }: NavLinkProps): React.ReactElement {
  return (
    <li>
      <Link
        href={href}
        className={
          isActive
            ? "border-b-2 border-[#0b5ed7] pb-0.5 text-[#0b5ed7]"
            : "text-[#212529]"
        }
        aria-current={isActive ? "page" : undefined}
      >
        {label}
      </Link>
    </li>
  );
}

export default function Navbar(): React.ReactElement {
  const pathname = usePathname();

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-bold">
          <span className="text-[#212529]">Rick & Morty </span>
          <span className="text-[#0b5ed7]">WiKi</span>
        </Link>
        <ul className="flex gap-8">
          {NAV_LINKS.map(({ href, label }) => (
            <NavLink
              key={href}
              href={href}
              label={label}
              isActive={isNavActive(pathname, href)}
            />
          ))}
        </ul>
      </div>
    </nav>
  );
}
