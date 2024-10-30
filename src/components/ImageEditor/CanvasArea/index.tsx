// src/components/ImageEditor/CanvasArea/index.tsx

import React, { useRef } from 'react';
import { Layer } from 'react-konva';
import { Canva, CanvasContainer } from './style';
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
      <Canva
        ref={stageRef}
        width={window.innerHeight - 200} // Ajuste conforme a largura da sidebar
        height={window.innerHeight - 200}
        onMouseDown={handleStageMouseDown}>
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
      </Canva>
    </CanvasContainer>
  );
};

export default CanvasArea;
