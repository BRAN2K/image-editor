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
}

const ImageLayer: React.FC<ImageLayerProps> = ({ layer, shapeRefs }) => {
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
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();

        updateLayer(layer.id, {
          x: node.x(),
          y: node.y(),
          rotation: node.rotation(),
          width: Math.max(5, node.width() * scaleX),
          height: Math.max(5, node.height() * scaleY),
        });

        node.scaleX(1);
        node.scaleY(1);
      }}
    />
  );
};

export default ImageLayer;
