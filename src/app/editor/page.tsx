'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { RecoilRoot } from 'recoil'; // Importa o RecoilRoot

// Importação dinâmica para evitar SSR do Konva
const Editor = dynamic(() => import('@/components/ImageEditor/Editor'), {
  ssr: false,
});

const Home: React.FC = () => {
  return (
    <RecoilRoot>
      <div>
        <h1>Meu Editor de Imagens</h1>
        <Editor />
      </div>
    </RecoilRoot>
  );
};

export default Home;