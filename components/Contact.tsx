// components/Contact.tsx
"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send, Mail, MessageCircle, Clock, Heart, MapPin } from 'lucide-react';

interface ContactData {
    telegram: {
        username: string;
        url: string;
        description: string;
        isPrimary: boolean;
    };
    email: {
        address: string;
        description: string;
        isPrimary: boolean;
    };
    workHours: string;
    location: string;
    responseTime: string;
    features: string[];
    heading: {
        main: string;
        accent: string;
    };
    description: string;
    ctaTitle: string;
    ctaDescription: string;
    bottomBanner: {
        title: string;
        description: string;
    };
}

export default function Contact() {
    const [data, setData] = useState<ContactData | null>(null);

    useEffect(() => {
        fetch("/api/contacts")
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((err) => console.error("Failed to load contacts:", err));
    }, []);

    if (!data) {
        return <div className="py-24 text-center">Загрузка...</div>;
    }

    const handleTelegramClick = () => {
        window.open(data.telegram.url, '_blank');
    };

    const handleEmailClick = () => {
        window.location.href = `mailto:${data.email.address}`;
    };

    const contactMethods = [
        {
            icon: MessageCircle,
            title: "Telegram",
            value: data.telegram.username,
            description: data.telegram.description,
            action: handleTelegramClick,
            primary: data.telegram.isPrimary,
        },
        {
            icon: Mail,
            title: "Email",
            value: data.email.address,
            description: data.email.description,
            action: handleEmailClick,
            primary: data.email.isPrimary,
        },
    ];

    return (
        <section id="contact" className="py-24 lg:py-32 relative overflow-hidden blueprint-pattern">
            <div className="absolute top-20 right-10 w-64 h-64 border border-[#D4A574]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-10 w-80 h-80 border border-[#8B7355]/10 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16 lg:mb-20 max-w-3xl mx-auto">
                    <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#D4A574] to-transparent mx-auto mb-6" />
                    <h2 className="text-4xl lg:text-5xl font-light text-[#8B7355] mb-6 tracking-tight">
                        {data.heading.main}
                        <br />
                        <span className="italic text-[#D4A574]">{data.heading.accent}</span>
                    </h2>
                    <p className="text-lg text-[#8B7355]/60 font-light leading-relaxed">
                        {data.description}
                    </p>
                </div>

                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <h3 className="text-2xl font-light text-[#8B7355] mb-8">
                                Выберите удобный способ связи
                            </h3>

                            {contactMethods.map((method, idx) => {
                                const Icon = method.icon;
                                return (
                                    <Card
                                        key={idx}
                                        className="group bg-white hover:bg-[#F5F0E8] border border-[#8B7355]/10 hover:border-[#D4A574]/30 transition-all duration-500 hover:shadow-2xl hover:shadow-[#8B7355]/10 cursor-pointer overflow-hidden rounded-3xl"
                                        onClick={method.action}
                                    >
                                        <CardContent className="p-8 relative">
                                            <div className="flex items-start gap-6">
                                                <div className={`w-16 h-16 rounded-2xl ${
                                                    method.primary
                                                        ? 'bg-gradient-to-br from-[#D4A574] to-[#8B7355]'
                                                        : 'bg-[#8B7355]/10'
                                                } flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500`}>
                                                    <Icon className={`w-8 h-8 ${
                                                        method.primary ? 'text-white' : 'text-[#8B7355]'
                                                    }`} />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <h4 className="text-[#8B7355]/60 text-sm font-light tracking-wide uppercase">
                                                            {method.title}
                                                        </h4>
                                                        {method.primary && (
                                                            <span className="px-3 py-1 bg-[#D4A574]/10 text-[#D4A574] text-xs font-light rounded-full">
                                                                Рекомендуем
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-[#8B7355] font-light text-xl mb-2 group-hover:text-[#D4A574] transition-colors duration-300">
                                                        {method.value}
                                                    </p>
                                                    <p className="text-[#8B7355]/50 text-sm font-light">
                                                        {method.description}
                                                    </p>
                                                </div>
                                                <div className="text-[#8B7355]/30 group-hover:text-[#D4A574] group-hover:translate-x-2 transition-all duration-300">
                                                    <Send className="w-6 h-6" />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                                <Card className="bg-white border border-[#8B7355]/10 rounded-2xl">
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-[#8B7355]/5 flex items-center justify-center flex-shrink-0">
                                                <Clock className="w-6 h-6 text-[#D4A574]" />
                                            </div>
                                            <div>
                                                <p className="text-[#8B7355]/60 text-xs font-light uppercase tracking-wide mb-1">
                                                    Время работы
                                                </p>
                                                <p className="text-[#8B7355] font-light">
                                                    {data.workHours}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-white border border-[#8B7355]/10 rounded-2xl">
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-[#8B7355]/5 flex items-center justify-center flex-shrink-0">
                                                <MapPin className="w-6 h-6 text-[#D4A574]" />
                                            </div>
                                            <div>
                                                <p className="text-[#8B7355]/60 text-xs font-light uppercase tracking-wide mb-1">
                                                    Локация
                                                </p>
                                                <p className="text-[#8B7355] font-light">
                                                    {data.location}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        <Card className="bg-gradient-to-br from-[#8B7355] to-[#D4A574] border-0 rounded-3xl shadow-2xl shadow-[#8B7355]/20 overflow-hidden lg:sticky lg:top-24 h-fit">
                            <CardContent className="p-10 lg:p-12 relative">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />

                                <div className="relative z-10">
                                    <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-6">
                                        <Heart className="w-8 h-8 text-white" />
                                    </div>

                                    <h3 className="text-3xl font-light text-white mb-4 tracking-tight">
                                        {data.ctaTitle}
                                    </h3>

                                    <p className="text-white/80 font-light leading-relaxed mb-8">
                                        {data.ctaDescription}
                                    </p>

                                    <div className="space-y-4 mb-10">
                                        {data.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-start gap-3">
                                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mt-0.5">
                                                    <div className="w-2 h-2 rounded-full bg-white" />
                                                </div>
                                                <span className="text-white/90 font-light">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-4">
                                        <Button
                                            onClick={handleTelegramClick}
                                            size="lg"
                                            className="w-full bg-white hover:bg-white/90 text-[#8B7355] border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl h-14 text-base font-light"
                                        >
                                            <MessageCircle className="w-5 h-5 mr-2" />
                                            Написать в Telegram
                                        </Button>
                                    </div>

                                    <p className="text-white/60 text-sm text-center mt-6 font-light">
                                        {data.responseTime}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="mt-16 bg-white border border-[#8B7355]/10 rounded-3xl overflow-hidden">
                        <CardContent className="p-12 text-center">
                            <div className="max-w-2xl mx-auto">
                                <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#D4A574] to-transparent mx-auto mb-6" />
                                <h3 className="text-3xl font-light text-[#8B7355] mb-4">
                                    {data.bottomBanner.title}
                                </h3>
                                <p className="text-[#8B7355]/60 font-light leading-relaxed mb-8">
                                    {data.bottomBanner.description}
                                </p>
                                <div className="flex flex-wrap gap-4 justify-center">
                                    <Button
                                        onClick={handleTelegramClick}
                                        size="lg"
                                        className="px-10 py-6 bg-[#8B7355] hover:bg-[#D4A574] text-white rounded-full font-light tracking-wide transition-all duration-500 shadow-xl shadow-[#8B7355]/20"
                                    >
                                        <MessageCircle className="w-5 h-5 mr-2" />
                                        Telegram
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
