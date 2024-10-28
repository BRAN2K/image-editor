// src/components/ImageEditor/CanvasArea/index.tsx

import React, { useRef } from 'react';
import { Stage, Layer } from 'react-konva';
import { CanvasContainer } from './style';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { layersState, selectedLayerIdState } from '@/state/atoms';
import ImageLayer from '../CanvasElements/ImageLayer';
import TextLayer from '../CanvasElements/TextLayer';
import LayerTransformer from '../CanvasElements/LayerTransformer';
import Konva from 'konva';

const CanvasArea: React.FC = () => {
  const layers = useRecoilValue(layersState);
  const setSelectedLayerId = useSetRecoilState(selectedLayerIdState);

  const stageRef = useRef<Konva.Stage>(null);
  const shapeRefs = useRef<{ [key: string]: Konva.Node }>({});

  // Manipula cliques no Stage para deselecionar camadas
  const handleStageMouseDown = (e: any) => {
    // Se clicou na área vazia, deseleciona a camada
    if (e.target === e.target.getStage()) {
      setSelectedLayerId(null);
    }
  };

  return (
    <CanvasContainer>
      <Stage
        ref={stageRef}
        width={window.innerWidth - 400} // Ajuste conforme a largura da sidebar
        height={window.innerHeight}
        onMouseDown={handleStageMouseDown}
        style={{ backgroundColor: '#f0f0f0' }}>
        <Layer>
          {layers
            .filter((layer) => layer.visible)
            .sort((a, b) => a.zIndex - b.zIndex)
            .map((layer) => {
              if (layer.type === 'image' && layer.image) {
                return <ImageLayer key={layer.id} layer={layer} shapeRefs={shapeRefs} />;
              } else if (layer.type === 'text') {
                return <TextLayer key={layer.id} layer={layer} shapeRefs={shapeRefs} stageRef={stageRef} />;
              } else {
                return null;
              }
            })}
          {/* Componente do Transformer */}
          <LayerTransformer shapeRefs={shapeRefs} />
        </Layer>
      </Stage>
    </CanvasContainer>
  );
};

export default CanvasArea;
