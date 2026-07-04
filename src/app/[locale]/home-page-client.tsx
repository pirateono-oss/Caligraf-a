'use client';
import { useState, useRef, useCallback } from 'react';
import type { Locale, TranslationDict } from '@/lib/types';
import { locales, localeNames } from '@/lib/i18n';
import Link from 'next/link';
import { Globe, Printer, Type, Ruler, PenLine } from 'lucide-react';

type LetterSize = 'small' | 'medium' | 'large';
type HandStyle = 'print' | 'cursive';
type LineStyle = 'solid' | 'dashed' | 'double';

interface Props { locale: Locale; dict: TranslationDict; }

function getLetterSize(size: LetterSize): number {
  const map = { small: 14, medium: 20, large: 28 };
  return map[size];
}

function getLineHeight(size: LetterSize): number {
  const map = { small: 32, medium: 44, large: 60 };
  return map[size];
}

function getRowHeight(size: LetterSize): number {
  const map = { small: 52, medium: 70, large: 96 };
  return map[size];
}

function getRowGap(size: LetterSize): number {
  const map = { small: 12, medium: 16, large: 24 };
  return map[size];
}

function HandwritingLines({
  text,
  letterSize,
  handStyle,
  lineStyle,
}: {
  text: string;
  letterSize: LetterSize;
  handStyle: HandStyle;
  lineStyle: LineStyle;
}) {
  const fontSize = getLetterSize(letterSize);
  const lineH = getLineHeight(letterSize);
  const rowH = getRowHeight(letterSize);
  const rowGap = getRowGap(letterSize);
  const dashedTop = fontSize * 0.55;

  // Split text into lines that fit the page width (roughly 50-70 chars per row)
  const words = text.trim().split(/\s+/);
  const charsPerLine = letterSize === 'small' ? 65 : letterSize === 'medium' ? 45 : 32;
  const lines: string[] = [];
  let currentLine = '';
  for (const word of words) {
    if ((currentLine + ' ' + word).length > charsPerLine && currentLine.length > 0) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = currentLine ? currentLine + ' ' + word : word;
    }
  }
  if (currentLine) lines.push(currentLine);
  if (lines.length === 0) lines.push('');

  const getBorderStyle = (isBottom: boolean, isDashed: boolean) => {
    if (isDashed) return '2px dashed #94a3b8';
    if (isBottom && lineStyle === 'double') return '1px solid #ef4444';
    return '2px solid #3b82f6';
  };

  return (
    <div className="handwriting-worksheet" style={{ fontFamily: handStyle === 'cursive' ? "'Segoe Script', 'Comic Sans MS', cursive" : "'Segoe UI', 'Arial', sans-serif" }}>
      {lines.map((lineText, lineIdx) => (
        <div key={lineIdx} style={{ marginBottom: `${rowGap}px` }}>
          {/* Tracing row - shows the text once for tracing */}
          <div
            style={{
              height: `${rowH}px`,
              position: 'relative',
              borderBottom: lineStyle === 'dashed' || lineStyle === 'double' ? getBorderStyle(true, false) : '2px solid #3b82f6',
              marginBottom: '1px',
            }}
          >
            {/* Middle dashed line (x-height guide) */}
            <div
              style={{
                position: 'absolute',
                top: `${dashedTop + 4}px`,
                left: 0,
                right: 0,
                borderTop: lineStyle === 'dashed' ? '1.5px dashed #94a3b8' : lineStyle === 'double' ? '1.5px dashed #94a3b8' : 'none',
                pointerEvents: 'none',
              }}
            />
            {/* Bottom red line for double-line style */}
            {lineStyle === 'double' && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '-1px',
                  left: 0,
                  right: 0,
                  borderTop: '1.5px solid #ef4444',
                  pointerEvents: 'none',
                }}
              />
            )}
            {/* Tracing text */}
            <div
              style={{
                position: 'absolute',
                bottom: '4px',
                left: '12px',
                fontSize: `${fontSize}px`,
                lineHeight: `${lineH}px`,
                color: '#94a3b8',
                letterSpacing: '2px',
                userSelect: 'none',
                fontWeight: 400,
              }}
            >
              {lineText || '\u00A0'}
            </div>
          </div>
          {/* Practice row - blank lines for the student to write */}
          <div
            style={{
              height: `${rowH}px`,
              position: 'relative',
              borderBottom: lineStyle === 'dashed' || lineStyle === 'double' ? getBorderStyle(true, false) : '2px solid #3b82f6',
            }}
          >
            {/* Middle dashed line */}
            <div
              style={{
                position: 'absolute',
                top: `${dashedTop + 4}px`,
                left: 0,
                right: 0,
                borderTop: lineStyle === 'dashed' ? '1.5px dashed #94a3b8' : lineStyle === 'double' ? '1.5px dashed #94a3b8' : 'none',
                pointerEvents: 'none',
              }}
            />
            {/* Bottom red line for double-line style */}
            {lineStyle === 'double' && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '-1px',
                  left: 0,
                  right: 0,
                  borderTop: '1.5px solid #ef4444',
                  pointerEvents: 'none',
                }}
              />
            )}
            {/* Faint copy text */}
            <div
              style={{
                position: 'absolute',
                bottom: '4px',
                left: '12px',
                fontSize: `${fontSize}px`,
                lineHeight: `${lineH}px`,
                color: '#e2e8f0',
                letterSpacing: '6px',
                userSelect: 'none',
                fontWeight: 400,
              }}
            >
              {lineText || '\u00A0'}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function HomePageClient({ locale, dict }: Props) {
  const [text, setText] = useState('El gato juega con la lana');
  const [letterSize, setLetterSize] = useState<LetterSize>('medium');
  const [handStyle, setHandStyle] = useState<HandStyle>('print');
  const [lineStyle, setLineStyle] = useState<LineStyle>('double');
  const [langOpen, setLangOpen] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);
  const c = dict.caligrafia;

  const quickButtons = [
    { label: c.alphabet, value: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' },
    { label: c.numbers, value: '1 2 3 4 5 6 7 8 9 10' },
    { label: c.myName, value: '' },
    { label: c.vowels, value: 'a e i o u' },
    { label: c.aeiou, value: 'A E I O U' },
  ];

  const handleQuickText = useCallback((value: string) => {
    if (value === '') {
      // For "my name", just use the translation
      setText('Mi nombre es...');
    } else {
      setText(value);
    }
  }, []);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  return (
    <>
      <style jsx global>{`
        @media print {
          body * { visibility: hidden; }
          .print-area, .print-area * { visibility: visible; }
          .print-area { position: absolute; left: 0; top: 0; width: 100%; }
          .no-print { display: none !important; }
          @page { margin: 0.75in; }
        }

        .handwriting-worksheet {
          background: white;
          border-radius: 8px;
        }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70 no-print">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
          <Link href={`/${locale}`} className="flex items-center gap-2 text-lg font-bold text-foreground">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: 'linear-gradient(135deg, #3b82f6, #ef4444)' }}>
              <PenLine className="h-4 w-4 text-white" />
            </div>
            <span>{dict.siteTitle}</span>
          </Link>
          <div className="relative">
            <button onClick={() => setLangOpen(!langOpen)} className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
              <Globe className="h-4 w-4" /><span className="hidden sm:inline">{localeNames[locale]}</span>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 w-40 rounded-lg border border-border bg-card p-1 shadow-lg">
                {locales.map((loc) => (
                  <Link key={loc} href={`/${loc}`} onClick={() => setLangOpen(false)}
                    className={`block rounded-md px-3 py-2 text-sm transition-colors hover:bg-secondary ${loc === locale ? 'bg-primary/10 font-medium text-primary' : 'text-foreground'}`}>
                    {localeNames[loc]}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 no-print">
        {/* Hero */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg" style={{ background: 'linear-gradient(135deg, #3b82f6, #ef4444)' }}>
            <PenLine className="h-7 w-7 text-white" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-foreground sm:text-4xl">{c.title}</h1>
          <p className="text-muted-foreground">{c.subtitle}</p>
        </div>

        {/* Controls */}
        <div className="mb-8 grid gap-6 rounded-xl border border-border bg-card p-6 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
          {/* Text input */}
          <div className="sm:col-span-2 lg:col-span-4">
            <label className="mb-2 block text-sm font-medium text-foreground">{c.enterText}</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Escribe aquí el texto para practicar..."
            />
            <div className="mt-3 flex flex-wrap gap-2">
              {quickButtons.map((btn) => (
                <button
                  key={btn.label}
                  onClick={() => handleQuickText(btn.value)}
                  className="rounded-lg border border-border bg-secondary px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-primary/10 hover:border-primary/30"
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* Letter Size */}
          <div>
            <label className="mb-2 flex items-center gap-1.5 text-sm font-medium text-foreground">
              <Ruler className="h-4 w-4" /> {c.letterSize}
            </label>
            <div className="flex gap-1 rounded-lg border border-input p-1 bg-background">
              {(['small', 'medium', 'large'] as LetterSize[]).map((size) => (
                <button
                  key={size}
                  onClick={() => setLetterSize(size)}
                  className={`flex-1 rounded-md px-3 py-2 text-sm transition-all ${
                    letterSize === size
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  {c[size]}
                </button>
              ))}
            </div>
          </div>

          {/* Style */}
          <div>
            <label className="mb-2 flex items-center gap-1.5 text-sm font-medium text-foreground">
              <Type className="h-4 w-4" /> {c.style}
            </label>
            <div className="flex gap-1 rounded-lg border border-input p-1 bg-background">
              {(['print', 'cursive'] as HandStyle[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setHandStyle(s)}
                  className={`flex-1 rounded-md px-3 py-2 text-sm transition-all ${
                    handStyle === s
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  {s === 'print' ? c.printStyle : c.cursiveStyle}
                </button>
              ))}
            </div>
          </div>

          {/* Line Type */}
          <div>
            <label className="mb-2 flex items-center gap-1.5 text-sm font-medium text-foreground">
              <PenLine className="h-4 w-4" /> {c.lineType}
            </label>
            <div className="flex gap-1 rounded-lg border border-input p-1 bg-background">
              {(['solid', 'dashed', 'double'] as LineStyle[]).map((ls) => (
                <button
                  key={ls}
                  onClick={() => setLineStyle(ls)}
                  className={`flex-1 rounded-md px-3 py-2 text-sm transition-all ${
                    lineStyle === ls
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  {ls === 'solid' ? c.solidLine : ls === 'dashed' ? c.dashedLine : c.doubleLine}
                </button>
              ))}
            </div>
          </div>

          {/* Generate + Print */}
          <div className="sm:col-span-2 lg:col-span-4 flex gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:opacity-90"
            >
              <Printer className="h-4 w-4" /> {c.print}
            </button>
          </div>
        </div>

        {/* Preview label */}
        <h2 className="mb-4 text-lg font-semibold text-foreground">{c.preview}</h2>
      </main>

      {/* Print-area worksheet */}
      <div ref={printRef} className="print-area mx-auto max-w-4xl px-4 pb-12">
        {/* Worksheet header */}
        <div className="mb-4 text-center">
          <h2 className="text-xl font-bold text-gray-800" style={{ fontFamily: handStyle === 'cursive' ? "'Segoe Script', cursive" : undefined }}>
            {c.header}
          </h2>
          <p className="text-sm text-gray-500">{c.footer}</p>
        </div>

        {/* Letter size indicator */}
        <div className="mb-3 text-right text-xs text-gray-400">
          {c.letterSize}: {c[letterSize]} | {c.style}: {handStyle === 'print' ? c.printStyle : c.cursiveStyle}
        </div>

        {/* The actual handwriting worksheet */}
        <div style={{
          background: 'white',
          border: '2px solid #e2e8f0',
          borderRadius: '8px',
          padding: '24px 16px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        }}>
          <HandwritingLines
            text={text}
            letterSize={letterSize}
            handStyle={handStyle}
            lineStyle={lineStyle}
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-6 text-center text-sm text-muted-foreground no-print">
        <div className="mx-auto max-w-5xl px-4">
          <div className="mb-2 flex items-center justify-center gap-4">
            <Link href={`/${locale}`} className="hover:text-foreground transition-colors">{dict.home}</Link>
          </div>
          <p>&copy; 2025 {dict.siteTitle}. {dict.allRightsReserved}</p>
        </div>
      </footer>
    </>
  );
}
