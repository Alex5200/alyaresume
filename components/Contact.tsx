// components/Contact.tsx
"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send, Mail, MessageCircle, Phone, MapPin, Clock, Heart } from 'lucide-react';

export default function Contact() {
    const handleTelegramClick = () => {
        window.open('https://t.me/Alya_Wolf29', '_blank');
    };

    const handleEmailClick = () => {
        window.location.href = 'mailto:example@example.com';
    };

    const contactMethods = [
        {
            icon: MessageCircle,
            title: "Telegram",
            value: "@Alya_Wolf29",
            description: "Быстрый ответ в течение часа",
            action: handleTelegramClick,
            primary: true,
        },
        {
            icon: Mail,
            title: "Email",
            value: "example@example.com",
            description: "Для официальных запросов",
            action: handleEmailClick,
            primary: false,
        },
    ];

    return (
        <section id="contact" className="py-24 lg:py-32 relative overflow-hidden blueprint-pattern">
            {/* Декоративные элементы */}
            <div className="absolute top-20 right-10 w-64 h-64 border border-[#D4A574]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-10 w-80 h-80 border border-[#8B7355]/10 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center mb-16 lg:mb-20 max-w-3xl mx-auto">
                    <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#D4A574] to-transparent mx-auto mb-6" />

                    <h2 className="text-4xl lg:text-5xl font-light text-[#8B7355] mb-6 tracking-tight">
                        Давайте создадим
                        <br />
                        <span className="italic text-[#D4A574]">что-то прекрасное вместе</span>
                    </h2>

                    <p className="text-lg text-[#8B7355]/60 font-light leading-relaxed">
                        Расскажите о своем проекте, и я помогу воплотить ваши идеи в жизнь
                    </p>
                </div>

                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Left Column - Contact Methods */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-light text-[#8B7355] mb-8">
                                Выберите удобный способ связи
                            </h3>

                            {/* Contact Cards */}
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
                                                {/* Icon */}
                                                <div className={`w-16 h-16 rounded-2xl ${
                                                    method.primary
                                                        ? 'bg-gradient-to-br from-[#D4A574] to-[#8B7355]'
                                                        : 'bg-[#8B7355]/10'
                                                } flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500`}>
                                                    <Icon className={`w-8 h-8 ${
                                                        method.primary ? 'text-white' : 'text-[#8B7355]'
                                                    }`} />
                                                </div>

                                                {/* Content */}
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

                                                {/* Arrow */}
                                                <div className="text-[#8B7355]/30 group-hover:text-[#D4A574] group-hover:translate-x-2 transition-all duration-300">
                                                    <Send className="w-6 h-6" />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}

                            {/* Info Cards */}
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
                                                    Пн-Пт: 9:00 - 18:00
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
                                                    Москва, Россия
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        {/* Right Column - Main CTA */}
                        <Card className="bg-gradient-to-br from-[#8B7355] to-[#D4A574] border-0 rounded-3xl shadow-2xl shadow-[#8B7355]/20 overflow-hidden lg:sticky lg:top-24 h-fit">
                            <CardContent className="p-10 lg:p-12 relative">
                                {/* Decorative circles */}
                                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />

                                <div className="relative z-10">
                                    <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-6">
                                        <Heart className="w-8 h-8 text-white" />
                                    </div>

                                    <h3 className="text-3xl font-light text-white mb-4 tracking-tight">
                                        Начните свой проект
                                    </h3>

                                    <p className="text-white/80 font-light leading-relaxed mb-8">
                                        Каждый проект уникален, и я готова уделить вам максимум внимания
                                    </p>

                                    {/* Feature List */}
                                    <div className="space-y-4 mb-10">
                                        {[
                                            "Бесплатная консультация",
                                            "Оценка проекта за 24 часа",
                                            "Индивидуальный подход",
                                            "Гарантия качества"
                                        ].map((feature, idx) => (
                                            <div key={idx} className="flex items-start gap-3">
                                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mt-0.5">
                                                    <div className="w-2 h-2 rounded-full bg-white" />
                                                </div>
                                                <span className="text-white/90 font-light">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* CTA Buttons */}
                                    <div className="space-y-4">
                                        <Button
                                            onClick={handleTelegramClick}
                                            size="lg"
                                            className="w-full bg-white hover:bg-white/90 text-[#8B7355] border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl h-14 text-base font-light"
                                        >
                                            <MessageCircle className="w-5 h-5 mr-2" />
                                            Написать в Telegram
                                        </Button>

                                        <Button
                                            onClick={handleEmailClick}
                                            size="lg"
                                            variant="outline"
                                            className="w-full bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 hover:border-white/50 rounded-2xl h-14 text-base font-light"
                                        >
                                            <Mail className="w-5 h-5 mr-2" />
                                            Отправить Email
                                        </Button>
                                    </div>

                                    {/* Info Text */}
                                    <p className="text-white/60 text-sm text-center mt-6 font-light">
                                        Обычно отвечаю в течение 1-2 часов
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Bottom Banner */}
                    <Card className="mt-16 bg-white border border-[#8B7355]/10 rounded-3xl overflow-hidden">
                        <CardContent className="p-12 text-center">
                            <div className="max-w-2xl mx-auto">
                                <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#D4A574] to-transparent mx-auto mb-6" />

                                <h3 className="text-3xl font-light text-[#8B7355] mb-4">
                                    Готовы начать работу над проектом?
                                </h3>

                                <p className="text-[#8B7355]/60 font-light leading-relaxed mb-8">
                                    Свяжитесь со мной сегодня, и давайте обсудим, как я могу помочь воплотить ваши идеи в жизнь
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
                                    <Button
                                        onClick={handleEmailClick}
                                        size="lg"
                                        variant="outline"
                                        className="px-10 py-6 border-2 border-[#8B7355]/30 text-[#8B7355] hover:bg-[#8B7355]/5 hover:border-[#D4A574] rounded-full font-light tracking-wide transition-all duration-500"
                                    >
                                        <Mail className="w-5 h-5 mr-2" />
                                        Email
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
