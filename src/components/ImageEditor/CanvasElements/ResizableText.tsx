import React from 'react';
import { Text as KonvaText } from 'react-konva';
import { useRecoilState } from 'recoil';
import { layersState } from '@/state/atoms';
import { LayerType } from '@/types';
import Konva from 'konva';

interface ResizableTextProps {
  layer: LayerType;
  shapeRefs: React.MutableRefObject<{ [key: string]: Konva.Node }>;
  onSelect: () => void;
  onDblClick: () => void;
}

const ResizableText: React.FC<ResizableTextProps> = ({ layer, shapeRefs, onSelect, onDblClick }) => {
  const [layers, setLayers] = useRecoilState(layersState);

  const updateLayer = (id: string, attrs: Partial<LayerType>) => {
    setLayers((prevLayers) =>
      prevLayers.map((layerItem) => (layerItem.id === id ? { ...layerItem, ...attrs } : layerItem))
    );
  };

  return (
    <KonvaText
      text={layer.text}
      x={layer.x}
      y={layer.y}
      rotation={layer.rotation}
      fontSize={layer.fontSize}
      fontFamily={layer.fontFamily}
      fill={layer.fill}
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
      onDblClick={onDblClick}
      onDragEnd={(e) => {
        const node = e.target;
        updateLayer(layer.id, {
          x: node.x(),
          y: node.y(),
        });
      }}
      onTransformEnd={(e) => {
        const node = e.target;
        const scaleY = node.scaleY();

        updateLayer(layer.id, {
          x: node.x(),
          y: node.y(),
          rotation: node.rotation(),
          fontSize: Math.max(5, layer.fontSize! * scaleY),
        });

        node.scaleX(1);
        node.scaleY(1);
      }}
    />
  );
};

export default ResizableText;
