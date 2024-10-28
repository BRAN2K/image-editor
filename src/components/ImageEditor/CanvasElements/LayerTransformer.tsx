// src/components/ImageEditor/CanvasElements/LayerTransformer.tsx

import React, { useEffect } from 'react';
import { Transformer } from 'react-konva';
import { useRecoilValue } from 'recoil';
import { selectedLayerIdState } from '@/state/atoms';
import Konva from 'konva';

interface LayerTransformerProps {
  shapeRefs: React.MutableRefObject<{ [key: string]: Konva.Node }>;
}

const LayerTransformer: React.FC<LayerTransformerProps> = ({ shapeRefs }) => {
  const selectedLayerId = useRecoilValue(selectedLayerIdState);
  const transformerRef = React.useRef<Konva.Transformer>(null);

  useEffect(() => {
    const transformer = transformerRef.current;
    const selectedNode = selectedLayerId ? shapeRefs.current[selectedLayerId] : null;

    if (transformer && selectedNode) {
      // Vincula o Transformer ao nó selecionado
      transformer.nodes([selectedNode]);
      transformer.getLayer()?.batchDraw();
    } else {
      // Remove o Transformer se nenhuma camada estiver selecionada
      transformer?.detach();
      transformer?.getLayer()?.batchDraw();
    }
  }, [selectedLayerId, shapeRefs]);

  return (
    <Transformer
      ref={transformerRef}
      rotateEnabled={true}
      anchorSize={7}
      enabledAnchors={[
        'top-left',
        'top-center',
        'top-right',
        'middle-left',
        'middle-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ]}
      boundBoxFunc={(oldBox, newBox) => {
        if (newBox.width < 5 || newBox.height < 5) {
          return oldBox;
        }
        return newBox;
      }}
    />
  );
};

export default LayerTransformer;
