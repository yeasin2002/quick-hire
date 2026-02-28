import logo from "@/assets/logo.svg";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Find Jobs", href: "#" },
  { label: "Browse Companies", href: "#" },
];

export const Nav = () => {
  return (
    <header className="bg-black text-[#25324B]">
      <div className="mx-auto flex w-full max-w-435 items-center justify-between px-6 py-5 sm:px-10 lg:px-16 xl:px-24">
        <div className="flex items-center gap-8 lg:gap-16">
          <Link
            href="/"
            aria-label="QuickHire home"
            className="inline-flex shrink-0 touch-manipulation items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4D4DED]"
          >
            <Image src={logo} alt="QuickHire" priority className="h-9 w-auto" />
          </Link>

          <nav aria-label="Primary navigation" className="hidden md:block">
            <ul className="flex items-center gap-8 lg:gap-12">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[20px] font-semibold leading-none tracking-[-0.01em] transition-colors duration-200 hover:text-[#4D4DED] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4D4DED] motion-reduce:transition-none"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-[20px] font-semibold leading-none text-[#4D4DED] transition-colors duration-200 hover:text-[#6363F3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4D4DED] motion-reduce:transition-none"
          >
            Login
          </Link>

          <span aria-hidden="true" className="h-16 w-px bg-white/45" />

          <Link
            href="#"
            className="inline-flex h-17.5 touch-manipulation items-center bg-[#4D4DED] px-9 text-[20px] font-semibold leading-none text-[#F7F9FE] transition-colors duration-200 hover:bg-[#6262F4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7ABFF] motion-reduce:transition-none"
          >
            Sign Up
          </Link>
        </div>
      </div>

      <nav
        aria-label="Primary navigation mobile"
        className="border-t border-white/10 px-6 pb-4 pt-4 md:hidden sm:px-10"
      >
        <ul className="flex items-center gap-8 overflow-x-auto whitespace-nowrap">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-base font-semibold leading-none tracking-[-0.01em] transition-colors duration-200 hover:text-[#4D4DED] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4D4DED] motion-reduce:transition-none"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
