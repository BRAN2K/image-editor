import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { selectedLayerIdState } from '@/state/atoms';
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
}

const TextLayer: React.FC<TextLayerProps> = ({ layer, shapeRefs, canvasWidth, canvasHeight, keepInside }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedLayerId, setSelectedLayerId] = useRecoilState(selectedLayerIdState);

  const handleDblClick = () => {
    setIsEditing(true);
  };

  const onSelect = () => {
    setSelectedLayerId(layer.id);
  };

  const handleFinishEditing = () => {
    setIsEditing(false);
  };

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
        />
      )}
    </>
  );
};

export default TextLayer;
