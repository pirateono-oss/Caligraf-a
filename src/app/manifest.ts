import type { MetadataRoute } from 'next';
export default function manifest(): MetadataRoute.Manifest {
  return { name: 'Caligrafía para Niños', short_name: 'Caligrafía', description: 'Genera hojas imprimibles de práctica de escritura a mano para niños. El generador de caligrafía perfecto para aprender a escribir en español y portugués.', start_url: '/es', display: 'standalone', background_color: '#ffffff', theme_color: '#8b5cf6', icons: [{ src: '/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: '/icon-512.png', sizes: '512x512', type: 'image/png' }] };
}
