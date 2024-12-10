// src/components/ImageEditor/CanvasElements/ImageLayer.tsx

import React, { useEffect } from 'react';
import { Image as KonvaImage } from 'react-konva';
import { LayerType } from '@/types';
import { useRecoilState } from 'recoil';
import { selectedLayerIdState, layersState } from '@/state/atoms';
import Konva from 'konva';

interface ImageLayerProps {
  layer: LayerType;
  shapeRefs: React.MutableRefObject<{ [key: string]: Konva.Node }>;
  canvasWidth: number;
  canvasHeight: number;
  keepInside: boolean;
}

const ImageLayer: React.FC<ImageLayerProps> = ({ layer, shapeRefs, canvasWidth, canvasHeight, keepInside }) => {
  const [selectedLayerId, setSelectedLayerId] = useRecoilState(selectedLayerIdState);
  const [layers, setLayers] = useRecoilState(layersState);

  const isSelected = layer.id === selectedLayerId;

  const onSelect = () => {
    setSelectedLayerId(layer.id);
  };

  const updateLayer = (id: string, attrs: Partial<LayerType>) => {
    setLayers((prevLayers) =>
      prevLayers.map((layerItem) => (layerItem.id === id ? { ...layerItem, ...attrs } : layerItem))
    );
  };

  return (
    <KonvaImage
      key={layer.id}
      image={layer.image}
      x={layer.x}
      y={layer.y}
      width={layer.width}
      height={layer.height}
      rotation={layer.rotation}
      draggable={!layer.locked}
      dragBoundFunc={(pos) => {
        if (!keepInside) return pos;
        const node = shapeRefs.current[layer.id];
        const width = node.width() * node.scaleX();
        const height = node.height() * node.scaleY();

        let x = pos.x;
        let y = pos.y;

        // Manter o elemento dentro dos limites do canvas
        x = Math.max(0, Math.min(x, canvasWidth - width));
        y = Math.max(0, Math.min(y, canvasHeight - height));

        return { x, y };
      }}
      ref={(node) => {
        if (node) {
          shapeRefs.current[layer.id] = node;
        } else {
          delete shapeRefs.current[layer.id];
        }
      }}
      onClick={onSelect}
      onTap={onSelect}
      onDragEnd={(e) => {
        const node = e.target;
        updateLayer(layer.id, {
          x: node.x(),
          y: node.y(),
        });
      }}
      onTransformEnd={(e) => {
        const node = e.target;

        // Obter a escala atual
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();

        // Aplicar a nova posição e tamanho
        let x = node.x();
        let y = node.y();
        let width = Math.max(5, node.width() * scaleX);
        let height = Math.max(5, node.height() * scaleY);
        const rotation = node.rotation();

        // Redefinir a escala
        node.scaleX(1);
        node.scaleY(1);

        if (keepInside) {
          // Ajustar para manter dentro dos limites
          x = Math.max(0, x);
          y = Math.max(0, y);
          if (x + width > canvasWidth) {
            width = canvasWidth - x;
          }
          if (y + height > canvasHeight) {
            height = canvasHeight - y;
          }
        }

        updateLayer(layer.id, {
          x,
          y,
          width,
          height,
          rotation,
        });
      }}
    />
  );
};

export default ImageLayer;
