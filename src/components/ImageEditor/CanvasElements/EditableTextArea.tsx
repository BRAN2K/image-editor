// src/components/ImageEditor/CanvasElements/EditableTextArea.tsx

import React, { useEffect, useRef } from 'react';
import { Html } from 'react-konva-utils';
import { useRecoilState } from 'recoil';
import { layersState } from '@/state/atoms';
import { LayerType } from '@/types';
import { StyledTextarea } from './style';

interface EditableTextAreaProps {
  layer: LayerType;
  onFinishEditing: () => void;
}

const EditableTextArea: React.FC<EditableTextAreaProps> = ({ layer, onFinishEditing }) => {
  const [layers, setLayers] = useRecoilState(layersState);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.focus();
      textarea.setSelectionRange(textarea.value.length, textarea.value.length);
    }
  }, []);

  const updateLayer = (id: string, attrs: Partial<LayerType>) => {
    setLayers((prevLayers) =>
      prevLayers.map((layerItem) => (layerItem.id === id ? { ...layerItem, ...attrs } : layerItem))
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateLayer(layer.id, { text: e.target.value });
  };

  const handleBlur = () => {
    onFinishEditing();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.key === 'Enter' && !e.shiftKey) || e.key === 'Escape') {
      e.preventDefault();
      onFinishEditing();
    }
  };

  return (
    <Html>
      <StyledTextarea
        ref={textareaRef}
        value={layer.text}
        x={layer.x}
        y={layer.y}
        rotation={layer.rotation}
        width={layer.width}
        fontSize={layer.fontSize}
        fontFamily={layer.fontFamily}
        fill={layer.fill}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
    </Html>
  );
};

export default EditableTextArea;
