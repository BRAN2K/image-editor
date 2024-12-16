// src/app/api/images/route.ts

import { NextResponse } from 'next/server';

// Dados simulados - substitua pelo acesso ao seu banco de dados
const images = [
  {
    id: '1',
    name: 'Imagem 1',
    url: '/images/image1.png', // Caminho da imagem estática ou URL pública
  },
  {
    id: '2',
    name: 'Imagem 2',
    url: '/images/image2.png',
  },
  {
    id: '3',
    name: 'Imagem 3',
    url: '/images/image3.png',
  },
];

export async function GET(request: Request) {
  return NextResponse.json(images);
}
