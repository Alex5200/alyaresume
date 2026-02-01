// components/Hero.tsx
"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";

export default function Hero() {
    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden blueprint-pattern">
            {/* Фоновое изображение плана с эффектом */}
            <div className="absolute inset-0 opacity-5">
                <Image
                    src="/site-plans/background-plan.jpg"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Декоративные элементы */}
            <div className="absolute top-20 left-10 w-32 h-32 border border-[#D4A574]/20 rounded-full animate-float" />
            <div className="absolute bottom-20 right-10 w-40 h-40 border border-[#8B7355]/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />

            <div className="container mx-auto px-4 relative z-10 py-32">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Декоративная линия */}
                    <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#D4A574] to-transparent mx-auto mb-8" />

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-6 py-2 bg-[#F5F0E8] border border-[#D4A574]/30 rounded-full mb-8 shadow-sm animate-fade-in">
                        <Sparkles className="w-4 h-4 text-[#D4A574]" />
                        <span className="text-sm text-[#8B7355] font-light tracking-wide">
                            Архитектурный дизайн
                        </span>
                    </div>

                    {/* Main Title */}
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-[#8B7355] mb-6 tracking-tight leading-tight animate-fade-in-up">
                        Создаю пространства,
                        <br />
                        <span className="italic text-[#D4A574]">где живут мечты</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-[#8B7355]/70 mb-12 max-w-2xl mx-auto leading-relaxed font-light animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        Профессиональная разработка архитектурных чертежей и планов
                        с любовью к деталям и вниманием к вашим желаниям
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                        <Button
                            asChild
                            className="group px-10 py-6 bg-[#8B7355] hover:bg-[#D4A574] text-[#F5F0E8] rounded-full text-base font-light tracking-wide transition-all duration-500 shadow-xl shadow-[#8B7355]/20 hover:shadow-2xl hover:shadow-[#D4A574]/30 hover:-translate-y-1"
                        >
                            <a href="#portfolio" className="flex items-center gap-2">
                                Посмотреть работы
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </a>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            className="px-10 py-6 bg-transparent border-2 border-[#8B7355]/30 text-[#8B7355] hover:bg-[#8B7355]/5 hover:border-[#D4A574] rounded-full text-base font-light tracking-wide transition-all duration-500"
                        >
                            <a href="#contact">
                                Обсудить проект
                            </a>
                        </Button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.6s' }}>
                        {[
                            { value: "5+", label: "Лет опыта", suffix: "" },
                            { value: "100", label: "Проектов", suffix: "+" },
                            { value: "50", label: "Клиентов", suffix: "+" },
                            { value: "100", label: "Отзывов", suffix: "%" },
                        ].map((stat, idx) => (
                            <div key={idx} className="group">
                                <div className="relative">
                                    <div className="text-4xl md:text-5xl font-light text-[#D4A574] mb-2">
                                        {stat.value}
                                        <span className="text-[#8B7355]/50">{stat.suffix}</span>
                                    </div>
                                    <div className="text-sm text-[#8B7355]/60 font-light tracking-wider uppercase">
                                        {stat.label}
                                    </div>
                                    <div className="w-12 h-0.5 bg-gradient-to-r from-[#D4A574] to-transparent mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 rounded-full border-2 border-[#8B7355]/30 flex justify-center p-2">
                    <div className="w-1 h-3 bg-[#D4A574] rounded-full animate-pulse" />
                </div>
            </div>
        </section>
    );
}
