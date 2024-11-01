// src/components/ImageEditor/LayerList/index.ts
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ElementListContainer } from './style';
import { useRecoilState } from 'recoil';
import { layersState, selectedLayerIdState } from '@/state/atoms';
import { LayerType } from '@/types';

const ElementList: React.FC = () => {
  const [layers, setLayers] = useRecoilState(layersState);

  // Função para adicionar uma nova camada ao carregar uma imagem
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        if (!file.type.startsWith('image/')) {
          alert('Por favor, selecione um arquivo de imagem.');
          return;
        }

        const reader = new FileReader();
        reader.onload = () => {
          const img = new window.Image();
          img.src = reader.result as string;
          img.onload = () => {
            const newLayer: LayerType = {
              id: uuidv4(),
              type: 'image',
              name: file.name,
              visible: true,
              locked: false,
              image: img,
              x: 50,
              y: 50,
              width: img.width,
              height: img.height,
              rotation: 0,
              zIndex: layers.length,
            };
            setLayers((prev) => [...prev, newLayer]);
          };
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Função para adicionar uma nova camada de texto
  const handleAddText = () => {
    const newLayer: LayerType = {
      id: uuidv4(),
      name: 'Camada de Texto',
      type: 'text',
      visible: true,
      locked: false,
      x: 100,
      y: 100,
      rotation: 0,
      width: 200,
      height: 50,
      zIndex: layers.length,
      text: 'Clique duplo para editar o texto',
      fontSize: 24,
      fontFamily: 'Arial',
      fill: '#000000',
    };
    setLayers((prev) => [...prev, newLayer]);
  };

  return (
    <ElementListContainer>
      <button onClick={handleAddText}>Adicionar Texto</button>
      <input type="file" title="Teste" onChange={handleUpload} multiple />
    </ElementListContainer>
  );
};

export default ElementList;
