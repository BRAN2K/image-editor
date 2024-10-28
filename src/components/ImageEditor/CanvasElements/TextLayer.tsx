// src/components/ImageEditor/CanvasElements/TextLayer.tsx

import React from 'react';
import { Text as KonvaText } from 'react-konva';
import { LayerType } from '@/types';
import { useRecoilState } from 'recoil';
import { selectedLayerIdState, layersState } from '@/state/atoms';
import Konva from 'konva';

interface TextLayerProps {
  layer: LayerType;
  shapeRefs: React.MutableRefObject<{ [key: string]: Konva.Node }>;
  stageRef: React.RefObject<Konva.Stage>;
}

const TextLayer: React.FC<TextLayerProps> = ({ layer, shapeRefs, stageRef }) => {
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

  const handleDblClick = (e: any) => {
    const node = e.target as Konva.Text;
    const stage = stageRef.current;

    // Obtém a posição absoluta do texto no canvas
    const textPosition = node.getAbsolutePosition();
    const stageBox = stage!.container().getBoundingClientRect();

    // Calcula a posição do textarea na página
    const areaPosition = {
      x: stageBox.left + textPosition.x,
      y: stageBox.top + textPosition.y,
    };

    // Cria um elemento textarea para edição
    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);

    // Define o valor e estilos do textarea
    textarea.value = layer.text!;
    textarea.style.position = 'absolute';
    textarea.style.top = `${areaPosition.y}px`;
    textarea.style.left = `${areaPosition.x}px`;
    textarea.style.width = `${node.width() * node.scaleX()}px`;
    textarea.style.height = `${node.height() * node.scaleY()}px`;
    textarea.style.fontSize = `${layer.fontSize}px`;
    textarea.style.fontFamily = layer.fontFamily ?? 'Arial';
    textarea.style.color = layer.fill ?? '#000000';
    textarea.style.background = 'transparent';
    textarea.style.border = 'none';
    textarea.style.outline = 'none';
    textarea.style.resize = 'none';
    textarea.style.overflow = 'hidden';
    textarea.style.padding = '0';
    textarea.style.margin = '0';
    textarea.style.transformOrigin = 'left top';
    textarea.style.transform = `rotate(${layer.rotation}deg)`;

    textarea.focus();

    // Função para remover o textarea e atualizar o texto
    const removeTextarea = () => {
      updateLayer(layer.id, { text: textarea.value });
      document.body.removeChild(textarea);
    };

    // Salva o texto ao pressionar Enter ou Esc
    textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === 'Escape') {
        removeTextarea();
      }
    });

    // Salva o texto ao perder o foco
    textarea.addEventListener('blur', () => {
      removeTextarea();
    });
  };

  return (
    <KonvaText
      key={layer.id}
      text={layer.text}
      x={layer.x}
      y={layer.y}
      fontSize={layer.fontSize}
      fontFamily={layer.fontFamily}
      fill={layer.fill}
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
      onDblClick={handleDblClick}
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

export default TextLayer;
