// src/state/atoms.ts
import { atom } from 'recoil';
import { LayerType } from '@/types';

export const layersState = atom<LayerType[]>({
  key: 'layersState',
  default: [],
});

export const selectedLayerIdState = atom<string | null>({
  key: 'selectedLayerIdState',
  default: null,
});

export const gridVisibleState = atom<boolean>({
  key: 'gridVisibleState',
  default: true,
});

export const gridSizeState = atom<number>({
  key: 'gridSizeState',
  default: 50,
});

export const keepElementsInsideCanvasState = atom<boolean>({
  key: 'keepElementsInsideCanvasState',
  default: true,
});
