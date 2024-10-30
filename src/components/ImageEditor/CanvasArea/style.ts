import { Stage } from 'react-konva';
import styled from 'styled-components';

export const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e3e3e3;
`;

export const Canva = styled(Stage)`
  border: 2px solid #000;
  background-color: #ffffff;
`;
