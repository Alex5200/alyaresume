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
    { name: "Услуги", href: "#services", icon: FileText },
    { name: "Обо мне", href: "#about", icon: User },
    { name: "Контакты", href: "#contact", icon: Mail },
  ];

  return (
      <header
          className={`fixed top-0 w-full z-50 transition-all duration-500 ${
              isScrolled
                  ? "bg-[#F5F0E8]/95 backdrop-blur-md shadow-lg shadow-[#8B7355]/5"
                  : "bg-transparent"
          }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a
                href="#hero"
                className="text-2xl font-light text-[#8B7355] tracking-wider hover:text-[#D4A574] transition-colors duration-300"
            >
              Алевтина
              <span className="block text-xs text-[#8B7355]/60 font-normal tracking-widest mt-1">
                            АРХИТЕКТОР
                        </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2">
              {navItems.map((item, idx) => (
                  <a
                      key={idx}
                      href={item.href}
                      className="group px-6 py-3 text-[#8B7355]/80 hover:text-[#8B7355] text-sm font-light tracking-wide transition-all duration-300 relative"
                  >
                    <span className="relative z-10">{item.name}</span>
                    <div className="absolute inset-0 bg-[#D4A574]/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                  </a>
              ))}
              <a
                  href="#contact"
                  className="ml-4 px-8 py-3 bg-[#8B7355] text-[#F5F0E8] rounded-full text-sm font-light tracking-wide hover:bg-[#D4A574] transition-all duration-300 shadow-lg shadow-[#8B7355]/20 hover:shadow-xl hover:shadow-[#D4A574]/30 hover:-translate-y-0.5"
              >
                Связаться
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-[#8B7355] hover:text-[#D4A574] transition-colors"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
            <div className="lg:hidden bg-[#F5F0E8] border-t border-[#8B7355]/10 animate-fade-in">
              <nav className="container mx-auto px-4 py-6 flex flex-col gap-3">
                {navItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                      <a
                          key={idx}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-[#8B7355]/80 hover:text-[#8B7355] hover:bg-[#D4A574]/10 rounded-lg transition-all duration-300"
                      >
                        <Icon size={18} />
                        <span className="font-light">{item.name}</span>
                      </a>
                  );
                })}
                <a
                    href="#contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="mt-2 px-4 py-3 bg-[#8B7355] text-[#F5F0E8] text-center rounded-lg hover:bg-[#D4A574] transition-all duration-300"
                >
                  Связаться
                </a>
              </nav>
            </div>
        )}
      </header>
  );
}
