import styled from 'styled-components';

export const PanelContainer = styled.div`
  padding: 10px;
  background-color: #ffffff;
  border: 1px solid #ccc;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  display: flex;
`;

export const InputGroup = styled.div`
  margin-bottom: 10px;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #333;
`;

export const Input = styled.input`
  margin-left: 5px;
  flex: 1;
  padding: 5px;
`;

export const Select = styled.select`
  margin-left: 5px;
  flex: 1;
  padding: 5px;
`;
