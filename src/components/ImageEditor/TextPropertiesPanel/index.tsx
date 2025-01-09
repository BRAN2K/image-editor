import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedLayerIdState, layersState, textPropertiesPositionState } from '@/state/atoms';
import { LayerType } from '@/types';
import { PanelContainer, InputGroup, Label, Input, Select } from './style';

const TextPropertiesPanel: React.FC = () => {
  const selectedLayerId = useRecoilValue(selectedLayerIdState);
  const [layers, setLayers] = useRecoilState(layersState);
  const textPropertiesPosition = useRecoilValue(textPropertiesPositionState);

  const layer = layers.find((layer) => layer.id === selectedLayerId && layer.type === 'text');

  if (!layer || layer.type !== 'text' || !textPropertiesPosition) {
    return null;
  }

  const updateLayer = (attrs: Partial<LayerType>) => {
    setLayers((prevLayers) => prevLayers.map((l) => (l.id === layer.id ? { ...l, ...attrs } : l)));
  };

  const panelStyle: React.CSSProperties = {
    position: 'absolute',
    left: `${textPropertiesPosition.x}px`,
    top: `${textPropertiesPosition.y - 70}px`, // Ajuste conforme necessário
    transform: 'translate(-50%, -100%)',
    zIndex: 1000,
  };

  return (
    <div style={panelStyle}>
      <PanelContainer>
        <InputGroup>
          <Label>Tamanho:</Label>
          <Input
            type="number"
            value={layer.fontSize}
            onChange={(e) => updateLayer({ fontSize: parseInt(e.target.value, 10) })}
          />
        </InputGroup>

        {/* Família da Fonte */}
        <InputGroup>
          <Label>Fonte:</Label>
          <Select value={layer.fontFamily} onChange={(e) => updateLayer({ fontFamily: e.target.value })}>
            <option value="Arial">Arial</option>
            <option value="Helvetica">Helvetica</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
            {/* Adicione outras fontes conforme necessário */}
          </Select>
        </InputGroup>

        {/* Cor do Texto */}
        <InputGroup>
          <Label>Cor:</Label>
          <Input type="color" value={layer.fill} onChange={(e) => updateLayer({ fill: e.target.value })} />
        </InputGroup>

        {/* Negrito */}
        <InputGroup>
          <Label>
            <Input
              type="checkbox"
              checked={layer.fontStyle?.includes('bold')}
              onChange={(e) => {
                const isBold = e.target.checked;
                let fontStyle = layer.fontStyle || 'normal';
                if (isBold) {
                  fontStyle = fontStyle.includes('italic') ? 'bold italic' : 'bold';
                } else {
                  fontStyle = fontStyle.includes('italic') ? 'italic' : 'normal';
                }
                updateLayer({ fontStyle });
              }}
            />
            Negrito
          </Label>
        </InputGroup>

        {/* Itálico */}
        <InputGroup>
          <Label>
            <Input
              type="checkbox"
              checked={layer.fontStyle?.includes('italic')}
              onChange={(e) => {
                const isItalic = e.target.checked;
                let fontStyle = layer.fontStyle || 'normal';
                if (isItalic) {
                  fontStyle = fontStyle.includes('bold') ? 'bold italic' : 'italic';
                } else {
                  fontStyle = fontStyle.includes('bold') ? 'bold' : 'normal';
                }
                updateLayer({ fontStyle });
              }}
            />
            Itálico
          </Label>
        </InputGroup>

        {/* Alinhamento do Texto
        <InputGroup>
          <Label>Alinhamento:</Label>
          <Select
            value={layer.align || 'left'}
            onChange={(e) => updateLayer({ align: e.target.value as CanvasTextAlign })}>
            <option value="left">Esquerda</option>
            <option value="center">Centro</option>
            <option value="right">Direita</option>
            <option value="justify">Justificado</option>
          </Select>
        </InputGroup> */}
      </PanelContainer>
    </div>
  );
};

export default TextPropertiesPanel;
