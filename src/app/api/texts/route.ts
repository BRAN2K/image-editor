// src/app/api/texts/route.ts

import { NextResponse } from 'next/server';

// Dados simulados - substitua pelo acesso ao seu banco de dados
const texts = [
  {
    id: '1',
    name: 'Nome do Produto',
    content: 'Super Widget',
  },
  {
    id: '2',
    name: 'Preço',
    content: 'R$19,99',
  },
  {
    id: '3',
    name: 'Descrição',
    content: 'Um widget incrível que faz tudo o que você precisa.',
  },
];

export async function GET(request: Request) {
  return NextResponse.json(texts);
}
