// src/components/ImageEditor/Editor/index.ts
import React from 'react';
import LayerList from '../LayerList';
import CanvasArea from '../CanvasArea';
import ElementList from '../ElementList';
import { EditorContainer, TopBar, Content } from './style';
import { useRecoilState } from 'recoil';
import { gridVisibleState, gridSizeState, keepElementsInsideCanvasState } from '@/state/atoms';

// Definir os tamanhos pré-definidos do grid
const predefinedGridSizes = [5, 10, 20, 25, 40, 50, 100, 200, 250, 400];

const Editor: React.FC = () => {
  const handleExport = () => {
    // Implementação da exportação aqui
  };

  const [keepElementsInsideCanvas, setKeepElementsInsideCanvas] = useRecoilState(keepElementsInsideCanvasState);
  const [gridVisible, setGridVisible] = useRecoilState(gridVisibleState);
  const [gridSize, setGridSize] = useRecoilState(gridSizeState);

  const handleToggleKeepInsideCanvas = () => {
    setKeepElementsInsideCanvas(!keepElementsInsideCanvas);
  };

  const handleToggleGrid = () => {
    setGridVisible(!gridVisible);
  };

  const handleGridSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    setGridSize(value);
  };

  return (
    <EditorContainer>
      <TopBar>
        <button onClick={handleExport}>Salvar como Imagem</button>
        <button onClick={handleToggleGrid}>{gridVisible ? 'Ocultar Grid' : 'Mostrar Grid'}</button>
        <label>
          Tamanho do Grid:
          <select value={gridSize} onChange={handleGridSizeChange}>
            {predefinedGridSizes.map((size) => (
              <option key={size} value={size}>
                {size}px
              </option>
            ))}
          </select>{' '}
        </label>
        {/* <span>
          Tamanho Ajustado do Grid:{' '}
          {Math.min(
            (window.innerHeight - 200) / Math.floor((window.innerHeight - 200) / gridSize),
            (window.innerHeight - 200) / Math.floor((window.innerHeight - 200) / gridSize)
          ).toFixed(2)}
          px
        </span> */}
        <label>
          <input type="checkbox" checked={keepElementsInsideCanvas} onChange={handleToggleKeepInsideCanvas} />
          Manter elementos dentro do canvas
        </label>
      </TopBar>
      <Content>
        <LayerList />
        <CanvasArea />
        <ElementList />
      </Content>
    </EditorContainer>
  );
};

export default Editor;
