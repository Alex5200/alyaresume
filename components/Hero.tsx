// components/Hero.tsx
"use client";
import { Button } from "@/components/ui/button";
export default function Hero() {
    return (
        <section className="hero-gradient py-12">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-8 md:mb-0 max-w-prose">
                    <h2 className="text-2xl sm:text-3xl text-white mb-2">Профессиональные чертежи на заказ</h2>
                    <p className="text-sm sm:text-base text-white/90 mb-5">Точные, детализированные чертежи для строительства, производства и дизайна.</p>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <Button asChild className="text-base w-full sm:w-auto">
                            <a href="#portfolio">Посмотреть работы</a>
                        </Button>
                        <Button asChild variant="outline" className="border-white/60 text-black text-base hover:text-white hover:bg-white/10 w-full sm:w-auto">
                            <a href="#contact">Заказать чертеж</a>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}