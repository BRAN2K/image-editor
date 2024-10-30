// src/components/ImageEditor/Editor/index.ts
import React from 'react';
import LayerList from '../LayerList';
import CanvasArea from '../CanvasArea';
import { v4 as uuidv4 } from 'uuid';
import { LayerType } from '@/types';
import { EditorContainer, TopBar, Content } from './style';
import { useRecoilState } from 'recoil';
import { layersState } from '@/state/atoms';
import ElementList from '../ElementList';

const Editor: React.FC = () => {
  const handleExport = () => {
    // Implementação da exportação aqui
  };

  return (
    <EditorContainer>
      <TopBar>
        <button onClick={handleExport}>Salvar como Imagem</button>
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
