import type { Metadata } from 'next';
import { Mail, MessageSquare } from 'lucide-react';
import { isValidLocale } from '@/lib/i18n';
import type { Locale } from '@/lib/types';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return { title: 'Contacto' };
}

const CONTACT: Record<string, { title: string; intro: string }> = {
  en: { title: 'Contact Us', intro: 'Have a question, suggestion, or feedback? We\'d love to hear from you!' },
  es: { title: 'Contacto', intro: '¿Tienes una pregunta, sugerencia o comentario? ¡Nos encantaría saber de ti!' },
  pt: { title: 'Contato', intro: 'Tem uma pergunta, sugestão ou feedback? Adoraríamos ouvir você!' },
};

const EMAIL = 'contact@herramientasgratis.online';

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return null;
  const c = CONTACT[locale] || CONTACT.en;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-8 text-center">
        <Mail className="mx-auto mb-4 h-12 w-12 text-primary" />
        <h1 className="mb-2 text-3xl font-bold text-foreground">{c.title}</h1>
        <p className="text-muted-foreground">{c.intro}</p>
      </div>
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-3 rounded-lg bg-secondary/50 p-4">
          <MessageSquare className="h-6 w-6 text-primary" />
          <div>
            <p className="text-sm font-medium text-foreground">Email</p>
            <a href={`mailto:${EMAIL}`} className="text-sm text-primary hover:underline">{EMAIL}</a>
          </div>
        </div>
      </div>
    </div>
  );
}
