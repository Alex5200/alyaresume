// components/Header.tsx
"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Briefcase, User, Mail, FileText, Ruler } from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "#portfolio", label: "Портфолио", icon: FileText },
  { href: "#services", label: "Услуги", icon: Briefcase },
  { href: "#about", label: "Обо мне", icon: User },
  { href: "#contact", label: "Контакты", icon: Mail },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-gradient-to-r from-green-900/80 via-green-800/50 to-green-900/80 border-b border-white/10 shadow-lg shadow-black/20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo with Icon */}
            <a
                href="#"
                className="group flex items-center gap-3 hover:opacity-90 transition-all duration-300"
                aria-label="На главную"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-800 rounded-lg blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-gradient-to-br from-green-500 to-green-800 p-2 rounded-lg">
                  <Ruler className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                </div>
              </div>
              <div className="flex flex-col ">
              <span className="text-white  text-lg lg:text-xl tracking-[0.04em] leading-tight">
                Профессиональные
              </span>
                <span className=" text-green-400 text-sm lg:text-base tracking-wide leading-tight">
                чертежи
              </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden md:block">
              <NavigationMenuList className="gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                      <NavigationMenuItem key={item.href}>
                        <NavigationMenuLink
                            href={item.href}
                            className="group relative text-white/90 hover:text-white px-4 py-2.5 rounded-lg transition-all duration-300 text-sm lg:text-base font-medium flex items-center gap-2 overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                          <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 rounded-lg transition-all duration-300" />
                          <Icon className="w-4 h-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                          <span className="relative z-10">{item.label}</span>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>

            {/* CTA Button Desktop */}
            <Button
                asChild
                className="hidden md:flex bg-gradient-to-r from-green-600 to-green-800 hover:from-green-500 hover:to-green-500 text-white border-0 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 text-lg transition-all duration-300 tracking-[0.04em] px-6"
            >
              <a href="#contact">Заказать проект</a>
            </Button>

            {/* Mobile Menu Button */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="md:hidden border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 hover:border-white/40 hover:text-white transition-all duration-300"
                    aria-label="Открыть меню"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                  side="right"
                  className="bg-gradient-to-b from-slate-900 to-slate-950 border-l border-white/10 w-[280px] sm:w-[320px]"
              >
                <SheetHeader>
                  <SheetTitle className="text-white text-left font-bold text-xl">Меню</SheetTitle>
                </SheetHeader>
                <nav className="mt-8 flex flex-col gap-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <a
                            key={item.href}
                            href={item.href}
                            onClick={handleNavClick}
                            className="group relative text-white/80 hover:text-white px-4 py-3.5 rounded-lg transition-all duration-300 flex items-center gap-3 text-base font-medium overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <Icon className="w-5 h-5 relative z-10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300" />
                          <span className="relative z-10">{item.label}</span>
                        </a>
                    );
                  })}

                  {/* CTA Button Mobile */}
                  <Button
                      asChild
                      className="mt-4 bg-gradient-to-r from-blue-600 to-green-800 hover:from-green-500 hover:to-purple-500 text-white border-0 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 font-semibold h-12"
                  >
                    <a href="#contact" onClick={handleNavClick}>Заказать проект</a>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
  );
}
