// app/admin/layout.tsx
"use client";
import { SessionProvider } from "next-auth/react";
import { AdminSidebar } from "@/components/admin-sidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SessionProvider>
            <div className="min-h-screen bg-gray-50">
                {/*<AdminSidebar />*/}
                {/* Main Content */}
                <main className="lg:ml-64 pt-16 lg:pt-0">
                    <div className="container mx-auto px-4 py-8">{children}</div>
                </main>
            </div>
        </SessionProvider>
    );
}
