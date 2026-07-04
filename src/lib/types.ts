export type Locale = 'en' | 'es' | 'pt';

export type ToolId = 'caligrafia';

export type TranslationDict = {
  siteTitle: string;
  siteTagline: string;
  home: string;
  tools: string;
  language: string;
  allRightsReserved: string;
  toolsList: Record<ToolId, { title: string; desc: string }>;
  caligrafia: {
    title: string;
    subtitle: string;
    enterText: string;
    generate: string;
    print: string;
    letterSize: string;
    small: string;
    medium: string;
    large: string;
    style: string;
    printStyle: string;
    cursiveStyle: string;
    lineType: string;
    solidLine: string;
    dashedLine: string;
    doubleLine: string;
    preview: string;
    alphabet: string;
    numbers: string;
    customText: string;
    myName: string;
    vowels: string;
    aeiou: string;
    header: string;
    footer: string;
  };
};
