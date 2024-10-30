import styled from 'styled-components';

export const LayerItemContainer = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  background-color: ${(props) => (props.selected ? '#c5c5c5' : '#eeeeee')};
  padding: 5px;
  margin: 5px;
  cursor: pointer;

  &:hover {
    background-color: #e8e8e8;
  }
`;

export const LayerNameInput = styled.input`
  flex-grow: 1;
  margin-left: 5px;
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
