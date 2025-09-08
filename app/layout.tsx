// app/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./custom-utilities.css"; // <-- Добавьте эту строку

// Загружаем Viaoda Libre через next/font
const viaoda = localFont({
    src: [
        {
            path: "../public/fonts/ViaodaLibre-Regular.ttf",
            weight: "400",
            style: "normal",
        },
    ],
    variable: "--font-viaoda",
});

export const metadata: Metadata = {
    title: {
        default: 'Профессиональные чертежи на заказ | Дизайн-проекты интерьера',
        template: '%s | Профессиональные чертежи'
    },
    description: 'Профессиональные чертежи и дизайн-проекты интерьеров на заказ. Разработка рабочей документации в ArchiCAD, 3D-визуализация, авторский надзор.',
    keywords: [
        'чертежи на заказ',
        'дизайн интерьера',
        'ArchiCAD',
        'AutoCAD',
        '3D визуализация',
        'рабочая документация',
        'дизайн-проект',
        'технические чертежи',
        'профессиональные чертежи',
        'дизайнер-проектировщик'
    ],
    authors: [{
        name: 'Алевтина',
        url: 'https://ваш-сайт.ru'
    }],
    creator: 'Алевтина',
    publisher: 'Алевтина',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL('https://ваш-сайт.ru'),
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: 'Профессиональные чертежи на заказ | Дизайн-проекты интерьера',
        description: 'Профессиональные чертежи и дизайн-проекты интерьеров на заказ. Разработка рабочей документации в ArchiCAD, 3D-визуализация, авторский надзор.',
        url: 'https://ваш-сайт.ru',
        siteName: 'Профессиональные чертежи',
        locale: 'ru_RU',
        type: 'website',
        images: [
            {
                url: '/og-image.jpg', // Замените на путь к вашему OG изображению
                width: 1200,
                height: 630,
                alt: 'Профессиональные чертежи на заказ',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Профессиональные чертежи на заказ | Дизайн-проекты интерьера',
        description: 'Профессиональные чертежи и дизайн-проекты интерьеров на заказ. Разработка рабочей документации в ArchiCAD.',
        images: ['/og-image.jpg'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: 'ваш-google-verification-code', // Замените на ваш код верификации Google
        yandex: 'ваш-yandex-verification-code', // Замените на ваш код верификации Яндекс
    },
    other: {
        'yandex-verification': 'ваш-yandex-verification-code',
        'google-site-verification': 'ваш-google-verification-code',
    }


}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru" suppressHydrationWarning>
        <body className={`${viaoda.variable} font-viaoda`}>
        {children}
        </body>
        </html>
    );
}