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
