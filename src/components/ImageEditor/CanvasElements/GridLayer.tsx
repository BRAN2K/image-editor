// src/components/ImageEditor/CanvasElements/GridLayer.tsx

import React from 'react';
import { Layer, Line } from 'react-konva';

interface GridLayerProps {
  width: number;
  height: number;
  desiredGridSize: number;
  stroke: string;
  strokeWidth: number;
}

const GridLayer: React.FC<GridLayerProps> = ({ width, height, desiredGridSize, stroke, strokeWidth }) => {
  const lines = [];

  // Calcular o número de divisões do grid para as dimensões do canvas
  const numDivisionsX = Math.floor(width / desiredGridSize);
  const numDivisionsY = Math.floor(height / desiredGridSize);

  // Calcular o tamanho ajustado do grid para que se encaixe exatamente nas dimensões do canvas
  const adjustedGridSizeX = width / numDivisionsX;
  const adjustedGridSizeY = height / numDivisionsY;

  // Usar o menor tamanho ajustado para manter quadrados perfeitos
  const adjustedGridSize = Math.min(adjustedGridSizeX, adjustedGridSizeY);

  // Desenhar linhas verticais
  for (let i = 0; i <= numDivisionsX; i++) {
    const x = i * adjustedGridSize;
    lines.push(<Line key={`v-${i}`} points={[x, 0, x, height]} stroke={stroke} strokeWidth={strokeWidth} />);
  }

  // Desenhar linhas horizontais
  for (let i = 0; i <= numDivisionsY; i++) {
    const y = i * adjustedGridSize;
    lines.push(<Line key={`h-${i}`} points={[0, y, width, y]} stroke={stroke} strokeWidth={strokeWidth} />);
  }

  return <Layer>{lines}</Layer>;
};

export default GridLayer;
