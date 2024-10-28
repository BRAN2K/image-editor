// src/components/ImageEditor/LayerList/index.ts
import React from 'react';
import LayerItem from '../LayerItem';
import { LayerListContainer } from './style';
import { useRecoilState } from 'recoil';
import { layersState, selectedLayerIdState } from '@/state/atoms';
import { LayerType } from '@/types';

const LayerList: React.FC = () => {
  const [layers, setLayers] = useRecoilState(layersState);
  const [selectedLayerId, setSelectedLayerId] = useRecoilState(selectedLayerIdState);

  // Função para atualizar uma camada específica
  const updateLayer = (id: string, attrs: Partial<LayerType>) => {
    setLayers((prevLayers) => prevLayers.map((layer) => (layer.id === id ? { ...layer, ...attrs } : layer)));
  };

  // Funções para manipulação das camadas
  const handleSelectLayer = (id: string) => {
    setSelectedLayerId(id);
  };

  const handleToggleVisible = (id: string) => {
    const layer = layers.find((layer) => layer.id === id);
    if (layer) {
      updateLayer(id, { visible: !layer.visible });
    }
  };

  const handleToggleLocked = (id: string) => {
    const layer = layers.find((layer) => layer.id === id);
    if (layer) {
      updateLayer(id, { locked: !layer.locked });
    }
  };

  const handleDeleteLayer = (id: string) => {
    setLayers((prevLayers) => prevLayers.filter((layer) => layer.id !== id));
    if (selectedLayerId === id) {
      setSelectedLayerId(null);
    }
  };

  const handleRenameLayer = (id: string, name: string) => {
    updateLayer(id, { name });
  };

  const handleReorderLayer = (id: string, direction: 'up' | 'down') => {
    setLayers((prevLayers) => {
      const index = prevLayers.findIndex((layer) => layer.id === id);
      if (index < 0) return prevLayers;

      let newIndex = index;
      if (direction === 'up' && index > 0) {
        newIndex = index - 1;
      } else if (direction === 'down' && index < prevLayers.length - 1) {
        newIndex = index + 1;
      } else {
        return prevLayers;
      }

      const newLayers = [...prevLayers];
      [newLayers[index], newLayers[newIndex]] = [newLayers[newIndex], newLayers[index]];

      // Atualiza o zIndex das camadas
      return newLayers.map((layer, idx) => ({
        ...layer,
        zIndex: idx,
      }));
    });
  };

  return (
    <LayerListContainer>
      {layers
        .slice()
        .sort((a, b) => b.zIndex - a.zIndex) // Ordena as camadas para exibição
        .map((layer) => (
          <LayerItem
            key={layer.id}
            layer={layer}
            isSelected={selectedLayerId === layer.id}
            onSelect={handleSelectLayer}
            onToggleVisible={handleToggleVisible}
            onToggleLocked={handleToggleLocked}
            onRename={handleRenameLayer}
            onDelete={handleDeleteLayer}
            onReorder={handleReorderLayer}
          />
        ))}
    </LayerListContainer>
  );
};

export default LayerList;
