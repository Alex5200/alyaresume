// components/About.tsx
import Image from "next/image";
import { Briefcase, GraduationCap, Medal, CheckCircle } from 'lucide-react';
export default function About() {

    return (
        <section id="about" className="section bg-transparent">
            <div className="container mx-auto px-4 ">
                <div className="flex flex-col md:flex-row items-center">

                    <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center">
                        <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-none overflow-hidden border-4 border-primary/20 shadow-md">
                            <Image
                                src="/profile.jpg"
                                alt="Алевтина, дизайнер-проектировщик"
                                width={200}
                                height={200}
                                className="w-full h-full object-cover"
                                priority
                            />
                        </div>
                    </div>
                    <div className="md:w-2/3 md:pl-8 mt-6 md:mt-10">
                        <h2 className="section-title text-white mb-4 text-xl sm:text-2xl">Обо мне</h2>
                        <p className="text-white mb-3 text-base sm:text-lg">
                            Здравствуйте! Меня зовут Алевтина, являюсь действующим дизайнером-проектировщиком. Разрабатываю рабочую документацию в основном в ArhiCAD.
                        </p>

                        {/* Опыт работы */}
                        <div className="mb-6">
                            <h3 className="section-title text-white mb-3 flex items-center">
                                <Briefcase className="text-white mr-2 w-5 h-5" />
                                Опыт работы
                            </h3>
                            <div className="space-y-4">

                                {/* Опыт 1 */}
                                <div className="relative pl-6 border-l-2 border-primary/30 pb-4 last:pb-0 last:border-l-0">
                                    <div className="absolute -left-2.5 top-0 w-4 h-4 rounded-full bg-primary"></div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h4 className="font-medium text-black mb-1">Леруа Мерлен (Лемана ПРО) отдел ванных комнат</h4>
                                        <p className="text-black text-sm mb-1">Специалист по поо(чертежи, подбор и подсчет черновых и чистовых материалов) - 6 месяцев</p>
                                        <ul className="text-black text-sm space-y-1 mt-2">
                                            <li className="flex items-start">
                                                <CheckCircle className="text-green-500 mt-0.5 mr-2 w-4 h-4 flex-shrink-0" />
                                                <span>Разработка полного комплекта чертежей</span>
                                            </li>
                                            <li className="flex items-start">
                                                <CheckCircle className="text-green-500 mt-0.5 mr-2 w-4 h-4 flex-shrink-0" />
                                                <span>Создание 3D-моделей и визуализаций</span>
                                            </li>
                                            <li className="flex items-start">
                                                <CheckCircle className="text-green-500 mt-0.5 mr-2 w-4 h-4 flex-shrink-0" />
                                                <span>Взаимодействие с заказчиками и подрядчиками</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Образование */}
                        <div className="mb-6">
                            <h3 className="text-xl  text-white mb-3 flex items-center">
                                <GraduationCap className=" text-white mr-2 w-5 h-5" />
                                Образование
                            </h3>
                            <div className="relative pl-6 border-l-2 border-primary/30">
                                <div className="absolute -left-2.5 top-0 w-4 h-4 rounded-full bg-primary"></div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-medium text-black mb-1">Колледж Архитектуры Дизайна и Реинжиниринга №26</h4>
                                    <p className="text-black text-sm">Дизайн по отраслям 2019-2023г</p>
                                </div>
                            </div>
                        </div>

                        {/* Навыки */}
                        <div className="flex flex-wrap gap-2 text-white text-lg p-6">
                            <span className="chip-primary">ArhiCAD+BIMx</span>
                            <span className="chip-primary">AutoCAD</span>
                            <span className="chip-primary">3DsMax + Corona</span>
                            <span className="chip-primary">Photoshop</span>
                            <span className="chip-primary">Procreat</span>
                            <span className="chip-primary">Ceramic 3D</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}