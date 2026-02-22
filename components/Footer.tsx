// components/Footer.tsx
import { Mail, MessageCircle, MapPin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="relative border-t border-[#E2E8F0] py-12 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* About */}
                    <div>
                        <h3 className="text-[#1E293B] font-semibold text-lg mb-4">Алевтина</h3>
                        <p className="text-[#64748B] text-sm leading-relaxed">
                            Профессиональный дизайнер-проектировщик. Разработка рабочей документации в ArchiCAD.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-[#1E293B] font-semibold text-lg mb-4">Навигация</h3>
                        <ul className="space-y-2">
                            {["Портфолио", "Услуги", "Обо мне", "Контакты"].map((item, idx) => (
                                <li key={idx}>
                                    <a
                                        href={`#${item.toLowerCase().replace(/\s/g, '-')}`}
                                        className="text-[#64748B] hover:text-[#1E3A5F] transition-colors text-sm"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-[#1E293B] font-semibold text-lg mb-4">Контакты</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2 text-[#64748B] text-sm">
                                <MessageCircle className="w-4 h-4 text-[#1E3A5F]" />
                                @Alya_Wolf29
                            </li>
                            <li className="flex items-center gap-2 text-[#64748B] text-sm">
                                <Mail className="w-4 h-4 text-[#1E3A5F]" />
                                alya_wolf2907@mail.ru
                            </li>
                            <li className="flex items-center gap-2 text-[#64748B] text-sm">
                                <MapPin className="w-4 h-4 text-[#1E3A5F]" />
                                Москва, Россия
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-[#E2E8F0] pt-8 text-center">
                    <p className="text-[#94A3B8] text-sm">
                        © {new Date().getFullYear()} Алевтина. Все права защищены.
                    </p>
                </div>
            </div>
        </footer>
    );
}
