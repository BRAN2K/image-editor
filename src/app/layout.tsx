import GlobalStyle from '@/themes/globalStyle';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editor de Imagem',
  description: 'Editor de Imagem',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GlobalStyle />
      <html lang="pt-BR">
        <body>{children}</body>
      </html>
    </>
  );
}
