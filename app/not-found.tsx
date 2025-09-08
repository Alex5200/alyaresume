import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-9xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-4xl font-semibold text-gray-800 mb-6">Страница не найдена</h2>
        <p className="text-xl text-gray-600 mb-8">
          Похоже, что страница, которую вы ищете, не существует или была перемещена.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-black text-white hover:bg-gray-800">
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-5 h-5" />
              На главную
            </Link>
          </Button>
          <Button variant="outline" onClick={() => window.history.back()} className="flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            Назад
          </Button>
        </div>
      </div>
    </div>
  );
}
