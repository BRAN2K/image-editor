import React from 'react';
import { Text as KonvaText } from 'react-konva';
import { useRecoilState } from 'recoil';
import { layersState } from '@/state/atoms';
import { LayerType } from '@/types';
import Konva from 'konva';

interface ResizableTextProps {
  layer: LayerType;
  shapeRefs: React.MutableRefObject<{ [key: string]: Konva.Node }>;
  canvasWidth: number;
  canvasHeight: number;
  keepInside: boolean;
  onSelect: () => void;
  onDblClick: () => void;
}

const ResizableText: React.FC<ResizableTextProps> = ({
  layer,
  shapeRefs,
  canvasWidth,
  canvasHeight,
  keepInside,
  onSelect,
  onDblClick,
}) => {
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
      dragBoundFunc={(pos) => {
        if (!keepInside) return pos;
        const node = shapeRefs.current[layer.id];
        const width = node.width() * node.scaleX();
        const height = node.height() * node.scaleY();

        let x = pos.x;
        let y = pos.y;

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

        let x = node.x();
        let y = node.y();
        let fontSize = Math.max(5, layer.fontSize! * scaleY);
        const rotation = node.rotation();

        node.scaleX(1);
        node.scaleY(1);

        if (keepInside) {
          x = Math.max(0, x);
          y = Math.max(0, y);

          const textWidth = node.width();
          const textHeight = node.height();

          // Ajustar posição se ultrapassar os limites
          if (x + textWidth > canvasWidth) {
            x = canvasWidth - textWidth;
          }
          if (y + textHeight > canvasHeight) {
            y = canvasHeight - textHeight;
          }
        }

        updateLayer(layer.id, {
          x,
          y,
          rotation,
          fontSize,
        });
      }}
    />
  );
};

export default ResizableText;
