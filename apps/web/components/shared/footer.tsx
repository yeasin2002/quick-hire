import { Dribbble, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { Logo } from "./logo";

const aboutLinks = [
  "Companies",
  "Pricing",
  "Terms",
  "Advice",
  "Privacy Policy",
];
const resourceLinks = ["Help Docs", "Guide", "Updates", "Contact Us"];

const socialLinks = [
  { label: "Facebook", href: "#", Icon: Facebook },
  { label: "Instagram", href: "#", Icon: Instagram },
  { label: "Dribbble", href: "#", Icon: Dribbble },
  { label: "LinkedIn", href: "#", Icon: Linkedin },
  { label: "Twitter", href: "#", Icon: Twitter },
];

export function Footer() {
  return (
    <footer className="bg-[#202430] text-[#EFF2F8]">
      <div className="mx-auto w-full max-w-435 px-6 pb-12 pt-20 sm:px-10 lg:px-16 xl:px-24 xl:pb-14 xl:pt-24">
        <div className="grid gap-14 md:grid-cols-2 xl:grid-cols-[minmax(0,1.8fr)_minmax(0,0.8fr)_minmax(0,0.8fr)_minmax(0,1.35fr)] xl:gap-17.5">
          <div>
            <Logo className="text-white" />

            <p className="mt-9 max-w-132 text-[18px] leading-[1.55] text-[#C5CAD7]">
              Great platform for the job seeker that passionate about startups.
              Find your dream job easier.
            </p>
          </div>

          <nav aria-label="About" className="space-y-8">
            <h2 className="text-[20px] font-semibold tracking-[-0.01em] text-[#F6F7FB]">
              About
            </h2>
            <ul className="space-y-5 text-[18px] text-[#C5CAD7]">
              {aboutLinks.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="inline-flex touch-manipulation text-pretty transition-colors duration-200 hover:text-[#F6F7FB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4D4DED] motion-reduce:transition-none"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Resources" className="space-y-8">
            <h2 className="text-[20px] font-semibold tracking-[-0.01em] text-[#F6F7FB]">
              Resources
            </h2>
            <ul className="space-y-5 text-[18px] text-[#C5CAD7]">
              {resourceLinks.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="inline-flex touch-manipulation text-pretty transition-colors duration-200 hover:text-[#F6F7FB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4D4DED] motion-reduce:transition-none"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <section className="space-y-8">
            <h2 className="text-[20px] font-semibold tracking-[-0.01em] text-[#F6F7FB]">
              Get job notifications
            </h2>
            <p className="max-w-108 text-[18px] leading-[1.55] text-[#C5CAD7]">
              The latest job news, articles, sent to your inbox weekly.
            </p>

            <form
              className="flex w-full max-w-140 flex-col gap-3 sm:flex-row"
              action="#"
              method="post"
            >
              <label htmlFor="footer-email" className="sr-only">
                Email Address
              </label>
              <input
                id="footer-email"
                name="email"
                type="email"
                placeholder="Email Address"
                autoComplete="email"
                spellCheck={false}
                required
                className="h-18 min-w-0 flex-1 border border-[#CFD3DB] bg-[#E0E0E0] px-6 text-[18px] text-[#8B90A0] outline-none transition-colors duration-200 focus-visible:border-[#4D4DED] focus-visible:ring-2 focus-visible:ring-[#4D4DED] motion-reduce:transition-none"
              />
              <button
                type="submit"
                className="h-18 touch-manipulation bg-[#4D4DED] px-9 text-[18px] font-semibold text-[#F6F7FB] transition-colors duration-200 hover:bg-[#5E5EF5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9EA5FF] motion-reduce:transition-none"
              >
                Subscribe
              </button>
            </form>
          </section>
        </div>

        <div className="mt-20 border-t border-[#363E55] pt-10 sm:mt-24 sm:pt-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <p className="text-[16px] text-[#8A90A1]">
              2021 @ QuickHire. All rights reserved.
            </p>

            <ul className="flex items-center gap-4">
              {socialLinks.map(({ label, href, Icon }) => (
                <li key={label}>
                  <Link
                    href={href}
                    aria-label={label}
                    className="inline-flex size-12 touch-manipulation items-center justify-center rounded-full bg-[#363D50] text-[#F4F6FB] transition-colors duration-200 hover:bg-[#4D4DED] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4D4DED] motion-reduce:transition-none"
                  >
                    <Icon aria-hidden="true" size={18} strokeWidth={2} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
