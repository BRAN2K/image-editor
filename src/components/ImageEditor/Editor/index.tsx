// src/components/ImageEditor/Editor/index.ts
import React from 'react';
import LayerList from '../LayerList';
import CanvasArea from '../CanvasArea';
import ElementList from '../ElementList';
import { EditorContainer, TopBar, Content } from './style';
import { useRecoilState } from 'recoil';
import { gridVisibleState, gridSizeState } from '@/state/atoms';

const Editor: React.FC = () => {
  const handleExport = () => {
    // Implementação da exportação aqui
  };

  const [gridVisible, setGridVisible] = useRecoilState(gridVisibleState);
  const [gridSize, setGridSize] = useRecoilState(gridSizeState);

  const handleToggleGrid = () => {
    setGridVisible(!gridVisible);
  };

  const handleGridSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value > 0) {
      setGridSize(value);
    }
  };

  return (
    <EditorContainer>
      <TopBar>
        <button onClick={handleExport}>Salvar como Imagem</button>
        <button onClick={handleToggleGrid}>{gridVisible ? 'Ocultar Grid' : 'Mostrar Grid'}</button>
        <label>
          Tamanho do Grid:
          <input type="number" value={gridSize} onChange={handleGridSizeChange} min={0} max={200} />
        </label>
        <span>
          Tamanho Ajustado do Grid:{' '}
          {Math.min(
            (window.innerHeight - 200) / Math.floor((window.innerHeight - 200) / gridSize),
            (window.innerHeight - 200) / Math.floor((window.innerHeight - 200) / gridSize)
          ).toFixed(2)}
          px
        </span>
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
