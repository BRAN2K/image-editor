import styled from 'styled-components';

export const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100vh;
  overflow: hidden;
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
`;

export const TopBar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #777777;
  padding: 5px;

  button {
    padding: 5px 10px;
    background-color: #ffffff;
    border: none;
    cursor: pointer;

    &:hover {
      background-color: #dddddd;
    }
  }

  label {
    display: flex;
    align-items: center;
    color: #ffffff;

    input {
      margin-left: 5px;
      width: 60px;
      padding: 2px;
    }
  }
`;
