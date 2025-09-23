import { AlignJustifyIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";

import catalinaLogo from "@/assets/images/logo-catalina.png";
import sgaLogo from "@/assets/images/logo-sga.png";
import Button from "@/components/ui/button";
import { useMobileMenuContext } from "@/contexts/mobile-menu-context";
import { cn } from "@/lib/utils";

export default function Header() {
  const { isMobileMenuOpen, toggleMobileMenu } = useMobileMenuContext();
  const [scrollY, setScrollY] = useState(() => window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "transition-all duration-300 ease-out fixed top-0 left-0 z-50 w-full text-white",
        {
          "top-2.5 sm:top-5 px-2.5": scrollY > 100,
        }
      )}
    >
      <div
        className={cn(
          "transition-all duration-300 ease-out container flex items-center justify-between w-full mx-auto",
          scrollY > 100
            ? "bg-blue-900/70 shadow-md hover:shadow-lg hover:bg-blue-900/90 backdrop-blur-md py-3 px-6 sm:py-5 rounded-xl sm:rounded-3xl sm:px-10"
            : "py-10 px-5"
        )}
      >
        <a href="/#hero" className="flex items-center gap-4 sm:gap-6">
          <img
            src={sgaLogo}
            alt="SGA Logo"
            className="size-10 sm:size-14 shrink-0"
          />
          <div className="w-[1px] h-10 sm:h-14 bg-gray-50" />
          <img
            src={catalinaLogo}
            alt="Catalina Logo"
            className="size-10 sm:size-14 shrink-0"
          />
        </a>
        <div className="items-center justify-center flex-1 hidden gap-10 lg:flex">
          <a href="/#about-us">About Us</a>
          <a href="/#vision">Vision & Mission</a>
          <a href="/#division">Members</a>
          <a href="/#our-partnership">Partnership</a>
          <a href="/student-voice">Student Voice</a>
        </div>
        <Button
          variant="secondary"
          className="hidden bg-green-100 hover:bg-green-100/90 lg:block"
        >
          Contact Us
        </Button>
        <Button
          variant="secondary"
          className="relative overflow-hidden bg-green-100 size-10 hover:bg-green-100/90 shrink-0 lg:hidden"
          onClick={toggleMobileMenu}
        >
          <AlignJustifyIcon
            className={cn(
              "absolute inset-0 m-auto size-7 opacity-0 transition-all duration-300 ease-out -translate-x-10",
              {
                "opacity-100 translate-x-0": !isMobileMenuOpen,
              }
            )}
          />
          <XIcon
            className={cn(
              "absolute inset-0 m-auto size-7 opacity-0 transition-all duration-300 ease-out translate-x-10",
              {
                "opacity-100 translate-x-0": isMobileMenuOpen,
              }
            )}
          />
        </Button>
      </div>
    </header>
  );
}
