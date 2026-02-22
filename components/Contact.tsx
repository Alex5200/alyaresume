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
        return <div className="py-24 text-center text-[#64748B]">Загрузка...</div>;
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
        <section id="contact" className="py-24 lg:py-32 relative overflow-hidden bg-[#F8FAFC]">
            <div className="absolute top-20 right-10 w-64 h-64 border border-[#1E3A5F]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-10 w-80 h-80 border border-[#1E3A5F]/10 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16 lg:mb-20 max-w-3xl mx-auto">
                    <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#1E3A5F] to-transparent mx-auto mb-6" />
                    <h2 className="text-4xl lg:text-5xl font-semibold text-[#1E293B] mb-6 tracking-tight">
                        {data.heading.main}
                        <br />
                        <span className="text-[#1E3A5F]">{data.heading.accent}</span>
                    </h2>
                    <p className="text-lg text-[#64748B] font-normal leading-relaxed">
                        {data.description}
                    </p>
                </div>

                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <h3 className="text-2xl font-medium text-[#1E293B] mb-8">
                                Выберите удобный способ связи
                            </h3>

                            {contactMethods.map((method, idx) => {
                                const Icon = method.icon;
                                return (
                                    <Card
                                        key={idx}
                                        className="group bg-white hover:bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#1E3A5F]/30 transition-all duration-300 hover:shadow-lg cursor-pointer overflow-hidden rounded-xl"
                                        onClick={method.action}
                                    >
                                        <CardContent className="p-8 relative">
                                            <div className="flex items-start gap-6">
                                                <div className={`w-16 h-16 rounded-xl ${
                                                    method.primary
                                                        ? 'bg-[#1E3A5F]'
                                                        : 'bg-[#F1F5F9]'
                                                } flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                                                    <Icon className={`w-8 h-8 ${
                                                        method.primary ? 'text-white' : 'text-[#1E3A5F]'
                                                    }`} />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <h4 className="text-[#64748B] text-sm font-medium uppercase tracking-wide">
                                                            {method.title}
                                                        </h4>
                                                        {method.primary && (
                                                            <span className="px-3 py-1 bg-[#F1F5F9] text-[#1E3A5F] text-xs font-medium rounded-md">
                                                                Рекомендуем
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-[#1E293B] font-medium text-xl mb-2 group-hover:text-[#1E3A5F] transition-colors duration-300">
                                                        {method.value}
                                                    </p>
                                                    <p className="text-[#64748B] text-sm font-normal">
                                                        {method.description}
                                                    </p>
                                                </div>
                                                <div className="text-[#CBD5E1] group-hover:text-[#1E3A5F] group-hover:translate-x-2 transition-all duration-300">
                                                    <Send className="w-6 h-6" />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                                <Card className="bg-white border border-[#E2E8F0] rounded-xl">
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-lg bg-[#F1F5F9] flex items-center justify-center flex-shrink-0">
                                                <Clock className="w-6 h-6 text-[#1E3A5F]" />
                                            </div>
                                            <div>
                                                <p className="text-[#64748B] text-xs font-medium uppercase tracking-wide mb-1">
                                                    Время работы
                                                </p>
                                                <p className="text-[#1E293B] font-medium">
                                                    {data.workHours}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-white border border-[#E2E8F0] rounded-xl">
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-lg bg-[#F1F5F9] flex items-center justify-center flex-shrink-0">
                                                <MapPin className="w-6 h-6 text-[#1E3A5F]" />
                                            </div>
                                            <div>
                                                <p className="text-[#64748B] text-xs font-medium uppercase tracking-wide mb-1">
                                                    Локация
                                                </p>
                                                <p className="text-[#1E293B] font-medium">
                                                    {data.location}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        <Card className="bg-[#1E3A5F] border-0 rounded-xl shadow-lg lg:sticky lg:top-24 h-fit">
                            <CardContent className="p-10 lg:p-12 relative">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />

                                <div className="relative z-10">
                                    <div className="w-16 h-16 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-6">
                                        <Heart className="w-8 h-8 text-white" />
                                    </div>

                                    <h3 className="text-3xl font-semibold text-white mb-4 tracking-tight">
                                        {data.ctaTitle}
                                    </h3>

                                    <p className="text-white/80 font-normal leading-relaxed mb-8">
                                        {data.ctaDescription}
                                    </p>

                                    <div className="space-y-4 mb-10">
                                        {data.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-start gap-3">
                                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mt-0.5">
                                                    <div className="w-2 h-2 rounded-full bg-white" />
                                                </div>
                                                <span className="text-white/90 font-normal">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-4">
                                        <Button
                                            onClick={handleTelegramClick}
                                            size="lg"
                                            className="w-full bg-white hover:bg-white/90 text-[#1E3A5F] border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-lg h-14 text-base font-medium"
                                        >
                                            <MessageCircle className="w-5 h-5 mr-2" />
                                            Написать в Telegram
                                        </Button>
                                    </div>

                                    <p className="text-white/60 text-sm text-center mt-6 font-normal">
                                        {data.responseTime}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="mt-16 bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
                        <CardContent className="p-12 text-center">
                            <div className="max-w-2xl mx-auto">
                                <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#1E3A5F] to-transparent mx-auto mb-6" />
                                <h3 className="text-3xl font-semibold text-[#1E293B] mb-4">
                                    {data.bottomBanner.title}
                                </h3>
                                <p className="text-[#64748B] font-normal leading-relaxed mb-8">
                                    {data.bottomBanner.description}
                                </p>
                                <div className="flex flex-wrap gap-4 justify-center">
                                    <Button
                                        onClick={handleTelegramClick}
                                        size="lg"
                                        className="px-10 py-6 bg-[#1E3A5F] hover:bg-[#2E5A8B] text-white rounded-lg font-medium tracking-wide transition-all duration-300 shadow-lg"
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
