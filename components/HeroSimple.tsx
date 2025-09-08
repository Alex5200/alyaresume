// components/HeroSimple.tsx
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function HeroSimple() {
  return (
    <section className="section bg-transparent">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <div className="order-2 md:order-1">
          {/*<h1 className="uppercase tracking-widest text-white mb-2 text-xl sm:text-2xl">Taplink / Портфолио</h1>*/}
          {/*<p className="text-white/90 text-sm sm:text-base mb-4 max-w-prose">*/}
          {/*  Проект для демонстрации работ: архитектурные и интерьерные решения, эскизы, рабочая документация.*/}
          {/*</p>*/}
          {/*<div className="grid grid-cols-1 sm:grid-cols-3 gap-2">*/}
          {/*  <Button asChild variant="outline" className="w-full">*/}
          {/*    <a href="#portfolio">Portfolio</a>*/}
          {/*  </Button>*/}
          {/*  <Button asChild variant="outline" className="w-full">*/}
          {/*    <a href="https://t.me/Alya_Wolf29" target="_blank">Telegram</a>*/}
          {/*  </Button>*/}
          {/*  <Button asChild variant="outline" className="w-full">*/}
          {/*    <a href="#contact">WhatsApp</a>*/}
          {/*  </Button>*/}
          {/*</div>*/}
        </div>
        <div className="order-1 md:order-2 flex justify-center">
          <div className="w-56 h-72 sm:w-64 sm:h-80 border border-black/20 bg-white overflow-hidden">
            <Image src="/profile.jpg" alt="Автор" width={320} height={400} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
