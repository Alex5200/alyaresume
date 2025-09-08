// components/ContactsList.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Instagram, Send, Phone } from "lucide-react";

export default function ContactsList() {
  return (
    <section id="contacts" className="section bg-transparent">
      <div className="container mx-auto px-4 max-w-md">
        <h2 className="section-title uppercase tracking-widest text-white mb-6">Contacts</h2>
        <div className="grid gap-2">
          <Button asChild variant="outline" className="w-full">
            <a href="https://instagram.com/" target="_blank" rel="noreferrer" className="flex items-center justify-center">
              <Instagram className="w-4 h-4 mr-2" />
              <span>Instagram</span>
            </a>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <a href="https://t.me/Alya_Wolf29" target="_blank" rel="noreferrer" className="flex items-center justify-center">
              <Send className="w-4 h-4 mr-2" />
              <span>Telegram</span>
            </a>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <a href="#contact" className="flex items-center justify-center">
              <Phone className="w-4 h-4 mr-2" />
              <span>WhatsApp</span>
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
