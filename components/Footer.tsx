// components/Footer.tsx
import { Mail, MessageCircle, MapPin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="relative border-t border-white/10 py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* About */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">Алевтина</h3>
                        <p className="text-white/60 text-sm leading-relaxed">
                            Профессиональный дизайнер-проектировщик. Разработка рабочей документации в ArchiCAD.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">Навигация</h3>
                        <ul className="space-y-2">
                            {["Портфолио", "Услуги", "Обо мне", "Контакты"].map((item, idx) => (
                                <li key={idx}>
                                    <a
                                        href={`#${item.toLowerCase().replace(/\s/g, '-')}`}
                                        className="text-white/60 hover:text-green-400 transition-colors text-sm"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">Контакты</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2 text-white/60 text-sm">
                                <MessageCircle className="w-4 h-4 text-green-400" />
                                @Alya_Wolf29
                            </li>
                            <li className="flex items-center gap-2 text-white/60 text-sm">
                                <Mail className="w-4 h-4 text-green-400" />
                                example@example.com
                            </li>
                            <li className="flex items-center gap-2 text-white/60 text-sm">
                                <MapPin className="w-4 h-4 text-green-400" />
                                Москва, Россия
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-white/10 pt-8 text-center">
                    <p className="text-white/50 text-sm">
                        © {new Date().getFullYear()} Алевтина. Все права защищены.
                    </p>
                </div>
            </div>
        </footer>
    );
}
