import styled from 'styled-components';

export const LayerItemContainer = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  background-color: ${(props) => (props.selected ? '#e0e0e0' : 'transparent')};
  padding: 5px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const LayerNameInput = styled.input`
  flex-grow: 1;
  margin-right: 5px;
  border: none;
  background: transparent;
  border-bottom: 1px solid #ccc;
  outline: none;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  margin: 0 2px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    color: #007bff;
  }
`;
