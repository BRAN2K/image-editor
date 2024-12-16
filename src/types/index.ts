export interface LayerType {
  id: string;
  name: string;
  type: 'image' | 'text';
  visible: boolean;
  locked: boolean;
  x: number;
  y: number;
  rotation: number;
  width: number;
  height: number;
  zIndex: number;
  // Campos específicos para imagens
  image?: HTMLImageElement;
  // Campos específicos para texto
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  fill?: string;
  editable?: boolean;
}
