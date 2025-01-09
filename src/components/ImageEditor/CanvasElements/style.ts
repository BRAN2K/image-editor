import styled from 'styled-components';

interface TextAreaProps {
  x: number;
  y: number;
  rotation: number;
  width: number;
  fontSize?: number;
  fontFamily?: string;
  fill?: string;
  fontStyle?: string;
  align?: CanvasTextAlign;
}

export const StyledTextarea = styled.textarea<TextAreaProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => `${props.width}px`};
  height: auto;
  font-size: ${(props) => `${props.fontSize}px`};
  font-family: ${(props) => props.fontFamily || 'Arial'};
  color: ${(props) => props.fill || '#000000'};
  background: transparent;
  border: none;
  outline: none;
  resize: none;
  overflow: hidden;
  transform-origin: left top;
  transform: ${(props) => `translate(${props.x}px, ${props.y}px) rotate(${props.rotation}deg)`};
  padding: 0;
  margin: 0;
  white-space: pre-wrap;
  line-height: 1;
  font-style: ${(props) => (props.fontStyle?.includes('italic') ? 'italic' : 'normal')};
  font-weight: ${(props) => (props.fontStyle?.includes('bold') ? 'bold' : 'normal')};
  text-align: ${(props) => props.align || 'left'};
`;
