// src/components/ImageEditor/CanvasArea/index.tsx

import React, { useRef } from 'react';
import { Layer } from 'react-konva';
import { Canva, CanvasContainer } from './style';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  layersState,
  selectedLayerIdState,
  gridVisibleState,
  gridSizeState,
  keepElementsInsideCanvasState,
} from '@/state/atoms';
import ImageLayer from '../CanvasElements/ImageLayer';
import TextLayer from '../CanvasElements/TextLayer';
import LayerTransformer from '../CanvasElements/LayerTransformer';
import GridLayer from '../CanvasElements/GridLayer';
import Konva from 'konva';

const CanvasArea: React.FC = () => {
  const layers = useRecoilValue(layersState);
  const setSelectedLayerId = useSetRecoilState(selectedLayerIdState);

  // Estados para o grid
  const gridVisible = useRecoilValue(gridVisibleState);
  const desiredGridSize = useRecoilValue(gridSizeState);
  // Estado para manter os elementos dentro do canvas
  const keepElementsInsideCanvas = useRecoilValue(keepElementsInsideCanvasState);

  const stageRef = useRef<Konva.Stage>(null);
  const shapeRefs = useRef<{ [key: string]: Konva.Node }>({});

  // Manipula cliques no Stage para deselecionar camadas
  const handleStageMouseDown = (e: any) => {
    // Se clicou na área vazia, deseleciona a camada
    if (e.target === e.target.getStage()) {
      setSelectedLayerId(null);
    }
  };

  const canvasWidth = window.innerHeight - 200; // Ajuste conforme necessário
  const canvasHeight = window.innerHeight - 200;

  return (
    <CanvasContainer>
      <Canva ref={stageRef} width={canvasWidth} height={canvasHeight} onMouseDown={handleStageMouseDown}>
        {/* Adicionar o grid se estiver habilitado */}
        {gridVisible && (
          <GridLayer
            width={canvasWidth}
            height={canvasHeight}
            desiredGridSize={desiredGridSize}
            stroke="#ddd"
            strokeWidth={1}
          />
        )}
        <Layer>
          {layers
            .filter((layer) => layer.visible)
            .sort((a, b) => a.zIndex - b.zIndex)
            .map((layer) => {
              if (layer.type === 'image' && layer.image) {
                return (
                  <ImageLayer
                    key={layer.id}
                    layer={layer}
                    shapeRefs={shapeRefs}
                    canvasWidth={canvasWidth}
                    canvasHeight={canvasHeight}
                    keepInside={keepElementsInsideCanvas}
                  />
                );
              } else if (layer.type === 'text') {
                return (
                  <TextLayer
                    key={layer.id}
                    layer={layer}
                    shapeRefs={shapeRefs}
                    canvasWidth={canvasWidth}
                    canvasHeight={canvasHeight}
                    keepInside={keepElementsInsideCanvas}
                  />
                );
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
