// components/FAQ.tsx
import { HelpCircle, ChevronDown } from "lucide-react";

export default function FAQ() {
  const faqs = [
    {
      q: "Я делаю съемку на камеру, студию бронируете вы?",
      a: "Да, могу помочь с подбором студии и временем, но бронь оплачивается клиентом.",
    },
    {
      q: "Можно ли получить исходные файлы?",
      a: "По умолчанию вы получаете обработанные материалы. Исходники по договоренности.",
    },
    {
      q: "Как осуществляется оплата?",
      a: "50% предоплата для брони времени, оставшаяся часть — в день съемки.",
    },
  ];

  return (
    <section id="faq" className="section bg-transparent">
      <div className="container mx-auto px-4">
        <h2 className="section-title uppercase tracking-widest text-white mb-6">FAQ</h2>
        <div className="grid gap-2 max-w-2xl">
          {faqs.map((item, idx) => (
            <details key={idx} className="bg-white text-black border border-black/20 rounded-none p-3 group">
              <summary className="cursor-pointer select-none text-sm uppercase tracking-wide flex items-center justify-between">
                <span className="flex items-center">
                  <HelpCircle className="w-4 h-4 mr-2 text-black/60 group-hover:text-black/80 transition-colors" />
                  {item.q}
                </span>
                <ChevronDown className="w-4 h-4 text-black/40 group-hover:text-black/60 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 ml-6 text-sm text-black/80 border-l-2 border-black/10 pl-4">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
