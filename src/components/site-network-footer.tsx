import Link from 'next/link';
import type { Locale } from '@/lib/types';

const SITE_NETWORK: { name: string; url: string; emoji: string; desc: Record<string, string> }[] = [
  { name: 'Juegos Gratis', url: 'https://gamehub-o2tf.vercel.app', emoji: '🎮', desc: { en: 'Free online games', es: 'Juegos gratis online', pt: 'Jogos grátis online' } },
  { name: 'Herramientas', url: 'https://herramientas-zigq.vercel.app', emoji: '🔧', desc: { en: 'Online tools', es: 'Herramientas online', pt: 'Ferramentas online' } },
  { name: 'Colores', url: 'https://colores-eight.vercel.app', emoji: '🎨', desc: { en: 'Color tools', es: 'Herramientas de color', pt: 'Ferramentas de cor' } },
  { name: 'Tecleo', url: 'https://tecleo.vercel.app', emoji: '⌨️', desc: { en: 'Typing test', es: 'Test de escritura', pt: 'Teste de digitação' } },
  { name: 'Crucigrama', url: 'https://crucigrama-kohl.vercel.app', emoji: '🧩', desc: { en: 'Daily crossword', es: 'Crucigrama diario', pt: 'Palavras cruzadas' } },
  { name: 'Palabras', url: 'https://palabras-n5am.vercel.app', emoji: '🔤', desc: { en: 'Word tools', es: 'Herramientas de palabras', pt: 'Ferramentas de palavras' } },
  { name: 'Sorteos', url: 'https://sorteos-jet.vercel.app', emoji: '🎲', desc: { en: 'Luck tools', es: 'Herramientas de suerte', pt: 'Ferramentas da sorte' } },
  { name: 'Rimas', url: 'https://rimas-lemon.vercel.app', emoji: '🎵', desc: { en: 'Rhyme finder', es: 'Buscador de rimas', pt: 'Buscador de rimas' } },
  { name: 'Ahorcado', url: 'https://ahorcado-xte9.vercel.app', emoji: '🎭', desc: { en: 'Hangman game', es: 'Juego del ahorcado', pt: 'Jogo da forca' } },
  { name: 'Bingo', url: 'https://bingo-alpha.vercel.app', emoji: '🎱', desc: { en: 'Bingo cards', es: 'Cartones de bingo', pt: 'Cartelas de bingo' } },
  { name: 'Horóscopo', url: 'https://horoscopo-two.vercel.app', emoji: '🔮', desc: { en: 'Daily horoscope', es: 'Horóscopo diario', pt: 'Horóscopo diário' } },
  { name: 'Caligrafía', url: 'https://caligraf-a.vercel.app', emoji: '✍️', desc: { en: 'Handwriting practice', es: 'Práctica de caligrafía', pt: 'Prática de caligrafia' } },
];

export function SiteNetworkFooter({ locale }: { locale: Locale }) {
  return (
    <footer className="mt-12 border-t border-border bg-card/50 py-10">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-6 text-center text-lg font-semibold text-foreground">
          🌐 {locale === 'es' ? 'Nuestra red de sitios' : locale === 'pt' ? 'Nossa rede de sites' : 'Our network of sites'}
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {SITE_NETWORK.map(site => (
            <a key={site.name} href={site.url} target="_blank" rel="noopener noreferrer"
              className="group flex items-start gap-2 rounded-xl border border-border bg-card p-3 transition-colors hover:border-primary/40 hover:bg-primary/5">
              <span className="text-xl">{site.emoji}</span>
              <span>
                <span className="block text-sm font-medium text-foreground group-hover:text-primary transition-colors">{site.name}</span>
                <span className="block text-xs text-muted-foreground">{site.desc[locale] ?? site.desc.en}</span>
              </span>
            </a>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
          <Link href={`/${locale}/about`} className="hover:text-foreground">About</Link>
          <Link href={`/${locale}/privacy`} className="hover:text-foreground">Privacy</Link>
          <Link href={`/${locale}/contact`} className="hover:text-foreground">Contact</Link>
          <span>© {new Date().getFullYear()} GameHub</span>
        </div>
      </div>
    </footer>
  );
}
