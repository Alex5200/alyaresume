// components/About.tsx
"use client";
import Image from "next/image";
import { Briefcase, GraduationCap, CheckCircle, Award, Code } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function About() {
    const skills = [
        "ArchiCAD + BIMx",
        "AutoCAD",
        "3Ds Max + Corona",
        "Photoshop",
        "Procreate",
        "Ceramic 3D"
    ];

    const achievements = [
        "Разработка полного комплекта чертежей",
        "Создание 3D-моделей и визуализаций",
        "Взаимодействие с заказчиками и подрядчиками"
    ];

    return (
        <section id="about" className="py-20 lg:py-28 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_20%,rgba(34,197,94,0.08),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_80%,rgba(22,163,74,0.08),transparent_50%)]" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center mb-12 lg:mb-16">
                    <Badge className="mb-4 bg-gradient-to-r from-green-500/20 to-green-800/20 text-green-400 border border-green-500/30 px-4 py-1">
                        Обо мне
                    </Badge>
                    <h2 className="text-4xl lg:text-5xl  text-white mb-4 bg-gradient-to-r from-white via-green-100 to-green-200 bg-clip-text text-transparent tracking-wide">
                        Алевтина
                    </h2>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto">
                        Дизайнер-проектировщик с опытом разработки рабочей документации
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* Left Column - Photo & Quick Info */}
                    <div className="lg:col-span-1">
                        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 overflow-hidden sticky top-24">
                            <CardContent className="p-6">
                                {/* Photo */}
                                <div className="relative mb-6">
                                    <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-800 rounded-2xl blur-xl opacity-30" />
                                    <div className="relative w-full aspect-square rounded-2xl overflow-hidden border-2 border-white/10">
                                        <Image
                                            src="/profile.jpg"
                                            alt="Алевтина, дизайнер-проектировщик"
                                            fill
                                            className="object-cover"
                                            priority
                                        />
                                    </div>
                                </div>

                                {/* Quick Stats */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                                        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                            <Briefcase className="w-5 h-5 text-green-400" />
                                        </div>
                                        <div>
                                            <p className="text-white/50 text-xs">Опыт работы</p>
                                            <p className="text-white ">5+ лет</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                                        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                            <Award className="w-5 h-5 text-green-400" />
                                        </div>
                                        <div>
                                            <p className="text-white/50 text-xs">Проектов завершено</p>
                                            <p className="text-white ">100+</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                                        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                            <Code className="w-5 h-5 text-green-400" />
                                        </div>
                                        <div>
                                            <p className="text-white/50 text-xs">Основной инструмент</p>
                                            <p className="text-white ">ArchiCAD</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Introduction */}
                        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10">
                            <CardContent className="p-6 lg:p-8">
                                <p className="text-white/80 text-lg leading-relaxed">
                                    Здравствуйте! Меня зовут <span className="text-green-400 ">Алевтина</span>,
                                    являюсь действующим дизайнером-проектировщиком. Разрабатываю рабочую документацию
                                    в основном в <span className="text-green-400 ">ArchiCAD</span>, создаю
                                    комплексные проекты от концепции до реализации.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Experience */}
                        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10">
                            <CardContent className="p-6 lg:p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-800 flex items-center justify-center">
                                        <Briefcase className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-2xl  text-white tracking-wide">Опыт работы</h3>
                                </div>

                                <div className="relative pl-8 border-l-2 border-green-500/30">
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-green-500 ring-4 ring-slate-900"></div>

                                    <div className="pb-8">
                                        <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-green-500/30 transition-all duration-300">
                                            <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                                                <h4 className="text-white  text-lg">
                                                    Леруа Мерлен (Лемана ПРО)
                                                </h4>
                                                <Badge className="bg-green-500/20 text-green-400 border border-green-500/30">
                                                    6 месяцев
                                                </Badge>
                                            </div>

                                            <p className="text-white/70 text-sm mb-4">
                                                Специалист по ПОО • Отдел ванных комнат
                                            </p>
                                            <p className="text-white/60 text-sm mb-4">
                                                Чертежи, подбор и подсчет черновых и чистовых материалов
                                            </p>

                                            <div className="space-y-3">
                                                {achievements.map((achievement, idx) => (
                                                    <div key={idx} className="flex items-start gap-3 group">
                                                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5 group-hover:bg-green-500/30 transition-colors duration-200">
                                                            <div className="w-2 h-2 rounded-full bg-green-500" />
                                                        </div>
                                                        <span className="text-white/80 text-sm group-hover:text-white transition-colors duration-200">
                                                            {achievement}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Education */}
                        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10">
                            <CardContent className="p-6 lg:p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-800 flex items-center justify-center">
                                        <GraduationCap className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-2xl  text-white tracking-wide">Образование</h3>
                                </div>

                                <div className="relative pl-8 border-l-2 border-green-500/30">
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-green-500 ring-4 ring-slate-900"></div>

                                    <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-green-500/30 transition-all duration-300">
                                        <h4 className="text-white  text-lg mb-2">
                                            Колледж Архитектуры Дизайна и Реинжиниринга №26
                                        </h4>
                                        <p className="text-white/70 text-sm mb-1">Дизайн по отраслям</p>
                                        <Badge className="bg-green-500/20 text-green-400 border border-green-500/30 mt-2">
                                            2019-2023
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Skills */}
                        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10">
                            <CardContent className="p-6 lg:p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-800 flex items-center justify-center">
                                        <Code className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-2xl  text-white tracking-wide">Навыки</h3>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    {skills.map((skill, idx) => (
                                        <Badge
                                            key={idx}
                                            className="bg-gradient-to-r from-green-500/10 to-green-800/10 hover:from-green-500/20 hover:to-green-800/20 text-green-400 border border-green-500/30 hover:border-green-500/50 px-4 py-2 text-sm  transition-all duration-300 cursor-default"
                                        >
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
