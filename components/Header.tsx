// components/Header.tsx
"use client";
import { useState, useEffect } from "react";
import { Menu, X, Home, Briefcase, User, Mail, FileText } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Главная", href: "#hero", icon: Home },
    { name: "Портфолио", href: "#portfolio", icon: Briefcase },
    { name: "Услуги", href: "/voice", icon: FileText },
    { name: "Обо мне", href: "#about", icon: User },
    { name: "Контакты", href: "#contact", icon: Mail },
  ];

  return (
      <header
          className={`fixed top-0 w-full z-50 transition-all duration-300 ${
              isScrolled
                  ? "bg-white/95 backdrop-blur-md shadow-md border-b border-[#E2E8F0]"
                  : "bg-transparent"
          }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-20">

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2">
              {navItems.map((item, idx) => (
                  <a
                      key={idx}
                      href={item.href}
                      className="group px-6 py-3 text-[#64748B] hover:text-[#1E3A5F] text-sm font-medium tracking-wide transition-all duration-200 relative"
                  >
                    <span className="relative z-10">{item.name}</span>
                    <div className="absolute inset-0 bg-[#F1F5F9] rounded-md scale-0 group-hover:scale-100 transition-transform duration-200" />
                  </a>
              ))}
              <a
                  href="#contact"
                  className="ml-4 px-8 py-3 bg-[#1E3A5F] text-white rounded-md text-sm font-medium tracking-wide hover:bg-[#2E5A8B] transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Связаться
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-[#64748B] hover:text-[#1E3A5F] transition-colors"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
            <div className="lg:hidden bg-white border-t border-[#E2E8F0] animate-fade-in">
              <nav className="container mx-auto px-4 py-6 flex flex-col gap-3">
                {navItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                      <a
                          key={idx}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-[#64748B] hover:text-[#1E3A5F] hover:bg-[#F8FAFC] rounded-md transition-all duration-200"
                      >
                        <Icon size={18} />
                        <span className="font-medium">{item.name}</span>
                      </a>
                  );
                })}
                <a
                    href="#contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="mt-2 px-4 py-3 bg-[#1E3A5F] text-white text-center rounded-md hover:bg-[#2E5A8B] transition-all duration-200 font-medium"
                >
                  Связаться
                </a>
              </nav>
            </div>
        )}
      </header>
  );
}
