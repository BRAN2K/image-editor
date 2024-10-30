// src/components/ImageEditor/LayerItem/index.ts
import React from 'react';
import { LayerType } from '@/types';
import { TextAa, Image, Eye, EyeSlash, Lock, LockOpen, ArrowUp, ArrowDown, Trash } from '@/icons';
import { LayerItemContainer, LayerNameInput, IconButton } from './style';

interface LayerItemProps {
  layer: LayerType;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onToggleVisible: (id: string) => void;
  onToggleLocked: (id: string) => void;
  onRename: (id: string, name: string) => void;
  onDelete: (id: string) => void;
  onReorder: (id: string, direction: 'up' | 'down') => void;
}

const LayerItem: React.FC<LayerItemProps> = ({
  layer,
  isSelected,
  onSelect,
  onToggleVisible,
  onToggleLocked,
  onRename,
  onDelete,
  onReorder,
}) => {
  return (
    <LayerItemContainer selected={isSelected} onClick={() => onSelect(layer.id)}>
      {layer.type === 'text' ? <TextAa style={{ color: 'black' }} /> : <Image style={{ color: 'black' }} />}
      {/* Campo para renomear a camada */}
      <LayerNameInput value={layer.name} onChange={(e) => onRename(layer.id, e.target.value)} />
      {/* Botão para alternar visibilidade */}
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          onToggleVisible(layer.id);
        }}>
        {layer.visible ? <Eye style={{ color: 'black' }} /> : <EyeSlash style={{ color: 'black' }} />}
      </IconButton>
      {/* Botão para alternar bloqueio */}
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          onToggleLocked(layer.id);
        }}>
        {layer.locked ? <Lock style={{ color: 'black' }} /> : <LockOpen style={{ color: 'black' }} />}
      </IconButton>
      {/* Botões para reordenar */}
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          onReorder(layer.id, 'up');
        }}>
        <ArrowDown style={{ color: 'black' }} />
      </IconButton>
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          onReorder(layer.id, 'down');
        }}>
        <ArrowUp style={{ color: 'black' }} />
      </IconButton>
      {/* Botão para deletar a camada */}
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          onDelete(layer.id);
        }}>
        <Trash style={{ color: 'black' }} />
      </IconButton>
    </LayerItemContainer>
  );
};

export default LayerItem;
