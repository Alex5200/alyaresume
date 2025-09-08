// components/Services.tsx
import { DraftingCompass, Cog, CircuitBoard, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Services() {
    return (
        <section id="services" className="section bg-transparent">
            <div className="container mx-auto px-4">
                <h2 className="section-title text-center text-white mb-8 text-2xl mt-10">Мои услуги</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-center">

                    {/* Услуга 1: Архитектурные чертежи */}
                    <Card className="hover:shadow-md transition duration-300">
                        <CardHeader className="pb-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                                <DraftingCompass className="text-primary w-6 h-6" />
                            </div>
                            <CardTitle className="text-base text-2xl text-black">Архитектурные чертежи</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-black mb-3 text-sm">Разработка полного комплекта чертежей для строительства.</p>
                            <ul className="text-black space-y-1 text-sm">
                                <li className="flex items-start">
                                    <Check className="text-green-500 mt-0.5 mr-2 w-4 h-4 flex-shrink-0" />
                                    <span>Генеральный план</span>
                                </li>
                                <li className="flex items-start">
                                    <Check className="text-green-500 mt-0.5 mr-2 w-4 h-4 flex-shrink-0" />
                                    <span>Разрезы и фасады</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Услуга 2: Механические чертежи */}
                    <Card className="hover:shadow-md transition duration-300">
                        <CardHeader className="pb-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                                <Cog className="text-primary w-6 h-6" />
                            </div>
                            <CardTitle className="text-base text-2xl text-black">Механические чертежи</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-black mb-3 text-sm">Создание деталировочных и сборочных чертежей.</p>
                            <ul className="text-black space-y-1 text-sm">
                                <li className="flex items-start">
                                    <Check className="text-green-500 mt-0.5 mr-2 w-4 h-4 flex-shrink-0" />
                                    <span>Деталировка</span>
                                </li>
                                <li className="flex items-start">
                                    <Check className="text-green-500 mt-0.5 mr-2 w-4 h-4 flex-shrink-0" />
                                    <span>Сборочные чертежи</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/*/!* Услуга 3: Электротехнические схемы *!/*/}
                    {/*<Card className="hover:shadow-md transition duration-300">*/}
                    {/*    <CardHeader className="pb-3">*/}
                    {/*        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-2">*/}
                    {/*            <CircuitBoard className="text-primary w-6 h-6" />*/}
                    {/*        </div>*/}
                    {/*        <CardTitle className="text-base text-black">Электротехнические схемы</CardTitle>*/}
                    {/*    </CardHeader>*/}
                    {/*    <CardContent>*/}
                    {/*        <p className="text-black mb-3 text-sm">Разработка принципиальных и монтажных схем.</p>*/}
                    {/*        <ul className="text-black space-y-1 text-sm">*/}
                    {/*            <li className="flex items-start">*/}
                    {/*                <Check className="text-green-500 mt-0.5 mr-2 w-4 h-4 flex-shrink-0" />*/}
                    {/*                <span>Принципиальные схемы</span>*/}
                    {/*            </li>*/}
                    {/*            <li className="flex items-start">*/}
                    {/*                <Check className="text-green-500 mt-0.5 mr-2 w-4 h-4 flex-shrink-0" />*/}
                    {/*                <span>Монтажные схемы</span>*/}
                    {/*            </li>*/}
                    {/*        </ul>*/}
                    {/*    </CardContent>*/}
                    {/*</Card>*/}
                </div>
            </div>
        </section>
    );
}