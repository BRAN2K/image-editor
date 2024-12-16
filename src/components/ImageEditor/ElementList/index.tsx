// src/components/ImageEditor/LayerList/index.ts
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ElementListContainer, ImageItem, ImageList } from './style';
import { useRecoilState } from 'recoil';
import { layersState, selectedLayerIdState } from '@/state/atoms';
import { LayerType } from '@/types';

interface ImageData {
  id: string;
  name: string;
  url: string;
}

const ElementList: React.FC = () => {
  const [layers, setLayers] = useRecoilState(layersState);
  const [images, setImages] = useState<ImageData[]>([]);

  // Função para buscar as imagens da API
  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch('/api/images');
      const data = await response.json();
      setImages(data);
    };

    fetchImages();
  }, []);

  // Função para adicionar uma imagem ao canvas
  const handleAddImage = (imageData: ImageData) => {
    const img = new window.Image();
    img.src = imageData.url;
    img.onload = () => {
      const newLayer: LayerType = {
        id: uuidv4(),
        type: 'image',
        name: imageData.name,
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
      <h3>Imagens Disponíveis</h3>
      <ImageList>
        {images.map((image) => (
          <ImageItem key={image.id} onClick={() => handleAddImage(image)}>
            <img src={image.url} alt={image.name} />
            <span>{image.name}</span>
          </ImageItem>
        ))}
      </ImageList>
    </ElementListContainer>
  );
};

export default ElementList;
