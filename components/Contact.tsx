// components/Contact.tsx
"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Send, Mail, MessageCircle, Phone, MapPin } from 'lucide-react';

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
            action: handleTelegramClick,
            primary: true,
            color: "from-blue-500 to-blue-700"
        },
        {
            icon: Mail,
            title: "Email",
            value: "example@example.com",
            action: handleEmailClick,
            primary: false,
            color: "from-green-500 to-green-800"
        },
    ];

    return (
        <section id="contact" className="py-20 lg:py-28 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_60%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center mb-12 lg:mb-16">
                    <Badge className="mb-4 bg-gradient-to-r from-green-500/20 to-green-800/20 text-green-400 border border-green-500/30 px-4 py-1">
                        Контакты
                    </Badge>
                    <h2 className="text-4xl lg:text-5xl  text-white mb-4 bg-gradient-to-r from-white via-green-100 to-green-200 bg-clip-text text-transparent tracking-wide">
                        Свяжитесь со мной
                    </h2>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto">
                        Готова ответить на ваши вопросы и обсудить ваш проект
                    </p>
                </div>

                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Contact Methods */}
                        <div className="space-y-6">
                            <h3 className="text-2xl  text-white mb-6 tracking-wide">
                                Способы связи
                            </h3>

                            {contactMethods.map((method, idx) => {
                                const Icon = method.icon;
                                return (
                                    <Card
                                        key={idx}
                                        className="group bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 hover:border-green-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/20 cursor-pointer overflow-hidden"
                                        onClick={method.action}
                                    >
                                        <CardContent className="p-6 relative">
                                            {/* Background Glow */}
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                            <div className="flex items-start gap-4 relative z-10">
                                                {/* Icon */}
                                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                                                    <Icon className="w-6 h-6 text-white" />
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1">
                                                    <h4 className="text-white/60 text-sm mb-1">
                                                        {method.title}
                                                    </h4>
                                                    <p className="text-white  text-lg group-hover:text-green-400 transition-colors duration-300">
                                                        {method.value}
                                                    </p>
                                                </div>

                                                {/* Arrow */}
                                                <div className="text-white/40 group-hover:text-green-400 group-hover:translate-x-1 transition-all duration-300">
                                                    <Send className="w-5 h-5" />
                                                </div>
                                            </div>


                                        </CardContent>
                                    </Card>
                                );
                            })}

                            {/* Additional Info Card */}
                            {/*<Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border border-white/10 backdrop-blur-sm">*/}
                            {/*    <CardContent className="p-6">*/}
                            {/*        <div className="flex items-start gap-3 mb-4">*/}
                            {/*            <Phone className="w-5 h-5 text-green-400 mt-0.5" />*/}
                            {/*            <div>*/}
                            {/*                <p className="text-white/60 text-sm mb-1">Время работы</p>*/}
                            {/*                <p className="text-white ">Пн-Пт: 9:00 - 18:00</p>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*        <div className="flex items-start gap-3">*/}
                            {/*            <MapPin className="w-5 h-5 text-green-400 mt-0.5" />*/}
                            {/*            <div>*/}
                            {/*                <p className="text-white/60 text-sm mb-1">Локация</p>*/}
                            {/*                <p className="text-white ">Москва, Россия</p>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </CardContent>*/}
                            {/*</Card>*/}
                        </div>

                        {/* Main CTA Card */}
                        {/*<Card className="bg-gradient-to-br from-green-500/10 via-slate-900 to-slate-800 border border-green-500/30 lg:sticky lg:top-24 h-fit">*/}
                        {/*    <CardHeader className="border-b border-white/10 pb-6">*/}
                        {/*        <CardTitle className="text-2xl  text-white tracking-wide">*/}
                        {/*            Начните свой проект*/}
                        {/*        </CardTitle>*/}
                        {/*    </CardHeader>*/}
                        {/*    <CardContent className="p-6 lg:p-8">*/}
                        {/*        <div className="space-y-6">*/}
                        {/*            /!* Feature List *!/*/}
                        {/*            <div className="space-y-4">*/}
                        {/*                {[*/}
                        {/*                    "Бесплатная консультация",*/}
                        {/*                    "Оценка проекта за 24 часа",*/}
                        {/*                    "Индивидуальный подход",*/}
                        {/*                    "Гарантия качества"*/}
                        {/*                ].map((feature, idx) => (*/}
                        {/*                    <div key={idx} className="flex items-start gap-3">*/}
                        {/*                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">*/}
                        {/*                            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />*/}
                        {/*                        </div>*/}
                        {/*                        <span className="text-white/80">{feature}</span>*/}
                        {/*                    </div>*/}
                        {/*                ))}*/}
                        {/*            </div>*/}

                        {/*            /!* Divider *!/*/}
                        {/*            <div className="border-t border-white/10" />*/}

                        {/*            /!* Main CTA Button *!/*/}
                        {/*            <Button*/}
                        {/*                onClick={handleTelegramClick}*/}
                        {/*                size="lg"*/}
                        {/*                className="w-full bg-gradient-to-r from-green-500 to-green-800 hover:from-green-400 hover:to-green-700 text-white border-0 shadow-2xl shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300 text-lg  h-14"*/}
                        {/*            >*/}
                        {/*                <MessageCircle className="w-5 h-5 mr-2" />*/}
                        {/*                Написать в Telegram*/}
                        {/*            </Button>*/}

                        {/*            /!* Secondary Button *!/*/}
                        {/*            <Button*/}
                        {/*                onClick={handleEmailClick}*/}
                        {/*                size="lg"*/}
                        {/*                variant="outline"*/}
                        {/*                className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/40 h-12"*/}
                        {/*            >*/}
                        {/*                <Mail className="w-5 h-5 mr-2" />*/}
                        {/*                Отправить Email*/}
                        {/*            </Button>*/}

                        {/*            /!* Info Text *!/*/}
                        {/*            <p className="text-white/50 text-sm text-center mt-4">*/}
                        {/*                Обычно отвечаю в течение 1-2 часов*/}
                        {/*            </p>*/}
                        {/*        </div>*/}
                        {/*    </CardContent>*/}
                        {/*</Card>*/}
                    </div>

                    {/* Bottom Banner */}
                    <Card className="mt-12 bg-gradient-to-r from-green-500/10 via-slate-900/50 to-green-800/10 border border-green-500/20 backdrop-blur-sm">
                        <CardContent className="p-8 text-center">
                            <h3 className="text-2xl font-bold text-white mb-3">
                                Готовы начать работу над проектом?
                            </h3>
                            <p className="text-white/70 mb-6 max-w-2xl mx-auto">
                                Свяжитесь со мной сегодня, и давайте обсудим, как я могу помочь воплотить ваши идеи в жизнь
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center">
                                <Button
                                    onClick={handleTelegramClick}
                                    size="lg"
                                    className="bg-gradient-to-r from-green-500 to-green-800 hover:from-green-400 hover:to-green-700 text-white border-0 shadow-lg shadow-green-500/30"
                                >
                                    <MessageCircle className="w-5 h-5 mr-2" />
                                    Telegram
                                </Button>
                                <Button
                                    onClick={handleEmailClick}
                                    size="lg"
                                    variant="outline"
                                    className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/40"
                                >
                                    <Mail className="w-5 h-5 mr-2" />
                                    Email
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
