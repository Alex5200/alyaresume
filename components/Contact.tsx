// components/Contact.tsx
"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Contact() {

    const handleTelegramClick = () => {
        window.open('https://t.me/Alya_Wolf29', '_blank');
    };

    return (
        <section id="contact" className="section bg-transparent">
            <div className="container mx-auto px-4">
                <h2 className="section-title text-center text-white mb-8">Свяжитесь со мной</h2>
                <div className="max-w-2xl mx-auto">
                    <Card className="overflow-hidden">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-black  text-xl">Контакты</CardTitle>
                        </CardHeader>
                        <CardContent>
                        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                            <div className="mb-4 md:mb-0">
                                <h3 className="font-semibold text-black mb-2  text-xl">Контактная информация</h3>
                                <div className="flex items-center mb-2">

                                    <span className="text-black text-xl">@Alya_Wolf29</span>
                                </div>
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mr-2 w-4 h-4">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                        <polyline points="22,6 12,13 2,6"></polyline>
                                    </svg>
                                    <span className="text-black text-xl">example@example.com</span>
                                </div>
                            </div>
                            <Button onClick={handleTelegramClick} className="inline-flex items-center  text-xl">

                                Написать в Telegram
                            </Button>
                        </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}