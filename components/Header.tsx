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
import { Menu, Briefcase, User, Mail, FileText } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-sm ">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">

          <span className=" font-medium text-white text-2xl">Профессиональные чертежи</span>
        </div>

        <NavigationMenu className="hidden md:block">
          <NavigationMenuList className="gap-6">
            <NavigationMenuItem>
              <NavigationMenuLink href="#portfolio" className="text-white/90 hover:text-white text-2xl flex items-center gap-2">
              <FileText className="w-5 h-5" />
              <span>Портфолио</span>
            </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#services" className="text-white/90 hover:text-white text-2xl flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              <span>Услуги</span>
            </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#about" className="text-white/90 hover:text-white text-2xl flex items-center gap-2">
              <User className="w-5 h-5" />
              <span>Обо мне</span>
            </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#contact" className="text-white/90 hover:text-white text-2xl flex items-center gap-2">
              <Mail className="w-5 h-5" />
              <span>Контакты</span>
            </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden border-white/40 text-black hover:bg-white/10">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg">
            <SheetHeader>
              <SheetTitle className="text-black">Меню</SheetTitle>
            </SheetHeader>
            <nav className="mt-6 grid gap-3">
              <a href="#portfolio" className="text-foreground/90 hover:text-foreground flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>Портфолио</span>
              </a>
              <a href="#services" className="text-foreground/90 hover:text-foreground flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                <span>Услуги</span>
              </a>
              <a href="#about" className="text-foreground/90 hover:text-foreground flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Обо мне</span>
              </a>
              <a href="#contact" className="text-foreground/90 hover:text-foreground flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>Контакты</span>
              </a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}