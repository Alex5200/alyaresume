// app/admin/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    FolderOpen,
    MessageCircle,
    GraduationCap,
    LayoutDashboard,
    FileText,
    Users,
    Settings,
    BarChart3,
    Eye,
    Edit,
    ArrowRight,
} from "lucide-react";

export default function AdminDashboard() {
    const quickActions = [
        {
            title: "Портфолио",
            description: "Управление проектами и PDF файлами",
            icon: FolderOpen,
            href: "/admin/portfolio",
            color: "bg-blue-500",
            stats: "12 проектов",
        },
        {
            title: "Контакты",
            description: "Редактирование контактной информации",
            icon: MessageCircle,
            href: "/admin/contacts",
            color: "bg-green-500",
            stats: "2 метода связи",
        },
        {
            title: "Образование",
            description: "Добавление образования и сертификатов",
            icon: GraduationCap,
            href: "/admin/education",
            color: "bg-purple-500",
            stats: "4 записи",
        },
    ];

    const recentActivity = [
        {
            action: "Обновлен проект",
            item: "Дизайн проект квартиры",
            time: "2 часа назад",
            icon: Edit,
        },
        {
            action: "Добавлен PDF",
            item: "Новый чертеж",
            time: "5 часов назад",
            icon: FileText,
        },
        {
            action: "Изменены контакты",
            item: "Telegram обновлен",
            time: "1 день назад",
            icon: MessageCircle,
        },
    ];

    const stats = [
        {
            title: "Всего проектов",
            value: "12",
            icon: FolderOpen,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
        },
        {
            title: "Активных",
            value: "10",
            icon: Eye,
            color: "text-green-600",
            bgColor: "bg-green-50",
        },
        {
            title: "Образование",
            value: "4",
            icon: GraduationCap,
            color: "text-purple-600",
            bgColor: "bg-purple-50",
        },
        {
            title: "Просмотры",
            value: "1.2K",
            icon: BarChart3,
            color: "text-orange-600",
            bgColor: "bg-orange-50",
        },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Панель управления
                </h1>
                <p className="text-gray-600">
                    Добро пожаловать в административную панель вашего сайта
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={idx} className="hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                                        <p className="text-3xl font-bold text-gray-800">
                                            {stat.value}
                                        </p>
                                    </div>
                                    <div
                                        className={`w-14 h-14 ${stat.bgColor} rounded-xl flex items-center justify-center`}
                                    >
                                        <Icon className={`w-7 h-7 ${stat.color}`} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Быстрые действия
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {quickActions.map((action, idx) => {
                        const Icon = action.icon;
                        return (
                            <Link key={idx} href={action.href}>
                                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full">
                                    <CardContent className="p-6">
                                        <div
                                            className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                                        >
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-[#8B7355] transition-colors">
                                            {action.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-4">
                                            {action.description}
                                        </p>
                                        <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {action.stats}
                      </span>
                                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#8B7355] group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BarChart3 className="w-5 h-5" />
                                Последняя активность
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentActivity.map((activity, idx) => {
                                    const Icon = activity.icon;
                                    return (
                                        <div
                                            key={idx}
                                            className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Icon className="w-5 h-5 text-gray-600" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-800">
                                                    {activity.action}
                                                </p>
                                                <p className="text-sm text-gray-600">{activity.item}</p>
                                            </div>
                                            <span className="text-sm text-gray-500 whitespace-nowrap">
                        {activity.time}
                      </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Links */}
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Settings className="w-5 h-5" />
                                Быстрые ссылки
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <Link href="/admin/portfolio/create">
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start"
                                        size="lg"
                                    >
                                        <FolderOpen className="w-4 h-4 mr-2" />
                                        Добавить проект
                                    </Button>
                                </Link>
                                <Link href="/admin/education">
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start"
                                        size="lg"
                                    >
                                        <GraduationCap className="w-4 h-4 mr-2" />
                                        Добавить образование
                                    </Button>
                                </Link>
                                <Link href="/">
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start"
                                        size="lg"
                                    >
                                        <Eye className="w-4 h-4 mr-2" />
                                        Посмотреть сайт
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
