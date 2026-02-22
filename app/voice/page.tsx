"use client";

import Header from "@/components/Header";
import { useState } from "react";
import {
    Ruler,
    PenTool,
    Box,
    Home,
    Calculator,
    Check,
    ArrowRight,
    FileBadge,
    Layers,
    Sparkles
} from "lucide-react";
import Link from "next/link";

export default function Voice() {
    const [squareMeters, setSquareMeters] = useState(50);
    const [includeDesign, setIncludeDesign] = useState(false);
    const [include3D, setInclude3D] = useState(false);

    const basePrice = 3000;
    const designPrice = 500;
    const visualization3DPrice = 1000;

    const totalPrice = squareMeters * (
        basePrice +
        (includeDesign ? designPrice : 0) +
        (include3D ? visualization3DPrice : 0)
    );

    const services = [
        {
            icon: Ruler,
            title: "Обмерный план",
            description: "Точные замеры помещения с фиксацией всех конструктивных элементов"
        },
        {
            icon: FileBadge,
            title: "Планировочное решение",
            description: "Оптимальная расстановка мебели и оборудования с учётом эргономики"
        },
        {
            icon: PenTool,
            title: "Рабочие чертежи",
            description: "Полный комплект: планы, развертки, узлы для строителей"
        },
        {
            icon: Layers,
            title: "Ведомости",
            description: "Спецификации отделочных материалов, сантехники, электрики"
        }
    ];

    const designOptions = [
        {
            icon: Sparkles,
            title: "Дизайн-проект",
            price: `${designPrice} ₽/м²`,
            features: [
                "Коллажи концепции",
                "Подбор материалов",
                "Цветовые решения",
                "Рекомендации по мебели"
            ]
        },
        {
            icon: Box,
            title: "3D Визуализация",
            price: `${visualization3DPrice} ₽/м²`,
            features: [
                "Фотореалистичные рендеры",
                "3D модель помещения",
                "Несколько ракурсов",
                "Виртуальный тур (опционально)"
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Header />

            {/* Hero Section */}
            <section className="pt-32 pb-16 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-semibold text-[#1E293B] mb-6 tracking-tight">
                            Проектировщик-чертежник
                        </h1>
                        <p className="text-lg md:text-xl text-[#64748B] max-w-2xl mx-auto font-normal leading-relaxed">
                            Разработка рабочей документации для ремонта и строительства.
                            Точные чертежи для вашего идеального пространства.
                        </p>
                    </div>

                    {/* Services Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                        {services.map((service, idx) => (
                            <div
                                key={idx}
                                className="group p-6 bg-white backdrop-blur-sm rounded-xl border border-[#E2E8F0] hover:border-[#1E3A5F]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="w-14 h-14 mb-4 rounded-lg bg-[#F1F5F9] flex items-center justify-center text-[#1E3A5F] group-hover:bg-[#1E3A5F] group-hover:text-white transition-all duration-300">
                                    <service.icon size={28} />
                                </div>
                                <h3 className="text-lg font-medium text-[#1E293B] mb-2">
                                    {service.title}
                                </h3>
                                <p className="text-sm text-[#64748B] font-normal leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Calculator Section */}
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Calculator */}
                        <div className="bg-white backdrop-blur-sm rounded-xl p-8 border border-[#E2E8F0] shadow-sm">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 rounded-lg bg-[#1E3A5F] flex items-center justify-center text-white">
                                    <Calculator size={24} />
                                </div>
                                <h2 className="text-2xl font-semibold text-[#1E293B]">
                                    Калькулятор стоимости
                                </h2>
                            </div>

                            {/* Square Meters Slider */}
                            <div className="mb-8">
                                <label className="flex justify-between items-center mb-4 text-[#1E293B]">
                                    <span className="font-normal">Площадь помещения</span>
                                    <span className="text-2xl font-semibold">{squareMeters} м²</span>
                                </label>
                                <input
                                    type="range"
                                    min="10"
                                    max="300"
                                    value={squareMeters}
                                    onChange={(e) => setSquareMeters(Number(e.target.value))}
                                    className="w-full h-2 bg-[#E2E8F0] rounded-full appearance-none cursor-pointer accent-[#1E3A5F]"
                                />
                                <div className="flex justify-between mt-2 text-xs text-[#94A3B8]">
                                    <span>10 м²</span>
                                    <span>300 м²</span>
                                </div>
                            </div>

                            {/* Options */}
                            <div className="space-y-4 mb-8">
                                <label className="flex items-center justify-between p-4 rounded-lg border border-[#E2E8F0] cursor-pointer hover:bg-[#F8FAFC] transition-all group">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${includeDesign ? 'bg-[#1E3A5F] text-white' : 'bg-[#F1F5F9] text-[#1E3A5F]'}`}>
                                            <Sparkles size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[#1E293B] font-medium">Дизайн-проект</p>
                                            <p className="text-sm text-[#64748B]">+{designPrice} ₽/м²</p>
                                        </div>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={includeDesign}
                                        onChange={(e) => setIncludeDesign(e.target.checked)}
                                        className="w-5 h-5 rounded border-[#E2E8F0] text-[#1E3A5F] focus:ring-[#1E3A5F]"
                                    />
                                </label>

                                <label className="flex items-center justify-between p-4 rounded-lg border border-[#E2E8F0] cursor-pointer hover:bg-[#F8FAFC] transition-all group">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${include3D ? 'bg-[#1E3A5F] text-white' : 'bg-[#F1F5F9] text-[#1E3A5F]'}`}>
                                            <Box size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[#1E293B] font-medium">3D Визуализация</p>
                                            <p className="text-sm text-[#64748B]">+{visualization3DPrice} ₽/м²</p>
                                        </div>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={include3D}
                                        onChange={(e) => setInclude3D(e.target.checked)}
                                        className="w-5 h-5 rounded border-[#E2E8F0] text-[#1E3A5F] focus:ring-[#1E3A5F]"
                                    />
                                </label>
                            </div>

                            {/* Total */}
                            <div className="pt-6 border-t border-[#E2E8F0]">
                                <div className="flex justify-between items-end mb-6">
                                    <span className="text-[#64748B] font-normal">Итоговая стоимость</span>
                                    <span className="text-4xl font-semibold text-[#1E293B]">
                    {totalPrice.toLocaleString("ru-RU")} <span className="text-2xl">₽</span>
                  </span>
                                </div>
                                <p className="text-xs text-[#94A3B8] mb-6">
                                    * Базовая стоимость: {basePrice} ₽/м². Точная цена после осмотра.
                                </p>
                                <Link
                                    href="/#contact"
                                    className="flex items-center justify-center gap-2 w-full py-4 bg-[#1E3A5F] text-white rounded-lg font-medium tracking-wide hover:bg-[#2E5A8B] transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    Обсудить проект
                                    <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>

                        {/* Design Options Info */}
                        <div className="space-y-6">
                            {designOptions.map((option, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white backdrop-blur-sm rounded-xl p-6 border border-[#E2E8F0] shadow-sm"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-lg bg-[#F1F5F9] flex items-center justify-center text-[#1E3A5F]">
                                                <option.icon size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-medium text-[#1E293B]">
                                                    {option.title}
                                                </h3>
                                                <p className="text-[#C9A227] font-medium">{option.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <ul className="space-y-2">
                                        {option.features.map((feature, fidx) => (
                                            <li key={fidx} className="flex items-center gap-2 text-[#64748B] text-sm">
                                                <Check size={14} className="text-[#1E3A5F]" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}

                            {/* CTA Card */}
                            <div className="bg-[#1E3A5F] rounded-xl p-6 text-white">
                                <div className="flex items-center gap-3 mb-4">
                                    <Home size={24} />
                                    <h3 className="text-lg font-medium">Комплексный проект</h3>
                                </div>
                                <p className="text-white/70 text-sm font-normal leading-relaxed mb-4">
                                    При заказе полного комплекта услуг — чертежи + дизайн + 3D —
                                    предоставляется скидка 10%
                                </p>
                                <p className="text-2xl font-semibold">
                                    от {(basePrice + designPrice + visualization3DPrice) * 0.9} ₽/м²
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}