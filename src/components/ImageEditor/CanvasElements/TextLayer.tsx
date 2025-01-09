import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { selectedLayerIdState, textPropertiesPositionState } from '@/state/atoms';
import ResizableText from './ResizableText';
import EditableTextArea from './EditableTextArea';
import { LayerType } from '@/types';
import Konva from 'konva';

interface TextLayerProps {
  layer: LayerType;
  shapeRefs: React.MutableRefObject<{ [key: string]: Konva.Node }>;
  canvasWidth: number;
  canvasHeight: number;
  keepInside: boolean;
  stageRef: React.RefObject<Konva.Stage>;
}

const TextLayer: React.FC<TextLayerProps> = ({ layer, shapeRefs, canvasWidth, canvasHeight, keepInside, stageRef }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedLayerId, setSelectedLayerId] = useRecoilState(selectedLayerIdState);
  const [, setTextPropertiesPosition] = useRecoilState(textPropertiesPositionState);

  const handleDblClick = () => {
    if (layer.editable !== false) {
      setIsEditing(true);
    }
  };

  const onSelect = () => {
    setSelectedLayerId(layer.id);
    calculateTextPosition();
  };

  const calculateTextPosition = () => {
    const node = shapeRefs.current[layer.id] as Konva.Text;
    if (node && stageRef.current) {
      // Obter a posição absoluta do texto
      const textPosition = node.getAbsolutePosition();
      // Obter a posição do canvas na página
      const stageBox = stageRef.current.container().getBoundingClientRect();

      // Calcular a posição do texto em relação à janela
      const x = stageBox.left + textPosition.x;
      const y = stageBox.top + textPosition.y;

      setTextPropertiesPosition({ x, y });
    }
  };

  useEffect(() => {
    if (selectedLayerId === layer.id) {
      calculateTextPosition();
    }
  }, [selectedLayerId, layer.id]);

  const handleFinishEditing = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    const handleWindowEvents = () => {
      if (selectedLayerId === layer.id) {
        calculateTextPosition();
      }
    };

    window.addEventListener('scroll', handleWindowEvents);
    window.addEventListener('resize', handleWindowEvents);

    return () => {
      window.removeEventListener('scroll', handleWindowEvents);
      window.removeEventListener('resize', handleWindowEvents);
    };
  }, [selectedLayerId, layer.id]);

  return (
    <>
      {isEditing ? (
        <EditableTextArea layer={layer} onFinishEditing={handleFinishEditing} />
      ) : (
        <ResizableText
          layer={layer}
          shapeRefs={shapeRefs}
          canvasWidth={canvasWidth}
          canvasHeight={canvasHeight}
          keepInside={keepInside}
          onSelect={onSelect}
          onDblClick={handleDblClick}
          stageRef={stageRef}
          calculateTextPosition={calculateTextPosition}
        />
      )}
    </>
  );
};

export default TextLayer;
