// components/Services.tsx
"use client";
import { DraftingCompass, Cog, FileText, Ruler, Layers, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Service {
    id: number;
    title: string;
    description: string;
    icon: React.ElementType;
    features: string[];
    badge?: string;
}

export default function Services() {
    const services: Service[] = [
        {
            id: 1,
            title: "Архитектурные чертежи",
            description: "Разработка полного комплекта чертежей для строительства с детальной проработкой всех элементов",
            icon: DraftingCompass,
            features: [
                "Генеральный план участка",
                "Планы этажей",
                "Разрезы и фасады",
                "Узлы и детали",
            ],
        },
        {
            id: 2,
            title: "Механические чертежи",
            description: "Создание деталировочных и сборочных чертежей для производства с соблюдением всех стандартов",
            icon: Cog,
            features: [
                "Деталировочные чертежи",
                "Сборочные чертежи",
                "Спецификации",
                "3D визуализация",
            ],
        },
        {
            id: 3,
            title: "Дизайн-проекты",
            description: "Комплексные дизайн-проекты интерьеров с полной документацией для реализации",
            icon: Layers,
            features: [
                "Планировочные решения",
                "Развертки стен",
                "Чертежи мебели",
                "Ведомости материалов",
            ],
        },
    ];

    return (
        <section id="services" className="py-20 lg:py-28 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(34,197,94,0.08),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(22,163,74,0.08),transparent_50%)]" />
            {/* Decorative Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center mb-12 lg:mb-16">
                    <div className="inline-block">
                        <Badge className="mb-4 bg-gradient-to-r from-green-500/20 to-green-800/20 text-green-400 border border-green-500/30 px-4 py-1">
                            Услуги
                        </Badge>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white via-green-100 to-green-200 bg-clip-text text-transparent tracking-wide">
                        Мои услуги
                    </h2>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto">
                        Профессиональная разработка чертежей любой сложности с соблюдением всех стандартов
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <Card
                                key={service.id}
                                className="group relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 hover:border-green-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/20 hover:-translate-y-2"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Badge */}
                                {service.badge && (
                                    <Badge className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-green-800 text-white border-0 shadow-lg z-10">
                                        {service.badge}
                                    </Badge>
                                )}

                                {/* Icon Background Glow */}
                                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-green-500/20 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <CardHeader className="pb-4 relative">
                                    {/* Icon */}
                                    <div className="relative mb-4">
                                        <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-800 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                                        <div className="relative w-14 h-14 bg-gradient-to-br from-green-500 to-green-800 rounded-xl flex items-center justify-center">
                                            <Icon className="text-white w-7 h-7 group-hover:scale-110 transition-transform duration-300" />
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <CardTitle className="text-xl  text-white group-hover:text-green-400 transition-colors duration-300 tracking-wide mb-2">
                                        {service.title}
                                    </CardTitle>

                                    {/* Description */}
                                    <CardDescription className="text-white/70 text-sm leading-relaxed">
                                        {service.description}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="relative">
                                    {/* Features List */}
                                    <ul className="space-y-3 mb-6">
                                        {service.features.map((feature, idx) => (
                                            <li
                                                key={idx}
                                                className="flex items-start group/item"
                                            >
                                                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5 mr-3 group-hover/item:bg-green-500/30 transition-colors duration-200">
                                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                                </div>
                                                <span className="text-white/80 text-sm group-hover/item:text-white transition-colors duration-200">
                                                    {feature}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA Button */}
                                    {/*<Button*/}
                                    {/*    asChild*/}
                                    {/*    className="w-full bg-gradient-to-r from-green-500/10 to-green-800/10 hover:from-green-500/20 hover:to-green-800/20 text-green-400 border border-green-500/30 hover:border-green-500/50 transition-all duration-300"*/}
                                    {/*>*/}
                                    {/*    <a href="#contact" className="flex items-center justify-center gap-2">*/}
                                    {/*        <FileText className="w-4 h-4" />*/}
                                    {/*        <span>Заказать услугу</span>*/}
                                    {/*    </a>*/}
                                    {/*</Button>*/}
                                </CardContent>

                                {/* Decorative Corner */}
                                <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </Card>
                        );
                    })}
                </div>

                {/* Additional Info Section */}
                {/*<div className="mt-16 lg:mt-20">*/}
                {/*    <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border border-white/10 backdrop-blur-sm">*/}
                {/*        <CardContent className="p-8 lg:p-12">*/}
                {/*            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">*/}
                {/*                <div className="space-y-2">*/}
                {/*                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500/20 mb-3">*/}
                {/*                        <Ruler className="w-6 h-6 text-green-400" />*/}
                {/*                    </div>*/}
                {/*                    <h3 className="text-2xl font-bold text-white">5+ лет</h3>*/}
                {/*                    <p className="text-white/60 text-sm">Опыт работы</p>*/}
                {/*                </div>*/}
                {/*                <div className="space-y-2">*/}
                {/*                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500/20 mb-3">*/}
                {/*                        <Package className="w-6 h-6 text-green-400" />*/}
                {/*                    </div>*/}
                {/*                    <h3 className="text-2xl font-bold text-white">100+</h3>*/}
                {/*                    <p className="text-white/60 text-sm">Выполненных проектов</p>*/}
                {/*                </div>*/}
                {/*                <div className="space-y-2">*/}
                {/*                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500/20 mb-3">*/}
                {/*                        <Layers className="w-6 h-6 text-green-400" />*/}
                {/*                    </div>*/}
                {/*                    <h3 className="text-2xl font-bold text-white">24/7</h3>*/}
                {/*                    <p className="text-white/60 text-sm">Поддержка клиентов</p>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </CardContent>*/}
                {/*    </Card>*/}
                {/*</div>*/}

                {/* CTA Section */}
                {/*<div className="text-center mt-12 lg:mt-16">*/}
                {/*    <p className="text-white/60 mb-6 text-lg">*/}
                {/*        Не нашли нужную услугу? Свяжитесь со мной для индивидуального предложения*/}
                {/*    </p>*/}
                {/*    <Button*/}
                {/*        asChild*/}
                {/*        size="lg"*/}
                {/*        className="bg-gradient-to-r from-green-500 to-green-800 hover:from-green-400 hover:to-green-700 text-white border-0 shadow-2xl shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300 px-8 py-6 text-lg font-semibold"*/}
                {/*    >*/}
                {/*        <a href="#contact">Связаться со мной</a>*/}
                {/*    </Button>*/}
                {/*</div>*/}
            </div>
        </section>
    );
}
